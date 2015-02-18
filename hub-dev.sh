#!/bin/sh

export HUB=true
export LOCAL_REPO=/Users/ruchira/sources/git
export DRONES_DIR=/tmp/serandives/drones

rm -rf $DRONES_DIR/*

node index.js