#!/bin/bash
set -e
cd /var/www/dulaidila-cms

echo "Installing npm dependencies..."
npm install

echo "Generating Prisma Client..."
npx prisma generate

echo "Building Next.js for production..."
npm run build

echo "Daemonizing with PM2..."
# If it exists, restart it. Otherwise start it.
pm2 describe dulaidila-cms > /dev/null
if [ $? -eq 0 ]; then
    pm2 restart dulaidila-cms
else
    pm2 start npm --name "dulaidila-cms" -- start
fi

echo "Saving PM2 list to respawn on reboot..."
pm2 save
sudo env PATH=$PATH:/usr/bin /usr/lib/node_modules/pm2/bin/pm2 startup systemd -u ubuntu --hp /home/ubuntu
