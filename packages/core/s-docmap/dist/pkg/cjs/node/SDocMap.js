"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_docblock_1 = __importDefault(require("@coffeekraken/s-docblock"));
const s_duration_1 = __importDefault(require("@coffeekraken/s-duration"));
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_log_1 = __importDefault(require("@coffeekraken/s-log"));
const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const object_1 = require("@coffeekraken/sugar/object");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const deepFilter_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepFilter"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const sort_1 = __importDefault(require("@coffeekraken/sugar/shared/object/sort"));
const sortDeep_1 = __importDefault(require("@coffeekraken/sugar/shared/object/sortDeep"));
const namespaceCompliant_1 = __importDefault(require("@coffeekraken/sugar/shared/string/namespaceCompliant"));
const chokidar_1 = __importDefault(require("chokidar"));
const fs_2 = __importDefault(require("fs"));
const micromatch_1 = __importDefault(require("micromatch"));
const path_2 = __importDefault(require("path"));
const SDocmapBuildParamsInterface_1 = __importDefault(require("./interface/SDocmapBuildParamsInterface"));
const SDocmapInstallSnapshotParamsInterface_1 = __importDefault(require("./interface/SDocmapInstallSnapshotParamsInterface"));
const SDocmapReadParamsInterface_1 = __importDefault(require("./interface/SDocmapReadParamsInterface"));
const SDocmapSearchParamsInterface_1 = __importDefault(require("./interface/SDocmapSearchParamsInterface"));
const SDocmapSettingsInterface_1 = __importDefault(require("./interface/SDocmapSettingsInterface"));
const SDocmapSnapshotParamsInterface_1 = __importDefault(require("./interface/SDocmapSnapshotParamsInterface"));
function __toLowerCase(l = '') {
    return l.toLowerCase();
}
class SDocmap extends s_class_1.default {
    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        super((0, object_1.__deepMerge)({
            metas: {
                id: 'SDocmap',
            },
        }, SDocmapSettingsInterface_1.default.apply({
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
                views({ key, value, isObject }) {
                    if (key.split('/').length > 1 &&
                        key.match(/^([a-zA-Z0-9-_@\/]+)?\/views\//))
                        return true;
                    if (key === 'views')
                        return true;
                    return false;
                },
            },
        }), settings || {}));
        /**
         * @name          _entries
         * @type           ISDocmapEntries
         * @private
         *
         * This store the docmap.json entries
         *
         * @since         2.0.0
         * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._entries = {};
        // @ts-ignore
        this.settings.tagsProxy = Object.assign(Object.assign({}, this.constructor._registeredTagsProxy), this.settings.tagsProxy);
        // watch file
        // @ts-ignore
        if (!this.constructor.watcher) {
            // @ts-ignore
            this.constructor.watcher = chokidar_1.default.watch(s_sugar_config_1.default.get('docmap.read.input'));
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
     * This static method allows you to register a tag proxy for all the SDocmap instances
     *
     * @param               {String}            tag           The tag you want to proxy
     * @param               {ISDocmapTagProxyFn}      processor       The processor function
     *
     * @since           2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static registerTagProxy(tag, processor) {
        this._registeredTagsProxy[tag] = processor;
    }
    /**
     * @name          read
     * @type          Function
     * @async
     *
     * This static method allows you to search for docmap.json files and read them to get
     * back the content of them in one call. It can take advantage of the cache if
     *
     * @todo      update documentation
     * @todo      integrate the "cache" feature
     *
     * @param       {Object}        [settings={}]       A settings object to override the instance level ones
     * @return      {SPromise<ISDocmapObj>}                          An SPromise instance that will be resolved once the docmap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(params) {
        return new s_promise_1.default(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalParams = ((0, object_1.__deepMerge)(SDocmapReadParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            // snapshot param handling
            if (finalParams.snapshot) {
                finalParams.input = path_2.default.resolve(finalParams.snapshotDir, finalParams.snapshot, 'docmap.json');
            }
            let docmapVersion = (_a = finalParams.snapshot) !== null && _a !== void 0 ? _a : 'current';
            // @ts-ignore
            if (this.constructor._cachedDocmapJson[docmapVersion]) {
                return resolve(
                // @ts-ignore
                this.constructor._cachedDocmapJson[docmapVersion]);
            }
            let docmapRootPath = (0, fs_1.__folderPath)(finalParams.input);
            if (!fs_2.default.existsSync(finalParams.input)) {
                return resolve({
                    metas: {
                        type: undefined,
                    },
                    map: {},
                    menu: {},
                    snapshots: [],
                });
                // throw new Error(
                //     `<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`,
                // );
            }
            const packageMonoRoot = (0, path_1.__packageRootDir)(process.cwd(), {
                highest: true,
            });
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
                var _b, _c, _d, _e, _f, _g, _h, _j, _k;
                if (extendedPackages.indexOf(packageNameOrPath) !== -1)
                    return;
                extendedPackages.push(packageNameOrPath);
                let currentPathDocmapJsonPath, potentialPackageDocmapJsonPath = path_2.default.resolve(docmapRootPath, 'node_modules', packageNameOrPath, 'docmap.json'), potentialRootPackageDocmapJsonPath = path_2.default.resolve(packageMonoRoot, 'node_modules', packageNameOrPath, 'docmap.json');
                if (fs_2.default.existsSync(potentialPackageDocmapJsonPath)) {
                    currentPathDocmapJsonPath =
                        potentialPackageDocmapJsonPath;
                }
                else if (fs_2.default.existsSync(`${packageNameOrPath}/docmap.json`)) {
                    currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
                }
                else if (fs_2.default.existsSync(potentialRootPackageDocmapJsonPath)) {
                    currentPathDocmapJsonPath =
                        potentialRootPackageDocmapJsonPath;
                }
                else {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARN,
                        value: `<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`,
                    });
                }
                if (!currentPathDocmapJsonPath)
                    return;
                const extendsRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');
                const packageJsonPath = `${extendsRootPath}/package.json`;
                if (!fs_2.default.existsSync(packageJsonPath)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARN,
                        value: `<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`,
                    });
                    return;
                }
                const currentPackageJson = (0, fs_1.__readJsonSync)(packageJsonPath);
                const docmapJson = (0, fs_1.__readJsonSync)(currentPathDocmapJsonPath);
                Object.keys(docmapJson.map).forEach((namespace) => {
                    if (docmapJson.map[namespace]) {
                        docmapJson.map[namespace].package = {
                            name: currentPackageJson.name,
                            description: currentPackageJson.description,
                            version: currentPackageJson.version,
                            license: currentPackageJson.license,
                        };
                    }
                });
                Object.keys((_c = (_b = docmapJson.generated) === null || _b === void 0 ? void 0 : _b.map) !== null && _c !== void 0 ? _c : []).forEach((namespace) => {
                    if (docmapJson.generated.map[namespace]) {
                        docmapJson.generated.map[namespace].package = {
                            name: currentPackageJson.name,
                            description: currentPackageJson.description,
                            version: currentPackageJson.version,
                            license: currentPackageJson.license,
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
                    obj.path = path_2.default.resolve(extendsRootPath, obj.relPath);
                    // checking ".dev...."
                    let ext = obj.relPath.split('.').pop();
                    obj.path =
                        (_k = (0, fs_1.__checkPathWithMultipleExtensions)(obj.path, [
                            `dev.${ext}`,
                            ext,
                        ])) !== null && _k !== void 0 ? _k : obj.path;
                    docmapJson.map[namespace] = obj;
                }
                for (let [namespace, docmapObj] of Object.entries(docmapJson.map)) {
                    let blockId = namespace;
                    if (!finalDocmapJson.map[blockId]) {
                        // assigning an id to the block.
                        // This id is the string used as map property to store the block
                        docmapObj.id = blockId;
                        // saving the block into our final docmap map
                        finalDocmapJson.map[blockId] = docmapObj;
                    }
                }
            });
            const docmapJsonFolderPath = (0, fs_1.__folderPath)(finalParams.input);
            yield loadJson(docmapJsonFolderPath, docmapJsonFolderPath);
            // loading available snapshots
            if (fs_2.default.existsSync(finalParams.snapshotDir)) {
                const availableSnapshots = fs_2.default.readdirSync(finalParams.snapshotDir);
                finalDocmapJson.snapshots = availableSnapshots;
            }
            else {
                finalDocmapJson.snapshots = [];
            }
            // save the docmap json
            this._docmapJson = finalDocmapJson;
            // extract the menu
            finalDocmapJson.menu = this._extractMenu(finalDocmapJson);
            // cache it in memory
            // @ts-ignore
            this.constructor._cachedDocmapJson[docmapVersion] =
                finalDocmapJson;
            // sorting
            finalParams.sort.forEach((dotPath) => {
                const toSort = (0, object_1.__get)(finalDocmapJson, dotPath);
                if (!toSort)
                    return;
                (0, set_1.default)(finalDocmapJson, dotPath, (0, sort_1.default)(toSort, (a, b) => {
                    return a.key.localeCompare(b.key);
                }));
            });
            finalParams.sortDeep.forEach((dotPath) => {
                const toSort = (0, object_1.__get)(finalDocmapJson, dotPath);
                if (!toSort)
                    return;
                (0, set_1.default)(finalDocmapJson, dotPath, (0, sortDeep_1.default)(toSort, (a, b) => {
                    return a.key.localeCompare(b.key);
                }));
            });
            // return the final docmap
            resolve(finalDocmapJson);
        }), {
            metas: {
                id: `read`,
            },
        }, {
            eventEmitter: {
                bind: this,
            },
        });
    }
    /**
     * @name          search
     * @type          Function
     *
     * This methodallows you to search for an docmap item by it's slug.
     * You can specify if you want to search also in the "packages" section or not
     *
     * @param           {ISDocmapSearchParams}      params          Some params to configure your search
     * @return        {ISDocmapSearchResult}                        The result of your search
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    search(params) {
        return new s_promise_1.default(({ resolve, pipe, emit }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = ((0, object_1.__deepMerge)(SDocmapSearchParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            const docmapJson = yield this.read(finalParams);
            const result = {
                search: finalParams,
                items: {},
            };
            for (let [key, item] of Object.entries(docmapJson.map)) {
                let itemMatch = true;
                // slug
                if (finalParams.slug) {
                    if (!item.menu) {
                        itemMatch = false;
                    }
                    else if (!micromatch_1.default.isMatch(item.menu.slug, finalParams.slug)) {
                        itemMatch = false;
                    }
                }
                // namespace
                if (finalParams.namespace) {
                    if (!micromatch_1.default.isMatch(item.namespace, finalParams.namespace)) {
                        itemMatch = false;
                    }
                }
                if (itemMatch) {
                    result.items[item.namespace] = item;
                }
            }
            resolve(result);
        }), {
            eventEmitter: {
                id: this.constructor.name,
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        const packageJson = (0, package_1.__packageJsonSync)();
        Object.keys(docmapJsonMenuByPackage).forEach((packageName) => {
            const menuObj = this._extractMenuFromDocmapJsonStack(docmapJsonMenuByPackage[packageName]);
            if (packageName === packageJson.name) {
                finalMenu = Object.assign(Object.assign({}, finalMenu), menuObj);
            }
            else {
                const scopedSlugMenu = {};
                Object.keys(menuObj.slug).forEach((slug) => {
                    scopedSlugMenu[`/package/${packageName}${slug}`] = Object.assign(Object.assign({}, menuObj.slug[slug]), { slug: `/package/${packageName}${slug}` });
                });
                // @ts-ignore
                finalMenu.packages[packageName] = {
                    name: packageName,
                    tree: (0, object_1.__deepMap)(menuObj.tree, ({ prop, value }) => {
                        if (prop === 'slug')
                            return `/package/${packageName}${value}`;
                        return value;
                    }),
                    slug: scopedSlugMenu,
                };
            }
        });
        Object.keys(this.settings.customMenu).forEach((menuName) => {
            if (!finalMenu.custom[menuName])
                finalMenu.custom[menuName] = {};
            // @ts-ignore
            finalMenu.custom[menuName].tree = (0, deepFilter_1.default)(finalMenu.tree, 
            // @ts-ignore
            this.settings.customMenu[menuName]);
            // @ts-ignore
            finalMenu.custom[menuName].slug = (0, deepFilter_1.default)(finalMenu.slug, 
            // @ts-ignore
            this.settings.customMenu[menuName]);
            Object.keys(finalMenu.packages).forEach((packageName) => {
                const packageObj = finalMenu.packages[packageName];
                // @ts-ignore
                const packageFilteredTree = (0, deepFilter_1.default)(packageObj.tree, 
                // @ts-ignore
                this.settings.customMenu[menuName]);
                finalMenu.custom[menuName].tree = (0, object_1.__deepMerge)(finalMenu.custom[menuName].tree, packageFilteredTree);
                // @ts-ignore
                const packageFilteredSlug = (0, deepFilter_1.default)(packageObj.slug, 
                // @ts-ignore
                this.settings.customMenu[menuName]);
                finalMenu.custom[menuName].slug = (0, object_1.__deepMerge)(finalMenu.custom[menuName].slug, packageFilteredSlug);
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
                        as: docmapObj.as,
                        slug: docmapObj.menu.slug,
                        tree: docmapObj.menu.tree,
                        // docmap: docmapObj
                    };
                    menuObjBySlug[docmapObj.menu.slug] = {
                        name: docmapObj.name,
                        as: docmapObj.as,
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
     * @param         {Partial<ISDocmapBuildParams>}          params        The params to use to build your docmap
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = ((0, object_1.__deepMerge)(SDocmapBuildParamsInterface_1.default.defaults(), params));
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            emit('notification', {
                // @ts-ignore
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
            const packageRoot = (0, path_1.__packageRootDir)();
            const packageMonoRoot = (0, path_1.__packageRootDir)(process.cwd(), {
                highest: true,
            });
            // check if a file already exists
            if (fs_2.default.existsSync(`${packageRoot}/docmap.json`)) {
                const currentDocmapJson = (0, fs_1.__readJsonSync)(`${packageRoot}/docmap.json`);
                docmapJson = currentDocmapJson;
                docmapJson.generated = {
                    extends: [],
                    map: {},
                };
            }
            // getting package infos
            const packageJson = (0, package_1.__packageJsonSync)();
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
                const currentDocmapFiles = s_glob_1.default.resolve(globs, {
                    defaultExcludes: false,
                    exclude: (_a = finalParams.exclude) !== null && _a !== void 0 ? _a : [],
                });
                emit('log', {
                    value: `<yellow>[build]</yellow> Found <cyan>${currentDocmapFiles.length}</cyan> docmap.json file(s) in dependencies`,
                });
                const extendsArray = [];
                currentDocmapFiles.forEach((file) => {
                    if (!fs_2.default.existsSync(`${file.dirPath}/package.json`)) {
                        return;
                    }
                    const currentPackageJson = (0, fs_1.__readJsonSync)(`${file.dirPath}/package.json`);
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
            const filesInPackage = s_glob_1.default.resolve(finalParams.globs.map((glob) => {
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
                    value: `<yellow>[build]</yellow> Parsing file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), 
                    // @ts-ignore
                    file.path)}</cyan>"`,
                });
                const docblocksInstance = new s_docblock_1.default(file.path, {
                    renderMarkdown: false,
                    filepath: file.path,
                });
                yield pipe(docblocksInstance.parse());
                const docblocks = docblocksInstance.toObject();
                if (!docblocks || !docblocks.length)
                    continue;
                let docblockObj = {};
                const children = {};
                for (let j = 0; j < docblocks.length; j++) {
                    const docblock = docblocks[j];
                    let matchFilters = true;
                    for (let k = 0; 
                    // @ts-ignore
                    k < Object.keys(finalParams.filters).length; k++) {
                        const key = Object.keys(finalParams.filters)[k];
                        const filterReg = 
                        // @ts-ignore
                        finalParams.filters[key];
                        // @ts-ignore
                        let value = docblock[key];
                        // do not take care of undefined value
                        if (value === undefined)
                            continue;
                        // if the "toString" method is a custom one
                        // calling it to have the proper string value back
                        if ((value === null || value === void 0 ? void 0 : value.toString.toString().indexOf('[native code]')) === -1) {
                            value = value.toString();
                        }
                        // check if the value match the filter or not
                        // if not, we do not take the docblock
                        if (typeof value === 'string' &&
                            !value.match(filterReg)) {
                            matchFilters = false;
                            break;
                        }
                    }
                    if (!matchFilters) {
                        continue;
                    }
                    if (docblock.name && docblock.name.slice(0, 1) === '_')
                        continue;
                    if (docblock.private)
                        continue;
                    // const path = __path.relative(outputDir, filepath);
                    const filename = (0, fs_1.__fileName)(file.path);
                    const docblockEntryObj = {};
                    for (let l = 0; l < finalParams.tags.length; l++) {
                        const tag = finalParams.tags[l];
                        if (docblock[tag] === undefined)
                            continue;
                        // props proxy
                        if (this.settings.tagsProxy[tag]) {
                            docblockEntryObj[tag] =
                                yield this.settings.tagsProxy[tag](docblock[tag]);
                        }
                        else {
                            docblockEntryObj[tag] = docblock[tag];
                        }
                    }
                    const dotPath = (0, namespaceCompliant_1.default)(`${docblock.namespace}.${docblock.name}`);
                    if (docblock.namespace && !this._entries[dotPath]) {
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: path_2.default.relative((0, path_1.__packageRootDir)(), file.path) });
                        this._entries[dotPath] = docblockObj;
                    }
                    else if (docblock.name) {
                        children[__toLowerCase(docblock.name)] =
                            docblockEntryObj;
                    }
                }
                docblockObj.children = children;
            }
            emit('log', {
                value: `<yellow>[build]</yellow> <green>${Object.keys(this._entries).length}</green> entries gathered for this docmap`,
            });
            emit('notification', {
                type: 'success',
                message: `${this.metas.id} build success`,
            });
            // save entries inside the json map property
            docmapJson.generated.map = this._entries;
            if (finalParams.save) {
                emit('log', {
                    value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace((0, path_1.__packageRootDir)() + '/', '')}</cyan>"`,
                });
                fs_2.default.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
            }
            resolve(docmapJson);
        }), {
            eventEmitter: {
                id: this.constructor.name,
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
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    installSnapshot(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = ((0, object_1.__deepMerge)(SDocmapInstallSnapshotParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            const duration = new s_duration_1.default();
            const folders = s_glob_1.default.resolve(finalParams.glob, {
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
                    value: `<yellow>[install]</yellow> Installing snapshot <yellow>${path_2.default.relative((0, path_1.__packageRootDir)(), folderPath)}</yellow>`,
                });
                const packageJson = (0, package_1.__packageJsonSync)();
                const packageMonoRootPath = (0, path_1.__packageRootDir)(process.cwd(), {
                    highest: true,
                });
                // symlink repos from monorepo
                const removedDependencies = {}, removedDevDependencies = {};
                if (packageMonoRootPath !== (0, path_1.__packageRootDir)()) {
                    const packageJsonFiles = s_glob_1.default.resolve(`${packageMonoRootPath}/**/package.json`);
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
                        const packageFolderPath = (0, fs_1.__folderPath)(file.path);
                        const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
                        (0, fs_1.__ensureDirSync)(destinationFolderPath
                            .split('/')
                            .slice(0, -1)
                            .join('/'));
                        try {
                            fs_2.default.unlinkSync(destinationFolderPath);
                        }
                        catch (e) { }
                        fs_2.default.symlinkSync(packageFolderPath, destinationFolderPath);
                    });
                }
                if (Object.keys(removedDependencies).length ||
                    Object.keys(removedDevDependencies).length) {
                    (0, fs_1.__writeJsonSync)(`${folderPath}/package.json`, packageJson);
                }
                // installing dependencies
                yield pipe((0, install_1.default)('', {
                    cwd: folderPath,
                    args: {
                        silent: false,
                    },
                }));
                // restoring package.json
                if (Object.keys(removedDependencies).length ||
                    Object.keys(removedDevDependencies).length) {
                    packageJson.dependencies = Object.assign(Object.assign({}, packageJson.dependencies), removedDependencies);
                    packageJson.devDependencies = Object.assign(Object.assign({}, packageJson.devDependencies), removedDevDependencies);
                    (0, fs_1.__writeJsonSync)(`${folderPath}/package.json`, packageJson);
                }
                emit('log', {
                    value: `<green>[success]</green> Snapshot "<yellow>${path_2.default.relative((0, path_1.__packageRootDir)(), folderPath)}</yellow>" installed <green>successfully</green>`,
                });
            }
            emit('log', {
                value: `<green>[success]</green> Snapshot(s) installed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
        }), {
            eventEmitter: {
                id: this.constructor.name,
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
     * @param         {Partial<ISDocmapSnapshotParams>}          params       THe params you want to make your snapshot
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    snapshot(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = ((0, object_1.__deepMerge)(SDocmapSnapshotParamsInterface_1.default.defaults(), params));
            const duration = new s_duration_1.default();
            emit('log', {
                value: `<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`,
            });
            if (!fs_2.default.existsSync(`${(0, path_1.__packageRootDir)()}/package.json`)) {
                throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a package.json file is required in order to create a snapshot...`);
            }
            if (!fs_2.default.existsSync(`${(0, path_1.__packageRootDir)()}/docmap.json`)) {
                throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a docmap.json file is required in order to create a snapshot...`);
            }
            const packageJson = (0, package_1.__packageJsonSync)();
            const docmapJson = (0, fs_1.__readJsonSync)(`${(0, path_1.__packageRootDir)()}/docmap.json`);
            // write the docmap
            const outDir = path_2.default.resolve(finalParams.outDir, packageJson.version);
            (0, fs_1.__removeSync)(outDir);
            (0, fs_1.__ensureDirSync)(outDir);
            // copy package.json file
            (0, fs_1.__copySync)(`${(0, path_1.__packageRootDir)()}/package.json`, `${outDir}/package.json`);
            (0, fs_1.__copySync)(`${(0, path_1.__packageRootDir)()}/docmap.json`, `${outDir}/docmap.json`);
            try {
                (0, fs_1.__copySync)(`${(0, path_1.__packageRootDir)()}/package-lock.json`, `${outDir}/package-lock.json`);
                (0, fs_1.__copySync)(`${(0, path_1.__packageRootDir)()}/yarn.lock`, `${outDir}/yarn.lock`);
            }
            catch (e) { }
            const fullMap = Object.assign(Object.assign({}, docmapJson.map), docmapJson.generated.map);
            Object.keys(fullMap).forEach((namespace) => {
                const docmapObj = fullMap[namespace];
                const path = path_2.default.resolve((0, path_1.__packageRootDir)(), docmapObj.relPath);
                let content = fs_2.default.readFileSync(path, 'utf8').toString();
                if (docmapObj.type === 'markdown') {
                }
                else {
                    const docblock = new s_docblock_1.default(content, {
                        renderMarkdown: false,
                    });
                    content = docblock.toString();
                }
                (0, fs_1.__writeFileSync)(path_2.default.resolve(outDir, docmapObj.relPath), content);
            });
            emit('log', {
                value: `<green>[save]</green> Snapshot saved under "<cyan>${path_2.default.relative(process.cwd(), outDir)}</cyan>"`,
            });
            emit('log', {
                value: `<green>[success]</green> Snapshot generated <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`,
            });
            resolve();
        }), {
            eventEmitter: {
                id: this.constructor.name,
            },
        });
    }
}
SDocmap._cachedDocmapJson = {};
SDocmap._registeredTagsProxy = {};
exports.default = SDocmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCwwRUFBbUQ7QUFFbkQsa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELCtDQVVnQztBQUNoQyxtRkFBZ0U7QUFDaEUsdURBQTJFO0FBQzNFLHlEQUFnRTtBQUNoRSxtREFBNEQ7QUFDNUQsOEZBQXdFO0FBQ3hFLGdGQUEwRDtBQUMxRCxrRkFBa0U7QUFDbEUsMEZBQTBFO0FBQzFFLDhHQUF3RjtBQUN4Rix3REFBa0M7QUFDbEMsNENBQXNCO0FBQ3RCLDREQUFzQztBQUN0QyxnREFBMEI7QUFDMUIsMEdBQW9GO0FBQ3BGLDhIQUF3RztBQUN4Ryx3R0FBa0Y7QUFDbEYsNEdBQXNGO0FBQ3RGLG9HQUE4RTtBQUM5RSxnSEFBMEY7QUFFMUYsU0FBUyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDekIsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQWtJRCxNQUFNLE9BQVEsU0FBUSxpQkFBUTtJQTZDMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFvQztRQUM1QyxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxTQUFTO2FBQ2hCO1NBQ0osRUFDRCxrQ0FBMEIsQ0FBQyxLQUFLLENBQUM7WUFDN0IsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUU7Z0JBQ1IsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQy9CLElBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQzt3QkFFaEQsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLElBQUksR0FBRyxLQUFLLFlBQVk7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBQ3RDLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDO2dCQUNELEtBQUssQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUMxQixJQUNJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7d0JBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMsZ0NBQWdDLENBQUM7d0JBRTNDLE9BQU8sSUFBSSxDQUFDO29CQUNoQixJQUFJLEdBQUcsS0FBSyxPQUFPO3dCQUFFLE9BQU8sSUFBSSxDQUFDO29CQUNqQyxPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQzthQUNKO1NBQ0osQ0FBQyxFQUNGLFFBQVEsSUFBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQW5FTjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQW9CLEVBQUUsQ0FBQztRQTBEM0IsYUFBYTtRQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxtQ0FFaEIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxvQkFBb0IsR0FDckMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQzdCLENBQUM7UUFFRixhQUFhO1FBQ2IsYUFBYTtRQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUMzQixhQUFhO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLEdBQUcsa0JBQVUsQ0FBQyxLQUFLLENBQ3ZDLHdCQUFjLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUFDLENBQzFDLENBQUM7WUFDRixhQUFhO1lBQ2IsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLFFBQVEsRUFBRSxHQUFHLEVBQUU7Z0JBQ3ZDLGFBQWE7Z0JBQ2IsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQztZQUN0RCxDQUFDLENBQUMsQ0FBQztTQUNOO0lBQ0wsQ0FBQztJQXpHRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsR0FBVyxFQUFFLFNBQTZCO1FBQzlELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxTQUFTLENBQUM7SUFDL0MsQ0FBQztJQTRGRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILElBQUksQ0FBQyxNQUFvQztRQUNyQyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTs7WUFDOUIsTUFBTSxXQUFXLEdBQXVCLENBQ3BDLElBQUEsb0JBQVcsRUFDUCxvQ0FBNEIsQ0FBQyxRQUFRLEVBQUUsRUFDdkMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUNmLENBQ0osQ0FBQztZQUVGLDBCQUEwQjtZQUMxQixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLFdBQVcsQ0FBQyxLQUFLLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDOUIsV0FBVyxDQUFDLFdBQVcsRUFDdkIsV0FBVyxDQUFDLFFBQVEsRUFDcEIsYUFBYSxDQUNoQixDQUFDO2FBQ0w7WUFFRCxJQUFJLGFBQWEsR0FBRyxNQUFBLFdBQVcsQ0FBQyxRQUFRLG1DQUFJLFNBQVMsQ0FBQztZQUV0RCxhQUFhO1lBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNuRCxPQUFPLE9BQU87Z0JBQ1YsYUFBYTtnQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUNwRCxDQUFDO2FBQ0w7WUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFBLGlCQUFZLEVBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckMsT0FBTyxPQUFPLENBQUM7b0JBQ1gsS0FBSyxFQUFFO3dCQUNILElBQUksRUFBRSxTQUFTO3FCQUNsQjtvQkFDRCxHQUFHLEVBQUUsRUFBRTtvQkFDUCxJQUFJLEVBQUUsRUFBRTtvQkFDUixTQUFTLEVBQUUsRUFBRTtpQkFDaEIsQ0FBQyxDQUFDO2dCQUNILG1CQUFtQjtnQkFDbkIsMElBQTBJO2dCQUMxSSxLQUFLO2FBQ1I7WUFFRCxNQUFNLGVBQWUsR0FBRyxJQUFBLHVCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEQsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7WUFDdEMsTUFBTSxlQUFlLEdBQXlCO2dCQUMxQyxLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDbkQsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO2lCQUNqQztnQkFDRCxHQUFHLEVBQUUsRUFBRTtnQkFDUCxJQUFJLEVBQUUsRUFBRTtnQkFDUixTQUFTLEVBQUUsRUFBRTthQUNoQixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBTyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsRUFBRTs7Z0JBQ3RELElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRCxPQUFPO2dCQUNYLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLHlCQUF5QixFQUN6Qiw4QkFBOEIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUMzQyxjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixhQUFhLENBQ2hCLEVBQ0Qsa0NBQWtDLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDL0MsZUFBZSxFQUNmLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsYUFBYSxDQUNoQixDQUFDO2dCQUVOLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO29CQUNqRCx5QkFBeUI7d0JBQ3JCLDhCQUE4QixDQUFDO2lCQUN0QztxQkFBTSxJQUNILFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxpQkFBaUIsY0FBYyxDQUFDLEVBQ3JEO29CQUNFLHlCQUF5QixHQUFHLEdBQUcsaUJBQWlCLGNBQWMsQ0FBQztpQkFDbEU7cUJBQU0sSUFDSCxZQUFJLENBQUMsVUFBVSxDQUFDLGtDQUFrQyxDQUFDLEVBQ3JEO29CQUNFLHlCQUF5Qjt3QkFDckIsa0NBQWtDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO3dCQUN0QixLQUFLLEVBQUUsMkVBQTJFLGlCQUFpQiw0QkFBNEI7cUJBQ2xJLENBQUMsQ0FBQztpQkFDTjtnQkFFRCxJQUFJLENBQUMseUJBQXlCO29CQUFFLE9BQU87Z0JBRXZDLE1BQU0sZUFBZSxHQUFHLHlCQUF5QixDQUFDLE9BQU8sQ0FDckQsY0FBYyxFQUNkLEVBQUUsQ0FDTCxDQUFDO2dCQUVGLE1BQU0sZUFBZSxHQUFHLEdBQUcsZUFBZSxlQUFlLENBQUM7Z0JBQzFELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDBDQUEwQyxlQUFlLGlGQUFpRjtxQkFDbEwsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1Y7Z0JBRUQsTUFBTSxrQkFBa0IsR0FBRyxJQUFBLG1CQUFjLEVBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzNELE1BQU0sVUFBVSxHQUFHLElBQUEsbUJBQWMsRUFDN0IseUJBQXlCLENBQzVCLENBQUM7Z0JBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQzlDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDM0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEdBQUc7NEJBQ2hDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJOzRCQUM3QixXQUFXLEVBQUUsa0JBQWtCLENBQUMsV0FBVzs0QkFDM0MsT0FBTyxFQUFFLGtCQUFrQixDQUFDLE9BQU87NEJBQ25DLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPO3lCQUN0QyxDQUFDO3FCQUNMO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUNoRCxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUNWLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3JDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRzs0QkFDMUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLElBQUk7NEJBQzdCLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxXQUFXOzRCQUMzQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsT0FBTzs0QkFDbkMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLE9BQU87eUJBQ3RDLENBQUM7cUJBQ0w7Z0JBQ0wsQ0FBQyxDQUNKLENBQUM7Z0JBRUYsVUFBVSxDQUFDLE9BQU8sR0FBRztvQkFDakIsR0FBRyxDQUFDLE1BQUEsVUFBVSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO29CQUM3QixHQUFHLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDO2lCQUMzQyxDQUFDO2dCQUNGLFVBQVUsQ0FBQyxHQUFHLG1DQUNQLENBQUMsTUFBQSxVQUFVLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUMsR0FDdEIsQ0FBQyxNQUFBLE1BQUEsVUFBVSxDQUFDLFNBQVMsMENBQUUsR0FBRyxtQ0FBSSxFQUFFLENBQUMsQ0FDdkMsQ0FBQztnQkFFRixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDaEQsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxNQUFNLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztpQkFDdkQ7Z0JBRUQsS0FDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFDdEMsQ0FBQyxFQUFFLEVBQ0w7b0JBQ0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRXRDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUV4RCxzQkFBc0I7b0JBQ3RCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN2QyxHQUFHLENBQUMsSUFBSTt3QkFDSixNQUFBLElBQUEsc0NBQWlDLEVBQUMsR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDeEMsT0FBTyxHQUFHLEVBQUU7NEJBQ1osR0FBRzt5QkFDTixDQUFDLG1DQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBRW5CLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNuQztnQkFFRCxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDN0MsVUFBVSxDQUFDLEdBQUcsQ0FDakIsRUFBRTtvQkFDQyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUMvQixnQ0FBZ0M7d0JBQ2hDLGdFQUFnRTt3QkFDaEUsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7d0JBQ3ZCLDZDQUE2Qzt3QkFDN0MsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7cUJBQzVDO2lCQUNKO1lBQ0wsQ0FBQyxDQUFBLENBQUM7WUFFRixNQUFNLG9CQUFvQixHQUFHLElBQUEsaUJBQVksRUFBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0QsTUFBTSxRQUFRLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUUzRCw4QkFBOEI7WUFDOUIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDMUMsTUFBTSxrQkFBa0IsR0FBRyxZQUFJLENBQUMsV0FBVyxDQUN2QyxXQUFXLENBQUMsV0FBVyxDQUMxQixDQUFDO2dCQUNGLGVBQWUsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0gsZUFBZSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7YUFDbEM7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7WUFFbkMsbUJBQW1CO1lBQ25CLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUUxRCxxQkFBcUI7WUFDckIsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxlQUFlLENBQUM7WUFFcEIsVUFBVTtZQUNWLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUEsY0FBSyxFQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE1BQU07b0JBQUUsT0FBTztnQkFDcEIsSUFBQSxhQUFLLEVBQ0QsZUFBZSxFQUNmLE9BQU8sRUFDUCxJQUFBLGNBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGNBQUssRUFBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBQ3BCLElBQUEsYUFBSyxFQUNELGVBQWUsRUFDZixPQUFPLEVBQ1AsSUFBQSxrQkFBZ0IsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFFSCwwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQSxFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxNQUFNO2FBQ2I7U0FDSixFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUNGLE1BQXNDO1FBRXRDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFO1lBQzlCLE1BQU0sV0FBVyxHQUF5QixDQUN0QyxJQUFBLG9CQUFXLEVBQ1Asc0NBQThCLENBQUMsUUFBUSxFQUFFLEVBQ3pDLE1BQU0sYUFBTixNQUFNLGNBQU4sTUFBTSxHQUFJLEVBQUUsQ0FDZixDQUNKLENBQUM7WUFFRixNQUFNLFVBQVUsR0FBRyxNQUFNLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUM7WUFFaEQsTUFBTSxNQUFNLEdBQXlCO2dCQUNqQyxNQUFNLEVBQUUsV0FBVztnQkFDbkIsS0FBSyxFQUFFLEVBQUU7YUFDWixDQUFDO1lBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxFQUFFO2dCQUNwRCxJQUFJLFNBQVMsR0FBRyxJQUFJLENBQUM7Z0JBRXJCLE9BQU87Z0JBQ1AsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRTt3QkFDWixTQUFTLEdBQUcsS0FBSyxDQUFDO3FCQUNyQjt5QkFBTSxJQUNILENBQUMsb0JBQVksQ0FBQyxPQUFPLENBQ2pCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUNkLFdBQVcsQ0FBQyxJQUFJLENBQ25CLEVBQ0g7d0JBQ0UsU0FBUyxHQUFHLEtBQUssQ0FBQztxQkFDckI7aUJBQ0o7Z0JBRUQsWUFBWTtnQkFDWixJQUFJLFdBQVcsQ0FBQyxTQUFTLEVBQUU7b0JBQ3ZCLElBQ0ksQ0FBQyxvQkFBWSxDQUFDLE9BQU8sQ0FDakIsSUFBSSxDQUFDLFNBQVMsRUFDZCxXQUFXLENBQUMsU0FBUyxDQUN4QixFQUNIO3dCQUNFLFNBQVMsR0FBRyxLQUFLLENBQUM7cUJBQ3JCO2lCQUNKO2dCQUVELElBQUksU0FBUyxFQUFFO29CQUNYLE1BQU0sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLElBQUksQ0FBQztpQkFDdkM7YUFDSjtZQUVELE9BQU8sQ0FBQyxNQUFNLENBQUMsQ0FBQztRQUNwQixDQUFDLENBQUEsRUFDRDtZQUNJLFlBQVksRUFBRTtnQkFDVixFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2FBQzVCO1NBQ0osQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsWUFBWSxDQUNSLGFBQW1DLElBQUksQ0FBQyxXQUFXO1FBRW5ELE1BQU0sdUJBQXVCLEdBQUcsRUFBRSxDQUFDO1FBRW5DLDBCQUEwQjtRQUMxQixhQUFhO1FBQ2IsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7WUFDOUMsYUFBYTtZQUNiLE1BQU0sU0FBUyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7WUFDNUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFDNUIsSUFBSSxDQUFDLHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ2xELHVCQUF1QixDQUFDLFNBQVMsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRSxDQUFDO2FBQ3hEO1lBQ0QsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEUsQ0FBQyxDQUFDLENBQUM7UUFFSCxJQUFJLFNBQVMsR0FBb0I7WUFDN0IsUUFBUSxFQUFFLEVBQUU7WUFDWixJQUFJLEVBQUUsRUFBRTtZQUNSLElBQUksRUFBRSxFQUFFO1lBQ1IsTUFBTSxFQUFFLEVBQUU7U0FDYixDQUFDO1FBQ0YsTUFBTSxXQUFXLEdBQUcsSUFBQSwyQkFBaUIsR0FBRSxDQUFDO1FBRXhDLE1BQU0sQ0FBQyxJQUFJLENBQUMsdUJBQXVCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtZQUN6RCxNQUFNLE9BQU8sR0FBRyxJQUFJLENBQUMsK0JBQStCLENBQ2hELHVCQUF1QixDQUFDLFdBQVcsQ0FBQyxDQUN2QyxDQUFDO1lBRUYsSUFBSSxXQUFXLEtBQUssV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDbEMsU0FBUyxtQ0FDRixTQUFTLEdBQ1QsT0FBTyxDQUNiLENBQUM7YUFDTDtpQkFBTTtnQkFDSCxNQUFNLGNBQWMsR0FBRyxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUN2QyxjQUFjLENBQUMsWUFBWSxXQUFXLEdBQUcsSUFBSSxFQUFFLENBQUMsbUNBQ3pDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQ3JCLElBQUksRUFBRSxZQUFZLFdBQVcsR0FBRyxJQUFJLEVBQUUsR0FDekMsQ0FBQztnQkFDTixDQUFDLENBQUMsQ0FBQztnQkFDSCxhQUFhO2dCQUNiLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLEdBQUc7b0JBQzlCLElBQUksRUFBRSxXQUFXO29CQUNqQixJQUFJLEVBQUUsSUFBQSxrQkFBUyxFQUFDLE9BQU8sQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLElBQUksRUFBRSxLQUFLLEVBQUUsRUFBRSxFQUFFO3dCQUM5QyxJQUFJLElBQUksS0FBSyxNQUFNOzRCQUNmLE9BQU8sWUFBWSxXQUFXLEdBQUcsS0FBSyxFQUFFLENBQUM7d0JBQzdDLE9BQU8sS0FBSyxDQUFDO29CQUNqQixDQUFDLENBQUM7b0JBQ0YsSUFBSSxFQUFFLGNBQWM7aUJBQ3ZCLENBQUM7YUFDTDtRQUNMLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO1lBQ3ZELElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQztnQkFBRSxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEVBQUUsQ0FBQztZQUNqRSxhQUFhO1lBQ2IsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBQSxvQkFBWSxFQUMxQyxTQUFTLENBQUMsSUFBSTtZQUNkLGFBQWE7WUFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDckMsQ0FBQztZQUNGLGFBQWE7WUFDYixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFBLG9CQUFZLEVBQzFDLFNBQVMsQ0FBQyxJQUFJO1lBQ2QsYUFBYTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUNyQyxDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ3BELE1BQU0sVUFBVSxHQUFHLFNBQVMsQ0FBQyxRQUFRLENBQUMsV0FBVyxDQUFDLENBQUM7Z0JBQ25ELGFBQWE7Z0JBQ2IsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLG9CQUFZLEVBQ3BDLFVBQVUsQ0FBQyxJQUFJO2dCQUNmLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQ3JDLENBQUM7Z0JBQ0YsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEdBQUcsSUFBQSxvQkFBVyxFQUN6QyxTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksRUFDL0IsbUJBQW1CLENBQ3RCLENBQUM7Z0JBQ0YsYUFBYTtnQkFDYixNQUFNLG1CQUFtQixHQUFHLElBQUEsb0JBQVksRUFDcEMsVUFBVSxDQUFDLElBQUk7Z0JBQ2YsYUFBYTtnQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDckMsQ0FBQztnQkFDRixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFBLG9CQUFXLEVBQ3pDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUMvQixtQkFBbUIsQ0FDdEIsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxhQUFhO1FBQ2IsT0FBTyxTQUFTLENBQUM7SUFDckIsQ0FBQztJQUVELCtCQUErQixDQUFDLGFBQWE7UUFDekMsTUFBTSxPQUFPLEdBQUcsRUFBRSxFQUNkLGFBQWEsR0FBRyxFQUFFLEVBQ2xCLGdCQUFnQixHQUFHLEVBQUUsQ0FBQztRQUUxQixnQkFBZ0I7UUFDaEIsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM3QyxNQUFNLFNBQVMsR0FBRyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7WUFFM0MsSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJO2dCQUFFLE9BQU87WUFFNUIsTUFBTSxPQUFPLEdBQUcsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO2lCQUM5QixHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtnQkFDUCxPQUFPLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQztZQUM1QixDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBRWYsSUFBSSxVQUFVLEdBQUcsT0FBTyxDQUFDO1lBRXpCLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNuQyxJQUFJLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxFQUFFO29CQUNuQixVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUc7d0JBQ2YsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztxQkFDL0IsQ0FBQztpQkFDTDtnQkFFRCxJQUFJLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7b0JBQ3BDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUc7d0JBQy9CLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTt3QkFDcEIsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFO3dCQUNoQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixvQkFBb0I7cUJBQ3ZCLENBQUM7b0JBQ0YsYUFBYSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUc7d0JBQ2pDLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSTt3QkFDcEIsRUFBRSxFQUFFLFNBQVMsQ0FBQyxFQUFFO3dCQUNoQixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJO3dCQUN6QixNQUFNLEVBQUUsU0FBUztxQkFDcEIsQ0FBQztpQkFDTDtnQkFFRCxVQUFVLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2xDLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7UUFFSCxPQUFPO1lBQ0gsSUFBSSxFQUFFLE9BQU87WUFDYixJQUFJLEVBQUUsYUFBYTtTQUN0QixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILEtBQUssQ0FBQyxNQUFvQztRQUN0QyxNQUFNLFdBQVcsR0FBd0IsQ0FDckMsSUFBQSxvQkFBVyxFQUFDLHFDQUE2QixDQUFDLFFBQVEsRUFBRSxFQUFFLE1BQU0sQ0FBQyxDQUNoRSxDQUFDO1FBQ0YsT0FBTyxJQUFJLG1CQUFVLENBQ2pCLENBQU8sRUFBRSxPQUFPLEVBQUUsTUFBTSxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUN0QyxJQUFJLENBQUMsY0FBYyxFQUFFO2dCQUNqQixhQUFhO2dCQUNiLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxnQkFBZ0I7YUFDNUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxVQUFVLEdBQUc7Z0JBQ2IsR0FBRyxFQUFFLEVBQUU7Z0JBQ1AsT0FBTyxFQUFFLEVBQUU7Z0JBQ1gsU0FBUyxFQUFFO29CQUNQLE9BQU8sRUFBRSxFQUFFO29CQUNYLEdBQUcsRUFBRSxFQUFFO2lCQUNWO2FBQ0osQ0FBQztZQUVGLE1BQU0sV0FBVyxHQUFHLElBQUEsdUJBQWdCLEdBQUUsQ0FBQztZQUN2QyxNQUFNLGVBQWUsR0FBRyxJQUFBLHVCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEQsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1lBRUgsaUNBQWlDO1lBQ2pDLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLFdBQVcsY0FBYyxDQUFDLEVBQUU7Z0JBQy9DLE1BQU0saUJBQWlCLEdBQUcsSUFBQSxtQkFBYyxFQUNwQyxHQUFHLFdBQVcsY0FBYyxDQUMvQixDQUFDO2dCQUNGLFVBQVUsR0FBRyxpQkFBaUIsQ0FBQztnQkFDL0IsVUFBVSxDQUFDLFNBQVMsR0FBRztvQkFDbkIsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsR0FBRyxFQUFFLEVBQUU7aUJBQ1YsQ0FBQzthQUNMO1lBRUQsd0JBQXdCO1lBQ3hCLE1BQU0sV0FBVyxHQUFHLElBQUEsMkJBQWlCLEdBQUUsQ0FBQztZQUV4QyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRTtnQkFDeEIsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUseUZBQXlGO2lCQUNuRyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxLQUFLLEdBQWE7b0JBQ3BCLEdBQUcsV0FBVyxrQ0FBa0M7aUJBQ25ELENBQUM7Z0JBQ0YsSUFBSSxXQUFXLEtBQUssZUFBZSxFQUFFO29CQUNqQyxLQUFLLENBQUMsSUFBSSxDQUNOLEdBQUcsZUFBZSxrQ0FBa0MsQ0FDdkQsQ0FBQztpQkFDTDtnQkFFRCxNQUFNLGtCQUFrQixHQUFHLGdCQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRTtvQkFDOUMsZUFBZSxFQUFFLEtBQUs7b0JBQ3RCLE9BQU8sRUFBRSxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUU7aUJBQ3JDLENBQUMsQ0FBQztnQkFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSx3Q0FBd0Msa0JBQWtCLENBQUMsTUFBTSw2Q0FBNkM7aUJBQ3hILENBQUMsQ0FBQztnQkFFSCxNQUFNLFlBQVksR0FBYSxFQUFFLENBQUM7Z0JBQ2xDLGtCQUFrQixDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO29CQUNoQyxJQUFJLENBQUMsWUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLElBQUksQ0FBQyxPQUFPLGVBQWUsQ0FBQyxFQUFFO3dCQUNsRCxPQUFPO3FCQUNWO29CQUVELE1BQU0sa0JBQWtCLEdBQUcsSUFBQSxtQkFBYyxFQUNyQyxHQUFHLElBQUksQ0FBQyxPQUFPLGVBQWUsQ0FDakMsQ0FBQztvQkFDRixJQUFJLGtCQUFrQixDQUFDLElBQUksS0FBSyxXQUFXLENBQUMsSUFBSTt3QkFDNUMsT0FBTztvQkFDWCxZQUFZLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLElBQUksQ0FBQyxDQUFDO2dCQUMvQyxDQUFDLENBQUMsQ0FBQztnQkFFSCxhQUFhO2dCQUNiLFVBQVUsQ0FBQyxTQUFTLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQyxNQUFNLENBQzlDLENBQUMsSUFBSSxFQUFFLEVBQUUsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUksQ0FDdEMsQ0FBQzthQUNMO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUseUZBQXlGO2FBQ25HLENBQUMsQ0FBQztZQUVILDREQUE0RDtZQUM1RCxNQUFNLGNBQWMsR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FDbEMsV0FBVyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtnQkFDM0IsT0FBTyxHQUFHLElBQUksbUJBQW1CLENBQUM7WUFDdEMsQ0FBQyxDQUFDLEVBQ0Y7Z0JBQ0ksR0FBRyxFQUFFLFdBQVc7Z0JBQ2hCLE9BQU8sRUFBRSxNQUFBLFdBQVcsQ0FBQyxPQUFPLG1DQUFJLEVBQUU7YUFDckMsQ0FDSixDQUFDO1lBRUYsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsd0NBQXdDLGNBQWMsQ0FBQyxNQUFNLHFDQUFxQzthQUM1RyxDQUFDLENBQUM7WUFFSCxLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsY0FBYyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtnQkFDNUMsTUFBTSxJQUFJLEdBQUcsY0FBYyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUMvQixNQUFNLE9BQU8sR0FBYSxJQUFLLENBQUMsR0FBRyxDQUFDO2dCQUVwQyxJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSxnREFBZ0QsY0FBTSxDQUFDLFFBQVEsQ0FDbEUsSUFBQSx1QkFBZ0IsR0FBRTtvQkFDbEIsYUFBYTtvQkFDYixJQUFJLENBQUMsSUFBSSxDQUNaLFVBQVU7aUJBQ2QsQ0FBQyxDQUFDO2dCQUVILE1BQU0saUJBQWlCLEdBQUcsSUFBSSxvQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2pELGNBQWMsRUFBRSxLQUFLO29CQUNyQixRQUFRLEVBQVksSUFBSyxDQUFDLElBQUk7aUJBQ2pDLENBQUMsQ0FBQztnQkFFSCxNQUFNLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxDQUFDO2dCQUV0QyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFL0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO29CQUFFLFNBQVM7Z0JBRTlDLElBQUksV0FBVyxHQUFRLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO2dCQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU5QixJQUFJLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBRXhCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDVCxhQUFhO29CQUNiLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxNQUFNLEVBQzNDLENBQUMsRUFBRSxFQUNMO3dCQUNFLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoRCxNQUFNLFNBQVM7d0JBQ1gsYUFBYTt3QkFDYixXQUFXLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUM3QixhQUFhO3dCQUNiLElBQUksS0FBSyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFFMUIsc0NBQXNDO3dCQUN0QyxJQUFJLEtBQUssS0FBSyxTQUFTOzRCQUFFLFNBQVM7d0JBRWxDLDJDQUEyQzt3QkFDM0Msa0RBQWtEO3dCQUNsRCxJQUNJLENBQUEsS0FBSyxhQUFMLEtBQUssdUJBQUwsS0FBSyxDQUFFLFFBQVEsQ0FDVixRQUFRLEdBQ1IsT0FBTyxDQUFDLGVBQWUsQ0FBQyxNQUFLLENBQUMsQ0FBQyxFQUN0Qzs0QkFDRSxLQUFLLEdBQUcsS0FBSyxDQUFDLFFBQVEsRUFBRSxDQUFDO3lCQUM1Qjt3QkFFRCw2Q0FBNkM7d0JBQzdDLHNDQUFzQzt3QkFDdEMsSUFDSSxPQUFPLEtBQUssS0FBSyxRQUFROzRCQUN6QixDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsU0FBUyxDQUFDLEVBQ3pCOzRCQUNFLFlBQVksR0FBRyxLQUFLLENBQUM7NEJBQ3JCLE1BQU07eUJBQ1Q7cUJBQ0o7b0JBRUQsSUFBSSxDQUFDLFlBQVksRUFBRTt3QkFDZixTQUFTO3FCQUNaO29CQUVELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRzt3QkFDbEQsU0FBUztvQkFDYixJQUFJLFFBQVEsQ0FBQyxPQUFPO3dCQUFFLFNBQVM7b0JBRS9CLHFEQUFxRDtvQkFDckQsTUFBTSxRQUFRLEdBQUcsSUFBQSxlQUFVLEVBQVcsSUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVsRCxNQUFNLGdCQUFnQixHQUFrQixFQUFFLENBQUM7b0JBRTNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDOUMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUzs0QkFBRSxTQUFTO3dCQUMxQyxjQUFjO3dCQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQzlCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztnQ0FDakIsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUNoQixDQUFDO3lCQUNUOzZCQUFNOzRCQUNILGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDekM7cUJBQ0o7b0JBRUQsTUFBTSxPQUFPLEdBQUcsSUFBQSw0QkFBb0IsRUFDaEMsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FDM0MsQ0FBQztvQkFFRixJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUMvQyxXQUFXLG1DQUNKLGdCQUFnQixLQUNuQixRQUFRLEVBQ1IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMxQyxPQUFPLEVBQUUsY0FBTSxDQUFDLFFBQVEsQ0FDcEIsSUFBQSx1QkFBZ0IsR0FBRSxFQUNSLElBQUssQ0FBQyxJQUFJLENBQ3ZCLEdBQ0osQ0FBQzt3QkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztxQkFDeEM7eUJBQU0sSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUN0QixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDbEMsZ0JBQWdCLENBQUM7cUJBQ3hCO2lCQUNKO2dCQUNELFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2FBQ25DO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsbUNBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUMsTUFDL0IsMkNBQTJDO2FBQzlDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pCLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsRUFBRSxnQkFBZ0I7YUFDNUMsQ0FBQyxDQUFDO1lBRUgsNENBQTRDO1lBQzVDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUM7WUFFekMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNsQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw2RUFBNkUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQzNHLElBQUEsdUJBQWdCLEdBQUUsR0FBRyxHQUFHLEVBQ3hCLEVBQUUsQ0FDTCxVQUFVO2lCQUNkLENBQUMsQ0FBQztnQkFDSCxZQUFJLENBQUMsYUFBYSxDQUNkLFdBQVcsQ0FBQyxPQUFPLEVBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDdEMsQ0FBQzthQUNMO1lBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7YUFDNUI7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILGVBQWUsQ0FDWCxNQUErQztRQUUvQyxPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDdEMsTUFBTSxXQUFXLEdBQW1DLENBQ2hELElBQUEsb0JBQVcsRUFDUCwrQ0FBdUMsQ0FBQyxRQUFRLEVBQUUsRUFDbEQsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUNmLENBQ0osQ0FBQztZQUVGLE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsRUFBRSxDQUFDO1lBRW5DLE1BQU0sT0FBTyxHQUFHLGdCQUFPLENBQUMsT0FBTyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzlDLGVBQWUsRUFBRSxLQUFLO2FBQ3pCLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFO2dCQUNqQixJQUFJLENBQUMsS0FBSyxFQUFFO29CQUNSLEtBQUssRUFBRSw4RkFBOEYsTUFBTSxDQUFDLElBQUkscUdBQXFHO2lCQUN4TixDQUFDLENBQUM7Z0JBQ0gsT0FBTyxPQUFPLEVBQUUsQ0FBQzthQUNwQjtZQUVELEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxPQUFPLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUNyQyxNQUFNLFVBQVUsR0FBVyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBRXRDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDBEQUEwRCxjQUFNLENBQUMsUUFBUSxDQUM1RSxJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLFVBQVUsQ0FDYixXQUFXO2lCQUNmLENBQUMsQ0FBQztnQkFFSCxNQUFNLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixHQUFFLENBQUM7Z0JBQ3hDLE1BQU0sbUJBQW1CLEdBQUcsSUFBQSx1QkFBZ0IsRUFDeEMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiO29CQUNJLE9BQU8sRUFBRSxJQUFJO2lCQUNoQixDQUNKLENBQUM7Z0JBRUYsOEJBQThCO2dCQUM5QixNQUFNLG1CQUFtQixHQUFHLEVBQUUsRUFDMUIsc0JBQXNCLEdBQUcsRUFBRSxDQUFDO2dCQUNoQyxJQUFJLG1CQUFtQixLQUFLLElBQUEsdUJBQWdCLEdBQUUsRUFBRTtvQkFDNUMsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FDcEMsR0FBRyxtQkFBbUIsa0JBQWtCLENBQzNDLENBQUM7b0JBRUYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O3dCQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssbUJBQW1COzRCQUFFLE9BQU87d0JBQ2pELElBQ0ksQ0FBQyxDQUFBLE1BQUEsV0FBVyxDQUFDLFlBQVksMENBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixDQUFBOzRCQUNELENBQUMsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxlQUFlLDBDQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDcEIsQ0FBQTs0QkFFRCxPQUFPO3dCQUVYLElBQUksTUFBQSxXQUFXLENBQUMsWUFBWSwwQ0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUMvQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDbEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNoRCxPQUFPLFdBQVcsQ0FBQyxZQUFZLENBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixDQUFDO3lCQUNMO3dCQUNELElBQ0ksTUFBQSxXQUFXLENBQUMsZUFBZSwwQ0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNsRDs0QkFDRSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDckMsV0FBVyxDQUFDLGVBQWUsQ0FDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLENBQUM7NEJBQ04sT0FBTyxXQUFXLENBQUMsZUFBZSxDQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDcEIsQ0FBQzt5QkFDTDt3QkFFRCxNQUFNLGlCQUFpQixHQUFHLElBQUEsaUJBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xELE1BQU0scUJBQXFCLEdBQUcsR0FBRyxVQUFVLGlCQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNoRixJQUFBLG9CQUFlLEVBQ1gscUJBQXFCOzZCQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDOzZCQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NkJBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNqQixDQUFDO3dCQUNGLElBQUk7NEJBQ0EsWUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3lCQUMxQzt3QkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO3dCQUNkLFlBQUksQ0FBQyxXQUFXLENBQ1osaUJBQWlCLEVBQ2pCLHFCQUFxQixDQUN4QixDQUFDO29CQUNOLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2dCQUNELElBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU07b0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLEVBQzVDO29CQUNFLElBQUEsb0JBQWUsRUFDWCxHQUFHLFVBQVUsZUFBZSxFQUM1QixXQUFXLENBQ2QsQ0FBQztpQkFDTDtnQkFFRCwwQkFBMEI7Z0JBQzFCLE1BQU0sSUFBSSxDQUNOLElBQUEsaUJBQVksRUFBQyxFQUFFLEVBQUU7b0JBQ2IsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsSUFBSSxFQUFFO3dCQUNGLE1BQU0sRUFBRSxLQUFLO3FCQUNoQjtpQkFDSixDQUFDLENBQ0wsQ0FBQztnQkFFRix5QkFBeUI7Z0JBQ3pCLElBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU07b0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLEVBQzVDO29CQUNFLFdBQVcsQ0FBQyxZQUFZLG1DQUNqQixXQUFXLENBQUMsWUFBWSxHQUN4QixtQkFBbUIsQ0FDekIsQ0FBQztvQkFDRixXQUFXLENBQUMsZUFBZSxtQ0FDcEIsV0FBVyxDQUFDLGVBQWUsR0FDM0Isc0JBQXNCLENBQzVCLENBQUM7b0JBQ0YsSUFBQSxvQkFBZSxFQUNYLEdBQUcsVUFBVSxlQUFlLEVBQzVCLFdBQVcsQ0FDZCxDQUFDO2lCQUNMO2dCQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDhDQUE4QyxjQUFNLENBQUMsUUFBUSxDQUNoRSxJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLFVBQVUsQ0FDYixrREFBa0Q7aUJBQ3RELENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUseUZBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTthQUM1QjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsUUFBUSxDQUFDLE1BQXVDO1FBQzVDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxNQUFNLFdBQVcsR0FBMkIsQ0FDeEMsSUFBQSxvQkFBVyxFQUNQLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxNQUFNLENBQ1QsQ0FDSixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUseUdBQXlHO2FBQ25ILENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBQSx1QkFBZ0IsR0FBRSxlQUFlLENBQUMsRUFBRTtnQkFDeEQsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw2RkFBNkYsQ0FDOUgsQ0FBQzthQUNMO1lBQ0QsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFBLHVCQUFnQixHQUFFLGNBQWMsQ0FBQyxFQUFFO2dCQUN2RCxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDRGQUE0RixDQUM3SCxDQUFDO2FBQ0w7WUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixHQUFFLENBQUM7WUFDeEMsTUFBTSxVQUFVLEdBQUcsSUFBQSxtQkFBYyxFQUM3QixHQUFHLElBQUEsdUJBQWdCLEdBQUUsY0FBYyxDQUN0QyxDQUFDO1lBRUYsbUJBQW1CO1lBQ25CLE1BQU0sTUFBTSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ3pCLFdBQVcsQ0FBQyxNQUFNLEVBQ2xCLFdBQVcsQ0FBQyxPQUFPLENBQ3RCLENBQUM7WUFDRixJQUFBLGlCQUFZLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsSUFBQSxvQkFBZSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhCLHlCQUF5QjtZQUN6QixJQUFBLGVBQVUsRUFDTixHQUFHLElBQUEsdUJBQWdCLEdBQUUsZUFBZSxFQUNwQyxHQUFHLE1BQU0sZUFBZSxDQUMzQixDQUFDO1lBQ0YsSUFBQSxlQUFVLEVBQ04sR0FBRyxJQUFBLHVCQUFnQixHQUFFLGNBQWMsRUFDbkMsR0FBRyxNQUFNLGNBQWMsQ0FDMUIsQ0FBQztZQUNGLElBQUk7Z0JBQ0EsSUFBQSxlQUFVLEVBQ04sR0FBRyxJQUFBLHVCQUFnQixHQUFFLG9CQUFvQixFQUN6QyxHQUFHLE1BQU0sb0JBQW9CLENBQ2hDLENBQUM7Z0JBQ0YsSUFBQSxlQUFVLEVBQ04sR0FBRyxJQUFBLHVCQUFnQixHQUFFLFlBQVksRUFDakMsR0FBRyxNQUFNLFlBQVksQ0FDeEIsQ0FBQzthQUNMO1lBQUMsT0FBTyxDQUFDLEVBQUUsR0FBRTtZQUVkLE1BQU0sT0FBTyxtQ0FDTixVQUFVLENBQUMsR0FBRyxHQUNkLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUM5QixDQUFDO1lBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDdkMsTUFBTSxTQUFTLEdBQUcsT0FBTyxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLElBQUksR0FBRyxjQUFNLENBQUMsT0FBTyxDQUN2QixJQUFBLHVCQUFnQixHQUFFLEVBQ2xCLFNBQVMsQ0FBQyxPQUFPLENBQ3BCLENBQUM7Z0JBQ0YsSUFBSSxPQUFPLEdBQUcsWUFBSSxDQUFDLFlBQVksQ0FBQyxJQUFJLEVBQUUsTUFBTSxDQUFDLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBQ3pELElBQUksU0FBUyxDQUFDLElBQUksS0FBSyxVQUFVLEVBQUU7aUJBQ2xDO3FCQUFNO29CQUNILE1BQU0sUUFBUSxHQUFHLElBQUksb0JBQVcsQ0FBQyxPQUFPLEVBQUU7d0JBQ3RDLGNBQWMsRUFBRSxLQUFLO3FCQUN4QixDQUFDLENBQUM7b0JBQ0gsT0FBTyxHQUFHLFFBQVEsQ0FBQyxRQUFRLEVBQUUsQ0FBQztpQkFDakM7Z0JBQ0QsSUFBQSxvQkFBZSxFQUNYLGNBQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLFNBQVMsQ0FBQyxPQUFPLENBQUMsRUFDekMsT0FBTyxDQUNWLENBQUM7WUFDTixDQUFDLENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHFEQUFxRCxjQUFNLENBQUMsUUFBUSxDQUN2RSxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQ2IsTUFBTSxDQUNULFVBQVU7YUFDZCxDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxzRkFDSCxRQUFRLENBQUMsR0FBRyxFQUFFLENBQUMsZ0JBQ25CLFdBQVc7YUFDZCxDQUFDLENBQUM7WUFFSCxPQUFPLEVBQUUsQ0FBQztRQUNkLENBQUMsQ0FBQSxFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7YUFDNUI7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDOztBQW5xQ00seUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBRXZCLDRCQUFvQixHQUFHLEVBQUUsQ0FBQztBQW9xQ3JDLGtCQUFlLE9BQU8sQ0FBQyJ9