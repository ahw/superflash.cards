#!/bin/sh

./node_modules/.bin/nearleyc grammar.ne -o grammar.js
/Users/andrew/.nvm/versions/node/v8.11.2/bin/node grammar-test.js