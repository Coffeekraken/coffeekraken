var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SCache from '@coffeekraken/s-cache';
import __SClass from '@coffeekraken/s-class';
import __SDocblock from '@coffeekraken/s-docblock';
import __SPromise from '@coffeekraken/s-promise';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SGlob from '@coffeekraken/sugar/node/glob/SGlob';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rootDir from '@coffeekraken/sugar/node/path/rootDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __fs from 'fs';
import __path from 'path';
import __SDocMapFindParamsInterface from './interface/SDocMapFindParamsInterface';
import __SDocMapGenerateParamsInterface from './interface/SDocMapGenerateParamsInterface';
import __packageJson from '@coffeekraken/sugar/node/package/json';
class SDocMap extends __SClass {
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
        super(__deepMerge({
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
        this._cache = new __SCache(this.metas.id === 'SDocMap' ? this.metas.id : `SDocMap-${this.metas.id}`);
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
        const findParams = (__deepMerge(__SDocMapFindParamsInterface.defaults(), params || {}));
        return new __SPromise(({ resolve, reject, emit }) => __awaiter(this, void 0, void 0, function* () {
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
            yield __wait(1);
            const searchStrArray = ['Searching docmaps using globs:'];
            patterns.forEach((pat) => {
                searchStrArray.push(`- <yellow>${pat}</yellow>`);
            });
            emit('log', {
                group: `s-docmap-${this.metas.id}`,
                value: searchStrArray.join('\n')
            });
            for (let i = 0; i < patterns.length; i++) {
                const foundedFiles = yield __SGlob.resolve(patterns[i]);
                files = [...files, ...foundedFiles];
            }
            files = files.filter((file) => {
                if (!__fs.existsSync(`${file.dirPath}/package.json`))
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
        return new __SPromise(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            const set = __deepMerge({
                path: `${__packageRoot()}/docmap.json`
            }, params !== null && params !== void 0 ? params : {});
            if (!__fs.existsSync(set.path)) {
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
                    const absPath = __path.resolve(rootModulePath, docmapObj.relPath);
                    const relPath = __path.relative(rootPath, absPath);
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
        const generateParams = (__deepMerge(__SDocMapGenerateParamsInterface.defaults(), params));
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
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
            const packageJson = __packageJson();
            // searching for actual docmaps
            const currentDocmapsPromise = this.find(params.find);
            pipe(currentDocmapsPromise);
            const currentDocmapsFiles = yield currentDocmapsPromise;
            const extendsArray = [];
            currentDocmapsFiles.forEach((file) => {
                const packageJson = require(`${file.dirPath}/package.json`);
                extendsArray.push(packageJson.name);
            });
            const pool = __fsPool(globs, {
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
                    const content = __fs.readFileSync(filepath, 'utf8');
                    if (!content)
                        continue;
                    const docblocks = new __SDocblock(content).toObject();
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
                        const filename = __getFilename(filepath);
                        let docblockEntryObj = {};
                        generateParams.fields.forEach((field) => {
                            if (docblock[field] === undefined)
                                return;
                            if (field === 'namespace')
                                docblock[field] = `${packageJson.name.replace('/', '.')}.${docblock[field]}`;
                            docblockEntryObj[field] = docblock[field];
                        });
                        if (docblock.namespace) {
                            docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: __path.relative(__packageRoot(), filepath) });
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
                        value: `<yellow>[save]</yellow> File "<cyan>${generateParams.outPath.replace(__rootDir() + '/', '')}</cyan>"`
                    });
                    __fs.writeFileSync(generateParams.outPath, JSON.stringify(docmapJson, null, 4));
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
export default SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFDeEQsT0FBTyxPQUFPLE1BQU0scUNBQXFDLENBQUM7QUFDMUQsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sdUNBQXVDLENBQUM7QUFFOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyxhQUFhLE1BQU0sdUNBQXVDLENBQUM7QUFzRmxFLE1BQU0sT0FBUSxTQUFRLFFBQVE7SUEyQjVCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0M7UUFDbEQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsU0FBUzthQUNkO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQTVDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQW9CLEVBQUUsQ0FBQztRQW9DN0IsaUJBQWlCO1FBQ2pCLElBQUksQ0FBQyxNQUFNLEdBQUcsSUFBSSxRQUFRLENB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