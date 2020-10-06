const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __packageRoot = require('../path/packageRoot');
const __packageJson = require('../package/json');
const __glob = require('glob');
const __fs = require('fs');
const __path = require('path');
const __unique = require('../array/unique');

/**
 * @name                SFrontspec
 * @namespace           sugar.node.doc
 * @type                Class
 * @extends             SPromise
 *
 * This class represent the ```frontspec.json``` file and allows you to generate it from some sources (glob pattern(s))
 * and save it inside a directory you choose.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your docMap instance:
 * - filename (frontspec.json) {String}: Specify the filename you want
 * - outputDir (packageRoot()) {String}: Specify the directory where you want to save your docMap.json file when using the ```save``` method
 *
 * @todo        update doc
 *
 * @example             js
 * const SFrontspec = require('@coffeekraken/sugar/node/doc/SFrontspec');
 * const frontspec = new SFrontspec({
 *  outputDir: '/my/cool/directory'
 * });
 * const result = await frontspec.read();
 *
 * @since           2.0.0
 * @author 		Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFrontspec extends __SPromise {
  /**
   * @name          _entries
   * @type           Array<Object>
   * @private
   *
   * This store the frontspec.json entries
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
          id: 'SFrontspec',
          filename: 'frontspec.json',
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
   * This static method allows you to search for frontspec.json files and get back the array of pathes where to
   * find the found files
   *
   * @todo      update documentation
   *
   * @param       {Object}        [settings={}]       A settings object to configure your reading process
   * - dirDepth (10) {Integer}: Specify the max directories depth to search for docMap.json files relative to the ```roorDir``` setting
   * - rootDir (__packageRoot()) {String}: Specify the root directory from where to search for docMap.json files
   * - filename ('frontspec.json') {String|Array<String>}: Specify the file names to search for
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
            id: 'SFrontspec',
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
            filename: 'frontspec.json',
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
   * This static method allows you to search for frontspec.json files and read them to get
   * back the content of them in one call. It can take advantage of the cache if
   * the setting.cache property is setted to true
   *
   * @todo      update documentation
   * @todo      integrate the "cache" feature
   *
   * @param       {Object}        [settings={}]       A settings object to configure your reading process
   * - dirDepth (10) {Integer}: Specify the max directories depth to search for frontspec.json files relative to the ```roorDir``` setting
   * - rootDir (__packageRoot()) {String}: Specify the root directory from where to search for frontspec.json files
   * - filename ('frontspec.json') {String|Array<String>}: Specify the file names to search for
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
            id: 'SFrontspec'
          },
          settings
        );

        const files = await SFrontspec.find(settings);

        let frontspecJson = {};

        // loop on all files
        files.forEach((filePath) => {
          const content = require(filePath);

          const packageJson = __packageJson(filePath);
          if (packageJson) {
            if (!content.package) {
              content.package = packageJson;
            }
          }

          const relPath = __path.relative(__packageRoot(), filePath);

          frontspecJson[relPath] = content;
        });

        // return the final docmap
        resolve(frontspecJson);
      },
      {
        id: settings.id + '.read'
      }
    );
  }
};
