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
var new_exports = {};
__export(new_exports, {
  default: () => _new
});
module.exports = __toCommonJS(new_exports);
var import_node = __toESM(require("@coffeekraken/sugar/shared/is/node"));
var import_SBasicStdio = __toESM(require("../node/basic/SBasicStdio"));
var import_SWebsocketStdio = __toESM(require("../node/websocket/SWebsocketStdio"));
var import_SStdio = __toESM(require("./SStdio"));
async function _new(id, sources, stdio, settings) {
  if (!Array.isArray(sources))
    sources = [sources];
  let stdioInstance;
  if ((0, import_node.default)()) {
    switch (stdio) {
      case import_SStdio.default.UI_WEBSOCKET:
        stdioInstance = new import_SWebsocketStdio.default(id, sources, settings);
        break;
      case import_SStdio.default.UI_BASIC:
      default:
        stdioInstance = new import_SBasicStdio.default(id, sources, settings);
        break;
    }
  } else {
    throw new Error(`No stdio implementation found for the current "browser" environment...`);
  }
  return stdioInstance;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
