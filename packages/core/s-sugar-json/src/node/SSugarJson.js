import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __tmpDir from 'temp-dir';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __childProcess from 'child_process';
import __glob from 'glob-all';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
export default class SSugarJson extends __SClass {
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
        super(__deepMerge({
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
        this.sugarJsonSettings.cacheId = __md5.encrypt(Object.assign({ context: __packageRoot() }, this._settings));
        __onProcessExit(() => {
            try {
                __fs.unlinkSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`);
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
            __fs.existsSync(`${__tmpDir}/sugarJsonPaths.${finalSettings.cacheId}.json`)) {
            const cachedValue = require(`${__tmpDir}/sugarJsonPaths.${finalSettings.cacheId}.json`);
            if (cachedValue) {
                // @ts-ignore
                sugarJsonPaths = cachedValue;
            }
        }
        if (finalSettings.cache && !__isChildProcess()) {
            if (!__fs.existsSync(`${__tmpDir}/sugarJsonPaths.${finalSettings.cacheId}.lock`)) {
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
        const globalNodeModulesPath = __childProcess
            .execSync(`npm root -g`)
            .toString()
            .trim();
        const packagesArray = finalSettings.packages.split(',');
        // get local node modules directory path
        const localNodeModulesPath = `${__packageRoot()}/node_modules`;
        // get local node modules directory path
        const topLocalNodeModulesPath = `${__packageRoot(process.cwd(), true)}/node_modules`;
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
            globs.push(`${__packageRoot(process.cwd())}/sugar.json`);
        }
        if (localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.include.package &&
            finalSettings.include.top) {
            globs.push(`${__packageRoot(process.cwd(), true)}/sugar.json`);
        }
        // search for "sugar.json" files
        const files = __glob.sync(globs, {}).filter((path) => {
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
        if (__fs.existsSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`))
            return [];
        __fs.writeFileSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`, '');
        // console.log(
        //   'WRITE',
        //   `${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`
        // );
        if (!filesPaths) {
            filesPaths = this.search();
        }
        __fs.writeFileSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.json`, JSON.stringify(filesPaths, null, 4));
        __fs.unlinkSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`);
        return filesPaths;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FySnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBQzlCLE9BQU8sZ0JBQWdCLE1BQU0sMENBQTBDLENBQUM7QUFFeEUsT0FBTyxlQUFlLE1BQU0sZ0RBQWdELENBQUM7QUFtRDdFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLFFBQVE7SUFDOUM7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxpQkFBaUI7UUFDbkIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFNBQVMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFrQztRQUM1QyxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsU0FBUyxFQUFFO2dCQUNULFFBQVEsRUFBRSxHQUFHO2dCQUNiLE9BQU8sRUFBRTtvQkFDUCxPQUFPLEVBQUUsSUFBSTtvQkFDYixPQUFPLEVBQUUsSUFBSTtvQkFDYixHQUFHLEVBQUUsSUFBSTtvQkFDVCxNQUFNLEVBQUUsSUFBSTtpQkFDYjtnQkFDRCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBRUYsSUFBSSxDQUFDLGlCQUFpQixDQUFDLE9BQU8sR0FBRyxLQUFLLENBQUMsT0FBTyxpQkFD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