import __getExtendsStack from '../class/getExtendsStack';
import { ISInterface } from '../interface/_SInterface';
import __isPlain from '../is/plainObject';
import __deepAssign from '../object/deepAssign';
import __deepMerge from '../object/deepMerge';
import __get from '../object/get';

/**
 * @name            SClass
 * @namespace       sugar.js.class
 * @type            Class
 * @status              beta
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

export interface ISClassOptionalInterfaceObj {
  class?: ISInterface;
  apply?: boolean;
  on?: string;
}
export interface ISClassInterfaceObj {
  class: ISInterface;
  apply: boolean;
  on: string;
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
   * @name            _interfacesStack
   * @type            Object
   * @private
   *
   * Store the interfaces objects by class
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  public _interfacesStack: any = {};

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
  public set name(value) {
    this._settings.name = value;
  }
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
      protected _settings: ISClassSettings = {};
      protected _interfacesStack: any = {};
      get formattedName() {
        let name = `<yellow>${this.name || ''}</yellow>`;
        if (this.id) {
          name += ` <cyan>${this.id}</cyan>`;
        }
        return name;
      }
      constructor(settings: any, ...args) {
        super(...args);
        generateInterfacesStack(this);
        // set settings
        setSettings(this, settings);
        // interface
        applyInterfaces(this);
      }
      expose(instance: any, settings: ISClassExposeSettings) {
        return expose(this, instance, settings);
      }
      applyInterface(name: string, on?: any) {
        return applyInterface(this, name, on);
      }
      getInterface(name: string): any {
        return getInterface(this, name);
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
    generateInterfacesStack(this);
    // set settings
    setSettings(this, settings);
    // interface
    applyInterfaces(this);
  }
  expose(instance: any, settings: ISClassExposeSettings) {
    return expose(this, instance, settings);
  }
  applyInterface(name: string, on?: any) {
    return applyInterface(this, name, on);
  }
  getInterface(name: string): any {
    return getInterface(this, name);
  }
}

function generateInterfacesStack(ctx: any) {
  // get all the interfaces to apply
  const extendsStack = __getExtendsStack(ctx, {
    includeBaseClass: true
  });
  Object.keys(extendsStack).forEach((className) => {
    const cls = extendsStack[className];
    if (cls.interfaces) {
      ctx._interfacesStack[className] = cls.interfaces;
    }
  });
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

function getInterfaceObj(ctx: any, name: string): any {
  let interfaceObj = __get(ctx._interfacesStack, name);

  if (!interfaceObj) {
    const keys: string[] = Object.keys(ctx._interfacesStack);
    for (let i = 0; i < keys.length; i++) {
      const interfacesObj = ctx._interfacesStack[keys[i]];
      if (interfacesObj[name] !== undefined) {
        interfaceObj = interfacesObj[name];
        break;
      }
    }
  }

  if (name === 'settings' && interfaceObj.on === undefined) {
    if (ctx.settings !== undefined) interfaceObj.on = 'settings';
    else if (ctx._settings !== undefined) interfaceObj.on = '_settings';
  }

  return interfaceObj;
}

function getInterface(ctx: any, name: string): any {
  const interfaceObj = getInterfaceObj(ctx, name);

  if (__isPlain(interfaceObj)) return interfaceObj.class;
  return interfaceObj;
}

function applyInterfaces(ctx: any) {
  const keys = Object.keys(ctx._interfacesStack);
  for (let i = keys.length - 1; i >= 0; i--) {
    const interfacesObj = ctx._interfacesStack[keys[i]];
    const className = keys[i];

    Object.keys(interfacesObj).forEach((name) => {
      const interfaceObj = interfacesObj[name];
      const settings: ISClassOptionalInterfaceObj = Object.assign(
        {},
        {
          apply: false,
          on: name === 'this' ? ctx : undefined,
          ...interfaceObj
        }
      );

      if (settings.apply !== true) return;

      if (settings.on) {
        if (
          typeof settings.on === 'string' &&
          __get(ctx, settings.on) !== undefined
        ) {
          applyInterface(ctx, `${className}.${name}`, settings.on);
        } else if (typeof settings.on === 'object') {
          applyInterface(ctx, `${className}.${name}`, settings.on);
        } else if (ctx[name] !== undefined) {
          applyInterface(ctx, `${className}.${name}`);
        }
      }
    });
  }
}

function applyInterface(ctx: any, name: string, on: any = null) {
  const interfaceObj = getInterfaceObj(ctx, `${name}`);
  if (!interfaceObj) {
    throw new Error(
      `You try to apply the interface named "<yellow>${name}</yellow>" on the context "<cyan>${ctx.name}</cyan>" but it does not exists...`
    );
  }
  if (on !== undefined) interfaceObj.on = on;

  if (!interfaceObj) {
    throw `Sorry the the asked interface "<yellow>${name}</yellow>" does not exists on the class "<cyan>${ctx.constructor.name}</cyan>"`;
  }

  if (name.includes('.')) {
    name = name.split('.').slice(1).join('.');
  }

  // apply the interface if exists
  if (__isPlain(interfaceObj)) {
    let onValue;
    if (interfaceObj.on && typeof interfaceObj.on === 'string') {
      onValue = __get(ctx, interfaceObj.on);
    } else if (interfaceObj.on && typeof interfaceObj.on === 'object') {
      onValue = interfaceObj.on;
    } else {
      onValue = __get(ctx, name);
    }

    let applyId = ctx.constructor.name;
    if (ctx.id) applyId += `(${ctx.id})`;
    if (name) applyId += `.${name}`;
    if (interfaceObj.on && interfaceObj.on.constructor)
      applyId += `.${interfaceObj.on.constructor.name}`;
    if (interfaceObj.on && interfaceObj.on.id)
      applyId += `(${interfaceObj.on.id})`;

    let res;
    if (name === 'this') {
      res = interfaceObj.class.apply(onValue || {}, {
        id: applyId,
        complete: true,
        throw: true
      });
      __deepAssign(ctx, res.value);
      return ctx;
    } else {
      // if (typeof interfaceObj.on !== 'string') {
      //   nativeConsole.trace('COCO', interfaceObj.on);
      // }
      res = interfaceObj.class.apply(onValue, {
        id: applyId,
        complete: true,
        throw: true
      });

      if (interfaceObj.on && typeof interfaceObj.on === 'object') {
        const returnValue = __deepAssign(interfaceObj.on, res.value);
        return returnValue;
      } else if (interfaceObj.on && typeof interfaceObj.on === 'string') {
        return __deepAssign(__get(ctx, interfaceObj.on), res.value);
      } else if (ctx[name] !== undefined) {
        return ctx[name];
      } else if (!res.hasIssues()) {
        return res.value;
        // throw `You try to apply the interface "<yellow>${interfaceObj.class.name}</yellow>" on a data "<cyan>${interfaceObj.on}</cyan>" that seems to be inexistant`;
      }
    }
  }
}

function setSettings(ctx: any, settings: any = {}) {
  // saving the settings
  ctx._settings = settings;
  if (!ctx._settings.id) ctx._settings.id = ctx.constructor.name;
}

// const cls: ISClass = SClass;
export default SClass;
