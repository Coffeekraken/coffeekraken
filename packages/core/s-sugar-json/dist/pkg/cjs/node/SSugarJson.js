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
const npm_1 = require("@coffeekraken/sugar/npm");
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
            // const bench = new __SBench('SSugarJson.read', {
            //     bubbles: false,
            // });
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
            // bench.end();
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
            const globalNodeModulesPath = (0, npm_1.__globalNodeModulesPath)();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3QyxxREFBcUQ7QUFDckQsK0NBQW1FO0FBQ25FLGlEQUFrRTtBQUNsRSx1REFBeUQ7QUFDekQsbURBQTREO0FBQzVELDRDQUFzQjtBQUN0Qix3REFBOEI7QUEyQzlCLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQUM1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQThCO1FBQ3RDLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxjQUFjLEVBQUUsSUFBSTtZQUNwQixjQUFjLEVBQUUsSUFBSTtZQUNwQixhQUFhLEVBQUUsSUFBSTtZQUNuQixVQUFVLEVBQUUsSUFBSTtTQUNuQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBWSxDQUFDLFNBQWM7UUFDdkIsa0JBQWtCO1FBQ2xCLFNBQVMsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxTQUFTLENBQUMsQ0FBQztRQUV6QyxVQUFVO1FBQ1YsSUFBSSxDQUFDLFNBQVMsQ0FBQyxPQUFPO1lBQUUsU0FBUyxDQUFDLE9BQU8sR0FBRyxFQUFFLENBQUM7YUFDMUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQztZQUN0QyxTQUFTLENBQUMsT0FBTyxHQUFHLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRTVDLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csSUFBSSxDQUNOLFFBQXVDOztZQUV2QyxrREFBa0Q7WUFDbEQsc0JBQXNCO1lBQ3RCLE1BQU07WUFFTiwrRkFBK0Y7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