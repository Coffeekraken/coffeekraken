import { createRequire as topLevelCreateRequire } from 'module';
 const require = topLevelCreateRequire(import.meta.url);
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
var SConfigLsAdapter_exports = {};
__export(SConfigLsAdapter_exports, {
  default: () => SConfigLsAdapter_default
});
module.exports = __toCommonJS(SConfigLsAdapter_exports);
var import_toString = __toESM(require("@coffeekraken/sugar/shared/string/toString"));
var import_parse = __toESM(require("@coffeekraken/sugar/shared/string/parse"));
var import_deepMerge = __toESM(require("@coffeekraken/sugar/shared/object/deepMerge"));
var import_SConfigAdapter = __toESM(require("../../shared/adapters/SConfigAdapter"));
var import_diff = __toESM(require("@coffeekraken/sugar/shared/object/diff"));
class SConfigLsAdapter extends import_SConfigAdapter.default {
  get configLsAdapterSettings() {
    return this.configLsAdapterSettings.configLsAdapter;
  }
  constructor(settings) {
    super((0, import_deepMerge.default)({
      configLsAdapter: {}
    }, settings || {}));
  }
  load() {
    const config = (0, import_parse.default)(localStorage.getItem(this.name)) || {};
    return (0, import_deepMerge.default)(config.default || {}, config.app || {}, config.user || {});
  }
  save(newConfig = {}) {
    const baseConfig = (0, import_deepMerge.default)(this.configLsAdapterSettings.defaultConfig, this.configLsAdapterSettings.appConfig);
    localStorage.setItem(this.name, (0, import_toString.default)({
      default: this.configLsAdapterSettings.defaultConfig,
      app: this.configLsAdapterSettings.appConfig,
      user: (0, import_diff.default)(baseConfig, newConfig)
    }));
    return true;
  }
}
var SConfigLsAdapter_default = SConfigLsAdapter;
