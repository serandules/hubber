#!/bin/sh
for dir in serandomps/* ; do
cd $dir;
git config --global user.email "serandomps@gmail.com"
git config --global user.name "serandomps"
cd ../..;
done

for dir in serandules/* ; do
cd $dir;
git config --global user.email "serandules@gmail.com"
git config --global user.name "serandules"
cd ../..;
done
