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
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
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
     * @async
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
                metas: {
                    type: finalParams.snapshot ? 'snapshot' : 'current',
                    snapshot: finalParams.snapshot
                },
                map: {},
                menu: {},
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
            const docmapJsonFolderPath = __folderPath(finalParams.input);
            loadJson(docmapJsonFolderPath, docmapJsonFolderPath);
            // loading available snapshots
            const availableSnapshots = __fs.readdirSync(finalParams.snapshotDir);
            finalDocmapJson.snapshots = availableSnapshots;
            // save the docmap json
            this._docmapJson = finalDocmapJson;
            finalDocmapJson.menu = this._extractMenu(finalDocmapJson);
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
     *
     * This method allows you to extract the docmap items that have a "menu" array property and
     * return all of these in a structured object
     *
     * @return        {Record<string: SFile>}       The structured menu tree with an SFile instance attached for each source file
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _extractMenu(docmapJson = this._docmapJson) {
        const docmapJsonMenuByPackage = {};
        // split menus by packages
        Object.keys(docmapJson.map).forEach(namespace => {
            const docmapObj = docmapJson.map[namespace];
            if (!docmapObj.menu)
                return;
            if (!docmapJsonMenuByPackage[docmapObj.package]) {
                docmapJsonMenuByPackage[docmapObj.package] = [];
            }
            docmapJsonMenuByPackage[docmapObj.package].push(docmapObj);
        });
        let finalMenu = {
            packages: {}
        };
        const packageJson = __packageJsonSync();
        Object.keys(docmapJsonMenuByPackage).forEach(packageName => {
            const menuObj = this._extractMenuFromDocmapJsonStack(docmapJsonMenuByPackage[packageName]);
            if (packageName === packageJson.name) {
                finalMenu = Object.assign(Object.assign({}, finalMenu), menuObj);
            }
            else {
                const scopedSlugMenu = {};
                Object.keys(menuObj.slug).forEach(slug => {
                    scopedSlugMenu[`/${packageName}${slug}`] = menuObj.slug[slug];
                });
                finalMenu.packages[packageName] = {
                    name: packageJson.name,
                    tree: __deepMap(menuObj.tree, ({ prop, value }) => {
                        if (prop === 'slug')
                            return `/${packageName}${value}`;
                        return value;
                    }),
                    slug: scopedSlugMenu
                };
            }
        });
        return finalMenu;
    }
    _extractMenuFromDocmapJsonStack(docmapJsonMap) {
        const menuObj = {}, menuObjBySlug = {}, menuObjByPackage = {};
        // extract menus
        Object.keys(docmapJsonMap).forEach(namespace => {
            const docmapObj = docmapJsonMap[namespace];
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
            const packageJson = __packageJsonSync();
            if (!finalParams.noExtends) {
                emit('log', {
                    value: `<yellow>[build]</yellow> Building extends array from existing docmap compliant packages`
                });
                const globs = [`${packageRoot}/node_modules/**{0,2}/docmap.json`];
                if (packageRoot !== packageMonoRoot) {
                    globs.push(`${packageMonoRoot}/node_modules/**{0,2}/docmap.json`);
                }
                const currentDocmapFiles = __SGlob.resolve(globs, {
                    defaultExcludes: false,
                    exclude: (_a = finalParams.exclude) !== null && _a !== void 0 ? _a : []
                });
                const extendsArray = [];
                currentDocmapFiles.forEach((file) => {
                    const currentPackageJson = __readJsonSync(`${file.dirPath}/package.json`);
                    if (currentPackageJson.name === packageJson.name)
                        return;
                    extendsArray.push(currentPackageJson.name);
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
                const packageJson = __packageJsonSync();
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
            const packageJson = __packageJsonSync();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQ0EsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxpQkFBaUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRSxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyx1Q0FBdUMsTUFBTSxtREFBbUQsQ0FBQztBQUV4RyxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFlBQVksTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRSxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUlsRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQTRHdEUsTUFBTSxPQUFRLFNBQVEsUUFBUTtJQTJCNUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF3QztRQUNsRCxLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxTQUFTO2FBQ2Q7U0FDRixFQUNELFFBQVEsSUFBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBNUNKOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBb0IsRUFBRSxDQUFDO0lBbUMvQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsSUFBSSxDQUFDLE1BQW9DO1FBQ3ZDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0RCxNQUFNLFdBQVcsR0FBdUIsV0FBVyxDQUNqRCw0QkFBNEIsQ0FBQyxRQUFRLEVBQUUsRUFDdkMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUNiLENBQUM7WUFFRiwwQkFBMEI7WUFDMUIsSUFBSSxXQUFXLENBQUMsUUFBUSxFQUFFO2dCQUN4QixXQUFXLENBQUMsS0FBSyxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLFdBQVcsRUFBRSxXQUFXLENBQUMsUUFBUSxFQUFFLGFBQWEsQ0FBQyxDQUFDO2FBQ2xHO1lBRUQsSUFBSSxjQUFjLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUVyRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ3ZDLE1BQU0sSUFBSSxLQUFLLENBQ2IsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUscUNBQXFDLFdBQVcsQ0FBQyxLQUFLLDZCQUE2QixDQUNuSSxDQUFDO2FBQ0g7WUFFRCxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTNELE1BQU0sZ0JBQWdCLEdBQWEsRUFBRSxDQUFDO1lBQ3RDLE1BQU0sZUFBZSxHQUF5QjtnQkFDNUMsS0FBSyxFQUFFO29CQUNMLElBQUksRUFBRSxXQUFXLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLFNBQVM7b0JBQ25ELFFBQVEsRUFBRSxXQUFXLENBQUMsUUFBUTtpQkFDL0I7Z0JBQ0QsR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLEVBQUU7Z0JBQ1IsU0FBUyxFQUFFLEVBQUU7YUFDZCxDQUFDO1lBRUYsU0FBUyxRQUFRLENBQUMsaUJBQWlCLEVBQUUsV0FBVzs7Z0JBQzlDLElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU87Z0JBQy9ELGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLHlCQUF5QixFQUN6QixvQkFBb0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxjQUFjLEVBQUUsaUJBQWlCLEVBQUUsYUFBYSxDQUFDLEVBQ3ZHLHdCQUF3QixHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLGNBQWMsRUFBRSxpQkFBaUIsRUFBRSxhQUFhLENBQUMsQ0FBQztnQkFFakgsSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLG9CQUFvQixDQUFDLEVBQUU7b0JBQ3pDLHlCQUF5QixHQUFHLG9CQUFvQixDQUFDO2lCQUNsRDtxQkFBTSxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxpQkFBaUIsY0FBYyxDQUFDLEVBQUU7b0JBQzlELHlCQUF5QixHQUFHLEdBQUcsaUJBQWlCLGNBQWMsQ0FBQztpQkFDaEU7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLHdCQUF3QixDQUFDLEVBQUU7b0JBQ3BELHlCQUF5QixHQUFHLHdCQUF3QixDQUFDO2lCQUN0RDtxQkFBTTtvQkFDTCxNQUFNLElBQUksS0FBSyxDQUFDLDJFQUEyRSxpQkFBaUIsNEJBQTRCLENBQUMsQ0FBQztpQkFDM0k7Z0JBRUQsSUFBSSxDQUFDLHlCQUF5QjtvQkFBRSxPQUFPO2dCQUV2QyxNQUFNLGVBQWUsR0FBRyx5QkFBeUIsQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO2dCQUU5RSxNQUFNLGVBQWUsR0FBRyxHQUFHLGVBQWUsZUFBZSxDQUFDO2dCQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxlQUFlLENBQUMsRUFBRTtvQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FBQyxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSwwQ0FBMEMsZUFBZSxpRkFBaUYsQ0FBQyxDQUFDO2lCQUMzTDtnQkFFRCxNQUFNLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDM0QsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLHlCQUF5QixDQUFDLENBQUM7Z0JBRTdELE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtvQkFDOUMsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUM3QixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7cUJBQzdEO2dCQUNILENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO29CQUMvRCxJQUFJLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUN2QyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEdBQUcsa0JBQWtCLENBQUMsSUFBSSxDQUFDO3FCQUN2RTtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFSCxVQUFVLENBQUMsT0FBTyxHQUFHO29CQUNuQixHQUFHLENBQUMsTUFBQSxVQUFVLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUM7b0JBQzdCLEdBQUcsQ0FBQyxNQUFBLE1BQUEsVUFBVSxDQUFDLFNBQVMsMENBQUUsT0FBTyxtQ0FBSSxFQUFFLENBQUM7aUJBQ3pDLENBQUM7Z0JBQ0YsVUFBVSxDQUFDLEdBQUcsbUNBQ1QsQ0FBQyxNQUFBLFVBQVUsQ0FBQyxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxHQUN0QixDQUFDLE1BQUEsTUFBQSxVQUFVLENBQUMsU0FBUywwQ0FBRSxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxDQUNyQyxDQUFDO2dCQUVGLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFFNUIsVUFBVSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsa0JBQWtCLENBQUMsRUFBRTtvQkFDOUMsUUFBUSxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO2dCQUNoRCxDQUFDLENBQUMsQ0FBQztnQkFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQUEsVUFBVSxDQUFDLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6RCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUN0QyxHQUFHLENBQUMsSUFBSSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFDeEQsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLENBQUM7Z0JBQ2xDLENBQUMsQ0FBQyxDQUFDO2dCQUVILGVBQWUsQ0FBQyxHQUFHLG1DQUNkLGVBQWUsQ0FBQyxHQUFHLEdBQ25CLENBQUMsTUFBQSxVQUFVLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUMsQ0FDMUIsQ0FBQztZQUVKLENBQUM7WUFFRCxNQUFNLG9CQUFvQixHQUFHLFlBQVksQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0QsUUFBUSxDQUFDLG9CQUFvQixFQUFFLG9CQUFvQixDQUFDLENBQUM7WUFFckQsOEJBQThCO1lBQzlCLE1BQU0sa0JBQWtCLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDckUsZUFBZSxDQUFDLFNBQVMsR0FBRyxrQkFBa0IsQ0FBQztZQUUvQyx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7WUFFbkMsZUFBZSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBRTFELDBCQUEwQjtZQUMxQixPQUFPLENBQUMsZUFBZSxDQUFDLENBQUM7UUFDM0IsQ0FBQyxDQUFBLEVBQUU7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE1BQU07YUFDWDtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFlBQVksQ0FBQyxhQUFtQyxJQUFJLENBQUMsV0FBVztRQUU1RCxNQUFNLHVCQUF1QixHQUFHLEVBQUUsQ0FBQztRQUVuQywwQkFBMEI7UUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLFNBQVMsQ0FBQyxFQUFFO1lBQzlDLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDL0MsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNqRDtZQUNELHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDN0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBRztZQUNkLFFBQVEsRUFBRSxFQUFFO1NBQ2IsQ0FBQztRQUNGLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixFQUFFLENBQUM7UUFFeEMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsRUFBRTtZQUV6RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsK0JBQStCLENBQUMsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQztZQUUzRixJQUFJLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNwQyxTQUFTLG1DQUNKLFNBQVMsR0FDVCxPQUFPLENBQ1gsQ0FBQTthQUNGO2lCQUFNO2dCQUNMLE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUN2QyxjQUFjLENBQUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNoRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHO29CQUNoQyxJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7b0JBQ3RCLElBQUksRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUMsSUFBSSxFQUFFLEtBQUssRUFBQyxFQUFFLEVBQUU7d0JBQzVDLElBQUksSUFBSSxLQUFLLE1BQU07NEJBQUUsT0FBTyxJQUFJLFdBQVcsR0FBRyxLQUFLLEVBQUUsQ0FBQzt3QkFDdEQsT0FBTyxLQUFLLENBQUM7b0JBQ2YsQ0FBQyxDQUFDO29CQUNKLElBQUksRUFBRSxjQUFjO2lCQUNyQixDQUFBO2FBQ0Y7UUFDSCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sU0FBUyxDQUFDO0lBRXJCLENBQUM7SUFFRCwrQkFBK0IsQ0FBQyxhQUFhO1FBRTNDLE1BQU0sT0FBTyxHQUFHLEVBQ2YsRUFBRSxhQUFhLEdBQUcsRUFBRSxFQUFFLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUU3QyxnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7WUFDM0MsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBRTVCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRTtnQkFDMUMsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDeEIsQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWIsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBRXpCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUVyQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNyQixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUc7d0JBQ2pCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQzdCLENBQUM7aUJBQ0g7Z0JBRUQsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUUsQ0FBQyxFQUFFO29CQUNyQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHO3dCQUM5QyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7d0JBQ3BCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLG9CQUFvQjtxQkFDckIsQ0FBQztvQkFDRixhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDbkMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO3dCQUNwQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixNQUFNLEVBQUUsU0FBUztxQkFDbEIsQ0FBQztpQkFDSDtnQkFFRCxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBRWhDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0wsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsYUFBYTtTQUNwQixDQUFDO0lBQ0osQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FBQyxNQUFvQztRQUN4QyxNQUFNLFdBQVcsR0FBd0IsQ0FDdkMsV0FBVyxDQUFDLDZCQUE2QixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUM5RCxDQUFDO1FBQ0YsT0FBTyxJQUFJLFVBQVUsQ0FBQyxDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFFOUQsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQjthQUMxQyxDQUFDLENBQUM7WUFFSCxJQUFJLFVBQVUsR0FBRztnQkFDZixHQUFHLEVBQUUsRUFBRTtnQkFDUCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUU7b0JBQ1QsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsR0FBRyxFQUFFLEVBQUU7aUJBQ1I7YUFDRixDQUFDO1lBRUYsTUFBTSxXQUFXLEdBQUcsZ0JBQWdCLEVBQUUsQ0FBQztZQUN2QyxNQUFNLGVBQWUsR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFLElBQUksQ0FBQyxDQUFDO1lBRTNELGlDQUFpQztZQUNqQyxJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGNBQWMsQ0FBQyxFQUFFO2dCQUNqRCxNQUFNLGlCQUFpQixHQUFHLGNBQWMsQ0FBQyxHQUFHLFdBQVcsY0FBYyxDQUFDLENBQUM7Z0JBQ3ZFLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztnQkFDL0IsVUFBVSxDQUFDLFNBQVMsR0FBRztvQkFDckIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsR0FBRyxFQUFFLEVBQUU7aUJBQ1IsQ0FBQTthQUNGO1lBRUQsd0JBQXdCO1lBQ3hCLE1BQU0sV0FBVyxHQUFHLGlCQUFpQixFQUFFLENBQUM7WUFFeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0JBRTFCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLHlGQUF5RjtpQkFDakcsQ0FBQyxDQUFDO2dCQUVILE1BQU0sS0FBSyxHQUFhLENBQUMsR0FBRyxXQUFXLG1DQUFtQyxDQUFDLENBQUM7Z0JBQzVFLElBQUksV0FBVyxLQUFLLGVBQWUsRUFBRTtvQkFDbkMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLGVBQWUsbUNBQW1DLENBQUMsQ0FBQztpQkFDbkU7Z0JBRUQsTUFBTSxrQkFBa0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDaEQsZUFBZSxFQUFFLEtBQUs7b0JBQ3RCLE9BQU8sRUFBRSxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUU7aUJBQ25DLENBQUMsQ0FBQztnQkFFSCxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7Z0JBQ2xDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNsQyxNQUFNLGtCQUFrQixHQUFHLGNBQWMsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLGVBQWUsQ0FBQyxDQUFDO29CQUMxRSxJQUFJLGtCQUFrQixDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSTt3QkFBRSxPQUFPO29CQUN6RCxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUM3QyxDQUFDLENBQUMsQ0FBQztnQkFFSCxhQUFhO2dCQUNiLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQ3ZGO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUseUZBQXlGO2FBQ2pHLENBQUMsQ0FBQztZQUVILDREQUE0RDtZQUM1RCxNQUFNLGNBQWMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxLQUFLLEVBQUU7Z0JBQ3hELEdBQUcsRUFBRSxXQUFXO2dCQUNoQixPQUFPLEVBQUUsTUFBQSxXQUFXLENBQUMsT0FBTyxtQ0FBSSxFQUFFO2FBQ25DLENBQUMsQ0FBQztZQUVILGNBQWMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBRWpDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxHQUFHLENBQUM7Z0JBQ3pCLE1BQU0sU0FBUyxHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUV0RCxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07b0JBQUUsT0FBTztnQkFDNUMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO2dCQUMxQixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7Z0JBQ3pCLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxRQUFRLEVBQUUsRUFBRTtvQkFDN0IsS0FDRSxJQUFJLENBQUMsR0FBRyxDQUFDO29CQUNULGFBQWE7b0JBQ2IsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFDM0MsQ0FBQyxFQUFFLEVBQ0g7d0JBQ0EsTUFBTSxTQUFTO3dCQUNiLGFBQWE7d0JBQ2IsV0FBVyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUMzRCxhQUFhO3dCQUNiLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUM1RCxJQUFJLEtBQUssS0FBSyxTQUFTOzRCQUFFLFNBQVM7d0JBQ2xDLElBQUksS0FBSyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUM7NEJBQUUsT0FBTztxQkFDcEM7b0JBQ0QsSUFBSSxRQUFRLENBQUMsSUFBSSxJQUFJLFFBQVEsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxHQUFHO3dCQUFFLE9BQU87b0JBQy9ELElBQUksUUFBUSxDQUFDLE9BQU87d0JBQUUsT0FBTztvQkFFN0IscURBQXFEO29CQUNyRCxNQUFNLFFBQVEsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUUxQyxNQUFNLGdCQUFnQixHQUFrQixFQUFFLENBQUM7b0JBRTNDLFdBQVcsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxFQUFFLEVBQUU7d0JBQ25DLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7NEJBQUUsT0FBTzt3QkFDMUMsSUFBSSxLQUFLLEtBQUssV0FBVzs0QkFDdkIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUNyRCxRQUFRLENBQUMsS0FBSyxDQUNoQixFQUFFLENBQUM7d0JBQ0wsZ0JBQWdCLENBQUMsS0FBSyxDQUFDLEdBQUcsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUM1QyxDQUFDLENBQUMsQ0FBQztvQkFFSCxJQUFJLFFBQVEsQ0FBQyxTQUFTLEVBQUU7d0JBQ3RCLFdBQVcsbUNBQ04sZ0JBQWdCLEtBQ25CLFFBQVEsRUFDUixTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzFDLE9BQU8sRUFBRSxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUN4RCxDQUFDO3dCQUNGLElBQUksQ0FBQyxRQUFRLENBQ1gsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FDdEQsR0FBRyxXQUFXLENBQUM7cUJBQ2pCO3lCQUFNLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDeEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztxQkFDekQ7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7WUFFbEMsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxtQ0FDTCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUM3QiwyQ0FBMkM7YUFDNUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDbkIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQjthQUMxQyxDQUFDLENBQUM7WUFFSCw0Q0FBNEM7WUFDNUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUV6QywwRkFBMEY7WUFFMUYsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNwQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSw2RUFBNkUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQzdHLGdCQUFnQixFQUFFLEdBQUcsR0FBRyxFQUN4QixFQUFFLENBQ0gsVUFBVTtpQkFDWixDQUFDLENBQUM7Z0JBQ0gsSUFBSSxDQUFDLGFBQWEsQ0FDaEIsV0FBVyxDQUFDLE9BQU8sRUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUNwQyxDQUFDO2FBQ0g7WUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFdEIsQ0FBQyxDQUFBLEVBQUU7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLE9BQU87YUFDWjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsZUFBZSxDQUFDLE1BQStDO1FBQzdELE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUU7WUFFNUQsTUFBTSxXQUFXLEdBQW1DLFdBQVcsQ0FDN0QsdUNBQXVDLENBQUMsUUFBUSxFQUFFLEVBQ2xELE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FDYixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLEVBQUUsQ0FBQztZQUVuQyxNQUFNLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2hELGVBQWUsRUFBRSxLQUFLO2FBQ3ZCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNuQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNWLEtBQUssRUFBRSw4RkFBOEYsTUFBTSxDQUFDLElBQUkscUdBQXFHO2lCQUN0TixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUNsQjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUMsQ0FBQyxFQUFFLENBQUMsR0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxNQUFNLFVBQVUsR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLDBEQUEwRCxNQUFNLENBQUMsUUFBUSxDQUFDLGdCQUFnQixFQUFFLEVBQUUsVUFBVSxDQUFDLFdBQVc7aUJBQzVILENBQUMsQ0FBQztnQkFFSCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN4QyxNQUFNLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRS9ELDhCQUE4QjtnQkFDOUIsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLEVBQUUsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO2dCQUM1RCxJQUFJLG1CQUFtQixLQUFLLGFBQWEsRUFBRSxFQUFFO29CQUMzQyxNQUFNLGdCQUFnQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsR0FBRyxtQkFBbUIsa0JBQWtCLENBQUMsQ0FBQztvQkFFbkYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzt3QkFFOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLG1CQUFtQjs0QkFBRSxPQUFPO3dCQUNqRCxJQUFJLENBQUMsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxZQUFZLDBDQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUEsSUFBSSxDQUFDLENBQUEsTUFBQSxXQUFXLENBQUMsZUFBZSwwQ0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFBOzRCQUFFLE9BQU87d0JBRWhILElBQUksTUFBQSxXQUFXLENBQUMsWUFBWSwwQ0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNqRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDckYsT0FBTyxXQUFXLENBQUMsWUFBWSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ3BEO3dCQUNELElBQUksTUFBQSxXQUFXLENBQUMsZUFBZSwwQ0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUNwRCxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDM0YsT0FBTyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7eUJBQ3ZEO3dCQUVELE1BQU0saUJBQWlCLEdBQUcsWUFBWSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzt3QkFDbEQsTUFBTSxxQkFBcUIsR0FBRyxHQUFHLFVBQVUsaUJBQWlCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxFQUFFLENBQUM7d0JBQ2hGLGVBQWUsQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO3dCQUN4RSxJQUFJOzRCQUNGLElBQUksQ0FBQyxVQUFVLENBQUMscUJBQXFCLENBQUMsQ0FBQzt5QkFDeEM7d0JBQUMsT0FBTSxDQUFDLEVBQUU7eUJBQ1Y7d0JBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO29CQUM3RCxDQUFDLENBQUMsQ0FBQztpQkFDSjtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDekYsZUFBZSxDQUFDLEdBQUcsVUFBVSxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQzVEO2dCQUVELDBCQUEwQjtnQkFDMUIsTUFBTSxJQUFJLENBQUMsWUFBWSxDQUFDO29CQUN0QixHQUFHLEVBQUUsVUFBVTtvQkFDZixJQUFJLEVBQUUsSUFBSTtvQkFDVixJQUFJLEVBQUU7d0JBQ0osTUFBTSxFQUFFLEtBQUs7cUJBQ2Q7aUJBQ0YsQ0FBQyxDQUFDLENBQUM7Z0JBRUoseUJBQXlCO2dCQUN6QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDekYsV0FBVyxDQUFDLFlBQVksbUNBQ25CLFdBQVcsQ0FBQyxZQUFZLEdBQ3hCLG1CQUFtQixDQUN2QixDQUFDO29CQUNGLFdBQVcsQ0FBQyxlQUFlLG1DQUN0QixXQUFXLENBQUMsZUFBZSxHQUMzQixzQkFBc0IsQ0FDMUIsQ0FBQztvQkFDRixlQUFlLENBQUMsR0FBRyxVQUFVLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDNUQ7Z0JBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDVixLQUFLLEVBQUUsOENBQThDLE1BQU0sQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLEVBQUUsRUFBRSxVQUFVLENBQUMsa0RBQWtEO2lCQUN2SixDQUFDLENBQUM7YUFFSjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1YsS0FBSyxFQUFFLHlGQUF5RixRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQWdCLFdBQVc7YUFDM0ksQ0FBQyxDQUFDO1FBRUwsQ0FBQyxDQUFBLEVBQUU7WUFDRCxLQUFLLEVBQUU7Z0JBQ0wsRUFBRSxFQUFFLGtCQUFrQjthQUN2QjtTQUNGLENBQUMsQ0FBQTtJQUNKLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsUUFBUSxDQUFDLE1BQXVDO1FBQzlDLE9BQU8sSUFBSSxVQUFVLENBQUMsQ0FBTyxFQUFDLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBQyxFQUFFLEVBQUU7WUFFNUQsTUFBTSxXQUFXLEdBQTJCLENBQzFDLFdBQVcsQ0FBQyxnQ0FBZ0MsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLENBQUMsQ0FDakUsQ0FBQztZQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksV0FBVyxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUseUdBQXlHO2FBQ2pILENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsZUFBZSxDQUFDLEVBQUU7Z0JBQzFELE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksNkZBQTZGLENBQUMsQ0FBQzthQUM5STtZQUNELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLEVBQUU7Z0JBQ3pELE1BQU0sSUFBSSxLQUFLLENBQUMsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksNEZBQTRGLENBQUMsQ0FBQzthQUM3STtZQUVELE1BQU0sV0FBVyxHQUFHLGlCQUFpQixFQUFFLENBQUM7WUFDeEMsTUFBTSxVQUFVLEdBQUcsY0FBYyxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsY0FBYyxDQUFDLENBQUM7WUFFdkUsbUJBQW1CO1lBQ25CLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLE1BQU0sRUFBRSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7WUFDdkUsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDO1lBQ3JCLGVBQWUsQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUV4Qix5QkFBeUI7WUFDekIsVUFBVSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsZUFBZSxFQUFFLEdBQUcsTUFBTSxlQUFlLENBQUMsQ0FBQztZQUMzRSxVQUFVLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxjQUFjLEVBQUUsR0FBRyxNQUFNLGNBQWMsQ0FBQyxDQUFDO1lBQ3pFLElBQUk7Z0JBQ0YsVUFBVSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsb0JBQW9CLEVBQUUsR0FBRyxNQUFNLG9CQUFvQixDQUFDLENBQUM7Z0JBQ3JGLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLFlBQVksRUFBRSxHQUFHLE1BQU0sWUFBWSxDQUFDLENBQUM7YUFDdEU7WUFBQyxPQUFNLENBQUMsRUFBRSxHQUFFO1lBRWIsTUFBTSxPQUFPLG1DQUNSLFVBQVUsQ0FBQyxHQUFHLEdBQ2QsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQzVCLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDdkMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekQsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtpQkFDbEM7cUJBQU07b0JBQ0wsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFDLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQy9CO2dCQUNELGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDdEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNWLEtBQUssRUFBRSxxREFBcUQsTUFBTSxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsTUFBTSxDQUFDLFVBQVU7YUFDN0csQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDVixLQUFLLEVBQUUsc0ZBQXNGLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQyxnQkFBZ0IsV0FBVzthQUN4SSxDQUFDLENBQUM7WUFFSCxPQUFPLEVBQUUsQ0FBQztRQUVaLENBQUMsQ0FBQSxFQUFFO1lBQ0QsS0FBSyxFQUFFO2dCQUNMLEVBQUUsRUFBRSxVQUFVO2FBQ2Y7U0FDRixDQUFDLENBQUM7SUFDTCxDQUFDOztBQXhxQk0sa0JBQVUsR0FBRyxFQUFFLENBQUM7QUE0cUJ6QixlQUFlLE9BQU8sQ0FBQyJ9