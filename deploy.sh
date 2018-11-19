#!/bin/bash

# optional parameters: additional parameters to supply to aws (e.g. profile)

# build the project (contents will be in directory dist/bms-front)
ng build --prod
echo "==="
echo "Build complete"

# deploy on reliefapps server
rsync -ravzh dist/ manager@reliefapps:/var/www/html/
echo "==="
echo "Upload complete"
