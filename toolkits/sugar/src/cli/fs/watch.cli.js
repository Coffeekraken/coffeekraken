const __argsToObject = require('../../node/cli/argsToObject');
const __chokidar = require('chokidar');
const __packageRoot = require('../../node/path/packageRoot');
const __path = require('path');

/**
 * @name                watch
 * @namespace           cli.fs
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
  pattern: {
    type: 'String',
    alias: 'p',
    description: 'Files glob pattern(s)',
    required: true
  },
  type: {
    type: 'String',
    alias: 't',
    description: 'What you want to watch',
    default: 'new,update,delete'
  },
  persistent: {
    type: 'Boolean',
    description: 'Specify if the process shoud stay alive',
    default: true
  },
  ignore: {
    type: 'String',
    alias: 'i',
    description: 'Some glob patterns to ignore'
  }
};
module.exports = (stringArgs = '') => {
  const args = __argsToObject(stringArgs, definition);
  const watcher = __chokidar.watch(args.pattern.split(','), {
    persistent: args.persistent,
    ignored: args.ignore,
    ignoreInitial: true,
    followSymlinks: true,
    cwd: __packageRoot(process.cwd()),
    ignorePermissionErrors: false
  });

  watcher
    // .on('all', (e) => {
    //   console.log('EVEN', e);
    // })
    .on('add', (path) => {
      if (args.type.split(',').indexOf('new') === -1) return;
      console.log(`new:${__path.resolve(path)}`);
    })
    .on('change', (path) => {
      if (args.type.split(',').indexOf('update') === -1) return;
      console.log(`update:${__path.resolve(path)}`);
    })
    .on('unlink', (path) => {
      if (args.type.split(',').indexOf('delete') === -1) return;
      console.log(`delete:${__path.resolve(path)}`);
    });
};
module.exports.definition = definition;
