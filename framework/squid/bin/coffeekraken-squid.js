#!/usr/bin/env node
const __initApp = require('@coffeekraken/sugar/node/app/initApp');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');
const commander = require("commander");
const packageJson = require(__path.resolve(__dirname, '../package.json'));

// init the app
__initApp();

// register the CLI arguments
commander
  .version(packageJson.version);

// register the CLI commands
commander
  .command("start")
  .description('Launch the Squid application. This will start a nodeJS http server and all the services needed to handle your routes, etc...')
  .action(require('./commands/start'));

// parse the arguments
commander.parse(process.argv);
