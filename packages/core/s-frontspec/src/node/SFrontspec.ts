// @ts-nocheck

import __SEnv from '@coffeekraken/s-env';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __delete from '@coffeekraken/sugar/shared/object/delete';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';

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
 * const frontspec = new SFrontspec({
 *  outputDir: '/my/cool/directory'
 * });
 * const result = await frontspec.read();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read() {
        return new __SPromise(async ({ resolve, pipe, emit }) => {
            const frontspecPath = `${__packageRootDir()}/frontspec.json`;

            let frontspecJson = {};
            try {
                frontspecJson = __readJsonSync(frontspecPath);
            } catch (e) {
                console.log('ER', e);
            }

            let res = __deepMerge(
                __SSugarConfig.get('frontspec') ?? {},
                frontspecJson,
            );

            res.metas = {
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
     * @name      assetsToServe
     * @type      Function
     * @async
     *
     * This method will returns all the files that need to be served using a web server
     * that are defined in the frontspec.json files like some css, js etc...
     *
     * @since     2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
