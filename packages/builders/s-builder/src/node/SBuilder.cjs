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
var SBuilder_exports = {};
__export(SBuilder_exports, {
  default: () => SBuilder_default
});
module.exports = __toCommonJS(SBuilder_exports);
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"), 1);
var import_s_class = __toESM(require("@coffeekraken/s-class"), 1);
var import_s_duration = __toESM(require("@coffeekraken/s-duration"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
class SBuilder extends import_s_class.default {
  get builderSettings() {
    return this._settings.builder;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      builder: {
        interface: void 0
      }
    }, settings || {}));
  }
  build(params = {}, settings = {}) {
    settings = (0, import_deepMerge.default)(this.builderSettings, settings);
    const duration = new import_s_duration.default();
    let finalParams = params;
    if (settings.interface) {
      finalParams = settings.interface.apply(params);
    }
    const promise = this._build(finalParams, settings);
    promise.emit("log", {
      type: import_s_log.default.TYPE_INFO,
      value: `<yellow>[build]</yellow> Start ${this.constructor.name} build`
    });
    promise.then(() => {
      promise.emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<green>[success]</green> Build ${this.constructor.name} finished <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
      });
    });
    return promise;
  }
}
var SBuilder_default = SBuilder;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
