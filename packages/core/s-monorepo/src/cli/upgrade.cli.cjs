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
var upgrade_cli_exports = {};
__export(upgrade_cli_exports, {
  default: () => upgrade_cli_default
});
module.exports = __toCommonJS(upgrade_cli_exports);
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_SCliMonoListParamsInterface = __toESM(require("../node/interface/SCliMonoListParamsInterface"));
var import_s_glob = __toESM(require("@coffeekraken/s-glob"));
var import_packageRoot = __toESM(require("@coffeekraken/sugar/node/path/packageRoot"));
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"));
var import_writeJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
var import_fs = __toESM(require("fs"));
var upgrade_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliMonoListParamsInterface.default.apply(stringArgs);
    const root = (0, import_packageRoot.default)(process.cwd(), true);
    const rootPackageJson = (0, import_readJsonSync.default)(`${root}/package.json`);
    const files = import_s_glob.default.resolve(finalParams.packagesGlobs, {
      cwd: root
    });
    emit("log", {
      value: `Upgrading <cyan>${files.length}</cyan> packages with these informations:`
    });
    emit("log", {
      marginBottom: 1,
      value: [
        `- <yellow>Version</yellow>: <cyan>${rootPackageJson.version}</cyan>`
      ].join("\n")
    });
    files.forEach((file) => {
      finalParams.filesToUpgrade.forEach((fileName) => {
        if (!fileName.match(/\.json$/)) {
          throw new Error(`Only json files are supported for the upgrade process for now...`);
        }
        const filePath = `${file.dirPath}/${fileName}`;
        if (!import_fs.default.existsSync(filePath))
          return;
        const json = (0, import_readJsonSync.default)(filePath);
        if (json.version === rootPackageJson.version) {
          emit("log", {
            value: `<yellow>${json.name}</yellow> <cyan>${fileName}</cyan> already up to date`
          });
          return;
        }
        json.version = rootPackageJson.version;
        (0, import_writeJsonSync.default)(filePath, json);
        emit("log", {
          value: `<green>\u2713</green> <yellow>${json.name}</yellow> <cyan>${fileName}</cyan> upgraded <green>successfully</green>`
        });
      });
    });
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
