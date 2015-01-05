#!/bin/sh
sudo pkill node
cd /opt/serandives/hubber
sudo git pull
export DEBUG=serandules:*
export SU_PASS=ruchira
export CLIENT_TOKEN=ruchira
sudo -E sh /opt/serandives/hubber/dev-hub.sh
sudo -E sh /opt/serandives/hubber/dev-hub-client.sh
