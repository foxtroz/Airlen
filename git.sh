#!/bin/sh -e

echo git add .
git add .
echo git commit -m$(date +%d-%m-%Y\ %H:%M:%S)
git commit -m"$(date +%d-%m-%Y\ %H:%M:%S)"
echo git push
git push

