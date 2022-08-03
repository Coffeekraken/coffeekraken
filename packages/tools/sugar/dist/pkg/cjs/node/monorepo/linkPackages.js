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
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const chalk_1 = __importDefault(require("chalk"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const packageRootDir_1 = __importDefault(require("../path/packageRootDir"));
const findPackages_1 = __importDefault(require("./findPackages"));
function linkPackages(params = {}, settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    params = Object.assign({ individual: false }, params);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
        // make sure we are in a package
        if (!fs_1.default.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        const topPackagePath = `${(0, packageRootDir_1.default)(process.cwd(), {
            highest: true,
        })}`;
        const topPackageJson = (0, readJsonSync_1.default)(`${topPackagePath}/package.json`); // eslint-disable-line
        if (!params.individual) {
            // logs
            console.log(`\n${chalk_1.default.yellow(topPackageJson.name)} ${topPackageJson.license} (${chalk_1.default.cyan(topPackageJson.version)})`);
        }
        // search for packages of the monorepo
        const packagesObj = yield (0, findPackages_1.default)(settings.rootDir);
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
                        recursive: true,
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
                                recursive: true,
                            });
                        }
                        symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                    }
                    const nameFolder = splitedName.length === 2
                        ? splitedName[1]
                        : splitedName[0];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLG9EQUFvRDtBQUNwRCw0RkFBc0U7QUFDdEUsa0RBQTRCO0FBQzVCLGtFQUEwQztBQUMxQyw0Q0FBc0I7QUFDdEIsZ0RBQXlCO0FBQ3pCLDRFQUFzRDtBQUN0RCxrRUFBMkM7QUFzQzNDLFNBQXdCLFlBQVksQ0FDaEMsTUFBTSxHQUFHLEVBQUUsRUFDWCxRQUFRLEdBQUcsRUFBRTtJQUViLFFBQVEsbUJBQ0osT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFDbkIsUUFBUSxDQUNkLENBQUM7SUFDRixNQUFNLG1CQUNGLFVBQVUsRUFBRSxLQUFLLElBQ2QsTUFBTSxDQUNaLENBQUM7SUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1FBQ3pDLGdDQUFnQztRQUNoQyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxPQUFPLGVBQWUsQ0FBQyxFQUFFO1lBQ3RELE9BQU8sTUFBTSxDQUNULHlDQUF5QyxRQUFRLENBQUMsT0FBTyxxRUFBcUUsQ0FDakksQ0FBQztTQUNMO1FBRUQsTUFBTSxjQUFjLEdBQUcsR0FBRyxJQUFBLHdCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtZQUN0RCxPQUFPLEVBQUUsSUFBSTtTQUNoQixDQUFDLEVBQUUsQ0FBQztRQUNMLE1BQU0sY0FBYyxHQUFHLElBQUEsc0JBQWMsRUFBQyxHQUFHLGNBQWMsZUFBZSxDQUFDLENBQUMsQ0FBQyxzQkFBc0I7UUFFL0YsSUFBSSxDQUFDLE1BQU0sQ0FBQyxVQUFVLEVBQUU7WUFDcEIsT0FBTztZQUNQLE9BQU8sQ0FBQyxHQUFHLENBQ1AsS0FBSyxlQUFPLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENB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