const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __packageRoot = require('../path/packageRoot');
const __glob = require('glob');
const __fs = require('fs');
const __path = require('path');
const __SDocblock = require('../docblock/SDocblock');
const __toString = require('../string/toString');
const __removeSync = require('../fs/removeSync');
const __getFilename = require('../fs/filename');
const __unique = require('../array/unique');

/**
 * @name                SDocMap
 * @namespace           sugar.node.doc
 * @type                Class
 * @extends             SPromise
 *
 * This class represent the ```docMap.json``` file and allows you to generate it from some sources (glob pattern(s))
 * and save it inside a directory you choose.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your docMap instance:
 * - filename (docMap.json) {String}: Specify the filename you want
 * - outputDir (packageRoot()) {String}: Specify the directory where you want to save your docMap.json file when using the ```save``` method
 *
 * @example             js
 * const SDocMap = require('@coffeekraken/sugar/node/doc/SDocMap');
 * const docMap = new SDocMap({
 *  outputDir: '/my/cool/directory'
 * });
 * await docMap.scan('/my/cool/directory/*.js');
 * await docMap.save();
 *
 * @since           2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SDocMap extends __SPromise {
  /**
   * @name          _entries
   * @type           Array<Object>
   * @private
   *
   * This store the docMap.json entries
   *
   * @since         2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _entries = {};

  /**
   * @name            constructor
   * @type            Function
   * @constructor
   *
   * Constructor
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    super(
      __deepMerge(
        {
          id: 'SDocMap',
          filename: 'docMap.json',
          outputDir: __packageRoot()
        },
        settings
      )
    );
  }

  /**
   * @name          find
   * @type          Function
   * @static
   *
   * This static method allows you to search for docMap.json files and get back the array of pathes where to
   * find the found files
   *
   * @param       {Object}        [settings={}]       A settings object to configure your reading process
   * - dirDepth (10) {Integer}: Specify the max directories depth to search for docMap.json files relative to the ```roorDir``` setting
   * - rootDir (__packageRoot()) {String}: Specify the root directory from where to search for docMap.json files
   * - filename ('docMap.json') {String|Array<String>}: Specify the file names to search for
   * - cache (true) {Boolean}: Specify if you want to take advantage of the cache feature or
   * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static find(settings = {}) {
    return new __SPromise(
      (resolve, reject, trigger, cancel) => {
        settings = __deepMerge(
          {
            id: 'SDocMap',
            sources: {
              root: {
                rootDir: __packageRoot(),
                dirDepth: 3
              },
              nodeModules: {
                rootDir: `${__packageRoot()}/node_modules`,
                dirDepth: 3
              },
              sugar: {
                rootDir: `${__packageRoot()}/node_modules/@coffeekraken/sugar`,
                dirDepth: 3
              }
            },
            dirDepth: 3,
            filename: 'docMap.json',
            cache: true
          },
          settings
        );

        // let filenamesArray = settings.filename;
        // if (!Array.isArray(filenamesArray)) filenamesArray = [filenamesArray];

        // generate the glob pattern to use
        const patterns = [];

        Object.keys(settings.sources).forEach((sourceName) => {
          const sourceObj = __deepMerge(settings, settings.sources[sourceName]);
          const filenamesArray = !Array.isArray(sourceObj.filename)
            ? [sourceObj.filename]
            : sourceObj.filename;

          const patternObj = {
            rootDir: sourceObj.rootDir,
            patterns: []
          };

          for (let i = 0; i <= sourceObj.dirDepth; i++) {
            filenamesArray.forEach((filename) => {
              const p = `${'*/'.repeat(i)}${filename}`;
              patternObj.patterns.push(p);
            });
          }

          patterns.push(patternObj);
        });

        let files = [];

        for (let i = 0; i < patterns.length; i++) {
          const patternObj = patterns[i];
          const foundFiles = __glob
            .sync(`{${patternObj.patterns.join(',')}}`, {
              cwd: patternObj.rootDir,
              symlinks: true
            })
            .map((filePath) => {
              return __path.resolve(patternObj.rootDir, filePath);
            });
          files = [...files, ...foundFiles];
        }

        files = __unique(files);
        resolve(files);
      },
      {
        id: settings.id + '.find'
      }
    );
  }

  /**
   * @name          read
   * @type          Function
   * @static
   *
   * This static method allows you to search for docMap.json files and read them to get
   * back the content of them in one call. It can take advantage of the cache if
   * the setting.cache property is setted to true
   *
   * @todo      integrate the "cache" feature
   *
   * @param       {Object}        [settings={}]       A settings object to configure your reading process
   * - dirDepth (10) {Integer}: Specify the max directories depth to search for docMap.json files relative to the ```roorDir``` setting
   * - rootDir (__packageRoot()) {String}: Specify the root directory from where to search for docMap.json files
   * - filename ('docMap.json') {String|Array<String>}: Specify the file names to search for
   * - cache (true) {Boolean}: Specify if you want to take advantage of the cache feature or
   * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
   *
   * @since       2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  static read(settings = {}) {
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        settings = __deepMerge(
          {
            id: 'SDocMap'
          },
          settings
        );

        const files = await SDocMap.find(settings);

        let docMapJson = {};

        // loop on all files
        files.forEach((filePath) => {
          const content = require(filePath);

          Object.keys(content).forEach((docMapItemKey) => {
            content[docMapItemKey].path = __path.resolve(
              filePath.split('/').slice(0, -1).join('/'),
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
        id: settings.id + '.read'
      }
    );
  }

  /**
   * @name          scan
   * @type          Function
   *
   * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
   * and extract all the necessary informations to generate the docMap.json file
   *
   * @param         {String|Array<String>}          sources         The glob pattern(s) you want to scan files in
   * @return        {SPromise}                                     A promise resolved once the scan process has been finished
   *
   * @since         2.0.0
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  scan(sources) {
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        if (!Array.isArray(sources)) sources = [sources];

        for (let i = 0; i < sources.length; i++) {
          const source = sources[i];

          // scan for files
          const files = __glob.sync(source);

          // loop on each files to check for docblocks
          for (let j = 0; j < files.length; j++) {
            const filepath = files[j];
            const content = __fs.readFileSync(filepath, 'utf8');

            const docblocks = new __SDocblock(content).toObject();

            if (!docblocks || !docblocks.length) continue;

            docblocks.forEach((docblock) => {
              if (!docblock.namespace) return;
              const path = __path.relative(this._settings.outputDir, filepath);
              const filename = __getFilename(filepath);
              const docblockObj = {
                name: docblock.name,
                namespace: docblock.namespace,
                filename,
                extension: filename.split('.').slice(1)[0],
                relPath: path,
                directory: path.replace(`/${__getFilename(filepath)}`, ''),
                type: docblock.type,
                description: docblock.description
              };
              if (docblock.extends) docblockObj.extends = docblock.extends;
              if (docblock.static) docblockObj.static = true;
              if (docblock.since) docblockObj.since = docblock.since;
              this._entries[
                `${docblock.namespace}.${docblock.name}`
              ] = docblockObj;
            });
          }
        }

        resolve();
      },
      {
        id: this._settings.id + '.scan'
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
   * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  save(output = null) {
    return new __SPromise(
      (resolve, reject, trigger, cancel) => {
        if (!output) {
          output = `${this._settings.outputDir}/${this._settings.filename}`;
        }
        __removeSync(output);
        __fs.writeFileSync(
          output,
          __toString(this._entries, {
            beautify: true
          })
        );
        resolve();
      },
      {
        id: this._settings.id + '.save'
      }
    );
  }
};
