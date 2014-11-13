#!/bin/sh
#export SU_PASS
#export CLIENT_TOKEN
export NODE_ENV=production

npm install

#hub
export HUB_DIR=~/serandives/hub
export HUB=true
node index.js > hub.log &
