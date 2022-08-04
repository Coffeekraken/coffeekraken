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
const checkPathWithMultipleExtensions_1 = __importDefault(require("@coffeekraken/sugar/node/fs/checkPathWithMultipleExtensions"));
const copySync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/copySync"));
const ensureDirSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/ensureDirSync"));
const filename_1 = __importDefault(require("@coffeekraken/sugar/node/fs/filename"));
const folderPath_1 = __importDefault(require("@coffeekraken/sugar/node/fs/folderPath"));
const readJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/readJsonSync"));
const removeSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/removeSync"));
const writeFileSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeFileSync"));
const writeJsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/fs/writeJsonSync"));
const install_1 = __importDefault(require("@coffeekraken/sugar/node/npm/install"));
const jsonSync_1 = __importDefault(require("@coffeekraken/sugar/node/package/jsonSync"));
const packageRoot_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRoot"));
const packageRootDir_1 = __importDefault(require("@coffeekraken/sugar/node/path/packageRootDir"));
const deepFilter_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepFilter"));
const deepMap_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMap"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const sort_1 = __importDefault(require("@coffeekraken/sugar/shared/object/sort"));
const sortDeep_1 = __importDefault(require("@coffeekraken/sugar/shared/object/sortDeep"));
const namespaceCompliant_1 = __importDefault(require("@coffeekraken/sugar/shared/string/namespaceCompliant"));
const chokidar_1 = __importDefault(require("chokidar"));
const fs_1 = __importDefault(require("fs"));
const path_1 = __importDefault(require("path"));
const SDocmapBuildParamsInterface_1 = __importDefault(require("./interface/SDocmapBuildParamsInterface"));
const SDocmapInstallSnapshotParamsInterface_1 = __importDefault(require("./interface/SDocmapInstallSnapshotParamsInterface"));
const SDocmapReadParamsInterface_1 = __importDefault(require("./interface/SDocmapReadParamsInterface"));
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
        super((0, deepMerge_1.default)({
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
            const finalParams = ((0, deepMerge_1.default)(SDocmapReadParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            // snapshot param handling
            if (finalParams.snapshot) {
                finalParams.input = path_1.default.resolve(finalParams.snapshotDir, finalParams.snapshot, 'docmap.json');
            }
            let docmapVersion = (_a = finalParams.snapshot) !== null && _a !== void 0 ? _a : 'current';
            // @ts-ignore
            if (this.constructor._cachedDocmapJson[docmapVersion]) {
                return resolve(
                // @ts-ignore
                this.constructor._cachedDocmapJson[docmapVersion]);
            }
            let docmapRootPath = (0, folderPath_1.default)(finalParams.input);
            if (!fs_1.default.existsSync(finalParams.input)) {
                throw new Error(`<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`);
            }
            const packageMonoRoot = (0, packageRoot_1.default)(process.cwd(), {
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
                let currentPathDocmapJsonPath, potentialPackageDocmapJsonPath = path_1.default.resolve(docmapRootPath, 'node_modules', packageNameOrPath, 'docmap.json'), potentialRootPackageDocmapJsonPath = path_1.default.resolve(packageMonoRoot, 'node_modules', packageNameOrPath, 'docmap.json');
                if (fs_1.default.existsSync(potentialPackageDocmapJsonPath)) {
                    currentPathDocmapJsonPath =
                        potentialPackageDocmapJsonPath;
                }
                else if (fs_1.default.existsSync(`${packageNameOrPath}/docmap.json`)) {
                    currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
                }
                else if (fs_1.default.existsSync(potentialRootPackageDocmapJsonPath)) {
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
                if (!fs_1.default.existsSync(packageJsonPath)) {
                    emit('log', {
                        type: s_log_1.default.TYPE_WARN,
                        value: `<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`,
                    });
                    return;
                }
                const currentPackageJson = (0, readJsonSync_1.default)(packageJsonPath);
                const docmapJson = (0, readJsonSync_1.default)(currentPathDocmapJsonPath);
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
                    obj.path = path_1.default.resolve(extendsRootPath, obj.relPath);
                    // checking ".dev...."
                    let ext = obj.relPath.split('.').pop();
                    obj.path =
                        (_k = (0, checkPathWithMultipleExtensions_1.default)(obj.path, [
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
            const docmapJsonFolderPath = (0, folderPath_1.default)(finalParams.input);
            yield loadJson(docmapJsonFolderPath, docmapJsonFolderPath);
            // loading available snapshots
            if (fs_1.default.existsSync(finalParams.snapshotDir)) {
                const availableSnapshots = fs_1.default.readdirSync(finalParams.snapshotDir);
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
                const toSort = (0, get_1.default)(finalDocmapJson, dotPath);
                if (!toSort)
                    return;
                (0, set_1.default)(finalDocmapJson, dotPath, (0, sort_1.default)(toSort, (a, b) => {
                    return a.key.localeCompare(b.key);
                }));
            });
            finalParams.sortDeep.forEach((dotPath) => {
                const toSort = (0, get_1.default)(finalDocmapJson, dotPath);
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
        const packageJson = (0, jsonSync_1.default)();
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
                    tree: (0, deepMap_1.default)(menuObj.tree, ({ prop, value }) => {
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
                finalMenu.custom[menuName].tree = (0, deepMerge_1.default)(finalMenu.custom[menuName].tree, packageFilteredTree);
                // @ts-ignore
                const packageFilteredSlug = (0, deepFilter_1.default)(packageObj.slug, 
                // @ts-ignore
                this.settings.customMenu[menuName]);
                finalMenu.custom[menuName].slug = (0, deepMerge_1.default)(finalMenu.custom[menuName].slug, packageFilteredSlug);
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
        const finalParams = ((0, deepMerge_1.default)(SDocmapBuildParamsInterface_1.default.defaults(), params));
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
            const packageRoot = (0, packageRootDir_1.default)();
            const packageMonoRoot = (0, packageRoot_1.default)(process.cwd(), {
                highest: true,
            });
            // check if a file already exists
            if (fs_1.default.existsSync(`${packageRoot}/docmap.json`)) {
                const currentDocmapJson = (0, readJsonSync_1.default)(`${packageRoot}/docmap.json`);
                docmapJson = currentDocmapJson;
                docmapJson.generated = {
                    extends: [],
                    map: {},
                };
            }
            // getting package infos
            const packageJson = (0, jsonSync_1.default)();
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
                    if (!fs_1.default.existsSync(`${file.dirPath}/package.json`)) {
                        return;
                    }
                    const currentPackageJson = (0, readJsonSync_1.default)(`${file.dirPath}/package.json`);
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
                    value: `<yellow>[build]</yellow> Parsing file "<cyan>${path_1.default.relative((0, packageRootDir_1.default)(), 
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
                    const filename = (0, filename_1.default)(file.path);
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
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: path_1.default.relative((0, packageRootDir_1.default)(), file.path) });
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
                    value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace((0, packageRootDir_1.default)() + '/', '')}</cyan>"`,
                });
                fs_1.default.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
            }
            resolve(docmapJson);
        }), {
            metas: {
                id: `build`,
            },
        }, {
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
            const finalParams = ((0, deepMerge_1.default)(SDocmapInstallSnapshotParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
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
                    value: `<yellow>[install]</yellow> Installing snapshot <yellow>${path_1.default.relative((0, packageRootDir_1.default)(), folderPath)}</yellow>`,
                });
                const packageJson = (0, jsonSync_1.default)();
                const packageMonoRootPath = (0, packageRoot_1.default)(process.cwd(), {
                    highest: true,
                });
                // symlink repos from monorepo
                const removedDependencies = {}, removedDevDependencies = {};
                if (packageMonoRootPath !== (0, packageRoot_1.default)()) {
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
                        const packageFolderPath = (0, folderPath_1.default)(file.path);
                        const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
                        (0, ensureDirSync_1.default)(destinationFolderPath
                            .split('/')
                            .slice(0, -1)
                            .join('/'));
                        try {
                            fs_1.default.unlinkSync(destinationFolderPath);
                        }
                        catch (e) { }
                        fs_1.default.symlinkSync(packageFolderPath, destinationFolderPath);
                    });
                }
                if (Object.keys(removedDependencies).length ||
                    Object.keys(removedDevDependencies).length) {
                    (0, writeJsonSync_1.default)(`${folderPath}/package.json`, packageJson);
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
                    (0, writeJsonSync_1.default)(`${folderPath}/package.json`, packageJson);
                }
                emit('log', {
                    value: `<green>[success]</green> Snapshot "<yellow>${path_1.default.relative((0, packageRootDir_1.default)(), folderPath)}</yellow>" installed <green>successfully</green>`,
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
     * @param         {Partial<ISDocmapSnapshotParams>}          params       THe params you want to make your snapshot
     * @return        {SPromise}                                     A promise resolved once the scan process has been finished
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    snapshot(params) {
        return new s_promise_1.default(({ resolve, reject, emit, pipe }) => __awaiter(this, void 0, void 0, function* () {
            const finalParams = ((0, deepMerge_1.default)(SDocmapSnapshotParamsInterface_1.default.defaults(), params));
            const duration = new s_duration_1.default();
            emit('log', {
                value: `<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`,
            });
            if (!fs_1.default.existsSync(`${(0, packageRootDir_1.default)()}/package.json`)) {
                throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a package.json file is required in order to create a snapshot...`);
            }
            if (!fs_1.default.existsSync(`${(0, packageRootDir_1.default)()}/docmap.json`)) {
                throw new Error(`<red>[${this.constructor.name}.snapshot]</red> Sorry but a docmap.json file is required in order to create a snapshot...`);
            }
            const packageJson = (0, jsonSync_1.default)();
            const docmapJson = (0, readJsonSync_1.default)(`${(0, packageRootDir_1.default)()}/docmap.json`);
            // write the docmap
            const outDir = path_1.default.resolve(finalParams.outDir, packageJson.version);
            (0, removeSync_1.default)(outDir);
            (0, ensureDirSync_1.default)(outDir);
            // copy package.json file
            (0, copySync_1.default)(`${(0, packageRootDir_1.default)()}/package.json`, `${outDir}/package.json`);
            (0, copySync_1.default)(`${(0, packageRootDir_1.default)()}/docmap.json`, `${outDir}/docmap.json`);
            try {
                (0, copySync_1.default)(`${(0, packageRootDir_1.default)()}/package-lock.json`, `${outDir}/package-lock.json`);
                (0, copySync_1.default)(`${(0, packageRootDir_1.default)()}/yarn.lock`, `${outDir}/yarn.lock`);
            }
            catch (e) { }
            const fullMap = Object.assign(Object.assign({}, docmapJson.map), docmapJson.generated.map);
            Object.keys(fullMap).forEach((namespace) => {
                const docmapObj = fullMap[namespace];
                const path = path_1.default.resolve((0, packageRootDir_1.default)(), docmapObj.relPath);
                let content = fs_1.default.readFileSync(path, 'utf8').toString();
                if (docmapObj.type === 'markdown') {
                }
                else {
                    const docblock = new s_docblock_1.default(content, {
                        renderMarkdown: false,
                    });
                    content = docblock.toString();
                }
                (0, writeFileSync_1.default)(path_1.default.resolve(outDir, docmapObj.relPath), content);
            });
            emit('log', {
                value: `<green>[save]</green> Snapshot saved under "<cyan>${path_1.default.relative(process.cwd(), outDir)}</cyan>"`,
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
SDocmap._cachedDocmapJson = {};
SDocmap._registeredTagsProxy = {};
exports.default = SDocmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUNuRCwwRUFBbUQ7QUFFbkQsa0VBQTJDO0FBQzNDLGdFQUF5QztBQUN6Qyx3RUFBaUQ7QUFDakQsa0ZBQTBEO0FBQzFELGtJQUE0RztBQUM1RyxvRkFBOEQ7QUFDOUQsOEZBQXdFO0FBQ3hFLG9GQUFpRTtBQUNqRSx3RkFBa0U7QUFDbEUsNEZBQXNFO0FBQ3RFLHdGQUFrRTtBQUNsRSw4RkFBd0U7QUFDeEUsOEZBQXdFO0FBQ3hFLG1GQUFnRTtBQUNoRSx5RkFBMEU7QUFDMUUsNEZBQXNFO0FBQ3RFLGtHQUE0RTtBQUM1RSw4RkFBd0U7QUFDeEUsd0ZBQWtFO0FBQ2xFLDRGQUFzRTtBQUN0RSxnRkFBMEQ7QUFDMUQsZ0ZBQTBEO0FBQzFELGtGQUFrRTtBQUNsRSwwRkFBMEU7QUFDMUUsOEdBQXdGO0FBQ3hGLHdEQUFrQztBQUNsQyw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLDBHQUFvRjtBQUNwRiw4SEFBd0c7QUFDeEcsd0dBQWtGO0FBQ2xGLG9HQUE4RTtBQUM5RSxnSEFBMEY7QUFFMUYsU0FBUyxhQUFhLENBQUMsQ0FBQyxHQUFHLEVBQUU7SUFDekIsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLENBQUM7QUFDM0IsQ0FBQztBQXdIRCxNQUFNLE9BQVEsU0FBUSxpQkFBUTtJQTZDMUI7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFvQztRQUM1QyxLQUFLLENBQ0QsSUFBQSxtQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxTQUFTO2FBQ2hCO1NBQ0osRUFDRCxrQ0FBMEIsQ0FBQyxLQUFLLENBQUM7WUFDN0IsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUU7Z0JBQ1IsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQy9CLElBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQzt3QkFFaEQsT0FBTyxJQUFJLENBQUM7b0JBQ2hCLElBQUksR0FBRyxLQUFLLFlBQVk7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBQ3RDLE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDO2FBQ0o7U0FDSixDQUFDLEVBQ0YsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBMUROOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBaUQzQixhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLG1DQUVoQixJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixHQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDN0IsQ0FBQztRQUVGLGFBQWE7UUFDYixhQUFhO1FBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQzNCLGFBQWE7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sR0FBRyxrQkFBVSxDQUFDLEtBQUssQ0FDdkMsd0JBQWMsQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsQ0FDMUMsQ0FBQztZQUNGLGFBQWE7WUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsUUFBUSxFQUFFLEdBQUcsRUFBRTtnQkFDdkMsYUFBYTtnQkFDYixPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsT0FBTyxDQUFDO1lBQ3RELENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBaEdEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxHQUFXLEVBQUUsU0FBNkI7UUFDOUQsSUFBSSxDQUFDLG9CQUFvQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQztJQUMvQyxDQUFDO0lBbUZEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsSUFBSSxDQUFDLE1BQW9DO1FBQ3JDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLElBQUksRUFBRSxJQUFJLEVBQUUsRUFBRSxFQUFFOztZQUM5QixNQUFNLFdBQVcsR0FBdUIsQ0FDcEMsSUFBQSxtQkFBVyxFQUNQLG9DQUE0QixDQUFDLFFBQVEsRUFBRSxFQUN2QyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FDSixDQUFDO1lBRUYsMEJBQTBCO1lBQzFCLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsV0FBVyxDQUFDLEtBQUssR0FBRyxjQUFNLENBQUMsT0FBTyxDQUM5QixXQUFXLENBQUMsV0FBVyxFQUN2QixXQUFXLENBQUMsUUFBUSxFQUNwQixhQUFhLENBQ2hCLENBQUM7YUFDTDtZQUVELElBQUksYUFBYSxHQUFHLE1BQUEsV0FBVyxDQUFDLFFBQVEsbUNBQUksU0FBUyxDQUFDO1lBRXRELGFBQWE7WUFDYixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEVBQUU7Z0JBQ25ELE9BQU8sT0FBTztnQkFDVixhQUFhO2dCQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLENBQ3BELENBQUM7YUFDTDtZQUVELElBQUksY0FBYyxHQUFHLElBQUEsb0JBQVksRUFBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFckQsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNyQyxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLHFDQUFxQyxXQUFXLENBQUMsS0FBSyw2QkFBNkIsQ0FDckksQ0FBQzthQUNMO1lBRUQsTUFBTSxlQUFlLEdBQUcsSUFBQSxxQkFBYSxFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDakQsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxnQkFBZ0IsR0FBYSxFQUFFLENBQUM7WUFDdEMsTUFBTSxlQUFlLEdBQXlCO2dCQUMxQyxLQUFLLEVBQUU7b0JBQ0gsSUFBSSxFQUFFLFdBQVcsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLFVBQVUsQ0FBQyxDQUFDLENBQUMsU0FBUztvQkFDbkQsUUFBUSxFQUFFLFdBQVcsQ0FBQyxRQUFRO2lCQUNqQztnQkFDRCxHQUFHLEVBQUUsRUFBRTtnQkFDUCxJQUFJLEVBQUUsRUFBRTtnQkFDUixTQUFTLEVBQUUsRUFBRTthQUNoQixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsQ0FBTyxpQkFBaUIsRUFBRSxXQUFXLEVBQUUsRUFBRTs7Z0JBQ3RELElBQUksZ0JBQWdCLENBQUMsT0FBTyxDQUFDLGlCQUFpQixDQUFDLEtBQUssQ0FBQyxDQUFDO29CQUNsRCxPQUFPO2dCQUNYLGdCQUFnQixDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxDQUFDO2dCQUV6QyxJQUFJLHlCQUF5QixFQUN6Qiw4QkFBOEIsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUMzQyxjQUFjLEVBQ2QsY0FBYyxFQUNkLGlCQUFpQixFQUNqQixhQUFhLENBQ2hCLEVBQ0Qsa0NBQWtDLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDL0MsZUFBZSxFQUNmLGNBQWMsRUFDZCxpQkFBaUIsRUFDakIsYUFBYSxDQUNoQixDQUFDO2dCQUVOLElBQUksWUFBSSxDQUFDLFVBQVUsQ0FBQyw4QkFBOEIsQ0FBQyxFQUFFO29CQUNqRCx5QkFBeUI7d0JBQ3JCLDhCQUE4QixDQUFDO2lCQUN0QztxQkFBTSxJQUNILFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxpQkFBaUIsY0FBYyxDQUFDLEVBQ3JEO29CQUNFLHlCQUF5QixHQUFHLEdBQUcsaUJBQWlCLGNBQWMsQ0FBQztpQkFDbEU7cUJBQU0sSUFDSCxZQUFJLENBQUMsVUFBVSxDQUFDLGtDQUFrQyxDQUFDLEVBQ3JEO29CQUNFLHlCQUF5Qjt3QkFDckIsa0NBQWtDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNILElBQUksQ0FBQyxLQUFLLEVBQUU7d0JBQ1IsSUFBSSxFQUFFLGVBQU0sQ0FBQyxTQUFTO3dCQUN0QixLQUFLLEVBQUUsMkVBQTJFLGlCQUFpQiw0QkFBNEI7cUJBQ2xJLENBQUMsQ0FBQztpQkFDTjtnQkFFRCxJQUFJLENBQUMseUJBQXlCO29CQUFFLE9BQU87Z0JBRXZDLE1BQU0sZUFBZSxHQUFHLHlCQUF5QixDQUFDLE9BQU8sQ0FDckQsY0FBYyxFQUNkLEVBQUUsQ0FDTCxDQUFDO2dCQUVGLE1BQU0sZUFBZSxHQUFHLEdBQUcsZUFBZSxlQUFlLENBQUM7Z0JBQzFELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUNuQyxJQUFJLENBQUMsS0FBSyxFQUFFO3dCQUNSLElBQUksRUFBRSxlQUFNLENBQUMsU0FBUzt3QkFDdEIsS0FBSyxFQUFFLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDBDQUEwQyxlQUFlLGlGQUFpRjtxQkFDbEwsQ0FBQyxDQUFDO29CQUNILE9BQU87aUJBQ1Y7Z0JBRUQsTUFBTSxrQkFBa0IsR0FBRyxJQUFBLHNCQUFjLEVBQUMsZUFBZSxDQUFDLENBQUM7Z0JBQzNELE1BQU0sVUFBVSxHQUFHLElBQUEsc0JBQWMsRUFDN0IseUJBQXlCLENBQzVCLENBQUM7Z0JBRUYsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQzlDLElBQUksVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDM0IsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPLEdBQUc7NEJBQ2hDLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJOzRCQUM3QixXQUFXLEVBQUUsa0JBQWtCLENBQUMsV0FBVzs0QkFDM0MsT0FBTyxFQUFFLGtCQUFrQixDQUFDLE9BQU87NEJBQ25DLE9BQU8sRUFBRSxrQkFBa0IsQ0FBQyxPQUFPO3lCQUN0QyxDQUFDO3FCQUNMO2dCQUNMLENBQUMsQ0FBQyxDQUFDO2dCQUNILE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQUMsT0FBTyxDQUNoRCxDQUFDLFNBQVMsRUFBRSxFQUFFO29CQUNWLElBQUksVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUU7d0JBQ3JDLFVBQVUsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLE9BQU8sR0FBRzs0QkFDMUMsSUFBSSxFQUFFLGtCQUFrQixDQUFDLElBQUk7NEJBQzdCLFdBQVcsRUFBRSxrQkFBa0IsQ0FBQyxXQUFXOzRCQUMzQyxPQUFPLEVBQUUsa0JBQWtCLENBQUMsT0FBTzs0QkFDbkMsT0FBTyxFQUFFLGtCQUFrQixDQUFDLE9BQU87eUJBQ3RDLENBQUM7cUJBQ0w7Z0JBQ0wsQ0FBQyxDQUNKLENBQUM7Z0JBRUYsVUFBVSxDQUFDLE9BQU8sR0FBRztvQkFDakIsR0FBRyxDQUFDLE1BQUEsVUFBVSxDQUFDLE9BQU8sbUNBQUksRUFBRSxDQUFDO29CQUM3QixHQUFHLENBQUMsTUFBQSxNQUFBLFVBQVUsQ0FBQyxTQUFTLDBDQUFFLE9BQU8sbUNBQUksRUFBRSxDQUFDO2lCQUMzQyxDQUFDO2dCQUNGLFVBQVUsQ0FBQyxHQUFHLG1DQUNQLENBQUMsTUFBQSxVQUFVLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUMsR0FDdEIsQ0FBQyxNQUFBLE1BQUEsVUFBVSxDQUFDLFNBQVMsMENBQUUsR0FBRyxtQ0FBSSxFQUFFLENBQUMsQ0FDdkMsQ0FBQztnQkFFRixPQUFPLFVBQVUsQ0FBQyxTQUFTLENBQUM7Z0JBRTVCLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDaEQsTUFBTSxrQkFBa0IsR0FBRyxVQUFVLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxNQUFNLFFBQVEsQ0FBQyxrQkFBa0IsRUFBRSxlQUFlLENBQUMsQ0FBQztpQkFDdkQ7Z0JBRUQsS0FDSSxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQ1QsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sRUFDdEMsQ0FBQyxFQUFFLEVBQ0w7b0JBQ0UsTUFBTSxTQUFTLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ2pELE1BQU0sR0FBRyxHQUFHLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUM7b0JBRXRDLEdBQUcsQ0FBQyxJQUFJLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FBQyxlQUFlLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO29CQUV4RCxzQkFBc0I7b0JBQ3RCLElBQUksR0FBRyxHQUFHLEdBQUcsQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxDQUFDO29CQUN2QyxHQUFHLENBQUMsSUFBSTt3QkFDSixNQUFBLElBQUEseUNBQWlDLEVBQUMsR0FBRyxDQUFDLElBQUksRUFBRTs0QkFDeEMsT0FBTyxHQUFHLEVBQUU7NEJBQ1osR0FBRzt5QkFDTixDQUFDLG1DQUFJLEdBQUcsQ0FBQyxJQUFJLENBQUM7b0JBRW5CLFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxDQUFDO2lCQUNuQztnQkFFRCxLQUFLLElBQUksQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDN0MsVUFBVSxDQUFDLEdBQUcsQ0FDakIsRUFBRTtvQkFDQyxJQUFJLE9BQU8sR0FBRyxTQUFTLENBQUM7b0JBQ3hCLElBQUksQ0FBQyxlQUFlLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUMvQixnQ0FBZ0M7d0JBQ2hDLGdFQUFnRTt3QkFDaEUsU0FBUyxDQUFDLEVBQUUsR0FBRyxPQUFPLENBQUM7d0JBQ3ZCLDZDQUE2Qzt3QkFDN0MsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsR0FBRyxTQUFTLENBQUM7cUJBQzVDO2lCQUNKO1lBQ0wsQ0FBQyxDQUFBLENBQUM7WUFFRixNQUFNLG9CQUFvQixHQUFHLElBQUEsb0JBQVksRUFBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7WUFDN0QsTUFBTSxRQUFRLENBQUMsb0JBQW9CLEVBQUUsb0JBQW9CLENBQUMsQ0FBQztZQUUzRCw4QkFBOEI7WUFDOUIsSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsRUFBRTtnQkFDMUMsTUFBTSxrQkFBa0IsR0FBRyxZQUFJLENBQUMsV0FBVyxDQUN2QyxXQUFXLENBQUMsV0FBVyxDQUMxQixDQUFDO2dCQUNGLGVBQWUsQ0FBQyxTQUFTLEdBQUcsa0JBQWtCLENBQUM7YUFDbEQ7aUJBQU07Z0JBQ0gsZUFBZSxDQUFDLFNBQVMsR0FBRyxFQUFFLENBQUM7YUFDbEM7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7WUFFbkMsbUJBQW1CO1lBQ25CLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUUxRCxxQkFBcUI7WUFDckIsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDO2dCQUM3QyxlQUFlLENBQUM7WUFFcEIsVUFBVTtZQUNWLFdBQVcsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sTUFBTSxHQUFHLElBQUEsYUFBSyxFQUFDLGVBQWUsRUFBRSxPQUFPLENBQUMsQ0FBQztnQkFDL0MsSUFBSSxDQUFDLE1BQU07b0JBQUUsT0FBTztnQkFDcEIsSUFBQSxhQUFLLEVBQ0QsZUFBZSxFQUNmLE9BQU8sRUFDUCxJQUFBLGNBQVksRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzFCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFDSCxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNyQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGFBQUssRUFBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBQ3BCLElBQUEsYUFBSyxFQUNELGVBQWUsRUFDZixPQUFPLEVBQ1AsSUFBQSxrQkFBZ0IsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQzlCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFFSCwwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQSxFQUNEO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxNQUFNO2FBQ2I7U0FDSixFQUNEO1lBQ0ksWUFBWSxFQUFFO2dCQUNWLElBQUksRUFBRSxJQUFJO2FBQ2I7U0FDSixDQUNKLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLENBQ1IsYUFBbUMsSUFBSSxDQUFDLFdBQVc7UUFFbkQsTUFBTSx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFbkMsMEJBQTBCO1FBQzFCLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM5QyxhQUFhO1lBQ2IsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUM1QixJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEQsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDeEQ7WUFDRCx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFvQjtZQUM3QixRQUFRLEVBQUUsRUFBRTtZQUNaLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFBLGtCQUFpQixHQUFFLENBQUM7UUFFeEMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3pELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FDaEQsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQ3ZDLENBQUM7WUFFRixJQUFJLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxTQUFTLG1DQUNGLFNBQVMsR0FDVCxPQUFPLENBQ2IsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ3ZDLGNBQWMsQ0FBQyxZQUFZLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxtQ0FDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FDckIsSUFBSSxFQUFFLFlBQVksV0FBVyxHQUFHLElBQUksRUFBRSxHQUN6QyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2dCQUNILGFBQWE7Z0JBQ2IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRztvQkFDOUIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxJQUFBLGlCQUFTLEVBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7d0JBQzlDLElBQUksSUFBSSxLQUFLLE1BQU07NEJBQ2YsT0FBTyxZQUFZLFdBQVcsR0FBRyxLQUFLLEVBQUUsQ0FBQzt3QkFDN0MsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUMsQ0FBQztvQkFDRixJQUFJLEVBQUUsY0FBYztpQkFDdkIsQ0FBQzthQUNMO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pFLGFBQWE7WUFDYixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFBLG9CQUFZLEVBQzFDLFNBQVMsQ0FBQyxJQUFJO1lBQ2QsYUFBYTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUNyQyxDQUFDO1lBQ0YsYUFBYTtZQUNiLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUEsb0JBQVksRUFDMUMsU0FBUyxDQUFDLElBQUk7WUFDZCxhQUFhO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQ3JDLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDcEQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkQsYUFBYTtnQkFDYixNQUFNLG1CQUFtQixHQUFHLElBQUEsb0JBQVksRUFDcEMsVUFBVSxDQUFDLElBQUk7Z0JBQ2YsYUFBYTtnQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDckMsQ0FBQztnQkFDRixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFBLG1CQUFXLEVBQ3pDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUMvQixtQkFBbUIsQ0FDdEIsQ0FBQztnQkFDRixhQUFhO2dCQUNiLE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxvQkFBWSxFQUNwQyxVQUFVLENBQUMsSUFBSTtnQkFDZixhQUFhO2dCQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUNyQyxDQUFDO2dCQUNGLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUEsbUJBQVcsRUFDekMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQy9CLG1CQUFtQixDQUN0QixDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDYixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQStCLENBQUMsYUFBYTtRQUN6QyxNQUFNLE9BQU8sR0FBRyxFQUFFLEVBQ2QsYUFBYSxHQUFHLEVBQUUsRUFDbEIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTFCLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUU1QixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7aUJBQzlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNQLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFZixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUM7WUFFekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDZixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUMvQixDQUFDO2lCQUNMO2dCQUVELElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDcEMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDL0IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO3dCQUNwQixFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLG9CQUFvQjtxQkFDdkIsQ0FBQztvQkFDRixhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDakMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO3dCQUNwQixFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLE1BQU0sRUFBRSxTQUFTO3FCQUNwQixDQUFDO2lCQUNMO2dCQUVELFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU87WUFDSCxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxhQUFhO1NBQ3RCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLE1BQW9DO1FBQ3RDLE1BQU0sV0FBVyxHQUF3QixDQUNyQyxJQUFBLG1CQUFXLEVBQUMscUNBQTZCLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ2hFLENBQUM7UUFDRixPQUFPLElBQUksbUJBQVUsQ0FDakIsQ0FBTyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsSUFBSSxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7O1lBQ3RDLElBQUksQ0FBQyxjQUFjLEVBQUU7Z0JBQ2pCLGFBQWE7Z0JBQ2IsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQjthQUM1QyxDQUFDLENBQUM7WUFFSCxJQUFJLFVBQVUsR0FBRztnQkFDYixHQUFHLEVBQUUsRUFBRTtnQkFDUCxPQUFPLEVBQUUsRUFBRTtnQkFDWCxTQUFTLEVBQUU7b0JBQ1AsT0FBTyxFQUFFLEVBQUU7b0JBQ1gsR0FBRyxFQUFFLEVBQUU7aUJBQ1Y7YUFDSixDQUFDO1lBRUYsTUFBTSxXQUFXLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxDQUFDO1lBQ3ZDLE1BQU0sZUFBZSxHQUFHLElBQUEscUJBQWEsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ2pELE9BQU8sRUFBRSxJQUFJO2FBQ2hCLENBQUMsQ0FBQztZQUVILGlDQUFpQztZQUNqQyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGNBQWMsQ0FBQyxFQUFFO2dCQUMvQyxNQUFNLGlCQUFpQixHQUFHLElBQUEsc0JBQWMsRUFDcEMsR0FBRyxXQUFXLGNBQWMsQ0FDL0IsQ0FBQztnQkFDRixVQUFVLEdBQUcsaUJBQWlCLENBQUM7Z0JBQy9CLFVBQVUsQ0FBQyxTQUFTLEdBQUc7b0JBQ25CLE9BQU8sRUFBRSxFQUFFO29CQUNYLEdBQUcsRUFBRSxFQUFFO2lCQUNWLENBQUM7YUFDTDtZQUVELHdCQUF3QjtZQUN4QixNQUFNLFdBQVcsR0FBRyxJQUFBLGtCQUFpQixHQUFFLENBQUM7WUFFeEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxTQUFTLEVBQUU7Z0JBQ3hCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLHlGQUF5RjtpQkFDbkcsQ0FBQyxDQUFDO2dCQUVILE1BQU0sS0FBSyxHQUFhO29CQUNwQixHQUFHLFdBQVcsa0NBQWtDO2lCQUNuRCxDQUFDO2dCQUNGLElBQUksV0FBVyxLQUFLLGVBQWUsRUFBRTtvQkFDakMsS0FBSyxDQUFDLElBQUksQ0FDTixHQUFHLGVBQWUsa0NBQWtDLENBQ3ZELENBQUM7aUJBQ0w7Z0JBRUQsTUFBTSxrQkFBa0IsR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLEVBQUU7b0JBQzlDLGVBQWUsRUFBRSxLQUFLO29CQUN0QixPQUFPLEVBQUUsTUFBQSxXQUFXLENBQUMsT0FBTyxtQ0FBSSxFQUFFO2lCQUNyQyxDQUFDLENBQUM7Z0JBRUgsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsd0NBQXdDLGtCQUFrQixDQUFDLE1BQU0sNkNBQTZDO2lCQUN4SCxDQUFDLENBQUM7Z0JBRUgsTUFBTSxZQUFZLEdBQWEsRUFBRSxDQUFDO2dCQUNsQyxrQkFBa0IsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtvQkFDaEMsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFJLENBQUMsT0FBTyxlQUFlLENBQUMsRUFBRTt3QkFDbEQsT0FBTztxQkFDVjtvQkFFRCxNQUFNLGtCQUFrQixHQUFHLElBQUEsc0JBQWMsRUFDckMsR0FBRyxJQUFJLENBQUMsT0FBTyxlQUFlLENBQ2pDLENBQUM7b0JBQ0YsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLEtBQUssV0FBVyxDQUFDLElBQUk7d0JBQzVDLE9BQU87b0JBQ1gsWUFBWSxDQUFDLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDL0MsQ0FBQyxDQUFDLENBQUM7Z0JBRUgsYUFBYTtnQkFDYixVQUFVLENBQUMsU0FBUyxDQUFDLE9BQU8sR0FBRyxZQUFZLENBQUMsTUFBTSxDQUM5QyxDQUFDLElBQUksRUFBRSxFQUFFLENBQUMsSUFBSSxLQUFLLFdBQVcsQ0FBQyxJQUFJLENBQ3RDLENBQUM7YUFDTDtZQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHlGQUF5RjthQUNuRyxDQUFDLENBQUM7WUFFSCw0REFBNEQ7WUFDNUQsTUFBTSxjQUFjLEdBQUcsZ0JBQU8sQ0FBQyxPQUFPLENBQ2xDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUNGO2dCQUNJLEdBQUcsRUFBRSxXQUFXO2dCQUNoQixPQUFPLEVBQUUsTUFBQSxXQUFXLENBQUMsT0FBTyxtQ0FBSSxFQUFFO2FBQ3JDLENBQ0osQ0FBQztZQUVGLElBQUksQ0FBQyxLQUFLLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLHdDQUF3QyxjQUFjLENBQUMsTUFBTSxxQ0FBcUM7YUFDNUcsQ0FBQyxDQUFDO1lBRUgsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFDL0IsTUFBTSxPQUFPLEdBQWEsSUFBSyxDQUFDLEdBQUcsQ0FBQztnQkFFcEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsZ0RBQWdELGNBQU0sQ0FBQyxRQUFRLENBQ2xFLElBQUEsd0JBQWdCLEdBQUU7b0JBQ2xCLGFBQWE7b0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FDWixVQUFVO2lCQUNkLENBQUMsQ0FBQztnQkFFSCxNQUFNLGlCQUFpQixHQUFHLElBQUksb0JBQVcsQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFO29CQUNqRCxjQUFjLEVBQUUsS0FBSztvQkFDckIsUUFBUSxFQUFZLElBQUssQ0FBQyxJQUFJO2lCQUNqQyxDQUFDLENBQUM7Z0JBRUgsTUFBTSxJQUFJLENBQUMsaUJBQWlCLENBQUMsS0FBSyxFQUFFLENBQUMsQ0FBQztnQkFFdEMsTUFBTSxTQUFTLEdBQUcsaUJBQWlCLENBQUMsUUFBUSxFQUFFLENBQUM7Z0JBRS9DLElBQUksQ0FBQyxTQUFTLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTTtvQkFBRSxTQUFTO2dCQUU5QyxJQUFJLFdBQVcsR0FBUSxFQUFFLENBQUM7Z0JBQzFCLE1BQU0sUUFBUSxHQUFRLEVBQUUsQ0FBQztnQkFDekIsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3ZDLE1BQU0sUUFBUSxHQUFHLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFOUIsSUFBSSxZQUFZLEdBQUcsSUFBSSxDQUFDO29CQUV4QixLQUNJLElBQUksQ0FBQyxHQUFHLENBQUM7b0JBQ1QsYUFBYTtvQkFDYixDQUFDLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUMzQyxDQUFDLEVBQUUsRUFDTDt3QkFDRSxNQUFNLEdBQUcsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEQsTUFBTSxTQUFTO3dCQUNYLGFBQWE7d0JBQ2IsV0FBVyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQzt3QkFDN0IsYUFBYTt3QkFDYixJQUFJLEtBQUssR0FBRyxRQUFRLENBQUMsR0FBRyxDQUFDLENBQUM7d0JBRTFCLHNDQUFzQzt3QkFDdEMsSUFBSSxLQUFLLEtBQUssU0FBUzs0QkFBRSxTQUFTO3dCQUVsQywyQ0FBMkM7d0JBQzNDLGtEQUFrRDt3QkFDbEQsSUFDSSxDQUFBLEtBQUssYUFBTCxLQUFLLHVCQUFMLEtBQUssQ0FBRSxRQUFRLENBQ1YsUUFBUSxHQUNSLE9BQU8sQ0FBQyxlQUFlLENBQUMsTUFBSyxDQUFDLENBQUMsRUFDdEM7NEJBQ0UsS0FBSyxHQUFHLEtBQUssQ0FBQyxRQUFRLEVBQUUsQ0FBQzt5QkFDNUI7d0JBRUQsNkNBQTZDO3dCQUM3QyxzQ0FBc0M7d0JBQ3RDLElBQ0ksT0FBTyxLQUFLLEtBQUssUUFBUTs0QkFDekIsQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxFQUN6Qjs0QkFDRSxZQUFZLEdBQUcsS0FBSyxDQUFDOzRCQUNyQixNQUFNO3lCQUNUO3FCQUNKO29CQUVELElBQUksQ0FBQyxZQUFZLEVBQUU7d0JBQ2YsU0FBUztxQkFDWjtvQkFFRCxJQUFJLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLEdBQUc7d0JBQ2xELFNBQVM7b0JBQ2IsSUFBSSxRQUFRLENBQUMsT0FBTzt3QkFBRSxTQUFTO29CQUUvQixxREFBcUQ7b0JBQ3JELE1BQU0sUUFBUSxHQUFHLElBQUEsa0JBQWEsRUFBVyxJQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBRXJELE1BQU0sZ0JBQWdCLEdBQWtCLEVBQUUsQ0FBQztvQkFFM0MsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUMsRUFBRSxFQUFFO3dCQUM5QyxNQUFNLEdBQUcsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUNoQyxJQUFJLFFBQVEsQ0FBQyxHQUFHLENBQUMsS0FBSyxTQUFTOzRCQUFFLFNBQVM7d0JBQzFDLGNBQWM7d0JBQ2QsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsRUFBRTs0QkFDOUIsZ0JBQWdCLENBQUMsR0FBRyxDQUFDO2dDQUNqQixNQUFNLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUM5QixRQUFRLENBQUMsR0FBRyxDQUFDLENBQ2hCLENBQUM7eUJBQ1Q7NkJBQU07NEJBQ0gsZ0JBQWdCLENBQUMsR0FBRyxDQUFDLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3lCQUN6QztxQkFDSjtvQkFFRCxNQUFNLE9BQU8sR0FBRyxJQUFBLDRCQUFvQixFQUNoQyxHQUFHLFFBQVEsQ0FBQyxTQUFTLElBQUksUUFBUSxDQUFDLElBQUksRUFBRSxDQUMzQyxDQUFDO29CQUVGLElBQUksUUFBUSxDQUFDLFNBQVMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQy9DLFdBQVcsbUNBQ0osZ0JBQWdCLEtBQ25CLFFBQVEsRUFDUixTQUFTLEVBQUUsUUFBUSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQzFDLE9BQU8sRUFBRSxjQUFNLENBQUMsUUFBUSxDQUNwQixJQUFBLHdCQUFnQixHQUFFLEVBQ1IsSUFBSyxDQUFDLElBQUksQ0FDdkIsR0FDSixDQUFDO3dCQUNGLElBQUksQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsV0FBVyxDQUFDO3FCQUN4Qzt5QkFBTSxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUU7d0JBQ3RCLFFBQVEsQ0FBQyxhQUFhLENBQUMsUUFBUSxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNsQyxnQkFBZ0IsQ0FBQztxQkFDeEI7aUJBQ0o7Z0JBQ0QsV0FBVyxDQUFDLFFBQVEsR0FBRyxRQUFRLENBQUM7YUFDbkM7WUFFRCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxtQ0FDSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUMvQiwyQ0FBMkM7YUFDOUMsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLGNBQWMsRUFBRTtnQkFDakIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsT0FBTyxFQUFFLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxFQUFFLGdCQUFnQjthQUM1QyxDQUFDLENBQUM7WUFFSCw0Q0FBNEM7WUFDNUMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQztZQUV6QyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQ2xCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDZFQUE2RSxXQUFXLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FDM0csSUFBQSx3QkFBZ0IsR0FBRSxHQUFHLEdBQUcsRUFDeEIsRUFBRSxDQUNMLFVBQVU7aUJBQ2QsQ0FBQyxDQUFDO2dCQUNILFlBQUksQ0FBQyxhQUFhLENBQ2QsV0FBVyxDQUFDLE9BQU8sRUFDbkIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxVQUFVLEVBQUUsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUN0QyxDQUFDO2FBQ0w7WUFFRCxPQUFPLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDeEIsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLE9BQU87YUFDZDtTQUNKLEVBQ0Q7WUFDSSxZQUFZLEVBQUU7Z0JBQ1YsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTthQUM1QjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsZUFBZSxDQUNYLE1BQStDO1FBRS9DLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxNQUFNLFdBQVcsR0FBbUMsQ0FDaEQsSUFBQSxtQkFBVyxFQUNQLCtDQUF1QyxDQUFDLFFBQVEsRUFBRSxFQUNsRCxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FDSixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7WUFFbkMsTUFBTSxPQUFPLEdBQUcsZ0JBQU8sQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDOUMsZUFBZSxFQUFFLEtBQUs7YUFDekIsQ0FBQyxDQUFDO1lBRUgsSUFBSSxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUU7Z0JBQ2pCLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDhGQUE4RixNQUFNLENBQUMsSUFBSSxxR0FBcUc7aUJBQ3hOLENBQUMsQ0FBQztnQkFDSCxPQUFPLE9BQU8sRUFBRSxDQUFDO2FBQ3BCO1lBRUQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ3JDLE1BQU0sVUFBVSxHQUFXLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFdEMsSUFBSSxDQUFDLEtBQUssRUFBRTtvQkFDUixLQUFLLEVBQUUsMERBQTBELGNBQU0sQ0FBQyxRQUFRLENBQzVFLElBQUEsd0JBQWdCLEdBQUUsRUFDbEIsVUFBVSxDQUNiLFdBQVc7aUJBQ2YsQ0FBQyxDQUFDO2dCQUVILE1BQU0sV0FBVyxHQUFHLElBQUEsa0JBQWlCLEdBQUUsQ0FBQztnQkFDeEMsTUFBTSxtQkFBbUIsR0FBRyxJQUFBLHFCQUFhLEVBQUMsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUFFO29CQUNyRCxPQUFPLEVBQUUsSUFBSTtpQkFDaEIsQ0FBQyxDQUFDO2dCQUVILDhCQUE4QjtnQkFDOUIsTUFBTSxtQkFBbUIsR0FBRyxFQUFFLEVBQzFCLHNCQUFzQixHQUFHLEVBQUUsQ0FBQztnQkFDaEMsSUFBSSxtQkFBbUIsS0FBSyxJQUFBLHFCQUFhLEdBQUUsRUFBRTtvQkFDekMsTUFBTSxnQkFBZ0IsR0FBRyxnQkFBTyxDQUFDLE9BQU8sQ0FDcEMsR0FBRyxtQkFBbUIsa0JBQWtCLENBQzNDLENBQUM7b0JBRUYsZ0JBQWdCLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O3dCQUM5QixJQUFJLElBQUksQ0FBQyxPQUFPLEtBQUssbUJBQW1COzRCQUFFLE9BQU87d0JBQ2pELElBQ0ksQ0FBQyxDQUFBLE1BQUEsV0FBVyxDQUFDLFlBQVksMENBQ3JCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixDQUFBOzRCQUNELENBQUMsQ0FBQSxNQUFBLFdBQVcsQ0FBQyxlQUFlLDBDQUN4QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDcEIsQ0FBQTs0QkFFRCxPQUFPO3dCQUVYLElBQUksTUFBQSxXQUFXLENBQUMsWUFBWSwwQ0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUFFOzRCQUMvQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDbEMsV0FBVyxDQUFDLFlBQVksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDOzRCQUNoRCxPQUFPLFdBQVcsQ0FBQyxZQUFZLENBQzNCLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUNwQixDQUFDO3lCQUNMO3dCQUNELElBQ0ksTUFBQSxXQUFXLENBQUMsZUFBZSwwQ0FBRyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxFQUNsRDs0QkFDRSxzQkFBc0IsQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQztnQ0FDckMsV0FBVyxDQUFDLGVBQWUsQ0FDdkIsSUFBSSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQ3BCLENBQUM7NEJBQ04sT0FBTyxXQUFXLENBQUMsZUFBZSxDQUM5QixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksQ0FDcEIsQ0FBQzt5QkFDTDt3QkFFRCxNQUFNLGlCQUFpQixHQUFHLElBQUEsb0JBQVksRUFBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xELE1BQU0scUJBQXFCLEdBQUcsR0FBRyxVQUFVLGlCQUFpQixJQUFJLENBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDO3dCQUNoRixJQUFBLHVCQUFlLEVBQ1gscUJBQXFCOzZCQUNoQixLQUFLLENBQUMsR0FBRyxDQUFDOzZCQUNWLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7NkJBQ1osSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUNqQixDQUFDO3dCQUNGLElBQUk7NEJBQ0EsWUFBSSxDQUFDLFVBQVUsQ0FBQyxxQkFBcUIsQ0FBQyxDQUFDO3lCQUMxQzt3QkFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO3dCQUNkLFlBQUksQ0FBQyxXQUFXLENBQ1osaUJBQWlCLEVBQ2pCLHFCQUFxQixDQUN4QixDQUFDO29CQUNOLENBQUMsQ0FBQyxDQUFDO2lCQUNOO2dCQUNELElBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU07b0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLEVBQzVDO29CQUNFLElBQUEsdUJBQWUsRUFDWCxHQUFHLFVBQVUsZUFBZSxFQUM1QixXQUFXLENBQ2QsQ0FBQztpQkFDTDtnQkFFRCwwQkFBMEI7Z0JBQzFCLE1BQU0sSUFBSSxDQUNOLElBQUEsaUJBQVksRUFBQyxFQUFFLEVBQUU7b0JBQ2IsR0FBRyxFQUFFLFVBQVU7b0JBQ2YsSUFBSSxFQUFFO3dCQUNGLE1BQU0sRUFBRSxLQUFLO3FCQUNoQjtpQkFDSixDQUFDLENBQ0wsQ0FBQztnQkFFRix5QkFBeUI7Z0JBQ3pCLElBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDLE1BQU07b0JBQ3ZDLE1BQU0sQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQyxNQUFNLEVBQzVDO29CQUNFLFdBQVcsQ0FBQyxZQUFZLG1DQUNqQixXQUFXLENBQUMsWUFBWSxHQUN4QixtQkFBbUIsQ0FDekIsQ0FBQztvQkFDRixXQUFXLENBQUMsZUFBZSxtQ0FDcEIsV0FBVyxDQUFDLGVBQWUsR0FDM0Isc0JBQXNCLENBQzVCLENBQUM7b0JBQ0YsSUFBQSx1QkFBZSxFQUNYLEdBQUcsVUFBVSxlQUFlLEVBQzVCLFdBQVcsQ0FDZCxDQUFDO2lCQUNMO2dCQUVELElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ1IsS0FBSyxFQUFFLDhDQUE4QyxjQUFNLENBQUMsUUFBUSxDQUNoRSxJQUFBLHdCQUFnQixHQUFFLEVBQ2xCLFVBQVUsQ0FDYixrREFBa0Q7aUJBQ3RELENBQUMsQ0FBQzthQUNOO1lBRUQsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUseUZBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2FBQ2QsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFBLEVBQ0Q7WUFDSSxLQUFLLEVBQUU7Z0JBQ0gsRUFBRSxFQUFFLGtCQUFrQjthQUN6QjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsUUFBUSxDQUFDLE1BQXVDO1FBQzVDLE9BQU8sSUFBSSxtQkFBVSxDQUNqQixDQUFPLEVBQUUsT0FBTyxFQUFFLE1BQU0sRUFBRSxJQUFJLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUN0QyxNQUFNLFdBQVcsR0FBMkIsQ0FDeEMsSUFBQSxtQkFBVyxFQUNQLHdDQUFnQyxDQUFDLFFBQVEsRUFBRSxFQUMzQyxNQUFNLENBQ1QsQ0FDSixDQUFDO1lBRUYsTUFBTSxRQUFRLEdBQUcsSUFBSSxvQkFBVyxFQUFFLENBQUM7WUFFbkMsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUseUdBQXlHO2FBQ25ILENBQUMsQ0FBQztZQUVILElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxlQUFlLENBQUMsRUFBRTtnQkFDeEQsTUFBTSxJQUFJLEtBQUssQ0FDWCxTQUFTLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSw2RkFBNkYsQ0FDOUgsQ0FBQzthQUNMO1lBQ0QsSUFBSSxDQUFDLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxJQUFBLHdCQUFnQixHQUFFLGNBQWMsQ0FBQyxFQUFFO2dCQUN2RCxNQUFNLElBQUksS0FBSyxDQUNYLFNBQVMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLDRGQUE0RixDQUM3SCxDQUFDO2FBQ0w7WUFFRCxNQUFNLFdBQVcsR0FBRyxJQUFBLGtCQUFpQixHQUFFLENBQUM7WUFDeEMsTUFBTSxVQUFVLEdBQUcsSUFBQSxzQkFBYyxFQUM3QixHQUFHLElBQUEsd0JBQWdCLEdBQUUsY0FBYyxDQUN0QyxDQUFDO1lBRUYsbUJBQW1CO1lBQ25CLE1BQU0sTUFBTSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQ3pCLFdBQVcsQ0FBQyxNQUFNLEVBQ2xCLFdBQVcsQ0FBQyxPQUFPLENBQ3RCLENBQUM7WUFDRixJQUFBLG9CQUFZLEVBQUMsTUFBTSxDQUFDLENBQUM7WUFDckIsSUFBQSx1QkFBZSxFQUFDLE1BQU0sQ0FBQyxDQUFDO1lBRXhCLHlCQUF5QjtZQUN6QixJQUFBLGtCQUFVLEVBQ04sR0FBRyxJQUFBLHdCQUFnQixHQUFFLGVBQWUsRUFDcEMsR0FBRyxNQUFNLGVBQWUsQ0FDM0IsQ0FBQztZQUNGLElBQUEsa0JBQVUsRUFDTixHQUFHLElBQUEsd0JBQWdCLEdBQUUsY0FBYyxFQUNuQyxHQUFHLE1BQU0sY0FBYyxDQUMxQixDQUFDO1lBQ0YsSUFBSTtnQkFDQSxJQUFBLGtCQUFVLEVBQ04sR0FBRyxJQUFBLHdCQUFnQixHQUFFLG9CQUFvQixFQUN6QyxHQUFHLE1BQU0sb0JBQW9CLENBQ2hDLENBQUM7Z0JBQ0YsSUFBQSxrQkFBVSxFQUNOLEdBQUcsSUFBQSx3QkFBZ0IsR0FBRSxZQUFZLEVBQ2pDLEdBQUcsTUFBTSxZQUFZLENBQ3hCLENBQUM7YUFDTDtZQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7WUFFZCxNQUFNLE9BQU8sbUNBQ04sVUFBVSxDQUFDLEdBQUcsR0FDZCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FDOUIsQ0FBQztZQUVGLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3ZDLE1BQU0sU0FBUyxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDckMsTUFBTSxJQUFJLEdBQUcsY0FBTSxDQUFDLE9BQU8sQ0FDdkIsSUFBQSx3QkFBZ0IsR0FBRSxFQUNsQixTQUFTLENBQUMsT0FBTyxDQUNwQixDQUFDO2dCQUNGLElBQUksT0FBTyxHQUFHLFlBQUksQ0FBQyxZQUFZLENBQUMsSUFBSSxFQUFFLE1BQU0sQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDO2dCQUN6RCxJQUFJLFNBQVMsQ0FBQyxJQUFJLEtBQUssVUFBVSxFQUFFO2lCQUNsQztxQkFBTTtvQkFDSCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFXLENBQUMsT0FBTyxFQUFFO3dCQUN0QyxjQUFjLEVBQUUsS0FBSztxQkFDeEIsQ0FBQyxDQUFDO29CQUNILE9BQU8sR0FBRyxRQUFRLENBQUMsUUFBUSxFQUFFLENBQUM7aUJBQ2pDO2dCQUNELElBQUEsdUJBQWUsRUFDWCxjQUFNLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxTQUFTLENBQUMsT0FBTyxDQUFDLEVBQ3pDLE9BQU8sQ0FDVixDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFFSCxJQUFJLENBQUMsS0FBSyxFQUFFO2dCQUNSLEtBQUssRUFBRSxxREFBcUQsY0FBTSxDQUFDLFFBQVEsQ0FDdkUsT0FBTyxDQUFDLEdBQUcsRUFBRSxFQUNiLE1BQU0sQ0FDVCxVQUFVO2FBQ2QsQ0FBQyxDQUFDO1lBQ0gsSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDUixLQUFLLEVBQUUsc0ZBQ0gsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDLGdCQUNuQixXQUFXO2FBQ2QsQ0FBQyxDQUFDO1lBRUgsT0FBTyxFQUFFLENBQUM7UUFDZCxDQUFDLENBQUEsRUFDRDtZQUNJLEtBQUssRUFBRTtnQkFDSCxFQUFFLEVBQUUsVUFBVTthQUNqQjtTQUNKLENBQ0osQ0FBQztJQUNOLENBQUM7O0FBeGtDTSx5QkFBaUIsR0FBRyxFQUFFLENBQUM7QUFFdkIsNEJBQW9CLEdBQUcsRUFBRSxDQUFDO0FBeWtDckMsa0JBQWUsT0FBTyxDQUFDIn0=