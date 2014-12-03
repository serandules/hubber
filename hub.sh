#!/bin/sh
#export SU_PASS
#export CLIENT_TOKEN
export NODE_ENV=production

npm install

#hub
export HUB_DIR=/opt/serandives/hub
export LOGS_DIR=/opt/serandives/logs
export HUB=true
node index.js > hub.log &
