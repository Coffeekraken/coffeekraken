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
var rewritesPlugin_exports = {};
__export(rewritesPlugin_exports, {
  default: () => rewritesPlugin
});
module.exports = __toCommonJS(rewritesPlugin_exports);
function rewritesPlugin(rewrites) {
  return {
    name: "rewrites-plugin",
    async transform(src, id) {
      for (let i = 0; i < rewrites.length; i++) {
        let rewriteObj = rewrites[i];
        if (typeof rewriteObj === "string") {
          const { default: re } = await Promise.resolve().then(() => __toESM(require(rewriteObj)));
          rewriteObj = re;
        }
        if (!src.match(rewriteObj.match))
          continue;
        return {
          code: rewriteObj.rewrite(src, id),
          map: null
        };
      }
      return {
        code: src,
        map: null
      };
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
