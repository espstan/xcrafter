#!/bin/bash

service nginx stop
certbot certonly --standalone -d www.xcrafter.ru -d static.xcrafter.ru -d api.xcrafter.ru -d m.xcrafter.ru
service nginx start
