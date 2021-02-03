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
var _a;
const folderPath_1 = __importDefault(require("../fs/folderPath"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const packageRoot_1 = __importDefault(require("../path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SDocblock_1 = __importDefault(require("../docblock/SDocblock"));
const removeSync_1 = __importDefault(require("../fs/removeSync"));
const filename_1 = __importDefault(require("../fs/filename"));
const SGlob_1 = __importDefault(require("../glob/SGlob"));
const SClass_1 = __importDefault(require("../class/SClass"));
const SDocMapSettingsInterface_1 = __importDefault(require("./interface/SDocMapSettingsInterface"));
module.exports = (_a = class SDocMap extends SClass_1.default {
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
                id: 'SDocMap'
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
            return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                // build the glob pattern to use
                const patterns = settings.find.globs;
                let files = [];
                emit('log', {
                    value: `Searching docMaps using globs:\n- <yellow>${patterns.join('</yellow>\n- ')}</yellow>`
                });
                for (let i = 0; i < patterns.length; i++) {
                    const foundedFiles = yield SGlob_1.default.resolve(patterns[i]);
                    files = [...files, ...foundedFiles];
                }
                emit('log', {
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
            return new SPromise_1.default(({ resolve, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
        build(settings = {}) {
            settings = deepMerge_1.default(this._settings, {}, settings);
            return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
                let globs = settings.build.globs;
                if (!Array.isArray(globs))
                    globs = [globs];
                emit('log', {
                    value: `Searching files to use as docMap sources using globs:\n- <yellow>${globs.join('</yellow>\n- ')}</yellow>`
                });
                for (let i = 0; i < globs.length; i++) {
                    const glob = globs[i];
                    // scan for files
                    let files = yield SGlob_1.default.resolve(glob, {});
                    files = files.filter((file) => {
                        if (!settings.build.exclude || settings.build.exclude === undefined)
                            return true;
                        return !file.path.match(settings.build.exclude.path);
                    });
                    emit('log', {
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
                            for (let i = 0; i < Object.keys(settings.build.exclude); i++) {
                                const excludeReg = settings.build.exclude[Object.keys(settings.build.exclude)[i]];
                                const value = docblock[Object.keys(settings.build.exclude)[i]];
                                if (value === undefined)
                                    continue;
                                if (value.match(excludeReg))
                                    return;
                            }
                            const outputDir = folderPath_1.default(settings.build.output);
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
                emit('log', {
                    value: `<green>${Object.keys(this._entries).length}</green> entries buildd for this docMap`
                });
                resolve(this._entries);
            }), {
                id: settings.id + '.build'
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
                output = settings.build.output;
            }
            else if (typeof outputOrSettings === 'string') {
                output = outputOrSettings;
            }
            settings = deepMerge_1.default(this._settings, {}, settings);
            return new SPromise_1.default(({ resolve, emit, pipe, pipeFrom }) => __awaiter(this, void 0, void 0, function* () {
                let entries = this._entries;
                if (!this._entries.length) {
                    const buildPromise = this.build(settings);
                    pipe(buildPromise);
                    entries = yield buildPromise;
                }
                emit('log', {
                    value: `Saving the docMap file to "<cyan>${output.replace(`${packageRoot_1.default()}/`, '')}</cyan>"`
                });
                removeSync_1.default(output);
                fs_1.default.writeFileSync(output, JSON.stringify(entries, null, 4));
                resolve(entries);
            }), {
                id: settings.id + '.save'
            });
        }
    },
    _a.interfaces = {
        settings: {
            apply: true,
            class: SDocMapSettingsInterface_1.default
        }
    },
    _a);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsa0VBQTRDO0FBQzVDLG1FQUE2QztBQUM3QyxvRUFBOEM7QUFDOUMsc0VBQWdEO0FBRWhELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsc0VBQWdEO0FBRWhELGtFQUE0QztBQUM1Qyw4REFBMkM7QUFFM0MsMERBQW9DO0FBQ3BDLDZEQUF1QztBQUV2QyxvR0FBOEU7QUFnQzlFLHVCQUFTLE1BQU0sT0FBUSxTQUFRLGdCQUFRO1FBb0JyQzs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1lBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLEVBQUUsRUFBRSxTQUFTO2FBQ2QsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1lBOUJKOzs7Ozs7Ozs7ZUFTRztZQUNILGFBQVEsR0FBRyxFQUFFLENBQUM7UUFxQmQsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7OztXQWNHO1FBQ0gsSUFBSSxDQUFDLFFBQVEsR0FBRyxFQUFFO1lBQ2hCLFFBQVEsR0FBRyxtQkFBVyxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDO1lBQ3JELE9BQU8sSUFBSSxrQkFBVSxDQUNuQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO2dCQUNsQyxnQ0FBZ0M7Z0JBQ2hDLE1BQU0sUUFBUSxHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDO2dCQUVyQyxJQUFJLEtBQUssR0FBRyxFQUFFLENBQUM7Z0JBRWYsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsNkNBQTZDLFFBQVEsQ0FBQyxJQUFJLENBQy9ELGVBQWUsQ0FDaEIsV0FBVztpQkFDYixDQUFDLENBQUM7Z0JBRUgsS0FB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