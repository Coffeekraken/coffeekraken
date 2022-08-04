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
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __childProcess from 'child_process';
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
            __SBench.start('SSugarJson.read');
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
            __SBench.end('SSugarJson.read');
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
            return this.sanitizeJson(__readJsonSync(`${__packageRoot()}/sugar.json`));
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
            __SBench.start('SSugarJson.search');
            // get global node modules directory path
            const globalNodeModulesPath = __childProcess
                .execSync(`npm root -g`)
                .toString()
                .trim();
            const packagesArray = typeof finalSettings.packages === 'string'
                ? finalSettings.packages.split(',')
                : [];
            // get local node modules directory path
            const localNodeModulesPath = `${__packageRoot(__dirname())}/node_modules`;
            // get local node modules directory path
            const topLocalNodeModulesPath = `${__packageRoot(__dirname(), {
                // highest: true,
                upCount: 2,
            })}/node_modules`;
            // build globs
            const globs = [];
            // local first
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
            // top local
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
            // then global
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
            if (finalSettings.includePackage) {
                globs.push(`${__packageRoot(process.cwd())}/sugar.json`);
            }
            if (localNodeModulesPath !== topLocalNodeModulesPath &&
                finalSettings.includePackage &&
                finalSettings.includeTop) {
                globs.push(`${__packageRoot(process.cwd(), {
                    highest: true,
                })}/sugar.json`);
            }
            // search for "sugar.json" files
            const files = __glob.sync(globs, {}).filter((path) => {
                const packageJsonPath = path.replace(/sugar\.json$/, 'package.json');
                if (__fs.existsSync(packageJsonPath))
                    return true;
                return false;
            });
            __SBench.end('SSugarJson.search');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sU0FBUyxNQUFNLHFDQUFxQyxDQUFDO0FBQzVELE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBQ3RFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sY0FBYyxNQUFNLGVBQWUsQ0FBQztBQUMzQyxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBMkM5QixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzVDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBOEI7UUFDdEMsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGNBQWMsRUFBRSxJQUFJO1lBQ3BCLGFBQWEsRUFBRSxJQUFJO1lBQ25CLFVBQVUsRUFBRSxJQUFJO1NBQ25CLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLENBQUMsU0FBYztRQUN2QixrQkFBa0I7UUFDbEIsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFNBQVMsQ0FBQyxDQUFDO1FBRXpDLFVBQVU7UUFDVixJQUFJLENBQUMsU0FBUyxDQUFDLE9BQU87WUFBRSxTQUFTLENBQUMsT0FBTyxHQUFHLEVBQUUsQ0FBQzthQUMxQyxJQUFJLENBQUMsS0FBSyxDQUFD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