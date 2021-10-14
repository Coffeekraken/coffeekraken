var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SLog from '@coffeekraken/s-log';
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
import __deepFilter from '@coffeekraken/sugar/shared/object/deepFilter';
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';
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
                customMenu: {
                    styleguide({ key, value, isObject }) {
                        if (key.split('/').length > 1 &&
                            key.match(/^([a-zA-Z0-9-_@\/]+)?\/styleguide\//))
                            return true;
                        if (key === 'styleguide')
                            return true;
                        return false;
                    },
                },
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
                    emit('log', {
                        type: __SLog.WARN,
                        value: `<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`,
                    });
                }
                if (!currentPathDocmapJsonPath)
                    return;
                const extendsRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');
                const packageJsonPath = `${extendsRootPath}/package.json`;
                if (!__fs.existsSync(packageJsonPath)) {
                    emit('log', {
                        type: __SLog.WARN,
                        value: `<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`,
                    });
                }
                const currentPackageJson = __readJsonSync(packageJsonPath);
                const docmapJson = __readJsonSync(currentPathDocmapJsonPath);
                Object.keys(docmapJson.map).forEach((namespace) => {
                    if (docmapJson.map[namespace]) {
                        docmapJson.map[namespace].package =
                            currentPackageJson.name;
                    }
                });
                Object.keys((_b = (_a = docmapJson.generated) === null || _a === void 0 ? void 0 : _a.map) !== null && _b !== void 0 ? _b : []).forEach((namespace) => {
                    if (docmapJson.generated.map[namespace]) {
                        docmapJson.generated.map[namespace].package =
                            currentPackageJson.name;
                    }
                });
                docmapJson.extends = [
                    ...((_c = docmapJson.extends) !== null && _c !== void 0 ? _c : []),
                    ...((_e = (_d = docmapJson.generated) === null || _d === void 0 ? void 0 : _d.extends) !== null && _e !== void 0 ? _e : []),
                ];
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
            custom: {},
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
                    scopedSlugMenu[`/${packageName}${slug}`] =
                        menuObj.slug[slug];
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
        Object.keys(this.docmapSettings.customMenu).forEach((menuName) => {
            if (!finalMenu.custom[menuName])
                finalMenu.custom[menuName] = {};
            // @ts-ignore
            finalMenu.custom[menuName].tree = __deepFilter(finalMenu.tree, this.docmapSettings.customMenu[menuName]);
            // @ts-ignore
            finalMenu.custom[menuName].slug = __deepFilter(finalMenu.slug, this.docmapSettings.customMenu[menuName]);
            Object.keys(finalMenu.packages).forEach((packageName) => {
                const packageObj = finalMenu.packages[packageName];
                // @ts-ignore
                const packageFilteredTree = __deepFilter(packageObj.tree, this.docmapSettings.customMenu[menuName]);
                finalMenu.custom[menuName].tree = __deepMerge(finalMenu.custom[menuName].tree, packageFilteredTree);
                // @ts-ignore
                const packageFilteredSlug = __deepFilter(packageObj.slug, this.docmapSettings.customMenu[menuName]);
                finalMenu.custom[menuName].slug = __deepMerge(finalMenu.custom[menuName].slug, packageFilteredSlug);
            });
        });
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
        const finalParams = (__deepMerge(__SDocMapBuildParamsInterface.defaults(), params));
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
                const globs = [
                    `${packageRoot}/node_modules/**{0,2}/docmap.json`,
                ];
                if (packageRoot !== packageMonoRoot) {
                    globs.push(`${packageMonoRoot}/node_modules/**{0,2}/docmap.json`);
                }
                const currentDocmapFiles = __SGlob.resolve(globs, {
                    defaultExcludes: false,
                    exclude: (_a = finalParams.exclude) !== null && _a !== void 0 ? _a : [],
                });
                emit('log', {
                    value: `<yellow>[build]</yellow> Found <cyan>${currentDocmapFiles.length}</cyan> docmap.json file(s) in dependencies`,
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
            emit('log', {
                value: `<yellow>[build]</yellow> Found <cyan>${filesInPackage.length}</cyan> file(s) to parse in package`,
            });
            for (let i = 0; i < filesInPackage.length; i++) {
                const file = filesInPackage[i];
                const content = file.raw;
                emit('log', {
                    value: `<yellow>[build]</yellow> Parsing file "<cyan>${__path.relative(__packageRootDir(), 
                    // @ts-ignore
                    file.path)}</cyan>"`,
                });
                const docblocksInstance = new __SDocblock(content, {
                    docblock: {
                        filepath: file.path,
                    },
                });
                yield docblocksInstance.parse();
                const docblocks = docblocksInstance.toObject();
                if (!docblocks || !docblocks.length)
                    continue;
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
                            docblockEntryObj[field] =
                                yield this.docmapSettings.fieldsProxy[field](docblock[field]);
                        }
                        else {
                            docblockEntryObj[field] = docblock[field];
                        }
                    }
                    if (docblock.namespace) {
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: __path.relative(__packageRootDir(), file.path) });
                        this._entries[__namespaceCompliant(`${docblock.namespace}.${__camelCase(docblock.name)}`)] = docblockObj;
                    }
                    else if (docblock.name) {
                        children[__camelCase(docblock.name)] =
                            docblockEntryObj;
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
                            removedDependencies[file.content.name] =
                                packageJson.dependencies[file.content.name];
                            delete packageJson.dependencies[file.content.name];
                        }
                        if ((_d = packageJson.devDependencies) === null || _d === void 0 ? void 0 : _d[file.content.name]) {
                            removedDevDependencies[file.content.name] =
                                packageJson.devDependencies[file.content.name];
                            delete packageJson.devDependencies[file.content.name];
                        }
                        const packageFolderPath = __folderPath(file.path);
                        const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
                        __ensureDirSync(destinationFolderPath
                            .split('/')
                            .slice(0, -1)
                            .join('/'));
                        try {
                            __fs.unlinkSync(destinationFolderPath);
                        }
                        catch (e) { }
                        __fs.symlinkSync(packageFolderPath, destinationFolderPath);
                    });
                }
                if (Object.keys(removedDependencies).length ||
                    Object.keys(removedDevDependencies).length) {
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
                if (Object.keys(removedDependencies).length ||
                    Object.keys(removedDevDependencies).length) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxTQUFTLE1BQU0sMkNBQTJDLENBQUM7QUFDbEUsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFFakUsT0FBTyxpQkFBaUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRSxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBQ3RFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sSUFBSSxNQUFNLElBQUksQ0FBQztBQUN0QixPQUFPLFlBQVksTUFBTSx3Q0FBd0MsQ0FBQztBQUNsRSxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyw2QkFBNkIsTUFBTSx5Q0FBeUMsQ0FBQztBQUNwRixPQUFPLDRCQUE0QixNQUFNLHdDQUF3QyxDQUFDO0FBQ2xGLE9BQU8sZ0NBQWdDLE1BQU0sNENBQTRDLENBQUM7QUFDMUYsT0FBTyx1Q0FBdUMsTUFBTSxtREFBbUQsQ0FBQztBQUV4RyxPQUFPLGNBQWMsTUFBTSwwQ0FBMEMsQ0FBQztBQUV0RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUV4RSxPQUFPLFdBQVcsTUFBTSwwQkFBMEIsQ0FBQztBQUNuRCxPQUFPLFVBQVUsTUFBTSxzQ0FBc0MsQ0FBQztBQUM5RCxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMsQ0FBQztBQUN4RSxPQUFPLGVBQWUsTUFBTSwyQ0FBMkMs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