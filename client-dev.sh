#!/bin/sh

export SU_PASS=ruchira
export NODE_TLS_REJECT_UNAUTHORIZED="0"
export LOCAL_REPO=/home/ruchiraw/sources/serandives
export DRONES_DIR=/tmp/serandives/drones
export PATH=$NODE_HOME/bin:$PATH
export NODE_PATH=$NODE_HOME/lib/node_modules

node index.js