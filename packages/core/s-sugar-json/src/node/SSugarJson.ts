import __SClass from '@coffeekraken/s-class';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __glob from 'glob-all';
import __tmpDir from 'temp-dir';
import __unique from '@coffeekraken/sugar/shared/array/unique';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __sanitizeSugarJson from '@coffeekraken/sugar/shared/sugar/sanitizeSugarJson';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __childProcess from 'child_process';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __isChildProcess from '@coffeekraken/sugar/node/is/childProcess';
import __spawn from '@coffeekraken/sugar/node/process/spawn';
import __onProcessExit from '@coffeekraken/sugar/node/process/onProcessExit';
import __matchExcludeGlobs from '@coffeekraken/sugar/node/path/matchExcludeGlobs';
import __SBench from '@coffeekraken/s-bench';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';

export interface ISSugarJsonIncludeSettings {
    package: boolean;
    modules: boolean;
    global: boolean;
    top: boolean;
}

export interface ISSugarJsonSettings {
    modules: string | boolean;
    include: ISSugarJsonIncludeSettings;
    cache: boolean;
    cacheId: string;
}

export interface ISSugarJsonFileCliAction {
    description: string;
    process?: string;
    command?: string;
}

export interface ISSugarJsonCtorSettings {
    sugarJson: Partial<ISSugarJsonSettings>;
}

export interface ISSugarJsonFileCli {
    stack: string;
    description: string;
    interactive: Record<string, ISSugarJsonFileCliAction>;
    defaultAction: string;
    actions: Record<string, ISSugarJsonFileCliAction>;
}

export interface ISSugarJsonFileConfigFolder {
    scope: 'default' | 'module' | 'repo' | 'package' | 'user';
    path: string;
}

export interface ISSugarJsonFileConfig {
    folders?: ISSugarJsonFileConfigFolder[];
}

export interface ISSugarJsonFile {
    theme?: string;
    recipe?: string;
    cli?: ISSugarJsonFileCli;
    config?: ISSugarJsonFileConfig;
}

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
    get sugarJsonSettings(): ISSugarJsonSettings {
        return (<any>this)._settings.sugarJson;
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
    constructor(settings?: ISSugarJsonCtorSettings) {
        super(
            __deepMerge(
                {
                    sugarJson: {
                        modules: false,
                        include: {
                            package: true,
                            modules: true,
                            top: true,
                            global: true,
                        },
                        cache: true,
                    },
                },
                settings ?? {},
            ),
        );

        this.sugarJsonSettings.cacheId = __md5.encrypt({
            context: __packageRoot(),
            ...this._settings,
        });

        __onProcessExit(() => {
            try {
                __fs.unlinkSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`);
            } catch (e) {}
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
    sanitizeJson(sugarJson: any): any {
        // break reference
        sugarJson = Object.assign({}, sugarJson);

        // extends
        if (!sugarJson.extends) sugarJson.extends = [];
        else if (!Array.isArray(sugarJson.extends)) sugarJson.extends = [sugarJson.extends];

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
    read(settings?: Partial<ISSugarJsonSettings>): Record<string, ISSugarJsonFile> | ISSugarJsonFile {
        __SBench.start('SSugarJson.read');

        const finalSettings = <ISSugarJsonSettings>{
            ...this.sugarJsonSettings,
            ...settings,
        };

        let sugarJsonPaths: string[] = [];

        if (!sugarJsonPaths.length) {
            sugarJsonPaths = this.search(finalSettings);
        }

        const results = {};
        sugarJsonPaths.forEach((path) => {
            const jsonStr = __fs.readFileSync(path, 'utf8').toString();
            const json = JSON.parse(jsonStr);

            // read the file
            const packageJson = JSON.parse(__fs.readFileSync(path.replace('sugar.json', 'package.json')).toString());

            const resultJson = this.sanitizeJson({
                metas: {
                    path,
                    folderPath: path.split('/').slice(0, -1).join('/'),
                },
                ...json,
            });

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
    current(): ISSugarJsonFile {
        try {
            return this.sanitizeJson(__readJsonSync(`${__packageRoot()}/sugar.json`));
        } catch (e) {
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
    search(settings?: ISSugarJsonSettings): string[] {
        const finalSettings = <ISSugarJsonSettings>{
            ...this.sugarJsonSettings,
            ...(settings ?? {}),
        };

        __SBench.start('SSugarJson.search');

        // get global node modules directory path
        const globalNodeModulesPath = __childProcess.execSync(`npm root -g`).toString().trim();

        const packagesArray = typeof finalSettings.modules === 'string' ? finalSettings.modules.split(',') : [];

        // get local node modules directory path
        const localNodeModulesPath = `${__packageRoot()}/node_modules`;

        // get local node modules directory path
        const topLocalNodeModulesPath = `${__packageRoot(process.cwd(), true)}/node_modules`;

        // build globs
        const globs: string[] = [];

        // local first
        if (localNodeModulesPath && finalSettings.include.modules) {
            // coffeekraken modules are always loaded
            globs.push(`${localNodeModulesPath}/@coffeekraken/*/sugar.json`);

            if (finalSettings.modules === '*') {
                globs.push(`${localNodeModulesPath}/*/sugar.json`);
                globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
            } else if (finalSettings.modules !== false) {
                packagesArray.forEach((name) => {
                    globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }

        // top local
        if (
            localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.include.modules &&
            finalSettings.include.top
        ) {
            // coffeekraken modules are always loaded
            globs.push(`${topLocalNodeModulesPath}/@coffeekraken/*/sugar.json`);

            if (finalSettings.modules === '*') {
                globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
                globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
            } else {
                packagesArray.forEach((name) => {
                    globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }
        // then global
        if (globalNodeModulesPath && finalSettings.include.modules && finalSettings.include.global) {
            // coffeekraken modules are always loaded
            globs.push(`${globalNodeModulesPath}/@coffeekraken/*/sugar.json`);

            if (finalSettings.modules === '*') {
                globs.push(`${globalNodeModulesPath}/*/sugar.json`);
                globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
            } else {
                packagesArray.forEach((name) => {
                    globs.push(`${globalNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }

        if (finalSettings.include.package) {
            globs.push(`${__packageRoot(process.cwd())}/sugar.json`);
        }
        if (
            localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.include.package &&
            finalSettings.include.top
        ) {
            globs.push(`${__packageRoot(process.cwd(), true)}/sugar.json`);
        }

        // search for "sugar.json" files
        const files = __glob.sync(globs, {}).filter((path) => {
            const packageJsonPath = path.replace(/sugar\.json$/, 'package.json');
            if (__fs.existsSync(packageJsonPath)) return true;
            return false;
        });

        __SBench.end('SSugarJson.search');

        return __unique(
            files
                .map((f) => __fs.realpathSync(f))
                .filter((f) => {
                    if (f.toLowerCase().split('__wip__').length > 1 || f.toLowerCase().split('__tests__').length > 1) {
                        return false;
                    }
                    return true;
                }),
        );
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
    updateCache(filesPaths?: string[]): string[] {
        if (__fs.existsSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`)) return [];

        __fs.writeFileSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`, '');

        // console.log(
        //   'WRITE',
        //   `${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`
        // );

        if (!filesPaths) {
            filesPaths = this.search();
        }
        __fs.writeFileSync(
            `${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.json`,
            JSON.stringify(filesPaths, null, 4),
        );

        __fs.unlinkSync(`${__tmpDir}/sugarJsonPaths.${this.sugarJsonSettings.cacheId}.lock`);

        return filesPaths;
    }
}
