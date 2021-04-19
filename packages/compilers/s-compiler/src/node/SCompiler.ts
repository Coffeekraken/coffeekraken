import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SEventEmitter from '@coffeekraken/s-event-emitter';

/**
 * @name                SCompiler
 * @namespace           sugar.node.compiler
 * @type                Class
 * @extends             SEventEmitter
 * @status              wip
 *
 * This represent the main compiler class that has to be extended for compilers like typescript, scss, etc...
 * His main goal is to provide basic features like storing the inputs, settings, etc...
 *
 * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
 *
 * @example         js
 * import SCompiler from '@coffeekraken/sugar/node/compiler/SCompiler';
 * import SPromise from '@coffeekraken/s-promise';
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

export interface ISCompilerSettings {}

export interface ISCompilerCtorSettings {
  compiler?: Partial<ISCompilerSettings>;
}

export interface ISCompiler {
  initialParams: any;
  compile(params: any, settings?: any);
}

class SCompiler extends __SEventEmitter implements ISCompiler {
  /**
   * @name        initialParams
   * @type        Object
   *
   * Store the initial params object
   *
   * @since       2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  initialParams: any;

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
  constructor(initialParams: any, settings: ISCompilerCtorSettings) {
    super(
      __deepMerge(
        {
          compiler: {}
        },
        settings || {}
      )
    );
    this.initialParams = Object.assign({}, initialParams);
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
  compile(params: any = {}, settings: any = {}) {
    settings = __deepMerge((<any>this)._settings, settings);

    // @weird:ts-compilation-issue
    params = (<any>this).applyInterface('params', params);

    // @ts-ignore
    const promise = this._compile(params, settings);
    // @weird:ts-compilation-issue
    (<any>this).pipe(promise);
    return promise;
  }
}

export default SCompiler;
