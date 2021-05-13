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
                const file = __SFile.new(filePath);
                const content = file.content;
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
}
SFrontspec._cachesStack = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHFDQUFxQyxDQUFDO0FBRzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFNBQVMsTUFBTSwyQ0FBMkMsQ0FBQztBQUNsRSxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQWdDMUQsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsVUFBVTtJQUdoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFlBQVk7YUFDakI7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixpQkFBaUI7UUFDakIsTUFBTSxPQUFPLEdBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssWUFBWTtZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2YsQ0FBQyxDQUFDLGNBQWMsSUFBSSxD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