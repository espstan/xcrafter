#!/bin/bash

set -x

ssh xcrafter.ru << EOF
apt-get update
apt install -y nginx python3-pip virtualenv letsencrypt
wget -O - https://get.docker.com | bash -
pip3 install docker-compose

echo "Port 1990" >> /etc/ssh/sshd_config
systemctl restart ssh
EOF

