"use strict";
// @ts-nocheck
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const folderPath_1 = __importDefault(require("../fs/folderPath"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SDocblock_1 = __importDefault(require("../docblock/SDocblock"));
const toString_1 = __importDefault(require("../string/toString"));
const removeSync_1 = __importDefault(require("../fs/removeSync"));
const filename_1 = __importDefault(require("../fs/filename"));
const SGlob_1 = __importDefault(require("../glob/SGlob"));
const sugar_1 = __importDefault(require("../config/sugar"));
module.exports = class SDocMap {
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
        this._settings = {};
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
        this._entries = {};
        this._settings = deepMerge_1.default({
            id: 'SDocMap',
            output: sugar_1.default('docMap.output'),
            findGlobs: sugar_1.default('docMap.findGlobs'),
            inputGlobs: sugar_1.default('docMap.inputGlobs'),
            save: true,
            cache: true,
            exclude: {
                namespace: /#\{.*\}/gm
            }
        }, settings);
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
        settings = deepMerge_1.default(this._settings, {}, settings);
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
            // generate the glob pattern to use
            const patterns = settings.findGlobs;
            let files = [];
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = yield SGlob_1.default.resolve(patterns[i]);
                files = [...files, ...foundedFiles];
            }
            resolve(files);
        }), {
            id: settings.id + '.find'
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
     * @param       {Object}        [settings={}]       A settings object to override the instance level ones
     * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read(settings = {}) {
        settings = deepMerge_1.default(this._settings, {}, settings);
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
            const files = yield this.find(settings);
            let docMapJson = {};
            // loop on all files
            files.forEach((file) => {
                const content = JSON.parse(fs_1.default.readFileSync(file.path, 'utf8'));
                Object.keys(content).forEach((docMapItemKey) => {
                    content[docMapItemKey].path = path_1.default.resolve(file.path.split('/').slice(0, -1).join('/'), content[docMapItemKey].relPath);
                });
                docMapJson = Object.assign(Object.assign({}, docMapJson), content);
            });
            // return the final docmap
            resolve(docMapJson);
        }), {
            id: settings.id + '.read'
        });
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
        settings = deepMerge_1.default(this._settings, {}, settings);
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
            let globs = settings.inputGlobs;
            if (!Array.isArray(globs))
                globs = [globs];
            for (let i = 0; i < globs.length; i++) {
                const glob = globs[i];
                // scan for files
                const files = yield SGlob_1.default.resolve(glob);
                // console.log(files);
                continue;
                // loop on each files to check for docblocks
                for (let j = 0; j < files.length; j++) {
                    const filepath = files[j].path;
                    const content = fs_1.default.readFileSync(filepath, 'utf8');
                    if (!content)
                        continue;
                    const docblocks = new SDocblock_1.default(content).toObject();
                    console.log(docblocks);
                    if (!docblocks || !docblocks.length)
                        continue;
                    docblocks.forEach((docblock) => {
                        if (!docblock.namespace)
                            return;
                        for (let i = 0; i < Object.keys(settings.exclude); i++) {
                            console.log(i);
                            const excludeReg = settings.exclude[Object.keys(settings.exclude)[i]];
                            const value = docblock[Object.keys(settings.exclude)[i]];
                            console.log(excludeReg);
                            console.log(value);
                            if (value === undefined)
                                continue;
                            if (value.match(excludeReg))
                                return;
                        }
                        const outputDir = folderPath_1.default(settings.output);
                        const path = path_1.default.relative(outputDir, filepath);
                        const filename = filename_1.default(filepath);
                        const docblockObj = {
                            name: docblock.name,
                            namespace: docblock.namespace,
                            filename,
                            extension: filename.split('.').slice(1)[0],
                            relPath: path,
                            directory: path.replace(`/${filename_1.default(filepath)}`, ''),
                            type: docblock.type,
                            description: docblock.description
                        };
                        if (docblock.extends)
                            docblockObj.extends = docblock.extends;
                        if (docblock.static)
                            docblockObj.static = true;
                        if (docblock.since)
                            docblockObj.since = docblock.since;
                        this._entries[`${docblock.namespace}.${docblock.name}`] = docblockObj;
                    });
                }
            }
            // save the file if needed
            if (settings.save === true) {
                fs_1.default.writeFileSync(settings.output, JSON.stringify(this._entries, null, 4));
            }
            resolve(this._entries);
        }), {
            id: settings.id + '.generate'
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    save(outputOrSettings = null, settings = {}) {
        let output;
        if (typeof outputOrSettings === 'object') {
            settings = deepMerge_1.default(this._settings, {}, outputOrSettings);
        }
        else if (typeof outputOrSettings === 'string') {
            output = outputOrSettings;
        }
        settings = deepMerge_1.default(this._settings, {}, settings);
        return new SPromise_1.default((resolve, reject, trigger, cancel) => __awaiter(this, void 0, void 0, function* () {
            if (!this._entries.length) {
                yield this.generate(settings);
            }
            if (!output) {
                output = `${settings.outputDir}/${settings.filename}`;
            }
            removeSync_1.default(output);
            fs_1.default.writeFileSync(output, toString_1.default(this._entries, {
                beautify: true
            }));
            resolve();
        }), {
            id: settings.id + '.save'
        });
    }
};
//# sourceMappingURL=SDocMap.js.map