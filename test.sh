#!/bin/bash

function killServer {
	kill $NODE_PID
}

trap killServer EXIT

./node_modules/http-server/bin/http-server -p 8888 &
NODE_PID=$!
sleep 3

./node_modules/mocha-phantomjs/bin/mocha-phantomjs -p ./node_modules/.bin/phantomjs -R spec "http://localhost:8888/test/formTest.js.html";
