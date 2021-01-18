// @shared

import __deepMerge from '../object/deepMerge';
import __isPlain from '../is/plainObject';

import ISInterface from '../interface/interface/ISInterface';

/**
 * @name            SClass
 * @namespace       sugar.js.class
 * @type            Class
 * @beta
 *
 * This class is a simple and effective one that manage the ```_settings``` property
 * and some others features that will be documented asap
 *
 * @param       {Object}            [settings={}]               An object of settings that will be available as the property ```_settings```
 *
 * @example         js
 * import SClass from '@coffeekraken/sugar/js/class/SClass';
 * class MyCoolClass extends SClass {
 *      constructor(settings = {}) {
 *          super(settings);
 *      }
 * }
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
export interface ISClassSettings {
  id?: string;
  [key: string]: any;
}
export interface ISClassCtor {
  new (settings?: ISClassSettings);
  mix(mixins: any[], Cls?: any): any;
  interface?: ISInterface;
  settingsInterface?: ISInterface;
  _sClassAsName?: string;
}

export interface ISClassMixinSettings {
  initFnName?: string;
  as?: string;
}

export interface ISClass {
  _settings: ISClassSettings;
  id: string;
}

class SClass implements ISClass {
  // static usableAsMixin = true;

  /**
   * @name            _settings
   * @type            ISClassSettings
   * @private
   *
   * Store the class settings
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings: ISClassSettings = {};

  /**
   * @name            id
   * @type            String
   * @get
   *
   * Access the id setted in the ```_settings.id```
   * By default, the id will be the ```constructor.name```
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  public get id() {
    return this._settings.id || this.constructor.name;
  }

  static mixin(mixins: any[], Cls?: any) {
    // const mixinProps = {};
    const mixinInitStack: Function[] = [];

    if (!mixins) mixins = [];

    // function bindProps(ctx: any) {
    //   // console.log(mixinProps);
    //   Object.keys(mixinProps).forEach((mixinName) => {
    //     ctx[mixinName] = {};
    //     Object.getOwnPropertyNames(mixinProps[mixinName]).forEach(
    //       (propName) => {
    //         if (mixinName === 'default') {
    //           ctx[propName] = mixinProps[mixinName][propName].bind(ctx);
    //         } else {
    //           ctx[mixinName][propName] = mixinProps[mixinName][propName].bind(
    //             ctx
    //           );
    //         }
    //       }
    //     );
    //   });
    // }

    function callInitStack(ctx: any, settings?: any) {
      mixinInitStack.forEach((initFn: Function) => {
        const bindedInitFn = initFn.bind(ctx);
        bindedInitFn(settings);
      });
    }

    let BaseClass: any;
    if (!Cls) {
      class SClassBase {
        constructor(...args) {
          const superArgs: any = args;
          const settings: any = args[args.length - 1];
          if (__isPlain(settings)) {
            superArgs.pop();
          }
          callInitStack(this, settings);
        }
      }
      BaseClass = SClassBase;
    } else {
      // mixins.push(SClass);
      class SClassBase extends Cls {
        constructor(...args) {
          const superArgs: any = args;
          const settings: any = args[args.length - 1];
          if (__isPlain(settings)) {
            superArgs.pop();
          }
          super(...superArgs);
          callInitStack(this, settings);
        }
      }
      BaseClass = SClassBase;
    }

    const defaultMixinSettings: ISClassMixinSettings = {
      initFnName: '$init'
      // as: undefined
    };

    for (let i = mixins.length - 1; i >= 0; i--) {
      const mixin = mixins[i];

      const mixinSettings: ISClassMixinSettings = __deepMerge(
        defaultMixinSettings,
        mixin.mixinSettings || {}
      );

      if (mixin.usableAsMixin === undefined || mixin.usableAsMixin !== true) {
        throw `The class "<yellow>${mixin.name}</yellow>" cannot be used as a mixin...`;
      }

      // mixinProps[mixinName] = {};
      let hasInit = false;
      console.log(mixin.prototype);
      Object.getOwnPropertyNames(mixin.prototype).forEach((name) => {
        // console.log(mixin.name, name);
        if (name === mixinSettings.initFnName) {
          hasInit = true;
          mixinInitStack.push(mixin.prototype[name]);
        } else if (name !== 'constructor') {
          const desc: PropertyDescriptor = <PropertyDescriptor>(
            Object.getOwnPropertyDescriptor(mixin.prototype, name)
          );
          // desc.enumerable = true;
          Object.defineProperty(BaseClass.prototype, name, {
            ...desc
          });
        }
      });
      if (!hasInit) {
        mixinInitStack.push(function (settings: any = {}) {
          // @ts-ignore
          this._settings = __deepMerge((<any>this)._settings, settings || {});
        });
      }
    }

    return BaseClass;
  }

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings: ISClassSettings = {}) {
    this.$init(settings);
  }

  $init(settings: ISClassSettings = {}) {
    // saving the settings
    this.$setSettings(settings);
    // interface
    this.$applyInterface();
  }

  $applyInterface() {
    // apply the interface if exists
    if ((<any>this).constructor.interface) {
      (<any>this).constructor.interface.apply(this);
    }
  }

  $setSettings(settings: any = {}) {
    // saving the settings
    if ((<any>this).constructor.settingsInterface) {
      this._settings = __deepMerge(
        (<any>this).constructor.settingsInterface.defaults(),
        settings
      );
    } else {
      this._settings = settings;
    }
  }
}
// const cls: ISClass = SClass;
export default SClass;
