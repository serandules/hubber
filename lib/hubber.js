var log = require('logger')('hubber');
var child_process = require('child_process');
var fork = child_process.fork;
var utils = require('utils');
var procevent = require('procevent');

var Drone = require('./drone');

var prod = utils.prod();

var mod = prod ? require('./prod') : require('./dev');

var parent = process.env.DRONES_DIR || '/tmp/serandives/drones';

var drones = {};

module.exports = function () {

};

module.exports.start = function (repo, done) {
    if (log.debug) {
        log.debug('starting repo %s in %s', repo, parent);
    }
    mod.setup(parent, repo, function (err, id, dir) {
        if (err) {
            log.error('error starting : %s', repo);
            return done(err);
        }
        var main = dir + '/index.js';
        if (log.debug) {
            log.debug('creating drone for main %s', main);
        }
        var drone = new Drone(id, main, process.env);
        drone.start(function (err, pid, address) {
            done(err, id, pid, address);
        });
        drones[id] = drone;
    });
};

module.exports.stop = function (id, done) {
    var drone = drones[id];
    if (!drone) {
        log.error('drone %s cannot be found', id);
        return done(true);
    }
    drone.stop(function (err) {
        if (err) {
            return done(err);
        }
        delete drones[id];
        done();
    });
};

module.exports.restart = function (id, done) {
    var drone = drones[id];
    if (!drone) {
        log.error('drone %s cannot be found', id);
        return done(true);
    }
    drone.restart(function (err, pid, address) {
        if (err) {
            delete drones[id];
            return done(err);
        }
        done(err, id, pid, address);
    });
};

module.exports.left = function (drone, cb) {

};

module.exports.joined = function (drone, cb) {

};