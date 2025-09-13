#!/bin/bash
# Lancer le serveur principal
node server/server.js &

# Lancer le serveur dummy (score)
node server/dummyserver.js
