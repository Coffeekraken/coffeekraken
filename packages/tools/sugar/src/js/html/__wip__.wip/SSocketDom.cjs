import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
var __create = Object.create;
var __defProp = Object.defineProperty;
var __defProps = Object.defineProperties;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropDescs = Object.getOwnPropertyDescriptors;
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
var __spreadProps = (a, b) => __defProps(a, __getOwnPropDescs(b));
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
var SSocketDom_exports = {};
__export(SSocketDom_exports, {
  default: () => SSocketDom_default
});
module.exports = __toCommonJS(SSocketDom_exports);
var import_appendScriptTag = __toESM(require("../dom/appendScriptTag"), 1);
var import_innerHtml = __toESM(require("../dom/innerHtml"), 1);
class SSocketDom {
  constructor(serverUrl, settings = {}) {
    this._serverUrl = "http://localhost:80";
    this._settings = {
      node: document.body,
      action: "replace",
      events: {}
    };
    this._serverUrl = serverUrl;
    this._settings = __spreadValues(__spreadValues({}, this._settings), settings);
  }
  init() {
    return this._initSocketIo().then(() => {
      this.registerEvent("innerHtml", this._eventInnerHtml);
      this.registerEvent("body", this._eventBody);
      this.registerEvent("content", this._eventContent);
    });
  }
  _initSocketIo() {
    const _this = this;
    return (0, import_appendScriptTag.default)("/socket.io/socket.io.js").then(() => {
      _this._socket = window.io.connect(this._serverUrl);
    });
  }
  _eventInnerHtml(data, settings) {
    let $node = settings.node;
    if (typeof $node === "string")
      $node = document.querySelector($node);
    switch (settings.action) {
      case "append":
        (0, import_innerHtml.default)($node, data, __spreadProps(__spreadValues({}, settings.innerHtml || {}), {
          action: "append"
        }));
        break;
      case "replace":
        (0, import_innerHtml.default)($node, data, settings.innerHtml);
        break;
      case "prepend":
        (0, import_innerHtml.default)($node, data, __spreadProps(__spreadValues({}, settings.innerHtml || {}), {
          action: "prepend"
        }));
        break;
    }
  }
  _eventBody(data, settings) {
    (0, import_innerHtml.default)(document.body, data, settings.innerHtml || {});
  }
  _eventContent(data, settings) {
    let $content = document.getElementById("content") || document.querySelector("[content]");
    if (!$content)
      return;
    (0, import_innerHtml.default)($content, data, settings.innerHtml || {});
  }
  emit(event, data = {}) {
    this._socket.emit(`SSocketDom.${event}`, data);
    return this;
  }
  registerEvent(event, handlerFn, settings = {}) {
    this._settings.events[event] = settings;
    this._socket.on(`SSocketDom.${event}`, (data = {}) => {
      const d = data.data;
      delete data.data;
      handlerFn(d, __spreadValues(__spreadValues(__spreadValues({}, this._settings), this._settings.events[event]), data || {}));
    });
    return this;
  }
}
var SSocketDom_default = SSocketDom;
