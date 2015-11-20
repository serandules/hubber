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



user.permissions {

}

user.permitted = {
    read: {
        groups: [],
        users: []
    }
}


https://www.facebook.com/dialog/oauth?client_id=911082242310402&redirect_uri=https://accounts.serandives.com/signin/facebook

https://accounts.serandives.com/auth/oauth?client_id=911082242310402&redirect_uri=https://accounts.serandives.com/signin/facebook

https://accounts.serandives.com/signin/facebook

https://accounts.serandives.com/authorize/oauth
https://accounts.serandives.com/signin/done
https://accounts.serandives.com/authorized



https://autos.serandives.com/signin --> https://accounts.serandives.com/signin?client_id=123456&redirect_uri=autos
https://accounts.serandives.com/signin

https://accounts.serandives.com/signin
https://accounts.serandives.com/signin/facebook

https://accounts.serandives.com/auth/oauth

--> https://autos.serandives.com/auth/oauth
        access_token=123456&refresh_token=123456







        




GET POST https://autos.serandives.com/signin --> https://accounts.serandives.com/signin?client_id=123456&redirect_uri=autos
https://accounts.serandives.com/signin

POST https://accounts.serandives.com/signin
https://accounts.serandives.com/signin/facebook

https://accounts.serandives.com/auth/oauth

--> https://autos.serandives.com/auth/oauth
        access_token=123456&refresh_token=123456


external web authentication flow
===================================

https://lanka.lk
https://lanka.lk/signin
https://accounts.serandives.com/signin?client_id=lanka&redirect_uri=https://lanka.lk/auth/oauth
https://lanka.lk/auth/oauth?code=abcdef

https://accounts.serandives.com/apis/v/token?client_id=lanka&client_secret=123456&code=abcdef
https://lanka.lk

internal web authentication flow
================================

https://autos.serandives.com
https://autos.serandives.com/signin
https://accounts.serandives.com/signin?client_id=autos&redirect_uri=https://autos.serandives.com/auth/oauth
https://autos.serandives.com/auth/oauth?access_token=abcdef&refresh_token=ghijkl

https://accounts.serandives.com/apis/v/token?client_id=autos&client_secret=123456&code=abcdef
https://autos.serandives.com