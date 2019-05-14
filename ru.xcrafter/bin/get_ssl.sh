#!/bin/bash

service nginx stop
certbot certonly --standalone -d xcrafter.ru
service nginx start
