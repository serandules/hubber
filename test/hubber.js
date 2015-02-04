var log = require('logger')('test:hubber');
var http = require('http');
var fs = require('fs');
var mkdirp = require('mkdirp');
var rimraf = require('rimraf');
var child_process = require('child_process');
var fork = child_process.fork;

require('should');

var hubber = require('../lib/hubber');
var agent = require('hub-agent');

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

    /*describe('#start|restart|stop()', function () {
        this.timeout(5 * 1000);
        it('server should get started/restarted/stopped', function (done) {
            hubber.start(repo, 'index.js', function (err, id0, pid, address) {
                if (err) {
                    return done(err);
                }
                id0.should.be.type('string');
                pid.should.be.type('number');
                address.port.should.be.type('number');
                address.address.should.be.type('string');
                http.get('http://localhost:' + address.port + '/', function (res) {
                    res.statusCode.should.equal(200);
                    hubber.restart(id0, function (err, id1, pid, address) {
                        id0.should.equal(id1);
                        pid.should.be.type('number');
                        address.port.should.be.type('number');
                        address.address.should.be.type('string');
                        http.get('http://localhost:' + address.port + '/', function (res) {
                            res.statusCode.should.equal(200);
                            hubber.stop(id1, function (err) {
                                if (err) {
                                    return done(err);
                                }
                                Boolean(err).should.be.false;
                                done();
                            });
                        }).on('error', function (e) {
                            done(e);
                        });
                    });
                }).on('error', function (e) {
                    done(e);
                });
            });
        });
    });*/

    describe('#hub-agent', function () {
        this.timeout(50 * 1000);
        it('should execute done with response', function (done) {
            hubber.start(repo, 'hub.js', function (err, id, pid, address) {
                if (err) {
                    return done(err);
                }
                /*var hub = agent.hub();
                setTimeout(function() {
                    hub.emiton('config', 'ruchira', 'wageesha', function (err, p1, p2) {
                        p1.should.equal('ruchira');
                        p2.should.equal('wageesha');
                        hubber.stop(id, function (err) {
                            done(err);
                        });
                    });
                }, 5000);*/
            });
            hubber.start(repo, 'drone.js', function (err, id, pid, address) {
                if (err) {
                    return done(err);
                }
            });
        });
    });
});