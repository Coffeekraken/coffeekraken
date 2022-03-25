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
var SCliMonoListParamsInterface_exports = {};
__export(SCliMonoListParamsInterface_exports, {
  default: () => SCliMonoListParamsInterface
});
module.exports = __toCommonJS(SCliMonoListParamsInterface_exports);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"));
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"));
class SCliMonoListParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      packagesGlobs: {
        description: "Specify some globs to search for packages relative to the monorepo root directory",
        type: "Array<String>",
        default: import_s_sugar_config.default.get("monorepo.packagesGlobs")
      }
    };
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
