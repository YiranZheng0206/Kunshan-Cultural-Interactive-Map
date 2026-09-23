#!/bin/zsh
# Serve this directory over HTTP so OpenStreetMap tile requests include a Referer.
cd -- "$(dirname "$0")"
open "http://127.0.0.1:4173/index.html"
python3 -m http.server 4173 --bind 127.0.0.1
