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
var linkPackages_exports = {};
__export(linkPackages_exports, {
  default: () => linkPackages
});
module.exports = __toCommonJS(linkPackages_exports);
var import_path = __toESM(require("path"));
var import_findPackages = __toESM(require("./findPackages"));
var import_child_process = __toESM(require("child_process"));
var import_fs = __toESM(require("fs"));
var import_chalk = __toESM(require("chalk"));
var import_packageRootDir = __toESM(require("../path/packageRootDir"));
var import_readJsonSync = __toESM(require("@coffeekraken/sugar/node/fs/readJsonSync"));
function linkPackages(params = {}, settings = {}) {
  settings = __spreadValues({
    rootDir: process.cwd()
  }, settings);
  params = __spreadValues({
    individual: false
  }, params);
  return new Promise(async (resolve, reject) => {
    if (!import_fs.default.existsSync(`${settings.rootDir}/package.json`)) {
      return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
    }
    const topPackagePath = `${(0, import_packageRootDir.default)(process.cwd(), true)}`;
    const topPackageJson = (0, import_readJsonSync.default)(`${topPackagePath}/package.json`);
    if (!params.individual) {
      console.log(`
${import_chalk.default.yellow(topPackageJson.name)} ${topPackageJson.license} (${import_chalk.default.cyan(topPackageJson.version)})`);
    }
    const packagesObj = await (0, import_findPackages.default)(settings.rootDir);
    Object.keys(packagesObj).forEach((packagePath) => {
      const packageJson = packagesObj[packagePath];
      if (params.individual) {
        console.log(`
${import_chalk.default.yellow(packageJson.name)} ${packageJson.license} (${import_chalk.default.cyan(packageJson.version)})`);
      }
      if (!params.individual) {
        const topPackageNodeModulesPath = `${topPackagePath}/node_modules`;
        const topPackageContainerPath = `${topPackageNodeModulesPath}${packageJson.name.split("/").length >= 2 ? "/" + packageJson.name.split("/")[0] : ""}`;
        const symlinkFolderName = packageJson.name.split("/").length >= 2 ? packageJson.name.split("/")[1] : packageJson.name;
        if (!import_fs.default.existsSync(topPackageContainerPath)) {
          import_fs.default.mkdirSync(topPackageContainerPath, {
            recursive: true
          });
        }
        const relPathToDestinationModule = import_path.default.relative(topPackageContainerPath, packagePath);
        import_child_process.default.execSync(`cd ${topPackageContainerPath} && rm -rf ${symlinkFolderName} && ln -s ${relPathToDestinationModule} ${symlinkFolderName}`);
        console.log(`- Symlinked package ${import_chalk.default.green(packageJson.name)} ${packageJson.license} (${import_chalk.default.cyan(packageJson.version)})`);
      } else {
        Object.keys(packagesObj).forEach((path) => {
          if (packagePath === path)
            return;
          const json = packagesObj[path];
          if (packageJson.dependencies && Object.keys(packageJson.dependencies).includes(json.name) || packageJson.devDependencies && Object.keys(packageJson.devDependencies).includes(json.name)) {
          } else
            return;
          const currentModulePath = `${settings.rootDir}/${packagePath}`;
          const destinationModulePath = `${settings.rootDir}/${path}`;
          const nodeModulesPath = `${currentModulePath}/node_modules`;
          let symlinkFolderPath = nodeModulesPath;
          const splitedName = json.name.split("/");
          const groupFolder = splitedName.length === 2 ? splitedName[0] : null;
          if (groupFolder) {
            if (!import_fs.default.existsSync(`${nodeModulesPath}/${groupFolder}`)) {
              import_fs.default.mkdirSync(`${nodeModulesPath}/${groupFolder}`, {
                recursive: true
              });
            }
            symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
          }
          const nameFolder = splitedName.length === 2 ? splitedName[1] : splitedName[0];
          const relPathToDestinationModule = import_path.default.relative(symlinkFolderPath, destinationModulePath);
          import_child_process.default.execSync(`cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`);
          console.log(`- Symlinked package ${import_chalk.default.green(json.name)} ${json.license} (${import_chalk.default.cyan(json.version)})`);
        });
      }
    });
    resolve();
  });
}
// Annotate the CommonJS export names for ESM import in node:
0 && (module.exports = {});
