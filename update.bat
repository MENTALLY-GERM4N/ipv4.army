@echo off

pnpm run build

cd dist

git init
git add .
git commit -m "update"
git branch -M main
git remote add origin https://github.com/wont-stream/wont-stream.github.io.git
git push -u origin main