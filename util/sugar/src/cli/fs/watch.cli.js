const __parseArgs = require('../../node/cli/parseArgs');
const __chokidar = require('chokidar');
const __packageRoot = require('../../node/path/packageRoot');

/**
 * @name                watch
 * @namespace           sugar.cli.fs
 * @type                cli
 *
 * This command simply take some glob patterns to watch files.
 * This command console log the updated/new/deleted files
 *
 * @param       {String}        --patterns|-p          The glob patterns to watch separated by a comma. Do not put space either...
 * @param       {String}        [--type|-t="new,update,delete"]              Specify what you want to watch using a comma separated string. The accepted values are "new,delete,update"
 * @param       {Boolean}       [--persistent=true]                         Indicates whether the process should continue to run as long as files are being watched
 * @param       {String}        --ignore|-i           Specify some glob patterns of files to ignore
 *
 * @example       cli
 * sugar fs.watch /myFolder/*.js
 *
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

const definition = {
  patterns: {
    type: 'String',
    alias: 'p',
    default: ''
  },
  type: {
    type: 'String',
    alias: 't',
    default: 'new,update,delete'
  },
  persistent: {
    type: 'Boolean',
    default: true
  },
  ignore: {
    type: 'String',
    alias: 'i',
    default: null
  }
};
module.exports = (stringArgs = '') => {
  const args = __parseArgs(stringArgs, definition);
  const watcher = __chokidar.watch(args.patterns.split(','), {
    persistent: args.persistent,
    ignored: args.ignore,
    ignoreInitial: true,
    followSymlinks: true,
    cwd: __packageRoot(process.cwd()),
    ignorePermissionErrors: true
  });

  watcher
    .on('add', (path) => {
      if (args.type.split(',').indexOf('new') === -1) return;
      console.log(`new:${path}`);
    })
    .on('change', (path) => {
      if (args.type.split(',').indexOf('update') === -1) return;
      console.log(`update:${path}`);
    })
    .on('unlink', (path) => {
      if (args.type.split(',').indexOf('delete') === -1) return;
      console.log(`delete:${path}`);
    });
};
module.exports.definition = definition;
