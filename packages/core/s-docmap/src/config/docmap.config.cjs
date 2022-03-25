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
var docmap_config_exports = {};
__export(docmap_config_exports, {
  default: () => docmap_config_default
});
module.exports = __toCommonJS(docmap_config_exports);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"), 1);
var import_commonTextFileExtensions = __toESM(require("@coffeekraken/sugar/shared/extension/commonTextFileExtensions"), 1);
function docmap_config_default(env, config) {
  if (env.platform !== "node")
    return;
  return {
    read: {
      input: `${(0, import_packageRoot.default)()}/docmap.json`
    },
    snapshot: {
      outDir: `[config.storage.package.rootDir]/.docmap`
    },
    installSnapshot: {
      glob: `[config.storage.package.rootDir]/.docmap/*`
    },
    build: {
      globs: [
        "*",
        `src/!(css)/*{0,4}/*.+(${(0, import_commonTextFileExtensions.default)(false).join("|")})`,
        `dist/+(css)/*`
      ],
      exclude: [
        "**/__tests__/**/*",
        "**/__tests__.wip/**/*",
        "**/__wip__/**/*"
      ],
      noExtends: false,
      filters: {
        namespace: /#\{.*\}/gm
      },
      tags: [
        "name",
        "type",
        "menu",
        "default",
        "platform",
        "description",
        "namespace",
        "status",
        "example",
        "interface",
        "async",
        "static",
        "since",
        "author"
      ],
      save: true,
      outPath: `[config.storage.package.rootDir]/docmap.json`
    }
  };
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
