#!/bin/sh

export FLASK_ENV=development
export FLASK_APP=app.py

cd client
npx react-scripts build

mv build/index.html ../templates/index.html
rm -rf ../static/*
mv build/static/* ../static

cd ../
flask run --host=0.0.0.0
