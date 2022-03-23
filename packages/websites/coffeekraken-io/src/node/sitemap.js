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
var sitemap_exports = {};
__export(sitemap_exports, {
  default: () => sitemap
});
module.exports = __toCommonJS(sitemap_exports);
var import_s_docmap = __toESM(require("@coffeekraken/s-docmap"), 1);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"), 1);
var import_fileHash = __toESM(require("@coffeekraken/sugar/node/fs/fileHash"), 1);
var import_fs = __toESM(require("fs"), 1);
var import_s_log = __toESM(require("@coffeekraken/s-log"), 1);
function sitemap() {
  return new import_s_promise.default(async ({ resolve, reject, emit }) => {
    const items = [
      {
        loc: "/config/explorer"
      }
    ];
    const hashesByPath = {};
    const docmapInstance = new import_s_docmap.default();
    const docmapJson = await docmapInstance.read();
    for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
      let hash = hashesByPath[docmapObj.path];
      if (!hash) {
        if (!import_fs.default.existsSync(docmapObj.path)) {
          emit("log", {
            type: import_s_log.default.TYPE_WARN,
            value: `<red>[sitemap]</red> The file "<cyan>${docmapObj.path}</cyan>" has been skipped cause it does not exists...`
          });
        } else {
          hash = (0, import_fileHash.default)(docmapObj.path);
          hashesByPath[docmapObj.path] = hash;
        }
      }
      items.push({
        loc: `/api/${namespace}`,
        integrity: hash
      });
    }
    resolve(items);
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
