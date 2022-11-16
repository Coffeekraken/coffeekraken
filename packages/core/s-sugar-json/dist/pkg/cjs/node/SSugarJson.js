"use strict";
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
const s_bench_1 = __importDefault(require("@coffeekraken/s-bench"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const array_1 = require("@coffeekraken/sugar/array");
const fs_1 = require("@coffeekraken/sugar/fs");
const globalNodeModulesPath_1 = __importDefault(require("@coffeekraken/sugar/node/npm/globalNodeModulesPath"));
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const glob_all_1 = __importDefault(require("glob-all"));
class SSugarJson extends s_class_1.default {
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({
            includePackage: true,
            includeModules: true,
            includeGlobal: true,
            includeTop: true,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name              sanitizeJson
     * @type              Function
     *
     * This method ensure that the passed sugar.json data is correct
     *
     * @param         {JSON}      sugarJson       The sugar.json data to sanitize
     * @return         {JSON}                     The sanitized sugar.json dara
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    sanitizeJson(sugarJson) {
        // break reference
        sugarJson = Object.assign({}, sugarJson);
        // extends
        if (!sugarJson.extends)
            sugarJson.extends = [];
        else if (!Array.isArray(sugarJson.extends))
            sugarJson.extends = [sugarJson.extends];
        return sugarJson;
    }
    /**
     * @name              read
     * @type              Function
     * @async
     *
     * Read the available sugar.json files from this context
     *
     *
     * @since             2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const bench = new s_bench_1.default('SSugarJson.read', {
                bubbles: false,
            });
            // const SSugarJsonSettingsInterface = await import('./interface/SSugarJsonSettingsInterface');
            const finalSettings = Object.assign(Object.assign({}, this.settings), settings);
            let sugarJsonPaths = [];
            if (!sugarJsonPaths.length) {
                sugarJsonPaths = yield this.search(finalSettings);
            }
            const results = {};
            sugarJsonPaths.forEach((path) => {
                const jsonStr = fs_2.default.readFileSync(path, 'utf8').toString();
                const json = JSON.parse(jsonStr);
                // read the file
                const packageJson = JSON.parse(fs_2.default
                    .readFileSync(path.replace('sugar.json', 'package.json'))
                    .toString());
                const resultJson = this.sanitizeJson(Object.assign({ metas: {
                        path,
                        folderPath: path.split('/').slice(0, -1).join('/'),
                    } }, json));
                results[packageJson.name] = resultJson;
            });
            bench.end();
            return results;
        });
    }
    /**
     * @name      current
     * @type      Function
     *
     * This method allows you to get the current package sugar.json content
     *
     * @return      {ISSugarJsonFile}         The sugar.json file content for the current package
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    current() {
        try {
            return this.sanitizeJson((0, fs_1.__readJsonSync)(`${(0, path_1.__packageRootDir)()}/sugar.json`));
        }
        catch (e) {
            return {};
        }
    }
    /**
     * @name      search
     * @type      Function
     * @async
     *
     * This method make the actual research of the files on the filesystem
     * and return the founded files pathes
     *
     * @param             {ISSugarJsonSettings}        [settings={}]           Override some settings if needed
     * @return            {String[]}                      An array of founded filed pathes
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    search(settings) {
        return __awaiter(this, void 0, void 0, function* () {
            const finalSettings = Object.assign(Object.assign({}, this.settings), (settings !== null && settings !== void 0 ? settings : {}));
            const bench = new s_bench_1.default('SSugarJson.search', {
                bubbles: false,
            });
            // get global node modules directory path
            const globalNodeModulesPath = (0, globalNodeModulesPath_1.default)();
            const packagesArray = typeof finalSettings.packages === 'string'
                ? finalSettings.packages.split(',')
                : [];
            // get local node modules directory path
            const localNodeModulesPath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/node_modules`;
            // get local node modules directory path
            const topLocalNodeModulesPath = `${(0, path_1.__packageRootDir)((0, fs_1.__dirname)(), {
                // highest: true,
                upCount: 2,
            })}/node_modules`;
            // build globs
            let globs = [
                `${localNodeModulesPath.replace(/node_modules$/, 'sugar.json')}`,
                `${topLocalNodeModulesPath.replace(/node_modules$/, 'sugar.json')}`,
            ];
            // global first
            if (globalNodeModulesPath &&
                finalSettings.includeModules &&
                finalSettings.includeGlobal) {
                // coffeekraken modules are always loaded
                globs.push(`${globalNodeModulesPath}/@coffeekraken/*/sugar.json`);
                if (finalSettings.packages === '*') {
                    globs.push(`${globalNodeModulesPath}/*/sugar.json`);
                    globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
                }
                else {
                    packagesArray.forEach((name) => {
                        globs.push(`${globalNodeModulesPath}/${name}/sugar.json`);
                    });
                }
            }
            // top local (monorepo)
            if (localNodeModulesPath !== topLocalNodeModulesPath &&
                finalSettings.includeModules &&
                finalSettings.includeTop) {
                // coffeekraken modules are always loaded
                globs.push(`${topLocalNodeModulesPath}/@coffeekraken/*/sugar.json`);
                if (finalSettings.packages === '*') {
                    globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
                    globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
                }
                else {
                    packagesArray.forEach((name) => {
                        globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
                    });
                }
            }
            // if (
            //     localNodeModulesPath !== topLocalNodeModulesPath &&
            //     finalSettings.includePackage &&
            //     finalSettings.includeTop
            // ) {
            //     globs.push(
            //         `${__packageRootDir(process.cwd(), {
            //             highest: true,
            //         })}/sugar.json`,
            //     );
            // }
            // this package sugar json
            globs.push(`${(0, path_1.__packageRootDir)((0, fs_1.__dirname)())}/sugar.json`);
            // local
            if (localNodeModulesPath && finalSettings.includeModules) {
                // coffeekraken modules are always loaded
                globs.push(`${localNodeModulesPath}/@coffeekraken/*/sugar.json`);
                if (finalSettings.packages === '*') {
                    globs.push(`${localNodeModulesPath}/*/sugar.json`);
                    globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
                }
                else if (finalSettings.packages !== false) {
                    packagesArray.forEach((name) => {
                        globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
                    });
                }
            }
            if (finalSettings.includePackage) {
                globs.push(`${(0, path_1.__packageRootDir)(process.cwd())}/sugar.json`);
            }
            // make sure we don't have duplicated
            globs = (0, array_1.__unique)(globs);
            // search for "sugar.json" files
            const files = glob_all_1.default.sync(globs, {}).filter((path) => {
                const packageJsonPath = path.replace(/sugar\.json$/, 'package.json');
                if (fs_2.default.existsSync(packageJsonPath))
                    return true;
                return false;
            });
            bench.end();
            const finalFiles = (0, array_1.__unique)(files
                .map((f) => fs_2.default.realpathSync(f))
                .filter((f) => {
                if (f.toLowerCase().split('__wip__').length > 1 ||
                    f.toLowerCase().split('__tests__').length > 1) {
                    return false;
                }
                return true;
            }));
            return finalFiles;
        });
    }
}
exports.default = SSugarJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxxREFBcUQ7QUFDckQsK0NBQW1FO0FBQ25FLCtHQUF5RjtBQUN6Rix1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELDRDQUFzQjtBQUN0Qix3REFBOEI7QUEyQzlCLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQUM1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQThCO1FBQ3RDLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtZQUNuQixVQUFVLEVBQUUsSUFBSTtTQUNuQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBWSxDQUFDLFNBQWM7UUFDdkIsa0JBQWtCO1FBQ2xCLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV6QyxVQUFVO1FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1lBQUUsU0FBUyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csSUFBSSxDQUNOLFFBQXVDOztZQUV2QyxNQUFNLEtBQUssR0FBRyxJQUFJLGlCQUFRLENBQUMsaUJBQWlCLEVBQUU7Z0JBQzFDLE9BQU8sRUFBRSxLQUFLO2FBQ2pCLENBQUMsQ0FBQztZQUVILCtGQUErRjtZQUMvRixNQUFNLGFBQWEsR0FBRyxnQ0FFZixJQUFJLENBQUMsUUFBUSxHQUNiLFFBQVEsQ0FDZCxDQUFDO1lBRUYsSUFBSSxjQUFjLEdBQWEsRUFBRSxDQUFDO1lBRWxDLElBQUksQ0FBQyxjQUFjLENBQUMsTUFBTSxFQUFFO2dCQUN4QixjQUFjLEdBQUcsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2FBQ3JEO1lBRUQsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO1lBQ25CLGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDNUIsTUFBTSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQzNELE1BQU0sSUFBSSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBRWpDLGdCQUFnQjtnQkFDaEIsTUFBTSxXQUFXLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FDMUIsWUFBSTtxQkFDQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsY0FBYyxDQUFDLENBQUM7cUJBQ3hELFFBQVEsRUFBRSxDQUNsQixDQUFDO2dCQUVGLE1BQU0sVUFBVSxHQUFHLElBQUksQ0FBQyxZQUFZLGlCQUNoQyxLQUFLLEVBQUU7d0JBQ0gsSUFBSTt3QkFDSixVQUFVLEVBQUUsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQztxQkFDckQsSUFDRSxJQUFJLEVBQ1QsQ0FBQztnQkFFSCxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxHQUFHLFVBQVUsQ0FBQztZQUMzQyxDQUFDLENBQUMsQ0FBQztZQUVILEtBQUssQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUVaLE9BQU8sT0FBTyxDQUFDO1FBQ25CLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7O09BVUc7SUFDSCxPQUFPO1FBQ0gsSUFBSTtZQUNBLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FDcEIsSUFBQSxtQkFBYyxFQUFDLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxhQUFhLENBQUMsQ0FDckQsQ0FBQztTQUNMO1FBQUMsT0FBTyxDQUFDLEVBQUU7WUFDUixPQUFPLEVBQUUsQ0FBQztTQUNiO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDRyxNQUFNLENBQUMsUUFBOEI7O1lBQ3ZDLE1BQU0sYUFBYSxHQUFHLGdDQUNmLElBQUksQ0FBQyxRQUFRLEdBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztZQUVGLE1BQU0sS0FBSyxHQUFHLElBQUksaUJBQVEsQ0FBQyxtQkFBbUIsRUFBRTtnQkFDNUMsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQyxDQUFDO1lBRUgseUNBQXlDO1lBQ3pDLE1BQU0scUJBQXFCLEdBQUcsSUFBQSwrQkFBdUIsR0FBRSxDQUFDO1lBRXhELE1BQU0sYUFBYSxHQUNmLE9BQU8sYUFBYSxDQUFDLFFBQVEsS0FBSyxRQUFRO2dCQUN0QyxDQUFDLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNuQyxDQUFDLENBQUMsRUFBRSxDQUFDO1lBRWIsd0NBQXdDO1lBQ3hDLE1BQU0sb0JBQW9CLEdBQUcsR0FBRyxJQUFBLHVCQUFnQixFQUM1QyxJQUFBLGNBQVMsR0FBRSxDQUNkLGVBQWUsQ0FBQztZQUVqQix3Q0FBd0M7WUFDeEMsTUFBTSx1QkFBdUIsR0FBRyxHQUFHLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsRUFBRTtnQkFDN0QsaUJBQWlCO2dCQUNqQixPQUFPLEVBQUUsQ0FBQzthQUNiLENBQUMsZUFBZSxDQUFDO1lBRWxCLGNBQWM7WUFDZCxJQUFJLEtBQUssR0FBYTtnQkFDbEIsR0FBRyxvQkFBb0IsQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLFlBQVksQ0FBQyxFQUFFO2dCQUNoRSxHQUFHLHVCQUF1QixDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsWUFBWSxDQUFDLEVBQUU7YUFDdEUsQ0FBQztZQUVGLGVBQWU7WUFDZixJQUNJLHFCQUFxQjtnQkFDckIsYUFBYSxDQUFDLGNBQWM7Z0JBQzVCLGFBQWEsQ0FBQyxhQUFhLEVBQzdCO2dCQUNFLHlDQUF5QztnQkFDekMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHFCQUFxQiw2QkFBNkIsQ0FBQyxDQUFDO2dCQUVsRSxJQUFJLGFBQWEsQ0FBQyxRQUFRLEtBQUssR0FBRyxFQUFFO29CQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcscUJBQXFCLGVBQWUsQ0FBQyxDQUFDO29CQUNwRCxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcscUJBQXFCLGlCQUFpQixDQUFDLENBQUM7aUJBQ3pEO3FCQUFNO29CQUNILGFBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTt3QkFDM0IsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHFCQUFxQixJQUFJLElBQUksYUFBYSxDQUFDLENBQUM7b0JBQzlELENBQUMsQ0FBQyxDQUFDO2lCQUNOO2FBQ0o7WUFFRCx1QkFBdUI7WUFDdkIsSUFDSSxvQkFBb0IsS0FBSyx1QkFBdUI7Z0JBQ2hELGFBQWEsQ0FBQyxjQUFjO2dCQUM1QixhQUFhLENBQUMsVUFBVSxFQUMxQjtnQkFDRSx5Q0FBeUM7Z0JBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyx1QkFBdUIsNkJBQTZCLENBQUMsQ0FBQztnQkFFcEUsSUFBSSxhQUFhLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtvQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHVCQUF1QixlQUFlLENBQUMsQ0FBQztvQkFDdEQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLHVCQUF1QixpQkFBaUIsQ0FBQyxDQUFDO2lCQUMzRDtxQkFBTTtvQkFDSCxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyx1QkFBdUIsSUFBSSxJQUFJLGFBQWEsQ0FBQyxDQUFDO29CQUNoRSxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1lBQ0QsT0FBTztZQUNQLDBEQUEwRDtZQUMxRCxzQ0FBc0M7WUFDdEMsK0JBQStCO1lBQy9CLE1BQU07WUFDTixrQkFBa0I7WUFDbEIsK0NBQStDO1lBQy9DLDZCQUE2QjtZQUM3QiwyQkFBMkI7WUFDM0IsU0FBUztZQUNULElBQUk7WUFFSiwwQkFBMEI7WUFDMUIsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUEsdUJBQWdCLEVBQUMsSUFBQSxjQUFTLEdBQUUsQ0FBQyxhQUFhLENBQUMsQ0FBQztZQUUxRCxRQUFRO1lBQ1IsSUFBSSxvQkFBb0IsSUFBSSxhQUFhLENBQUMsY0FBYyxFQUFFO2dCQUN0RCx5Q0FBeUM7Z0JBQ3pDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsNkJBQTZCLENBQUMsQ0FBQztnQkFFakUsSUFBSSxhQUFhLENBQUMsUUFBUSxLQUFLLEdBQUcsRUFBRTtvQkFDaEMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFvQixlQUFlLENBQUMsQ0FBQztvQkFDbkQsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLG9CQUFvQixpQkFBaUIsQ0FBQyxDQUFDO2lCQUN4RDtxQkFBTSxJQUFJLGFBQWEsQ0FBQyxRQUFRLEtBQUssS0FBSyxFQUFFO29CQUN6QyxhQUFhLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7d0JBQzNCLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxvQkFBb0IsSUFBSSxJQUFJLGFBQWEsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsQ0FBQztpQkFDTjthQUNKO1lBQ0QsSUFBSSxhQUFhLENBQUMsY0FBYyxFQUFFO2dCQUM5QixLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLENBQUMsYUFBYSxDQUFDLENBQUM7YUFDL0Q7WUFFRCxxQ0FBcUM7WUFDckMsS0FBSyxHQUFHLElBQUEsZ0JBQVEsRUFBQyxLQUFLLENBQUMsQ0FBQztZQUV4QixnQ0FBZ0M7WUFDaEMsTUFBTSxLQUFLLEdBQUcsa0JBQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUNqRCxNQUFNLGVBQWUsR0FBRyxJQUFJLENBQUMsT0FBTyxDQUNoQyxjQUFjLEVBQ2QsY0FBYyxDQUNqQixDQUFDO2dCQUNGLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUM7b0JBQUUsT0FBTyxJQUFJLENBQUM7Z0JBQ2xELE9BQU8sS0FBSyxDQUFDO1lBQ2pCLENBQUMsQ0FBQyxDQUFDO1lBRUgsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBRVosTUFBTSxVQUFVLEdBQUcsSUFBQSxnQkFBUSxFQUN2QixLQUFLO2lCQUNBLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsWUFBSSxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsQ0FBQztpQkFDaEMsTUFBTSxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1YsSUFDSSxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO29CQUMzQyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQy9DO29CQUNFLE9BQU8sS0FBSyxDQUFDO2lCQUNoQjtnQkFDRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUMsQ0FDVCxDQUFDO1lBQ0YsT0FBTyxVQUFVLENBQUM7UUFDdEIsQ0FBQztLQUFBO0NBQ0o7QUF0UkQsNkJBc1JDIn0=