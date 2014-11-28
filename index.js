/**
 * This module helps to keep hub and hub-client apps up and running.
 * Also facilitate hot update of hub and hub-client.
 */
var debug = require('debug')('hubber');
var uuid = require('node-uuid');
var rimraf = require('rimraf');
var fs = require('fs');
var spawn = require('child_process').spawn;
var fork = require('child_process').fork;
var utils = require('utils');

/**
 * existing server instance
 */
var server;

/**
 * current directory i.e. hub or hub-client dir
 */
var cwd;

/**
 * whether this particular instance is a hub or hub-client
 * @type {boolean}
 */
var hub = process.env.HUB === 'true';
debug('executing as a hub : %s', hub);

/**
 * ENV variable to change the directory where hub and hub-client are installed
 * @type {*|string}
 */
var hubDir = process.env.HUB_DIR || '/tmp/serandives/servers';
debug('hub directory : %s', hubDir);

/**
 * whether production or not
 */
var prod = utils.prod();

/**
 * hub repository url
 * @type {string}
 */
var repo = hub ? 'https://github.com/serandules/hub.git' : 'https://github.com/serandules/hub-client.git';

/**
 * starts the hub or hub-client app. this method will be used in case of restart too.
 * @param restart
 */
var start = function (restart) {
    //cleaning hub directory to ensure fresh installation
    if (prod) {
        rimraf.sync(hubDir);
        fs.mkdirSync(hubDir);
        debug('hub directory cleaned');
    }

    var child = spawn('bash');
    child.stdout.pipe(process.stdout);
    child.stderr.pipe(process.stderr);
    debug('sh > cd %s', hubDir);
    child.stdin.write('cd ' + hubDir + '\n');

    var id;
    if (prod) {
        //repo is cloned in production mode
        id = uuid.v4();
        cwd = hubDir + '/' + id;
        debug('cloning repo : ' + repo);
        child.stdin.write('git clone ' + repo + ' ' + id + '\n');
        child.stdin.write('cd ' + id + '\n');
        child.stdin.write('npm install\n');
        child.stdin.write('force-dedupe-git-modules\n');
        if (hub) {
            child.stdin.write('component install\n');
        }
    } else {
        //repo is symblinked in non-production mode
        id = hub ? 'hub' : 'hub-client';
        cwd = hubDir + '/' + id;
        debug('symblinking repo : ' + repo);
        child.stdin.write('cp -rf ' + utils.locals() + '/serandules/' + id + ' .\n'); //TODO: make symblink
        child.stdin.write('mkdir -p ' + id + '/node_modules\n');
        child.stdin.write(utils.cmdln(utils.locals() + '/serandules', cwd + '/node_modules') + '\n');
        child.stdin.write('cd ' + id + '\n');
        if (hub) {
            //repo is symblinked in non-production mode
            debug('symblinking repo : ' + repo);
            child.stdin.write('cp -rf ' + utils.locals() + '/serandomps/' + id + ' .\n');
            child.stdin.write('mkdir -p ' + id + '/components\n');
            child.stdin.write(utils.cmdln(utils.locals() + '/serandomps', cwd + '/components', 'serandomps-') + '\n');
        }
    }
    child.stdin.write('echo "repo : ' + repo + ' cloned/symblinked"\n');
    //stopping helper process
    child.stdin.write('kill -9 ' + child.pid + '\n');
    child.on('close', function () {
        debug('starting hub instance');
        if (server) {
            server.kill('SIGKILL');
            debug('old hub instance stopped');
        }
        var argv = restart ? ['restart'] : [];
        server = fork(cwd + '/index.js', argv, {
            cwd: cwd,
            silent: true
        });
        server.stdout.pipe(process.stdout);
        server.stderr.pipe(process.stderr);
        server.on('message', function (data) {
            debug('hubber:message %s', data.event);
            switch (data.event) {
                case 'self up':
                    start(true);
                    break;
            }
        });
    });
};

start(false);