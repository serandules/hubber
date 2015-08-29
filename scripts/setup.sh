#!/bin/sh
for dir in serandomps/* ; do
cd $dir;
pwd
git config user.email "serandomps@gmail.com"
git config user.name "serandomps"
cd ../..;
done

for dir in serandules/* ; do
cd $dir;
pwd
git config user.email "serandules@gmail.com"
git config user.name "serandules"
cd ../..;
done
