#!/bin/bash

excludes=(--exclude=pyc \
          --exclude=__pycache__ \
          --exclude=.git \
          --exclude=bundle.min.js \
          --exclude=vendors.min.js \
          --exclude=.env.dev \
          --exclude=.env.stage
          --exclude=.idea \
          --exclude=*.log \
          --exclude=venv
          )

rsync -avr ${excludes[@]} --delete  ~/projects/xcrafter/ xcrafter.ru:/home/xcrafter/production/xcrafter.ru