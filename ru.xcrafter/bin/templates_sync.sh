#!/bin/bash

rsync -av --chown=xcrafter:xcrafter --delete \
  ./ru.xcrafter/app/templates/ \
  xcrafter@xcrafter.ru:/home/xcrafter/production/xcrafter.ru/app/templates/

