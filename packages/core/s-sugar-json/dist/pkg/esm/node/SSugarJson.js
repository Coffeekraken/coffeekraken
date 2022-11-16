var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SBench from '@coffeekraken/s-bench';
import __SClass from '@coffeekraken/s-class';
import { __unique } from '@coffeekraken/sugar/array';
import { __dirname, __readJsonSync } from '@coffeekraken/sugar/fs';
import __globalNodeModulesPath from '@coffeekraken/sugar/node/npm/globalNodeModulesPath';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __glob from 'glob-all';
export default class SSugarJson extends __SClass {
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
        super(__deepMerge({
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
            const bench = new __SBench('SSugarJson.read', {
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
                const jsonStr = __fs.readFileSync(path, 'utf8').toString();
                const json = JSON.parse(jsonStr);
                // read the file
                const packageJson = JSON.parse(__fs
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
            return this.sanitizeJson(__readJsonSync(`${__packageRootDir()}/sugar.json`));
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
            const bench = new __SBench('SSugarJson.search', {
                bubbles: false,
            });
            // get global node modules directory path
            const globalNodeModulesPath = __globalNodeModulesPath();
            const packagesArray = typeof finalSettings.packages === 'string'
                ? finalSettings.packages.split(',')
                : [];
            // get local node modules directory path
            const localNodeModulesPath = `${__packageRootDir(__dirname())}/node_modules`;
            // get local node modules directory path
            const topLocalNodeModulesPath = `${__packageRootDir(__dirname(), {
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
            globs.push(`${__packageRootDir(__dirname())}/sugar.json`);
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
                globs.push(`${__packageRootDir(process.cwd())}/sugar.json`);
            }
            // make sure we don't have duplicated
            globs = __unique(globs);
            // search for "sugar.json" files
            const files = __glob.sync(globs, {}).filter((path) => {
                const packageJsonPath = path.replace(/sugar\.json$/, 'package.json');
                if (__fs.existsSync(packageJsonPath))
                    return true;
                return false;
            });
            bench.end();
            const finalFiles = __unique(files
                .map((f) => __fs.realpathSync(f))
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLEVBQUUsU0FBUyxFQUFFLGNBQWMsRUFBRSxNQUFNLHdCQUF3QixDQUFDO0FBQ25FLE9BQU8sdUJBQXVCLE1BQU0sb0RBQW9ELENBQUM7QUFDekYsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sRUFBRSxnQkFBZ0IsRUFBRSxNQUFNLDBCQUEwQixDQUFDO0FBQzVELE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLE1BQU0sTUFBTSxVQUFVLENBQUM7QUEyQzlCLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLFFBQVE7SUFDNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUE4QjtRQUN0QyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksY0FBYyxFQUFFLElBQUk7WUFDcEIsY0FBYyxFQUFFLElBQUk7WUFDcEIsYUFBYSxFQUFFLElBQUk7WUFDbkIsVUFBVSxFQUFFLElBQUk7U0FDbkIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQVksQ0FBQyxTQUFjO1FBQ3ZCLGtCQUFrQjtRQUNsQixTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsU0FBUyxDQUFDLENBQUM7UUFFekMsVUFBVTtRQUNWLElBQUksQ0FBQyxTQUFTLENBQUMsT0FBTztZQUFFLFNBQVMsQ0FBQyxPQUFPLEdBQUcsRUFBRSxDQUFDO2FB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