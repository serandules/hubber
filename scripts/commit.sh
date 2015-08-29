#!/bin/sh
for dir in */ ; do
cd $dir;
if git status | grep "nothing to commit, working directory clean"; then
    echo "----skipping $dir----"; 
else
    echo "----committing $dir----";
    git commit -am "updating";
    git push;
fi
cd ..;
done
