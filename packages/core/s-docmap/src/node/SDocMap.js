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
const rootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/rootDir"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const SGlob_1 = __importDefault(require("@coffeekraken/sugar/node/glob/SGlob"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
const SDocMapFindParamsInterface_1 = __importDefault(require("./interface/SDocMapFindParamsInterface"));
const SDocMapGenerateParamsInterface_1 = __importDefault(require("./interface/SDocMapGenerateParamsInterface"));
class SDocMap extends s_class_1.default {
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
            metas: {
                id: 'SDocMap'
            }
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
        this._cache = new s_cache_1.default(`SDocMap-${this.metas.id}`);
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
     * @param       {Object}        [settings={}]       A settings object to override the instance level ones
     * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    find(params) {
        const findParams = (deepMerge_1.default(SDocMapFindParamsInterface_1.default.defaults(), params || {}));
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // build the glob pattern to use
            const patterns = findParams.globs || [];
            if (findParams.cache) {
                const cachedValue = yield this._cache.get('find-files');
                if (cachedValue) {
                    emit('log', {
                        value: `<yellow>[${this.constructor.name}]</yellow> docmap.json file(s) getted from cache`
                    });
                    return resolve(cachedValue);
                }
            }
            let files = [];
            yield wait_1.default(1);
            const searchStrArray = ['Searching docmaps using globs:'];
            patterns.forEach((pat) => {
                searchStrArray.push(`- <yellow>${pat}</yellow>`);
            });
            emit('log', {
                value: searchStrArray.join('\n')
            });
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = yield SGlob_1.default.resolve(patterns[i]);
                files = [...files, ...foundedFiles];
            }
            const findedStrArray = [
                `Found <yellow>${files.length}</yellow> docmap file(s):`
            ];
            files.forEach((file) => {
                findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
            });
            emit('log', {
                value: findedStrArray.join('\n')
            });
            // save in cache if asked
            if (findParams.cache) {
                emit('log', {
                    value: `<yellow>[${this.constructor.name}]</yellow> updating cache with found file(s)`
                });
                yield this._cache.set('find-files', files.map((file) => file.toObject()));
            }
            resolve(files);
        }));
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
     * @param       {Object}        [settings={}]       A settings object to override the instance level ones
     * @return      {SPromise}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read(params) {
        return new s_promise_1.default(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            const filesPromise = this.find(params);
            pipe(filesPromise);
            const files = yield filesPromise;
            let docMapJson = {};
            // loop on all files
            files.forEach((file) => {
                const content = file.content;
                Object.keys(content).forEach((docMapItemKey) => {
                    const itemObj = content[docMapItemKey];
                    itemObj.path = path_1.default.resolve(file.dirPath, content[docMapItemKey].relPath);
                });
                docMapJson = Object.assign(Object.assign({}, docMapJson), content);
            });
            // emit('log', {
            //   value: __toString(docMapJson)
            // });
            // return the final docmap
            resolve(docMapJson);
        }));
    }
    /**
     * @name          generate
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
    generate(params) {
        const generateParams = (deepMerge_1.default(SDocMapGenerateParamsInterface_1.default.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            let globs = generateParams.globs || [];
            if (!Array.isArray(globs))
                globs = [globs];
            emit('notification', {
                message: `${this.metas.id} generation started`
            });
            emit('log', {
                value: `Searching files to use as docmap sources using globs:\n- <yellow>${globs.join('</yellow>\n- ')}</yellow>`
            });
            const pool = pool_1.default(globs, {
                watch: generateParams.watch,
                exclude: generateParams.exclude
            });
            pool.on(generateParams.watch ? 'update' : 'files', (files) => {
                files = Array.isArray(files) ? files : [files];
                emit('log', {
                    value: `<yellow>${files.length}</yellow> file(s) found using the glob "<cyan>${globs.join(',')}</cyan>"`
                });
                // loop on each files to check for docblocks
                for (let j = 0; j < files.length; j++) {
                    const filepath = files[j].path;
                    const content = fs_1.default.readFileSync(filepath, 'utf8');
                    if (!content)
                        continue;
                    const docblocks = new s_docblock_1.default(content).toObject();
                    if (!docblocks || !docblocks.length)
                        continue;
                    let docblockObj = {};
                    const children = {};
                    docblocks.forEach((docblock) => {
                        for (let i = 0; 
                        // @ts-ignore
                        i < Object.keys(generateParams.filters).length; i++) {
                            const filterReg = 
                            // @ts-ignore
                            generateParams.filters[Object.keys(generateParams.filters)[i]];
                            // @ts-ignore
                            const value = docblock[Object.keys(generateParams.filters)[i]];
                            if (value === undefined)
                                continue;
                            if (value.match(filterReg))
                                return;
                        }
                        if (docblock.name && docblock.name.slice(0, 1) === '_')
                            return;
                        if (docblock.private)
                            return;
                        // const path = __path.relative(outputDir, filepath);
                        const filename = filename_1.default(filepath);
                        let docblockEntryObj = {};
                        generateParams.fields.forEach((field) => {
                            if (docblock[field] === undefined)
                                return;
                            docblockEntryObj[field] = docblock[field];
                        });
                        if (docblock.namespace) {
                            docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: path_1.default.relative(packageRoot_1.default(), filepath) });
                            this._entries[`${docblock.namespace}.${docblock.name}`] = docblockObj;
                        }
                        else if (docblock.name) {
                            children[docblock.name] = docblockEntryObj;
                        }
                    });
                    docblockObj.children = children;
                }
                emit('log', {
                    value: `<green>${Object.keys(this._entries).length}</green> entries gathered for this docMap`
                });
                emit('notification', {
                    type: 'success',
                    message: `${this.metas.id} build success`
                });
                if (generateParams.save) {
                    emit('log', {
                        value: `<yellow>[save]</yellow> File "<cyan>${generateParams.outPath.replace(rootDir_1.default() + '/', '')}</cyan>"`
                    });
                    fs_1.default.writeFileSync(generateParams.outPath, JSON.stringify(this._entries, null, 4));
                }
                if (generateParams.watch) {
                    emit('log', {
                        value: '<blue>[watch]</blue> Watching for changes...'
                    });
                }
                resolve(this._entries);
            });
            if (generateParams.watch) {
                emit('log', {
                    value: '<blue>[watch]</blue> Watching for changes...'
                });
            }
        }));
    }
}
SDocMap.interfaces = {};
exports.default = SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRkFBOEQ7QUFFOUQsd0VBQWlEO0FBQ2pELDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFFdEUsNENBQXNCO0FBQ3RCLGdEQUEwQjtBQUMxQiw0RUFBd0Q7QUFDeEQsMEVBQW1EO0FBR25ELG9GQUFpRTtBQUVqRSxnRkFBMEQ7QUFDMUQsb0VBQTZDO0FBRTdDLGdGQUEwRDtBQUkxRCxvRUFBNkM7QUFDN0Msd0dBQWtGO0FBQ2xGLGdIQUEwRjtBQTZFMUYsTUFBTSxPQUFRLFNBQVEsaUJBQVE7SUEyQjVCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0M7UUFDbEQsS0FBSyxDQUNILG1CQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFNBQVM7YUFDZDtTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUE1Q0o7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFvQixFQUFFLENBQUM7UUFvQzdCLGlCQUFpQjtRQUNqQixJQUFJLENBQUMsTUFBTSxHQUFHLElBQUksaUJBQVEsQ0FBQyxXQUFXLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFLENBQUMsQ0FBQztJQUN6RCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0csVUFBVTs7WUFDZCxPQUFPLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxLQUFLLEVBQUUsQ0FBQztRQUNuQyxDQUFDO0tBQUE7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILElBQUksQ0FBQyxNQUFvQztRQUN2QyxNQUFNLFVBQVUsR0FBdUIsQ0FDckMsbUJBQVcsQ0FBQyxvQ0FBNEIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLElBQUksRUFBRSxDQUFDLENBQ25FLENBQUM7UUFFRixPQUFPLElBQUksbUJBQVUsQ0FBQyxDQUFP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