import __SCache from '@coffeekraken/s-cache';
import __SClass from '@coffeekraken/s-class';
import __SDocblock from '@coffeekraken/s-docblock';
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SGlob from '@coffeekraken/s-glob';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rootDir from '@coffeekraken/sugar/node/path/rootDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __fs from 'fs';
import __path from 'path';
import __SDocMapFindParamsInterface from './interface/SDocMapFindParamsInterface';
import __SDocMapGenerateParamsInterface from './interface/SDocMapGenerateParamsInterface';


/**
 * @name                SDocMap
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class represent the ```docMap.json``` file and allows you to build it from some sources (glob pattern(s))
 * and save it inside a directory you choose.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your docMap instance:
 * - filename (docMap.json) {String}: Specify the filename you want
 * - outputDir (packageRoot()) {String}: Specify the directory where you want to save your docMap.json file when using the ```save``` method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SDocMap from 'coffeekraken/sugar/node/doc/SDocMap';
 * const docMap = new SDocMap({
 *  outputDir: '/my/cool/directory'
 * });
 * await docMap.scan('/my/cool/directory/*.js');
 * await docMap.save();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDocMapGenerateParams {
  watch: boolean;
  globs: string[];
  exclude: string[];
  filters: Record<string, RegExp>;
  fields: string[];
  save: boolean;
  outPath: string;
  find: Partial<ISDocMapFindParams>;
}
export interface ISDocMapFindParams {
  cache: boolean;
  clearCache: boolean;
  globs: string[];
  exclude: string[];
}

export interface ISDocMapReadParams {
  path: string;
}

export interface ISDocMapSaveSettings {
  path: string;
  generate: ISDocMapGenerateParams;
}
export interface ISDocMapCtorSettings {}

export interface ISDocMapEntry {
  absPath?: string;
  name?: string;
  namespace?: string;
  filename?: string;
  extension?: string;
  relPath?: string;
  directory?: string;
  relDirectory?: string;
  type?: string;
  description?: string;
  extends?: boolean;
  static?: boolean;
  since?: string;
  status?: string;
}
export interface ISDocMapEntries {
  [key: string]: ISDocMapEntry;
}

export interface ISDocMap {
  _entries: ISDocMapEntries;
}

class SDocMap extends __SClass implements ISDocMap {
  static interfaces = {};

  /**
   * @name          _entries
   * @type           ISDocMapEntries
   * @private
   *
   * This store the docMap.json entries
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _entries: ISDocMapEntries = {};

  /**
   * @name      _cache
   * @type      SCache
   * @private
   *
   * Store the SCache instance used for this instance
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _cache: __SCache;

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
  constructor(settings?: Partial<ISDocMapCtorSettings>) {
    super(
      __deepMerge(
        {
          metas: {
            id: 'SDocMap'
          }
        },
        settings || {}
      )
    );

    // init the cache
    this._cache = new __SCache(
      this.metas.id === 'SDocMap' ? this.metas.id : `SDocMap-${this.metas.id}`
    );
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
   * This static method allows you to search for docMap.json files and get back the array of pathes where to
   * find the found files
   *
   * @todo      update documentation
   *
   * @param       {Object}        [settings={}]       A settings object to override the instance level ones
   * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  find(params?: Partial<ISDocMapFindParams>) {
    const findParams = <ISDocMapFindParams>(
      __deepMerge(__SDocMapFindParamsInterface.defaults(), params || {})
    );

    return new __SPromise(async ({ resolve, reject, emit }) => {
      // build the glob pattern to use
      const patterns: string[] = findParams.globs || [];

      if (findParams.clearCache) {
        emit('log', {
          group: `s-docmap-${this.metas.id}`,
          value: '<yellow>[cache]</yellow> Clearing the cache...'
        });
        await this.clearCache();
      }

      // if (findParams.cache && !findParams.clearCache) {
      //   const cachedValue = await this._cache.get('find-files');
      //   if (cachedValue) {
      //     emit('log', {
      //       value: `<yellow>[${this.constructor.name}]</yellow> docmap.json file(s) getted from cache`
      //     });
      //     cachedValue.forEach((fileObj) => {
      //       emit('log', {
      //         value: `- <cyan>${__path.relative(
      //           process.cwd(),
      //           fileObj.path
      //         )}</cyan>`
      //       });
      //     });
      //     return resolve(cachedValue);
      //   }
      // }

      let files: __SFile[] = [];
      await __wait(1);

      const searchStrArray: string[] = ['Searching docmaps using globs:'];
      patterns.forEach((pat) => {
        searchStrArray.push(`- <yellow>${pat}</yellow>`);
      });
      emit('log', {
        group: `s-docmap-${this.metas.id}`,
        value: searchStrArray.join('\n')
      });

      for (let i = 0; i < patterns.length; i++) {
        const foundedFiles: __SFile[] = <any>await __SGlob.resolve(patterns[i]);
        files = [...files, ...foundedFiles];
      }

      files = files.filter((file) => {
        if (!__fs.existsSync(`${file.dirPath}/package.json`)) return false;
        return true;
      });

      const findedStrArray: string[] = [
        `Found <yellow>${files.length}</yellow> docmap file(s):`
      ];
      files.forEach((file) => {
        findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
      });
      emit('log', {
        group: `s-docmap-${this.metas.id}`,
        value: findedStrArray.join('\n')
      });

      // save in cache if asked
      // if (findParams.cache) {
      //   emit('log', {
      //     value: `<yellow>[${this.constructor.name}]</yellow> updating cache with found file(s)`
      //   });
      //   await this._cache.set(
      //     'find-files',
      //     files.map((file) => file.toObject())
      //   );
      // }

      resolve(files);
    });
  }

  /**
   * @name          read
   * @type          Function
   *
   * This static method allows you to search for docMap.json files and read them to get
   * back the content of them in one call. It can take advantage of the cache if
   * the setting.cache property is setted to true
   *
   * @todo      update documentation
   * @todo      integrate the "cache" feature
   *
   * @param       {Object}        [settings={}]       A settings object to override the instance level ones
   * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  read(params: Partial<ISDocMapReadParams>) {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
      const set = <ISDocMapReadParams>__deepMerge(
        {
          path: `${__packageRoot()}/docmap.json`
        },
        params ?? {}
      );

      if (!__fs.existsSync(set.path)) {
        throw new Error(
          `<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${set.path}</cyan>" does not exists...`
        );
      }

      const rootPath = set.path.replace(/\/docmap\.json/, '');

      let finalDocmapJson = {};
      const extendedPackages: string[] = [];
      function loadJson(path) {
        let docMapJson;
        let docmapJsonPath = path.match(/docmap\.json$/)
          ? path
          : `${path}/docmap.json`;
        try {
          docMapJson = require(docmapJsonPath);
        } catch (e) {}

        const rootModulePath = require
          .resolve(docmapJsonPath)
          .replace(/\/docmap\.json/, '');

        Object.keys(docMapJson.map).forEach((namespace) => {
          const docmapObj = docMapJson.map[namespace];
          const absPath = __path.resolve(rootModulePath, docmapObj.relPath);
          const relPath = __path.relative(rootPath, absPath);
          docMapJson.map[namespace].relPath = relPath;
          docMapJson.map[namespace].path = absPath;
        });

        // add the map
        finalDocmapJson = {
          ...finalDocmapJson,
          ...(docMapJson.map ?? {})
        };
        // loop on extends
        if (docMapJson.extends) {
          docMapJson.extends.forEach((path) => {
            if (extendedPackages.indexOf(path) === -1) {
              extendedPackages.push(path);
              loadJson(path);
            }
          });
        }
      }

      loadJson(set.path);

      // return the final docmap
      resolve(finalDocmapJson);
    });
  }

  /**
   * @name          generate
   * @type          Function
   *
   * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
   * and extract all the necessary informations to build the docMap.json file
   *
   * @param         {String|Array<String>}          sources         The glob pattern(s) you want to scan files in
   * @return        {SPromise}                                     A promise resolved once the scan process has been finished
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  generate(params: Partial<ISDocMapGenerateParams>) {
    const generateParams = <ISDocMapGenerateParams>(
      __deepMerge(__SDocMapGenerateParamsInterface.defaults(), params)
    );
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {
      let globs: string[] = generateParams.globs || [];
      if (!Array.isArray(globs)) globs = [globs];

      emit('notification', {
        message: `${this.metas.id} generation started`
      });

      emit('log', {
        group: `s-docmap-${this.metas.id}`,
        value: `Searching files to use as docmap sources using globs:\n- <yellow>${globs.join(
          '</yellow>\n- '
        )}</yellow>`
      });

      // getting package infos
      const packageJson = __packageJson();

      // searching for actual docmaps
      const currentDocmapsPromise = this.find(params.find);
      pipe(currentDocmapsPromise);
      const currentDocmapsFiles = await currentDocmapsPromise;

      const extendsArray: string[] = [];
      currentDocmapsFiles.forEach((file) => {
        const packageJson = require(`${file.dirPath}/package.json`);
        extendsArray.push(packageJson.name);
      });

      const pool = __fsPool(globs, {
        watch: generateParams.watch,
        exclude: generateParams.exclude
      });

      const docmapJson = {
        extends: extendsArray,
        map: {}
      };

      pool.on(generateParams.watch ? 'update' : 'files', (files) => {
        files = Array.isArray(files) ? files : [files];

        emit('log', {
          group: `s-docmap-${this.metas.id}`,
          value: `<yellow>${
            files.length
          }</yellow> file(s) found using the glob "<cyan>${globs.join(
            ','
          )}</cyan>"`
        });
        // loop on each files to check for docblocks
        for (let j = 0; j < files.length; j++) {
          const filepath = files[j].path;
          const content = __fs.readFileSync(filepath, 'utf8');
          if (!content) continue;
          const docblocks = new __SDocblock(content).toObject();

          // const db = new __SDocblock(content);
          // const renderer = new SDocblockHtmlRenderer(db);
          // const str = renderer.render();

          if (!docblocks || !docblocks.length) continue;
          let docblockObj: any = {};
          const children: any = {};
          docblocks.forEach((docblock) => {
            for (
              let i = 0;
              // @ts-ignore
              i < Object.keys(generateParams.filters).length;
              i++
            ) {
              const filterReg =
                // @ts-ignore
                generateParams.filters[Object.keys(generateParams.filters)[i]];
              // @ts-ignore
              const value = docblock[Object.keys(generateParams.filters)[i]];
              if (value === undefined) continue;
              if (value.match(filterReg)) return;
            }
            if (docblock.name && docblock.name.slice(0, 1) === '_') return;
            if (docblock.private) return;

            // const path = __path.relative(outputDir, filepath);
            const filename = __getFilename(filepath);

            let docblockEntryObj: ISDocMapEntry = {};

            generateParams.fields.forEach((field) => {
              if (docblock[field] === undefined) return;
              if (field === 'namespace')
                docblock[field] = `${packageJson.name.replace('/', '.')}.${
                  docblock[field]
                }`;
              docblockEntryObj[field] = docblock[field];
            });

            if (docblock.namespace) {
              docblockObj = {
                ...docblockEntryObj,
                filename,
                extension: filename.split('.').slice(1)[0],
                relPath: __path.relative(__packageRoot(), filepath)
              };
              this._entries[
                `${docblock.namespace}.${docblock.name}`
              ] = docblockObj;
            } else if (docblock.name) {
              children[docblock.name] = docblockEntryObj;
            }
          });
          docblockObj.children = children;
        }

        emit('log', {
          group: `s-docmap-${this.metas.id}`,
          value: `<green>${
            Object.keys(this._entries).length
          }</green> entries gathered for this docMap`
        });

        emit('notification', {
          type: 'success',
          message: `${this.metas.id} build success`
        });

        // save entries inside the json map property
        docmapJson.map = this._entries;

        if (generateParams.save) {
          emit('log', {
            group: `s-docmap-${this.metas.id}`,
            value: `<yellow>[save]</yellow> File "<cyan>${generateParams.outPath.replace(
              __rootDir() + '/',
              ''
            )}</cyan>"`
          });
          __fs.writeFileSync(
            generateParams.outPath,
            JSON.stringify(docmapJson, null, 4)
          );
        }

        if (generateParams.watch) {
          emit('log', {
            group: `s-docmap-${this.metas.id}`,
            value: '<blue>[watch]</blue> Watching for changes...'
          });
        } else {
          resolve(this._entries);
        }
      });

      if (generateParams.watch) {
        emit('log', {
          group: `s-docmap-${this.metas.id}`,
          value: '<blue>[watch]</blue> Watching for changes...'
        });
      }
    });
  }
}

export default SDocMap;
