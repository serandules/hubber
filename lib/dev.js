var log = require('logger')('hubber:dev');
var child_process = require('child_process');
var spawn = child_process.spawn;

var name = function (repo) {
    return repo.substring(repo.lastIndexOf('/') + 1, repo.lastIndexOf('.'));
};

var locals = process.env.LOCALS || '/Users/ruchira/sources/github';

var linkMods = function () {
    var cmd = 'mkdir node_modules\n';
    cmd += 'for dir in ' + locals + '/serandules/*; do rm -rf `pwd`/node_modules/$(basename "$dir");';
    cmd += 'ln -s ' + locals + '/serandules/$(basename "$dir") `pwd`/node_modules/$(basename "$dir"); done;\n';
    return cmd;
};

var linkComps = function () {
    var cmd = 'mkdir components\n';
    cmd += 'for dir in ' + locals + '/serandomps/*; do rm -rf `pwd`/components/serandomps-$(basename "$dir");';
    cmd += 'ln -s ' + locals + '/serandomps/$(basename "$dir") `pwd`/components/serandomps-$(basename "$dir"); done;\n';
    cmd += 'ln -s ' + locals + '/visionmedia-page.js `pwd`/components/visionmedia-page.js\n';
    cmd += 'ln -s ' + locals + '/pillarjs-path-to-regexp `pwd`/components/pillarjs-path-to-regexp\n';
    cmd += 'ln -s ' + locals + '/node-querystring `pwd`/components/visionmedia-node-querystring\n';
    return cmd;
};

/**
 * sets up the development environment for the given repo
 * @param parent
 * @param repo
 * @param done
 */
module.exports.setup = function (parent, repo, done) {
    var id = name(repo);
    var dir = parent + '/' + id;
    if (log.debug) {
        log.debug('using local repo %s', locals);
        log.debug('setting up repo %s in %s', id, dir);
    }
    var bash = spawn('bash');
    bash.stdout.pipe(process.stdout);
    bash.stderr.pipe(process.stderr);
    bash.stdin.write('cp -rf ' + locals + '/serandules/' + id + ' ' + parent + '\n');
    bash.stdin.write('cd ' + dir + '\n');
    bash.stdin.write(linkMods() + '\n');
    bash.stdin.write(linkComps() + '\n');
    bash.stdin.write('kill -9 ' + bash.pid + '\n');

    bash.on('close', function (code, signal) {
        if (log.debug) {
            log.debug('setup process exited code: %s signal: %s');
        }
        done(false, id, dir);
    });
};