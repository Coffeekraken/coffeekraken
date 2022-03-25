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
var SApp_exports = {};
__export(SApp_exports, {
  default: () => SApp
});
module.exports = __toCommonJS(SApp_exports);
var import_get = __toESM(require("../../shared/object/get"));
var import_base64 = __toESM(require("../../shared/is/base64"));
var import_base642 = __toESM(require("../../shared/crypt/base64"));
let __decryptedConfig, __decryptedMeta;
class SApp {
  constructor(settings = {}) {
    this.__settings = {};
    this.__meta = {};
    this.__config = {};
    this.__data = {};
    this.__log = {};
    this.__settings = __spreadValues({
      name: "SApp"
    }, settings);
    window[this.__settings.name] = this;
  }
  config(path = null) {
    let config = window["_" + this.__settings.name + "Data"].config || {};
    if ((0, import_base64.default)(config) && !__decryptedConfig) {
      __decryptedConfig = import_base642.default.decrypt(config);
    }
    return (0, import_get.default)(__decryptedConfig, path);
  }
  meta(path = null) {
    let meta = window["_" + this.__settings.name + "Data"].meta || {};
    if ((0, import_base64.default)(meta) && !__decryptedMeta) {
      __decryptedMeta = import_base642.default.decrypt(meta);
    }
    return (0, import_get.default)(__decryptedMeta, path);
  }
  log(message, type = "info", transports = null) {
    return new Promise((resolve, reject) => {
      const _this = this;
      Promise.all([
        Promise.resolve().then(() => __toESM(require(
          /* webpackChunkName: "log" */
          /* webpackMode: "lazy" */
          "../log/log"
        ))),
        Promise.resolve().then(() => __toESM(require(
          /* webpackChunkName: "isTransportRegistered" */
          /* webpackMode: "lazy" */
          "../log/isTransportRegistered"
        ))),
        Promise.resolve().then(() => __toESM(require(
          /* webpackChunkName: "getRegisteredTransports" */
          /* webpackMode: "lazy" */
          "../log/getRegisteredTransports"
        ))),
        Promise.resolve().then(() => __toESM(require(
          /* webpackChunkName: "registerTransport" */
          /* webpackMode: "lazy" */
          "../log/registerTransport"
        )))
      ]).then((modules) => {
        const __log = modules[0], __isTransportRegistered = modules[1], __getRegisteredTransports = modules[2], __registerTransport = modules[3];
        const configTransports = this.config("log.frontend.transportsByType")[type] ? this.config("log.frontend.transportsByType")[type].split(" ") : [];
        let transp = transports ? transports : configTransports;
        if (!this.__log.sugarTransports) {
          this.__log.sugarTransports = require.context(`@coffeekraken/sugar/js/log/transports`, true, /\.js$/, "lazy");
        }
        const transportsImportPromises = [];
        transp.forEach((t) => {
          if (this.__log.sugarTransports.keys().indexOf(`./${t}.js`) !== -1) {
            transportsImportPromises.push(this.__log.sugarTransports(`./${t}.js`).then((m) => {
              if (!__isTransportRegistered.default(t))
                __registerTransport.default(t, m.default || m);
            }));
          }
        });
        Promise.all(transportsImportPromises).then(() => {
          __log.default(message, type, transp).then(() => {
            resolve();
          });
        });
      });
    });
  }
}
