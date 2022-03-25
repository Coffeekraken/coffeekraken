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
var rootFiles_exports = {};
__export(rootFiles_exports, {
  default: () => rootFiles
});
module.exports = __toCommonJS(rootFiles_exports);
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"));
var import_fs = __toESM(require("fs"));
var import_directory = __toESM(require("@coffeekraken/sugar/node/is/directory"));
var import_express = __toESM(require("express"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
function rootFiles(express, settings, config) {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const packageRoot = (0, import_packageRoot.default)();
    const files = import_fs.default.readdirSync(packageRoot);
    emit("log", {
      value: `<yellow>[rootFiles]</yellow> Exposing <magenta>${files.length}</magenta> root file(s)`
    });
    files.forEach((fileName) => {
      const filePath = `${packageRoot}/${fileName}`;
      if ((0, import_directory.default)(filePath))
        return;
      if (["docmap.json", "package.json"].includes(fileName))
        return;
      express.get(`/${fileName}`, import_express.default.static(packageRoot, {
        index: fileName
      }));
    });
    resolve(true);
  }, {
    metas: {
      id: "SFrontendServer"
    }
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
