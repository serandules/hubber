#!/bin/sh

export PRODUCTION=true
export SU_PASS=ruchira
export NODE_TLS_REJECT_UNAUTHORIZED="0"
export DRONES_DIR=/tmp/serandives/drones
export NODE_PATH=$NODE_HOME/lib/node_modules

node index.js