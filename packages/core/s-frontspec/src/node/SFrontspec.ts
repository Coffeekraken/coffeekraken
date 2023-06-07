// @ts-nocheck

import __SClass from '@coffeekraken/s-class';
import __SEnv from '@coffeekraken/s-env';
import __SFile from '@coffeekraken/s-file';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __folderPath, __readJsonSync } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __deepMerge, __get } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import __path from 'path';
import __SFrontspecBuildParamsInterface from './interface/SFrontspecBuildParamsInterface';

import type { ISFrontspec } from '@coffeekraken/s-frontspec';

/**
 * @name                SFrontspec
 * @namespace           node
 * @type                Class
 * @extends             SClass
 * @platform            node
 * @status             beta
 *
 * This class represent the ```frontspec.json``` file and allows you to generate it.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your frontspec instance:
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __SFrontspec.get($1)
 *
 * @example             js
 * import __SFrontspec from '@coffeekraken/s-frontspec';
 * const frontspec = new __SFrontspec();
 * const result = await frontspec.read();
 * __SFrontspec.get('media')
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISFrontspecSourceConfigObj {
    config: String;
}

export interface ISFrontspecSourceObjectObj {
    value: any;
}

export interface ISFrontspecSourceObj {
    type: 'config' | 'object';
    process?: Function;
    [key: string]: ISFrontspecSourceConfigObj | ISFrontspecSourceObjectObj;
}

export interface ISFrontspecBuildParams {
    sources: Record<string, ISFrontspecSourceObj>;
}

export interface ISFrontspecAddParams {}

export interface ISFrontspecAssetToServe {}

export default class SFrontspec extends __SClass {
    static _cachesStack = {};
    static _defaultFrontspecInstance;

    _frontspec: ISFrontspec;

    /**
     * @name        get
     * @type        Function
     * @static
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static get(dotpath: string = '.'): any {
        if (!this._defaultFrontspecInstance) {
            this._defaultFrontspecInstance = new SFrontspec();
        }
        return this._defaultFrontspecInstance.get(dotpath);
    }

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings = {}) {
        super(
            __deepMerge(
                {
                    metas: {
                        id: 'SFrontspec',
                    },
                },
                settings,
            ),
        );
    }

    /**
     * @name        get
     * @type        Function
     *
     * Access a frontspec value by passing a dotpath like "partytown.enabled", or by accessing the full frontspec object by using `.get()` call.
     *
     * @param       {String}        [dotpah="."]            The dotpath of the frontspec value you want to access
     * @return      {Any}                                   The getted frontspec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    get(dotpath: string = '.'): any {
        this.read(); // make sure we have the content
        return __get(this._frontspec, dotpath);
    }

    /**
     * @name          read
     * @type          Function
     *
     * This static method allows you to search for frontspec.json files and read them to get
     * back the content of them in one call.
     *
     * @todo      update documentation
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved once the frontspec.json file has been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read() {
        // cached
        if (this._frontspec) {
            return this._frontspec;
        }

        const frontspecPath = `${__packageRootDir()}/frontspec.json`;

        if (!__fs.existsSync(frontspecPath)) {
            return {};
        }

        let frontspecJson = {};
        try {
            frontspecJson = __readJsonSync(frontspecPath);
        } catch (e) {
            // console.log(e);
        }

        let res = __deepMerge(
            __SSugarConfig.get('frontspec')?.default ?? {},
            frontspecJson,
        );

        res.frontspec = {
            path: frontspecPath,
            folderPath: __folderPath(frontspecPath),
        };

        if (res.assets) {
            Object.keys(res.assets).forEach((id) => {
                const assetObj = res.assets[id];
                if (assetObj.env && !__SEnv.is(assetObj.env)) {
                    delete res.assets[id];
                }
            });
        }

        // cache the frontspec
        this._frontspec = res;

        return res;
    }

    /**
     * @name          build
     * @type          Function
     *
     * This static method allows you to build the frontspec.json file from the configs specifies in the config.frontspec.build.sources stack.
     *
     * @param         {Partial<ISFrontspecBuildParams>}          params        The params to use to build your frontspec
     * @return        {Promise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params: Partial<ISFrontspecBuildParams>): Promise<any> {
        const finalParams = <ISFrontspecBuildParams>(
            __deepMerge(__SFrontspecBuildParamsInterface.defaults(), params)
        );
        return new Promise(async (resolve) => {
            const frontspecPath = `${__packageRootDir()}/frontspec.json`;

            console.log(
                `<yellow>[build]</yellow> Building <cyan>frontspec.json</cyan>...`,
            );

            let finalFrontspecJson = {};

            let frontspecJson = {};
            try {
                frontspecJson = __readJsonSync(frontspecPath);
            } catch (e) {
                console.log(e);
            }

            for (let [prop, sourceObj] of Object.entries(finalParams.sources)) {
                console.log(
                    `<yellow>[build]</yellow> Gathering frontspec property "<yellow>${prop}</yellow>" of type "<magenta>${sourceObj.type}</magenta>"`,
                );

                switch (sourceObj.type) {
                    case 'config':
                        finalFrontspecJson[prop] = __SSugarConfig.get(prop);
                        break;
                    case 'object':
                        finalFrontspecJson[prop] = sourceObj.value;
                        break;
                    default:
                        throw new Error(
                            `[SFrontspec.build] Sorry but the "${sourceObj.type}" source type does not exists...`,
                        );
                        break;
                }

                // process if specified
                if (sourceObj.process) {
                    finalFrontspecJson[prop] = sourceObj.process(
                        finalFrontspecJson[prop],
                    );
                }
            }

            if (frontspecJson.$custom) {
                finalFrontspecJson = __deepMerge(
                    {
                        $custom: frontspecJson.$custom,
                    },
                    finalFrontspecJson,
                    frontspecJson.$custom,
                );
            }

            // write the file onto fs
            __fs.writeFileSync(
                frontspecPath,
                JSON.stringify(finalFrontspecJson, null, 4),
            );

            console.log(
                `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${frontspecPath.replace(
                    __packageRootDir() + '/',
                    '',
                )}</cyan>"`,
            );

            // resolve the process
            resolve();
        });
    }

    /**
     * @name      assetsToServe
     * @type      Function
     * @async
     *
     * This method will returns all the files that need to be served using a web server
     * that are defined in the frontspec.json files like some css, js etc...
     *
     * @since     2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    async assetsToServe(): Promise<ISFrontspecAssetToServe[]> {
        const frontspecJson = await this.read();

        const assetsToServe: ISFrontspecAssetToServe[] = [];

        if (!frontspecJson.assets) return;
        Object.keys(frontspecJson.assets).forEach((type) => {
            const typeAssets = frontspecJson.assets[type];
            Object.keys(typeAssets).forEach((assetId) => {
                const assetObj = Object.assign({}, typeAssets[assetId]);
                const url = assetObj.path ?? assetObj.src;

                if (assetObj.env && !__SEnv.is(assetObj.env)) return;

                const fileObj = {
                    type,
                    id: assetId,
                    args: {
                        ...assetObj,
                    },
                };

                const filePath = __path.resolve(
                    __packageRootDir(),
                    assetObj.path ?? assetObj.src ?? assetObj.href,
                );

                if (type === 'css') {
                    fileObj.args.href = fileObj.args.src;
                    delete fileObj.args.src;
                }

                if (__fs.existsSync(filePath)) {
                    fileObj.file = __SFile.new(filePath);
                } else {
                    fileObj.url = url;
                }

                assetsToServe.push(fileObj);
            });
        });

        return assetsToServe;
    }
}
