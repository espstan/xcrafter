#!/bin/bash

cd ./db
docker-compose down
cd ..

rm -r ./venv
rm -r ./migrations

deactivate
