#!/usr/bin/env node

/**
 * @fileoverview CLI script for the package.
 * @module
 */
/* eslint-env node, es6 */

const prgm = require('commander');
const pkg = require('./package.json'),
  { fileToArr } = require('./src/index');

prgm.arguments('[files...]')
  .version(pkg.version)
  .description(pkg.description)
  .action((files) => {
    files.forEach(file => fileToArr(file));
  })
  .parse(process.argv);