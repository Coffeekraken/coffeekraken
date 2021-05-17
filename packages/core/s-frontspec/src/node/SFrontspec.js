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
import __SFile from '@coffeekraken/s-file';
import __SPromise from '@coffeekraken/s-promise';
import __SGlob from '@coffeekraken/sugar/node/glob/SGlob';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __sugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __SFrontspecFindParamsInterface from './interface/SFrontspecFindParamsInterface';
import __SCache from '@coffeekraken/s-cache';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __fs from 'fs';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __set from '@coffeekraken/sugar/shared/object/set';
export default class SFrontspec extends __SPromise {
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
            this._cache = new __SCache(cacheId, {
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
        const findParams = (__deepMerge(__SFrontspecFindParamsInterface.defaults(), params || {}));
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
            // build the glob pattern to use
            const patterns = findParams.globs || [];
            if (findParams.clearCache) {
                emit('log', {
                    group: `s-frontspec-${this.metas.id}`,
                    value: '<yellow>[cache]</yellow> Clearing the cache...'
                });
                yield this.clearCache();
            }
            const cacheId = `find-files-${__md5.encrypt(process.cwd())}`;
            if (findParams.cache && !findParams.clearCache) {
                const cachedValue = yield this._cache.get(cacheId);
                if (cachedValue) {
                    emit('log', {
                        group: `s-frontspec-${this.metas.id}`,
                        value: `<yellow>[${this.constructor.name}]</yellow> frontspec.json file(s) getted from cache`
                    });
                    cachedValue.forEach((path) => {
                        emit('log', {
                            group: `s-frontspec-${this.metas.id}`,
                            value: `- <cyan>${__path.relative(process.cwd(), path)}</cyan>`
                        });
                    });
                    return resolve(cachedValue);
                }
            }
            let files = [];
            yield __wait(1);
            const searchStrArray = ['Searching frontspec using globs:'];
            patterns.forEach((pat) => {
                searchStrArray.push(`- <yellow>${pat}</yellow>`);
            });
            emit('log', {
                group: `s-frontspec-${this.metas.id}`,
                value: searchStrArray.join('\n')
            });
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = yield __SGlob.resolve(patterns[i]);
                files = [...files, ...foundedFiles];
            }
            const findedStrArray = [
                `Found <yellow>${files.length}</yellow> frontspec file(s):`
            ];
            files.forEach((file) => {
                findedStrArray.push(`- <cyan>${file.relPath}</cyan>`);
            });
            emit('log', {
                group: `s-frontspec-${this.metas.id}`,
                value: findedStrArray.join('\n')
            });
            // save in cache if asked
            if (findParams.cache) {
                emit('log', {
                    group: `s-frontspec-${this.metas.id}`,
                    value: `<yellow>[${this.constructor.name}]</yellow> updating cache with found file(s)`
                });
                yield this._cache.set(cacheId, files.map((file) => file.path));
            }
            resolve(files.map((f) => f.path).filter((f) => __fs.existsSync(f)));
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
    read(params = {}) {
        return new __SPromise(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            const readParams = (__deepMerge(__SFrontspecFindParamsInterface.defaults(), params || {}));
            const filesPromise = this.find(params);
            pipe(filesPromise);
            const filesPaths = yield filesPromise;
            let jsons = {};
            // loop on all files
            filesPaths.forEach((filePath) => {
                var _a;
                const file = __SFile.new(filePath);
                let content = file.content;
                // merge it with the defaults
                content = __deepMerge((_a = __sugarConfig('frontspec.default')) !== null && _a !== void 0 ? _a : {}, content);
                // process the content (env, etc...)
                const newContent = {};
                __deepMap(content, ({ object, prop, value, path }) => {
                    let finalPath;
                    if (readParams.env && prop.includes(`${readParams.env}:`)) {
                        finalPath = `${path
                            .split('.')
                            .slice(0, -1)
                            .join('.')}.${prop.replace(`${readParams.env}:`, '')}`;
                    }
                    else if (readParams.env && !object[`${readParams.env}:${prop}`]) {
                        finalPath = path;
                    }
                    else if (!readParams.env && prop.split(':').length === 1) {
                        finalPath = path;
                    }
                    if (finalPath) {
                        if (typeof value === 'string') {
                            value = value.replace(/\[config\.[a-zA-Z-_\.]+\]/gm, (...args) => {
                                const configPath = args[0]
                                    .replace(/^\[config\./, '')
                                    .replace(/\]$/, '');
                                const configValue = __sugarConfig(configPath);
                                return configValue;
                            });
                        }
                        __set(newContent, finalPath, value);
                    }
                    return value;
                });
                emit('log', {
                    group: `s-frontspec-${this.metas.id}`,
                    value: __toString(newContent)
                });
                jsons[file.path] = newContent;
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
    assetsToServe(params = {}) {
        return __awaiter(this, void 0, void 0, function* () {
            const filesPaths = yield this.read(params);
            const assetsToServe = [];
            Object.keys(filesPaths).forEach((path) => {
                const frontspecJson = filesPaths[path];
                if (!frontspecJson.assets)
                    return;
                Object.keys(frontspecJson.assets).forEach((type) => {
                    const typeAssets = frontspecJson.assets[type];
                    Object.keys(typeAssets).forEach((assetId) => {
                        var _a, _b;
                        const assetObj = typeAssets[assetId];
                        let url = (_a = assetObj.path) !== null && _a !== void 0 ? _a : assetObj.src;
                        const filePath = __path.resolve(path.replace(/\/frontspec.json$/, ''), (_b = assetObj.path) !== null && _b !== void 0 ? _b : assetObj.src);
                        if (type === 'css') {
                            assetObj.href = assetObj.src;
                            delete assetObj.src;
                        }
                        const fileObj = {
                            type,
                            id: assetId,
                            args: Object.assign({}, assetObj)
                        };
                        if (__fs.existsSync(filePath)) {
                            fileObj.file = __SFile.new(filePath);
                        }
                        else {
                            fileObj.url = url;
                        }
                        assetsToServe.push(fileObj);
                    });
                });
            });
            return assetsToServe;
        });
    }
    /**
     * @name      updateCache
     * @type      function
     * @async
     *
     * This method allows you to clear the cache and update it with new search result
     *
     * @since     2.0.0
     * @author			        Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    updateCache() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.find({
                clearCache: true,
                cache: true
            });
        });
    }
}
SFrontspec._cachesStack = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHFDQUFxQyxDQUFDO0FBRzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQWdDMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsVUFBVTtJQUdoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFlBQVk7YUFDakI7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixpQkFBaUI7UUFDakIsTUFBTSxPQUFPLEdBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssWUFBWTtZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2YsQ0FBQyxDQUFDLGNBQWMsSUFBSSxD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