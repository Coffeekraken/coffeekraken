#!/usr/bin/env node --trace-warnings --trace-uncaught

import __SProcess from '../node/process/SProcess';

require('../node/index');
// const __exitCleanup = require('../node/process/exitCleanup');

/**
 * @name            sugar.cli
 * @namespace           cli
 * @type            File
 *
 * This is the main sugar cli file that split the commands
 * by calling the proper files with the parsed cli args
 *
 * @author                 Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const command =
  process.argv && process.argv[2] ? process.argv[2].split(' ')[0] : '';
let stack = command.split('.')[0];
let action = command.split('.')[1] || null;
const args =
  process.argv
    .slice(3)
    .map((arg) => {
      if (arg.slice(0, 2) !== '--' && arg.slice(0, 1) !== '-') {
        return `"${arg}"`;
      }
      return arg;
    })
    .join(' ') || '';

// if theirs nothing as stack or action
if (!stack) {
  stack = 'app';
}

// if no action, try to get the default one
if (!action) {
  const config = require(`./${stack}/config.json`);
  if (!config.default) {
    throw new Error(
      `Sorry but you have to specify an action to make on the module "${stack}}"...`
    );
  } else {
    action = config.default;
  }
}

// const pkg = require(`./${stack}/${action}.cli.js`);
let cliApi = require(`./${stack}/${action}.cli.js`).default;

(async () => {
  // SProcess classes
  if (cliApi.prototype && cliApi.prototype instanceof __SProcess) {
    const processInstance = new cliApi({});
    return await processInstance.run(args);
  } else if (typeof cliApi === 'function') {
    return await cliApi(args);
  }
})();

// if (fn.default) fn = fn.default;
// fn(args);
