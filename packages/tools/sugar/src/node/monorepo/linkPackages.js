var __defProp = Object.defineProperty;
var __getOwnPropSymbols = Object.getOwnPropertySymbols;
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
import _path from "path";
import _findPackages from "./findPackages";
import _childProcess from "child_process";
import __fs from "fs";
import __chalk from "chalk";
import __packageRootDir from "../path/packageRootDir";
import __readJsonSync from "@coffeekraken/sugar/node/fs/readJsonSync";
function linkPackages(params = {}, settings = {}) {
  settings = __spreadValues({
    rootDir: process.cwd()
  }, settings);
  params = __spreadValues({
    individual: false
  }, params);
  return new Promise(async (resolve, reject) => {
    if (!__fs.existsSync(`${settings.rootDir}/package.json`)) {
      return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
    }
    const topPackagePath = `${__packageRootDir(process.cwd(), true)}`;
    const topPackageJson = __readJsonSync(`${topPackagePath}/package.json`);
    if (!params.individual) {
      console.log(`
${__chalk.yellow(topPackageJson.name)} ${topPackageJson.license} (${__chalk.cyan(topPackageJson.version)})`);
    }
    const packagesObj = await _findPackages(settings.rootDir);
    Object.keys(packagesObj).forEach((packagePath) => {
      const packageJson = packagesObj[packagePath];
      if (params.individual) {
        console.log(`
${__chalk.yellow(packageJson.name)} ${packageJson.license} (${__chalk.cyan(packageJson.version)})`);
      }
      if (!params.individual) {
        const topPackageNodeModulesPath = `${topPackagePath}/node_modules`;
        const topPackageContainerPath = `${topPackageNodeModulesPath}${packageJson.name.split("/").length >= 2 ? "/" + packageJson.name.split("/")[0] : ""}`;
        const symlinkFolderName = packageJson.name.split("/").length >= 2 ? packageJson.name.split("/")[1] : packageJson.name;
        if (!__fs.existsSync(topPackageContainerPath)) {
          __fs.mkdirSync(topPackageContainerPath, {
            recursive: true
          });
        }
        const relPathToDestinationModule = _path.relative(topPackageContainerPath, packagePath);
        _childProcess.execSync(`cd ${topPackageContainerPath} && rm -rf ${symlinkFolderName} && ln -s ${relPathToDestinationModule} ${symlinkFolderName}`);
        console.log(`- Symlinked package ${__chalk.green(packageJson.name)} ${packageJson.license} (${__chalk.cyan(packageJson.version)})`);
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
            if (!__fs.existsSync(`${nodeModulesPath}/${groupFolder}`)) {
              __fs.mkdirSync(`${nodeModulesPath}/${groupFolder}`, {
                recursive: true
              });
            }
            symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
          }
          const nameFolder = splitedName.length === 2 ? splitedName[1] : splitedName[0];
          const relPathToDestinationModule = _path.relative(symlinkFolderPath, destinationModulePath);
          _childProcess.execSync(`cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`);
          console.log(`- Symlinked package ${__chalk.green(json.name)} ${json.license} (${__chalk.cyan(json.version)})`);
        });
      }
    });
    resolve();
  });
}
export {
  linkPackages as default
};
