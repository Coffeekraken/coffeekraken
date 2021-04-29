// @ts-nocheck

import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SGlob from '@coffeekraken/sugar/node/glob/SGlob';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __path from 'path';
import __SFrontspecFindParamsInterface from './interface/SFrontspecFindParamsInterface';
import __SCache from '@coffeekraken/s-cache';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __fs from 'fs';

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

    // init the cache
    const cacheId =
      this.metas.id === 'SFrontspec'
        ? this.metas.id
        : `SFrontspec-${this.metas.id}`;
    if (this.constructor._cachesStack[cacheId]) {
      this._cache = this.constructor._cachesStack[cacheId];
    } else {
      this._cache = new __SCache(cacheId, {
        cache: {
          clearOnExit: true
        }
      });
      this.constructor._cachesStack[cacheId] = this._cache;
    }
  }

  /**
   * @name          clearCache
   * @type          Function
   * @async
   *
   * Clear the cached values
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  async clearCache() {
    return await this._cache.clear();
  }

  /**
   * @name          find
   * @type          Function
   *
   * This method allows you to find for frontspec.json files and get back the array of pathes where to
   * find the found files
   *
   * @todo      update documentation
   *
   * @param       {Object}        [settings={}]       A settings object to configure your reading process
   *
   * @return      {SPromise}                          An SPromise instance that will be resolved once the frontspec.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  find(params?: Partial<ISFrontspecFindParams>) {
    const findParams = <ISFrontspecFindParams>(
      __deepMerge(__SFrontspecFindParamsInterface.defaults(), params || {})
    );

    return new __SPromise(async ({ resolve, reject, emit }) => {
      // build the glob pattern to use
      const patterns: string[] = findParams.globs || [];

      if (findParams.clearCache) {
        emit('log', {
          value: '<yellow>[cache]</yellow> Clearing the cache...'
        });
        await this.clearCache();
      }

      if (findParams.cache && !findParams.clearCache) {
        const cachedValue = await this._cache.get('find-files');
        if (cachedValue) {
          emit('log', {
            value: `<yellow>[${this.constructor.name}]</yellow> frontspec.json file(s) getted from cache`
          });
          cachedValue.forEach((path) => {
            emit('log', {
              value: `- <cyan>${__path.relative(process.cwd(), path)}</cyan>`
            });
          });
          return resolve(cachedValue);
        }
      }

      let files: __SFile[] = [];
      await __wait(1);

      const searchStrArray: string[] = ['Searching frontspec using globs:'];
      patterns.forEach((pat) => {
        searchStrArray.push(`- <yellow>${pat}</yellow>`);
      });
      emit('log', {
        value: searchStrArray.join('\n')
      });

      for (let i = 0; i < patterns.length; i++) {
        const foundedFiles: __SFile[] = <any>await __SGlob.resolve(patterns[i]);
        files = [...files, ...foundedFiles];
      }

      const findedStrArray: string[] = [
        `Found <yellow>${files.length}</yellow> frontspec file(s):`
      ];
      files.forEach((file) => {
        findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
      });
      emit('log', {
        value: findedStrArray.join('\n')
      });

      // save in cache if asked
      if (findParams.cache) {
        emit('log', {
          value: `<yellow>[${this.constructor.name}]</yellow> updating cache with found file(s)`
        });
        await this._cache.set(
          'find-files',
          files.map((file) => file.path)
        );
      }

      resolve(files.map((f) => f.path).filter((f) => __fs.existsSync(f)));
    });
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
   * @todo      integrate the "cache" feature
   *
   * @param       {Object}        [settings={}]       A settings object to override the instance level ones
   * @return      {SPromise}                          An SPromise instance that will be resolved once the frontspec.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  read(params: Partial<ISFrontspecFindParams>) {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
      const filesPromise = this.find(params);
      pipe(filesPromise);
      const filesPaths = await filesPromise;

      let jsons = {};

      // loop on all files
      filesPaths.forEach((filePath) => {
        const file = __SFile.new(filePath);
        const content = file.content;

        emit('log', {
          value: __toString(content)
        });

        jsons[file.path] = content;
      });

      resolve(jsons);
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
    const filesPaths = await this.find();

    const assetsToServe: ISFrontspecAssetToServe[] = [];

    filesPaths.forEach((filePath) => {
      const file = __SFile.new(filePath);
      const content = file.content;
      if (!content.assets) return;
      Object.keys(content.assets).forEach((type) => {
        const typeAssets = content.assets[type];
        Object.keys(typeAssets).forEach((assetId) => {
          const assetObj = typeAssets[assetId];
          const path = __path.resolve(
            file.dirPath,
            assetObj.path ?? assetObj.src
          );
          assetsToServe.push({
            type,
            id: assetId,
            path,
            file: __SFile.new(path)
          });
        });
      });
    });

    return assetsToServe;
  }
}
