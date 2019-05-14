#!/bin/bash

ssh xcrafter.ru << EOF
apt-get update
apt install -y nginx
apt install -y python3-pip
apt install -y virtualenv
apt install -y letsencrypt

echo "Port 1990" >> /etc/ssh/sshd_config
systemctl restart ssh
EOF

