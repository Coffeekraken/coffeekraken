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
        this._cache = new s_cache_1.default(this.metas.id === 'SFrontspec'
            ? this.metas.id
            : `SFrontspec-${this.metas.id}`);
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
            // if (findParams.cache && !findParams.clearCache) {
            //   const cachedValue = await this._cache.get('find-files');
            //   if (cachedValue) {
            //     emit('log', {
            //       value: `<yellow>[${this.constructor.name}]</yellow> frontspec.json file(s) getted from cache`
            //     });
            //     cachedValue.forEach((path) => {
            //       emit('log', {
            //         value: `- <cyan>${__path.relative(process.cwd(), path)}</cyan>`
            //       });
            //     });
            //     return resolve(cachedValue);
            //   }
            // }
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
            // if (findParams.cache) {
            //   emit('log', {
            //     value: `<yellow>[${this.constructor.name}]</yellow> updating cache with found file(s)`
            //   });
            //   await this._cache.set(
            //     'find-files',
            //     files.map((file) => file.path)
            //   );
            // }
            resolve(files.map((f) => f.path));
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
            console.log('FIFIF', filesPaths);
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
    assetsToServe() {
        return __awaiter(this, void 0, void 0, function* () {
            const filesPaths = yield this.find();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7O0FBRWQsa0VBQTJDO0FBQzNDLHdFQUFpRDtBQUNqRCxnRkFBMEQ7QUFHMUQsNEZBQXNFO0FBQ3RFLGdGQUEwRDtBQUMxRCxnREFBMEI7QUFDMUIsOEdBQXdGO0FBQ3hGLG9FQUE2QztBQUM3QywwRkFBb0U7QUFnQ3BFLE1BQXFCLFVBQVcsU0FBUSxtQkFBVTtJQUNoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxZQUFZO2FBQ2pCO1NBQ0YsRUFDRCxRQUFRLENBQ1QsQ0FDRixDQUFDO1FBRUYsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxpQkFBUSxDQUN4QixJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsS0FBSyxZQUFZO1lBQzVCLENBQUMsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUU7WUFDZixDQUFDLENBQUMsY0FBYyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsRUFBRSxDQUNsQyxDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNHLFVBQVU7O1lBQ2QsT0FBTyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsS0FBSyxFQUFFLENBQUM7UUFDbkMsQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsSUFBSSxDQUFDLE1BQXVDO1FBQzFDLE1BQU0sVUFBVSxHQUEwQixDQUN4QyxtQkFBVyxDQUFDLHVDQUErQixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FDdEUsQ0FBQztRQUVGLE9BQU8sSUFBSSxtQkFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUs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