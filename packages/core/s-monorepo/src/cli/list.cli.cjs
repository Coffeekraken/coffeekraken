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
var list_cli_exports = {};
__export(list_cli_exports, {
  default: () => list_cli_default
});
module.exports = __toCommonJS(list_cli_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_SCliMonoListParamsInterface = __toESM(require("../node/interface/SCliMonoListParamsInterface"));
var import_s_glob = __toESM(require("@coffeekraken/s-glob"));
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"));
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"));
var list_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliMonoListParamsInterface.default.apply(stringArgs);
    const root = (0, import_packageRoot.default)(process.cwd(), true);
    const rootPackageJson = (0, import_readJsonSync.default)(`${root}/package.json`);
    const files = import_s_glob.default.resolve(finalParams.packagesGlobs, {
      cwd: root
    });
    emit("log", {
      value: `<cyan>${files.length}</cyan> packages found:`
    });
    files.forEach((file) => {
      let version = "unknown", name, path = file.relPath;
      if (file.relPath.match(/package\.json$/)) {
        const json = (0, import_readJsonSync.default)(file.path);
        version = json.version;
        name = json.name;
        console.log(file.relPath);
        if (json.type !== "module") {
        }
      }
    });
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
