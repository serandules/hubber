var log = require('logger')('hubber');
var uuid = require('node-uuid');
var droner = require('droner');

var hub = process.env.HUB;

var mode = hub ? 'hub' : 'hub-client';

var repo = hub ? 'https://github.com/serandules/hub.git' : 'https://github.com/serandules/hub-client.git';

log.info('hubber mode : %s', mode);

var id = uuid.v4();
droner.start(id, repo, 'index.js', function (err, pid, address) {
    if (err) {
        return log.error('drone startup error | mode:%s, error:%s', mode, err);
    }
    log.info('drone started | mode:%s, pid:%s, address:%s', mode, pid, address);
});
