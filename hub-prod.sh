#!/bin/sh

export SU_PASS=ruchira
export PRODUCTION=true
export HUB=true
export DRONES_DIR=/opt/serandives/drones
export PATH=$NODE_HOME/bin:$PATH
export NODE_PATH=$NODE_HOME/lib/node_modules

#rm -rf $DRONES_DIR/*

nohup node index.js > hub.log &
