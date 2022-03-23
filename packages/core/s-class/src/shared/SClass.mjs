import {
  __spreadValues
} from "../../../../chunk-JETN4ZEY.mjs";
import __getExtendsStack from "@coffeekraken/sugar/shared/class/utils/getExtendsStack";
import __isPlain from "@coffeekraken/sugar/shared/is/plainObject";
import __deepAssign from "@coffeekraken/sugar/shared/object/deepAssign";
import __deepMerge from "@coffeekraken/sugar/shared/object/deepMerge";
import __get from "@coffeekraken/sugar/shared/object/get";
import __getColorFor from "@coffeekraken/sugar/shared/dev/color/getColorFor";
import __toJson from "@coffeekraken/sugar/shared/object/toJson";
class SClass {
  constructor(settings = {}) {
    this._settings = {};
    this._interfacesStack = {};
    generateInterfacesStack(this);
    setSettings(this, settings);
    applyInterfaces(this);
    this.metas = getMetas(this);
    Object.defineProperty(this, "metas", {
      enumerable: true,
      value: getMetas(this)
    });
  }
  get formattedName() {
    var _a, _b, _c;
    let name = `<yellow>${((_a = this.metas) == null ? void 0 : _a.name) || ""}</yellow>`;
    if ((_b = this.metas) == null ? void 0 : _b.id) {
      name += ` <cyan>${(_c = this.metas) == null ? void 0 : _c.id}</cyan>`;
    }
    return name;
  }
  static extends(Cls) {
    class SClass2 extends Cls {
      constructor(settings, ...args) {
        super(...args);
        this._settings = {};
        this._interfacesStack = {};
        generateInterfacesStack(this);
        setSettings(this, settings);
        applyInterfaces(this);
        this.metas = getMetas(this);
        Object.defineProperty(this, "metas", {
          enumerable: true,
          value: getMetas(this)
        });
      }
      get formattedName() {
        let name = `<yellow>${this.name || ""}</yellow>`;
        if (this.id) {
          name += ` <cyan>${this.id}</cyan>`;
        }
        return name;
      }
      expose(instance, settings) {
        return expose(this, instance, settings);
      }
      applyInterface(name, on) {
        return applyInterface(this, name, on);
      }
      getInterface(name) {
        return getInterface(this, name);
      }
      toPlainObject() {
        return toPlainObject(this);
      }
    }
    return SClass2;
  }
  expose(instance, settings) {
    return expose(this, instance, settings);
  }
  applyInterface(name, on) {
    return applyInterface(this, name, on);
  }
  getInterface(name) {
    return getInterface(this, name);
  }
  toPlainObject() {
    return toPlainObject(this);
  }
}
function getMetas(ctx) {
  var _a, _b, _c, _d, _e, _f, _g, _h;
  let name = `<yellow>${((_a = ctx._settings.metas) == null ? void 0 : _a.name) || ""}</yellow>`;
  if ((_b = ctx._settings.metas) == null ? void 0 : _b.id) {
    name += ` <cyan>${ctx._settings.metas.id}</cyan>`;
  }
  const metasObj = {
    id: (_d = (_c = ctx._settings.metas) == null ? void 0 : _c.id) != null ? _d : ctx.constructor.name,
    name: (_f = (_e = ctx._settings.metas) == null ? void 0 : _e.name) != null ? _f : ctx.constructor.name,
    formattedName: name,
    color: (_h = (_g = ctx._settings.metas) == null ? void 0 : _g.color) != null ? _h : "yellow"
  };
  return metasObj;
}
function generateInterfacesStack(ctx) {
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
function expose(ctx, instance, settings) {
  settings = __deepMerge({
    as: void 0,
    props: []
  }, settings);
  if (settings.as && typeof settings.as === "string") {
    ctx[settings.as] = instance;
  }
  if (settings.props) {
    settings.props.forEach((prop) => {
      if (instance[prop].bind && typeof instance[prop].bind === "function") {
        ctx[prop] = instance[prop].bind(instance);
      } else {
        ctx[prop] = instance[prop];
      }
    });
  }
}
function getInterfaceObj(ctx, name) {
  let interfaceObj = __get(ctx._interfacesStack, name);
  if (!interfaceObj) {
    const keys = Object.keys(ctx._interfacesStack);
    for (let i = 0; i < keys.length; i++) {
      const interfacesObj = ctx._interfacesStack[keys[i]];
      if (interfacesObj[name] !== void 0) {
        if (__isPlain(interfacesObj[name])) {
          interfaceObj = interfacesObj[name];
        } else {
          interfaceObj = {
            apply: true,
            on: name === "settings" ? "_settings" : name === "this" ? ctx : void 0,
            class: interfacesObj[name]
          };
        }
        break;
      }
    }
  }
  if (name === "settings" && interfaceObj.on === void 0) {
    if (ctx.settings !== void 0)
      interfaceObj.on = "settings";
    else if (ctx._settings !== void 0)
      interfaceObj.on = "_settings";
  }
  return interfaceObj;
}
function toPlainObject(ctx) {
  return __toJson(ctx);
}
function getInterface(ctx, name) {
  const interfaceObj = getInterfaceObj(ctx, name);
  if (__isPlain(interfaceObj))
    return interfaceObj.class;
  return interfaceObj;
}
function applyInterfaces(ctx) {
  const keys = Object.keys(ctx._interfacesStack);
  for (let i = keys.length - 1; i >= 0; i--) {
    const interfacesObj = ctx._interfacesStack[keys[i]];
    const className = keys[i];
    Object.keys(interfacesObj).forEach((name) => {
      const interfaceObj = interfacesObj[name];
      let settings;
      if (__isPlain(interfaceObj)) {
        settings = Object.assign({}, __spreadValues({
          apply: true,
          on: name === "settings" ? "_settings" : name === "this" ? ctx : void 0
        }, interfaceObj));
      } else {
        settings = Object.assign({}, {
          apply: true,
          on: name === "settings" ? "_settings" : name === "this" ? ctx : void 0,
          class: interfaceObj
        });
      }
      if (settings.apply !== true)
        return;
      if (settings.on) {
        if (typeof settings.on === "string" && __get(ctx, settings.on) !== void 0) {
          applyInterface(ctx, `${className}.${name}`, settings.on);
        } else if (typeof settings.on === "object") {
          applyInterface(ctx, `${className}.${name}`, settings.on);
        } else if (ctx[name] !== void 0) {
          applyInterface(ctx, `${className}.${name}`);
        }
      }
    });
  }
}
function applyInterface(ctx, name, on = null) {
  const interfaceObj = getInterfaceObj(ctx, `${name}`);
  if (!interfaceObj) {
    throw new Error(`You try to apply the interface named "<yellow>${name}</yellow>" on the context "<cyan>${ctx.name}</cyan>" but it does not exists...`);
  }
  if (on !== void 0)
    interfaceObj.on = on;
  if (!interfaceObj) {
    throw `Sorry the the asked interface "<yellow>${name}</yellow>" does not exists on the class "<cyan>${ctx.constructor.name}</cyan>"`;
  }
  if (name.includes(".")) {
    name = name.split(".").slice(1).join(".");
  }
  if (__isPlain(interfaceObj)) {
    let onValue;
    if (interfaceObj.on && typeof interfaceObj.on === "string") {
      onValue = __get(ctx, interfaceObj.on);
    } else if (interfaceObj.on && typeof interfaceObj.on === "object") {
      onValue = interfaceObj.on;
    } else {
      onValue = __get(ctx, name);
    }
    let applyId = ctx.constructor.name;
    if (ctx.id)
      applyId += `(${ctx.id})`;
    if (name)
      applyId += `.${name}`;
    if (interfaceObj.on && interfaceObj.on.constructor)
      applyId += `.${interfaceObj.on.constructor.name}`;
    if (interfaceObj.on && interfaceObj.on.id)
      applyId += `(${interfaceObj.on.id})`;
    let res;
    if (name === "this") {
      res = interfaceObj.class.apply(onValue || {}, {
        id: applyId,
        throw: true
      });
      __deepAssign(ctx, res.value);
      return ctx;
    } else {
      res = interfaceObj.class.apply(onValue, {
        id: applyId,
        throw: true
      });
      if (interfaceObj.on && typeof interfaceObj.on === "object") {
        const returnValue = __deepAssign(interfaceObj.on, res);
        return returnValue;
      } else if (interfaceObj.on && typeof interfaceObj.on === "string") {
        return __deepAssign(__get(ctx, interfaceObj.on), res);
      } else if (ctx[name] !== void 0) {
        return ctx[name];
      } else {
        return res;
      }
    }
  }
}
function setSettings(ctx, settings = {}) {
  var _a;
  ctx._settings = settings;
  if (!ctx._settings.metas)
    ctx._settings.metas = {};
  if (!((_a = ctx._settings.metas) == null ? void 0 : _a.id))
    ctx._settings.metas.id = ctx.constructor.name;
  if (!ctx.constructor.name.match(/^SConfig/)) {
    if (!ctx._settings.metas.color)
      ctx._settings.metas.color = __getColorFor(ctx.constructor.name, {
        scope: "class"
      });
  } else if (!ctx._settings.metas.color)
    ctx._settings.metas.color = "yellow";
}
export {
  SClass as default
};
