#!/bin/sh

export HUB=true
export LOCAL_REPO=/Users/ruchira/sources/git
export DRONES_DIR=/tmp/serandives/drones
export NODE_PATH=/Users/ruchira/softwares/node-v0.12.0-darwin-x64/lib/node_modules

#rm -rf $DRONES_DIR/*

node index.js