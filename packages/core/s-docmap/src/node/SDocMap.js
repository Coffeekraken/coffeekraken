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
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __rootDir from '@coffeekraken/sugar/node/path/rootDir';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __fs from 'fs';
import __path from 'path';
import __SDocMapBuildParamsInterface from './interface/SDocMapBuildParamsInterface';
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
            const finalParams = __deepMerge({
                input: `${__packageRoot()}/docmap.json`
            }, params !== null && params !== void 0 ? params : {});
            if (!__fs.existsSync(finalParams.input)) {
                throw new Error(`<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`);
            }
            const extendedPackages = [];
            let finalDocmapJson = {};
            function loadJson(packageNameOrPath, currentPath) {
                var _a, _b, _c, _d, _e, _f, _g, _h;
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
                    finalDocmapJson = Object.assign(Object.assign({}, finalDocmapJson), ((_h = docmapJson.map) !== null && _h !== void 0 ? _h : {}));
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
            const packageRoot = __packageRoot();
            const packageMonoRoot = __packageRoot(process.cwd(), true);
            // check if a file already exists
            if (__fs.existsSync(`${packageRoot}/docmap.json`)) {
                const currentDocmapJson = require(`${packageRoot}/docmap.json`);
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
                    const packageJson = require(`${file.dirPath}/package.json`);
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
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: __path.relative(__packageRoot(), file.path) });
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
            if (finalParams.save) {
                emit('log', {
                    value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(__rootDir() + '/', '')}</cyan>"`
                });
                __fs.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
            }
            resolve(docmapJson);
        }));
    }
}
SDocMap.interfaces = {};
export default SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxhQUFhLE1BQU0sdUNBQXVDLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sMkNBQTJDLENBQUM7QUFDdEUsT0FBTyxTQUFTLE1BQU0sdUNBQXVDLENBQUM7QUFDOUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQUMxQixPQUFPLDZCQUE2QixNQUFNLHlDQUF5QyxDQUFDO0FBMEVwRixNQUFNLE9BQVEsU0FBUSxRQUFRO0lBZTVCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0M7UUFDbEQsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLEtBQUssRUFBRTtnQkFDTCxFQUFFLEVBQUUsU0FBUzthQUNkO1NBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQWhDSjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQW9CLEVBQUUsQ0FBQztJQXVCL0IsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsSUFBSSxDQUFDLE1BQW1DO1FBQ3RDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxNQUFNLFdBQVcsR0FBdUIsV0FBVyxDQUNqRDtnQkFDRSxLQUFLLEVBQUUsR0FBRyxhQUFhLEVBQUUsY0FBYzthQUN4QyxFQUNELE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FDYixDQUFDO1lBRUYsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUN2QyxNQUFNLElBQUksS0FBSyxDQUNiLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLHFDQUFxQyxXQUFXLENBQUMsS0FBSyw2QkFBNkIsQ0FDbkksQ0FBQzthQUNIO1lBRUQsTUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7WUFDdEMsSUFBSSxlQUFlLEdBQUcsRUFBRSxDQUFDO1lBRXpCLFNBQVMsUUFBUSxDQUFDLGlCQUFpQixFQUFFLFdBQVc7O2dCQUM5QyxJQUFJLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFBRSxPQUFPO2dCQUMvRCxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsQ0FBQztnQkFFekMsSUFBSSx5QkFBeUIsQ0FBQztnQkFDOUIsSUFBSTtvQkFDRix5QkFBeUIsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsaUJBQWlCLGNBQWMsQ0FBQyxDQUFDO2lCQUNqRjtnQkFBQyxPQUFNLENBQUMsRUFBRTtvQkFDVCx3QkFBd0I7aUJBQ3pCO2dCQUVELElBQUksQ0FBQyx5QkFBeUI7b0JBQUUsT0FBTztnQkFFdkMsTUFBTSxlQUFlLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxjQUFjLEVBQUUsRUFBRSxDQUFDLENBQUM7Z0JBRS9GLElBQUk7b0JBQ0YsTUFBTSxVQUFVLEdBQUcsT0FBTyxDQUFDLHlCQUF5QixDQUFDLENBQUM7b0JBQ3RELFVBQVUsQ0FBQyxPQUFPLEdBQUc7d0JBQ25CLEdBQUcsQ0FBQyxNQUFBLFVBQVUsQ0FBQyxPQUFPLG1DQUFJLEVBQUUsQ0FBQzt3QkFDN0IsR0FBRyxDQUFDLE1BQUEsTUFBQSxVQUFVLENBQUMsU0FBUywwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsQ0FBQztxQkFDekMsQ0FBQztvQkFDRixVQUFVLENBQUMsR0FBRyxtQ0FDVCxDQUFDLE1BQUEsVUFBVSxDQUFDLEdBQUcsbUNBQUksRUFBRSxDQUFDLEdBQ3RCLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQ3JDLENBQUM7b0JBRUYsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDO29CQUU1QixVQUFVLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFO3dCQUM5QyxRQUFRLENBQUMsa0JBQWtCLEVBQUUsZUFBZSxDQUFDLENBQUM7b0JBQ2hELENBQUMsQ0FBQyxDQUFDO29CQUVILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxVQUFVLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3BELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7d0JBQ3RDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO3dCQUN4RCxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztvQkFDbEMsQ0FBQyxDQUFDLENBQUM7b0JBRUgsZUFBZSxtQ0FDVixlQUFlLEdBQ2YsQ0FBQyxNQUFBLFVBQVUsQ0FBQyxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxDQUMxQixDQUFDO2lCQUNIO2dCQUFDLE9BQU0sQ0FBQyxFQUFFO29CQUNULE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxDQUFDO2lCQUN4QjtZQUNILENBQUM7WUFFRCxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQztZQUUzQywwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLE1BQW9DO1FBQ3hDLE1BQU0sV0FBVyxHQUF3QixDQUN2QyxXQUFXLENBQUMsNkJBQTZCLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQzlELENBQUM7UUFDRixPQUFPLElBQUksVUFBVSxDQUFDLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUU5RCxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNuQixPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsZ0JBQWdCO2FBQzFDLENBQUMsQ0FBQztZQUVILElBQUksVUFBVSxHQUFHO2dCQUNmLEdBQUcsRUFBRSxFQUFFO2dCQUNQLFNBQVMsRUFBRTtvQkFDVCxPQUFPLEVBQUUsRUFBRTtvQkFDWCxHQUFHLEVBQUUsRUFBRTtpQkFDUjthQUNGLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxhQUFhLEVBQUUsQ0FBQztZQUNwQyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTNELGlDQUFpQztZQUNqQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGNBQWMsQ0FBQyxFQUFFO2dCQUNqRCxNQUFNLGlCQUFpQixHQUFHLE9BQU8sQ0FBQyxHQUFHLFdBQVcsY0FBYyxDQUFDLENBQUM7Z0JBQ2hFLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztnQkFDL0IsVUFBVSxDQUFDLFNBQVMsR0FBRztvQkFDckIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsR0FBRyxFQUFFLEVBQUU7aUJBQ1IsQ0FBQTthQUNGO1lBRUQsd0JBQXdCO1lBQ3hCLE1BQU0sV0FBVyxHQUFHLGFBQWEsRUFBRSxDQUFDO1lBRXBDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFO2dCQUUxQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSx5RkFBeUY7aUJBQ2pHLENBQUMsQ0FBQztnQkFFSCxNQUFNLEtBQUssR0FBYSxDQUFDLEdBQUcsV0FBVyxtQ0FBbUMsQ0FBQyxDQUFDO2dCQUM1RSxJQUFJLFdBQVcsS0FBSyxlQUFlLEVBQUU7b0JBQ25DLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxlQUFlLG1DQUFtQyxDQUFDLENBQUM7aUJBQ25FO2dCQUVELE1BQU0sa0JBQWtCLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQ2hELE9BQU8sRUFBRSxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUU7aUJBQ25DLENBQUMsQ0FBQztnQkFFSCxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7Z0JBQ2xDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNsQyxNQUFNLFdBQVcsR0FBRyxPQUFPLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxlQUFlLENBQUMsQ0FBQztvQkFDNUQsWUFBWSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3RDLENBQUMsQ0FBQyxDQUFDO2dCQUVILGFBQWE7Z0JBQ2IsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDdkY7WUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSx5RkFBeUY7YUFDakcsQ0FBQyxDQUFDO1lBRUgsNERBQTREO1lBQzVELE1BQU0sY0FBYyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEtBQUssRUFBRTtnQkFDeEQsR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLE9BQU8sRUFBRSxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUU7YUFDbkMsQ0FBQyxDQUFDO1lBRUgsY0FBYyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDNUIsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLEdBQUcsQ0FBQztnQkFDekIsTUFBTSxTQUFTLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRXRELElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUM1QyxJQUFJLFdBQVcsR0FBUSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztnQkFDekIsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO29CQUM3QixLQUNFLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ1QsYUFBYTtvQkFDYixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUMzQyxDQUFDLEVBQUUsRUFDSDt3QkFDQSxNQUFNLFNBQVM7d0JBQ2IsYUFBYTt3QkFDYixXQUFXLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzNELGFBQWE7d0JBQ2IsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQzVELElBQUksS0FBSyxLQUFLLFNBQVM7NEJBQUUsU0FBUzt3QkFDbEMsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQzs0QkFBRSxPQUFPO3FCQUNwQztvQkFDRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7d0JBQUUsT0FBTztvQkFDL0QsSUFBSSxRQUFRLENBQUMsT0FBTzt3QkFBRSxPQUFPO29CQUU3QixxREFBcUQ7b0JBQ3JELE1BQU0sUUFBUSxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRTFDLE1BQU0sZ0JBQWdCLEdBQWtCLEVBQUUsQ0FBQztvQkFFM0MsV0FBVyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLEVBQUUsRUFBRTt3QkFDbkMsSUFBSSxRQUFRLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUzs0QkFBRSxPQUFPO3dCQUMxQyxJQUFJLEtBQUssS0FBSyxXQUFXOzRCQUN2QixRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDLElBQ3JELFFBQVEsQ0FBQyxLQUFLLENBQ2hCLEVBQUUsQ0FBQzt3QkFDTCxnQkFBZ0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxRQUFRLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQzVDLENBQUMsQ0FBQyxDQUFDO29CQUVILElBQUksUUFBUSxDQUFDLFNBQVMsRUFBRTt3QkFDdEIsV0FBVyxtQ0FDTixnQkFBZ0IsS0FDbkIsUUFBUSxFQUNSLFNBQVMsRUFBRSxRQUFRLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsRUFDMUMsT0FBTyxFQUFFLE1BQU0sQ0FBQyxRQUFRLENBQUMsYUFBYSxFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUNyRCxDQUFDO3dCQUNGLElBQUksQ0FBQyxRQUFRLENBQ1gsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FDekMsR0FBRyxXQUFXLENBQUM7cUJBQ2pCO3lCQUFNLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDeEIsUUFBUSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztxQkFDNUM7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFFbEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxtQ0FDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUM3QiwyQ0FBMkM7YUFDNUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQjthQUMxQyxDQUFDLENBQUM7WUFFSCw0Q0FBNEM7WUFDNUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUV6QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ3BCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLDZFQUE2RSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDN0csU0FBUyxFQUFFLEdBQUcsR0FBRyxFQUNqQixFQUFFLENBQ0gsVUFBVTtpQkFDWixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsV0FBVyxDQUFDLE9BQU8sRUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNwQyxDQUFDO2FBQ0g7WUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdEIsQ0FBQyxDQUFBLENBQUMsQ0FBQztJQUNMLENBQUM7O0FBdlNNLGtCQUFVLEdBQUcsRUFBRSxDQUFDO0FBMFN6QixlQUFlLE9BQU8sQ0FBQyJ9