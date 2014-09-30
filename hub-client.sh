#!/bin/sh
export NODE_ENV=production

npm install

#hub-client
export HUB_DIR=~/serandives/hub-client
export HUB=false
node index.js > hub-client.log &