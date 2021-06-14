var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SDocblock from '@coffeekraken/s-docblock';
import __SPromise from '@coffeekraken/s-promise';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
import __SGlob from '@coffeekraken/s-glob';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rootDir from '@coffeekraken/sugar/node/path/rootDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __SDocMapGenerateParamsInterface from './interface/SDocMapGenerateParamsInterface';
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
            const extendedPackages = [];
            let finalDocmapJson = {};
            function loadJson(packageNameOrPath, currentPath) {
                var _a, _b;
                if (extendedPackages.indexOf(packageNameOrPath) !== -1)
                    return;
                extendedPackages.push(packageNameOrPath);
                let currentPathDocmapJsonPath;
                try {
                    currentPathDocmapJsonPath = require.resolve(`${packageNameOrPath}/docmap.json`);
                }
                catch (e) {
                    // console.log('__', e);
                }
                if (!currentPathDocmapJsonPath)
                    return;
                const extendsRootPath = require.resolve(currentPathDocmapJsonPath).replace('/docmap.json', '');
                try {
                    const docmapJson = require(currentPathDocmapJsonPath);
                    if (docmapJson.extends) {
                        docmapJson.extends.forEach(extendsPackageName => {
                            loadJson(extendsPackageName, extendsRootPath);
                        });
                    }
                    Object.keys((_a = docmapJson.map) !== null && _a !== void 0 ? _a : {}).forEach(namespace => {
                        const obj = docmapJson.map[namespace];
                        obj.path = __path.resolve(extendsRootPath, obj.relPath);
                        docmapJson.map[namespace] = obj;
                    });
                    finalDocmapJson = Object.assign(Object.assign({}, finalDocmapJson), ((_b = docmapJson.map) !== null && _b !== void 0 ? _b : {}));
                }
                catch (e) {
                    console.log('ERRO', e);
                }
            }
            loadJson(__packageRoot(), __packageRoot());
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
            // const currentDocmapsPromise = this.find(params.find);
            // pipe(currentDocmapsPromise);
            // const currentDocmapsFiles = await currentDocmapsPromise;
            const currentDocmapsFiles = __SGlob.resolve('node_modules/**{0,2}/docmap.json', {
                cwd: __packageRoot()
            });
            console.log('CUr', currentDocmapsFiles);
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
                        const docblockEntryObj = {};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFDeEQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxhQUFhLE1BQU0sdUNBQXVDLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sdUNBQXVDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBNkUxRixNQUFNLE9BQVEsU0FBUSxRQUFRO0lBZTVCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0M7UUFDbEQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsU0FBUzthQUNkO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQWhDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQW9CLEVBQUUsQ0FBQztJQXVCL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsSUFBSSxDQUFDLE1BQW1DO1FBQ3RDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxNQUFNLEdBQUcsR0FB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