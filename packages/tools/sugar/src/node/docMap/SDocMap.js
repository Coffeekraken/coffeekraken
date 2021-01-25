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
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // generate the glob pattern to use
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
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let globs = settings.generate.globs;
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
                    if (!settings.generate.exclude ||
                        settings.generate.exclude === undefined)
                        return true;
                    return !file.path.match(settings.generate.exclude.path);
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
            emit('log', {
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
        return new SPromise_1.default(({ resolve, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            let entries = this._entries;
            if (!this._entries.length) {
                const generatePromise = this.generate(settings);
                pipe(generatePromise);
                entries = yield generatePromise;
            }
            emit('log', {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7QUFFZCxrRUFBNEM7QUFDNUMsbUVBQTZDO0FBQzdDLG9FQUE4QztBQUc5Qyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHNFQUFnRDtBQUVoRCxrRUFBNEM7QUFDNUMsOERBQTJDO0FBRTNDLDBEQUFvQztBQUNwQyw0REFBNEM7QUErQjVDLGlCQUFTLE1BQU0sT0FBUSxTQUFRLGtCQUFVO0lBYXZDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBUSxHQUFHLEVBQUU7UUFDdkIsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsU0FBUztZQUNiLFFBQVEsRUFBRTtnQkFDUixLQUFLLEVBQUUsZUFBYSxDQUFDLHVCQUF1QixDQUFDO2dCQUM3QyxNQUFNLEVBQUUsZUFBYSxDQUFDLHdCQUF3QixDQUFDO2dCQUMvQyxPQUFPLEVBQUUsZUFBYSxDQUFDLHlCQUF5QixDQUFDO2FBQ2xEO1lBQ0QsSUFBSSxFQUFFO2dCQUNKLEtBQUssRUFBRSxlQUFhLENBQUMsbUJBQW1CLENBQUM7Z0JBQ3pDLE9BQU8sRUFBRSxlQUFhLENBQUMscUJBQXFCLENBQUM7YUFDOUM7WUFDRCxLQUFLLEVBQUUsSUFBSTtTQUNaLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQXhDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQUcsRUFBRSxDQUFDO0lBK0JkLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILElBQUksQ0FBQyxRQUFRLEdBQUcsRUFBRTtRQUNoQixRQUFRLEdBQUcsbUJBQVcsQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQztRQUNyRCxPQUFPLElBQUksa0JBQVUsQ0FDbkIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFB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