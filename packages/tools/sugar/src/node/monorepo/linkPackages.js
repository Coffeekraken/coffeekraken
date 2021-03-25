"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
// import _ensureDirSync from '../fs/ensureDirSync';
const path_1 = __importDefault(require("path"));
const findPackages_1 = __importDefault(require("./findPackages"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const chalk_1 = __importDefault(require("chalk"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
function linkPackages(params = {}, settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    params = Object.assign({ individual: false }, params);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // make sure we are in a package
        if (!fs_1.default.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        const topPackagePath = `${packageRoot_1.default(process.cwd(), true)}`;
        const topPackageJson = require(`${topPackagePath}/package.json`); // eslint-disable-line
        if (!params.individual) {
            // logs
            console.log(`\n${chalk_1.default.yellow(topPackageJson.name)} ${topPackageJson.license} (${chalk_1.default.cyan(topPackageJson.version)})`);
        }
        // search for packages of the monorepo
        const packagesObj = yield findPackages_1.default(settings.rootDir);
        // loop on each packages
        Object.keys(packagesObj).forEach((packagePath) => {
            // get json
            const packageJson = packagesObj[packagePath];
            if (params.individual) {
                // logs
                console.log(`\n${chalk_1.default.yellow(packageJson.name)} ${packageJson.license} (${chalk_1.default.cyan(packageJson.version)})`);
            }
            if (!params.individual) {
                const topPackageNodeModulesPath = `${topPackagePath}/node_modules`;
                const topPackageContainerPath = `${topPackageNodeModulesPath}${packageJson.name.split('/').length >= 2
                    ? '/' + packageJson.name.split('/')[0]
                    : ''}`;
                const symlinkFolderName = packageJson.name.split('/').length >= 2
                    ? packageJson.name.split('/')[1]
                    : packageJson.name;
                if (!fs_1.default.existsSync(topPackageContainerPath)) {
                    fs_1.default.mkdirSync(topPackageContainerPath, {
                        recursive: true
                    });
                }
                const relPathToDestinationModule = path_1.default.relative(topPackageContainerPath, packagePath);
                child_process_1.default.execSync(`cd ${topPackageContainerPath} && rm -rf ${symlinkFolderName} && ln -s ${relPathToDestinationModule} ${symlinkFolderName}`);
                // logs
                console.log(`- Symlinked package ${chalk_1.default.green(packageJson.name)} ${packageJson.license} (${chalk_1.default.cyan(packageJson.version)})`);
            }
            else {
                // loop again in the packagesObj to create symlink in every
                // node_modules packages folders
                Object.keys(packagesObj).forEach((path) => {
                    if (packagePath === path)
                        return; // avoid linking itself
                    const json = packagesObj[path];
                    if ((packageJson.dependencies &&
                        Object.keys(packageJson.dependencies).includes(json.name)) ||
                        (packageJson.devDependencies &&
                            Object.keys(packageJson.devDependencies).includes(json.name))) {
                    }
                    else
                        return;
                    const currentModulePath = `${settings.rootDir}/${packagePath}`;
                    const destinationModulePath = `${settings.rootDir}/${path}`;
                    const nodeModulesPath = `${currentModulePath}/node_modules`;
                    let symlinkFolderPath = nodeModulesPath;
                    const splitedName = json.name.split('/');
                    const groupFolder = splitedName.length === 2 ? splitedName[0] : null;
                    if (groupFolder) {
                        if (!fs_1.default.existsSync(`${nodeModulesPath}/${groupFolder}`)) {
                            fs_1.default.mkdirSync(`${nodeModulesPath}/${groupFolder}`, {
                                recursive: true
                            });
                        }
                        symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                    }
                    const nameFolder = splitedName.length === 2 ? splitedName[1] : splitedName[0];
                    const relPathToDestinationModule = path_1.default.relative(symlinkFolderPath, destinationModulePath);
                    child_process_1.default.execSync(`cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`);
                    // logs
                    console.log(`- Symlinked package ${chalk_1.default.green(json.name)} ${json.license} (${chalk_1.default.cyan(json.version)})`);
                });
            }
        });
        // resolvee
        resolve();
    }));
}
exports.default = linkPackages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua1BhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua1BhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9EQUFvRDtBQUNwRCxnREFBeUI7QUFDekIsa0VBQTJDO0FBQzNDLGtFQUEwQztBQUMxQyw0Q0FBc0I7QUFDdEIsa0RBQTRCO0FBQzVCLHNFQUFnRDtBQXFDaEQsU0FBd0IsWUFBWSxDQUNsQyxNQUFNLEdBQUcsRUFBRSxFQUNYLFFBQVEsR0FBRyxFQUFFO0lBRWIsUUFBUSxtQkFDTixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNuQixRQUFRLENBQ1osQ0FBQztJQUNGLE1BQU0sbUJBQ0osVUFBVSxFQUFFLEtBQUssSUFDZCxNQUFNLENBQ1YsQ0FBQztJQUVGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDM0MsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sZUFBZSxDQUFDLEVBQUU7WUFDeEQsT0FBTyxNQUFNLENBQ1gseUNBQXlDLFFBQVEsQ0FBQyxPQUFPLHFFQUFxRSxDQUMvSCxDQUFDO1NBQ0g7UUFFRCxNQUFNLGNBQWMsR0FBRyxHQUFHLHFCQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxFQUFFLENBQUM7UUFDL0QsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLEdBQUcsY0FBYyxlQUFlLENBQUMsQ0FBQyxDQUFDLHNCQUFzQjtRQUV4RixJQUFJLENBQUMsTUFBTSxDQUFDLFVBQVUsRUFBRTtZQUN0QixPQUFPO1lBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDVCxLQUFLLGVBQU8sQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLElBQUksQ0FBQyxJQUN0QyxjQUFjLENBQUMsT0FDakIsS0FBSyxlQUFP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