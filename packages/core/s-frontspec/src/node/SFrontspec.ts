// @ts-nocheck

import __SEnv from '@coffeekraken/s-env';
import __SFile from '@coffeekraken/s-file';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __dirname from '@coffeekraken/sugar/node/fs/dirname';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __delete from '@coffeekraken/sugar/shared/object/delete';
import __fs from 'fs';
import __path from 'path';
import __SFrontspecAddParamsInterface from './interface/SFrontspecAddParamsInterface';

/**
 * @name                SFrontspec
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class represent the ```frontspec.json``` file and allows you to generate it from some sources (glob pattern(s))
 * and save it inside a directory you choose.
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
        return new __SPromise(async ({ resolve, pipe, emit }) => {
            const frontspecPath = `${__packageRootDir()}/frontspec.json`;

            if (!__fs.existsSync(frontspecPath)) {
                return resolve({});
            }

            let frontspecJson = {};
            try {
                frontspecJson = __readJsonSync(frontspecPath);
            } catch (e) {
                console.log(e);
            }

            let res = __deepMerge(
                __SSugarConfig.get('frontspec') ?? {},
                frontspecJson,
            );

            res.frontspec = {
                path: frontspecPath,
                folderPath: __folderPath(frontspecPath),
            };

            if (res.assets) {
                Object.keys(res.assets).forEach((type) => {
                    const typeObj = res.assets[type];
                    Object.keys(typeObj).forEach((asset) => {
                        const assetObj = typeObj[asset];
                        if (assetObj.env && !__SEnv.is(assetObj.env)) {
                            __delete(res.assets, `${type}.${asset}`);
                        }
                    });
                });
            }

            resolve(res);
        });
    }

    /**
     * @name          add
     * @type          Function
     *
     * This method allows you to add a new frontspec.json file to your project.
     *
     * @param       {Partial<ISFrontspecAddParams>}          params={}         Some params for your process
     * @return      {SPromise}                          An SPromise instance that will be resolved once the frontspec.json file has been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    add(params: Partial<ISFrontspecAddParams>) {
        return new __SPromise(async ({ resolve, pipe, emit }) => {
            // @ts-ignore
            const finalParams: ISFrontspecAddParams = __SFrontspecAddParamsInterface.apply(
                params,
            );

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<yellow>[add]</yellow> Adding default <cyan>frontspec.json</cyan> file...`,
            });

            const frontspecPath = `${__packageRootDir()}/frontspec.json`;
            const sourceJsonPath = __path.resolve(
                __packageRoot(__dirname()),
                'src/data/frontspec.json',
            );

            // copy the file to the project root
            __copySync(sourceJsonPath, frontspecPath);

            emit('log', {
                type: __SLog.TYPE_INFO,
                value: `<green>[add]</green> Default <cyan>frontspec.json</cyan> file addedd <green>successfully</green>`,
            });

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
