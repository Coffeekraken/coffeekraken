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
                id: 'SDocMap',
            },
            docmap: {
                fieldsProxy: {},
            },
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
        // @ts-ignore
        this.docmapSettings.fieldsProxy = Object.assign(Object.assign({}, this.constructor._registeredFieldsProxy), this.docmapSettings.fieldsProxy);
    }
    /**
     * @name           registerFieldProxy
     * @type            Function
     * @static
     *
     * This static method allows you to register a field proxy for all the SDocMap instances
     *
     * @param               {String}            field           The field you want to proxy
     * @param               {ISDocMapFieldProxyFn}      processor       The processor function
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerFieldProxy(field, processor) {
        this._registeredFieldsProxy[field] = processor;
    }
    /**
     * @name        docmapSettings
     * @type            ISDocMapSettings
     * @get
     *
     * Access the docmap settings
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get docmapSettings() {
        return this._settings.docmap;
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
            const finalParams = (__deepMerge(__SDocMapReadParamsInterface.defaults(), params !== null && params !== void 0 ? params : {}));
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
                    snapshot: finalParams.snapshot,
                },
                map: {},
                menu: {},
                snapshots: [],
            };
            const loadJson = (packageNameOrPath, currentPath) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c, _d, _e, _f, _g, _h, _j;
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
                Object.keys(docmapJson.map).forEach((namespace) => {
                    if (docmapJson.map[namespace]) {
                        docmapJson.map[namespace].package = currentPackageJson.name;
                    }
                });
                Object.keys((_b = (_a = docmapJson.generated) === null || _a === void 0 ? void 0 : _a.map) !== null && _b !== void 0 ? _b : []).forEach((namespace) => {
                    if (docmapJson.generated.map[namespace]) {
                        docmapJson.generated.map[namespace].package = currentPackageJson.name;
                    }
                });
                docmapJson.extends = [...((_c = docmapJson.extends) !== null && _c !== void 0 ? _c : []), ...((_e = (_d = docmapJson.generated) === null || _d === void 0 ? void 0 : _d.extends) !== null && _e !== void 0 ? _e : [])];
                docmapJson.map = Object.assign(Object.assign({}, ((_f = docmapJson.map) !== null && _f !== void 0 ? _f : {})), ((_h = (_g = docmapJson.generated) === null || _g === void 0 ? void 0 : _g.map) !== null && _h !== void 0 ? _h : {}));
                delete docmapJson.generated;
                for (let i = 0; i < docmapJson.extends.length; i++) {
                    const extendsPackageName = docmapJson.extends[i];
                    yield loadJson(extendsPackageName, extendsRootPath);
                }
                for (let i = 0; i < Object.keys(docmapJson.map).length; i++) {
                    const namespace = Object.keys(docmapJson.map)[i];
                    const obj = docmapJson.map[namespace];
                    obj.path = __path.resolve(extendsRootPath, obj.relPath);
                    docmapJson.map[namespace] = obj;
                }
                finalDocmapJson.map = Object.assign(Object.assign({}, finalDocmapJson.map), ((_j = docmapJson.map) !== null && _j !== void 0 ? _j : {}));
            });
            const docmapJsonFolderPath = __folderPath(finalParams.input);
            yield loadJson(docmapJsonFolderPath, docmapJsonFolderPath);
            // loading available snapshots
            if (__fs.existsSync(finalParams.snapshotDir)) {
                const availableSnapshots = __fs.readdirSync(finalParams.snapshotDir);
                finalDocmapJson.snapshots = availableSnapshots;
            }
            else {
                finalDocmapJson.snapshots = [];
            }
            // save the docmap json
            this._docmapJson = finalDocmapJson;
            finalDocmapJson.menu = this._extractMenu(finalDocmapJson);
            // return the final docmap
            resolve(finalDocmapJson);
        }), {
            metas: {
                id: `read`,
            },
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
        var _a, _b;
        const docmapJsonMenuByPackage = {};
        // split menus by packages
        // @ts-ignore
        Object.keys(docmapJson.map).forEach((namespace) => {
            // @ts-ignore
            const docmapObj = docmapJson.map[namespace];
            if (!docmapObj.menu)
                return;
            if (!docmapJsonMenuByPackage[docmapObj.package]) {
                docmapJsonMenuByPackage[docmapObj.package] = [];
            }
            docmapJsonMenuByPackage[docmapObj.package].push(docmapObj);
        });
        let finalMenu = {
            packages: {},
            tree: {},
            slug: {},
            mixedTree: {},
            mixedSlug: {},
        };
        const packageJson = __packageJsonSync();
        Object.keys(docmapJsonMenuByPackage).forEach((packageName) => {
            const menuObj = this._extractMenuFromDocmapJsonStack(docmapJsonMenuByPackage[packageName]);
            if (packageName === packageJson.name) {
                finalMenu = Object.assign(Object.assign({}, finalMenu), menuObj);
            }
            else {
                const scopedSlugMenu = {};
                Object.keys(menuObj.slug).forEach((slug) => {
                    scopedSlugMenu[`/${packageName}${slug}`] = menuObj.slug[slug];
                });
                finalMenu.packages[packageName] = {
                    name: packageJson.name,
                    tree: __deepMap(menuObj.tree, ({ prop, value }) => {
                        if (prop === 'slug')
                            return `/${packageName}${value}`;
                        return value;
                    }),
                    slug: scopedSlugMenu,
                };
            }
        });
        // mixed menus
        let mixedTree = Object.assign({}, (_a = finalMenu.tree) !== null && _a !== void 0 ? _a : {}), mixedSlug = Object.assign({}, (_b = finalMenu.slug) !== null && _b !== void 0 ? _b : {});
        Object.keys(finalMenu.packages).forEach((packageName) => {
            var _a, _b;
            const packageObj = finalMenu.packages[packageName];
            mixedTree = __deepMerge(mixedTree, (_a = packageObj.tree) !== null && _a !== void 0 ? _a : {});
            mixedSlug = __deepMerge(mixedSlug, (_b = packageObj.slug) !== null && _b !== void 0 ? _b : {});
        });
        finalMenu.mixedTree = mixedTree;
        finalMenu.mixedSlug = mixedSlug;
        // @ts-ignore
        return finalMenu;
    }
    _extractMenuFromDocmapJsonStack(docmapJsonMap) {
        const menuObj = {}, menuObjBySlug = {}, menuObjByPackage = {};
        // extract menus
        Object.keys(docmapJsonMap).forEach((namespace) => {
            const docmapObj = docmapJsonMap[namespace];
            if (!docmapObj.menu)
                return;
            const dotPath = docmapObj.menu.tree
                .map((l) => {
                return __camelCase(l);
            })
                .join('.');
            let currentObj = menuObj;
            dotPath.split('.').forEach((part, i) => {
                if (!currentObj[part]) {
                    currentObj[part] = {
                        name: docmapObj.menu.tree[i],
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
                        docmap: docmapObj,
                    };
                }
                currentObj = currentObj[part];
            });
        });
        return {
            tree: menuObj,
            slug: menuObjBySlug,
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
        const finalParams = __deepMerge(__SDocMapBuildParamsInterface.defaults(), params);
        return new __SPromise(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            emit('notification', {
                message: `${this.metas.id} build started`,
            });
            let docmapJson = {
                map: {},
                extends: [],
                generated: {
                    extends: [],
                    map: {},
                },
            };
            const packageRoot = __packageRootDir();
            const packageMonoRoot = __packageRoot(process.cwd(), true);
            // check if a file already exists
            if (__fs.existsSync(`${packageRoot}/docmap.json`)) {
                const currentDocmapJson = __readJsonSync(`${packageRoot}/docmap.json`);
                docmapJson = currentDocmapJson;
                docmapJson.generated = {
                    extends: [],
                    map: {},
                };
            }
            // getting package infos
            const packageJson = __packageJsonSync();
            if (!finalParams.noExtends) {
                emit('log', {
                    value: `<yellow>[build]</yellow> Building extends array from existing docmap compliant packages`,
                });
                const globs = [`${packageRoot}/node_modules/**{0,2}/docmap.json`];
                if (packageRoot !== packageMonoRoot) {
                    globs.push(`${packageMonoRoot}/node_modules/**{0,2}/docmap.json`);
                }
                const currentDocmapFiles = __SGlob.resolve(globs, {
                    defaultExcludes: false,
                    exclude: (_a = finalParams.exclude) !== null && _a !== void 0 ? _a : [],
                });
                const extendsArray = [];
                currentDocmapFiles.forEach((file) => {
                    const currentPackageJson = __readJsonSync(`${file.dirPath}/package.json`);
                    if (currentPackageJson.name === packageJson.name)
                        return;
                    extendsArray.push(currentPackageJson.name);
                });
                // @ts-ignore
                docmapJson.generated.extends = extendsArray.filter((name) => name !== packageJson.name);
            }
            emit('log', {
                value: `<yellow>[build]</yellow> Building map by searching for files inside the current package`,
            });
            // searching inside the current package for docblocks to use
            const filesInPackage = __SGlob.resolve(finalParams.globs, {
                cwd: packageRoot,
                exclude: (_b = finalParams.exclude) !== null && _b !== void 0 ? _b : [],
            });
            for (let i = 0; i < filesInPackage.length; i++) {
                const file = filesInPackage[i];
                const content = file.raw;
                const docblocksInstance = new __SDocblock(content, {
                    docblock: {
                        filepath: file.path,
                    },
                });
                yield docblocksInstance.parse();
                const docblocks = docblocksInstance.toObject();
                if (!docblocks || !docblocks.length)
                    return;
                let docblockObj = {};
                const children = {};
                for (let j = 0; j < docblocks.length; j++) {
                    const docblock = docblocks[j];
                    for (let k = 0; 
                    // @ts-ignore
                    k < Object.keys(finalParams.filters).length; k++) {
                        const filterReg = 
                        // @ts-ignore
                        finalParams.filters[Object.keys(finalParams.filters)[k]];
                        // @ts-ignore
                        const value = docblock[Object.keys(finalParams.filters)[k]];
                        if (value === undefined)
                            continue;
                        if (value.match(filterReg))
                            break;
                    }
                    if (docblock.name && docblock.name.slice(0, 1) === '_')
                        continue;
                    if (docblock.private)
                        continue;
                    // const path = __path.relative(outputDir, filepath);
                    const filename = __getFilename(file.path);
                    const docblockEntryObj = {};
                    for (let l = 0; l < finalParams.fields.length; l++) {
                        const field = finalParams.fields[l];
                        if (docblock[field] === undefined)
                            continue;
                        if (field === 'namespace')
                            docblock[field] = `${packageJson.name.replace('/', '.')}.${docblock[field]}`;
                        // props proxy
                        if (this.docmapSettings.fieldsProxy[field]) {
                            docblockEntryObj[field] = yield this.docmapSettings.fieldsProxy[field](docblock[field]);
                        }
                        else {
                            docblockEntryObj[field] = docblock[field];
                        }
                    }
                    if (docblock.namespace) {
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: __path.relative(__packageRootDir(), file.path) });
                        this._entries[`${docblock.namespace}.${__camelCase(docblock.name)}`] = docblockObj;
                    }
                    else if (docblock.name) {
                        children[__camelCase(docblock.name)] = docblockEntryObj;
                    }
                }
                docblockObj.children = children;
            }
            emit('log', {
                value: `<yellow>[build]</yellow> <green>${Object.keys(this._entries).length}</green> entries gathered for this docMap`,
            });
            emit('notification', {
                type: 'success',
                message: `${this.metas.id} build success`,
            });
            // save entries inside the json map property
            docmapJson.generated.map = this._entries;
            if (finalParams.save) {
                emit('log', {
                    value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(__packageRootDir() + '/', '')}</cyan>"`,
                });
                __fs.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
            }
            resolve(docmapJson);
        }), {
            metas: {
                id: `build`,
            },
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
            const finalParams = (__deepMerge(__SDocmapInstallSnapshotParamsInterface.defaults(), params !== null && params !== void 0 ? params : {}));
            const duration = new __SDuration();
            const folders = __SGlob.resolve(finalParams.glob, {
                defaultExcludes: false,
            });
            if (!folders.length) {
                emit('log', {
                    value: `<cyan>[info]</cyan> It seem's that you don't have any snapshot(s) matching the glob "<cyan>${params.glob}</cyan>". Try generating a snapshot first with the command "<yellow>sugar docmap.snapshot</yellow>"`,
                });
                return resolve();
            }
            for (let i = 0; i < folders.length; i++) {
                const folderPath = folders[i];
                emit('log', {
                    value: `<yellow>[install]</yellow> Installing snapshot <yellow>${__path.relative(__packageRootDir(), folderPath)}</yellow>`,
                });
                const packageJson = __packageJsonSync();
                const packageMonoRootPath = __packageRoot(process.cwd(), true);
                // symlink repos from monorepo
                const removedDependencies = {}, removedDevDependencies = {};
                if (packageMonoRootPath !== __packageRoot()) {
                    const packageJsonFiles = __SGlob.resolve(`${packageMonoRootPath}/**/package.json`);
                    packageJsonFiles.forEach((file) => {
                        var _a, _b, _c, _d;
                        if (file.dirPath === packageMonoRootPath)
                            return;
                        if (!((_a = packageJson.dependencies) === null || _a === void 0 ? void 0 : _a[file.content.name]) &&
                            !((_b = packageJson.devDependencies) === null || _b === void 0 ? void 0 : _b[file.content.name]))
                            return;
                        if ((_c = packageJson.dependencies) === null || _c === void 0 ? void 0 : _c[file.content.name]) {
                            removedDependencies[file.content.name] = packageJson.dependencies[file.content.name];
                            delete packageJson.dependencies[file.content.name];
                        }
                        if ((_d = packageJson.devDependencies) === null || _d === void 0 ? void 0 : _d[file.content.name]) {
                            removedDevDependencies[file.content.name] =
                                packageJson.devDependencies[file.content.name];
                            delete packageJson.devDependencies[file.content.name];
                        }
                        const packageFolderPath = __folderPath(file.path);
                        const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
                        __ensureDirSync(destinationFolderPath.split('/').slice(0, -1).join('/'));
                        try {
                            __fs.unlinkSync(destinationFolderPath);
                        }
                        catch (e) { }
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
                        silent: false,
                    },
                }));
                // restoring package.json
                if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
                    packageJson.dependencies = Object.assign(Object.assign({}, packageJson.dependencies), removedDependencies);
                    packageJson.devDependencies = Object.assign(Object.assign({}, packageJson.devDependencies), removedDevDependencies);
                    __writeJsonSync(`${folderPath}/package.json`, packageJson);
                }
                emit('log', {
                    value: `<green>[success]</green> Snapshot "<yellow>${__path.relative(__packageRootDir(), folderPath)}</yellow>" installed <green>successfully</green>`,
                });
            }
            emit('log', {
                value: `<green>[success]</green> Snapshot(s) installed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
        }), {
            metas: {
                id: `installSnapshots`,
            },
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
                value: `<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`,
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
            Object.keys(fullMap).forEach((namespace) => {
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
                value: `<green>[save]</green> Snapshot saved under "<cyan>${__path.relative(process.cwd(), outDir)}</cyan>"`,
            });
            emit('log', {
                value: `<green>[success]</green> Snapshot generated <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            resolve();
        }), {
            metas: {
                id: `snapshot`,
            },
        });
    }
}
SDocMap.interfaces = {};
SDocMap._registeredFieldsProxy = {};
// register global field proxy
// SDocMap.registerFieldProxy('interface', __interfaceFieldProxy);
export default SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxpQkFBaUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRSxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyx1Q0FBdUMsTUFBTSxtREFBbUQsQ0FBQztBQUV4RyxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLFlBQVksTUFBTSxzQ0FBc0MsQ0FBQztBQUNoRSxPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUlsRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQTRIdEUsTUFBTSxPQUFRLFNBQVEsUUFBUTtJQTJEMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF3QztRQUNoRCxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxTQUFTO2FBQ2hCO1lBQ0QsTUFBTSxFQUFFO2dCQUNKLFdBQVcsRUFBRSxFQUFFO2FBQ2xCO1NBQ0osRUFDRCxRQUFRLElBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUE3RE47Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFvQixFQUFFLENBQUM7UUFvRDNCLGFBQWE7UUFDYixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsbUNBRXhCLElBQUksQ0FBQyxXQUFXLENBQUMsc0JBQXNCLEdBQ3ZDLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUNyQyxDQUFDO0lBQ04sQ0FBQztJQXJGRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsa0JBQWtCLENBQUMsS0FBYSxFQUFFLFNBQStCO1FBQ3BFLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxLQUFLLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDbkQsQ0FBQztJQTBCRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGNBQWM7UUFDZCxPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsTUFBTSxDQUFDO0lBQ3hDLENBQUM7SUFrQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7O09BaUJHO0lBQ0gsSUFBSSxDQUFDLE1BQW9DO1FBQ3JDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDOUIsTUFBTSxXQUFXLEdBQXVCLENBQ3BDLFdBQVcsQ0FBQyw0QkFBNEIsQ0FBQyxRQUFRLEVBQUUsRUFBRSxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQUMsQ0FDckUsQ0FBQztZQUVGLDBCQUEwQjtZQUMxQixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsV0FBVyxFQUFFLFdBQVcsQ0FBQyxRQUFRLEVBQUUsYUFBYSxDQUFDLENBQUM7YUFDcEc7WUFFRCxJQUFJLGNBQWMsR0FBRyxZQUFZLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckMsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxxQ0FBcUMsV0FBVyxDQUFDLEtBQUssNkJBQTZCLENBQ3JJLENBQUM7YUFDTDtZQUVELE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFM0QsTUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7WUFDdEMsTUFBTSxlQUFlLEdBQXlCO2dCQUMxQyxLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDbkQsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO2lCQUNqQztnQkFDRCxHQUFHLEVBQUUsRUFBRTtnQkFDUCxJQUFJLEVBQUUsRUFBRTtnQkFDUixTQUFTLEVBQUUsRUFBRTthQUNoQixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBTyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsRUFBRTs7Z0JBQ3RELElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUFFLE9BQU87Z0JBQy9ELGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLHlCQUF5QixFQUN6QixvQkFBb0IsR0FBRyxNQUFNLENBQUMsT0FBTyxDQUNqQyxjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixhQUFhLENBQ2hCLEVBQ0Qsd0JBQXdCLEdBQUcsTUFBTSxDQUFDLE9BQU8sQ0FDckMsZUFBZSxFQUNmLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsYUFBYSxDQUNoQixDQUFDO2dCQUVOLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFO29CQUN2Qyx5QkFBeUIsR0FBRyxvQkFBb0IsQ0FBQztpQkFDcEQ7cUJBQU0sSUFBSSxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsaUJBQWlCLGNBQWMsQ0FBQyxFQUFFO29CQUM1RCx5QkFBeUIsR0FBRyxHQUFHLGlCQUFpQixjQUFjLENBQUM7aUJBQ2xFO3FCQUFNLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxFQUFFO29CQUNsRCx5QkFBeUIsR0FBRyx3QkFBd0IsQ0FBQztpQkFDeEQ7cUJBQU07b0JBQ0gsTUFBTSxJQUFJLEtBQUssQ0FDWCwyRUFBMkUsaUJBQWlCLDRCQUE0QixDQUMzSCxDQUFDO2lCQUNMO2dCQUVELElBQUksQ0FBQyx5QkFBeUI7b0JBQUUsT0FBTztnQkFFdkMsTUFBTSxlQUFlLEdBQUcseUJBQXlCLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztnQkFFOUUsTUFBTSxlQUFlLEdBQUcsR0FBRyxlQUFlLGVBQWUsQ0FBQztnQkFDMUQsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBQ25DLE1BQU0sSUFBSSxLQUFLLENBQ1gsU0FBUyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksMENBQTBDLGVBQWUsaUZBQWlGLENBQzNLLENBQUM7aUJBQ0w7Z0JBRUQsTUFBTSxrQkFBa0IsR0FBRyxjQUFjLENBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzNELE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyx5QkFBeUIsQ0FBQyxDQUFDO2dCQUU3RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUMzQixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7cUJBQy9EO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQy9ELElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3JDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRyxrQkFBa0IsQ0FBQyxJQUFJLENBQUM7cUJBQ3pFO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUVILFVBQVUsQ0FBQyxPQUFPLEdBQUcsQ0FBQyxHQUFHLENBQUMsTUFBQSxVQUFVLENBQUMsT0FBTyxtQ0FBSSxFQUFFLENBQUMsRUFBRSxHQUFHLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDLENBQUMsQ0FBQztnQkFDL0YsVUFBVSxDQUFDLEdBQUcsbUNBQ1AsQ0FBQyxNQUFBLFVBQVUsQ0FBQyxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxHQUN0QixDQUFDLE1BQUEsTUFBQSxVQUFVLENBQUMsU0FBUywwQ0FBRSxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxDQUN2QyxDQUFDO2dCQUVGLE9BQU8sVUFBVSxDQUFDLFNBQVMsQ0FBQztnQkFFNUIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNoRCxNQUFNLGtCQUFrQixHQUFHLFVBQVUsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELE1BQU0sUUFBUSxDQUFDLGtCQUFrQixFQUFFLGVBQWUsQ0FBQyxDQUFDO2lCQUN2RDtnQkFFRCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN6RCxNQUFNLFNBQVMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDakQsTUFBTSxHQUFHLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztvQkFDdEMsR0FBRyxDQUFDLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBRXhELFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNuQztnQkFFRCxlQUFlLENBQUMsR0FBRyxtQ0FDWixlQUFlLENBQUMsR0FBRyxHQUNuQixDQUFDLE1BQUEsVUFBVSxDQUFDLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQzVCLENBQUM7WUFDTixDQUFDLENBQUEsQ0FBQztZQUVGLE1BQU0sb0JBQW9CLEdBQUcsWUFBWSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3RCxNQUFNLFFBQVEsQ0FBQyxvQkFBb0IsRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1lBRTNELDhCQUE4QjtZQUM5QixJQUFJLElBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxFQUFFO2dCQUMxQyxNQUFNLGtCQUFrQixHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLFdBQVcsQ0FBQyxDQUFDO2dCQUNyRSxlQUFlLENBQUMsU0FBUyxHQUFHLGtCQUFrQixDQUFDO2FBQ2xEO2lCQUFNO2dCQUNILGVBQWUsQ0FBQyxTQUFTLEdBQUcsRUFBRSxDQUFDO2FBQ2xDO1lBRUQsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxXQUFXLEdBQUcsZUFBZSxDQUFDO1lBRW5DLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUUxRCwwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQSxFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxNQUFNO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLENBQUMsYUFBbUMsSUFBSSxDQUFDLFdBQVc7O1FBQzVELE1BQU0sdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRW5DLDBCQUEwQjtRQUMxQixhQUFhO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDOUMsYUFBYTtZQUNiLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFBRTtnQkFDN0MsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsQ0FBQzthQUNuRDtZQUNELHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDL0QsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBb0I7WUFDN0IsUUFBUSxFQUFFLEVBQUU7WUFDWixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsU0FBUyxFQUFFLEVBQUU7WUFDYixTQUFTLEVBQUUsRUFBRTtTQUNoQixDQUFDO1FBQ0YsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztRQUV4QyxNQUFNLENBQUMsSUFBSSxDQUFDLHVCQUF1QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7WUFDekQsTUFBTSxPQUFPLEdBQUcsSUFBSSxDQUFDLCtCQUErQixDQUFDLHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUFDLENBQUM7WUFFM0YsSUFBSSxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDbEMsU0FBUyxtQ0FDRixTQUFTLEdBQ1QsT0FBTyxDQUNiLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUN2QyxjQUFjLENBQUMsSUFBSSxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUNsRSxDQUFDLENBQUMsQ0FBQztnQkFDSCxTQUFTLENBQUMsUUFBUSxDQUFDLFdBQVcsQ0FBQyxHQUFHO29CQUM5QixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7b0JBQ3RCLElBQUksRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7d0JBQzlDLElBQUksSUFBSSxLQUFLLE1BQU07NEJBQUUsT0FBTyxJQUFJLFdBQVcsR0FBRyxLQUFLLEVBQUUsQ0FBQzt3QkFDdEQsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUMsQ0FBQztvQkFDRixJQUFJLEVBQUUsY0FBYztpQkFDdkIsQ0FBQzthQUNMO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxjQUFjO1FBQ2QsSUFBSSxTQUFTLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsTUFBQSxTQUFTLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUMsRUFDbkQsU0FBUyxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLE1BQUEsU0FBUyxDQUFDLElBQUksbUNBQUksRUFBRSxDQUFDLENBQUM7UUFDeEQsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7O1lBQ3BELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7WUFDbkQsU0FBUyxHQUFHLFdBQVcsQ0FBQyxTQUFTLEVBQUUsTUFBQSxVQUFVLENBQUMsSUFBSSxtQ0FBSSxFQUFFLENBQUMsQ0FBQztZQUMxRCxTQUFTLEdBQUcsV0FBVyxDQUFDLFNBQVMsRUFBRSxNQUFBLFVBQVUsQ0FBQyxJQUFJLG1DQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQzlELENBQUMsQ0FBQyxDQUFDO1FBQ0gsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFDaEMsU0FBUyxDQUFDLFNBQVMsR0FBRyxTQUFTLENBQUM7UUFFaEMsYUFBYTtRQUNiLE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRCwrQkFBK0IsQ0FBQyxhQUFhO1FBQ3pDLE1BQU0sT0FBTyxHQUFHLEVBQUUsRUFDZCxhQUFhLEdBQUcsRUFBRSxFQUNsQixnQkFBZ0IsR0FBRyxFQUFFLENBQUM7UUFFMUIsZ0JBQWdCO1FBQ2hCLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDN0MsTUFBTSxTQUFTLEdBQUcsYUFBYSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1lBRTNDLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtnQkFBRSxPQUFPO1lBRTVCLE1BQU0sT0FBTyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSTtpQkFDOUIsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7Z0JBQ1AsT0FBTyxXQUFXLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFDO2lCQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUVmLElBQUksVUFBVSxHQUFHLE9BQU8sQ0FBQztZQUV6QixPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDbkMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsRUFBRTtvQkFDbkIsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUNmLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7cUJBQy9CLENBQUM7aUJBQ0w7Z0JBRUQsSUFBSSxDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO29CQUNwQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsQ0FBQyxHQUFHO3dCQUM1QyxJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUk7d0JBQ3BCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLG9CQUFvQjtxQkFDdkIsQ0FBQztvQkFDRixhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDakMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO3dCQUNwQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixNQUFNLEVBQUUsU0FBUztxQkFDcEIsQ0FBQztpQkFDTDtnQkFFRCxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0gsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsYUFBYTtTQUN0QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FBQyxNQUFvQztRQUN0QyxNQUFNLFdBQVcsR0FBd0IsV0FBVyxDQUFDLDZCQUE2QixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUFDO1FBQ3ZHLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0QyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNqQixPQUFPLEVBQUUsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEVBQUUsZ0JBQWdCO2FBQzVDLENBQUMsQ0FBQztZQUVILElBQUksVUFBVSxHQUFHO2dCQUNiLEdBQUcsRUFBRSxFQUFFO2dCQUNQLE9BQU8sRUFBRSxFQUFFO2dCQUNYLFNBQVMsRUFBRTtvQkFDUCxPQUFPLEVBQUUsRUFBRTtvQkFDWCxHQUFHLEVBQUUsRUFBRTtpQkFDVjthQUNKLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxnQkFBZ0IsRUFBRSxDQUFDO1lBQ3ZDLE1BQU0sZUFBZSxHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7WUFFM0QsaUNBQWlDO1lBQ2pDLElBQUksSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsY0FBYyxDQUFDLEVBQUU7Z0JBQy9DLE1BQU0saUJBQWlCLEdBQUcsY0FBYyxDQUFDLEdBQUcsV0FBVyxjQUFjLENBQUMsQ0FBQztnQkFDdkUsVUFBVSxHQUFHLGlCQUFpQixDQUFDO2dCQUMvQixVQUFVLENBQUMsU0FBUyxHQUFHO29CQUNuQixPQUFPLEVBQUUsRUFBRTtvQkFDWCxHQUFHLEVBQUUsRUFBRTtpQkFDVixDQUFDO2FBQ0w7WUFFRCx3QkFBd0I7WUFDeEIsTUFBTSxXQUFXLEdBQUcsaUJBQWlCLEVBQUUsQ0FBQztZQUV4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUseUZBQXlGO2lCQUNuRyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxLQUFLLEdBQWEsQ0FBQyxHQUFHLFdBQVcsbUNBQW1DLENBQUMsQ0FBQztnQkFDNUUsSUFBSSxXQUFXLEtBQUssZUFBZSxFQUFFO29CQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsZUFBZSxtQ0FBbUMsQ0FBQyxDQUFDO2lCQUNyRTtnQkFFRCxNQUFNLGtCQUFrQixHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFO29CQUM5QyxlQUFlLEVBQUUsS0FBSztvQkFDdEIsT0FBTyxFQUFFLE1BQUEsV0FBVyxDQUFDLE9BQU8sbUNBQUksRUFBRTtpQkFDckMsQ0FBQyxDQUFDO2dCQUVILE1BQU0sWUFBWSxHQUFhLEVBQUUsQ0FBQztnQkFDbEMsa0JBQWtCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ2hDLE1BQU0sa0JBQWtCLEdBQUcsY0FBYyxDQUFDLEdBQUcsSUFBSSxDQUFDLE9BQU8sZUFBZSxDQUFDLENBQUM7b0JBQzFFLElBQUksa0JBQWtCLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJO3dCQUFFLE9BQU87b0JBQ3pELFlBQVksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQy9DLENBQUMsQ0FBQyxDQUFDO2dCQUVILGFBQWE7Z0JBQ2IsVUFBVSxDQUFDLFNBQVMsQ0FBQyxPQUFPLEdBQUcsWUFBWSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUMzRjtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHlGQUF5RjthQUNuRyxDQUFDLENBQUM7WUFFSCw0REFBNEQ7WUFDNUQsTUFBTSxjQUFjLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO2dCQUN0RCxHQUFHLEVBQUUsV0FBVztnQkFDaEIsT0FBTyxFQUFFLE1BQUEsV0FBVyxDQUFDLE9BQU8sbUNBQUksRUFBRTthQUNyQyxDQUFDLENBQUM7WUFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLE9BQU8sR0FBYSxJQUFLLENBQUMsR0FBRyxDQUFDO2dCQUNwQyxNQUFNLGlCQUFpQixHQUFHLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtvQkFDL0MsUUFBUSxFQUFFO3dCQUNOLFFBQVEsRUFBWSxJQUFLLENBQUMsSUFBSTtxQkFDakM7aUJBQ0osQ0FBQyxDQUFDO2dCQUNILE1BQU0saUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2hDLE1BQU0sU0FBUyxHQUFHLGlCQUFpQixDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUUvQyxJQUFJLENBQUMsU0FBUyxJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU07b0JBQUUsT0FBTztnQkFDNUMsSUFBSSxXQUFXLEdBQVEsRUFBRSxDQUFDO2dCQUMxQixNQUFNLFFBQVEsR0FBUSxFQUFFLENBQUM7Z0JBQ3pCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxTQUFTLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUN2QyxNQUFNLFFBQVEsR0FBRyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzlCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDVCxhQUFhO29CQUNiLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQzNDLENBQUMsRUFBRSxFQUNMO3dCQUNFLE1BQU0sU0FBUzt3QkFDWCxhQUFhO3dCQUNiLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDN0QsYUFBYTt3QkFDYixNQUFNLEtBQUssR0FBRyxRQUFRLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDNUQsSUFBSSxLQUFLLEtBQUssU0FBUzs0QkFBRSxTQUFTO3dCQUNsQyxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDOzRCQUFFLE1BQU07cUJBQ3JDO29CQUNELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRzt3QkFBRSxTQUFTO29CQUNqRSxJQUFJLFFBQVEsQ0FBQyxPQUFPO3dCQUFFLFNBQVM7b0JBRS9CLHFEQUFxRDtvQkFDckQsTUFBTSxRQUFRLEdBQUcsYUFBYSxDQUFXLElBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFFckQsTUFBTSxnQkFBZ0IsR0FBa0IsRUFBRSxDQUFDO29CQUUzQyxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7d0JBQ2hELE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUMsQ0FBQyxDQUFDLENBQUM7d0JBQ3BDLElBQUksUUFBUSxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7NEJBQUUsU0FBUzt3QkFDNUMsSUFBSSxLQUFLLEtBQUssV0FBVzs0QkFDckIsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQyxJQUFJLFFBQVEsQ0FBQyxLQUFLLENBQUMsRUFBRSxDQUFDO3dCQUNqRixjQUFjO3dCQUNkLElBQUksSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7NEJBQ3hDLGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUM7eUJBQzNGOzZCQUFNOzRCQUNILGdCQUFnQixDQUFDLEtBQUssQ0FBQyxHQUFHLFFBQVEsQ0FBQyxLQUFLLENBQUMsQ0FBQzt5QkFDN0M7cUJBQ0o7b0JBRUQsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO3dCQUNwQixXQUFXLG1DQUNKLGdCQUFnQixLQUNuQixRQUFRLEVBQ1IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMxQyxPQUFPLEVBQUUsTUFBTSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsRUFBRSxFQUFZLElBQUssQ0FBQyxJQUFJLENBQUMsR0FDckUsQ0FBQzt3QkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLEdBQUcsUUFBUSxDQUFDLFNBQVMsSUFBSSxXQUFXLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUM7cUJBQ3RGO3lCQUFNLElBQUksUUFBUSxDQUFDLElBQUksRUFBRTt3QkFDdEIsUUFBUSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLENBQUMsR0FBRyxnQkFBZ0IsQ0FBQztxQkFDM0Q7aUJBQ0o7Z0JBQ0QsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDbkM7WUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxtQ0FDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUMvQiwyQ0FBMkM7YUFDOUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDakIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQjthQUM1QyxDQUFDLENBQUM7WUFFSCw0Q0FBNEM7WUFDNUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUV6QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDZFQUE2RSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDM0csZ0JBQWdCLEVBQUUsR0FBRyxHQUFHLEVBQ3hCLEVBQUUsQ0FDTCxVQUFVO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsYUFBYSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDaEY7WUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLE9BQU87YUFDZDtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsZUFBZSxDQUFDLE1BQStDO1FBQzNELE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sV0FBVyxHQUFtQyxDQUNoRCxXQUFXLENBQUMsdUNBQXVDLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUFDLENBQ2hGLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDOUMsZUFBZSxFQUFFLEtBQUs7YUFDekIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDhGQUE4RixNQUFNLENBQUMsSUFBSSxxR0FBcUc7aUJBQ3hOLENBQUMsQ0FBQztnQkFDSCxPQUFPLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLE1BQU0sVUFBVSxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsMERBQTBELE1BQU0sQ0FBQyxRQUFRLENBQzVFLGdCQUFnQixFQUFFLEVBQ2xCLFVBQVUsQ0FDYixXQUFXO2lCQUNmLENBQUMsQ0FBQztnQkFFSCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO2dCQUN4QyxNQUFNLG1CQUFtQixHQUFHLGFBQWEsQ0FBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUM7Z0JBRS9ELDhCQUE4QjtnQkFDOUIsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLEVBQzFCLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxtQkFBbUIsS0FBSyxhQUFhLEVBQUUsRUFBRTtvQkFDekMsTUFBTSxnQkFBZ0IsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEdBQUcsbUJBQW1CLGtCQUFrQixDQUFDLENBQUM7b0JBRW5GLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOzt3QkFDOUIsSUFBSSxJQUFJLENBQUMsT0FBTyxLQUFLLG1CQUFtQjs0QkFBRSxPQUFPO3dCQUNqRCxJQUNJLENBQUMsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxZQUFZLDBDQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7NEJBQzlDLENBQUMsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxlQUFlLDBDQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUE7NEJBRWpELE9BQU87d0JBRVgsSUFBSSxNQUFBLFdBQVcsQ0FBQyxZQUFZLDBDQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQy9DLG1CQUFtQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNyRixPQUFPLFdBQVcsQ0FBQyxZQUFZLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQzt5QkFDdEQ7d0JBQ0QsSUFBSSxNQUFBLFdBQVcsQ0FBQyxlQUFlLDBDQUFHLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7NEJBQ2xELHNCQUFzQixDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDO2dDQUNyQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7NEJBQ25ELE9BQU8sV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO3lCQUN6RDt3QkFFRCxNQUFNLGlCQUFpQixHQUFHLFlBQVksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xELE1BQU0scUJBQXFCLEdBQUcsR0FBRyxVQUFVLGlCQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNoRixlQUFlLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQzt3QkFDekUsSUFBSTs0QkFDQSxJQUFJLENBQUMsVUFBVSxDQUFDLHFCQUFxQixDQUFDLENBQUM7eUJBQzFDO3dCQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7d0JBQ2QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxpQkFBaUIsRUFBRSxxQkFBcUIsQ0FBQyxDQUFDO29CQUMvRCxDQUFDLENBQUMsQ0FBQztpQkFDTjtnQkFDRCxJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDdkYsZUFBZSxDQUFDLEdBQUcsVUFBVSxlQUFlLEVBQUUsV0FBVyxDQUFDLENBQUM7aUJBQzlEO2dCQUVELDBCQUEwQjtnQkFDMUIsTUFBTSxJQUFJLENBQ04sWUFBWSxDQUFDO29CQUNULEdBQUcsRUFBRSxVQUFVO29CQUNmLElBQUksRUFBRSxJQUFJO29CQUNWLElBQUksRUFBRTt3QkFDRixNQUFNLEVBQUUsS0FBSztxQkFDaEI7aUJBQ0osQ0FBQyxDQUNMLENBQUM7Z0JBRUYseUJBQXlCO2dCQUN6QixJQUFJLE1BQU0sQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDLE1BQU0sRUFBRTtvQkFDdkYsV0FBVyxDQUFDLFlBQVksbUNBQ2pCLFdBQVcsQ0FBQyxZQUFZLEdBQ3hCLG1CQUFtQixDQUN6QixDQUFDO29CQUNGLFdBQVcsQ0FBQyxlQUFlLG1DQUNwQixXQUFXLENBQUMsZUFBZSxHQUMzQixzQkFBc0IsQ0FDNUIsQ0FBQztvQkFDRixlQUFlLENBQUMsR0FBRyxVQUFVLGVBQWUsRUFBRSxXQUFXLENBQUMsQ0FBQztpQkFDOUQ7Z0JBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsOENBQThDLE1BQU0sQ0FBQyxRQUFRLENBQ2hFLGdCQUFnQixFQUFFLEVBQ2xCLFVBQVUsQ0FDYixrREFBa0Q7aUJBQ3RELENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUseUZBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLGtCQUFrQjthQUN6QjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsUUFBUSxDQUFDLE1BQXVDO1FBQzVDLE9BQU8sSUFBSSxVQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQ3RDLE1BQU0sV0FBVyxHQUEyQixDQUN4QyxXQUFXLENBQUMsZ0NBQWdDLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ25FLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxJQUFJLFdBQVcsRUFBRSxDQUFDO1lBRW5DLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHlHQUF5RzthQUNuSCxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGVBQWUsQ0FBQyxFQUFFO2dCQUN4RCxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDZGQUE2RixDQUM5SCxDQUFDO2FBQ0w7WUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxFQUFFO2dCQUN2RCxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDRGQUE0RixDQUM3SCxDQUFDO2FBQ0w7WUFFRCxNQUFNLFdBQVcsR0FBRyxpQkFBaUIsRUFBRSxDQUFDO1lBQ3hDLE1BQU0sVUFBVSxHQUFHLGNBQWMsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGNBQWMsQ0FBQyxDQUFDO1lBRXZFLG1CQUFtQjtZQUNuQixNQUFNLE1BQU0sR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxNQUFNLEVBQUUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDO1lBQ3ZFLFlBQVksQ0FBQyxNQUFNLENBQUMsQ0FBQztZQUNyQixlQUFlLENBQUMsTUFBTSxDQUFDLENBQUM7WUFFeEIseUJBQXlCO1lBQ3pCLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLGVBQWUsRUFBRSxHQUFHLE1BQU0sZUFBZSxDQUFDLENBQUM7WUFDM0UsVUFBVSxDQUFDLEdBQUcsZ0JBQWdCLEVBQUUsY0FBYyxFQUFFLEdBQUcsTUFBTSxjQUFjLENBQUMsQ0FBQztZQUN6RSxJQUFJO2dCQUNBLFVBQVUsQ0FBQyxHQUFHLGdCQUFnQixFQUFFLG9CQUFvQixFQUFFLEdBQUcsTUFBTSxvQkFBb0IsQ0FBQyxDQUFDO2dCQUNyRixVQUFVLENBQUMsR0FBRyxnQkFBZ0IsRUFBRSxZQUFZLEVBQUUsR0FBRyxNQUFNLFlBQVksQ0FBQyxDQUFDO2FBQ3hFO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUVkLE1BQU0sT0FBTyxtQ0FDTixVQUFVLENBQUMsR0FBRyxHQUNkLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUM5QixDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxNQUFNLENBQUMsT0FBTyxDQUFDLGdCQUFnQixFQUFFLEVBQUUsU0FBUyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUNuRSxJQUFJLE9BQU8sR0FBRyxJQUFJLENBQUMsWUFBWSxDQUFDLElBQUksRUFBRSxNQUFNLENBQUMsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFDekQsSUFBSSxTQUFTLENBQUMsSUFBSSxLQUFLLFVBQVUsRUFBRTtpQkFDbEM7cUJBQU07b0JBQ0gsTUFBTSxRQUFRLEdBQUcsSUFBSSxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUM7b0JBQzFDLE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2pDO2dCQUNELGVBQWUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQUUsT0FBTyxDQUFDLENBQUM7WUFDeEUsQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxxREFBcUQsTUFBTSxDQUFDLFFBQVEsQ0FDdkUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLE1BQU0sQ0FDVCxVQUFVO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsc0ZBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsRUFDRDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsVUFBVTthQUNqQjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBM3dCTSxrQkFBVSxHQUFHLEVBQUUsQ0FBQztBQUVoQiw4QkFBc0IsR0FBRyxFQUFFLENBQUM7QUE0d0J2Qyw4QkFBOEI7QUFDOUIsa0VBQWtFO0FBRWxFLGVBQWUsT0FBTyxDQUFDIn0=