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
var SWebsocketStdio_exports = {};
__export(SWebsocketStdio_exports, {
  default: () => SWebsocketStdio_default
});
module.exports = __toCommonJS(SWebsocketStdio_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SStdio = __toESM(require("../../shared/SStdio"));
var import_defaultWebSocketComponent = __toESM(require("./components/defaultWebSocketComponent"));
class SWebsocketStdio extends import_SStdio.default {
  get websocketStdioSettings() {
    return this._settings.websocketStdio;
  }
  constructor(id, sources, settings) {
    super(id, sources, (0, import_deepMerge.default)({
      websocketStdio: {}
    }, settings || {}));
  }
  _log(logObj, component) {
    if (!logObj)
      return;
    const obj = component.render(logObj);
  }
  _ask(askObj) {
    return new import_s_promise.default(async ({ resolve, reject, emit }) => {
      let prompt, res;
      resolve(res);
    });
  }
}
SWebsocketStdio.registerComponent(import_defaultWebSocketComponent.default);
var SWebsocketStdio_default = SWebsocketStdio;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
