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
var docmap_exports = {};
__export(docmap_exports, {
  default: () => docmap
});
module.exports = __toCommonJS(docmap_exports);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_dirname = __toESM(require("@coffeekraken/sugar/node/fs/dirname"), 1);
function docmap(express, settings, config) {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const docmap2 = new import_s_docmap.default();
    const docmapJson = await pipe(docmap2.read());
    const menu = docmapJson.menu;
    config.middlewares.docmap = {
      path: `${(0, import_dirname.default)()}/docmapMiddleware`,
      settings: {}
    };
    Object.keys(menu.slug).forEach((slug) => {
      config.routes[slug] = {
        handler: "markdown"
      };
    });
    if (menu.packages) {
      Object.keys(menu.packages).forEach((packageName) => {
        var _a;
        const packageObj = menu.packages[packageName];
        Object.keys((_a = packageObj == null ? void 0 : packageObj.slug) != null ? _a : {}).forEach((slug) => {
          config.routes[slug] = {
            handler: "markdown"
          };
        });
      });
    }
    resolve(true);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
