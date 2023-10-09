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
const composer_1 = require("@coffeekraken/sugar/composer");
const fs_1 = require("@coffeekraken/sugar/fs");
const object_1 = require("@coffeekraken/sugar/object");
const package_1 = require("@coffeekraken/sugar/package");
const path_1 = require("@coffeekraken/sugar/path");
const string_1 = require("@coffeekraken/sugar/string");
const fs_2 = __importDefault(require("fs"));
const micromatch_1 = __importDefault(require("micromatch"));
const path_2 = __importDefault(require("path"));
const SDocmapBuildParamsInterface_js_1 = __importDefault(require("./interface/SDocmapBuildParamsInterface.js"));
const SDocmapReadParamsInterface_js_1 = __importDefault(require("./interface/SDocmapReadParamsInterface.js"));
const SDocmapSearchParamsInterface_js_1 = __importDefault(require("./interface/SDocmapSearchParamsInterface.js"));
const SDocmapSettingsInterface_js_1 = __importDefault(require("./interface/SDocmapSettingsInterface.js"));
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
        }, SDocmapSettingsInterface_js_1.default.apply({
            tagsProxy: {},
            customMenu: {
                styleguide({ key, value, isObject }) {
                    if (key === 'styleguide')
                        return true;
                    if (key.split('/').length > 1 &&
                        key.match(/^([a-zA-Z0-9-_@\/]+)?\/styleguide\//)) {
                        return true;
                    }
                    return false;
                },
                specs({ key, value, isObject }) {
                    if (key === 'specs')
                        return true;
                    if (key.split('/').length > 1 &&
                        key.match(/^([a-zA-Z0-9-_@\/]+)?\/views\//)) {
                        return true;
                    }
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
        console.log('S', this.settings);
    }
    /**
     * @name          read
     * @type          Function
     * @async
     *
     * This method allows you to search for docmap.json files and read them to get
     * back the content of them in one call. It can take advantage of the cache if
     *
     * @todo      update documentation
     * @todo      integrate the "cache" feature
     *
     * @param       {ISDocmapReadParams}            [params=null]       An ISDocmapReadParams object to configure your read process
     * @return      {Promise<ISDocmapObj>}                          A promise instance that will be resolved once the docmap.json file(s) have been correctly read
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(params) {
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b, _c, _d;
            const finalParams = ((0, object_1.__deepMerge)(SDocmapReadParamsInterface_js_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            // const packageJson = __packageJsonSync();
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
            const loadJson = (packageNameOrPath, type = 'npm', isDependency = false) => __awaiter(this, void 0, void 0, function* () {
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
                const packageMetas = (0, package_1.__packageMetasSync)(packageRootPath);
                Object.keys(docmapJson.map).forEach((namespace) => {
                    if (docmapJson.map[namespace]) {
                        docmapJson.map[namespace].isDependency = isDependency;
                        docmapJson.map[namespace].package = packageMetas;
                    }
                });
                Object.keys((_f = (_e = docmapJson.generated) === null || _e === void 0 ? void 0 : _e.map) !== null && _f !== void 0 ? _f : []).forEach((namespace) => {
                    if (docmapJson.generated.map[namespace]) {
                        docmapJson.generated.map[namespace].isDependency =
                            isDependency;
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
            if (finalParams.dependencies) {
                const docmapPackageJson = (0, package_1.__packageJsonSync)(docmapJsonFolderPath);
                const packageJsonDeps = Object.assign(Object.assign({}, ((_a = docmapPackageJson.dependencies) !== null && _a !== void 0 ? _a : {})), ((_b = docmapPackageJson.devDependencies) !== null && _b !== void 0 ? _b : {}));
                for (let [depName, depVersion] of Object.entries(packageJsonDeps)) {
                    yield loadJson(depName, 'npm', true);
                }
            }
            // load composer dependencies
            const docmapComposerJson = (0, composer_1.__composerJsonSync)(docmapJsonFolderPath);
            if (finalParams.dependencies) {
                const composerJsonDeps = Object.assign(Object.assign({}, ((_c = docmapComposerJson === null || docmapComposerJson === void 0 ? void 0 : docmapComposerJson.require) !== null && _c !== void 0 ? _c : {})), ((_d = docmapComposerJson === null || docmapComposerJson === void 0 ? void 0 : docmapComposerJson.requireDev) !== null && _d !== void 0 ? _d : {}));
                for (let [depName, depVersion] of Object.entries(composerJsonDeps)) {
                    yield loadJson(depName, 'composer', true);
                }
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
                (0, object_1.__set)(finalDocmapJson, dotPath, (0, object_1.__sort)(toSort, (a, b) => {
                    return a.key.localeCompare(b.key);
                }));
            });
            finalParams.sortDeep.forEach((dotPath) => {
                const toSort = (0, object_1.__get)(finalDocmapJson, dotPath);
                if (!toSort)
                    return;
                (0, object_1.__set)(finalDocmapJson, dotPath, (0, object_1.__sortDeep)(toSort, (a, b) => {
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
            var _a, _b;
            const finalParams = ((0, object_1.__deepMerge)(SDocmapSearchParamsInterface_js_1.default.defaults(), params !== null && params !== void 0 ? params : {}));
            const docmapJson = yield this.read(finalParams);
            const result = {
                search: finalParams,
                items: {},
            };
            for (let [key, item] of Object.entries(docmapJson.map)) {
                let itemMatch = true;
                const props = ['type', 'id', 'slug', 'namespace'];
                for (let i = 0; i < props.length; i++) {
                    const prop = props[i];
                    if (finalParams[prop] === undefined) {
                        continue;
                    }
                    if (item[prop] === undefined) {
                        itemMatch = false;
                        break;
                    }
                    let valueToCheck = item[prop];
                    if (prop === 'type') {
                        valueToCheck = (_b = (_a = item.type) === null || _a === void 0 ? void 0 : _a.raw) !== null && _b !== void 0 ? _b : item.type;
                    }
                    if (finalParams[prop].match(/^\/.*\/$/)) {
                        itemMatch = new RegExp(finalParams[prop].slice(1, -1)).test(valueToCheck.toLowerCase());
                    }
                    else {
                        itemMatch = micromatch_1.default.isMatch(valueToCheck.toLowerCase(), finalParams[prop].toLowerCase());
                    }
                    if (!itemMatch) {
                        break;
                    }
                }
                if (itemMatch) {
                    result.items[item.id] = item;
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
            finalMenu.custom[menuName].tree = (0, object_1.__deepFilter)(finalMenu.tree, 
            // @ts-ignore
            this.settings.customMenu[menuName]);
            // @ts-ignore
            finalMenu.custom[menuName].slug = (0, object_1.__deepFilter)(finalMenu.slug, 
            // @ts-ignore
            this.settings.customMenu[menuName]);
            Object.keys(finalMenu.packages).forEach((packageName) => {
                const packageObj = finalMenu.packages[packageName];
                // @ts-ignore
                const packageFilteredTree = (0, object_1.__deepFilter)(packageObj.tree, 
                // @ts-ignore
                this.settings.customMenu[menuName]);
                finalMenu.custom[menuName].tree = (0, object_1.__deepMerge)(finalMenu.custom[menuName].tree, packageFilteredTree);
                // @ts-ignore
                const packageFilteredSlug = (0, object_1.__deepFilter)(packageObj.slug, 
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
        const finalParams = ((0, object_1.__deepMerge)(SDocmapBuildParamsInterface_js_1.default.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
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
            const filesInPackage = s_glob_1.default.resolveSync(finalParams.globs.map((glob) => {
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
                        if (typeof value !== 'string' &&
                            ((_b = value.toString) === null || _b === void 0 ? void 0 : _b.call(value)) !== '[object Object]') {
                            value = value.toString();
                        }
                        // check if the value match the filter or not
                        // if not, we do not take the docblock
                        if (typeof value === 'string') {
                            filterRegs.forEach((reg) => {
                                if (value.match(reg)) {
                                    matchFilters = true;
                                }
                                else {
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
                    const dotPath = (0, string_1.__namespaceCompliant)(`${docblock.namespace}.${docblock.name}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDBFQUFtRDtBQUVuRCxrRUFBMkM7QUFDM0MsMkRBQWtFO0FBQ2xFLCtDQUtnQztBQUNoQyx1REFRb0M7QUFDcEMseURBR3FDO0FBQ3JDLG1EQUE0RDtBQUU1RCx1REFBa0U7QUFDbEUsNENBQXNCO0FBQ3RCLDREQUFzQztBQUN0QyxnREFBMEI7QUFDMUIsZ0hBQXVGO0FBQ3ZGLDhHQUFxRjtBQUNyRixrSEFBeUY7QUFDekYsMEdBQWlGO0FBRWpGLFNBQVMsYUFBYSxDQUFDLENBQUMsR0FBRyxFQUFFO0lBQ3pCLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxDQUFDO0FBQzNCLENBQUM7QUF5SEQsTUFBTSxPQUFRLFNBQVEsaUJBQVE7SUFJMUI7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEdBQVcsRUFBRSxTQUE2QjtRQUM5RCxJQUFJLENBQUMsb0JBQW9CLENBQUMsR0FBRyxDQUFDLEdBQUcsU0FBUyxDQUFDO0lBQy9DLENBQUM7SUEwQkQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFvQztRQUM1QyxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFO2dCQUNILEVBQUUsRUFBRSxTQUFTO2FBQ2hCO1NBQ0osRUFDRCxxQ0FBMEIsQ0FBQyxLQUFLLENBQUM7WUFDN0IsU0FBUyxFQUFFLEVBQUU7WUFDYixVQUFVLEVBQUU7Z0JBQ1IsVUFBVSxDQUFDLEVBQUUsR0FBRyxFQUFFLEtBQUssRUFBRSxRQUFRLEVBQUU7b0JBQy9CLElBQUksR0FBRyxLQUFLLFlBQVk7d0JBQUUsT0FBTyxJQUFJLENBQUM7b0JBQ3RDLElBQ0ksR0FBRyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQzt3QkFDekIsR0FBRyxDQUFDLEtBQUssQ0FBQyxxQ0FBcUMsQ0FBQyxFQUNsRDt3QkFDRSxPQUFPLElBQUksQ0FBQztxQkFDZjtvQkFDRCxPQUFPLEtBQUssQ0FBQztnQkFDakIsQ0FBQztnQkFDRCxLQUFLLENBQUMsRUFBRSxHQUFHLEVBQUUsS0FBSyxFQUFFLFFBQVEsRUFBRTtvQkFDMUIsSUFBSSxHQUFHLEtBQUssT0FBTzt3QkFBRSxPQUFPLElBQUksQ0FBQztvQkFDakMsSUFDSSxHQUFHLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDO3dCQUN6QixHQUFHLENBQUMsS0FBSyxDQUFDLGdDQUFnQyxDQUFDLEVBQzdDO3dCQUNFLE9BQU8sSUFBSSxDQUFDO3FCQUNmO29CQUNELE9BQU8sS0FBSyxDQUFDO2dCQUNqQixDQUFDO2FBQ0o7U0FDSixDQUFDLEVBQ0YsUUFBUSxJQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBckVOOzs7Ozs7Ozs7V0FTRztRQUNILGFBQVEsR0FBb0IsRUFBRSxDQUFDO1FBNEQzQixhQUFhO1FBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLG1DQUVoQixJQUFJLENBQUMsV0FBVyxDQUFDLG9CQUFvQixHQUNyQyxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FDN0IsQ0FBQztRQUNGLE9BQU8sQ0FBQyxHQUFHLENBQUMsR0FBRyxFQUFFLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUNwQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxJQUFJLENBQUMsTUFBb0M7UUFDckMsT0FBTyxJQUFJLE9BQU8sQ0FBQyxDQUFPLE9BQU8sRUFBRSxFQUFFOztZQUNqQyxNQUFNLFdBQVcsR0FBdUIsQ0FDcEMsSUFBQSxvQkFBVyxFQUNQLHVDQUE0QixDQUFDLFFBQVEsRUFBRSxFQUN2QyxNQUFNLGFBQU4sTUFBTSxjQUFOLE1BQU0sR0FBSSxFQUFFLENBQ2YsQ0FDSixDQUFDO1lBRUYsMkNBQTJDO1lBRTNDLElBQUksYUFBYSxHQUFHLFNBQVMsQ0FBQztZQUU5QixhQUFhO1lBQ2IsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxFQUFFO2dCQUNuRCxPQUFPLE9BQU87Z0JBQ1YsYUFBYTtnQkFDYixJQUFJLENBQUMsV0FBVyxDQUFDLGlCQUFpQixDQUFDLGFBQWEsQ0FBQyxDQUNwRCxDQUFDO2FBQ0w7WUFFRCxJQUFJLGNBQWMsR0FBRyxJQUFBLGlCQUFZLEVBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBRXJELElBQUksQ0FBQyxZQUFJLENBQUMsVUFBVSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtnQkFDckMsT0FBTyxPQUFPLENBQUM7b0JBQ1gsR0FBRyxFQUFFLEVBQUU7b0JBQ1AsSUFBSSxFQUFFLEVBQUU7aUJBQ1gsQ0FBQyxDQUFDO2FBQ047WUFFRCxNQUFNLGVBQWUsR0FBRyxJQUFBLHVCQUFnQixFQUFDLE9BQU8sQ0FBQyxHQUFHLEVBQUUsRUFBRTtnQkFDcEQsT0FBTyxFQUFFLElBQUk7YUFDaEIsQ0FBQyxDQUFDO1lBRUgsTUFBTSxlQUFlLEdBQXlCO2dCQUMxQyxHQUFHLEVBQUUsRUFBRTtnQkFDUCxJQUFJLEVBQUUsRUFBRTthQUNYLENBQUM7WUFFRixNQUFNLFFBQVEsR0FBRyxDQUNiLGlCQUFpQixFQUNqQixPQUEyQixLQUFLLEVBQ2hDLFlBQVksR0FBRyxLQUFLLEVBQ3RCLEVBQUU7O2dCQUNBLElBQUkseUJBQXlCLEVBQ3pCLDhCQUE4QixHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQzNDLGNBQWMsRUFDZCxJQUFJLEtBQUssS0FBSyxDQUFDLENBQUMsQ0FBQyxjQUFjLENBQUMsQ0FBQyxDQUFDLFFBQVEsRUFDMUMsaUJBQWlCLEVBQ2pCLGFBQWEsQ0FDaEIsRUFDRCxrQ0FBa0MsR0FBRyxjQUFNLENBQUMsT0FBTyxDQUMvQyxlQUFlLEVBQ2YsSUFBSSxLQUFLLEtBQUssQ0FBQyxDQUFDLENBQUMsY0FBYyxDQUFDLENBQUMsQ0FBQyxRQUFRLEVBQzFDLGlCQUFpQixFQUNqQixhQUFhLENBQ2hCLENBQUM7Z0JBRU4sSUFBSSxZQUFJLENBQUMsVUFBVSxDQUFDLDhCQUE4QixDQUFDLEVBQUU7b0JBQ2pELHlCQUF5QixHQUFHLDhCQUE4QixDQUFDO2lCQUM5RDtxQkFBTSxJQUNILFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxpQkFBaUIsY0FBYyxDQUFDLEVBQ3JEO29CQUNFLHlCQUF5QixHQUFHLEdBQUcsaUJBQWlCLGNBQWMsQ0FBQztpQkFDbEU7cUJBQU0sSUFDSCxZQUFJLENBQUMsVUFBVSxDQUFDLGtDQUFrQyxDQUFDLEVBQ3JEO29CQUNFLHlCQUF5Qjt3QkFDckIsa0NBQWtDLENBQUM7aUJBQzFDO3FCQUFNO29CQUNILE9BQU87aUJBQ1Y7Z0JBRUQsTUFBTSxlQUFlLEdBQUcseUJBQXlCLENBQUMsT0FBTyxDQUNyRCxjQUFjLEVBQ2QsRUFBRSxDQUNMLENBQUM7Z0JBRUYsdUJBQXVCO2dCQUN2QixNQUFNLFVBQVUsR0FBRyxJQUFBLG1CQUFjLEVBQUMseUJBQXlCLENBQUMsQ0FBQztnQkFFN0Qsb0JBQW9CO2dCQUNwQixNQUFNLFlBQVksR0FBRyxJQUFBLDRCQUFrQixFQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUN6RCxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtvQkFDOUMsSUFBSSxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxFQUFFO3dCQUMzQixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDLFlBQVksR0FBRyxZQUFZLENBQUM7d0JBQ3RELFVBQVUsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxHQUFHLFlBQVksQ0FBQztxQkFDcEQ7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFBLE1BQUEsVUFBVSxDQUFDLFNBQVMsMENBQUUsR0FBRyxtQ0FBSSxFQUFFLENBQUMsQ0FBQyxPQUFPLENBQ2hELENBQUMsU0FBUyxFQUFFLEVBQUU7b0JBQ1YsSUFBSSxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRTt3QkFDckMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLENBQUMsWUFBWTs0QkFDNUMsWUFBWSxDQUFDO3dCQUNqQixVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQyxPQUFPOzRCQUN2QyxZQUFZLENBQUM7cUJBQ3BCO2dCQUNMLENBQUMsQ0FDSixDQUFDO2dCQUVGLDRDQUE0QztnQkFDNUMsVUFBVSxDQUFDLEdBQUcsbUNBQ1AsQ0FBQyxNQUFBLFVBQVUsQ0FBQyxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxHQUN0QixDQUFDLE1BQUEsTUFBQSxVQUFVLENBQUMsU0FBUywwQ0FBRSxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxDQUN2QyxDQUFDO2dCQUVGLFFBQVE7Z0JBQ1IsT0FBTyxVQUFVLENBQUMsU0FBUyxDQUFDO2dCQUU1QixtQ0FBbUM7Z0JBQ25DLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3pELE1BQU0sU0FBUyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUNqRCxNQUFNLEdBQUcsR0FBRyxVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxDQUFDO29CQUV0QyxHQUFHLENBQUMsSUFBSSxHQUFHLGNBQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQztvQkFFeEQsc0JBQXNCO29CQUN0QixJQUFJLEdBQUcsR0FBRyxHQUFHLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLEVBQUUsQ0FBQztvQkFDdkMsR0FBRyxDQUFDLElBQUk7d0JBQ0osTUFBQSxJQUFBLHNDQUFpQyxFQUFDLEdBQUcsQ0FBQyxJQUFJLEVBQUU7NEJBQ3hDLE9BQU8sR0FBRyxFQUFFOzRCQUNaLEdBQUc7eUJBQ04sQ0FBQyxtQ0FBSSxHQUFHLENBQUMsSUFBSSxDQUFDO29CQUVuQixVQUFVLENBQUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEdBQUcsQ0FBQztpQkFDbkM7Z0JBRUQsS0FBSyxJQUFJLENBQUMsU0FBUyxFQUFFLFNBQVMsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQzdDLFVBQVUsQ0FBQyxHQUFHLENBQ2pCLEVBQUU7b0JBQ0MsSUFBSSxPQUFPLEdBQUcsU0FBUyxDQUFDO29CQUN4QixJQUFJLENBQUMsZUFBZSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsRUFBRTt3QkFDL0IsZ0NBQWdDO3dCQUNoQyxnRUFBZ0U7d0JBQ2hFLFNBQVMsQ0FBQyxFQUFFLEdBQUcsT0FBTyxDQUFDO3dCQUN2Qiw2Q0FBNkM7d0JBQzdDLGVBQWUsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLEdBQUcsU0FBUyxDQUFDO3FCQUM1QztpQkFDSjtZQUNMLENBQUMsQ0FBQSxDQUFDO1lBRUYsc0JBQXNCO1lBQ3RCLE1BQU0sb0JBQW9CLEdBQUcsSUFBQSxpQkFBWSxFQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUM3RCxNQUFNLFFBQVEsQ0FBQyxvQkFBb0IsQ0FBQyxDQUFDO1lBRXJDLCtCQUErQjtZQUMvQixJQUFJLFdBQVcsQ0FBQyxZQUFZLEVBQUU7Z0JBQzFCLE1BQU0saUJBQWlCLEdBQ25CLElBQUEsMkJBQWlCLEVBQUMsb0JBQW9CLENBQUMsQ0FBQztnQkFDNUMsTUFBTSxlQUFlLG1DQUNkLENBQUMsTUFBQSxpQkFBaUIsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsQ0FBQyxHQUN0QyxDQUFDLE1BQUEsaUJBQWlCLENBQUMsZUFBZSxtQ0FBSSxFQUFFLENBQUMsQ0FDL0MsQ0FBQztnQkFDRixLQUFLLElBQUksQ0FBQyxPQUFPLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDNUMsZUFBZSxDQUNsQixFQUFFO29CQUNDLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxLQUFLLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQ3hDO2FBQ0o7WUFFRCw2QkFBNkI7WUFDN0IsTUFBTSxrQkFBa0IsR0FBRyxJQUFBLDZCQUFrQixFQUFDLG9CQUFvQixDQUFDLENBQUM7WUFFcEUsSUFBSSxXQUFXLENBQUMsWUFBWSxFQUFFO2dCQUMxQixNQUFNLGdCQUFnQixtQ0FDZixDQUFDLE1BQUEsa0JBQWtCLGFBQWxCLGtCQUFrQix1QkFBbEIsa0JBQWtCLENBQUUsT0FBTyxtQ0FBSSxFQUFFLENBQUMsR0FDbkMsQ0FBQyxNQUFBLGtCQUFrQixhQUFsQixrQkFBa0IsdUJBQWxCLGtCQUFrQixDQUFFLFVBQVUsbUNBQUksRUFBRSxDQUFDLENBQzVDLENBQUM7Z0JBQ0YsS0FBSyxJQUFJLENBQUMsT0FBTyxFQUFFLFVBQVUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQzVDLGdCQUFnQixDQUNuQixFQUFFO29CQUNDLE1BQU0sUUFBUSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsSUFBSSxDQUFDLENBQUM7aUJBQzdDO2FBQ0o7WUFFRCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxlQUFlLENBQUM7WUFFbkMsbUJBQW1CO1lBQ25CLGVBQWUsQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUUxRCxxQkFBcUI7WUFDckIsYUFBYTtZQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsYUFBYSxDQUFDLEdBQUcsZUFBZSxDQUFDO1lBRXBFLFVBQVU7WUFDVixXQUFXLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO2dCQUNqQyxNQUFNLE1BQU0sR0FBRyxJQUFBLGNBQUssRUFBQyxlQUFlLEVBQUUsT0FBTyxDQUFDLENBQUM7Z0JBQy9DLElBQUksQ0FBQyxNQUFNO29CQUFFLE9BQU87Z0JBQ3BCLElBQUEsY0FBSyxFQUNELGVBQWUsRUFDZixPQUFPLEVBQ1AsSUFBQSxlQUFNLEVBQUMsTUFBTSxFQUFFLENBQUMsQ0FBQyxFQUFFLENBQUMsRUFBRSxFQUFFO29CQUNwQixPQUFPLENBQUMsQ0FBQyxHQUFHLENBQUMsYUFBYSxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDdEMsQ0FBQyxDQUFDLENBQ0wsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1lBQ0gsV0FBVyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDckMsTUFBTSxNQUFNLEdBQUcsSUFBQSxjQUFLLEVBQUMsZUFBZSxFQUFFLE9BQU8sQ0FBQyxDQUFDO2dCQUMvQyxJQUFJLENBQUMsTUFBTTtvQkFBRSxPQUFPO2dCQUNwQixJQUFBLGNBQUssRUFDRCxlQUFlLEVBQ2YsT0FBTyxFQUNQLElBQUEsbUJBQVUsRUFBQyxNQUFNLEVBQUUsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ3hCLE9BQU8sQ0FBQyxDQUFDLEdBQUcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUN0QyxDQUFDLENBQUMsQ0FDTCxDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7WUFFSCwwQkFBMEI7WUFDMUIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxDQUFDO1FBQzdCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUNGLE1BQXNDO1FBRXRDLE9BQU8sSUFBSSxPQUFPLENBQUMsQ0FBTyxPQUFPLEVBQUUsRUFBRTs7WUFDakMsTUFBTSxXQUFXLEdBQXlCLENBQ3RDLElBQUEsb0JBQVcsRUFDUCx5Q0FBOEIsQ0FBQyxRQUFRLEVBQUUsRUFDekMsTUFBTSxhQUFOLE1BQU0sY0FBTixNQUFNLEdBQUksRUFBRSxDQUNmLENBQ0osQ0FBQztZQUVGLE1BQU0sVUFBVSxHQUFHLE1BQU0sSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUVoRCxNQUFNLE1BQU0sR0FBeUI7Z0JBQ2pDLE1BQU0sRUFBRSxXQUFXO2dCQUNuQixLQUFLLEVBQUUsRUFBRTthQUNaLENBQUM7WUFFRixLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsSUFBSSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLEVBQUU7Z0JBQ3BELElBQUksU0FBUyxHQUFHLElBQUksQ0FBQztnQkFFckIsTUFBTSxLQUFLLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLE1BQU0sRUFBRSxXQUFXLENBQUMsQ0FBQztnQkFDbEQsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLEtBQUssQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7b0JBQ25DLE1BQU0sSUFBSSxHQUFHLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFFdEIsSUFBSSxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssU0FBUyxFQUFFO3dCQUNqQyxTQUFTO3FCQUNaO29CQUVELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDMUIsU0FBUyxHQUFHLEtBQUssQ0FBQzt3QkFDbEIsTUFBTTtxQkFDVDtvQkFFRCxJQUFJLFlBQVksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQzlCLElBQUksSUFBSSxLQUFLLE1BQU0sRUFBRTt3QkFDakIsWUFBWSxHQUFHLE1BQUEsTUFBQSxJQUFJLENBQUMsSUFBSSwwQ0FBRSxHQUFHLG1DQUFJLElBQUksQ0FBQyxJQUFJLENBQUM7cUJBQzlDO29CQUVELElBQUksV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTt3QkFDckMsU0FBUyxHQUFHLElBQUksTUFBTSxDQUNsQixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUNqQyxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsV0FBVyxFQUFFLENBQUMsQ0FBQztxQkFDdEM7eUJBQU07d0JBQ0gsU0FBUyxHQUFHLG9CQUFZLENBQUMsT0FBTyxDQUM1QixZQUFZLENBQUMsV0FBVyxFQUFFLEVBQzFCLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FDbEMsQ0FBQztxQkFDTDtvQkFFRCxJQUFJLENBQUMsU0FBUyxFQUFFO3dCQUNaLE1BQU07cUJBQ1Q7aUJBQ0o7Z0JBRUQsSUFBSSxTQUFTLEVBQUU7b0JBQ1gsTUFBTSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO2lCQUNoQzthQUNKO1lBRUQsT0FBTyxDQUFDLE1BQU0sQ0FBQyxDQUFDO1FBQ3BCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxZQUFZLENBQ1IsYUFBbUMsSUFBSSxDQUFDLFdBQVc7UUFFbkQsTUFBTSx1QkFBdUIsR0FBRyxFQUFFLENBQUM7UUFFbkMsMEJBQTBCO1FBQzFCLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtZQUM5QyxhQUFhO1lBQ2IsTUFBTSxTQUFTLEdBQUcsVUFBVSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUM1QyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUM1QixJQUFJLENBQUMsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDbEQsdUJBQXVCLENBQUMsU0FBUyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFLENBQUM7YUFDeEQ7WUFDRCx1QkFBdUIsQ0FBQyxTQUFTLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwRSxDQUFDLENBQUMsQ0FBQztRQUVILElBQUksU0FBUyxHQUFvQjtZQUM3QixRQUFRLEVBQUUsRUFBRTtZQUNaLElBQUksRUFBRSxFQUFFO1lBQ1IsSUFBSSxFQUFFLEVBQUU7WUFDUixNQUFNLEVBQUUsRUFBRTtTQUNiLENBQUM7UUFDRixNQUFNLFdBQVcsR0FBRyxJQUFBLDJCQUFpQixHQUFFLENBQUM7UUFFeEMsTUFBTSxDQUFDLElBQUksQ0FBQyx1QkFBdUIsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFdBQVcsRUFBRSxFQUFFO1lBQ3pELE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQywrQkFBK0IsQ0FDaEQsdUJBQXVCLENBQUMsV0FBVyxDQUFDLENBQ3ZDLENBQUM7WUFFRixJQUFJLFdBQVcsS0FBSyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNsQyxTQUFTLG1DQUNGLFNBQVMsR0FDVCxPQUFPLENBQ2IsQ0FBQzthQUNMO2lCQUFNO2dCQUNILE1BQU0sY0FBYyxHQUFHLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7b0JBQ3ZDLGNBQWMsQ0FBQyxZQUFZLFdBQVcsR0FBRyxJQUFJLEVBQUUsQ0FBQyxtQ0FDekMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FDckIsSUFBSSxFQUFFLFlBQVksV0FBVyxHQUFHLElBQUksRUFBRSxHQUN6QyxDQUFDO2dCQUNOLENBQUMsQ0FBQyxDQUFDO2dCQUNILGFBQWE7Z0JBQ2IsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsR0FBRztvQkFDOUIsSUFBSSxFQUFFLFdBQVc7b0JBQ2pCLElBQUksRUFBRSxJQUFBLGtCQUFTLEVBQUMsT0FBTyxDQUFDLElBQUksRUFBRSxDQUFDLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFLEVBQUU7d0JBQzlDLElBQUksSUFBSSxLQUFLLE1BQU07NEJBQ2YsT0FBTyxZQUFZLFdBQVcsR0FBRyxLQUFLLEVBQUUsQ0FBQzt3QkFDN0MsT0FBTyxLQUFLLENBQUM7b0JBQ2pCLENBQUMsQ0FBQztvQkFDRixJQUFJLEVBQUUsY0FBYztpQkFDdkIsQ0FBQzthQUNMO1FBQ0wsQ0FBQyxDQUFDLENBQUM7UUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7WUFDdkQsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDO2dCQUFFLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLEdBQUcsRUFBRSxDQUFDO1lBQ2pFLGFBQWE7WUFDYixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFBLHFCQUFZLEVBQzFDLFNBQVMsQ0FBQyxJQUFJO1lBQ2QsYUFBYTtZQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUNyQyxDQUFDO1lBQ0YsYUFBYTtZQUNiLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUEscUJBQVksRUFDMUMsU0FBUyxDQUFDLElBQUk7WUFDZCxhQUFhO1lBQ2IsSUFBSSxDQUFDLFFBQVEsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQ3JDLENBQUM7WUFFRixNQUFNLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsRUFBRTtnQkFDcEQsTUFBTSxVQUFVLEdBQUcsU0FBUyxDQUFDLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztnQkFDbkQsYUFBYTtnQkFDYixNQUFNLG1CQUFtQixHQUFHLElBQUEscUJBQVksRUFDcEMsVUFBVSxDQUFDLElBQUk7Z0JBQ2YsYUFBYTtnQkFDYixJQUFJLENBQUMsUUFBUSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FDckMsQ0FBQztnQkFDRixTQUFTLENBQUMsTUFBTSxDQUFDLFFBQVEsQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFBLG9CQUFXLEVBQ3pDLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxFQUMvQixtQkFBbUIsQ0FDdEIsQ0FBQztnQkFDRixhQUFhO2dCQUNiLE1BQU0sbUJBQW1CLEdBQUcsSUFBQSxxQkFBWSxFQUNwQyxVQUFVLENBQUMsSUFBSTtnQkFDZixhQUFhO2dCQUNiLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUNyQyxDQUFDO2dCQUNGLFNBQVMsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUMsSUFBSSxHQUFHLElBQUEsb0JBQVcsRUFDekMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQy9CLG1CQUFtQixDQUN0QixDQUFDO1lBQ04sQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILGFBQWE7UUFDYixPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQsK0JBQStCLENBQUMsYUFBYTtRQUN6QyxNQUFNLE9BQU8sR0FBRyxFQUFFLEVBQ2QsYUFBYSxHQUFHLEVBQUUsRUFDbEIsZ0JBQWdCLEdBQUcsRUFBRSxDQUFDO1FBRTFCLGdCQUFnQjtRQUNoQixNQUFNLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzdDLE1BQU0sU0FBUyxHQUFHLGFBQWEsQ0FBQyxTQUFTLENBQUMsQ0FBQztZQUUzQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Z0JBQUUsT0FBTztZQUU1QixNQUFNLE9BQU8sR0FBRyxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7aUJBQzlCLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO2dCQUNQLE9BQU8sYUFBYSxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzVCLENBQUMsQ0FBQztpQkFDRCxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFZixJQUFJLFVBQVUsR0FBRyxPQUFPLENBQUM7WUFFekIsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQ25DLElBQUksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLEVBQUU7b0JBQ25CLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDZixJQUFJLEVBQUUsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO3FCQUMvQixDQUFDO2lCQUNMO2dCQUVELElBQUksQ0FBQyxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtvQkFDcEMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDL0IsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO3dCQUNwQixFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLG9CQUFvQjtxQkFDdkIsQ0FBQztvQkFDRixhQUFhLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDakMsSUFBSSxFQUFFLFNBQVMsQ0FBQyxJQUFJO3dCQUNwQixFQUFFLEVBQUUsU0FBUyxDQUFDLEVBQUU7d0JBQ2hCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLElBQUksRUFBRSxTQUFTLENBQUMsSUFBSSxDQUFDLElBQUk7d0JBQ3pCLE1BQU0sRUFBRSxTQUFTO3FCQUNwQixDQUFDO2lCQUNMO2dCQUVELFVBQVUsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU87WUFDSCxJQUFJLEVBQUUsT0FBTztZQUNiLElBQUksRUFBRSxhQUFhO1NBQ3RCLENBQUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsS0FBSyxDQUFDLE1BQW9DO1FBQ3RDLE1BQU0sV0FBVyxHQUF3QixDQUNyQyxJQUFBLG9CQUFXLEVBQUMsd0NBQTZCLENBQUMsUUFBUSxFQUFFLEVBQUUsTUFBTSxDQUFDLENBQ2hFLENBQUM7UUFFRixPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLEVBQUU7O1lBQ2pDLElBQUksVUFBVSxHQUFHO2dCQUNiLEdBQUcsRUFBRSxFQUFFO2dCQUNQLFNBQVMsRUFBRTtvQkFDUCxHQUFHLEVBQUUsRUFBRTtpQkFDVjthQUNKLENBQUM7WUFFRixNQUFNLFdBQVcsR0FBRyxJQUFBLHVCQUFnQixHQUFFLENBQUM7WUFDdkMsTUFBTSxlQUFlLEdBQUcsSUFBQSx1QkFBZ0IsRUFBQyxPQUFPLENBQUMsR0FBRyxFQUFFLEVBQUU7Z0JBQ3BELE9BQU8sRUFBRSxJQUFJO2FBQ2hCLENBQUMsQ0FBQztZQUVILGlDQUFpQztZQUNqQyxJQUFJLFlBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxXQUFXLGNBQWMsQ0FBQyxFQUFFO2dCQUMvQyxNQUFNLGlCQUFpQixHQUFHLElBQUEsbUJBQWMsRUFDcEMsR0FBRyxXQUFXLGNBQWMsQ0FDL0IsQ0FBQztnQkFDRixVQUFVLEdBQUcsaUJBQWlCLENBQUM7Z0JBQy9CLFVBQVUsQ0FBQyxTQUFTLEdBQUc7b0JBQ25CLEdBQUcsRUFBRSxFQUFFO2lCQUNWLENBQUM7YUFDTDtZQUVELE9BQU8sQ0FBQyxHQUFHLENBQ1AseUZBQXlGLENBQzVGLENBQUM7WUFFRiw0REFBNEQ7WUFDNUQsTUFBTSxjQUFjLEdBQUcsZ0JBQU8sQ0FBQyxXQUFXLENBQ3RDLFdBQVcsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQzNCLE9BQU8sR0FBRyxJQUFJLG1CQUFtQixDQUFDO1lBQ3RDLENBQUMsQ0FBQyxFQUNGO2dCQUNJLEdBQUcsRUFBRSxXQUFXO2dCQUNoQixPQUFPLEVBQUUsTUFBQSxXQUFXLENBQUMsT0FBTyxtQ0FBSSxFQUFFO2FBQ3JDLENBQ0osQ0FBQztZQUVGLE9BQU8sQ0FBQyxHQUFHLENBQ1Asd0NBQXdDLGNBQWMsQ0FBQyxNQUFNLHFDQUFxQyxDQUNyRyxDQUFDO1lBRUYsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLGNBQWMsQ0FBQyxNQUFNLEVBQUUsQ0FBQyxFQUFFLEVBQUU7Z0JBQzVDLE1BQU0sSUFBSSxHQUFHLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQztnQkFFL0IsT0FBTyxDQUFDLEdBQUcsQ0FDUCxnREFBZ0QsY0FBTSxDQUFDLFFBQVEsQ0FDM0QsSUFBQSx1QkFBZ0IsR0FBRTtnQkFDbEIsYUFBYTtnQkFDYixJQUFJLENBQUMsSUFBSSxDQUNaLFVBQVUsQ0FDZCxDQUFDO2dCQUVGLE1BQU0saUJBQWlCLEdBQUcsSUFBSSxvQkFBVyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7b0JBQ2pELGNBQWMsRUFBRSxLQUFLO29CQUNyQixRQUFRLEVBQVksSUFBSyxDQUFDLElBQUk7aUJBQ2pDLENBQUMsQ0FBQztnQkFFSCxNQUFNLGlCQUFpQixDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUVoQyxNQUFNLFNBQVMsR0FBRyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQztnQkFFL0MsSUFBSSxDQUFDLFNBQVMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxNQUFNO29CQUFFLFNBQVM7Z0JBRTlDLElBQUksV0FBVyxHQUFRLEVBQUUsQ0FBQztnQkFDMUIsTUFBTSxRQUFRLEdBQVEsRUFBRSxDQUFDO2dCQUN6QixLQUFLLElBQUksQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLEdBQUcsU0FBUyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDdkMsTUFBTSxRQUFRLEdBQUcsU0FBUyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUU5QixJQUFJLFlBQVksR0FBRyxLQUFLLENBQUM7b0JBRXpCLEtBQ0ksSUFBSSxDQUFDLEdBQUcsQ0FBQztvQkFDVCxhQUFhO29CQUNiLENBQUMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxhQUFhLENBQUMsQ0FBQyxNQUFNLEVBQ2pELENBQUMsRUFBRSxFQUNMO3dCQUNFLE1BQU0sR0FBRyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLGFBQWEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO3dCQUN0RCxJQUFJLFVBQVU7d0JBQ1YsYUFBYTt3QkFDYixXQUFXLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUNuQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTs0QkFDNUIsVUFBVSxHQUFHLENBQUMsVUFBVSxDQUFDLENBQUM7eUJBQzdCO3dCQUVELGFBQWE7d0JBQ2IsSUFBSSxLQUFLLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDO3dCQUUxQixzQ0FBc0M7d0JBQ3RDLElBQUksS0FBSyxLQUFLLFNBQVM7NEJBQUUsU0FBUzt3QkFFbEMsMkNBQTJDO3dCQUMzQyxrREFBa0Q7d0JBQ2xELElBQ0ksT0FBTyxLQUFLLEtBQUssUUFBUTs0QkFDekIsQ0FBQSxNQUFBLEtBQUssQ0FBQyxRQUFRLHFEQUFJLE1BQUssaUJBQWlCLEVBQzFDOzRCQUNFLEtBQUssR0FBRyxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUM7eUJBQzVCO3dCQUVELDZDQUE2Qzt3QkFDN0Msc0NBQXNDO3dCQUN0QyxJQUFJLE9BQU8sS0FBSyxLQUFLLFFBQVEsRUFBRTs0QkFDM0IsVUFBVSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO2dDQUN2QixJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLEVBQUU7b0NBQ2xCLFlBQVksR0FBRyxJQUFJLENBQUM7aUNBQ3ZCO3FDQUFNO2lDQUNOOzRCQUNMLENBQUMsQ0FBQyxDQUFDOzRCQUNILElBQUksWUFBWSxFQUFFO2dDQUNkLE1BQU07NkJBQ1Q7eUJBQ0o7cUJBQ0o7b0JBRUQsOERBQThEO29CQUM5RCxJQUFJLFlBQVksRUFBRTt3QkFDZCxTQUFTO3FCQUNaO29CQUVELElBQUksUUFBUSxDQUFDLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssR0FBRzt3QkFDbEQsU0FBUztvQkFDYixJQUFJLFFBQVEsQ0FBQyxPQUFPO3dCQUFFLFNBQVM7b0JBRS9CLHFEQUFxRDtvQkFDckQsTUFBTSxRQUFRLEdBQUcsSUFBQSxlQUFVLEVBQVcsSUFBSyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUVsRCxNQUFNLGdCQUFnQixHQUFrQixFQUFFLENBQUM7b0JBRTNDLEtBQUssSUFBSSxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsR0FBRyxXQUFXLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTt3QkFDOUMsTUFBTSxHQUFHLEdBQUcsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQzt3QkFDaEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssU0FBUzs0QkFBRSxTQUFTO3dCQUMxQyxjQUFjO3dCQUNkLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEVBQUU7NEJBQzlCLGdCQUFnQixDQUFDLEdBQUcsQ0FBQztnQ0FDakIsTUFBTSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FDOUIsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUNoQixDQUFDO3lCQUNUOzZCQUFNOzRCQUNILGdCQUFnQixDQUFDLEdBQUcsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsQ0FBQzt5QkFDekM7cUJBQ0o7b0JBRUQsTUFBTSxPQUFPLEdBQUcsSUFBQSw2QkFBb0IsRUFDaEMsR0FBRyxRQUFRLENBQUMsU0FBUyxJQUFJLFFBQVEsQ0FBQyxJQUFJLEVBQUUsQ0FDM0MsQ0FBQztvQkFFRixJQUFJLFFBQVEsQ0FBQyxTQUFTLElBQUksQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFO3dCQUMvQyxXQUFXLG1DQUNKLGdCQUFnQixLQUNuQixRQUFRLEVBQ1IsU0FBUyxFQUFFLFFBQVEsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUMxQyxPQUFPLEVBQUUsY0FBTSxDQUFDLFFBQVEsQ0FDcEIsSUFBQSx1QkFBZ0IsR0FBRSxFQUNSLElBQUssQ0FBQyxJQUFJLENBQ3ZCLEdBQ0osQ0FBQzt3QkFDRixJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLFdBQVcsQ0FBQztxQkFDeEM7eUJBQU0sSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFO3dCQUN0QixRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxJQUFJLENBQUMsQ0FBQzs0QkFDbEMsZ0JBQWdCLENBQUM7cUJBQ3hCO2lCQUNKO2dCQUNELFdBQVcsQ0FBQyxRQUFRLEdBQUcsUUFBUSxDQUFDO2FBQ25DO1lBRUQsT0FBTyxDQUFDLEdBQUcsQ0FDUCxtQ0FDSSxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUMvQiwyQ0FBMkMsQ0FDOUMsQ0FBQztZQUVGLDRDQUE0QztZQUM1QyxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsR0FBRyxJQUFJLENBQUMsUUFBUSxDQUFDO1lBRXpDLElBQUksV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDbEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCw2RUFBNkUsV0FBVyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQ3BHLElBQUEsdUJBQWdCLEdBQUUsR0FBRyxHQUFHLEVBQ3hCLEVBQUUsQ0FDTCxVQUFVLENBQ2QsQ0FBQztnQkFDRixZQUFJLENBQUMsYUFBYSxDQUNkLFdBQVcsQ0FBQyxPQUFPLEVBQ25CLElBQUksQ0FBQyxTQUFTLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRSxDQUFDLENBQUMsQ0FDdEMsQ0FBQzthQUNMO1lBRUQsT0FBTyxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3hCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDOztBQTd3Qk0seUJBQWlCLEdBQUcsRUFBRSxDQUFDO0FBRXZCLDRCQUFvQixHQUFHLEVBQUUsQ0FBQztBQTh3QnJDLGtCQUFlLE9BQU8sQ0FBQyJ9