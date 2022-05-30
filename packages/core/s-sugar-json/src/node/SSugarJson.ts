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
import type { ISFrontstackAction } from '@coffeekraken/s-frontstack';
import __SFrontstack from '@coffeekraken/s-frontstack';

export interface ISSugarJsonSettings {
    packages: string | boolean;
    includePackage: boolean;
    includeModules: boolean;
    includeGlobal: boolean;
    includeTop: boolean;
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
    // interactive: Record<string, ISSugarJsonFileCliAction>;
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
    variant?: string;
    recipe?: string;
    cli?: ISSugarJsonFileCli;
    config?: ISSugarJsonFileConfig;
    frontstack?: Record<string, ISFrontstackAction>;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get sugarJsonSettings(): ISSugarJsonSettings {
        return (<any>this).settings.sugarJson;
    }

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
    constructor(settings?: ISSugarJsonCtorSettings) {
        super(
            __deepMerge(
                {
                    sugarJson: {
                        includePackage: true,
                        includeModules: true,
                        includeGlobal: true,
                        includeTop: true,
                    },
                },
                settings ?? {},
            ),
        );
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
    sanitizeJson(sugarJson: any): any {
        // break reference
        sugarJson = Object.assign({}, sugarJson);

        // extends
        if (!sugarJson.extends) sugarJson.extends = [];
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
    async read(
        settings?: Partial<ISSugarJsonSettings>,
    ): Record<string, ISSugarJsonFile> | ISSugarJsonFile {
        __SBench.start('SSugarJson.read');

        // const SSugarJsonSettingsInterface = await import('./interface/SSugarJsonSettingsInterface');
        const finalSettings = <ISSugarJsonSettings>{
            // ...SSugarJsonSettingsInterface.default.defaults(),
            ...this.sugarJsonSettings,
            ...settings,
        };

        let sugarJsonPaths: string[] = [];

        if (!sugarJsonPaths.length) {
            sugarJsonPaths = await this.search(finalSettings);
        }

        const results = {};
        sugarJsonPaths.forEach((path) => {
            const jsonStr = __fs.readFileSync(path, 'utf8').toString();
            const json = JSON.parse(jsonStr);

            // read the file
            const packageJson = JSON.parse(
                __fs
                    .readFileSync(path.replace('sugar.json', 'package.json'))
                    .toString(),
            );

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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    current(): ISSugarJsonFile {
        try {
            return this.sanitizeJson(
                __readJsonSync(`${__packageRoot()}/sugar.json`),
            );
        } catch (e) {
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
    async search(settings?: ISSugarJsonSettings): string[] {
        const finalSettings = <ISSugarJsonSettings>{
            ...this.sugarJsonSettings,
            ...(settings ?? {}),
        };

        __SBench.start('SSugarJson.search');

        // get global node modules directory path
        const globalNodeModulesPath = __childProcess
            .execSync(`npm root -g`)
            .toString()
            .trim();

        const packagesArray =
            typeof finalSettings.packages === 'string'
                ? finalSettings.packages.split(',')
                : [];

        // get local node modules directory path
        const localNodeModulesPath = `${__packageRoot()}/node_modules`;

        // get local node modules directory path
        const topLocalNodeModulesPath = `${__packageRoot(process.cwd(), {
            highest: true,
        })}/node_modules`;

        // build globs
        const globs: string[] = [];

        // local first
        if (localNodeModulesPath && finalSettings.includeModules) {
            // coffeekraken modules are always loaded
            globs.push(`${localNodeModulesPath}/@coffeekraken/*/sugar.json`);

            if (finalSettings.packages === '*') {
                globs.push(`${localNodeModulesPath}/*/sugar.json`);
                globs.push(`${localNodeModulesPath}/*/*/sugar.json`);
            } else if (finalSettings.packages !== false) {
                packagesArray.forEach((name) => {
                    globs.push(`${localNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }

        // top local
        if (
            localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.includeModules &&
            finalSettings.includeTop
        ) {
            // coffeekraken modules are always loaded
            globs.push(`${topLocalNodeModulesPath}/@coffeekraken/*/sugar.json`);

            if (finalSettings.packages === '*') {
                globs.push(`${topLocalNodeModulesPath}/*/sugar.json`);
                globs.push(`${topLocalNodeModulesPath}/*/*/sugar.json`);
            } else {
                packagesArray.forEach((name) => {
                    globs.push(`${topLocalNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }
        // then global
        if (
            globalNodeModulesPath &&
            finalSettings.includeModules &&
            finalSettings.includeGlobal
        ) {
            // coffeekraken modules are always loaded
            globs.push(`${globalNodeModulesPath}/@coffeekraken/*/sugar.json`);

            if (finalSettings.packages === '*') {
                globs.push(`${globalNodeModulesPath}/*/sugar.json`);
                globs.push(`${globalNodeModulesPath}/*/*/sugar.json`);
            } else {
                packagesArray.forEach((name) => {
                    globs.push(`${globalNodeModulesPath}/${name}/sugar.json`);
                });
            }
        }

        if (finalSettings.includePackage) {
            globs.push(`${__packageRoot(process.cwd())}/sugar.json`);
        }
        if (
            localNodeModulesPath !== topLocalNodeModulesPath &&
            finalSettings.includePackage &&
            finalSettings.includeTop
        ) {
            globs.push(
                `${__packageRoot(process.cwd(), {
                    highest: true,
                })}/sugar.json`,
            );
        }

        // search for "sugar.json" files
        const files = __glob.sync(globs, {}).filter((path) => {
            const packageJsonPath = path.replace(
                /sugar\.json$/,
                'package.json',
            );
            if (__fs.existsSync(packageJsonPath)) return true;
            return false;
        });

        __SBench.end('SSugarJson.search');

        const finalFiles = __unique(
            files
                .map((f) => __fs.realpathSync(f))
                .filter((f) => {
                    if (
                        f.toLowerCase().split('__wip__').length > 1 ||
                        f.toLowerCase().split('__tests__').length > 1
                    ) {
                        return false;
                    }
                    return true;
                }),
        );
        return finalFiles;
    }
}
