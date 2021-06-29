import __SClass from '@coffeekraken/s-class';
import __SDocblock from '@coffeekraken/s-docblock';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __SDocMapBuildParamsInterface from './interface/SDocMapBuildParamsInterface';
import __SDocMapReadParamsInterface from './interface/SDocMapReadParamsInterface';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';


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
 * - outputDir (packageRootDir()) {String}: Specify the directory where you want to save your docMap.json file when using the ```save``` method
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

export interface ISDocMapBuildParams {
  watch: boolean;
  globs: string[];
  exclude: string[];
  noExtends: boolean;
  filters: Record<string, RegExp>;
  fields: string[];
  save: boolean;
  outPath: string;
}

export interface ISDocMapReadParams {
  input: string;
  collect: string[];
  path: string;
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

export interface ISDocMapObj {
  collected: Record<string, any>;
  map: ISDocMapEntries;
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
   * @return      {SPromise<ISDocMapObj>}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  read(params: Partial<ISDocMapReadParams>): Promise<ISDocMapObj> {
    return new __SPromise(async ({ resolve, pipe, emit }) => {
      const finalParams = <ISDocMapReadParams>__deepMerge(
        __SDocMapReadParamsInterface.defaults(),
        params ?? {}
      );

      if (!__fs.existsSync(finalParams.input)) {
        throw new Error(
          `<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`
        );
      }

      const extendedPackages: string[] = [];
      const finalDocmapJson = {
        collected: {},
        map: {}
      };

      const collectedHashes = {};

      function loadJson(packageNameOrPath, currentPath) {
        if (extendedPackages.indexOf(packageNameOrPath) !== -1) return;
        extendedPackages.push(packageNameOrPath);

        let currentPathDocmapJsonPath;
        try {
          currentPathDocmapJsonPath = require.resolve(`${packageNameOrPath}/docmap.json`);
        } catch(e) {
          // console.log('__', e);
        }

        if (!currentPathDocmapJsonPath) return;

        const extendsRootPath = require.resolve(currentPathDocmapJsonPath).replace('/docmap.json', '');

        try {
          const docmapJson = require(currentPathDocmapJsonPath);
          docmapJson.extends = [
            ...(docmapJson.extends ?? []),
            ...(docmapJson.generated?.extends ?? [])
          ];
          docmapJson.map = {
            ...(docmapJson.map ?? {}),
            ...(docmapJson.generated?.map ?? {})
          };

          delete docmapJson.generated;

          docmapJson.extends.forEach(extendsPackageName => {
            loadJson(extendsPackageName, extendsRootPath);
          });

          Object.keys(docmapJson.map ?? {}).forEach(namespace => {
            const obj = docmapJson.map[namespace];
            obj.path = __path.resolve(extendsRootPath, obj.relPath);
            docmapJson.map[namespace] = obj;

            // extract the "collect" fields
            (finalParams.collect ?? []).forEach(collect => {
              if (obj[collect] === undefined) return;

              // make sure we have a stack for hashes of this collect
              if (!collectedHashes[collect]) collectedHashes[collect] = [];
              if (!finalDocmapJson.collected[collect]) finalDocmapJson.collected[collect] = [];

              const value = Array.isArray(obj[collect]) ? obj[collect] : [obj[collect]];
              value.forEach(v => {
                if (typeof v === 'string') {
                  if (finalDocmapJson.collected[collect].indexOf(v) === -1) finalDocmapJson.collected[collect].push(v);
                } else {
                  // generate hash
                  const hash = __md5.encrypt(v);
                  if (collectedHashes[collect].indexOf(hash) !== -1) return;
                  finalDocmapJson.collected[collect].push(v);
                  collectedHashes[collect].push(hash);
                  // throw new Error(`<red>[SDocmap.read]</red> Sorry but collecting fields that contains other that string values is not supported for now...`);
                }
              })
            });

          });

          finalDocmapJson.map = {
            ...finalDocmapJson.map,
            ...(docmapJson.map ?? {})
          };
        } catch(e) {
          console.log('ERRO', e);
        }
      }

      loadJson(__packageRootDir(), __packageRootDir());

      // return the final docmap
      resolve(finalDocmapJson);
    });
  }

  /**
   * @name          build
   * @type          Function
   *
   * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
   * and extract all the necessary informations to build the docmap.json file
   *
   * @param         {String|Array<String>}          sources         The glob pattern(s) you want to scan files in
   * @return        {SPromise}                                     A promise resolved once the scan process has been finished
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  build(params: Partial<ISDocMapBuildParams>): Promise<any> {
    const finalParams = <ISDocMapBuildParams>(
      __deepMerge(__SDocMapBuildParamsInterface.defaults(), params)
    );
    return new __SPromise(async ({ resolve, reject, emit, pipe }) => {

      emit('notification', {
        message: `${this.metas.id} build started`
      });

      let docmapJson = {
        map: {},
        generated: {
          extends: [],
          map: {}
        }
      };

      const packageRoot = __packageRootDir();
      const packageMonoRoot = __packageRoot(process.cwd(), true);

      // check if a file already exists
      if (__fs.existsSync(`${packageRoot}/docmap.json`)) {
        const currentDocmapJson = require(`${packageRoot}/docmap.json`);
        docmapJson = currentDocmapJson;
        docmapJson.generated = {
          extends: [],
          map: {}
        }
      }

      // getting package infos
      const packageJson = __packageJson();    

      if (!finalParams.noExtends) {

        emit('log', {
          value: `<yellow>[build]</yellow> Building extends array from existing docmap compliant packages`
        });

        const globs: string[] = [`${packageRoot}/node_modules/**{0,2}/docmap.json`];
        if (packageRoot !== packageMonoRoot) {
          globs.push(`${packageMonoRoot}/node_modules/**{0,2}/docmap.json`);
        }

        const currentDocmapFiles = __SGlob.resolve(globs, {
          exclude: finalParams.exclude ?? []
        });

        const extendsArray: string[] = [];
        currentDocmapFiles.forEach((file) => {
          const packageJson = require(`${file.dirPath}/package.json`);
          extendsArray.push(packageJson.name);
        });

        // @ts-ignore
        docmapJson.generated.extends = extendsArray.filter(name => name !== packageJson.name);
      }

      emit('log', {
        value: `<yellow>[build]</yellow> Building map by searching for files inside the current package`
      });  

      // searching inside the current package for docblocks to use
      const filesInPackage = __SGlob.resolve(finalParams.globs, {
        cwd: packageRoot,
        exclude: finalParams.exclude ?? []
      });

      filesInPackage.forEach(file => {
        const content = file.raw;
        const docblocks = new __SDocblock(content).toObject();

        if (!docblocks || !docblocks.length) return;
        let docblockObj: any = {};
        const children: any = {};
        docblocks.forEach((docblock) => {
          for (
            let i = 0;
            // @ts-ignore
            i < Object.keys(finalParams.filters).length;
            i++
          ) {
            const filterReg =
              // @ts-ignore
              finalParams.filters[Object.keys(finalParams.filters)[i]];
            // @ts-ignore
            const value = docblock[Object.keys(finalParams.filters)[i]];
            if (value === undefined) continue;
            if (value.match(filterReg)) return;
          }
          if (docblock.name && docblock.name.slice(0, 1) === '_') return;
          if (docblock.private) return;

          // const path = __path.relative(outputDir, filepath);
          const filename = __getFilename(file.path);

          const docblockEntryObj: ISDocMapEntry = {};

          finalParams.fields.forEach((field) => {
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
              relPath: __path.relative(__packageRootDir(), file.path)
            };
            this._entries[
              `${docblock.namespace}.${docblock.name}`
            ] = docblockObj;
          } else if (docblock.name) {
            children[docblock.name] = docblockEntryObj;
          }
        });
        docblockObj.children = children;

      });

      emit('log', {
        value: `<yellow>[build]</yellow> <green>${
          Object.keys(this._entries).length
        }</green> entries gathered for this docMap`
      });

      emit('notification', {
        type: 'success',
        message: `${this.metas.id} build success`
      });

      // save entries inside the json map property
      docmapJson.generated.map = this._entries;

      // console.log(docmapJson.generated.map['@coffeekraken.sugar.node.process.SProcessPipe']);

      if (finalParams.save) {
        emit('log', {
          value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(
            __packageRootDir() + '/',
            ''
          )}</cyan>"`
        });
        __fs.writeFileSync(
          finalParams.outPath,
          JSON.stringify(docmapJson, null, 4)
        );
      }

      resolve(docmapJson);

    });
  }
}

export default SDocMap;
