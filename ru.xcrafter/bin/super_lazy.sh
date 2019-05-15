#!/bin/bash

source ./bin/init_mail_config.sh
source ./bin/clean.sh
docker volume create --name=xcrafter.db
source ./bin/init_venv_and_up_db.sh
sleep 3
source ./bin/init_and_fill_db.sh
flask run

