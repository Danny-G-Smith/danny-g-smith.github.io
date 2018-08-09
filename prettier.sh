#!/usr/bin/env bash

prettier es6 --write \
         --single-quote \
         --trailing-comma all \
         --no-bracket-spacing \
         --tab-width 3 \
         --no-semi   \
         --arrow-parens always \
         js/*.js
