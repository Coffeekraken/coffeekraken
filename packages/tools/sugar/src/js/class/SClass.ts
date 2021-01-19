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

export interface ISClassStaticMixinSettings {
  initFnName?: string;
  as?: string;
}

export interface ISClassExposeSettings {
  as?: string;
  props?: string[];
}

export interface ISClass {
  _settings: ISClassSettings;
  id: string;
  name: string;
  formattedName: string;
}

class SClass implements ISClass {
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

  /**
   * @name            name
   * @type            String
   * @get
   *
   * Access the name setted in the ```_settings.name```
   * By default, the name will be the ```constructor.name```
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  public get name() {
    return this._settings.name || this.constructor.name;
  }

  /**
   * @name      formattedName
   * @type      String
   * @get
   *
   * Access the process name and (not the same as a node process name)
   *
   * @since     2.0.0
   * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get formattedName() {
    let name = `<yellow>${this.name || ''}</yellow>`;
    if (this.id) {
      name += ` <cyan>${this.id}</cyan>`;
    }
    return name;
  }

  static extends(Cls: any) {
    class SClass extends Cls {
      public get id() {
        return this._settings.id || this.constructor.name;
      }
      public get name() {
        return this._settings.name || this.constructor.name;
      }
      get formattedName() {
        let name = `<yellow>${this.name || ''}</yellow>`;
        if (this.id) {
          name += ` <cyan>${this.id}</cyan>`;
        }
        return name;
      }
      _settings: ISClassSettings = {};
      constructor(settings: any, ...args) {
        super(...args);
        // saving the settings
        setSettings(this, settings);
        // interface
        applyInterface(this);
      }
      expose(instance: any, settings: ISClassExposeSettings) {
        expose(this, instance, settings);
      }
    }
    return SClass;
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
    // saving the settings
    setSettings(this, settings);
    // interface
    applyInterface(this);
  }
  expose(instance: any, settings: ISClassExposeSettings) {
    expose(this, instance, settings);
  }
}

function expose(ctx: any, instance: any, settings: ISClassExposeSettings) {
  settings = __deepMerge(
    {
      as: undefined,
      props: []
    },
    settings
  );

  if (settings.as && typeof settings.as === 'string') {
    ctx[settings.as] = instance;
  }

  if (settings.props) {
    settings.props.forEach((prop) => {
      ctx[prop] = instance[prop].bind(instance);
    });
  }
}

function applyInterface(ctx: any) {
  // apply the interface if exists
  if (ctx.constructor.interface) {
    ctx.constructor.interface.apply(ctx);
  }
}

function setSettings(ctx: any, settings: any = {}) {
  // saving the settings
  if (ctx.constructor.settingsInterface) {
    ctx._settings = __deepMerge(
      ctx.constructor.settingsInterface.defaults(),
      settings
    );
  } else {
    ctx._settings = settings;
  }
}

// const cls: ISClass = SClass;
export default SClass;
