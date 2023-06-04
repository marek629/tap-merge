#!/bin/env bash

yarn prettier --check src/ test/
yarn build

chmod +x dist/cli.js
