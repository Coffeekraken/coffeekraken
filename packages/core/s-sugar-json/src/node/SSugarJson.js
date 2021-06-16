import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __tmpDir from 'temp-dir';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __childProcess from 'child_process';
import __glob from 'glob-all';
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
                modules: '*',
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
        // if (
        //   finalSettings.cache &&
        //   __fs.existsSync(
        //     `${__tmpDir}/sugarJsonPaths.${finalSettings.cacheId}.json`
        //   )
        // ) {
        //   const cachedValue = require(`${__tmpDir}/sugarJsonPaths.${finalSettings.cacheId}.json`);
        //   if (cachedValue) {
        //     // @ts-ignore
        //     sugarJsonPaths = cachedValue;
        //   }
        // }
        // if (finalSettings.cache && !__isChildProcess()) {
        //   if (
        //     !__fs.existsSync(
        //       `${__tmpDir}/sugarJsonPaths.${finalSettings.cacheId}.lock`
        //     )
        //   ) {
        //     // const sp = __childProcess.spawn(
        //     //   `node ${__dirname}/updateCache/updateCache.cli.js`,
        //     //   [],
        //     //   {
        //     //     shell: true,
        //     //     cwd: __packageRoot()
        //     //   }
        //     // );
        //   }
        // }
        if (!sugarJsonPaths.length) {
            sugarJsonPaths = this.search(finalSettings);
        }
        let results = {};
        sugarJsonPaths.forEach((path) => {
            // read the file
            const json = require(path);
            const packageJson = require(`${path.replace('sugar.json', 'package.json')}`);
            const resultJson = this.sanitizeJson(Object.assign({ metas: {
                    path,
                    folderPath: path.split('/').slice(0, -1).join('/')
                } }, json));
            results[packageJson.name] = resultJson;
        });
        return results;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    current() {
        try {
            return this.sanitizeJson(require(`${__packageRoot()}/sugar.json`));
        }
        catch (e) {
            return {};
        }
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
        const packagesArray = finalSettings.modules.split(',');
        // get local node modules directory path
        const localNodeModulesPath = `${__packageRoot()}/node_modules`;
        // get local node modules directory path
        const topLocalNodeModulesPath = `${__packageRoot(process.cwd(), true)}/node_modules`;
        // build globs
        const globs = [];
        // local first
        if (localNodeModulesPath && finalSettings.include.modules) {
            if (finalSettings.modules === '*') {
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
            if (finalSettings.modules === '*') {
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
            if (finalSettings.modules === '*') {
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
        return __unique(files.map(f => __fs.realpathSync(f)).filter(f => {
            if (f.toLowerCase().split('__wip__').length > 1 || f.toLowerCase().split('__tests__').length > 1) {
                return false;
            }
            return true;
        }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FySnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBRzlCLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBcUQ3RSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzlDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksaUJBQWlCO1FBQ25CLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBa0M7UUFDNUMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLElBQUk7b0JBQ2IsR0FBRyxFQUFFLElBQUk7b0JBQ1QsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8saUJBQzVD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