#!/bin/bash

ssh xcrafter.ru << EOF
apt-get update
apt install -y nginx python3-pip virtualenv letsencrypt

echo "Port 1990" >> /etc/ssh/sshd_config
systemctl restart ssh
EOF

