#!/bin/sh
sudo pkill node
cd /opt/serandives/hubber
sudo git pull
export SU_PASS=ruchira
export CLIENT_TOKEN=ruchira
sudo -E sh /opt/serandives/hubber/hub.sh
sudo -E sh /opt/serandives/hubber/hub-client.sh
