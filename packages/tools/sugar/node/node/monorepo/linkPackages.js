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
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const findPackages_1 = __importDefault(require("./findPackages"));
const child_process_1 = __importDefault(require("child_process"));
const fs_1 = __importDefault(require("fs"));
function linkPackages(settings = {}) {
    settings = Object.assign({ rootDir: process.cwd() }, settings);
    return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
            console.log(parseHtml_1.default(`\n<yellow>${packageJson.name}</yellow> ${packageJson.license} (<cyan>${packageJson.version}</cyan>)`));
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
                console.log(parseHtml_1.default(`- Symlinked package <green>${json.name}</green> ${json.license} (<cyan>${json.version}</cyan>)`));
            });
        });
        // resolvee
        resolve();
    }));
}
exports.default = linkPackages;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibGlua1BhY2thZ2VzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL25vZGUvbW9ub3JlcG8vbGlua1BhY2thZ2VzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7OztBQUVkLHdFQUFpRDtBQUNqRCxnREFBeUI7QUFDekIscUVBQStDO0FBQy9DLGtFQUEyQztBQUMzQyxrRUFBMEM7QUFDMUMsNENBQXFCO0FBcUNyQixTQUF3QixZQUFZLENBQUMsUUFBUSxHQUFHLEVBQUU7SUFDaEQsUUFBUSxtQkFDTixPQUFPLEVBQUUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUNuQixRQUFRLENBQ1osQ0FBQztJQUNGLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsTUFBTSxFQUFFLEVBQUU7UUFDM0MsZ0NBQWdDO1FBQ2hDLElBQUksQ0FBQyxZQUFHLENBQUMsVUFBVSxDQUFDLEdBQUcsUUFBUSxDQUFDLE9BQU8sZUFBZSxDQUFDLEVBQUU7WUFDdkQsT0FBTyxNQUFNLENBQ1gseUNBQXlDLFFBQVEsQ0FBQyxPQUFPLHFFQUFxRSxDQUMvSCxDQUFDO1NBQ0g7UUFDRCxzQ0FBc0M7UUFDdEMsTUFBTSxXQUFXLEdBQUcsTUFBTSxzQkFBYSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUMxRCx3QkFBd0I7UUFDeEIsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUMvQyxXQUFXO1lBQ1gsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBQzdDLE9BQU87WUFDUCxPQUFPLENBQUMsR0FBRyxDQUNULG1CQUFXLENBQ1QsYUFBYSxXQUFXLENBQUMsSUFBSSxhQUFhLFdBQVcsQ0FBQyxPQUFPLFdBQVcsV0FBVyxDQUFDLE9BQU8sVUFBVSxDQUN0RyxDQUNGLENBQUM7WUFDRiwyREFBMkQ7WUFDM0QsZ0NBQWdDO1lBQ2hDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3hDLElBQUksV0FBVyxLQUFLLElBQUk7b0JBQUUsT0FBTyxDQUFDLHVCQUF1QjtnQkFDekQsTUFBTSxJQUFJLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQixJQUNFLENBQUMsV0FBVyxDQUFDLFlBQVk7b0JBQ3ZCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzVELENBQUMsV0FBVyxDQUFDLGVBQWU7d0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsRUFDL0Q7aUJBQ0Q7O29CQUFNLE9BQU87Z0JBQ2QsTUFBTSxpQkFBaUIsR0FBRyxHQUFHLFFBQVEsQ0FBQyxPQUFPLElBQUksV0FBVyxFQUFFLENBQUM7Z0JBQy9ELE1BQU0scUJBQXFCLEdBQUcsR0FBRyxRQUFRLENBQUMsT0FBTyxJQUFJLElBQUksRUFBRSxDQUFDO2dCQUM1RCxNQUFNLGVBQWUsR0FBRyxHQUFHLGlCQUFpQixlQUFlLENBQUM7Z0JBQzVELElBQUksaUJBQWlCLEdBQUcsZUFBZSxDQUFDO2dCQUN4QyxNQUFNLFdBQVcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDekMsTUFBTSxXQUFXLEdBQUcsV0FBVyxDQUFDLE1BQU0sS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDO2dCQUNyRSxJQUFJLFdBQVcsRUFBRTtvQkFDZix1QkFBYyxDQUFDLEdBQUcsZUFBZSxJQUFJLFdBQVcsRUFBRSxDQUFDLENBQUM7b0JBQ3BELGlCQUFpQixHQUFHLEdBQUcsaUJBQWlCLElBQUksV0FBVyxFQUFFLENBQUM7aUJBQzNEO2dCQUNELE1BQU0sVUFBVSxHQUNkLFdBQVcsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDN0QsTUFBTSwwQkFBMEIsR0FBRyxjQUFLLENBQUMsUUFBUSxDQUMvQyxpQkFBaUIsRUFDakIscUJBQXFCLENBQ3RCLENBQUM7Z0JBQ0YsdUJBQWEsQ0FBQyxRQUFRLENBQ3BCLE1BQU0saUJBQWlCLGNBQWMsVUFBVSxhQUFhLDBCQUEwQixJQUFJLFVBQVUsRUFBRSxDQUN2RyxDQUFDO2dCQUNGLE9BQU87Z0JBQ1AsT0FBTyxDQUFDLEdBQUcsQ0FDVCxtQkFBVyxDQUNULDhCQUE4QixJQUFJLENBQUMsSUFBSSxZQUFZLElBQUksQ0FBQyxPQUFPLFdBQVcsSUFBSSxDQUFDLE9BQU8sVUFBVSxDQUNqRyxDQUNGLENBQUM7WUFDSixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsV0FBVztRQUNYLE9BQU8sRUFBRSxDQUFDO0lBQ1osQ0FBQyxDQUFBLENBQUMsQ0FBQztBQUNMLENBQUM7QUFsRUQsK0JBa0VDIn0=