#!/bin/bash

set -x

virtualenv -p python3 ./venv

source ./venv/bin/activate

pip install -r ./requirements.txt

