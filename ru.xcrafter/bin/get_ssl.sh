#!/bin/bash

set -x

service nginx stop
letsencrypt certonly --standalone \
-d xcrafter.ru \
-d www.xcrafter.ru \
-d static.xcrafter.ru \
-d api.xcrafter.ru \
-d m.xcrafter.ru
service nginx start

