var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
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
var SWatch_exports = {};
__export(SWatch_exports, {
  default: () => SWatch
});
module.exports = __toCommonJS(SWatch_exports);
var import_deepProxy = __toESM(require("./deepProxy"));
var import_deepMerge = __toESM(require("../object/deepMerge"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
class SWatch {
  constructor(object, settings = {}) {
    this._watchStack = {};
    this._settings = {};
    if (object.__$SWatch)
      return object;
    this._settings = (0, import_deepMerge.default)({
      deep: true
    }, settings);
    this._promise = new import_s_promise.default({
      id: "SWatch"
    });
    this._proxiedObject = (0, import_deepProxy.default)(object, (obj) => {
      let path = obj.path;
      const value = obj.value;
      const oldValue = obj.oldValue;
      if (path.slice(0, 1) === ".")
        path = path.slice(1);
      const watchResult = {
        object: this._proxiedObject,
        path,
        action: obj.action,
        oldValue,
        value
      };
      if (watchResult.action === "get" && (path === "on" || path === "unwatch"))
        return;
      setTimeout(() => {
        this._promise.emit(`${path}:${watchResult.action}`, watchResult);
      });
    }, {
      deep: this._settings.deep
    });
    const onPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this._promise.on.bind(this._promise)
    };
    if (this._proxiedObject.on !== void 0) {
      Object.defineProperties(this._proxiedObject, {
        $on: onPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        on: onPropertyObj
      });
    }
    const unwatchPropertyObj = {
      writable: true,
      configurable: false,
      enumerable: false,
      value: this.unwatch.bind(this)
    };
    if (this._proxiedObject.unwatch !== void 0) {
      Object.defineProperties(this._proxiedObject, {
        $unwatch: unwatchPropertyObj
      });
    } else {
      Object.defineProperties(this._proxiedObject, {
        unwatch: unwatchPropertyObj
      });
    }
    Object.defineProperty(this._proxiedObject, "__$SWatch", {
      writable: false,
      configurable: false,
      enumerable: false,
      value: true
    });
    return this._proxiedObject;
  }
  unwatch() {
    this._promise.cancel();
    return this._proxiedObject.revoke();
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
