#! /bin/bash

set -x

flask db init
flask db migrate -m "test"
flask db upgrade
