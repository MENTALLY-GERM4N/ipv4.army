git fetch --all
git reset --hard origin/main
bun i
bun run build.js
pm2 restart 0