import __folderPath from '../fs/folderPath';
import __SPromise from '../promise/SPromise';
import __deepMerge from '../object/deepMerge';
import __packageRoot from '../path/packageRoot';
import __glob from 'glob';
import __fs from 'fs';
import __path from 'path';
import __SDocblock from '../docblock/SDocblock';
import __toString from '../string/toString';
import __removeSync from '../fs/removeSync';
import __getFilename from '../fs/filename';
import __unique from '../array/unique';
import __SGlob from '../glob/SGlob';
import __SClass from '../class/SClass';
import __sugarConfig from '../config/sugar';
import __SDocMapSettingsInterface from './interface/SDocMapSettingsInterface';
import __wait from '../time/wait';
import __SFile from '../fs/SFile';
import __clone from '../object/clone';
import __writeFileSync from '../fs/writeFileSync';

/**
 * @name                SDocMap
 * @namespace           sugar.node.doc
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

export interface ISDocMapExcludeSetting {
  [key: string]: RegExp;
}

export interface ISDocMapBuildSettings {
  globs: string[];
  exclude: ISDocMapExcludeSetting;
}
export interface ISDocMapFindSettings {
  globs: string[];
  exclude: ISDocMapExcludeSetting;
}

export interface ISDocMapSaveSettings {
  path: string;
  build: ISDocMapBuildSettings;
}
export interface ISDocMapSettings {
  build: ISDocMapBuildSettings;
  find: ISDocMapFindSettings;
  save: ISDocMapSaveSettings;
}
export interface ISDocMapCtorSettings {
  docMap?: Partial<ISDocMapSettings>;
}

export interface ISDocMapEntry {
  __fullPath?: string;
  name: string;
  namespace?: string;
  filename?: string;
  extension?: string;
  relPath?: string;
  directory?: string;
  relDirectory?: string;
  type: string;
  description: string;
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
  static interfaces = {
    settings: {
      apply: true,
      on: '_settings.docMap',
      class: __SDocMapSettingsInterface
    }
  };

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
   * @name        docMapSettings
   * @type        Object
   * @get
   *
   * Access the docMap settings
   *
   * @since     2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  get docMapSettings(): ISDocMapSettings {
    return (<any>this._settings).docMap;
  }

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
  constructor(settings: ISDocMapCtorSettings) {
    super(
      __deepMerge(
        {
          id: 'SDocMap',
          docMap: {}
        },
        settings || {}
      )
    );
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
   * @param       {Object}        [settings={}]       A settings object to override the instance level ones
   * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  find(settings?: Partial<ISDocMapFindSettings>) {
    const findSettings = <ISDocMapFindSettings>(
      __deepMerge(this.docMapSettings.find, settings || {})
    );

    return new __SPromise(
      async ({ resolve, reject, emit }) => {
        // build the glob pattern to use
        const patterns: string[] = findSettings.globs || [];

        let files: __SFile[] = [];
        await __wait(1);

        const searchStrArray: string[] = ['Searching docMaps using globs:'];
        patterns.forEach((pat) => {
          searchStrArray.push(`- <yellow>${pat}</yellow>`);
        });
        emit('log', {
          value: searchStrArray.join('\n')
        });

        for (let i = 0; i < patterns.length; i++) {
          const foundedFiles: __SFile[] = <any>(
            await __SGlob.resolve(patterns[i])
          );
          files = [...files, ...foundedFiles];
        }

        const findedStrArray: string[] = [
          `Found <yellow>${files.length}</yellow> docMap file(s):`
        ];
        files.forEach((file) => {
          findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
        });
        emit('log', {
          value: findedStrArray.join('\n')
        });

        resolve(files);
      },
      {
        id: this.id + '.find'
      }
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
   * @param       {Object}        [settings={}]       A settings object to override the instance level ones
   * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  read(settings: Partial<ISDocMapFindSettings>) {
    return new __SPromise(
      async ({ resolve, pipe }) => {
        const filesPromise = this.find(settings);
        pipe(filesPromise);
        const files = await filesPromise;

        let docMapJson = {};

        // loop on all files
        files.forEach((file) => {
          const content = JSON.parse(__fs.readFileSync(file.path, 'utf8'));

          Object.keys(content).forEach((docMapItemKey) => {
            content[docMapItemKey].path = __path.resolve(
              file.path.split('/').slice(0, -1).join('/'),
              content[docMapItemKey].relPath
            );
          });

          docMapJson = {
            ...docMapJson,
            ...content
          };
        });

        // return the final docmap
        resolve(docMapJson);
      },
      {
        id: this.id + '.read'
      }
    );
  }

  /**
   * @name          build
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
  build(settings: Partial<ISDocMapBuildSettings>) {
    const buildSettings = <ISDocMapBuildSettings>(
      __deepMerge(this.docMapSettings.build, settings)
    );
    return new __SPromise(
      async ({ resolve, reject, emit }) => {
        let globs: string[] = buildSettings.globs || [];
        if (!Array.isArray(globs)) globs = [globs];

        emit('log', {
          value: `Searching files to use as docMap sources using globs:\n- <yellow>${globs.join(
            '</yellow>\n- '
          )}</yellow>`
        });

        for (let i = 0; i < globs.length; i++) {
          const glob = globs[i];

          // scan for files
          let files = await __SGlob.resolve(glob, {});
          files = files.filter((file) => {
            if (!buildSettings.exclude || buildSettings.exclude === undefined)
              return true;
            return !file.path.match(buildSettings.exclude.path);
          });

          emit('log', {
            value: `<yellow>${files.length}</yellow> file(s) found using the glob "<cyan>${glob}</cyan>"`
          });

          // loop on each files to check for docblocks
          for (let j = 0; j < files.length; j++) {
            const filepath = files[j].path;
            const content = __fs.readFileSync(filepath, 'utf8');

            if (!content) continue;

            const docblocks = new __SDocblock(content).toObject();

            if (!docblocks || !docblocks.length) continue;

            let docblockObj: any = {};
            const children: any = {};

            docblocks.forEach((docblock) => {
              for (
                let i = 0;
                // @todo    {Clean}   remove ts-ignore
                // @ts-ignore
                i < Object.keys(buildSettings.exclude).length;
                i++
              ) {
                const excludeReg =
                  // @todo    {Clean}   remove ts-ignore
                  // @ts-ignore
                  buildSettings.exclude[Object.keys(buildSettings.exclude)[i]];
                // @todo    {Clean}   remove ts-ignore
                // @ts-ignore
                const value = docblock[Object.keys(buildSettings.exclude)[i]];
                if (value === undefined) continue;
                if (value.match(excludeReg)) return;
              }

              if (docblock.name && docblock.name.slice(0, 1) === '_') return;
              if (docblock.private) return;

              // const path = __path.relative(outputDir, filepath);
              const filename = __getFilename(filepath);
              let docblockEntryObj: ISDocMapEntry = {
                name: docblock.name,
                type: docblock.type,
                description: docblock.description
              };
              if (docblock.namespace)
                docblockEntryObj.namespace = docblock.namespace;
              if (docblock.extends) docblockEntryObj.extends = docblock.extends;
              if (docblock.status) docblockEntryObj.status = docblock.status;
              if (docblock.static) docblockEntryObj.static = true;
              if (docblock.since) docblockEntryObj.since = docblock.since;

              if (docblock.namespace) {
                docblockObj = {
                  ...docblockEntryObj,
                  __fullPath: filepath, // this property will be used in the save method to generate the correct pathes relative to this
                  filename,
                  extension: filename.split('.').slice(1)[0],
                  path: __path.relative(__packageRoot(), filepath),
                  directory: __path
                    .relative(__packageRoot(), filepath)
                    .replace(`/${__getFilename(filepath)}`, '')
                  // relPath will be generated in the save method
                  // relDirectory will be generated in the save method
                };
                this._entries[
                  `${docblock.namespace}.${docblock.name}`
                ] = docblockObj;
              } else {
                children[docblock.name] = docblockEntryObj;
              }
            });
            docblockObj.children = children;
          }
        }

        emit('log', {
          value: `<green>${
            Object.keys(this._entries).length
          }</green> entries gathered for this docMap`
        });

        resolve(this._entries);
      },
      {
        id: this.id + '.build'
      }
    );
  }

  /**
   * @name              save
   * @type              Function
   *
   * This method save the docMap.json file in the outputDir setted in the settings.
   * You can specify an output path as parameter to use this instead of the instance level settings.
   *
   * @param         {String}            [output=null]           A full output file path where to save the file
   * @return        {SPromise}                                  An SPromise instance resolved once the file has been saved
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  save(
    outputOrSettings: string | Partial<ISDocMapSaveSettings>,
    settings?: Partial<ISDocMapSaveSettings>
  ): __SPromise {
    let output, saveSettings: ISDocMapSaveSettings;
    if (typeof outputOrSettings === 'string') {
      output = outputOrSettings;
      saveSettings = this.docMapSettings.save;
    } else {
      saveSettings = <ISDocMapSaveSettings>(
        __deepMerge(this.docMapSettings.save, outputOrSettings)
      );
      output = saveSettings.path;
    }

    const outputDir = output.replace(`/${__getFilename(output)}`, '');

    return new __SPromise(
      ({ resolve, emit, pipe, pipeFrom }) => {
        let entries: ISDocMapEntries = __clone(this._entries, { deep: true });

        emit('log', {
          value: `Saving the docMap file to "<cyan>${output.replace(
            `${__packageRoot()}/`,
            ''
          )}</cyan>"`
        });

        // add relPath and directory property depending on the output
        Object.keys(entries).forEach((namespace) => {
          const obj = entries[namespace];
          // @ts-ignore
          const relPath = __path.relative(outputDir, obj.__fullPath);
          const relDirectory = relPath.replace(
            `/${__getFilename(relPath)}`,
            ''
          );
          obj.relPath = relPath;
          obj.relDirectory = relDirectory;
          // @ts-ignore
          delete obj.__fullPath;
        });

        __removeSync(output);
        __writeFileSync(output, JSON.stringify(entries, null, 4));

        emit('log', {
          value: `<green>[save]</green> DocMap file "<yellow>${__getFilename(
            output
          )}</yellow>" <green>saved successfully</green> under "<cyan>${output}</cyan>"`
        });

        resolve(entries);
      },
      {
        id: this.id + '.save'
      }
    );
  }
}

export default SDocMap;
