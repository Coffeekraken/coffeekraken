#!/usr/bin/env node
require('module-alias/register');
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
  .command("start [env]")
  .description('Launch the Squid application. This will start a nodeJS http server and all the services needed to handle your routes, etc...')
  .action(require('./commands/start'));

commander
  .command('squid [what]')
  .description('Handle the generation/compilation/optimization of javascript, stylesheets and images files inside the Squid framework folder')
  .action(what => {
    switch(what) {
      case 'js':
        require('./commands/squidJs')();
      break;
    }
  });

commander
  .command("dist [what]")
  .description('Handle the generation/compilation/optimization of javascript, stylesheets and images files')
  .action(what => {
    switch(what) {
      case 'js':
        require('./commands/js')();
      break;
    }
  });

// parse the arguments
commander.parse(process.argv);
