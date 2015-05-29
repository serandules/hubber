#!/bin/sh

export PRODUCTION=true
export NODE_TLS_REJECT_UNAUTHORIZED="0"
export DRONES_DIR=/tmp/serandives/drones
export NODE_PATH=$NODE_HOME/lib/node_modules
export PATH=$NODE_HOME/bin:$PATH

nohup node index.js > hub-client.log &