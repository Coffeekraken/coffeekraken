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
import __SugarConfig from '@coffeekraken/s-sugar-config';
import __path from 'path';
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __SFrontspecFindParamsInterface from './interface/SFrontspecFindParamsInterface';
import __SCache from '@coffeekraken/s-cache';
import __toString from '@coffeekraken/sugar/shared/string/toString';
import __fs from 'fs';
import __SEnv from '@coffeekraken/s-env';
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
            // @TODO    enable cache feature
            // if (findParams.cache && !findParams.clearCache) {
            //   const cachedValue = await this._cache.get(cacheId);
            //   if (cachedValue) {
            //     emit('log', {
            //       group: `s-frontspec-${this.metas.id}`,
            //       value: `<yellow>[${this.constructor.name}]</yellow> frontspec.json file(s) getted from cache`
            //     });
            //     cachedValue.forEach((path) => {
            //       emit('log', {
            //         group: `s-frontspec-${this.metas.id}`,
            //         value: `- <cyan>${__path.relative(process.cwd(), path)}</cyan>`
            //       });
            //     });
            //     return resolve(cachedValue);
            //   }
            // }
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
            var _a;
            const readParams = (__deepMerge(__SFrontspecFindParamsInterface.defaults(), params || {}));
            const filesPromise = this.find(params);
            pipe(filesPromise);
            const filesPaths = yield filesPromise;
            const jsons = {};
            if (!filesPaths.length) {
                jsons.default = Object.assign({}, ((_a = __SugarConfig.get('frontspec.default')) !== null && _a !== void 0 ? _a : {}));
                // console.log('DEF', __SugarConfig.get('frontspec.default').assets.css);
            }
            else {
                // loop on all files
                filesPaths.forEach((filePath) => {
                    var _a;
                    const file = __SFile.new(filePath);
                    let content = file.content;
                    // merge it with the defaults
                    content = __deepMerge((_a = __SugarConfig.get('frontspec.default')) !== null && _a !== void 0 ? _a : {}, content);
                    emit('log', {
                        group: `s-frontspec-${this.metas.id}`,
                        value: __toString(content)
                    });
                    jsons[file.path] = content;
                });
            }
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
                        var _a, _b, _c;
                        const assetObj = Object.assign({}, typeAssets[assetId]);
                        const url = (_a = assetObj.path) !== null && _a !== void 0 ? _a : assetObj.src;
                        if (assetObj.env && !__SEnv.is(assetObj.env))
                            return;
                        const filePath = __path.resolve(path.replace(/\/frontspec.json$/, ''), (_c = (_b = assetObj.path) !== null && _b !== void 0 ? _b : assetObj.src) !== null && _c !== void 0 ? _c : assetObj.href);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0Zyb250c3BlYy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNGcm9udHNwZWMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7OztBQUVkLE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sVUFBVSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sT0FBTyxNQUFNLHFDQUFxQyxDQUFDO0FBRzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLDhCQUE4QixDQUFDO0FBQ3pELE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLEtBQUssTUFBTSxzQ0FBc0MsQ0FBQztBQUN6RCxPQUFPLCtCQUErQixNQUFNLDJDQUEyQyxDQUFDO0FBQ3hGLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUd0QixPQUFPLE1BQU0sTUFBTSxxQkFBcUIsQ0FBQztBQWlDekMsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsVUFBVTtJQUdoRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQVEsR0FBRyxFQUFFO1FBQ3ZCLEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFlBQVk7YUFDakI7U0FDRixFQUNELFFBQVEsQ0FDVCxDQUNGLENBQUM7UUFFRixpQkFBaUI7UUFDakIsTUFBTSxPQUFPLEdBQ1gsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEtBQUssWUFBWTtZQUM1QixDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFO1lBQ2YsQ0FBQyxDQUFDLGNBQWMsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUUsQ0FBQztRQUNwQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQzFDLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7U0FDdEQ7YUFBTTtZQUNMLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENBQUMsT0FBTyxFQUFFO2dCQUNsQyxLQUFLLEVBQUU7b0JBQ0wsV0FBVyxFQUFFLEtBQUs7aUJBQ25CO2FBQ0YsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLFdBQVcsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQztTQUN0RDtJQUNILENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDRyxVQUFVOztZQUNkLE9BQU8sTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEtBQUssRUFBRSxDQUFDO1FBQ25DLENBQUM7S0FBQTtJQUVEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILElBQUksQ0FBQyxNQUF1QztRQUMxQyxNQUFNLFVBQVUsR0FBMEIsQ0FDeEMsV0FBVyxDQUFDLCtCQUErQixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sSUFBSSxFQUFFLENBQUMsQ0FDdEUsQ0FBQztRQUVGLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN4RCxnQ0FBZ0M7WUFDaEMsTUFBTSxRQUFRLEdBQWEsVUFBVSxDQUFDLEtBQUssSUFBSSxFQUFFLENBQUM7WUFFbEQsSUFBSSxVQUFVLENBQUMsVUFBVSxFQUFFO2dCQUN6QixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO29CQUNyQyxLQUFLLEVBQUUsZ0RBQWdEO2lCQUN4RCxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxJQUFJLENBQUMsVUFBVSxFQUFFLENBQUM7YUFDekI7WUFFRCxNQUFNLE9BQU8sR0FBRyxjQUFjLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxDQUFDLEVBQUUsQ0FBQztZQUU3RCxnQ0FBZ0M7WUFFaEMsb0RBQW9EO1lBQ3BELHdEQUF3RDtZQUN4RCx1QkFBdUI7WUFDdkIsb0JBQW9CO1lBQ3BCLCtDQUErQztZQUMvQyxzR0FBc0c7WUFDdEcsVUFBVTtZQUNWLHNDQUFzQztZQUN0QyxzQkFBc0I7WUFDdEIsaURBQWlEO1lBQ2pELDBFQUEwRTtZQUMxRSxZQUFZO1lBQ1osVUFBVTtZQUNWLG1DQUFtQztZQUNuQyxNQUFNO1lBQ04sSUFBSTtZQUVKLElBQUksS0FBSyxHQUFjLEVBQUUsQ0FBQztZQUMxQixNQUFNLE1BQU0sQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUVoQixNQUFNLGNBQWMsR0FBYSxDQUFDLGtDQUFrQyxDQUFDLENBQUM7WUFDdEUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dCQUN2QixjQUFjLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxXQUFXLENBQUMsQ0FBQztZQUNuRCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsUUFBUSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDeEMsTUFBTSxZQUFZLEdBQW1CLE1BQU0sT0FBTyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDeEUsS0FBSyxHQUFHLENBQUMsR0FBRyxLQUFLLEVBQUUsR0FBRyxZQUFZLENBQUMsQ0FBQzthQUNyQztZQUVELE1BQU0sY0FBYyxHQUFhO2dCQUMvQixpQkFBaUIsS0FBSyxDQUFDLE1BQU0sOEJBQThCO2FBQzVELENBQUM7WUFDRixLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JCLGNBQWMsQ0FBQyxJQUFJLENBQUMsV0FBVyxJQUFJLENBQUMsT0FBTyxTQUFTLENBQUMsQ0FBQztZQUN4RCxDQUFDLENBQUMsQ0FBQztZQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLEtBQUssRUFBRSxjQUFjLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQzthQUNqQyxDQUFDLENBQUM7WUFFSCx5QkFBeUI7WUFDekIsSUFBSSxVQUFVLENBQUMsS0FBSyxFQUFFO2dCQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSxlQUFlLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxFQUFFO29CQUNyQyxLQUFLLEVBQUUsWUFBWSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksOENBQThDO2lCQUN2RixDQUFDLENBQUM7Z0JBQ0gsTUFBTSxJQUFJLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FDbkIsT0FBTyxFQUNQLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FDL0IsQ0FBQzthQUNIO1lBRUQsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBQ3RFLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxJQUFJLENBQUMsU0FBeUMsRUFBRTtRQUM5QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ3RELE1BQU0sVUFBVSxHQUEwQixDQUN4QyxXQUFXLENBQUMsK0JBQStCLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxJQUFJLEVBQUUsQ0FBQyxDQUN0RSxDQUFDO1lBRUYsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUN2QyxJQUFJLENBQUMsWUFBWSxDQUFDLENBQUM7WUFDbkIsTUFBTSxVQUFVLEdBQUcsTUFBTSxZQUFZLENBQUM7WUFFdEMsTUFBTSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRWpCLElBQUksQ0FBQyxVQUFVLENBQUMsTUFBTSxFQUFFO2dCQUV0QixLQUFLLENBQUMsT0FBTyxxQkFDUixDQUFDLE1BQUEsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsQ0FDbEQsQ0FBQztnQkFFRix5RUFBeUU7YUFFMUU7aUJBQU07Z0JBRUwsb0JBQW9CO2dCQUNwQixVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7O29CQUM5QixNQUFNLElBQUksR0FBRyxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUNuQyxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDO29CQUUzQiw2QkFBNkI7b0JBQzdCLE9BQU8sR0FBRyxXQUFXLENBQ25CLE1BQUEsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxtQ0FBSSxFQUFFLEVBQzVDLE9BQU8sQ0FDUixDQUFDO29CQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1YsS0FBSyxFQUFFLGVBQWUsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLEVBQUU7d0JBQ3JDLEtBQUssRUFBRSxVQUFVLENBQUMsT0FBTyxDQUFDO3FCQUMzQixDQUFDLENBQUM7b0JBRUgsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxPQUFPLENBQUM7Z0JBQzdCLENBQUMsQ0FBQyxDQUFDO2FBRUo7WUFFRCxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUM7UUFDakIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0csYUFBYSxDQUNqQixTQUF5QyxFQUFFOztZQUUzQyxNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFM0MsTUFBTSxhQUFhLEdBQThCLEVBQUUsQ0FBQztZQUVwRCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO2dCQUN2QyxNQUFNLGFBQWEsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3ZDLElBQUksQ0FBQyxhQUFhLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUNsQyxNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDakQsTUFBTSxVQUFVLEdBQUcsYUFBYSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTs7d0JBQzFDLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDO3dCQUN4RCxNQUFNLEdBQUcsR0FBRyxNQUFBLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUM7d0JBRTFDLElBQUksUUFBUSxDQUFDLEdBQUcsSUFBSSxDQUFDLE1BQU0sQ0FBQyxFQUFFLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQzs0QkFBRSxPQUFPO3dCQUVyRCxNQUFNLFFBQVEsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUM3QixJQUFJLENBQUMsT0FBTyxDQUFDLG1CQUFtQixFQUFFLEVBQUUsQ0FBQyxFQUNyQyxNQUFBLE1BQUEsUUFBUSxDQUFDLElBQUksbUNBQUksUUFBUSxDQUFDLEdBQUcsbUNBQUksUUFBUSxDQUFDLElBQUksQ0FDL0MsQ0FBQzt3QkFFRixJQUFJLElBQUksS0FBSyxLQUFLLEVBQUU7NEJBQ2xCLFFBQVEsQ0FBQyxJQUFJLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQzs0QkFDN0IsT0FBTyxRQUFRLENBQUMsR0FBRyxDQUFDO3lCQUNyQjt3QkFFRCxNQUFNLE9BQU8sR0FBRzs0QkFDZCxJQUFJOzRCQUNKLEVBQUUsRUFBRSxPQUFPOzRCQUNYLElBQUksb0JBQ0MsUUFBUSxDQUNaO3lCQUNGLENBQUM7d0JBRUYsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxFQUFFOzRCQUM3QixPQUFPLENBQUMsSUFBSSxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsUUFBUSxDQUFDLENBQUM7eUJBQ3RDOzZCQUFNOzRCQUNMLE9BQU8sQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO3lCQUNuQjt3QkFFRCxhQUFhLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUM5QixDQUFDLENBQUMsQ0FBQztnQkFDTCxDQUFDLENBQUMsQ0FBQztZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgsT0FBTyxhQUFhLENBQUM7UUFDdkIsQ0FBQztLQUFBO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0csV0FBVzs7WUFDZixPQUFPLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQztnQkFDckIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLEtBQUssRUFBRSxJQUFJO2FBQ1osQ0FBQyxDQUFDO1FBQ0wsQ0FBQztLQUFBOztBQXJTTSx1QkFBWSxHQUFHLEVBQUUsQ0FBQyJ9