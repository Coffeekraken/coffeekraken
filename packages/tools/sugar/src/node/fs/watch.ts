// @ts-nocheck
// @to-work

import IWatch, { IWatchSettings } from './interface/IWatch';

import __chokidar from 'chokidar';
import __SPromise from '../promise/SPromise';
import __SFile from './SFile';
import __onProcessExit from '../process/onProcessExit';
import __treatAsValue from '../promise/treatAsValue';

/**
 * @name              watch
 * @namespace           sugar.node.fs
 * @type                Function
 * @async
 * @status              beta
 *
 * This function wrap the "chokidar" awesome library into an SPromise based "api" with some
 * cool features like getting back an SFile instance for each files updated, etc...
 *
 * @param         {String|String[]}             paths           The paths you want to watch. Exactly the same as chokidar ```paths``` argument
 * @param         {IWatchSettings}              [settings={}]      Some settings to configure your watch process. Support all the chokidar ones and some others listed bellow
 * @return        {SPromise}                                    An SPromise through which you will be able to listen for events like "add", "change", etc... All the chokidar events are supported
 *
 * @setting         {Boolean}       [SFile=true]            Specify if you want to get back some SFile instances instead of the simple path string
 *
 * @todo            tests
 * @todo            doc
 * @todo            {Feature}       Add support for SDirectory
 *
 * @example             js
 * import watch from '@coffeekraken/sugar/node/fs/watch';
 * watch('my/cool/directory/*.js').on('change', (file) => {
 *
 * });
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const fn: IWatch = function watch(
  paths: string | string[],
  settings: IWatchSettings = {}
) {
  settings = {
    SFile: true,
    ignoreInitial: true,
    ignored: ['**/node_modules/**/*', '**/.git/**/*'],
    ...settings
  };

  let watcher;

  const promise = new __SPromise(
    ({ resolve, reject, emit }) => {
      watcher = __chokidar
        // @ts-ignore
        .watch(paths, {
          ...settings
        })
        .on('add', (path) => {
          const file = new __SFile(path.toString(), {
            cwd: settings.cwd || null
          });
          emit('add', file);
        })
        .on('change', (path) => {
          const file = new __SFile(path.toString(), {
            cwd: settings.cwd || null
          });
          emit('change', file);
        })
        .on('unlink', (path) => {
          const file = new __SFile(path.toString(), {
            cwd: settings.cwd || null,
            checkExistence: false
          });
          emit('unlink', file);
        })
        .on('addDir', (path) => {
          emit('addDir', path);
        })
        .on('unlinkDir', (path) => {
          emit('unlinkDir', path);
        })
        .on('error', (error) => {
          emit('error', error);
        })
        .on('ready', () => {
          emit('ready');
        })
        .on('raw', (event, path, details) => {
          emit('raw', {
            event,
            path,
            details
          });
        });
    },
    {
      id: 'sugar.fs.watch'
    }
  );

  __onProcessExit;
  () => {
    return watcher.close();
  };

  promise.on('finally', () => {
    if (watcher === undefined) return;
    watcher.close();
  });

  return promise;
};
export default fn;
