var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __propIsEnum = Object.prototype.propertyIsEnumerable;
var __defNormalProp = (obj, key, value) => key in obj ? __defProp(obj, key, { enumerable: true, configurable: true, writable: true, value }) : obj[key] = value;
var __spreadValues = (a, b) => {
  for (var prop in b || (b = {}))
    if (__hasOwnProp.call(b, prop))
      __defNormalProp(a, prop, b[prop]);
  if (__getOwnPropSymbols)
    for (var prop of __getOwnPropSymbols(b)) {
      if (__propIsEnum.call(b, prop))
        __defNormalProp(a, prop, b[prop]);
    }
  return a;
};
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
var downloadRepository_exports = {};
__export(downloadRepository_exports, {
  default: () => downloadRepository
});
module.exports = __toCommonJS(downloadRepository_exports);
var import_fs = __toESM(require("fs"), 1);
var import_https = __toESM(require("https"), 1);
var import_systemTmpDir = __toESM(require("../path/systemTmpDir"), 1);
var import_unzip = __toESM(require("../zip/unzip"), 1);
var import_fs_extra = __toESM(require("fs-extra"), 1);
var import_filename = __toESM(require("../fs/filename"), 1);
var import_folderPath = __toESM(require("../fs/folderPath"), 1);
function downloadRepository(repository, settings) {
  return new Promise((resolve, reject) => {
    settings = __spreadValues({
      dest: "",
      unzip: false,
      branch: "master"
    }, settings != null ? settings : {});
    if (!settings.dest) {
      settings.dest = `${(0, import_systemTmpDir.default)()}/downloads/${repository.replace(/[\/\s]/gm, "-").toLowerCase()}-${settings.branch}.zip`;
    }
    let dest = settings.dest;
    if (!dest.match(/\.g?zip$/)) {
      dest = `${dest}/${repository.replace(/[\/\s]/gm, "-").toLowerCase()}-${settings.branch}.zip`;
    }
    const folderName = (0, import_filename.default)(dest).replace(/\.g?zip$/, "");
    import_fs_extra.default.ensureDir((0, import_folderPath.default)(dest));
    const url = `https://codeload.github.com/${repository}/zip/${settings.branch}`;
    const file = import_fs.default.createWriteStream(dest);
    const request = import_https.default.get(url, function(response) {
      response.pipe(file);
      file.on("finish", async () => {
        await file.close();
        if (settings == null ? void 0 : settings.unzip) {
          const newDest = dest.split("/").slice(0, -1).join("/");
          const destFolderPath = dest.replace(/\.g?zip$/, "");
          import_fs_extra.default.removeSync(destFolderPath);
          await (0, import_unzip.default)(dest, {
            dest: newDest
          });
          const files = import_fs.default.readdirSync(destFolderPath);
          import_fs_extra.default.moveSync(`${destFolderPath}/${files[0]}`, `${newDest}/${files[0]}`, { overwrite: true });
          import_fs_extra.default.removeSync(destFolderPath);
          import_fs_extra.default.moveSync(`${newDest}/${files[0]}`, `${newDest}/${folderName}`);
          import_fs_extra.default.removeSync(dest);
          dest = `${newDest}/${folderName}`;
        }
        resolve({
          dest
        });
      });
    }).on("error", async (err) => {
      try {
        import_fs.default.unlinkSync(settings == null ? void 0 : settings.dest);
      } catch (e) {
      }
      reject({
        error: err
      });
    });
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
