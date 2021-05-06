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
Object.defineProperty(exports, "__esModule", { value: true });
const s_file_1 = __importDefault(require("@coffeekraken/s-file"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const SGlob_1 = __importDefault(require("@coffeekraken/sugar/node/glob/SGlob"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const path_1 = __importDefault(require("path"));
const SFrontspecFindParamsInterface_1 = __importDefault(require("./interface/SFrontspecFindParamsInterface"));
const s_cache_1 = __importDefault(require("@coffeekraken/s-cache"));
const toString_1 = __importDefault(require("@coffeekraken/sugar/shared/string/toString"));
const fs_1 = __importDefault(require("fs"));
class SFrontspec extends s_promise_1.default {
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
            metas: {
                id: 'SFrontspec'
            }
        }, settings));
        // init the cache
        const cacheId = this.metas.id === 'SFrontspec'
            ? this.metas.id
            : `SFrontspec-${this.metas.id}`;
        if (this.constructor._cachesStack[cacheId]) {
            this._cache = this.constructor._cachesStack[cacheId];
        }
        else {
            this._cache = new s_cache_1.default(cacheId, {
                cache: {
                    clearOnExit: false
                }
            });
            this.constructor._cachesStack[cacheId] = this._cache;
        }
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
     * This method allows you to find for frontspec.json files and get back the array of pathes where to
     * find the found files
     *
     * @todo      update documentation
     *
     * @param       {Object}        [settings={}]       A settings object to configure your reading process
     *
     * @return      {SPromise}                          An SPromise instance that will be resolved once the frontspec.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    find(params) {
        const findParams = (deepMerge_1.default(SFrontspecFindParamsInterface_1.default.defaults(), params || {}));
        return new s_promise_1.default(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // build the glob pattern to use
            const patterns = findParams.globs || [];
            if (findParams.clearCache) {
                emit('log', {
                    value: '<yellow>[cache]</yellow> Clearing the cache...'
                });
                yield this.clearCache();
            }
            if (findParams.cache && !findParams.clearCache) {
                const cachedValue = yield this._cache.get('find-files');
                if (cachedValue) {
                    emit('log', {
                        value: `<yellow>[${this.constructor.name}]</yellow> frontspec.json file(s) getted from cache`
                    });
                    cachedValue.forEach((path) => {
                        emit('log', {
                            value: `- <cyan>${path_1.default.relative(process.cwd(), path)}</cyan>`
                        });
                    });
                    return resolve(cachedValue);
                }
            }
            let files = [];
            yield wait_1.default(1);
            const searchStrArray = ['Searching frontspec using globs:'];
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
                `Found <yellow>${files.length}</yellow> frontspec file(s):`
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
                yield this._cache.set('find-files', files.map((file) => file.path));
            }
            resolve(files.map((f) => f.path).filter((f) => fs_1.default.existsSync(f)));
        }));
    }
    /**
     * @name          read
     * @type          Function
     *
     * This static method allows you to search for frontspec.json files and read them to get
     * back the content of them in one call. It can take advantage of the cache if
     * the setting.cache property is setted to true
     *
     * @todo      update documentation
     * @todo      integrate the "cache" feature
     *
     * @param       {Object}        [settings={}]       A settings object to override the instance level ones
     * @return      {SPromise}                          An SPromise instance that will be resolved once the frontspec.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read(params) {
        return new s_promise_1.default(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            const filesPromise = this.find(params);
            pipe(filesPromise);
            const filesPaths = yield filesPromise;
            let jsons = {};
            // loop on all files
            filesPaths.forEach((filePath) => {
                const file = s_file_1.default.new(filePath);
                const content = file.content;
                emit('log', {
                    value: toString_1.default(content)
                });
                jsons[file.path] = content;
            });
            resolve(jsons);
        }));
    }
    /**
     * @name      assetsToServe
     * @type      Function
     * @async
     *
     * This method will returns all the files that need to be served using a web server
     * that are defined in the frontspec.json files like some css, js etc...
     *
     * @since     2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    assetsToServe(params) {
        return __awaiter(this, void 0, void 0, function* () {
            const filesPaths = yield this.find(params);
            const assetsToServe = [];
            filesPaths.forEach((filePath) => {
                const file = s_file_1.default.new(filePath);
                const content = file.content;
                if (!content.assets)
                    return;
                Object.keys(content.assets).forEach((type) => {
                    const typeAssets = content.assets[type];
                    Object.keys(typeAssets).forEach((assetId) => {
                        var _a;
                        const assetObj = typeAssets[assetId];
                        const path = path_1.default.resolve(file.dirPath, (_a = assetObj.path) !== null && _a !== void 0 ? _a : assetObj.src);
                        assetsToServe.push({
                            type,
                            id: assetId,
                            path,
                            file: s_file_1.default.new(path)
                        });
                    });
                });
            });
            return assetsToServe;
        });
    }
}
exports.default = SFrontspec;
SFrontspec._cachesStack = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCxnRkFBMEQ7QUFHMUQsNEZBQXNFO0FBQ3RFLGdGQUEwRDtBQUMxRCxnREFBMEI7QUFDMUIsOEdBQXdGO0FBQ3hGLG9FQUE2QztBQUM3QywwRkFBb0U7QUFDcEUsNENBQXNCO0FBZ0N0QixNQUFxQixVQUFXLFNBQVEsbUJBQVU7SUFHaEQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFRLEdBQUcsRUFBRTtRQUN2QixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsWUFBWTthQUNqQjtTQUNGLEVBQ0QsUUFBUSxDQUNULENBQ0YsQ0FBQztRQUVGLGlCQUFpQjtRQUNqQixNQUFNLE9BQU8sR0FDWCxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxZQUFZO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUFDO1FBQ3BDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEVBQUU7WUFDMUMsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLENBQUMsV0FBVyxDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztTQUN0RDthQUFNO1lBQ0wsSUFBSSxDQUFDLE1BQU0sR0FBRyxJQUFJLGlCQUFRLENBQUMsT0FBTyxFQUFFO2dCQUNsQyxLQUFLLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLEtBQUs7aUJBQ25CO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFD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