var log = require('logger')('hubber');
var uuid = require('node-uuid');
var droner = require('droner');
var procevent = require('procevent');

var drone;

var hub = process.env.HUB;

var mode = hub ? 'hub' : 'hub-client';

var repo = hub ? 'https://github.com/serandules/hub.git' : 'https://github.com/serandules/hub-client.git';

log.info('hubber mode : %s', mode);

var id = uuid.v4();

var run = function (process, address) {
    drone = procevent(process);
    drone.on('up', function () {
        log.info('self up request drone:%s mode:%s', id, mode);
        droner.restart(id, function (err, process, address) {
            drone.destroy();
            run(process, address);
        });
    });
    log.info('drone started | mode:%s, pid:%s, address:%s', mode, process.pid, address);
};

droner.start(id, repo, 'index.js', function (err, process, address) {
    if (err) {
        return log.error('drone startup error | mode:%s, error:%s', mode, err);
    }
    run(process, address);
});
