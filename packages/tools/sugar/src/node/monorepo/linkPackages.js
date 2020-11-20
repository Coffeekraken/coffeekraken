"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const findPackages_1 = __importDefault(require("./findPackages"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
module.exports = async function linkPackages(settings = {}) {
    settings = {
        rootDir: process.cwd(),
        ...settings
    };
    return new SPromise_1.default(async (resolve, reject, trigger, cancel) => {
        // make sure we are in a package
        if (!fs_1.default.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        // read the package json
        // const json = require(`${settings.rootDir}/package.json`);
        // search for packages of the monorepo
        const packagesObj = await findPackages_1.default(settings.rootDir);
        // loop on each packages
        Object.keys(packagesObj).forEach((packagePath) => {
            // get json
            const packageJson = packagesObj[packagePath];
            // logs
            trigger('log', {
                value: `<yellow>${packageJson.name}</yellow> (<cyan>${packageJson.version}</cyan>)`
            });
            // loop again in the packagesObj to create symlink in every
            // node_modules packages folders
            Object.keys(packagesObj).forEach((path) => {
                if (packagePath === path)
                    return; // avoid linking itself
                const json = packagesObj[path];
                if (packageJson.dependencies &&
                    !Object.keys(packageJson.dependencies).includes(json.name)) {
                    return;
                }
                if (packageJson.devDependencies &&
                    !Object.keys(packageJson.devDependencies).includes(json.name)) {
                    return;
                }
                const currentModulePath = `${settings.rootDir}/${packagePath}`;
                const destinationModulePath = `${settings.rootDir}/${path}`;
                const nodeModulesPath = `${currentModulePath}/node_modules`;
                let symlinkFolderPath = nodeModulesPath;
                const splitedName = json.name.split('/');
                const groupFolder = splitedName.length === 2 ? splitedName[0] : null;
                if (groupFolder) {
                    ensureDirSync_1.default(`${nodeModulesPath}/${groupFolder}`);
                    symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                }
                const nameFolder = splitedName.length === 2 ? splitedName[1] : splitedName[0];
                const relPathToDestinationModule = path_1.default.relative(symlinkFolderPath, destinationModulePath);
                child_process_1.default.execSync(`cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`);
                // logs
                trigger('log', {
                    value: `- Symlinked package <green>${json.name}</green>`
                });
            });
        });
        // resolvee
        resolve();
    });
};
