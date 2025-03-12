#!/bin/sh
set -x #echo on

WORKDIRCONF=/home/studs/***/httpd-root/conf
WORKDIRJAR=/home/studs/***/httpd-root/fcgi-bin
WORKDIRSTATIC=/home/studs/***/www

CONFPATH=/Users/macbook/WEB/WebLab1/httpd.conf
JARPATH=/Users/macbook/WEB/WebLab1/build/libs/WebLab1.jar
RESOURCESPATH=/Users/macbook/WEB/WebLab1/src/main/resources/*


REMOTE_HOST=helios.cs.ifmo.ru
REMOTE_PORT=2222

REMOTE_USER=***
REMOTE_PASSWORD=***

sshpass -p "$REMOTE_PASSWORD" scp -P 2222 $RESOURCESPATH $REMOTE_USER@$REMOTE_HOST:$WORKDIRSTATIC
