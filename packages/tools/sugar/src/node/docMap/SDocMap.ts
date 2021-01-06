// @ts-nocheck

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
import __sugarConfig from '../config/sugar';

/**
 * @name                SDocMap
 * @namespace           sugar.node.doc
 * @type                Class
 * @extends             SPromise
 * @wip
 *
 * This class represent the ```docMap.json``` file and allows you to generate it from some sources (glob pattern(s))
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
export = class SDocMap {
  /**
   * @name          _settings
   * @type          Object
   * @private
   *
   * Store the settings
   *
   * @since       2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  _settings = {};

  /**
   * @name          _entries
   * @type           Array<Object>
   * @private
   *
   * This store the docMap.json entries
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  constructor(settings = {}) {
    this._settings = __deepMerge(
      {
        id: 'SDocMap',
        output: __sugarConfig('docMap.output'),
        findGlobs: __sugarConfig('docMap.findGlobs'),
        inputGlobs: __sugarConfig('docMap.inputGlobs'),
        save: true,
        cache: true,
        exclude: {
          namespace: /#\{.*\}/gm
        }
      },
      settings
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
  find(settings = {}) {
    settings = __deepMerge(this._settings, {}, settings);
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        // generate the glob pattern to use
        const patterns = settings.findGlobs;

        let files = [];

        for (let i = 0; i < patterns.length; i++) {
          const foundedFiles = await __SGlob.resolve(patterns[i]);
          files = [...files, ...foundedFiles];
        }

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
  read(settings = {}) {
    settings = __deepMerge(this._settings, {}, settings);
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        const files = await this.find(settings);

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
        id: settings.id + '.read'
      }
    );
  }

  /**
   * @name          generate
   * @type          Function
   *
   * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
   * and extract all the necessary informations to generate the docMap.json file
   *
   * @param         {String|Array<String>}          sources         The glob pattern(s) you want to scan files in
   * @return        {SPromise}                                     A promise resolved once the scan process has been finished
   *
   * @since         2.0.0
   * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
   */
  generate(settings = {}) {
    settings = __deepMerge(this._settings, {}, settings);
    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        let globs = settings.inputGlobs;
        if (!Array.isArray(globs)) globs = [globs];

        for (let i = 0; i < globs.length; i++) {
          const glob = globs[i];

          // scan for files
          const files = await __SGlob.resolve(glob);

          // console.log(files);

          continue;

          // loop on each files to check for docblocks
          for (let j = 0; j < files.length; j++) {
            const filepath = files[j].path;
            const content = __fs.readFileSync(filepath, 'utf8');

            if (!content) continue;

            const docblocks = new __SDocblock(content).toObject();

            console.log(docblocks);

            if (!docblocks || !docblocks.length) continue;

            docblocks.forEach((docblock) => {
              if (!docblock.namespace) return;

              for (let i = 0; i < Object.keys(settings.exclude); i++) {
                console.log(i);

                const excludeReg =
                  settings.exclude[Object.keys(settings.exclude)[i]];
                const value = docblock[Object.keys(settings.exclude)[i]];
                console.log(excludeReg);
                console.log(value);
                if (value === undefined) continue;
                if (value.match(excludeReg)) return;
              }

              const outputDir = __folderPath(settings.output);
              const path = __path.relative(outputDir, filepath);
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

        // save the file if needed
        if (settings.save === true) {
          __fs.writeFileSync(
            settings.output,
            JSON.stringify(this._entries, null, 4)
          );
        }

        resolve(this._entries);
      },
      {
        id: settings.id + '.generate'
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
  save(outputOrSettings = null, settings = {}) {
    let output;
    if (typeof outputOrSettings === 'object') {
      settings = __deepMerge(this._settings, {}, outputOrSettings);
    } else if (typeof outputOrSettings === 'string') {
      output = outputOrSettings;
    }
    settings = __deepMerge(this._settings, {}, settings);

    return new __SPromise(
      async (resolve, reject, trigger, cancel) => {
        if (!this._entries.length) {
          await this.generate(settings);
        }

        if (!output) {
          output = `${settings.outputDir}/${settings.filename}`;
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
        id: settings.id + '.save'
      }
    );
  }
};
