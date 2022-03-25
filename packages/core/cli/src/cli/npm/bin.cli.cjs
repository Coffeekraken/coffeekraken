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
var bin_cli_exports = {};
__export(bin_cli_exports, {
  default: () => bin
});
module.exports = __toCommonJS(bin_cli_exports);
var import_parseArgs = __toESM(require("../../node/cli/parseArgs"));
var import_SNpmBinCliInterface = __toESM(require("./interface/SNpmBinCliInterface"));
var import_child_process = __toESM(require("child_process"));
var import_packageRootDir = __toESM(require("../../node/path/packageRootDir"));
var import_fs = __toESM(require("fs"));
var import_path = __toESM(require("path"));
var import_findPackages = __toESM(require("../../node/monorepo/findPackages"));
async function bin(stringArgs = "") {
  const argsObj = (0, import_parseArgs.default)(stringArgs, {
    definition: import_SNpmBinCliInterface.default.definition
  });
  const binCommand = `npm bin ${argsObj.global ? "-g" : ""}`;
  const binFolderPath = import_child_process.default.execSync(binCommand).toString();
  let packagePath;
  if (!argsObj.package) {
    packagePath = (0, import_packageRootDir.default)();
    if (!import_fs.default.existsSync(`${packagePath}/package.json`)) {
      throw "Sorry but you're not in any package folder to take the bin from...";
    }
  } else {
    const packagesObj = await (0, import_findPackages.default)();
    let packageJson;
    for (let i = 0; i < Object.keys(packagesObj).length; i++) {
      const json = packagesObj[Object.keys(packagesObj)[i]];
      if (json.name === argsObj.package) {
        packageJson = json;
        packageJson.absolutePath = import_path.default.resolve(process.cwd(), Object.keys(packagesObj)[i]);
        break;
      }
    }
    console.log(argsObj);
    if (!packageJson)
      throw `Sorry but no package has been found with the name "<yellow>${argsObj.package}</yellow>"...`;
    if (!packageJson.bin)
      throw `Sorry but the package named "<yellow>${packageJson.name}</yellow>" does not have any bin's to install...`;
    Object.keys(packageJson.bin).forEach((binName) => {
      const binPath = packageJson.bin[binName];
      const binAbsolutePath = import_path.default.resolve(packageJson.absolutePath, binPath);
      switch (argsObj.action) {
        case "i":
        case "install":
          const symlinkCommand = `cd ${binFolderPath} && rm -rf ${binFolderPath}/${binName} && ln -s ${import_path.default.relative(binFolderPath, binAbsolutePath)} ${binName}`;
          console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully installed ${argsObj.global ? "<magenta>globaly</magenta>" : ""}`);
          import_child_process.default.spawnSync(symlinkCommand, [], {
            shell: true
          });
          break;
        case "u":
        case "un":
        case "uninstall":
          console.log(`The "<yellow>${binName}</yellow>" bin from the package "<cyan>${packageJson.name}</cyan>" has been successfully uninstalled ${argsObj.global ? "<magenta>globaly</magenta>" : ""}`);
          break;
      }
    });
  }
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
