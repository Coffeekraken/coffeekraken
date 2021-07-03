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
        const results = {};
        sugarJsonPaths.forEach((path) => {
            const jsonStr = __fs.readFileSync(path, 'utf8').toString();
            const json = JSON.parse(jsonStr);
            // read the file
            const packageJson = JSON.parse(__fs.readFileSync(path.replace('sugar.json', 'package.json')).toString());
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
            const packageJsonPath = path.replace(/sugar\.json$/, 'package.json');
            if (__fs.existsSync(packageJsonPath))
                return true;
            return false;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FySnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBRzlCLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBbUQ3RSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzlDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksaUJBQWlCO1FBQ25CLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBa0M7UUFDNUMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUUsR0FBRztnQkFDWixPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLElBQUk7b0JBQ2IsR0FBRyxFQUFFLElBQUk7b0JBQ1QsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxPQUFPLEdBQUcsS0FBSyxDQUFDLE9BQU8saUJBQzVD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