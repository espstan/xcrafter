apt-get update
apt-get install -y nginx
apt-get install software-properties-common
add-apt-repository universe
add-apt-repository ppa:certbot/certbot
apt-get update
apt-get install -y certbot python-certbot-nginx

sudo certbot --nginx -d www.xcrafter.ru -d static.xcrafter.ru -d api.xcrafter.ru -d m.xcrafter.ru
