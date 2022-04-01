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
var SBind_exports = {};
__export(SBind_exports, {
  default: () => SBind
});
module.exports = __toCommonJS(SBind_exports);
var import_SWatch = __toESM(require("../../shared/object/SWatch"), 1);
class SBind {
  constructor() {
    this._bindStack = {
      attr2obj: {},
      obj2attr: {}
    };
    this._mutationObservedElementsStack = [];
    this._digestsMutation = /* @__PURE__ */ new Map();
    this._watcher = new import_SWatch.default();
  }
  bind(source, sourcePath, target, targetPath) {
    if (typeof source === "object" && !source.hasOwnProperty("__$SWatch")) {
      source = new import_SWatch.default(source);
    }
  }
}
