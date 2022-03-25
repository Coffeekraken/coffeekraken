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
var copy_cli_exports = {};
__export(copy_cli_exports, {
  default: () => copy_cli_default
});
module.exports = __toCommonJS(copy_cli_exports);
var import_SCliFsCopyParamsInterface = __toESM(require("../../node/fs/interface/SCliFsCopyParamsInterface"));
var import_s_promise = __toESM(require("@coffeekraken/s-promise"));
var import_copySync = __toESM(require("@coffeekraken/sugar/node/fs/copySync"));
var import_directory = __toESM(require("@coffeekraken/sugar/node/is/directory"));
var import_s_log = __toESM(require("@coffeekraken/s-log"));
var import_s_glob = __toESM(require("@coffeekraken/s-glob"));
var copy_cli_default = (stringArgs = "") => {
  return new import_s_promise.default(async ({ resolve, reject, emit, pipe }) => {
    const finalParams = import_SCliFsCopyParamsInterface.default.apply(stringArgs);
    let files = [finalParams.src];
    if (finalParams.glob) {
      const paths = import_s_glob.default.resolve(finalParams.glob, {
        cwd: finalParams.src,
        nodir: false
      });
      files = paths.map((f) => f.relPath);
    }
    files.forEach((path, i) => {
      const relPath = path;
      if (finalParams.glob)
        path = `${finalParams.src}/${path}`;
      const type = (0, import_directory.default)(path) ? "directory" : "file";
      emit("log", {
        type: import_s_log.default.TYPE_INFO,
        value: `<yellow>[copy]</yellow> Copying the ${type} <cyan>${path}</cyan> to <cyan>${finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest}</cyan>`
      });
      (0, import_copySync.default)(path, finalParams.glob ? `${finalParams.dest}/${relPath}` : finalParams.dest);
      if (finalParams.chdir && files.length === i + 1) {
        process.chdir(finalParams.dest);
        emit("chdir", finalParams.dest);
      }
    });
    resolve();
  });
};
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
