#!/usr/bin/env node
const __initApp = require('@coffeekraken/sugar/node/app/initApp');
const __log = require('@coffeekraken/sugar/node/log/log');
const __path = require('path');
const __config = require('./commands/config');

// set some process variables
process.env["SUPPRESS_NO_CONFIG_WARNING"] = false;

const packageJson = require(__path.resolve(__dirname, '../package.json'));

// import dependencies
const commander = require("commander");

// init the app
__initApp({
  cwd: __path.resolve(__dirname + '/../')
});

// register the CLI arguments
commander
  .version(packageJson.version);

// register the CLI commands
commander
  .command("start")
  .description('Launch the scripts-stack interface listing the scripts defined by the webkit package as well as your scripts listed in the "scripts-stack.config.js" files at the the webkit root folder and at the "process.cwd()" directory...')
  .action(require('./commands/start'));

commander
  .command('test')
  .description('Launch jest test using the test files finded using this glob pattern "' + __config.tests.srcFilesPattern + '"')
  .action(() => {
    require('./commands/test')();
  });

commander
    .command('pre-view')
    .description('Launch the @coffeekraken/pre-view server to allow you for a quick and easy local development workflow...')
    .action(() => {
      require('./commands/preView')();
    });

commander
  .command('dist [what]')
  .description('Build/generate/compress the sources files like js, scss, images, etc...')
  .option('-b, --bundle', 'Use webpack instead of babel to bundler all the files names "*.bundle.js"')
  .action((what, cmdObj) => {

    switch(what) {
      case 'js':
        if (cmdObj.bundle) require('./commands/jsBundle.js')();
        else require('./commands/js')();
      break;
      case 'css':
      case 'scss':
      case 'sass':
        require('./commands/scss')();
      break;
      case 'img':
      case 'image':
      case 'images':
        require('./commands/img')();
      break;
      case 'all':
      default:
        require('./commands/js')();
        require('./commands/jsBundle')();
        require('./commands/scss')();
        require('./commands/img')();
      break;
    }
  });

commander
  .command('doc')
  .description(
    'Generate the "doc/src/**" folders and markdown files from the sources files as well as the "docMap.json" file if wanted'
  )
  .action((what) => {
    switch(what) {
      case 'map':
        require('./commands/docMap')();
      break;
      default:
        require('./commands/doc')();
      break;
    }
  });

// parse the arguments
commander.parse(process.argv);
