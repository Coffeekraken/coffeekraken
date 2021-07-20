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
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';

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
            id: 'SFrontspec'
          }
        },
        settings
      )
    );
  }

  /**
   * @name          read
   * @type          Function
   *
   * This static method allows you to search for frontspec.json files and read them to get
   * back the content of them in one call. It can take advantage of the cache if
   * the setting.cache property is setted to true
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
      } catch(e) {}

      let res = __deepMerge(
        __SSugarConfig.get('frontspec.default'),
        frontspecJson
      );

      __deepMap(res, ({path, prop, value, object}) => {
        if (value === undefined) {
          return -1;
        }

        // @environment handling
        if (prop && prop.match(/.*@.*/) && !prop.includes('/')) {
          const parts = prop.split('@');
          const env = parts[1];
          const p = parts[0];

          if (__SEnv.is(env)) {
            object[p] = value;
            return -1;
          }
        }

        return value;
      }, {
        cloneFirst: false
      });

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
  async assetsToServe(
  ): Promise<ISFrontspecAssetToServe[]> {
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
            ...assetObj
          }
        };

        const filePath = __path.resolve(
          __packageRootDir(),
          assetObj.path ?? assetObj.src ?? assetObj.href
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
