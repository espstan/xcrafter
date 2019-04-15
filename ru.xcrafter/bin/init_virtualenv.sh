#! /bin/bash

virtualenv -p python3 ./venv

source ./venv/bin/activate

pip install flask sqlalchemy flask-sqlalchemy flask-migrate flask-wtf python-dotenv
