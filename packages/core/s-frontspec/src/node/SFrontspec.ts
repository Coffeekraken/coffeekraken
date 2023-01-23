// @ts-nocheck

import __SEnv from '@coffeekraken/s-env';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __folderPath, __readJsonSync } from '@coffeekraken/sugar/fs';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __fs from 'fs';
import __path from 'path';
import __SFrontspecBuildParamsInterface from './interface/SFrontspecBuildParamsInterface';

/**
 * @name                SFrontspec
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class represent the ```frontspec.json``` file and allows you to generate it.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your frontspec instance:
 *
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SFrontspec from '@coffeekraken/s-frontspec';
 * const frontspec = new SFrontspec();
 * const result = await frontspec.read();
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

export default class SFrontspec extends __SPromise {
    static _cachesStack = {};

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
        const frontspecPath = `${__packageRootDir()}/frontspec.json`;

        if (!__fs.existsSync(frontspecPath)) {
            return {};
        }

        let frontspecJson = {};
        try {
            frontspecJson = __readJsonSync(frontspecPath);
        } catch (e) {
            console.log(e);
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
