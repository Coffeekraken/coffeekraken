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
import __SBench from '@coffeekraken/s-bench';
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
        //     //   `node ${__dirname()}/updateCache/updateCache.cli.js`,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1N1Z2FySnNvbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNTdWdhckpzb24udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sUUFBUSxNQUFNLFVBQVUsQ0FBQztBQUNoQyxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUV6RCxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLGNBQWMsTUFBTSxlQUFlLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0sVUFBVSxDQUFDO0FBRzlCLE9BQU8sZUFBZSxNQUFNLGdEQUFnRCxDQUFDO0FBRTdFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBbUQ3QyxNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBQzlDOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksaUJBQWlCO1FBQ25CLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDekMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBa0M7UUFDNUMsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLFNBQVMsRUFBRTtnQkFDVCxPQUFPLEVBQUUsS0FBSztnQkFDZCxPQUFPLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLElBQUk7b0JBQ2IsT0FBTyxFQUFFLElBQUk7b0JBQ2IsR0FBRyxFQUFFLElBQUk7b0JBQ1QsTUFBTSxFQUFFLElBQUk7aUJBQ2I7Z0JBQ0QsS0FBSyxFQUFFLElBQUk7YUFDWjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsQ0FB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