#!/bin/bash
set -e
echo "Updating apt..."
sudo apt-get update -y
echo "Installing prerequisites..."
sudo apt-get install -y curl dirmngr apt-transport-https lsb-release ca-certificates gcc g++ make nginx git sqlite3
echo "Installing Node.js 20..."
curl -fsSL https://deb.nodesource.com/setup_20.x | sudo -E bash -
sudo apt-get install -y nodejs
echo "Installing PM2..."
sudo npm install -g pm2
echo "Configuring firewall..."
sudo ufw allow 'Nginx Full'
sudo ufw allow OpenSSH
echo "y" | sudo ufw enable
echo "Server provisioning complete!"
