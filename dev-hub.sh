#!/bin/sh
export SU_PASS=abcdef
export CLIENT_TOKEN=abcdef
export NODE_ENV=development

export HUB_DIR=/Users/ruchira/serandives/servers
export LOCAL_REPO=/Users/ruchira/sources/github

#hub
export HUB=true
clear
node index.js
