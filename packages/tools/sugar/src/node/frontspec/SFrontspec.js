"use strict";
const __copy = require('../clipboard/copy');
const __SPromise = require('../promise/SPromise');
const __deepMerge = require('../object/deepMerge');
const __packageRoot = require('../path/packageRoot');
const __packageJson = require('../package/json');
const __glob = require('glob');
const __toString = require('../string/toString');
const __fs = require('fs');
const __path = require('path');
const __unique = require('../array/unique');
const __sugarConfig = require('../config/sugar');
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
 *
 * @setting       {String}      [filename='frontspec.json']       Specify the filename you want
 * @setting       {String}      [outputDir=packageRoot()]         Specify the directory where you want to save your docMap.json file when using the ```save``` method
 * @setting       {Integer}     [dirDepth=3]                      Specify the maximum directories the scan will go down
 * @setting       {Boolean}     [cache=false]                     Specify if you want to take advantage of some cache or not
 * @setting       {Object}      [sources={}                       Specify some sources folders where the scan process will go search for frontspec.json files
 * @setting       {String}      [sources.[name].rootDir=__packageRoot()]     Specify the directory where to go search from
 * @setting       {Integer}     [sources.[name].dirDepth=3]                  Specify the maximum directories the scan will go down
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
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
module.exports = class SFrontspec extends __SPromise {
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
        super(__deepMerge({
            id: 'SFrontspec',
            search: __sugarConfig('build.frontspec.search'),
            filename: __sugarConfig('build.frontspec.filename'),
            outputDir: __sugarConfig('build.frontspec.outputDir'),
            dirDepth: __sugarConfig('build.frontspec.dirDepth'),
            cache: __sugarConfig('build.frontspec.cache'),
            sources: __sugarConfig('build.frontspec.sources')
        }, settings));
        /**
         * @name          _entries
         * @type           Array<Object>
         * @private
         *
         * This store the frontspec.json entries
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._entries = {};
    }
    /**
     * @name          search
     * @type          Function
     *
     * This method allows you to search for frontspec.json files and get back the array of pathes where to
     * find the found files
     *
     * @todo      update documentation
     *
     * @param       {Object}        [settings={}]       A settings object to configure your reading process
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    search(settings = {}) {
        return new __SPromise((resolve, reject, trigger, cancel) => {
            settings = __deepMerge(this._settings, {}, settings);
            // let filenamesArray = settings.filename;
            // if (!Array.isArray(filenamesArray)) filenamesArray = [filenamesArray];
            // generate the glob pattern to use
            const patterns = [];
            Object.keys(settings.sources).forEach((sourceName) => {
                const sourceObj = __deepMerge(settings, settings.sources[sourceName]);
                const filenamesArray = !Array.isArray(sourceObj.search)
                    ? [sourceObj.search]
                    : sourceObj.search;
                const patternObj = {
                    rootDir: sourceObj.rootDir,
                    patterns: []
                };
                for (let i = 0; i <= (sourceObj.dirDepth || settings.dirDepth); i++) {
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
        }, {
            id: settings.id + '.find'
        });
    }
    /**
     * @name					json
     * @type 					Function
     *
     * Generate the frontspec JSON by searching for "childs" one as well as generating the "root" one
     * stored at the root of your package.
     *
     * @param       {Object}        [settings={}]         A setting object to override the instance ones passed in the constructor
     * @return      {SPromise}                            An SPromise instance that will be resolved with the frontspec JSON once jsond
     *
     * @since 					2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    json(settings = {}) {
        settings = __deepMerge(this._settings, {}, settings);
        return new __SPromise(async (resolve, reject, trigger, cancel) => {
            try {
                // initiating the frontspecJson object
                const packageJson = __packageJson();
                delete packageJson.dependencies;
                delete packageJson.devDependencies;
                delete packageJson.scripts;
                let frontspecJson = {
                    package: packageJson,
                    children: {}
                };
                // search for files
                const files = await this.search(settings);
                if (!files)
                    resolve(frontspecJson);
                const rootFilePath = `${__packageRoot()}/${settings.filename}`;
                if (files.indexOf(rootFilePath) !== -1) {
                    frontspecJson = require(rootFilePath);
                    frontspecJson.package = __packageJson();
                    frontspecJson.children = {};
                }
                files.forEach((filePath) => {
                    // checking if it's the root one
                    if (filePath !== rootFilePath) {
                        // build the relative path to the package
                        let relPath = __path.relative(__packageRoot(), filePath);
                        const outPath = __path.relative(__packageRoot(), `${this._settings.outputDir}/${this._settings.filename}`);
                        // if the founded file is the same as the output one
                        if (relPath === outPath)
                            return;
                        // reading the file
                        const content = require(filePath);
                        // relPath = relPath
                        //   .replace(`/${settings.filename}`, '')
                        //   .replace(settings.filename, '');
                        // save the child frontspec
                        frontspecJson.children[relPath] = content;
                    }
                });
                // resolve the frontspec Json
                resolve(frontspecJson);
            }
            catch (e) {
                reject(e.toString());
            }
        }, {
            id: settings.id + '.json'
        });
    }
};
