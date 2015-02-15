var log = require('logger')('hubber');

var agent = require('hub-agent');

var hub = process.env.HUB;

var mode = hub ? 'hub' : 'hub-client';

var repo = hub ? 'https://github.com/serandules/hub.git' : 'https://github.com/serandules/hub-client.git';

agent.start(repo, 'index.js', function (err, id, pid, address) {
    if (err) {
        log.error('%s startup error %s', mode, err);
        return;
    }
    log.info('%s started %s, %s, %s', mode, id, pid, address);
});