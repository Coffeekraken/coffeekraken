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
            function loadJson(packageNameOrPath) {
                var _a;
                if (extendedPackages.indexOf(packageNameOrPath) !== -1)
                    return;
                extendedPackages.push(packageNameOrPath);
                try {
                    const docmapJson = require(`${packageNameOrPath}/docmap.json`);
                    if (docmapJson.extends) {
                        docmapJson.extends.forEach(extendsPackageName => {
                            loadJson(extendsPackageName);
                        });
                    }
                    finalDocmapJson = Object.assign(Object.assign({}, finalDocmapJson), ((_a = docmapJson.map) !== null && _a !== void 0 ? _a : {}));
                }
                catch (e) {
                    // console.log('ERRO', e);
                }
            }
            loadJson(__packageRoot());
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxRQUFRLE1BQU0sa0NBQWtDLENBQUM7QUFDeEQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxhQUFhLE1BQU0sdUNBQXVDLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sdUNBQXVDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUUxQixPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBOEUxRixNQUFNLE9BQVEsU0FBUSxRQUFRO0lBMkI1Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdDO1FBQ2xELEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFNBQVM7YUFDZDtTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUE1Q0o7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFvQixFQUFFLENBQUM7SUFtQy9CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILElBQUksQ0FBQyxNQUFtQztRQUN0QyxPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEQsTUFBTSxHQUFHLEdB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