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
var isLicense_exports = {};
__export(isLicense_exports, {
  default: () => isLicense
});
module.exports = __toCommonJS(isLicense_exports);
var import_jsonSync = __toESM(require("@coffeekraken/sugar/node/package/jsonSync"), 1);
const packageJson = (0, import_jsonSync.default)();
function isLicense(conditional, options) {
  var _a;
  let license = (_a = this.license) != null ? _a : packageJson.license;
  if (license.toLowerCase() === conditional.toLowerCase()) {
    return options.fn(this);
  } else {
    return options.inverse(this);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
