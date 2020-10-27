#!/bin/sh

export FLASK_ENV=development
export FLASK_APP=app.py

cd client
npx react-scripts build
mv build/index.html ../templates/
mv build/static/* ../static

cd ../
flask run --host=0.0.0.0
