const __SProcess = require('../../process/SProcess');
const __chokidar = require('chokidar');
const __SPromise = require('../../promise/SPromise');
const __deepMerge = require('../../object/deepMerge');
const __SFsFile = require('../../fs/SFsFile');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name                SFsDeamonProcess
 * @namespace           sugar.node.deamon.fs
 * @type                Class
 * @extends             SProcess
 *
 * This class allows you to simply launch some watch processes in order to be notified when some files are
 * updated, deleted or created on the filesystem.
 *
 * @example           js
 * const SFsDeamonProcess = require('@coffeekraken/sugar/node/deamon/fs/SFsDeamonProcess');
 * const deamon = new SFsDeamonProcess();
 * demon.on('update', up => {
 *    // do somethong on update
 * });
 * deamon.watch('./my/cool/files/*.js');
 * deamon.watch('./my/other/cool/files/*.js', {
 *    id: 'other'
 * }).on('update', up => {
 *    // do something
 * });
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsDeamonProcess extends __SProcess {
  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          id: 'SFsDeamonProcess',
          name: 'Filesystem Deamon Process'
        },
        settings
      )
    );
  }

  /**
   * @name            _filesCache
   * @type            Object
   * @private
   *
   * Store the already fetched files instances
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _filesCache = {};

  /**
   * @name              watch
   * @type              Function
   * @async
   *
   * This method start the watching process and returns you an SPromise instance on which you can subscribe
   * for these events:
   * - update: Triggered when a file has been updated
   * - delete: Triggered when a file has been deleted
   * - add: Triggered when a file has been added
   * The parameter passed along these events are an ```SFileInterface``` compatible object
   *
   * @param         {String|Array<String>}          input           The input glob pattern(s) to specify what to watch
   * @param         {Object}                      [settings={}]     A settings object to override the one passed in the constructor if wanted
   * @return        {SPromise}                                      An SPromise instance to subscribe to some events described above
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  run(argsObj, settings = {}) {
    settings = __deepMerge(this._settings, {}, settings);

    this.log({
      group: 'Initialization',
      value: `#start Starting the "<yellow>${settings.name}</yellow>" filesystem deamon...`
    });

    this._watcher = __chokidar
      .watch(argsObj.watch, {
        persistent: true,
        ignoreInitial: true,
        followSymlinks: true,
        ...settings
      })
      .on('ready', () => {
        this.log({
          group: 'Initialization',
          value: `#success The "<yellow>${settings.name}</yellow>" deamon is <green>ready</green>`
        });
      })
      .on('change', (filepath) => {
        const file = this._getFileInstanceFromPath(filepath);
        delete file._settings;
        this.log({
          group: 'Updated files',
          value: `File updated: "<yellow>${file.path.replace(
            __packageRoot(file.path) + '/',
            ''
          )}</yellow>" <cyan>${file.size}</cyan>mb`
        });
        trigger('update', file);
      })
      .on('add', (filepath) => {
        const file = this._getFileInstanceFromPath(filepath);
        delete file._settings;
        this.log({
          group: 'Added files',
          value: `File added: "<green>${file.path.replace(
            __packageRoot(file.path) + '/',
            ''
          )}</green>" <cyan>${file.size}</cyan>mb`
        });

        trigger('add', file);
      })
      .on('unlink', (filepath) => {
        delete this._filesCache[filepath];

        this.log({
          group: 'Deleted files',
          value: `File deleted: "<red>${file.path.replace(
            __packageRoot(file.path) + '/',
            ''
          )}</red>" <cyan>${file.size}</cyan>mb`
        });

        trigger('unlink', {
          path: filepath
        });
      });
  }

  kill() {
    if (this._watcher) this._watcher.close();
    super.kill();
  }

  _getFileInstanceFromPath(filepath) {
    let file;
    if (this._filesCache[filepath]) {
      file = this._filesCache[filepath];
      file.update();
    } else {
      file = new __SFsFile(filepath);
      this._filesCache[filepath] = file;
    }
    return file;
  }
};
