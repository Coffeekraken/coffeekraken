// @ts-nocheck

import __deepMerge from '../object/deepMerge';
import __resolveGlob from './resolveGlob';
import __extractGlob from './extractGlob';
import __extractNoneGlob from './extractNoneGlob';

/**
 * @name                SGlob
 * @namespace           sugar.node.glob
 * @type                Class
 * @status              beta
 *
 * This class represent a glob pattern and can be used to resolve some globs and get back
 * an array of SFile instances or to extract some part of the pattern, etc...
 *
 * @param           {String|Array<String>}          globs            The glob pattern(s) you want to use with this instance
 * @param           {Object}                [settings={}]           An object of settings to configure your glob instance
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example         js
 * import SGlob from '@coffeekraken/sugar/node/glob/SGlob';
 * const glob = new SGlob('my/cool/glob/*.js');
 * const files = await glob.resolve();
 * await SGlob.resolve('my/cool/glob/*.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export default class SGlob {
  /**
   * @name            _settings
   * @type            Object
   * @private
   *
   * Store the instance settings
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name            _globs
   * @type            Array<String>
   * @private
   *
   * Store the instance globs
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _globs = null;

  /**
   * @name                resolve
   * @type                Function
   * @async
   * @static
   *
   * Alias to the ```resolveGlob``` function available under "node/glob/resolveGlob"
   *
   * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
   * @param       {Object}            [settings={}]           An object of settings to configure your glob process
   * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static resolve(globs, settings = {}) {
    return __resolveGlob(globs, settings);
  }

  /**
   * @name                extractGlob
   * @type                Function
   * @static
   *
   * Alias to the ```extractGlob``` function available under "node/glob/extractGlob"
   *
   * @param       {String}            string          The string from which to extract the glob part
   * @return      {String}                            The glob part of the passed string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static extractGlob(string) {
    return __extractGlob(string);
  }

  /**
   * @name                extractNoneGlob
   * @type                Function
   * @static
   *
   * Alias to the ```extractNoneGlob``` function available under "node/glob/extractNoneGlob"
   *
   * @param       {String}            string          The string from which to extract the none glob part
   * @return      {String}                            The none glob part of the passed string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static extractNoneGlob(string) {
    return __extractNoneGlob(string);
  }

  /**
   * @name          constructor
   * @type          Function
   * @constructor
   *
   * Constructor
   *
   * @since          2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(globs, settings = {}) {
    this._settings = __deepMerge({}, settings);
    this._globs = Array.isArray(globs) ? globs : [globs];
  }

  /**
   * @name                resolve
   * @type                Function
   * @async
   * @private
   *
   * Alias to the ```resolveGlob``` function available under "node/glob/resolveGlob"
   *
   * @param       {Object}            [settings={}]           An object of settings to configure your glob process
   * @return      {SPromise}                                  An SPromise instance that will be resolved once the search process has been fully finished
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  resolve(settings = {}) {
    settings = __deepMerge(this._settings, {}, settings);
    return SGlob.resolve(this._globs, settings);
  }

  /**
   * @name                extractGlob
   * @type                Function
   *
   * Alias to the ```extractGlob``` function available under "node/glob/extractGlob"
   *
   * @return      {String|Array<String>}                            The glob part of the passed string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  extractGlob() {
    if (this._globs.length === 1) {
      return SGlob.extractGlob(this._globs[0]);
    }
    return this._globs.map((glob) => {
      SGlob.extractGlob(glob);
    });
  }

  /**
   * @name                extractNoneGlob
   * @type                Function
   *
   * Alias to the ```extractNoneGlob``` function available under "node/glob/extractNoneGlob"
   *
   * @return      {String|Array<String>}                            The glob part of the passed string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  extractNoneGlob() {
    if (this._globs.length === 1) {
      return SGlob.extractNoneGlob(this._globs[0]);
    }
    return this._globs.map((glob) => {
      SGlob.extractNoneGlob(glob);
    });
  }
}
