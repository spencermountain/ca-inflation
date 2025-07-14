#!/bin/bash
node ./scripts/update.js
node ./scripts/bump.js
npm run build
# npm publish