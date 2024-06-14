git fetch --all
git reset --hard origin/main
bun i
cp ../.env ./env
pm2 restart 0