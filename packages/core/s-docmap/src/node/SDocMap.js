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
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __packageJson from '@coffeekraken/sugar/node/package/json';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __SDocMapBuildParamsInterface from './interface/SDocMapBuildParamsInterface';
import __SDocMapReadParamsInterface from './interface/SDocMapReadParamsInterface';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __require from '@coffeekraken/sugar/node/esm/require';
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
     * @return      {SPromise<ISDocMapObj>}                          An SPromise instance that will be resolved once the docMap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    read(params) {
        return new __SPromise(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = __deepMerge(__SDocMapReadParamsInterface.defaults(), params !== null && params !== void 0 ? params : {});
            if (!__fs.existsSync(finalParams.input)) {
                throw new Error(`<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`);
            }
            const extendedPackages = [];
            const finalDocmapJson = {
                map: {}
            };
            function loadJson(packageNameOrPath, currentPath) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
                if (extendedPackages.indexOf(packageNameOrPath) !== -1)
                    return;
                extendedPackages.push(packageNameOrPath);
                let currentPathDocmapJsonPath;
                try {
                    currentPathDocmapJsonPath = __require().resolve(`${packageNameOrPath}/docmap.json`);
                }
                catch (e) {
                    // console.log('__', e);
                }
                if (!currentPathDocmapJsonPath)
                    return;
                const extendsRootPath = __require().resolve(currentPathDocmapJsonPath).replace('/docmap.json', '');
                try {
                    const docmapJson = __readJsonSync(currentPathDocmapJsonPath);
                    docmapJson.extends = [
                        ...((_a = docmapJson.extends) !== null && _a !== void 0 ? _a : []),
                        ...((_c = (_b = docmapJson.generated) === null || _b === void 0 ? void 0 : _b.extends) !== null && _c !== void 0 ? _c : [])
                    ];
                    docmapJson.map = Object.assign(Object.assign({}, ((_d = docmapJson.map) !== null && _d !== void 0 ? _d : {})), ((_f = (_e = docmapJson.generated) === null || _e === void 0 ? void 0 : _e.map) !== null && _f !== void 0 ? _f : {}));
                    delete docmapJson.generated;
                    docmapJson.extends.forEach(extendsPackageName => {
                        loadJson(extendsPackageName, extendsRootPath);
                    });
                    Object.keys((_g = docmapJson.map) !== null && _g !== void 0 ? _g : {}).forEach(namespace => {
                        const obj = docmapJson.map[namespace];
                        obj.path = __path.resolve(extendsRootPath, obj.relPath);
                        docmapJson.map[namespace] = obj;
                    });
                    finalDocmapJson.map = Object.assign(Object.assign({}, finalDocmapJson.map), ((_h = docmapJson.map) !== null && _h !== void 0 ? _h : {}));
                }
                catch (e) {
                    console.log('ERRO', e);
                }
            }
            loadJson(__packageRootDir(), __packageRootDir());
            // return the final docmap
            resolve(finalDocmapJson);
        }));
    }
    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docmap.json file
     *
     * @param         {String|Array<String>}          sources         The glob pattern(s) you want to scan files in
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    build(params) {
        const finalParams = (__deepMerge(__SDocMapBuildParamsInterface.defaults(), params));
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            emit('notification', {
                message: `${this.metas.id} build started`
            });
            let docmapJson = {
                map: {},
                generated: {
                    extends: [],
                    map: {}
                }
            };
            const packageRoot = __packageRootDir();
            const packageMonoRoot = __packageRoot(process.cwd(), true);
            // check if a file already exists
            if (__fs.existsSync(`${packageRoot}/docmap.json`)) {
                const currentDocmapJson = __readJsonSync(`${packageRoot}/docmap.json`);
                docmapJson = currentDocmapJson;
                docmapJson.generated = {
                    extends: [],
                    map: {}
                };
            }
            // getting package infos
            const packageJson = __packageJson();
            if (!finalParams.noExtends) {
                emit('log', {
                    value: `<yellow>[build]</yellow> Building extends array from existing docmap compliant packages`
                });
                const globs = [`${packageRoot}/node_modules/**{0,2}/docmap.json`];
                if (packageRoot !== packageMonoRoot) {
                    globs.push(`${packageMonoRoot}/node_modules/**{0,2}/docmap.json`);
                }
                const currentDocmapFiles = __SGlob.resolve(globs, {
                    exclude: (_a = finalParams.exclude) !== null && _a !== void 0 ? _a : []
                });
                const extendsArray = [];
                currentDocmapFiles.forEach((file) => {
                    const packageJson = __readJsonSync(`${file.dirPath}/package.json`);
                    extendsArray.push(packageJson.name);
                });
                // @ts-ignore
                docmapJson.generated.extends = extendsArray.filter(name => name !== packageJson.name);
            }
            emit('log', {
                value: `<yellow>[build]</yellow> Building map by searching for files inside the current package`
            });
            // searching inside the current package for docblocks to use
            const filesInPackage = __SGlob.resolve(finalParams.globs, {
                cwd: packageRoot,
                exclude: (_b = finalParams.exclude) !== null && _b !== void 0 ? _b : []
            });
            filesInPackage.forEach(file => {
                const content = file.raw;
                const docblocks = new __SDocblock(content).toObject();
                if (!docblocks || !docblocks.length)
                    return;
                let docblockObj = {};
                const children = {};
                docblocks.forEach((docblock) => {
                    for (let i = 0; 
                    // @ts-ignore
                    i < Object.keys(finalParams.filters).length; i++) {
                        const filterReg = 
                        // @ts-ignore
                        finalParams.filters[Object.keys(finalParams.filters)[i]];
                        // @ts-ignore
                        const value = docblock[Object.keys(finalParams.filters)[i]];
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
                    const filename = __getFilename(file.path);
                    const docblockEntryObj = {};
                    finalParams.fields.forEach((field) => {
                        if (docblock[field] === undefined)
                            return;
                        if (field === 'namespace')
                            docblock[field] = `${packageJson.name.replace('/', '.')}.${docblock[field]}`;
                        docblockEntryObj[field] = docblock[field];
                    });
                    if (docblock.namespace) {
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: __path.relative(__packageRootDir(), file.path) });
                        this._entries[`${docblock.namespace}.${docblock.name}`] = docblockObj;
                    }
                    else if (docblock.name) {
                        children[docblock.name] = docblockEntryObj;
                    }
                });
                docblockObj.children = children;
            });
            emit('log', {
                value: `<yellow>[build]</yellow> <green>${Object.keys(this._entries).length}</green> entries gathered for this docMap`
            });
            emit('notification', {
                type: 'success',
                message: `${this.metas.id} build success`
            });
            // save entries inside the json map property
            docmapJson.generated.map = this._entries;
            // console.log(docmapJson.generated.map['@coffeekraken.sugar.node.process.SProcessPipe']);
            if (finalParams.save) {
                emit('log', {
                    value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(__packageRootDir() + '/', '')}</cyan>"`
                });
                __fs.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
            }
            resolve(docmapJson);
        }));
    }
}
SDocMap.interfaces = {};
export default SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxhQUFhLE1BQU0sdUNBQXVDLENBQUM7QUFDbEUsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sNkJBQTZCLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyw0QkFBNEIsTUFBTSx3Q0FBd0MsQ0FBQztBQUVsRixPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUN0RSxPQUFPLFNBQVMsTUFBTSxzQ0FBc0MsQ0FBQztBQThFN0QsTUFBTSxPQUFRLFNBQVEsUUFBUTtJQWU1Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdDO1FBQ2xELEtBQUssQ0FDSCxXQUFXLENBQ1Q7WUFDRSxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLFNBQVM7YUFDZDtTQUNGLEVBQ0QsUUFBUSxJQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFoQ0o7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFvQixFQUFFLENBQUM7SUF1Qi9CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILElBQUksQ0FBQyxNQUFtQztRQUN0QyxPQUFPLElBQUksVUFBVSxDQUFD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