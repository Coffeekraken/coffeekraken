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
var SDuration_exports = {};
__export(SDuration_exports, {
  default: () => SDuration
});
module.exports = __toCommonJS(SDuration_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_formatDuration = __toESM(require("@coffeekraken/sugar/shared/time/formatDuration"), 1);
class SDuration {
  constructor(settings = {}) {
    this._settings = {};
    this.startTime = null;
    this.endTime = null;
    this.duration = null;
    this._settings = (0, import_deepMerge.default)({}, settings);
    this.start();
  }
  toObject(settings = {}) {
    settings = (0, import_deepMerge.default)(this._settings, settings);
    if (!this.endTime || !this.startTime)
      this.end();
    const durationMs = this.endTime - this.startTime;
    this.duration = durationMs;
    const formatedDuration = (0, import_formatDuration.default)(durationMs);
    return {
      startTime: this.startTime || -1,
      endTime: this.endTime || -1,
      duration: this.duration || -1,
      formatedDuration
    };
  }
  start(startTime = null) {
    this.startTime = startTime || Date.now();
    return this;
  }
  end(settings = {}) {
    settings = (0, import_deepMerge.default)(this._settings, settings);
    this.endTime = Date.now();
    return this.toObject(settings);
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
