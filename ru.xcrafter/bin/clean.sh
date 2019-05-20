#!/bin/bash

set -x

cd ./db
docker-compose down
cd ..

rm -r ./venv
rm -r ./migrations

deactivate
