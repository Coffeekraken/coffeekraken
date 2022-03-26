var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
var __export = (target, all) => {
  for (var name in all)
    __defProp(target, name, { get: all[name], enumerable: true });
};
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target, mod));
var __toCommonJS = (mod) => __copyProps(__defProp({}, "__esModule", { value: true }), mod);
var SClass_exports = {};
__export(SClass_exports, {
  default: () => SClass
});
module.exports = __toCommonJS(SClass_exports);
var import_getExtendsStack = __toESM(require("@coffeekraken/sugar/shared/class/utils/getExtendsStack"), 1);
var import_plainObject = __toESM(require("@coffeekraken/sugar/shared/is/plainObject"), 1);
var import_deepAssign = __toESM(require("@coffeekraken/sugar/shared/object/deepAssign"), 1);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_get = __toESM(require("@coffeekraken/sugar/shared/object/get"), 1);
var import_getColorFor = __toESM(require("@coffeekraken/sugar/shared/dev/color/getColorFor"), 1);
var import_toJson = __toESM(require("@coffeekraken/sugar/shared/object/toJson"), 1);
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
  const extendsStack = (0, import_getExtendsStack.default)(ctx, {
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
  settings = (0, import_deepMerge.default)({
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
  let interfaceObj = (0, import_get.default)(ctx._interfacesStack, name);
  if (!interfaceObj) {
    const keys = Object.keys(ctx._interfacesStack);
    for (let i = 0; i < keys.length; i++) {
      const interfacesObj = ctx._interfacesStack[keys[i]];
      if (interfacesObj[name] !== void 0) {
        if ((0, import_plainObject.default)(interfacesObj[name])) {
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
  return (0, import_toJson.default)(ctx);
}
function getInterface(ctx, name) {
  const interfaceObj = getInterfaceObj(ctx, name);
  if ((0, import_plainObject.default)(interfaceObj))
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
      if ((0, import_plainObject.default)(interfaceObj)) {
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
        if (typeof settings.on === "string" && (0, import_get.default)(ctx, settings.on) !== void 0) {
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
  if ((0, import_plainObject.default)(interfaceObj)) {
    let onValue;
    if (interfaceObj.on && typeof interfaceObj.on === "string") {
      onValue = (0, import_get.default)(ctx, interfaceObj.on);
    } else if (interfaceObj.on && typeof interfaceObj.on === "object") {
      onValue = interfaceObj.on;
    } else {
      onValue = (0, import_get.default)(ctx, name);
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
      (0, import_deepAssign.default)(ctx, res.value);
      return ctx;
    } else {
      res = interfaceObj.class.apply(onValue, {
        id: applyId,
        throw: true
      });
      if (interfaceObj.on && typeof interfaceObj.on === "object") {
        const returnValue = (0, import_deepAssign.default)(interfaceObj.on, res);
        return returnValue;
      } else if (interfaceObj.on && typeof interfaceObj.on === "string") {
        return (0, import_deepAssign.default)((0, import_get.default)(ctx, interfaceObj.on), res);
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
      ctx._settings.metas.color = (0, import_getColorFor.default)(ctx.constructor.name, {
        scope: "class"
      });
  } else if (!ctx._settings.metas.color)
    ctx._settings.metas.color = "yellow";
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
