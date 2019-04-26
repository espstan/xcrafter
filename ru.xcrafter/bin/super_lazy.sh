#! /bin/bash

source ./bin/clean.sh
source ./bin/init_venv_and_up_db.sh
sleep 3
source ./bin/init_and_fill_db.sh
flask run