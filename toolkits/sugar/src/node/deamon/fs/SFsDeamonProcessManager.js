const __SFsDeamonProcess = require('./SFsDeamonProcess');
const __SProcessManager = require('../../process/SProcessManager');
const __chokidar = require('chokidar');
const __SPromise = require('../../promise/SPromise');
const __deepMerge = require('../../object/deepMerge');
const __SFsFile = require('../../fs/SFsFile');
const __packageRoot = require('../../path/packageRoot');

/**
 * @name                SFsDeamon
 * @namespace           sugar.node.deamon.fs
 * @type                Class
 * @extends             SProcess
 *
 * This class allows you to simply launch some watch processes in order to be notified when some files are
 * updated, deleted or created on the filesystem.
 *
 * @example           js
 * const SFsDeamon = require('@coffeekraken/sugar/node/deamon/fs/SFsDeamon');
 * const deamon = new SFsDeamon();
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
module.exports = class SFsDeamonProcessManager extends __SProcessManager {
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
  constructor(initialParams = {}, settings = {}) {
    super(
      initialParams,
      __deepMerge(
        {
          id: 'SFsDeamonProcessManager',
          name: 'Filesystem Deamon Process Manager'
        },
        settings
      )
    );
  }

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
    settings = __deepMerge(this._settings, settings);

    const fsDeamonProcess = new __SFsDeamonProcess({});
    fsDeamonProcess.run(argsObj);
    return fsDeamonProcess;
  }
};
