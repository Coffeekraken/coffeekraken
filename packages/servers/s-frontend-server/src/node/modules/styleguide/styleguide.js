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
var styleguide_exports = {};
__export(styleguide_exports, {
  default: () => docmap
});
module.exports = __toCommonJS(styleguide_exports);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
async function docmap(express, settings, config) {
  var _a;
  const docmap2 = new import_s_docmap.default();
  const docmapJson = await docmap2.read();
  const menu = docmapJson.menu;
  config.handlers.styleguide = {
    path: `${(0, import_dirname.default)()}/styleguideHandler`
  };
  Object.keys((_a = menu.custom.styleguide) == null ? void 0 : _a.slug).forEach((slug) => {
    config.routes[slug] = {
      handler: "styleguide"
    };
  });
  return true;
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
