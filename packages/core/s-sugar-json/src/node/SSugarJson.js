import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob-all';
import __tmpDir from 'temp-dir';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __childProcess from 'child_process';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __SBench from '@coffeekraken/s-bench';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
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
                modules: false,
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
        __SBench.start('SSugarJson.read');
        const finalSettings = Object.assign(Object.assign({}, this.sugarJsonSettings), settings);
        let sugarJsonPaths = [];
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
        __SBench.end('SSugarJson.read');
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
            return this.sanitizeJson(__readJsonSync(`${__packageRoot()}/sugar.json`));
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
        __SBench.start('SSugarJson.search');
        // get global node modules directory path
        const globalNodeModulesPath = __childProcess
            .execSync(`npm root -g`)
            .toString()
            .trim();
        const packagesArray = finalSettings.modules ? finalSettings.modules.split(',') : [];
        // get local node modules directory path
        const localNodeModulesPath = `${__packageRoot()}/node_modules`;
        // get local node modules directory path
        const topLocalNodeModulesPath = `${__packageRoot(process.cwd(), true)}/node_modules`;
        // build globs
        const globs = [];
        // local first
        if (localNodeModulesPath && finalSettings.include.modules) {
            // coffeekraken modules are always loaded
            globs.push(`${localNodeModulesPath}/@coffeekraken/*/sugar.json`);
            if (finalSettings.modules === '*') {
                globs.push(`${localNodeModulesPath}/*/sugar.json`);
                globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
            }
            else if (finalSettings.modules !== false) {
                packagesArray.forEach((name) => {
                    globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }
        // top local
        if (localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.include.modules &&
            finalSettings.include.top) {
            // coffeekraken modules are always loaded
            globs.push(`${topLocalNodeModulesPath}/@coffeekraken/*/sugar.json`);
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
            // coffeekraken modules are always loaded
            globs.push(`${globalNodeModulesPath}/@coffeekraken/*/sugar.json`);
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
        __SBench.end('SSugarJson.search');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FySnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLFVBQVUsQ0FBQztBQUM5QixPQUFPLFFBQVEsTUFBTSxVQUFVLENBQUM7QUFDaEMsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxLQUFLLE1BQU0sc0NBQXNDLENBQUM7QUFFekQsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxjQUFjLE1BQU0sZUFBZSxDQUFDO0FBSTNDLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBRTdFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sY0FBYyxNQUFNLDBDQUEwQyxDQUFDO0FBa0R0RSxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzlDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksaUJBQWlCO1FBQ25CLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBa0M7UUFDNUMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLElBQUk7b0JBQ2IsR0FBRyxFQUFFLElBQUk7b0JBQ1QsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENB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