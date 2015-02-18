var log = require('logger')('hubber');
var hubber = require('./lib');

var hub = process.env.HUB;

var mode = hub ? 'hub' : 'hub-client';

var repo = hub ? 'https://github.com/serandules/hub.git' : 'https://github.com/serandules/hub-client.git';

log.info('hubber mode : %s', mode);

hubber.start(repo, 'index.js', function (err, id, pid, address) {
    if (err) {
        return log.error('%s startup error %s', mode, err);
    }
    log.info('%s started %s, %s, %s', mode, id, pid, address);
});
