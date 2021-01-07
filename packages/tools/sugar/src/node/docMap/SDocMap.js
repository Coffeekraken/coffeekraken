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
const removeSync_1 = __importDefault(require("../fs/removeSync"));
const filename_1 = __importDefault(require("../fs/filename"));
const SGlob_1 = __importDefault(require("../glob/SGlob"));
const sugar_1 = __importDefault(require("../config/sugar"));
module.exports = class SDocMap extends SPromise_1.default {
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
        super(deepMerge_1.default({
            id: 'SDocMap',
            generate: {
                globs: sugar_1.default('docMap.generate.globs'),
                output: sugar_1.default('docMap.generate.output'),
                exclude: sugar_1.default('docMap.generate.exclude')
            },
            find: {
                globs: sugar_1.default('docMap.find.globs'),
                exclude: sugar_1.default('docMap.find.exclude')
            },
            cache: true
        }, settings));
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
            const patterns = settings.find.globs;
            let files = [];
            trigger('log', {
                value: `Searching docMaps using globs:\n- <yellow>${patterns.join('</yellow>\n- ')}</yellow>`
            });
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = yield SGlob_1.default.resolve(patterns[i]);
                files = [...files, ...foundedFiles];
            }
            trigger('log', {
                value: `Found <yellow>${files.length}</yellow> docMap file(s):\n- <cyan>${files.join('</cyan>\n- ')}</cyan>`
            });
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
        return new SPromise_1.default((resolve, reject, trigger, cancel, pipe) => __awaiter(this, void 0, void 0, function* () {
            const filesPromise = this.find(settings);
            pipe(filesPromise);
            const files = yield filesPromise;
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
            let globs = settings.generate.globs;
            if (!Array.isArray(globs))
                globs = [globs];
            trigger('log', {
                value: `Searching files to use as docMap sources using globs:\n- <yellow>${globs.join('</yellow>\n- ')}</yellow>`
            });
            for (let i = 0; i < globs.length; i++) {
                const glob = globs[i];
                // scan for files
                let files = yield SGlob_1.default.resolve(glob, {});
                files = files.filter((file) => {
                    if (!settings.generate.exclude ||
                        settings.generate.exclude === undefined)
                        return true;
                    return !file.path.match(settings.generate.exclude.path);
                });
                trigger('log', {
                    value: `<yellow>${files.length}</yellow> file(s) found using the glob "<cyan>${glob}</cyan>"`
                });
                // loop on each files to check for docblocks
                for (let j = 0; j < files.length; j++) {
                    const filepath = files[j].path;
                    const content = fs_1.default.readFileSync(filepath, 'utf8');
                    if (!content)
                        continue;
                    const docblocks = new SDocblock_1.default(content).toObject();
                    if (!docblocks || !docblocks.length)
                        continue;
                    docblocks.forEach((docblock) => {
                        if (!docblock.namespace)
                            return;
                        for (let i = 0; i < Object.keys(settings.generate.exclude); i++) {
                            const excludeReg = settings.generate.exclude[Object.keys(settings.generate.exclude)[i]];
                            const value = docblock[Object.keys(settings.generate.exclude)[i]];
                            if (value === undefined)
                                continue;
                            if (value.match(excludeReg))
                                return;
                        }
                        const outputDir = folderPath_1.default(settings.generate.output);
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
            trigger('log', {
                value: `<green>${Object.keys(this._entries).length}</green> entries generated for this docMap`
            });
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
            output = settings.generate.output;
        }
        else if (typeof outputOrSettings === 'string') {
            output = outputOrSettings;
        }
        settings = deepMerge_1.default(this._settings, {}, settings);
        return new SPromise_1.default((resolve, reject, trigger, cancel, pipe) => __awaiter(this, void 0, void 0, function* () {
            let entries = this._entries;
            if (!this._entries.length) {
                const generatePromise = this.generate(settings);
                pipe(generatePromise);
                entries = yield generatePromise;
            }
            trigger('log', {
                value: `Saving the docMap file to "<cyan>${output}</cyan>"`
            });
            removeSync_1.default(output);
            fs_1.default.writeFileSync(output, JSON.stringify(entries, null, 4));
            resolve(entries);
        }), {
            id: settings.id + '.save'
        });
    }
};
//# sourceMappingURL=SDocMap.js.map