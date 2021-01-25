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
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const findPackages_1 = __importDefault(require("./findPackages"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
module.exports = function linkPackages(settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    return new SPromise_1.default((resolve, reject, emit) => __awaiter(this, void 0, void 0, function* () {
        // make sure we are in a package
        if (!fs_1.default.existsSync(`${settings.rootDir}/package.json`)) {
            return reject(`Sorry but the rootDir passed "<yellow>${settings.rootDir}</yellow>" does not contain any "<cyan>package.json</cyan>" file...`);
        }
        // search for packages of the monorepo
        const packagesObj = yield findPackages_1.default(settings.rootDir);
        // loop on each packages
        Object.keys(packagesObj).forEach((packagePath) => {
            // get json
            const packageJson = packagesObj[packagePath];
            // logs
            emit('log', {
                value: `<yellow>${packageJson.name}</yellow> (<cyan>${packageJson.version}</cyan>)`
            });
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
                    ensureDirSync_1.default(`${nodeModulesPath}/${groupFolder}`);
                    symlinkFolderPath = `${symlinkFolderPath}/${groupFolder}`;
                }
                const nameFolder = splitedName.length === 2 ? splitedName[1] : splitedName[0];
                const relPathToDestinationModule = path_1.default.relative(symlinkFolderPath, destinationModulePath);
                child_process_1.default.execSync(`cd ${symlinkFolderPath} && rm -rf ${nameFolder} && ln -s ${relPathToDestinationModule} ${nameFolder}`);
                // logs
                emit('log', {
                    value: `- Symlinked package <green>${json.name}</green>`
                });
            });
        });
        // resolvee
        resolve();
    }));
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua1BhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua1BhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7O0FBRWQsd0VBQWlEO0FBQ2pELGdEQUF5QjtBQUN6QixtRUFBNEM7QUFDNUMsa0VBQTJDO0FBQzNDLGtFQUEwQztBQUMxQyw0Q0FBcUI7QUFxQ3JCLGlCQUFTLFNBQVMsWUFBWSxDQUFDLFFBQVEsR0FBRyxFQUFFO0lBQzFDLFFBQVEsbUJBQ04sT0FBTyxFQUFFLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFDbkIsUUFBUSxDQUNaLENBQUM7SUFDRixPQUFPLElBQUksa0JBQVMsQ0FDbEIsQ0FDRSxPQUFxQyxFQUNyQyxNQUFvQyxFQUNwQyxJQUF5QixFQUN6QixFQUFFO1FBQ0YsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxZQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sZUFBZSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxNQUFNLENBQ1gseUNBQXlDLFFBQVEsQ0FBQyxPQUFPLHFFQUFxRSxDQUMvSCxDQUFDO1NBQ0g7UUFDRCxzQ0FBc0M7UUFDdEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCx3QkFBd0I7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUMvQyxXQUFXO1lBQ1gsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdDLE9BQU87WUFDUCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxXQUFXLFdBQVcsQ0FBQyxJQUFJLG9CQUFvQixXQUFXLENBQUMsT0FBTyxVQUFVO2FBQ3BGLENBQUMsQ0FBQztZQUNILDJEQUEyRDtZQUMzRCxnQ0FBZ0M7WUFDaEMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDeEMsSUFBSSxXQUFXLEtBQUssSUFBSTtvQkFBRSxPQUFPLENBQUMsdUJBQXVCO2dCQUN6RCxNQUFNLElBQUksR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9CLElBQ0UsQ0FBQyxXQUFXLENBQUMsWUFBWTtvQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDNUQsQ0FBQyxXQUFXLENBQUMsZUFBZTt3QkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxFQUMvRDtpQkFDRDs7b0JBQU0sT0FBTztnQkFDZCxNQUFNLGlCQUFpQixHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxXQUFXLEVBQUUsQ0FBQztnQkFDL0QsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksSUFBSSxFQUFFLENBQUM7Z0JBQzVELE1BQU0sZUFBZSxHQUFHLEdBQUcsaUJBQWlCLGVBQWUsQ0FBQztnQkFDNUQsSUFBSSxpQkFBaUIsR0FBRyxlQUFlLENBQUM7Z0JBQ3hDLE1BQU0sV0FBVyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN6QyxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUM7Z0JBQ3JFLElBQUksV0FBVyxFQUFFO29CQUNmLHVCQUFjLENBQUMsR0FBRyxlQUFlLElBQUksV0FBVyxFQUFFLENBQUMsQ0FBQztvQkFDcEQsaUJBQWlCLEdBQUcsR0FBRyxpQkFBaUIsSUFBSSxXQUFXLEVBQUUsQ0FBQztpQkFDM0Q7Z0JBQ0QsTUFBTSxVQUFVLEdBQ2QsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3RCxNQUFNLDBCQUEwQixHQUFHLGNBQUssQ0FBQyxRQUFRLENBQy9DLGlCQUFpQixFQUNqQixxQkFBcUIsQ0FDdEIsQ0FBQztnQkFDRix1QkFBYSxDQUFDLFFBQVEsQ0FDcEIsTUFBTSxpQkFBaUIsY0FBYyxVQUFVLGFBQWEsMEJBQTBCLElBQUksVUFBVSxFQUFFLENBQ3ZHLENBQUM7Z0JBQ0YsT0FBTztnQkFDUCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSw4QkFBOEIsSUFBSSxDQUFDLElBQUksVUFBVTtpQkFDekQsQ0FBQyxDQUFDO1lBQ0wsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILFdBQVc7UUFDWCxPQUFPLEVBQUUsQ0FBQztJQUNaLENBQUMsQ0FBQSxDQUNGLENBQUM7QUFDSixDQUFDLENBQUMifQ==