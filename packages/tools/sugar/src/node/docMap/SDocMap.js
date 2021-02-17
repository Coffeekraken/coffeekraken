"use strict";
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
Object.defineProperty(exports, "__esModule", { value: true });
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
const wait_1 = __importDefault(require("../time/wait"));
const clone_1 = __importDefault(require("../object/clone"));
const writeFileSync_1 = __importDefault(require("../fs/writeFileSync"));
const SCache_1 = __importDefault(require("../cache/SCache"));
class SDocMap extends SClass_1.default {
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
    constructor(settings) {
        super(deepMerge_1.default({
            id: 'SDocMap',
            docMap: {}
        }, settings || {}));
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
        this._entries = {};
        // init the cache
        this._cache = new SCache_1.default('SDocMap');
    }
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
    get docMapSettings() {
        return this._settings.docMap;
    }
    /**
     * @name          clearCache
     * @type          Function
     * @async
     *
     * Clear the cached values
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    clearCache() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this._cache.clear();
        });
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
    find(settings) {
        const findSettings = (deepMerge_1.default(this.docMapSettings.find, settings || {}));
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // build the glob pattern to use
            const patterns = findSettings.globs || [];
            if (this.docMapSettings.cache) {
                const cachedValue = yield this._cache.get('find-files');
                if (cachedValue) {
                    return resolve(cachedValue);
                }
            }
            let files = [];
            yield wait_1.default(1);
            const searchStrArray = ['Searching docMaps using globs:'];
            patterns.forEach((pat) => {
                searchStrArray.push(`- <yellow>${pat}</yellow>`);
            });
            emit('log', {
                value: searchStrArray.join('\n')
            });
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = (yield SGlob_1.default.resolve(patterns[i]));
                files = [...files, ...foundedFiles];
            }
            const findedStrArray = [
                `Found <yellow>${files.length}</yellow> docMap file(s):`
            ];
            files.forEach((file) => {
                findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
            });
            emit('log', {
                value: findedStrArray.join('\n')
            });
            // save in cache if asked
            if (this.docMapSettings.cache) {
                yield this._cache.set('find-files', files.map((file) => file.toObject()));
            }
            resolve(files);
        }), {
            id: this.id + '.find'
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
    read(settings) {
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
            id: this.id + '.read'
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
    build(settings) {
        const buildSettings = (deepMerge_1.default(this.docMapSettings.build, settings));
        return new SPromise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let globs = buildSettings.globs || [];
            if (!Array.isArray(globs))
                globs = [globs];
            emit('notification', {
                message: `${this.id} build started`
            });
            emit('log', {
                value: `Searching files to use as docMap sources using globs:\n- <yellow>${globs.join('</yellow>\n- ')}</yellow>`
            });
            for (let i = 0; i < globs.length; i++) {
                const glob = globs[i];
                // scan for files
                let files = yield SGlob_1.default.resolve(glob, {});
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
                    const content = fs_1.default.readFileSync(filepath, 'utf8');
                    if (!content)
                        continue;
                    const docblocks = new SDocblock_1.default(content).toObject();
                    if (!docblocks || !docblocks.length)
                        continue;
                    let docblockObj = {};
                    const children = {};
                    docblocks.forEach((docblock) => {
                        for (let i = 0; 
                        // @todo    {Clean}   remove ts-ignore
                        // @ts-ignore
                        i < Object.keys(buildSettings.exclude).length; i++) {
                            const excludeReg = 
                            // @todo    {Clean}   remove ts-ignore
                            // @ts-ignore
                            buildSettings.exclude[Object.keys(buildSettings.exclude)[i]];
                            // @todo    {Clean}   remove ts-ignore
                            // @ts-ignore
                            const value = docblock[Object.keys(buildSettings.exclude)[i]];
                            if (value === undefined)
                                continue;
                            if (value.match(excludeReg))
                                return;
                        }
                        if (docblock.name && docblock.name.slice(0, 1) === '_')
                            return;
                        if (docblock.private)
                            return;
                        // const path = __path.relative(outputDir, filepath);
                        const filename = filename_1.default(filepath);
                        let docblockEntryObj = {
                            name: docblock.name,
                            type: docblock.type,
                            description: docblock.description
                        };
                        if (docblock.namespace)
                            docblockEntryObj.namespace = docblock.namespace;
                        if (docblock.extends)
                            docblockEntryObj.extends = docblock.extends;
                        if (docblock.status)
                            docblockEntryObj.status = docblock.status;
                        if (docblock.static)
                            docblockEntryObj.static = true;
                        if (docblock.since)
                            docblockEntryObj.since = docblock.since;
                        if (docblock.namespace) {
                            docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { __fullPath: filepath, // this property will be used in the save method to generate the correct pathes relative to this
                                filename, extension: filename.split('.').slice(1)[0], path: path_1.default.relative(packageRoot_1.default(), filepath), directory: path_1.default
                                    .relative(packageRoot_1.default(), filepath)
                                    .replace(`/${filename_1.default(filepath)}`, '') });
                            this._entries[`${docblock.namespace}.${docblock.name}`] = docblockObj;
                        }
                        else {
                            children[docblock.name] = docblockEntryObj;
                        }
                    });
                    docblockObj.children = children;
                }
            }
            emit('log', {
                value: `<green>${Object.keys(this._entries).length}</green> entries gathered for this docMap`
            });
            emit('notification', {
                type: 'success',
                message: `${this.id} build success`
            });
            resolve(this._entries);
        }), {
            id: this.id + '.build'
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
    save(outputOrSettings, settings) {
        let output, saveSettings;
        if (typeof outputOrSettings === 'string') {
            output = outputOrSettings;
            saveSettings = this.docMapSettings.save;
        }
        else {
            saveSettings = (deepMerge_1.default(this.docMapSettings.save, outputOrSettings));
            output = saveSettings.path;
        }
        const outputDir = output.replace(`/${filename_1.default(output)}`, '');
        return new SPromise_1.default(({ resolve, emit, pipe, pipeFrom }) => {
            let entries = clone_1.default(this._entries, { deep: true });
            emit('log', {
                value: `Saving the docMap file to "<cyan>${output.replace(`${packageRoot_1.default()}/`, '')}</cyan>"`
            });
            // add relPath and directory property depending on the output
            Object.keys(entries).forEach((namespace) => {
                const obj = entries[namespace];
                // @ts-ignore
                const relPath = path_1.default.relative(outputDir, obj.__fullPath);
                const relDirectory = relPath.replace(`/${filename_1.default(relPath)}`, '');
                obj.relPath = relPath;
                obj.relDirectory = relDirectory;
                // @ts-ignore
                delete obj.__fullPath;
            });
            removeSync_1.default(output);
            writeFileSync_1.default(output, JSON.stringify(entries, null, 4));
            emit('log', {
                value: `<green>[save]</green> DocMap file "<yellow>${filename_1.default(output)}</yellow>" <green>saved successfully</green> under "<cyan>${output}</cyan>"`
            });
            resolve(entries);
        }, {
            id: this.id + '.save'
        });
    }
}
SDocMap.interfaces = {
    settings: {
        apply: true,
        on: '_settings.docMap',
        class: SDocMapSettingsInterface_1.default
    }
};
exports.default = SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFDQSxtRUFBNkM7QUFDN0Msb0VBQThDO0FBQzlDLHNFQUFnRDtBQUVoRCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLHNFQUFnRDtBQUVoRCxrRUFBNEM7QUFDNUMsOERBQTJDO0FBRTNDLDBEQUFvQztBQUNwQyw2REFBdUM7QUFFdkMsb0dBQThFO0FBQzlFLHdEQUFrQztBQUVsQyw0REFBc0M7QUFDdEMsd0VBQWtEO0FBQ2xELDZEQUF1QztBQW1GdkMsTUFBTSxPQUFRLFNBQVEsZ0JBQVE7SUErQzVCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBOEI7UUFDeEMsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxFQUFFLEVBQUUsU0FBUztZQUNiLE1BQU0sRUFBRSxFQUFFO1NBQ1gsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQXpESjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQW9CLEVBQUUsQ0FBQztRQWlEN0IsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxnQkFBUSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQ3hDLENBQUM7SUFyQ0Q7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxjQUFjO1FBQ2hCLE9BQWEsSUFBSSxDQUFDLFNBQVUsQ0FBQyxNQUFNLENBQUM7SUFDdEMsQ0FBQztJQTJCRDs7Ozs7Ozs7O09BU0c7SUFDRyxVQUFVOztZQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsSUFBSSxDQUFDLFFBQXdDO1FBQzNDLE1BQU0sWUFBWSxHQUF5QixDQUN6QyxtQkFBVyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxFQUFFLFFB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