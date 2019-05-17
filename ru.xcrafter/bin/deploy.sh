#!/bin/bash

excludes=(--exclude=pyc \
          --exclude=__pycache__ \
          --exclude=.git \
          --exclude=bundle.min.js \
          --exclude=vendors.min.js \
          --exclude=.env.dev \
          --exclude=.env.stage \
          --exclude=.idea \
          --exclude=*.log \
          --exclude=venv
          )

rsync -av ${excludes[@]} --chown=xcrafter:xcrafter --delete \
  ./ru.xcrafter/ \
  xcrafter@xcrafter.ru:/home/xcrafter/production/xcrafter.ru

ssh root@xcrafter.ru<<EOF
cd /home/xcrafter/production/
source venv/bin/activate
pip install -r ./xcrafter.ru/requirements.txt
service xcrafter restart
EOF

