#!/bin/sh
for project in "hubber" "utils" "scripts" "hub" "hub-client" "hub-agent" "proxy" "autos" "autos-services" "accounts" \
                "build" "logger" "menu-service" "auth" "apis" "socproc" "socproc-client" "serand-token" "hub-token" \
                "hub-services" "vehicle-service" "client" "vehicle" "mongutils" "user-service" "user" \
                "client-service" "token-service" "token" "formida"
do
   git clone https://github.com/serandules/$project
   #echo $project
done
