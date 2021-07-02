import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SEventEmitter from '@coffeekraken/s-event-emitter';

/**
 * @name                SBuilder
 * @namespace           node
 * @type                Class
 * @extends             SEventEmitter
 * @status              wip
 *
 * This represent the main builder class that has to be extended for builders like typescript, scss, etc...
 * His main goal is to provide basic features like storing the inputs, settings, etc...
 *
 * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
 *
 * @example         js
 * import SBuilder from '@coffeekraken/sugar/node/builder/SBuilder';
 * import SPromise from '@coffeekraken/s-promise';
 * class MyBuilder extends SBuilder {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 *      _build(input, settings) {
 *          return new SPromise(({resolve, reject, emit}) => {
 *              // compilation logic
 *          });
 *      }
 * }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISBuilderSettings {}

export interface ISBuilderCtorSettings {
  builder?: Partial<ISBuilderSettings>;
}

export interface ISBuilder {
  initialParams: any;
  build(params: any, settings?: any);
}

class SBuilder extends __SEventEmitter implements ISBuilder {
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
   * @name        builderSettings
   * @type        any
   * @get
   * 
   * Access the builder settings
   * 
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get builderSettings(): any {
    return (<any>this._settings).builder;
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
  constructor(initialParams: any, settings: ISBuilderCtorSettings) {
    super(
      __deepMerge(
        {
          builder: {
            interface: undefined
          }
        },
        settings || {}
      )
    );
    this.initialParams = Object.assign({}, initialParams);
  }

  /**
   * @name            build
   * @type            Function
   *
   * This method is the one you have to call when you want to launch a compilation process.
   * It will call the ```_build``` one which MUST return an instance of the SPromise class.
   *
   * @param           {String|Array<String>}          input           Specify the input to use for compilation
   * @param           {Object}                        [settings={}]       Specify an object of settings to configure your compilation process
   *
   * @since           2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  build(params: any = {}, settings: any = {}) {
    settings = __deepMerge(this.builderSettings, settings);

    // @weird:ts-compilation-issue
    let finalParams = params;
    if (settings.interface) {
      finalParams = settings.interface.apply(params).value;
    }

    // @ts-ignore
    const promise = this._build(finalParams, settings);
    // @weird:ts-compilation-issue
    (<any>this).pipe(promise);
    return promise;
  }
}

export default SBuilder;
