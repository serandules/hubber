#!/bin/sh

export PRODUCTION=true
export HUB=true
export DRONES_DIR=/tmp/serandives/drones
export NODE_PATH=$NODE_HOME/lib/node_modules
export PATH=$NODE_HOME/bin:$PATH

if [ $HUB = "true" ]
then
    LOG="hub.log"
else
    LOG="hub-client.log"
fi

#rm -rf $DRONES_DIR/*

nohup node index.js > $LOG &
