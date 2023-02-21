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
                        key.match(/^([a-zA-Z0-9-_@\/]+)?\/styleguide\//)) {
                        return true;
                    }
                    if (key === 'styleguide')
                        return true;
                    return false;
                },
                specs({ key, value, isObject }) {
                    if (key.split('/').length > 1 &&
                        key.match(/^([a-zA-Z0-9-_@\/]+)?\/views\//)) {
                        return true;
                    }
                    if (key === 'specs')
                        return true;
                    return false;
                },
            },
            noExtends: s_sugar_config_1.default.get('docmap.noExtends'),
            excludePackages: s_sugar_config_1.default.get('docmap.excludePackages'),
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
     * @return      {Promise<ISDocmapObj>}                          A promise instance that will be resolved once the docmap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            const finalParams = ((0, object_1.__deepMerge)(SDocmapReadParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            const packageJson = (0, package_1.__packageJsonSync)();
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
                // check if package is excluded from the extends
                if ((packageNameOrPath !== packageJson.name,
                    this._isPackageExtendsExcluded(packageNameOrPath, finalParams.excludePackages))) {
                    return;
                }
                if (extendedPackages.indexOf(packageNameOrPath) !== -1) {
                    return;
                }
                extendedPackages.push(packageNameOrPath);
                let currentPathDocmapJsonPath, potentialPackageDocmapJsonPath = path_2.default.resolve(docmapRootPath, 'node_modules', packageNameOrPath, 'docmap.json'), potentialRootPackageDocmapJsonPath = path_2.default.resolve(packageMonoRoot, 'node_modules', packageNameOrPath, 'docmap.json');
                if (fs_2.default.existsSync(potentialPackageDocmapJsonPath)) {
                    currentPathDocmapJsonPath = potentialPackageDocmapJsonPath;
                }
                else if (fs_2.default.existsSync(`${packageNameOrPath}/docmap.json`)) {
                    currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
                }
                else if (fs_2.default.existsSync(potentialRootPackageDocmapJsonPath)) {
                    currentPathDocmapJsonPath =
                        potentialRootPackageDocmapJsonPath;
                }
                else {
                    console.log(`<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`);
                }
                if (!currentPathDocmapJsonPath)
                    return;
                const extendsRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');
                const packageJsonPath = `${extendsRootPath}/package.json`;
                if (!fs_2.default.existsSync(packageJsonPath)) {
                    console.log(`<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`);
                    return;
                }
                const currentPackageJson = (0, fs_1.__readJsonSync)(packageJsonPath);
                // check if package is excluded from the extends
                if (currentPackageJson.name !== packageJson.name &&
                    this._isPackageExtendsExcluded(currentPackageJson.name, finalParams.excludePackages)) {
                    return;
                }
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
            this.constructor._cachedDocmapJson[docmapVersion] = finalDocmapJson;
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
        }));
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
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
        }));
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
     * Check if the passed package name is excluded from the extends array or not
     */
    _isPackageExtendsExcluded(packageName, excludePackages = this.settings.excludePackages) {
        for (let excludePackageName of excludePackages) {
            if (micromatch_1.default.isMatch(packageName, excludePackageName)) {
                return true;
            }
        }
        return false;
    }
    /**
     * @name          build
     * @type          Function
     *
     * This method allows you to specify one or more glob patterns to scan files for "@namespace" docblock tags
     * and extract all the necessary informations to build the docmap.json file
     *
     * @param         {Partial<ISDocmapBuildParams>}          params        The params to use to build your docmap
     * @return        {Promise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    build(params) {
        const finalParams = ((0, object_1.__deepMerge)(SDocmapBuildParamsInterface_1.default.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
                console.log(`<yellow>[build]</yellow> Building extends array from existing docmap compliant packages`);
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
                console.log(`<yellow>[build]</yellow> Found <cyan>${currentDocmapFiles.length}</cyan> docmap.json file(s) in dependencies`);
                let extendsArray = [];
                currentDocmapFiles.forEach((file) => {
                    if (!fs_2.default.existsSync(`${file.dirPath}/package.json`)) {
                        return;
                    }
                    const currentPackageJson = (0, fs_1.__readJsonSync)(`${file.dirPath}/package.json`);
                    if (currentPackageJson.name === packageJson.name)
                        return;
                    extendsArray.push(currentPackageJson.name);
                });
                // filter extends
                extendsArray = extendsArray.filter((packageName) => {
                    return !this._isPackageExtendsExcluded(packageName, finalParams.excludePackages);
                });
                // @ts-ignore
                docmapJson.generated.extends = extendsArray.filter((name) => name !== packageJson.name);
            }
            console.log(`<yellow>[build]</yellow> Building map by searching for files inside the current package`);
            // searching inside the current package for docblocks to use
            const filesInPackage = s_glob_1.default.resolve(finalParams.globs.map((glob) => {
                return `${glob}:\\*\\s@namespace`;
            }), {
                cwd: packageRoot,
                exclude: (_b = finalParams.exclude) !== null && _b !== void 0 ? _b : [],
            });
            console.log(`<yellow>[build]</yellow> Found <cyan>${filesInPackage.length}</cyan> file(s) to parse in package`);
            for (let i = 0; i < filesInPackage.length; i++) {
                const file = filesInPackage[i];
                const content = file.raw;
                console.log(`<yellow>[build]</yellow> Parsing file "<cyan>${path_2.default.relative((0, path_1.__packageRootDir)(), 
                // @ts-ignore
                file.path)}</cyan>"`);
                const docblocksInstance = new s_docblock_1.default(file.path, {
                    renderMarkdown: false,
                    filepath: file.path,
                });
                yield docblocksInstance.parse();
                const docblocks = docblocksInstance.toObject();
                if (!docblocks || !docblocks.length)
                    continue;
                let docblockObj = {};
                const children = {};
                for (let j = 0; j < docblocks.length; j++) {
                    const docblock = docblocks[j];
                    let matchFilters = false;
                    for (let k = 0; 
                    // @ts-ignore
                    k < Object.keys(finalParams.excludeByTags).length; k++) {
                        const key = Object.keys(finalParams.excludeByTags)[k];
                        let filterRegs = 
                        // @ts-ignore
                        finalParams.excludeByTags[key];
                        if (!Array.isArray(filterRegs)) {
                            filterRegs = [filterRegs];
                        }
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
                        if (typeof value === 'string') {
                            filterRegs.forEach((reg) => {
                                if (value.match(reg)) {
                                    matchFilters = true;
                                }
                            });
                            if (matchFilters) {
                                break;
                            }
                        }
                    }
                    // exclude this item if match any of the excludeByTags filters
                    if (matchFilters) {
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
            console.log(`<yellow>[build]</yellow> <green>${Object.keys(this._entries).length}</green> entries gathered for this docmap`);
            // save entries inside the json map property
            docmapJson.generated.map = this._entries;
            if (finalParams.save) {
                console.log(`<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace((0, path_1.__packageRootDir)() + '/', '')}</cyan>"`);
                fs_2.default.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
            }
            resolve(docmapJson);
        }));
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
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = ((0, object_1.__deepMerge)(SDocmapInstallSnapshotParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            const duration = new s_duration_1.default();
            const folders = s_glob_1.default.resolve(finalParams.glob, {
                defaultExcludes: false,
            });
            if (!folders.length) {
                console.log(`<cyan>[info]</cyan> It seem's that you don't have any snapshot(s) matching the glob "<cyan>${params.glob}</cyan>". Try generating a snapshot first with the command "<yellow>sugar docmap.snapshot</yellow>"`);
                return resolve();
            }
            for (let i = 0; i < folders.length; i++) {
                const folderPath = folders[i];
                console.log(`<yellow>[install]</yellow> Installing snapshot <yellow>${path_2.default.relative((0, path_1.__packageRootDir)(), folderPath)}</yellow>`);
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
                yield (0, install_1.default)('', {
                    cwd: folderPath,
                    args: {
                        silent: false,
                    },
                });
                // restoring package.json
                if (Object.keys(removedDependencies).length ||
                    Object.keys(removedDevDependencies).length) {
                    packageJson.dependencies = Object.assign(Object.assign({}, packageJson.dependencies), removedDependencies);
                    packageJson.devDependencies = Object.assign(Object.assign({}, packageJson.devDependencies), removedDevDependencies);
                    (0, fs_1.__writeJsonSync)(`${folderPath}/package.json`, packageJson);
                }
                console.log(`<green>[success]</green> Snapshot "<yellow>${path_2.default.relative((0, path_1.__packageRootDir)(), folderPath)}</yellow>" installed <green>successfully</green>`);
            }
            console.log(`<green>[success]</green> Snapshot(s) installed <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
        }));
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
     * @return        {Promise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    snapshot(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = ((0, object_1.__deepMerge)(SDocmapSnapshotParamsInterface_1.default.defaults(), params));
            const duration = new s_duration_1.default();
            console.log(`<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`);
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
            console.log(`<green>[save]</green> Snapshot saved under "<cyan>${path_2.default.relative(process.cwd(), outDir)}</cyan>"`);
            console.log(`<green>[success]</green> Snapshot generated <green>successfully</green> in <yellow>${duration.end().formatedDuration}</yellow>`);
            resolve();
        }));
    }
}
SDocmap._cachedDocmapJson = {};
SDocmap._registeredTagsProxy = {};
exports.default = SDocmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCwwRUFBbUQ7QUFFbkQsa0VBQTJDO0FBQzNDLGtGQUEwRDtBQUMxRCwrQ0FVZ0M7QUFDaEMsbUZBQWdFO0FBQ2hFLHVEQUEyRTtBQUMzRSx5REFBZ0U7QUFDaEUsbURBQTREO0FBQzVELDhGQUF3RTtBQUN4RSxnRkFBMEQ7QUFDMUQsa0ZBQWtFO0FBQ2xFLDBGQUEwRTtBQUMxRSw4R0FBd0Y7QUFDeEYsd0RBQWtDO0FBQ2xDLDRDQUFzQjtBQUN0Qiw0REFBc0M7QUFDdEMsZ0RBQTBCO0FBQzFCLDBHQUFvRjtBQUNwRiw4SEFBd0c7QUFDeEcsd0dBQWtGO0FBQ2xGLDRHQUFzRjtBQUN0RixvR0FBOEU7QUFDOUUsZ0hBQTBGO0FBRTFGLFNBQVMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3pCLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzNCLENBQUM7QUF3SUQsTUFBTSxPQUFRLFNBQVEsaUJBQVE7SUE2QzFCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBb0M7UUFDNUMsS0FBSyxDQUNELElBQUEsb0JBQVcsRUFDUDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsU0FBUzthQUNoQjtTQUNKLEVBQ0Qsa0NBQTBCLENBQUMsS0FBSyxDQUFDO1lBQzdCLFNBQVMsRUFBRSxFQUFFO1lBQ2IsVUFBVSxFQUFFO2dCQUNSLFVBQVUsQ0FBQyxFQUFFLEdBQUcsRUFBRSxLQUFLLEVBQUUsUUFBUSxFQUFFO29CQUMvQixJQUNJLEdBQUcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUM7d0JBQ3pCLEdBQUcsQ0FBQyxLQUFLLENBQUMscUNBQXFDLENBQUMsRUFDbEQ7d0JBQ0UsT0FBTyxJQUFJLENBQUM7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