var uuid = require('node-uuid');
var rimraf = require('rimraf');
var fs = require('fs');
var spawn = require('child_process').spawn;
var fork = require('child_process').fork;

var server;

var HUB_DIR = process.env.HUB_DIR || '/tmp/hub';

var REPO_URL = process.env.REPO_URL || 'https://github.com/serandules/hub.git';

var start = function (dir, repo) {
    rimraf.sync(dir); //TODO
    fs.mkdirSync(dir);
    var child = spawn('bash');
    var id = uuid.v4();
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    child.stdin.write('pwd\n');
    child.stdin.write('cd ' + HUB_DIR + '\n');
    child.stdin.write('pwd\n');
    console.log('git clone ' + repo + ' ' + id + '\n');
    child.stdin.write('git clone ' + repo + ' ' + id + '\n');
    child.stdin.write('cd ' + id + '\n');
    child.stdin.write('npm install\n');
    child.stdin.write('component install\n');
    child.stdin.write('echo "repo cloned"\n');
    child.stdin.write('kill -9 ' + child.pid + '\n');
    child.on('close', function () {
        console.log('server starting');
        if (server) {
            server.kill('SIGINT');
            console.log('old server killed');
        }
        var cwd = dir + '/' + id;
        server = fork(cwd + '/index.js', {
            cwd: cwd,
            silent: true
        });
        server.stdout.pipe(process.stdout);
        server.stderr.pipe(process.stderr);
        server.on('message', function (data) {
            switch (data.event) {
                case 'self up':
                    start(dir, repo);
                    break;
            }
        });
    });
};

start(HUB_DIR, REPO_URL);