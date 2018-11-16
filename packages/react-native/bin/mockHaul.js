#!/usr/bin/env node
require('babel-register')({
  only: /haul/,
  retainLines: true,
  sourceMaps: 'inline'
});

require('haul/src/cli');
