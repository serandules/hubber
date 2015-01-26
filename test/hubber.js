var log = require('logger')('test:hubber');
var http = require('http');
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var child_process = require('child_process');
var fork = child_process.fork;

require('should');

var hubber = require('../lib/hubber');

describe('hubber', function () {
    var repo = 'https://github.com/serandules/sandbox.git';
    var parent = '/tmp/serandives/drones';
    before(function () {
        if (!fs.existsSync(parent)) {
            mkdirp.sync(parent);
        }
    });
    after(function () {
        rimraf.sync(parent);
    });
    describe('#start()', function () {
        this.timeout(5 * 1000);
        it('server should get started up', function (done) {
            hubber.start(repo, function (err, id, port, pid) {
                if (err) {
                    return done(err);
                }
                id.should.be.type('string');
                port.should.be.type('number');
                pid.should.be.type('number');
                http.get('http://localhost:' + port + '/', function (res) {
                    res.statusCode.should.equal(200);
                    hubber.stop(id, function (err) {
                        Boolean(err).should.be.false;
                    });
                    done();
                }).on('error', function (e) {
                    done(e);
                });
            });
        });
    });
});