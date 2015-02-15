var log = require('logger')('test:prod');
var child_process = require('child_process');
var fs = require('fs');
var rimraf = require('rimraf');
var mkdirp = require('mkdirp');
var spawn = child_process.spawn;

require('should');

describe('prod', function () {
    describe('#setup()', function () {
        var parent = '/tmp/serandules/sandbox';
        this.timeout(120 * 1000);
        before(function () {
            if (!fs.existsSync(parent))  mkdirp.sync(parent);
        });
        after(function () {
            rimraf.sync(parent);
        });
        it('should setup without error', function (done) {
            var prod = require('../../hub-agent/lib/prod');
            var repo = 'https://github.com/serandules/hubber.git';
            prod.setup(parent, repo, function (err, id, dir) {
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