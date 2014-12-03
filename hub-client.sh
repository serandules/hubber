#!/bin/sh
export NODE_ENV=production

npm install

#hub-client
export HUB_DIR=/opt/serandives/hub-client
export DRONES_DIR=/opt/serandives/drones
export LOGS_DIR=/opt/serandives/logs
export HUB=false
node index.js > hub-client.log &