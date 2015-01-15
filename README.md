hubber
======

install g++
npm install -g ﻿force-dedupe-git-modules
npm install -g bcrypt
npm install -g component
sudo env PATH=$PATH sh hub.sh

open sockets
------------
netstat -an | grep -e tcp -e udp | wc -l

OS X increase sockets
---------------------
sudo sysctl -w kern.ipc.somaxconn=2048

OS X check sockets
-----------------
sysctl -a | grep somax
