// @ts-nocheck
// @to-work

import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';

/**
 * @name                SCompiler
 * @namespace           sugar.node.compiler
 * @type                Class
 * @extends             SPromise
 * @wip
 *
 * This represent the main compiler class that has to be extended for compilers like typescript, scss, etc...
 * His main goal is to provide basic features like storing the inputs, settings, etc...
 *
 * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
 *
 * @example         js
 * import SCompiler from '@coffeekraken/sugar/node/compiler/SCompiler';
 * import SPromise from '@coffeekraken/sugar/node/promise/SPromise';
 * class MyCompiler extends SCompiler {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 *      _compile(input, settings) {
 *          return new SPromise(({resolve, reject, emit}) => {
 *              // compilation logic
 *          });
 *      }
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class SCompiler extends __SPromise {
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
  constructor(settings = {}) {
    let defaultInterfaceValues = {};
    super();
    // @ts-ignore
    if (this.constructor.interface) {
      // @ts-ignore
      defaultInterfaceValues = this.constructor.interface.defaults();
      // @ts-ignore
      delete defaultInterfaceValues.input;
      this._settings = __deepMerge(this._settings, defaultInterfaceValues);
    }
  }

  /**
   * @name            compile
   * @type            Function
   *
   * This method is the one you have to call when you want to launch a compilation process.
   * It will call the ```_compile``` one which MUST return an instance of the SPromise class.
   *
   * @param           {String|Array<String>}          input           Specify the input to use for compilation
   * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  compile(input, settings = {}) {
    settings = __deepMerge(this._settings, settings);
    // @ts-ignore
    if (this.constructor.interface)
      // @ts-ignore
      this.constructor.interface.apply(settings, {
        throw: true
      });

    if (!Array.isArray(input)) input = [input];
    // @ts-ignore
    const promise = this._compile(input, settings);
    this.pipe(promise);
    return promise;
  }
}

export = SCompiler;
