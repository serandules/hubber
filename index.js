var log = require('logger')('hubber');
var hubber = require('./lib/hubber');

var hub = process.env.HUB === 'true';
var mode = hub ? 'hub' : 'hub-client';

var REPO = hub ? 'https://github.com/serandules/hub.git' : 'https://github.com/serandules/hub-client.git';

log.info('hubber mode : %s', mode);

hubber.start(REPO, 'index.js', function (err, id, pid, address) {
    if (err) {
        log.error('%s startup error %s', mode, err);
        return;
    }
    log.info('%s started %s, %s, %s', mode, id, pid, address);
});