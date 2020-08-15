const __SDeamon = require('../SDeamon');

/**
 * @name                SFsDeamon
 * @namespace           node.deamon.fs
 * @type                Class
 * @extends             SDeamon
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
module.exports = class SFsDeamon extends __SDeamon {
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
    super(settings);
  }
};
