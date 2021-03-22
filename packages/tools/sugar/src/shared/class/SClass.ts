import __getExtendsStack from '../class/getExtendsStack';
import { ISInterface } from '../interface/_SInterface';
import __isPlain from '../is/plainObject';
import __deepAssign from '../object/deepAssign';
import __deepMerge from '../object/deepMerge';
import __get from '../object/get';
import __availableColors from '../dev/colors/availableColors';
import __pickRandom from '../array/pickRandom';
import __toJson from '../object/toJson';

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
export interface ISClassMetas {
  id: string;
  name: string;
  formattedName: string;
  color: string;
}
export interface ISClassSettings {
  metas?: ISClassMetas;
  [key: string]: any;
}
export interface ISClassCtor {
  new (settings?: Partial<ISClassSettings>);
  extends(cls: any): any;
  interface?: ISInterface;
  settingsInterface?: ISInterface;
  _sClassAsName?: string;
}

export interface ISClassInterfaceObj {
  class: ISInterface;
  apply: boolean;
  on: string;
}

export interface ISClassExposeSettings {
  as?: string;
  props?: string[];
}

export interface ISClass {
  _settings: ISClassSettings;
  metas: ISClassMetas;
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
   * @name            metas
   * @type            String
   * @get
   *
   * Access the metas in the ```_settings.metas```
   *
   * @since           2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  metas: ISClassMetas;
  // public get metas(): ISClassMetas {
  //   let name = `<yellow>${this._settings.metas?.name || ''}</yellow>`;
  //   if (this._settings.metas?.id) {
  //     name += ` <cyan>${this._settings.metas.id}</cyan>`;
  //   }

  //   const metasObj = {
  //     id: this._settings.metas?.id ?? this.constructor.name,
  //     name: this._settings.metas?.name ?? this.constructor.name,
  //     formattedName: name,
  //     color: this._settings.metas?.color ?? 'yellow'
  //   };

  //   return metasObj;
  // }

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
    let name = `<yellow>${this.metas?.name || ''}</yellow>`;
    if (this.metas?.id) {
      name += ` <cyan>${this.metas?.id}</cyan>`;
    }
    return name;
  }

  static extends(Cls: any) {
    class SClass extends Cls {
      // public get metas(): ISClassMetas {

      // }
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
        // define metas enumarable
        // @weird: Check why metas is not enumarable by default
        this.metas = getMetas(this);
        Object.defineProperty(this, 'metas', {
          enumerable: true,
          value: getMetas(this)
        });
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
      toPlainObject(): any {
        return toPlainObject(this);
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
    // define metas enumarable
    this.metas = getMetas(this);
    Object.defineProperty(this, 'metas', {
      enumerable: true,
      value: getMetas(this)
    });
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
  toPlainObject(): any {
    return toPlainObject(this);
  }
}

function getMetas(ctx: any): ISClassMetas {
  let name = `<yellow>${ctx._settings.metas?.name || ''}</yellow>`;
  if (ctx._settings.metas?.id) {
    name += ` <cyan>${ctx._settings.metas.id}</cyan>`;
  }
  const metasObj = {
    id: ctx._settings.metas?.id ?? ctx.constructor.name,
    name: ctx._settings.metas?.name ?? ctx.constructor.name,
    formattedName: name,
    color: ctx._settings.metas?.color ?? 'yellow'
  };

  return metasObj;
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

function toPlainObject(ctx: any): any {
  return __toJson(ctx);
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
      const settings: Partial<ISClassInterfaceObj> = Object.assign(
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
  // make sure a "metas" property is available
  if (!ctx._settings.metas) ctx._settings.metas = {};
  // make sure we have an id
  if (!ctx._settings.metas?.id) ctx._settings.metas.id = ctx.constructor.name;
  if (!ctx.constructor.name.match(/^SConfig/)) {
    if (!ctx._settings.metas.color)
      ctx._settings.metas.color = __pickRandom(__availableColors());
  } else if (!ctx._settings.metas.color) ctx._settings.metas.color = 'yellow';
}

// const cls: ISClass = SClass;
export default SClass;
