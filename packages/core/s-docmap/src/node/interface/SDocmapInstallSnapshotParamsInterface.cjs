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
var SDocmapInstallSnapshotParamsInterface_exports = {};
__export(SDocmapInstallSnapshotParamsInterface_exports, {
  default: () => SDocmapInstallSnapshotParamsInterface_default
});
module.exports = __toCommonJS(SDocmapInstallSnapshotParamsInterface_exports);
var import_s_sugar_config = __toESM(require("@coffeekraken/s-sugar-config"), 1);
var import_s_interface = __toESM(require("@coffeekraken/s-interface"), 1);
class SDocmapInstallSnapshotParamsInterface extends import_s_interface.default {
  static get _definition() {
    return {
      glob: {
        description: "Specify a glob pattern where to find the snapshots to install",
        type: "String",
        default: import_s_sugar_config.default.get("docmap.installSnapshot.glob")
      }
    };
  }
}
var SDocmapInstallSnapshotParamsInterface_default = SDocmapInstallSnapshotParamsInterface;
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
