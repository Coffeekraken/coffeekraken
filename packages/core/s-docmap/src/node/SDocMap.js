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
import __SDuration from '@coffeekraken/s-duration';
import __SGlob from '@coffeekraken/s-glob';
import __SLog from '@coffeekraken/s-log';
import __SPromise from '@coffeekraken/s-promise';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __removeSync from '@coffeekraken/sugar/node/fs/removeSync';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __packageJsonSync from '@coffeekraken/sugar/node/package/jsonSync';
import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
import __packageRootDir from '@coffeekraken/sugar/node/path/packageRootDir';
import __deepFilter from '@coffeekraken/sugar/shared/object/deepFilter';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __namespaceCompliant from '@coffeekraken/sugar/shared/string/namespaceCompliant';
import __fs from 'fs';
import __path from 'path';
import __SDocmapBuildParamsInterface from './interface/SDocmapBuildParamsInterface';
import __SDocmapInstallSnapshotParamsInterface from './interface/SDocmapInstallSnapshotParamsInterface';
import __SDocMapReadParamsInterface from './interface/SDocMapReadParamsInterface';
import __SDocmapSnapshotParamsInterface from './interface/SDocmapSnapshotParamsInterface';
import __chokidar from 'chokidar';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __checkPathWithMultipleExtensions from '@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions';
function __toLowerCase(l = '') {
    return l.toLowerCase();
}
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
                tagsProxy: {},
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
        this.docmapSettings.tagsProxy = Object.assign(Object.assign({}, this.constructor._registeredTagsProxy), this.docmapSettings.tagsProxy);
        // watch file
        // @ts-ignore
        if (!this.constructor.watcher) {
            // @ts-ignore
            this.constructor.watcher = __chokidar.watch(__SSugarConfig.get('docmap.read.input'));
            // @ts-ignore
            this.constructor.watcher.on('change', () => {
                // @ts-ignore
                delete this.constructor._cachedDocmapJson.current;
            });
        }
    }
    /**
     * @name           registerTagProxy
     * @type            Function
     * @static
     *
     * This static method allows you to register a tag proxy for all the SDocMap instances
     *
     * @param               {String}            tag           The tag you want to proxy
     * @param               {ISDocMapTagProxyFn}      processor       The processor function
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static registerTagProxy(tag, processor) {
        this._registeredTagsProxy[tag] = processor;
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
            var _a;
            const finalParams = (__deepMerge(__SDocMapReadParamsInterface.defaults(), params !== null && params !== void 0 ? params : {}));
            // snapshot param handling
            if (finalParams.snapshot) {
                finalParams.input = __path.resolve(finalParams.snapshotDir, finalParams.snapshot, 'docmap.json');
            }
            let docmapVersion = (_a = finalParams.snapshot) !== null && _a !== void 0 ? _a : 'current';
            // @ts-ignore
            if (this.constructor._cachedDocmapJson[docmapVersion]) {
                return resolve(
                // @ts-ignore
                this.constructor._cachedDocmapJson[docmapVersion]);
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
                var _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
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
                        type: __SLog.TYPE_WARN,
                        value: `<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`,
                    });
                }
                if (!currentPathDocmapJsonPath)
                    return;
                const extendsRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');
                const packageJsonPath = `${extendsRootPath}/package.json`;
                if (!__fs.existsSync(packageJsonPath)) {
                    emit('log', {
                        type: __SLog.TYPE_WARN,
                        value: `<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`,
                    });
                }
                const currentPackageJson = __readJsonSync(packageJsonPath);
                const docmapJson = __readJsonSync(currentPathDocmapJsonPath);
                Object.keys(docmapJson.map).forEach((namespace) => {
                    if (docmapJson.map[namespace]) {
                        docmapJson.map[namespace].package = {
                            name: currentPackageJson.name,
                            description: currentPackageJson.description,
                            version: currentPackageJson.version,
                            license: currentPackageJson.license
                        };
                    }
                });
                Object.keys((_c = (_b = docmapJson.generated) === null || _b === void 0 ? void 0 : _b.map) !== null && _c !== void 0 ? _c : []).forEach((namespace) => {
                    if (docmapJson.generated.map[namespace]) {
                        docmapJson.generated.map[namespace].package = {
                            name: currentPackageJson.name,
                            description: currentPackageJson.description,
                            version: currentPackageJson.version,
                            license: currentPackageJson.license
                        };
                    }
                });
                docmapJson.extends = [
                    ...((_d = docmapJson.extends) !== null && _d !== void 0 ? _d : []),
                    ...((_f = (_e = docmapJson.generated) === null || _e === void 0 ? void 0 : _e.extends) !== null && _f !== void 0 ? _f : []),
                ];
                docmapJson.map = Object.assign(Object.assign({}, ((_g = docmapJson.map) !== null && _g !== void 0 ? _g : {})), ((_j = (_h = docmapJson.generated) === null || _h === void 0 ? void 0 : _h.map) !== null && _j !== void 0 ? _j : {}));
                delete docmapJson.generated;
                for (let i = 0; i < docmapJson.extends.length; i++) {
                    const extendsPackageName = docmapJson.extends[i];
                    yield loadJson(extendsPackageName, extendsRootPath);
                }
                for (let i = 0; i < Object.keys(docmapJson.map).length; i++) {
                    const namespace = Object.keys(docmapJson.map)[i];
                    const obj = docmapJson.map[namespace];
                    let ext = obj.relPath.split('.').pop();
                    const relPath = (_k = __checkPathWithMultipleExtensions(obj.relPath, [
                        `dev.${ext}`,
                        ext
                    ])) !== null && _k !== void 0 ? _k : obj.relPath;
                    obj.path = __path.resolve(extendsRootPath, relPath);
                    docmapJson.map[namespace] = obj;
                }
                finalDocmapJson.map = Object.assign(Object.assign({}, finalDocmapJson.map), ((_l = docmapJson.map) !== null && _l !== void 0 ? _l : {}));
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
            // cache it in memory
            // @ts-ignore
            this.constructor._cachedDocmapJson[docmapVersion] =
                finalDocmapJson;
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
            if (!docmapJsonMenuByPackage[docmapObj.package.name]) {
                docmapJsonMenuByPackage[docmapObj.package.name] = [];
            }
            docmapJsonMenuByPackage[docmapObj.package.name].push(docmapObj);
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
                // @ts-ignore
                finalMenu.packages[packageName] = {
                    name: packageName,
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
            finalMenu.custom[menuName].tree = __deepFilter(finalMenu.tree, 
            // @ts-ignore
            this.docmapSettings.customMenu[menuName]);
            // @ts-ignore
            finalMenu.custom[menuName].slug = __deepFilter(finalMenu.slug, 
            // @ts-ignore
            this.docmapSettings.customMenu[menuName]);
            Object.keys(finalMenu.packages).forEach((packageName) => {
                const packageObj = finalMenu.packages[packageName];
                // @ts-ignore
                const packageFilteredTree = __deepFilter(packageObj.tree, 
                // @ts-ignore
                this.docmapSettings.customMenu[menuName]);
                finalMenu.custom[menuName].tree = __deepMerge(finalMenu.custom[menuName].tree, packageFilteredTree);
                // @ts-ignore
                const packageFilteredSlug = __deepFilter(packageObj.slug, 
                // @ts-ignore
                this.docmapSettings.customMenu[menuName]);
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
                return __toLowerCase(l);
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
                    currentObj[part][docmapObj.name] = {
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
        const finalParams = (__deepMerge(__SDocmapBuildParamsInterface.defaults(), params));
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
                    `${packageRoot}/node_modules/*{0,2}/docmap.json`,
                ];
                if (packageRoot !== packageMonoRoot) {
                    globs.push(`${packageMonoRoot}/node_modules/*{0,2}/docmap.json`);
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
            const filesInPackage = __SGlob.resolve(finalParams.globs.map((glob) => {
                return `${glob}:\\*\\s@namespace`;
            }), {
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
                        renderMarkdown: false,
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
                    for (let l = 0; l < finalParams.tags.length; l++) {
                        const tag = finalParams.tags[l];
                        if (docblock[tag] === undefined)
                            continue;
                        if (tag === 'namespace')
                            docblock[tag] = `${packageJson.name.replace('/', '.')}.${docblock[tag]}`;
                        // props proxy
                        if (this.docmapSettings.tagsProxy[tag]) {
                            docblockEntryObj[tag] =
                                yield this.docmapSettings.tagsProxy[tag](docblock[tag]);
                        }
                        else {
                            docblockEntryObj[tag] = docblock[tag];
                        }
                    }
                    const namespaceIdCompliant = __namespaceCompliant(`${docblock.namespace}.${docblock.name}`);
                    if (docblock.namespace && !this._entries[namespaceIdCompliant]) {
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: __path.relative(__packageRootDir(), file.path) });
                        this._entries[namespaceIdCompliant] = docblockObj;
                    }
                    else if (docblock.name) {
                        children[__toLowerCase(docblock.name)] =
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
                    const docblock = new __SDocblock(content, {
                        docblock: {
                            renderMarkdown: false,
                        }
                    });
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
SDocMap._cachedDocmapJson = {};
SDocMap._registeredTagsProxy = {};
export default SDocMap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0RvY01hcC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNEb2NNYXAudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFDbkQsT0FBTyxXQUFXLE1BQU0sMEJBQTBCLENBQUM7QUFFbkQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFDM0MsT0FBTyxNQUFNLE1BQU0scUJBQXFCLENBQUM7QUFDekMsT0FBTyxVQUFVLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0sc0NBQXNDLENBQUM7QUFDOUQsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxhQUFhLE1BQU0sc0NBQXNDLENBQUM7QUFDakUsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxjQUFjLE1BQU0sMENBQTBDLENBQUM7QUFDdEUsT0FBTyxZQUFZLE1BQU0sd0NBQXdDLENBQUM7QUFDbEUsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxlQUFlLE1BQU0sMkNBQTJDLENBQUM7QUFDeEUsT0FBTyxZQUFZLE1BQU0sc0NBQXNDLENBQUM7QUFDaEUsT0FBTyxpQkFBaUIsTUFBTSwyQ0FBMkMsQ0FBQztBQUMxRSxPQUFPLGFBQWEsTUFBTSwyQ0FBMkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLDhDQUE4QyxDQUFDO0FBQzVFLE9BQU8sWUFBWSxNQUFNLDhDQUE4QyxDQUFDO0FBQ3hFLE9BQU8sU0FBUyxNQUFNLDJDQUEyQyxDQUFDO0FBQ2xFLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sb0JBQW9CLE1BQU0sc0RBQXNELENBQUM7QUFDeEYsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztB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