#!/bin/sh

export SU_PASS=ruchira
export HUB=true
# export LOCAL_REPO=/home/ruchiraw/sources/serandives
export DRONES_DIR=/Users/ruchira/sources/serandives/drones
export PATH=$NODE_HOME/bin:$PATH
export NODE_PATH=$NODE_HOME/lib/node_modules

#rm -rf $DRONES_DIR/*

node index.js