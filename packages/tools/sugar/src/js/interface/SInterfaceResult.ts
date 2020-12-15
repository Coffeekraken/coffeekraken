// @shared

import ISInterfaceResult, {
  ISInterfaceResultCtor,
  ISInterfaceResultData
} from './interface/ISInterfaceResult';
import __deepMerge from '../object/deepMerge';
import __isNode from '../is/node';

/**
 * @name            SInterfaceResult
 * @namespace       sugar.js.interface
 * @type            Class
 *
 * This class represent what you will get back from the ```SInterface.apply``` method.
 * You will be able to generate some string terminal version of the return as well as some html
 * version if needed
 *
 * @todo        integrate ```toHtml``` method
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
const Cls: ISInterfaceResultCtor = class SInterfaceResult
  implements ISInterfaceResult {
  /**
   * @name        _data
   * @type        ISInterfaceResultData
   * @private
   *
   * Store the interface result data like the SDescriptorResult instance, etc...
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _data: ISInterfaceResultData = {};

  /**
   * @name        value
   * @type        Object
   * @get
   *
   * Access to the resulting value
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get value() {
    if (this.hasIssues()) return undefined;
    return this._data?.descriptorResult?.value;
  }

  /**
   * @name        constructor
   * @type        Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(data: ISInterfaceResultData = {}) {
    this._data = __deepMerge({}, data);
  }

  /**
   * @name          hasIssues
   * @type          Function
   *
   * Return true if some issues have been detected, false if not
   *
   * @return        {Boolean}       true if has some issues, false if not
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  hasIssues() {
    if (this._data.descriptorResult)
      return this._data.descriptorResult.hasIssues();
    return false;
  }

  /**
   * @name             toString
   * @type              Functio n
   *
   * This method return a string terminal compatible or html of this result object
   *
   * @return        {String}                The result object in string format
   *
   * @since          2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toString(): string {
    if (__isNode()) {
      return this.toConsole();
    } else {
      return `The method "toHtml" has not being integrated for now...`;
    }
  }

  /**
   * @name          toConsole
   * @type          Function
   *
   * This method simply returns you a terminal compatible string
   * of the interface checking result
   *
   * @return        {String}                A string compatible with the terminal
   *
   * @since         2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  toConsole(): string {
    const stringArray: string[] = [];
    if (this._data.descriptorResult) {
      stringArray.push(this._data.descriptorResult.toConsole());
    }
    return `
${stringArray.join('\n')}
    `.trim();
  }
};
export = Cls;
