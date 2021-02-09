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
const ensureDirSync_1 = __importDefault(require("../fs/ensureDirSync"));
const path_1 = __importDefault(require("path"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const findPackages_1 = __importDefault(require("./findPackages"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
function linkPackages(settings = {}) {
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
}
exports.default = linkPackages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua1BhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibGlua1BhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxnREFBeUI7QUFDekIsbUVBQTRDO0FBQzVDLGtFQUEyQztBQUMzQyxrRUFBMEM7QUFDMUMsNENBQXFCO0FBcUNyQixTQUF3QixZQUFZLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDaEQsUUFBUSxtQkFDTixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNuQixRQUFRLENBQ1osQ0FBQztJQUNGLE9BQU8sSUFBSSxrQkFBUyxDQUNsQixDQUNFLE9BQXFDLEVBQ3JDLE1BQW9DLEVBQ3BDLElBQXlCLEVBQ3pCLEVBQUU7UUFDRixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLFlBQUcsQ0FBQyxVQUFVLENBQUMsR0FBRyxRQUFRLENBQUMsT0FBTyxlQUFlLENBQUMsRUFBRTtZQUN2RCxPQUFPLE1BQU0sQ0FDWCx5Q0FBeUMsUUFBUSxDQUFDLE9BQU8scUVBQXFFLENBQy9ILENBQUM7U0FDSDtRQUNELHNDQUFzQztRQUN0QyxNQUFNLFdBQVcsR0FBRyxNQUFNLHNCQUFhLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQzFELHdCQUF3QjtRQUN4QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQy9DLFdBQVc7WUFDWCxNQUFNLFdBQVcsR0FBRyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDN0MsT0FBTztZQUNQLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLFdBQVcsV0FBVyxDQUFDLElBQUksb0JBQW9CLFdBQVcsQ0FBQyxPQUFPLFVBQVU7YUFDcEYsQ0FBQyxDQUFDO1lBQ0gsMkRBQTJEO1lBQzNELGdDQUFnQztZQUNoQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN4QyxJQUFJLFdBQVcsS0FBSyxJQUFJO29CQUFFLE9BQU8sQ0FBQyx1QkFBdUI7Z0JBQ3pELE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0IsSUFDRSxDQUFDLFdBQVcsQ0FBQyxZQUFZO29CQUN2QixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUM1RCxDQUFDLFdBQVcsQ0FBQyxlQUFlO3dCQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLEVBQy9EO2lCQUNEOztvQkFBTSxPQUFPO2dCQUNkLE1BQU0saUJBQWlCLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxJQUFJLFdBQVcsRUFBRSxDQUFDO2dCQUMvRCxNQUFNLHFCQUFxQixHQUFHLEdBQUcsUUFBUSxDQUFDLE9BQU8sSUFBSSxJQUFJLEVBQUUsQ0FBQztnQkFDNUQsTUFBTSxlQUFlLEdBQUcsR0FBRyxpQkFBaUIsZUFBZSxDQUFDO2dCQUM1RCxJQUFJLGlCQUFpQixHQUFHLGVBQWUsQ0FBQztnQkFDeEMsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ3pDLE1BQU0sV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQztnQkFDckUsSUFBSSxXQUFXLEVBQUU7b0JBQ2YsdUJBQWMsQ0FBQyxHQUFHLGVBQWUsSUFBSSxXQUFXLEVBQUUsQ0FBQyxDQUFDO29CQUNwRCxpQkFBaUIsR0FBRyxHQUFHLGlCQUFpQixJQUFJLFdBQVcsRUFBRSxDQUFDO2lCQUMzRDtnQkFDRCxNQUFNLFVBQVUsR0FDZCxXQUFXLENBQUMsTUFBTSxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdELE1BQU0sMEJBQTBCLEdBQUcsY0FBSyxDQUFDLFFBQVEsQ0FDL0MsaUJBQWlCLEVBQ2pCLHFCQUFxQixDQUN0QixDQUFDO2dCQUNGLHVCQUFhLENBQUMsUUFBUSxDQUNwQixNQUFNLGlCQUFpQixjQUFjLFVBQVUsYUFBYSwwQkFBMEIsSUFBSSxVQUFVLEVBQUUsQ0FDdkcsQ0FBQztnQkFDRixPQUFPO2dCQUNQLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLDhCQUE4QixJQUFJLENBQUMsSUFBSSxVQUFVO2lCQUN6RCxDQUFDLENBQUM7WUFDTCxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsV0FBVztRQUNYLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQyxDQUFBLENBQ0YsQ0FBQztBQUNKLENBQUM7QUFwRUQsK0JBb0VDIn0=