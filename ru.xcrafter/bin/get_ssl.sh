#!/bin/bash

service nginx stop
letsencrypt certonly --standalone \
-d www.xcrafter.ru \
-d static.xcrafter.ru \
-d api.xcrafter.ru \
-d m.xcrafter.ru \
-d xcrafter.ru
service nginx start

