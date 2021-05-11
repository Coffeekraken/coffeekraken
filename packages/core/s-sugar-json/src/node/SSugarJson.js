"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const temp_dir_1 = __importDefault(require("temp-dir"));
const md5_1 = __importDefault(require("@coffeekraken/sugar/shared/crypt/md5"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const child_process_1 = __importDefault(require("child_process"));
const glob_all_1 = __importDefault(require("glob-all"));
const childProcess_1 = __importDefault(require("@coffeekraken/sugar/node/is/childProcess"));
const onProcessExit_1 = __importDefault(require("@coffeekraken/sugar/node/process/onProcessExit"));
class SSugarJson extends s_class_1.default {
    /**
     * @name            sugarJsonSettings
     * @type            ISSugarJsonSettings
     * @get
     *
     * Access the sugarJson settings
     *
     * @since           2.0.09
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get sugarJsonSettings() {
        return this._settings.sugarJson;
    }
    /**
     * @name            constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        super(deepMerge_1.default({
            sugarJson: {
                packages: '*',
                include: {
                    package: true,
                    modules: true,
                    top: true,
                    global: true
                },
                cache: true
            }
        }, settings !== null && settings !== void 0 ? settings : {}));
        this.sugarJsonSettings.cacheId = md5_1.default.encrypt(Object.assign({ context: packageRoot_1.default() }, this._settings));
        onProcessExit_1.default(() => {
            try {
                fs_1.default.unlinkSync(`${temp_dir_1.default}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`);
            }
            catch (e) { }
        });
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read(settings) {
        const finalSettings = Object.assign(Object.assign({}, this.sugarJsonSettings), settings);
        let sugarJsonPaths = [];
        if (finalSettings.cache &&
            fs_1.default.existsSync(`${temp_dir_1.default}/sugarJsonPaths.${finalSettings.cacheId}.json`)) {
            const cachedValue = require(`${temp_dir_1.default}/sugarJsonPaths.${finalSettings.cacheId}.json`);
            if (cachedValue) {
                // @ts-ignore
                sugarJsonPaths = cachedValue;
            }
        }
        if (finalSettings.cache && !childProcess_1.default()) {
            if (!fs_1.default.existsSync(`${temp_dir_1.default}/sugarJsonPaths.${finalSettings.cacheId}.lock`)) {
                // const sp = __childProcess.spawn(
                //   `node ${__dirname}/updateCache/updateCache.cli.js`,
                //   [],
                //   {
                //     shell: true,
                //     cwd: __packageRoot()
                //   }
                // );
            }
        }
        if (!sugarJsonPaths.length) {
            sugarJsonPaths = this.search(finalSettings);
        }
        const packagesArray = this.sugarJsonSettings.packages.split(',');
        let results = {};
        if (sugarJsonPaths.length === 1 &&
            packagesArray.length === 1 &&
            packagesArray[0] !== '*') {
            results = this.sanitizeJson(Object.assign({ metas: {
                    path: sugarJsonPaths[0],
                    folderPath: sugarJsonPaths[0].split('/').slice(0, -1).join('/')
                } }, require(sugarJsonPaths[0])));
        }
        else {
            sugarJsonPaths.forEach((path) => {
                // read the file
                const json = require(path);
                const packageJson = require(`${path.replace('sugar.json', 'package.json')}`);
                results[packageJson.name] = this.sanitizeJson(Object.assign({ metas: {
                        path,
                        folderPath: path.split('/').slice(0, -1).join('/')
                    } }, json));
            });
        }
        return results;
    }
    /**
     * @name      search
     * @type      Function
     *
     * This method make the actual research of the files on the filesystem
     * and return the founded files pathes
     *
     * @param             {ISSugarJsonSettings}        [settings={}]           Override some settings if needed
     * @return            {String[]}                      An array of founded filed pathes
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    search(settings) {
        const finalSettings = Object.assign(Object.assign({}, this.sugarJsonSettings), (settings !== null && settings !== void 0 ? settings : {}));
        // get global node modules directory path
        const globalNodeModulesPath = child_process_1.default
            .execSync(`npm root -g`)
            .toString()
            .trim();
        const packagesArray = finalSettings.packages.split(',');
        // get local node modules directory path
        const localNodeModulesPath = `${packageRoot_1.default()}/node_modules`;
        // get local node modules directory path
        const topLocalNodeModulesPath = `${packageRoot_1.default(process.cwd(), true)}/node_modules`;
        // build globs
        const globs = [];
        // local first
        if (localNodeModulesPath && finalSettings.include.modules) {
            if (finalSettings.packages === '*') {
                globs.push(`${localNodeModulesPath}/*/sugar.json`);
                globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
                // globs.push(`${__packageRoot()}/sugar.json`);
            }
            else {
                packagesArray.forEach((name) => {
                    globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }
        // top local
        if (localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.include.modules &&
            finalSettings.include.top) {
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
            finalSettings.include.modules &&
            finalSettings.include.global) {
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
        if (finalSettings.include.package) {
            globs.push(`${packageRoot_1.default(process.cwd())}/sugar.json`);
        }
        if (localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.include.package &&
            finalSettings.include.top) {
            globs.push(`${packageRoot_1.default(process.cwd(), true)}/sugar.json`);
        }
        // search for "sugar.json" files
        const files = glob_all_1.default.sync(globs, {}).filter((path) => {
            try {
                require(`${path.replace('sugar.json', 'package.json')}`);
                return true;
            }
            catch (e) {
                return false;
            }
        });
        if (finalSettings.cache) {
        }
        return files;
    }
    /**
     * @name          updateCache
     * @type          Function
     *
     * This method search for files and update the cache once finished
     *
     * @param         {String[]}        [filesPaths=[]]         An array of files paths to save in cache. If not passed, the system will search for files and update the cache with this result
     * @return        {String[]}          An array of found files just like the ```search``` method
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    updateCache(filesPaths) {
        if (fs_1.default.existsSync(`${temp_dir_1.default}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`))
            return [];
        fs_1.default.writeFileSync(`${temp_dir_1.default}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`, '');
        // console.log(
        //   'WRITE',
        //   `${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`
        // );
        if (!filesPaths) {
            filesPaths = this.search();
        }
        fs_1.default.writeFileSync(`${temp_dir_1.default}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.json`, JSON.stringify(filesPaths, null, 4));
        fs_1.default.unlinkSync(`${temp_dir_1.default}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`);
        return filesPaths;
    }
}
exports.default = SSugarJson;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FySnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBNkM7QUFDN0MsNEZBQXNFO0FBQ3RFLDRDQUFzQjtBQUN0Qix3REFBZ0M7QUFDaEMsK0VBQXlEO0FBRXpELDRGQUFzRTtBQUN0RSxrRUFBMkM7QUFDM0Msd0RBQThCO0FBQzlCLDRGQUF3RTtBQUV4RSxtR0FBNkU7QUFtRDdFLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQUM5Qzs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGlCQUFpQjtRQUNuQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsU0FBUyxDQUFDO0lBQ3pDLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQWtDO1FBQzVDLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxHQUFHO2dCQUNiLE9BQU8sRUFBRTtvQkFDUCxPQUFPLEVBQUUsSUFBSTtvQkFDYixPQUFPLEVBQUUsSUFBSTtvQkFDYixHQUFHLEVBQUUsSUFBSTtvQkFDVCxNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxhQUFLLENBQUMsT0FBTyxpQkFDNUMsT0FBTyxFQUFFLHFCQUFhLEVBQUUsSUFDckIsSUFBSSxDQUFDLFNBQVMsRUFDakIsQ0FBQztRQUVILHVCQUFlLENBQUMsR0FBRyxFQUFFO1lBQ25CLElBQUk7Z0JBQ0YsWUFBSSxDQUFDLFVBQVUsQ0FDYixHQUFHLGtCQUFRLG1CQUFtQixJQUFJLENBQUMsaUJBQWlCLENBQUMsT0FBTyxPQUFPLENBQ3BFLENBQUM7YUFDSDtZQUFDLE9BQU8sQ0FBQyxF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