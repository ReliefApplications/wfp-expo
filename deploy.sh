#!/bin/bash

# optional parameters: additional parameters to supply to aws (e.g. profile)

# build the project (contents will be in directory dist/bms-front)
ng build --prod
echo "==="
echo "Build complete"

# copy .htaccess to dist
cp .htaccess dist/wfp-expo

# deploy on reliefapps server
rsync -ravzh dist/ manager@213.167.240.8:/var/www/html/
# ssh manager@reliefapps -t "cd /var/www/html/wfp-expo/ ; zsh ; source ~/.zshrc ; git fetch --all && git reset --hard origin/dev; ./build.sh"

echo "==="
echo "Upload complete"
