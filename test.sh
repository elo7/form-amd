#!/bin/bash

function finish {
  ./tearDown.sh
}

trap finish EXIT

./setup.sh
./node_modules/.bin/mocha-chrome -r spec http://localhost:8888/test/formTest.js.html
