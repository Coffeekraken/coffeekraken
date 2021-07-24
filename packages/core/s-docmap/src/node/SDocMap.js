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
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __path from 'path';
import __SDocMapBuildParamsInterface from './interface/SDocMapBuildParamsInterface';
import __SDocMapReadParamsInterface from './interface/SDocMapReadParamsInterface';
import __SDocmapSnapshotParamsInterface from './interface/SDocmapSnapshotParamsInterface';
import __SDocmapInstallSnapshotParamsInterface from './interface/SDocmapInstallSnapshotParamsInterface';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __SDuration from '@coffeekraken/s-duration';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
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
            // snapshot param handling
            if (finalParams.snapshot) {
                finalParams.input = __path.resolve(finalParams.snapshotDir, finalParams.snapshot, 'docmap.json');
            }
            let docmapRootPath = __folderPath(finalParams.input);
            if (!__fs.existsSync(finalParams.input)) {
                throw new Error(`<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`);
            }
            const packageMonoRoot = __packageRoot(process.cwd(), true);
            const extendedPackages = [];
            const finalDocmapJson = {
                meta: {
                    type: finalParams.snapshot ? 'snapshot' : 'current',
                    snapshot: finalParams.snapshot
                },
                map: {},
                snapshots: []
            };
            function loadJson(packageNameOrPath, currentPath) {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
                if (extendedPackages.indexOf(packageNameOrPath) !== -1)
                    return;
                extendedPackages.push(packageNameOrPath);
                let currentPathDocmapJsonPath, potentialPackagePath = __path.resolve(docmapRootPath, 'node_modules', packageNameOrPath, 'docmap.json'), potentialRootPackagePath = __path.resolve(packageMonoRoot, 'node_modules', packageNameOrPath, 'docmap.json');
                if (__fs.existsSync(potentialPackagePath)) {
                    currentPathDocmapJsonPath = potentialPackagePath;
                }
                else if (__fs.existsSync(`${packageNameOrPath}/docmap.json`)) {
                    currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
                }
                else if (__fs.existsSync(potentialRootPackagePath)) {
                    currentPathDocmapJsonPath = potentialRootPackagePath;
                }
                else {
                    throw new Error(`<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`);
                }
                if (!currentPathDocmapJsonPath)
                    return;
                const extendsRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');
                try {
                    const packageJsonPath = `${extendsRootPath}/package.json`;
                    if (!__fs.existsSync(packageJsonPath)) {
                        throw new Error(`<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`);
                    }
                    const currentPackageJson = __readJsonSync(packageJsonPath);
                    const docmapJson = __readJsonSync(currentPathDocmapJsonPath);
                    Object.keys(docmapJson.map).forEach(namespace => {
                        if (docmapJson.map[namespace]) {
                            docmapJson.map[namespace].package = currentPackageJson.name;
                        }
                    });
                    Object.keys((_b = (_a = docmapJson.generated) === null || _a === void 0 ? void 0 : _a.map) !== null && _b !== void 0 ? _b : []).forEach(namespace => {
                        if (docmapJson.generated.map[namespace]) {
                            docmapJson.generated.map[namespace].package = currentPackageJson.name;
                        }
                    });
                    docmapJson.extends = [
                        ...((_c = docmapJson.extends) !== null && _c !== void 0 ? _c : []),
                        ...((_e = (_d = docmapJson.generated) === null || _d === void 0 ? void 0 : _d.extends) !== null && _e !== void 0 ? _e : [])
                    ];
                    docmapJson.map = Object.assign(Object.assign({}, ((_f = docmapJson.map) !== null && _f !== void 0 ? _f : {})), ((_h = (_g = docmapJson.generated) === null || _g === void 0 ? void 0 : _g.map) !== null && _h !== void 0 ? _h : {}));
                    delete docmapJson.generated;
                    docmapJson.extends.forEach(extendsPackageName => {
                        loadJson(extendsPackageName, extendsRootPath);
                    });
                    Object.keys((_j = docmapJson.map) !== null && _j !== void 0 ? _j : {}).forEach((namespace, i) => {
                        const obj = docmapJson.map[namespace];
                        obj.path = __path.resolve(extendsRootPath, obj.relPath);
                        docmapJson.map[namespace] = obj;
                    });
                    finalDocmapJson.map = Object.assign(Object.assign({}, finalDocmapJson.map), ((_k = docmapJson.map) !== null && _k !== void 0 ? _k : {}));
                }
                catch (e) {
                    console.log('ERRO', e);
                }
            }
            const docmapJsonFolderPath = __folderPath(finalParams.input);
            loadJson(docmapJsonFolderPath, docmapJsonFolderPath);
            // loadJson(__packageRootDir(), __packageRootDir());
            // loading available snapshots
            try {
                const availableSnapshots = __fs.readdirSync(finalParams.snapshotDir);
                finalDocmapJson.snapshots = availableSnapshots;
            }
            catch (e) { }
            // save the docmap json
            this._docmapJson = finalDocmapJson;
            // return the final docmap
            resolve(finalDocmapJson);
        }), {
            metas: {
                id: `read`
            }
        });
    }
    /**
     * @name          extractMenu
     * @type          Function
     * @async
     *
     * This method allows you to extract the docmap items that have a "menu" array property and
     * return all of these in a structured object
     *
     * @return        {Record<string: SFile>}       The structured menu tree with an SFile instance attached for each source file
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    extractMenu(docmapJson = this._docmapJson) {
        return __awaiter(this, void 0, void 0, function* () {
            const menuObj = {}, menuObjBySlug = {};
            if (!docmapJson) {
                docmapJson = yield this.read();
            }
            // extract menus
            Object.keys(docmapJson.map).forEach(namespace => {
                const docmapObj = docmapJson.map[namespace];
                if (!docmapObj.menu)
                    return;
                const dotPath = docmapObj.menu.tree.map(l => {
                    return __camelCase(l);
                }).join('.');
                let currentObj = menuObj;
                dotPath.split('.').forEach((part, i) => {
                    if (!currentObj[part]) {
                        currentObj[part] = {
                            name: docmapObj.menu.tree[i]
                        };
                    }
                    if (i >= dotPath.split('.').length - 1) {
                        currentObj[part][__camelCase(docmapObj.name)] = {
                            name: docmapObj.name,
                            slug: docmapObj.menu.slug,
                            tree: docmapObj.menu.tree,
                            // docmap: docmapObj
                        };
                        menuObjBySlug[docmapObj.menu.slug] = {
                            name: docmapObj.name,
                            slug: docmapObj.menu.slug,
                            tree: docmapObj.menu.tree,
                            docmap: docmapObj
                        };
                    }
                    currentObj = currentObj[part];
                });
            });
            return {
                tree: menuObj,
                slug: menuObjBySlug
            };
        });
    }
    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docmap.json file
     *
     * @param         {Partial<ISDocMapBuildParams>}          params        The params to use to build your docmap
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
                extends: [],
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
                // if (packageRoot !== packageMonoRoot) {
                //   globs.push(`${packageMonoRoot}/node_modules/**{0,2}/docmap.json`);
                // }
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
            filesInPackage.forEach((file, i) => {
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
                        this._entries[`${docblock.namespace}.${__camelCase(docblock.name)}`] = docblockObj;
                    }
                    else if (docblock.name) {
                        children[__camelCase(docblock.name)] = docblockEntryObj;
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
        }), {
            metas: {
                id: `build`
            }
        });
    }
    /**
     * @name        installSnapshot
     * @type        Function
     * @async
     *
     * This method allows you to install all the snapshots dependencies
     * to make the access to these works.
     *
     * @param         {Partial<ISDocmapInstallSnapshotsParams>}        params      Some params to configure your snapshots installation process
     * @returns       {Promise<any>}              A promise resolved with the installation process result
     *
     * @since   2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    installSnapshot(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = __deepMerge(__SDocmapInstallSnapshotParamsInterface.defaults(), params !== null && params !== void 0 ? params : {});
            const duration = new __SDuration();
            const folders = __SGlob.resolve(finalParams.glob, {
                defaultExcludes: false
            });
            if (!folders.length) {
                emit('log', {
                    value: `<cyan>[info]</cyan> It seem's that you don't have any snapshot(s) matching the glob "<cyan>${params.glob}</cyan>". Try generating a snapshot first with the command "<yellow>sugar docmap.snapshot</yellow>"`
                });
                return resolve();
            }
            for (let i = 0; i < folders.length; i++) {
                const folderPath = folders[i];
                emit('log', {
                    value: `<yellow>[install]</yellow> Installing snapshot <yellow>${__path.relative(__packageRootDir(), folderPath)}</yellow>`
                });
                const packageJson = __packageJson();
                const packageMonoRootPath = __packageRoot(process.cwd(), true);
                // symlink repos from monorepo
                const removedDependencies = {}, removedDevDependencies = {};
                if (packageMonoRootPath !== __packageRoot()) {
                    const packageJsonFiles = __SGlob.resolve(`${packageMonoRootPath}/**/package.json`);
                    packageJsonFiles.forEach(file => {
                        var _a, _b, _c, _d;
                        if (file.dirPath === packageMonoRootPath)
                            return;
                        if (!((_a = packageJson.dependencies) === null || _a === void 0 ? void 0 : _a[file.content.name]) && !((_b = packageJson.devDependencies) === null || _b === void 0 ? void 0 : _b[file.content.name]))
                            return;
                        if ((_c = packageJson.dependencies) === null || _c === void 0 ? void 0 : _c[file.content.name]) {
                            removedDependencies[file.content.name] = packageJson.dependencies[file.content.name];
                            delete packageJson.dependencies[file.content.name];
                        }
                        if ((_d = packageJson.devDependencies) === null || _d === void 0 ? void 0 : _d[file.content.name]) {
                            removedDevDependencies[file.content.name] = packageJson.devDependencies[file.content.name];
                            delete packageJson.devDependencies[file.content.name];
                        }
                        const packageFolderPath = __folderPath(file.path);
                        const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
                        __ensureDirSync(destinationFolderPath.split('/').slice(0, -1).join('/'));
                        try {
                            __fs.unlinkSync(destinationFolderPath);
                        }
                        catch (e) {
                        }
                        __fs.symlinkSync(packageFolderPath, destinationFolderPath);
                    });
                }
                if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
                    __writeJsonSync(`${folderPath}/package.json`, packageJson);
                }
                // installing dependencies
                yield pipe(__npmInstall({
                    cwd: folderPath,
                    yarn: true,
                    args: {
                        silent: false
                    }
                }));
                // restoring package.json
                if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
                    packageJson.dependencies = Object.assign(Object.assign({}, packageJson.dependencies), removedDependencies);
                    packageJson.devDependencies = Object.assign(Object.assign({}, packageJson.devDependencies), removedDevDependencies);
                    __writeJsonSync(`${folderPath}/package.json`, packageJson);
                }
                emit('log', {
                    value: `<green>[success]</green> Snapshot "<yellow>${__path.relative(__packageRootDir(), folderPath)}</yellow>" installed <green>successfully</green>`
                });
            }
            emit('log', {
                value: `<green>[success]</green> Snapshot(s) installed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
            });
        }), {
            metas: {
                id: `installSnapshots`
            }
        });
    }
    /**
     * @name        snapshot
     * @type        Function
     * @async
     *
     * This method allows you to make a snapshot of your project doc in the docmap.json format
     * and store it to have access later. It is usefull to make versions backup for example.
     *
     * @param         {Partial<ISDocMapSnapshotParams>}          params       THe params you want to make your snapshot
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    snapshot(params) {
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = (__deepMerge(__SDocmapSnapshotParamsInterface.defaults(), params));
            const duration = new __SDuration();
            emit('log', {
                value: `<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`
            });
            if (!__fs.existsSync(`${__packageRootDir()}/package.json`)) {
                throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a package.json file is required in order to create a snapshot...`);
            }
            if (!__fs.existsSync(`${__packageRootDir()}/docmap.json`)) {
                throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a docmap.json file is required in order to create a snapshot...`);
            }
            const packageJson = __packageJson();
            const docmapJson = __readJsonSync(`${__packageRootDir()}/docmap.json`);
            // write the docmap
            const outDir = __path.resolve(finalParams.outDir, packageJson.version);
            __removeSync(outDir);
            __ensureDirSync(outDir);
            // copy package.json file
            __copySync(`${__packageRootDir()}/package.json`, `${outDir}/package.json`);
            __copySync(`${__packageRootDir()}/docmap.json`, `${outDir}/docmap.json`);
            try {
                __copySync(`${__packageRootDir()}/package-lock.json`, `${outDir}/package-lock.json`);
                __copySync(`${__packageRootDir()}/yarn.lock`, `${outDir}/yarn.lock`);
            }
            catch (e) { }
            const fullMap = Object.assign(Object.assign({}, docmapJson.map), docmapJson.generated.map);
            Object.keys(fullMap).forEach(namespace => {
                const docmapObj = fullMap[namespace];
                const path = __path.resolve(__packageRootDir(), docmapObj.relPath);
                let content = __fs.readFileSync(path, 'utf8').toString();
                if (docmapObj.type === 'markdown') {
                }
                else {
                    const docblock = new __SDocblock(content);
                    content = docblock.toString();
                }
                __writeFileSync(__path.resolve(outDir, docmapObj.relPath), content);
            });
            emit('log', {
                value: `<green>[save]</green> Snapshot saved under "<cyan>${__path.relative(process.cwd(), outDir)}</cyan>"`
            });
            emit('log', {
                value: `<green>[success]</green> Snapshot generated <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`
            });
            resolve();
        }), {
            metas: {
                id: `snapshot`
            }
        });
    }
}
SDocMap.interfaces = {};
export default SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxhQUFhLE1BQU0sdUNBQXVDLENBQUM7QUFDbEUsT0FBTyxnQkFBZ0IsTUFBTSw4Q0FBOEMsQ0FBQztBQUM1RSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sNkJBQTZCLE1BQU0seUNBQXlDLENBQUM7QUFDcEYsT0FBTyw0QkFBNEIsTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRixPQUFPLGdDQUFnQyxNQUFNLDRDQUE0QyxDQUFDO0FBQzFGLE9BQU8sdUNBQXVDLE1BQU0sbURBQW1ELENBQUM7QUFFeEcsT0FBTyxjQUFjLE1BQU0sMENBQTBDLENBQUM7QUFFdEUsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFFeEUsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFDOUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxZQUFZLE1BQU0sc0NBQXNDLENBQUM7QUFDaEUsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENB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