// @ts-nocheck

import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __resolveGlob, { IResolveGlobSettings } from '@coffeekraken/sugar/node/glob/resolveGlob';
import __extractGlob from '@coffeekraken/sugar/shared/glob/extractGlob';
import __extractNoneGlob from '@coffeekraken/sugar/shared/glob/extractNoneGlob';
import __SClass from '@coffeekraken/s-class';
import SFile from '@coffeekraken/s-file';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';

/**
 * @name                SGlob
 * @namespace            node
 * @type                Class
 * @status              beta
 * @platform            node
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
 * const files = glob.resolve();
 * SGlob.resolve('my/cool/glob/*.js');
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISGlobCtorSettings {
    glob: Partial<ISGlobSettings>
}
export interface ISGlobSettings {
    resolve: Partial<IResolveGlobSettings>
}

export { IResolveGlobSettings };

export default class SGlob extends __SClass {
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
   * @name                isGlob
   * @type                Function
   * @static
   * 
   * Alias to the ```isGlob``` function available in sugar under "shared.is.isGlob" namespace
   * 
   * @param       {String}        glob        The string to check
   * @return    {Boolean}                   true if is a glob, false if not
   * 
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static isGlob(glob: string): boolean {
    return __isGlob(glob);
  }

  /**
   * @name                resolve
   * @type                Function
   * @static
   *
   * Alias to the ```resolveGlob``` function available in sugar under "node.glob.resolveGlob"
   *
   * @param       {String|Array<String>}          globs        The glob pattern(s) to search files for
   * @param       {Partial<IResolveGlobSettings>}            [settings={}]           An object of settings to configure your glob process
   * @return      {SFile[]|string[]}                                An array of SFile instances or string if is a directory
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static resolve(globs, settings: Partial<IResolveGlobSettings> = {}): SFile[] | string[] {
    return __resolveGlob(globs, settings);
  }

  /**
   * @name                extractGlob
   * @type                Function
   * @static
   *
   * This function simply return you the glob part of a passed string
   *
   * @param       {String}            string          The string from which to extract the glob part
   * @return      {String}                            The glob part of the passed string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static extractGlob(string: string): string {
    return __extractGlob(string);
  }

  /**
   * @name                extractNoneGlob
   * @type                Function
   * @static
   *
   * This function simply return you the none glob part of the passed string
   *
   * @param       {String}            string          The string from which to extract the none glob part
   * @return      {String}                            The none glob part of the passed string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static extractNoneGlob(string: string): string {
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
  constructor(globs: string|string[], settings: Partial<ISGlobCtorSettings> = {}) {
    super(__deepMerge({
        glob: {
            resolve: {}
        }
    }, settings));
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
   * @param       {Object}            [settings={}]           An object of settings to configure your glob process
   * @return      {SFile[]|string[]}                                 An array of SFile instances or string if is a folder
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  resolve(settings: Partial<IResolveGlobSettings> = {}): SFile[] | string[] {
    settings = __deepMerge(this._settings.glob.resolve, {}, settings);
    return SGlob.resolve(this._globs, settings);
  }

  /**
   * @name                extractGlob
   * @type                Function
   *
   * This function simply return you the glob part of the glob(s) passed in constructor
   *
   * @return      {String|Array<String>}                            The glob part of the glob(s) passed in constructor. If multiple globs, return an Array, otherwise a simple string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  extractGlob():string|string[] {
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
   * This function simply return you the none glob part of the glob(s) passed in constructor
   *
   * @return      {String|Array<String>}                            The none glob part of the glob(s) passed in constructor. If multiple globs, return an Array, otherwise a simple string
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  extractNoneGlob(): string|string[] {
    if (this._globs.length === 1) {
      return SGlob.extractNoneGlob(this._globs[0]);
    }
    return this._globs.map((glob) => {
      SGlob.extractNoneGlob(glob);
    });
  }
}
