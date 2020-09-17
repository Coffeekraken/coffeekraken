const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __packageRoot = require('../path/packageRoot');
const __glob = require('glob');
const __fs = require('fs');
const __path = require('path');
const __SDocblock = require('../docblock/SDocblock');
const __toString = require('../string/toString');
const __removeSync = require('../fs/removeSync');

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
  _entries = [];

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
    return new __SPromise(async (resolve, reject, trigger, cancel) => {
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

          docblocks.forEach((docblock) => {
            if (!docblock.namespace) return;
            const docblockObj = {
              path: __path.relative(this._settings.outputDir, filepath),
              name: docblock.name,
              namespace: docblock.namespace,
              type: docblock.type,
              description: docblock.description
            };
            this._entries.push(docblockObj);
          });
        }
      }

      resolve();
    });
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
    return new __SPromise((resolve, reject, trigger, cancel) => {
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
    });
  }
};
