#!/bin/bash

set -x

rsync -av --chown=xcrafter:xcrafter --delete \
  ./ru.xcrafter/app/templates/ \
  xcrafter@xcrafter.ru:/home/xcrafter/production/xcrafter.ru/app/templates/

ssh root@xcrafter.ru "service xcrafter restart"

