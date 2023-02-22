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
const s_glob_1 = __importDefault(require("@coffeekraken/s-glob"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const composer_1 = require("@coffeekraken/sugar/composer");
const fs_1 = require("@coffeekraken/sugar/fs");
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
const SDocmapReadParamsInterface_1 = __importDefault(require("./interface/SDocmapReadParamsInterface"));
const SDocmapSearchParamsInterface_1 = __importDefault(require("./interface/SDocmapSearchParamsInterface"));
const SDocmapSettingsInterface_1 = __importDefault(require("./interface/SDocmapSettingsInterface"));
function __toLowerCase(l = '') {
    return l.toLowerCase();
}
class SDocmap extends s_class_1.default {
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
            var _a, _b, _c, _d;
            const finalParams = ((0, object_1.__deepMerge)(SDocmapReadParamsInterface_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            const packageJson = (0, package_1.__packageJsonSync)();
            let docmapVersion = 'current';
            // @ts-ignore
            if (this.constructor._cachedDocmapJson[docmapVersion]) {
                return resolve(
                // @ts-ignore
                this.constructor._cachedDocmapJson[docmapVersion]);
            }
            let docmapRootPath = (0, fs_1.__folderPath)(finalParams.input);
            if (!fs_2.default.existsSync(finalParams.input)) {
                return resolve({
                    map: {},
                    menu: {},
                });
            }
            const packageMonoRoot = (0, path_1.__packageRootDir)(process.cwd(), {
                highest: true,
            });
            const finalDocmapJson = {
                map: {},
                menu: {},
            };
            const loadJson = (packageNameOrPath, type = 'npm') => __awaiter(this, void 0, void 0, function* () {
                var _e, _f, _g, _h, _j, _k;
                let currentPathDocmapJsonPath, potentialPackageDocmapJsonPath = path_2.default.resolve(docmapRootPath, type === 'npm' ? 'node_modules' : 'vendor', packageNameOrPath, 'docmap.json'), potentialRootPackageDocmapJsonPath = path_2.default.resolve(packageMonoRoot, type === 'npm' ? 'node_modules' : 'vendor', packageNameOrPath, 'docmap.json');
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
                    return;
                }
                const packageRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');
                // read the docmap file
                const docmapJson = (0, fs_1.__readJsonSync)(currentPathDocmapJsonPath);
                // get package metas
                const packageMetas = (0, package_1.__packageMetas)(packageRootPath);
                Object.keys(docmapJson.map).forEach((namespace) => {
                    if (docmapJson.map[namespace]) {
                        docmapJson.map[namespace].package = packageMetas;
                    }
                });
                Object.keys((_f = (_e = docmapJson.generated) === null || _e === void 0 ? void 0 : _e.map) !== null && _f !== void 0 ? _f : []).forEach((namespace) => {
                    if (docmapJson.generated.map[namespace]) {
                        docmapJson.generated.map[namespace].package =
                            packageMetas;
                    }
                });
                // add the readed docmap to the existing one
                docmapJson.map = Object.assign(Object.assign({}, ((_g = docmapJson.map) !== null && _g !== void 0 ? _g : {})), ((_j = (_h = docmapJson.generated) === null || _h === void 0 ? void 0 : _h.map) !== null && _j !== void 0 ? _j : {}));
                // clean
                delete docmapJson.generated;
                // resolve the actual docmap "path"
                for (let i = 0; i < Object.keys(docmapJson.map).length; i++) {
                    const namespace = Object.keys(docmapJson.map)[i];
                    const obj = docmapJson.map[namespace];
                    obj.path = path_2.default.resolve(packageRootPath, obj.relPath);
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
            // load package docmap
            const docmapJsonFolderPath = (0, fs_1.__folderPath)(finalParams.input);
            yield loadJson(docmapJsonFolderPath);
            // load npm dependencies docmap
            const docmapPackageJson = (0, package_1.__packageJsonSync)(docmapJsonFolderPath);
            const packageJsonDeps = Object.assign(Object.assign({}, ((_a = docmapPackageJson.dependencies) !== null && _a !== void 0 ? _a : {})), ((_b = docmapPackageJson.devDependencies) !== null && _b !== void 0 ? _b : {}));
            for (let [depName, depVersion] of Object.entries(packageJsonDeps)) {
                yield loadJson(depName, 'npm');
            }
            // load composer dependencies
            const docmapComposerJson = (0, composer_1.__composerJsonSync)(docmapJsonFolderPath);
            const composerJsonDeps = Object.assign(Object.assign({}, ((_c = docmapComposerJson.require) !== null && _c !== void 0 ? _c : {})), ((_d = docmapComposerJson.requireDev) !== null && _d !== void 0 ? _d : {}));
            for (let [depName, depVersion] of Object.entries(composerJsonDeps)) {
                yield loadJson(depName, 'composer');
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
            var _a;
            let docmapJson = {
                map: {},
                generated: {
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
                    map: {},
                };
            }
            console.log(`<yellow>[build]</yellow> Building map by searching for files inside the current package`);
            // searching inside the current package for docblocks to use
            const filesInPackage = s_glob_1.default.resolve(finalParams.globs.map((glob) => {
                return `${glob}:\\*\\s@namespace`;
            }), {
                cwd: packageRoot,
                exclude: (_a = finalParams.exclude) !== null && _a !== void 0 ? _a : [],
            });
            console.log(`<yellow>[build]</yellow> Found <cyan>${filesInPackage.length}</cyan> file(s) to parse in package`);
            for (let i = 0; i < filesInPackage.length; i++) {
                const file = filesInPackage[i];
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
}
SDocmap._cachedDocmapJson = {};
SDocmap._registeredTagsProxy = {};
exports.default = SDocmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUVuRCxrRUFBMkM7QUFDM0Msa0ZBQTBEO0FBQzFELDJEQUFrRTtBQUNsRSwrQ0FLZ0M7QUFDaEMsdURBQTJFO0FBQzNFLHlEQUFnRjtBQUNoRixtREFBNEQ7QUFDNUQsOEZBQXdFO0FBQ3hFLGdGQUEwRDtBQUMxRCxrRkFBa0U7QUFDbEUsMEZBQTBFO0FBQzFFLDhHQUF3RjtBQUN4Rix3REFBa0M7QUFDbEMsNENBQXNCO0FBQ3RCLDREQUFzQztBQUN0QyxnREFBMEI7QUFDMUIsMEdBQW9GO0FBQ3BGLHdHQUFrRjtBQUNsRiw0R0FBc0Y7QUFDdEYsb0dBQThFO0FBRTlFLFNBQVMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3pCLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzNCLENBQUM7QUFpSEQsTUFBTSxPQUFRLFNBQVEsaUJBQVE7SUFJMUI7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQVcsRUFBRSxTQUE2QjtRQUM5RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQy9DLENBQUM7SUEwQkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFvQztRQUM1QyxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxTQUFTO2FBQ2hCO1NBQ0osRUFDRCxrQ0FBMEIsQ0FBQyxLQUFLLENBQUM7WUFDN0IsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUU7Z0JBQ1IsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQy9CLElBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENB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