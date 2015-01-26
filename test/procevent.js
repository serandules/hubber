var log = require('logger')('test:procevent');
var child_process = require('child_process');
var fork = child_process.fork;

require('should');

describe('procevent', function () {
    var parent;
    before(function (done) {
        parent = fork('./lib/procevent/parent.js', {
            cwd: __dirname
        });
        done();
    });
    after(function () {
        log.info('cleaning up');
        parent.kill();
    });
    describe('#emit()', function () {
        it('should return data array', function (done) {
            var procevent = require('../lib/procevent');
            var pa = procevent(parent);
            pa.on('hui', function (a, b) {
                a.should.equal('family');
                b.should.equal(6);
                done();
            });
            pa.emit('hi');
        });
    });
});