const __SPromise = require('../../promise/SPromise');
const __deepMerge = require('../../object/deepMerge');
const __SFsDeamonCli = require('./SFsDeamonCli');
const __SDeamon = require('../SDeamon');
const __toString = require('../../string/toString');
const __onProcessExit = require('../../process/onProcessExit');

/**
 * @name            SFsDeamon
 * @namespace       sugar.node.deamon.fs
 * @type            Class
 * @extends         SDeamon
 *
 * This class is a wrapper of the SFsDeamonCli and the SFsDeamonProcess to allows you to
 * start quickly some watch processes and kill them with ease
 *
 * @param       {Object}        [settings={}]             Specify some settings to configure your filesystem deamon instance
 * - id (deamon.fs.unnamed) {String}: A unique id for your watch instance
 * - name (Unnamed SFsDeamon) {String}: A name for your watch instance
 * - cliSettings ({}) {Object}: Specify some settings that will be passed to the underhood SFsDeamonCli instance
 *
 * @example       js
 * const SFsDeamon = require('@coffeekraken/sugar/node/deamon/fs/SFsDeamon');
 * const deamon = new SFsDeamon({});
 * deamon.watch('/my/cool/path/*.js').on('update', file => {
 *    // do something
 * });
 * const otherDeamon = deamon.watch('something/*.js');
 * otherDeamon.on('unlink', file => {});
 * otherDeamon.cancel();
 * deamon.cancel(); // kill all the watch processes
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFsDeamon extends __SDeamon {
  /**
   * @name          _watchPromisesStack
   * @type          Array<SPromise>
   * @private
   *
   * Store all the running watch processes
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _watchPromisesStack = [];

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
          name: 'Unnamed SFsDeamon',
          id: 'deamon.fs.unnamed',
          updateStacks: ['update', 'add', 'unlink'],
          cliSettings: {}
        },
        settings
      )
    );

    // handle cancel
    this.on('cancel', () => {
      this._watchPromisesStack.forEach((cli) => {
        cli.kill();
      });
      this._watchPromisesStack = []; // just to be sure
    });
  }

  /**
   * @name            watch
   * @type            Function
   * @async
   *
   * This method allows you to start a watch process on some files
   * by passing either a simple path, a glob pattern or an Array of these.
   *
   * @param       {String|Array<String>}        input         The file(s) you want to watch by specifying a path, a glob pattern or an Array of these
   * @param       {Object}                  [settings={}]       An object of settings to override the default one passed in the constructor only for this watch process
   * @return      {SPromise}                                   An SPromise instance on which you can subscribe for events like "update", "add" or "unlink"
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  watch(watch, settings = {}) {
    settings = __deepMerge(this._settings, settings);
    watch = typeof watch === 'string' ? watch : watch.watch;
    const cli = new __SFsDeamonCli({
      ...settings.cliSettings,
      watch
    });
    cli.run({
      watch
    });
    __onProcessExit(() => {
      cli.kill();
    });
    cli.on('cancel', () => {
      const idx = this._watchPromisesStack.indexOf(cli);
      if (idx === -1) return;
      this._watchPromisesStack.splice(idx, 1);
    });
    // save the watch process in the stack for later
    this._watchPromisesStack.push(cli);
    // return the current promise
    return super.watch(cli);
  }
};
