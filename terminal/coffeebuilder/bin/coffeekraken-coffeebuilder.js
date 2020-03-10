#!/usr/bin/env node
const __initApp = require('@coffeekraken/sugar/node/app/initApp');
const __path = require('path');
const commander = require("commander");
const packageJson = require(__path.resolve(__dirname, '../package.json'));

// init the app
__initApp();

// register the CLI arguments
commander
  .version(packageJson.version);

// register the options
commander
  .option('-w --watch', 'Enable the watching system')

// register the CLI commands
commander
  .command("start [compileTypes...]")
  .description('Start the CoffeeBuilder process. You can specify compile types if you want')
  .action(require('./commands/start'));

// parse the arguments
commander.parse(process.argv);
