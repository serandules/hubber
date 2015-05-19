#!/bin/sh

export SU_PASS=ruchira
export NODE_TLS_REJECT_UNAUTHORIZED="0"
export LOCAL_REPO=/Users/ruchira/sources/git
export DRONES_DIR=/tmp/serandives/drones
export NODE_PATH=/Users/ruchira/softwares/node-v0.12.0-darwin-x64/lib/node_modules

node index.js