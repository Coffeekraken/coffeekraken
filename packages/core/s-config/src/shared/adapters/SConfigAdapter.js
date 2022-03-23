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
var SConfigAdapter_exports = {};
__export(SConfigAdapter_exports, {
  default: () => SConfigAdapter
});
module.exports = __toCommonJS(SConfigAdapter_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
class SConfigAdapter {
  constructor(settings) {
    this._updatesTimeoutsStack = {};
    this._settings = (0, import_deepMerge.default)(settings || {});
    if (settings.name && !/^[a-zA-Z0-9_\-:]+$/.test(settings.name)) {
      throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
    }
  }
  get configAdapterSettings() {
    return this._settings.configAdapter;
  }
  update(identifier) {
    clearTimeout(this._updatesTimeoutsStack[identifier]);
    this._updatesTimeoutsStack[identifier] = setTimeout(() => {
      if (!this._settings.onUpdate)
        return;
      this._settings.onUpdate();
    }, 50);
  }
  get name() {
    return this._settings.name;
  }
  set name(value) {
    if (!/^[a-zA-Z0-9_\-:]+$/.test(value)) {
      throw new Error(`The name of an SConfigAdapter instance can contain only letters like [a-zA-Z0-9_-:]...`);
    }
    this._settings.name = value;
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
