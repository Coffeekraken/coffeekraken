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
const s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const pool_1 = __importDefault(require("@coffeekraken/sugar/node/fs/pool"));
const SGlob_1 = __importDefault(require("@coffeekraken/sugar/node/glob/SGlob"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const rootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/rootDir"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SDocMapFindParamsInterface_1 = __importDefault(require("./interface/SDocMapFindParamsInterface"));
const SDocMapGenerateParamsInterface_1 = __importDefault(require("./interface/SDocMapGenerateParamsInterface"));
const json_1 = __importDefault(require("@coffeekraken/sugar/node/package/json"));
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
        this._cache = new s_cache_1.default(this.metas.id === 'SDocMap' ? this.metas.id : `SDocMap-${this.metas.id}`);
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
            if (findParams.clearCache) {
                emit('log', {
                    group: `s-docmap-${this.metas.id}`,
                    value: '<yellow>[cache]</yellow> Clearing the cache...'
                });
                yield this.clearCache();
            }
            // if (findParams.cache && !findParams.clearCache) {
            //   const cachedValue = await this._cache.get('find-files');
            //   if (cachedValue) {
            //     emit('log', {
            //       value: `<yellow>[${this.constructor.name}]</yellow> docmap.json file(s) getted from cache`
            //     });
            //     cachedValue.forEach((fileObj) => {
            //       emit('log', {
            //         value: `- <cyan>${__path.relative(
            //           process.cwd(),
            //           fileObj.path
            //         )}</cyan>`
            //       });
            //     });
            //     return resolve(cachedValue);
            //   }
            // }
            let files = [];
            yield wait_1.default(1);
            const searchStrArray = ['Searching docmaps using globs:'];
            patterns.forEach((pat) => {
                searchStrArray.push(`- <yellow>${pat}</yellow>`);
            });
            emit('log', {
                group: `s-docmap-${this.metas.id}`,
                value: searchStrArray.join('\n')
            });
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = yield SGlob_1.default.resolve(patterns[i]);
                files = [...files, ...foundedFiles];
            }
            files = files.filter((file) => {
                if (!fs_1.default.existsSync(`${file.dirPath}/package.json`))
                    return false;
                return true;
            });
            const findedStrArray = [
                `Found <yellow>${files.length}</yellow> docmap file(s):`
            ];
            files.forEach((file) => {
                findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
            });
            emit('log', {
                group: `s-docmap-${this.metas.id}`,
                value: findedStrArray.join('\n')
            });
            // save in cache if asked
            // if (findParams.cache) {
            //   emit('log', {
            //     value: `<yellow>[${this.constructor.name}]</yellow> updating cache with found file(s)`
            //   });
            //   await this._cache.set(
            //     'find-files',
            //     files.map((file) => file.toObject())
            //   );
            // }
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
            const set = deepMerge_1.default({
                path: `${packageRoot_1.default()}/docmap.json`
            }, params !== null && params !== void 0 ? params : {});
            if (!fs_1.default.existsSync(set.path)) {
                throw new Error(`<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${set.path}</cyan>" does not exists...`);
            }
            const rootPath = set.path.replace(/\/docmap\.json/, '');
            let finalDocmapJson = {};
            const extendedPackages = [];
            function loadJson(path) {
                var _a;
                let docMapJson;
                let docmapJsonPath = path.match(/docmap\.json$/)
                    ? path
                    : `${path}/docmap.json`;
                try {
                    docMapJson = require(docmapJsonPath);
                }
                catch (e) { }
                const rootModulePath = require
                    .resolve(docmapJsonPath)
                    .replace(/\/docmap\.json/, '');
                Object.keys(docMapJson.map).forEach((namespace) => {
                    const docmapObj = docMapJson.map[namespace];
                    const absPath = path_1.default.resolve(rootModulePath, docmapObj.relPath);
                    const relPath = path_1.default.relative(rootPath, absPath);
                    docMapJson.map[namespace].relPath = relPath;
                    docMapJson.map[namespace].path = absPath;
                });
                // add the map
                finalDocmapJson = Object.assign(Object.assign({}, finalDocmapJson), ((_a = docMapJson.map) !== null && _a !== void 0 ? _a : {}));
                // loop on extends
                if (docMapJson.extends) {
                    docMapJson.extends.forEach((path) => {
                        if (extendedPackages.indexOf(path) === -1) {
                            extendedPackages.push(path);
                            loadJson(path);
                        }
                    });
                }
            }
            loadJson(set.path);
            // return the final docmap
            resolve(finalDocmapJson);
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
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            let globs = generateParams.globs || [];
            if (!Array.isArray(globs))
                globs = [globs];
            emit('notification', {
                message: `${this.metas.id} generation started`
            });
            emit('log', {
                group: `s-docmap-${this.metas.id}`,
                value: `Searching files to use as docmap sources using globs:\n- <yellow>${globs.join('</yellow>\n- ')}</yellow>`
            });
            // getting package infos
            const packageJson = json_1.default();
            // searching for actual docmaps
            const currentDocmapsPromise = this.find(params.find);
            pipe(currentDocmapsPromise);
            const currentDocmapsFiles = yield currentDocmapsPromise;
            const extendsArray = [];
            currentDocmapsFiles.forEach((file) => {
                const packageJson = require(`${file.dirPath}/package.json`);
                extendsArray.push(packageJson.name);
            });
            const pool = pool_1.default(globs, {
                watch: generateParams.watch,
                exclude: generateParams.exclude
            });
            const docmapJson = {
                extends: extendsArray,
                map: {}
            };
            pool.on(generateParams.watch ? 'update' : 'files', (files) => {
                files = Array.isArray(files) ? files : [files];
                emit('log', {
                    group: `s-docmap-${this.metas.id}`,
                    value: `<yellow>${files.length}</yellow> file(s) found using the glob "<cyan>${globs.join(',')}</cyan>"`
                });
                // loop on each files to check for docblocks
                for (let j = 0; j < files.length; j++) {
                    const filepath = files[j].path;
                    const content = fs_1.default.readFileSync(filepath, 'utf8');
                    if (!content)
                        continue;
                    const docblocks = new s_docblock_1.default(content).toObject();
                    // const db = new __SDocblock(content);
                    // const renderer = new SDocblockHtmlRenderer(db);
                    // const str = renderer.render();
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
                            if (field === 'namespace')
                                docblock[field] = `${packageJson.name.replace('/', '.')}.${docblock[field]}`;
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
                    group: `s-docmap-${this.metas.id}`,
                    value: `<green>${Object.keys(this._entries).length}</green> entries gathered for this docMap`
                });
                emit('notification', {
                    type: 'success',
                    message: `${this.metas.id} build success`
                });
                // save entries inside the json map property
                docmapJson.map = this._entries;
                if (generateParams.save) {
                    emit('log', {
                        group: `s-docmap-${this.metas.id}`,
                        value: `<yellow>[save]</yellow> File "<cyan>${generateParams.outPath.replace(rootDir_1.default() + '/', '')}</cyan>"`
                    });
                    fs_1.default.writeFileSync(generateParams.outPath, JSON.stringify(docmapJson, null, 4));
                }
                if (generateParams.watch) {
                    emit('log', {
                        group: `s-docmap-${this.metas.id}`,
                        value: '<blue>[watch]</blue> Watching for changes...'
                    });
                }
                else {
                    resolve(this._entries);
                }
            });
            if (generateParams.watch) {
                emit('log', {
                    group: `s-docmap-${this.metas.id}`,
                    value: '<blue>[watch]</blue> Watching for changes...'
                });
            }
        }));
    }
}
SDocMap.interfaces = {};
exports.default = SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFDN0Msb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUVuRCx3RUFBaUQ7QUFDakQsb0ZBQWlFO0FBQ2pFLDRFQUF3RDtBQUN4RCxnRkFBMEQ7QUFDMUQsNEZBQXNFO0FBQ3RFLG9GQUE4RDtBQUU5RCw0RkFBc0U7QUFDdEUsZ0ZBQTBEO0FBQzFELDRDQUFzQjtBQUN0QixnREFBMEI7QUFDMUIsd0dBQWtGO0FBQ2xGLGdIQUEwRjtBQUMxRixpRkFBa0U7QUFzRmxFLE1BQU0sT0FBUSxTQUFRLGlCQUFRO0lBMkI1Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdDO1FBQ2xELEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxTQUFTO2FBQ2Q7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBNUNKOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBb0M3QixpQkFBaUI7UUFDakIsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFRLENBQ3hCLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLFdBQVcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FDekUsQ0FBQztJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDRyxVQUFVOztZQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsSUFBSSxDQUFDLE1BQW9DO1FBQ3ZDLE1BQU0sVUFBVSxHQUF1QixD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