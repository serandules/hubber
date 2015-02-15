var log = require('logger')('test:dev');
var child_process = require('child_process');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var spawn = child_process.spawn;

require('should');

describe('dev', function () {
    describe('#setup()', function () {
        var parent = '/tmp/serandules/sandbox';
        this.timeout(120 * 1000);
        before(function () {
            if (!fs.existsSync(parent)) mkdirp.sync(parent);
        });
        after(function () {
            rimraf.sync(parent);
        });
        it('should setup without error', function (done) {
            var dev = require('../../hub-agent/lib/dev');
            var repo = 'https://github.com/serandules/hubber.git';
            dev.setup(parent, repo, function (err, id, dir) {
                if (err) {
                    return done(err);
                }
                id.should.be.type('string');
                dir.should.equal(parent + '/' + id);
                done();
            });
        });
    });
});