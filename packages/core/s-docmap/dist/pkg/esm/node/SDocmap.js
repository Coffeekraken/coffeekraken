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
import { __composerJsonSync } from '@coffeekraken/sugar/composer';
import { __checkPathWithMultipleExtensions, __fileName, __folderPath, __readJsonSync, } from '@coffeekraken/sugar/fs';
import { __deepFilter, __deepMap, __deepMerge, __get, __set, __sort, __sortDeep, } from '@coffeekraken/sugar/object';
import { __packageJsonSync, __packageMetasSync, } from '@coffeekraken/sugar/package';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import { __namespaceCompliant } from '@coffeekraken/sugar/string';
import __fs from 'fs';
import __micromatch from 'micromatch';
import __path from 'path';
import __SDocmapBuildParamsInterface from './interface/SDocmapBuildParamsInterface.js';
import __SDocmapReadParamsInterface from './interface/SDocmapReadParamsInterface.js';
import __SDocmapSearchParamsInterface from './interface/SDocmapSearchParamsInterface.js';
import __SDocmapSettingsInterface from './interface/SDocmapSettingsInterface.js';
function __toLowerCase(l = '') {
    return l.toLowerCase();
}
class SDocmap extends __SClass {
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
        super(__deepMerge({
            metas: {
                id: 'SDocmap',
            },
        }, __SDocmapSettingsInterface.apply({
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
            const finalParams = (__deepMerge(__SDocmapReadParamsInterface.defaults(), params !== null && params !== void 0 ? params : {}));
            // const packageJson = __packageJsonSync();
            let docmapVersion = 'current';
            // @ts-ignore
            if (this.constructor._cachedDocmapJson[docmapVersion]) {
                return resolve(
                // @ts-ignore
                this.constructor._cachedDocmapJson[docmapVersion]);
            }
            let docmapRootPath = __folderPath(finalParams.input);
            if (!__fs.existsSync(finalParams.input)) {
                return resolve({
                    map: {},
                    menu: {},
                });
            }
            const packageMonoRoot = __packageRootDir(process.cwd(), {
                highest: true,
            });
            const finalDocmapJson = {
                map: {},
                menu: {},
            };
            const loadJson = (packageNameOrPath, type = 'npm', isDependency = false) => __awaiter(this, void 0, void 0, function* () {
                var _e, _f, _g, _h, _j, _k;
                let currentPathDocmapJsonPath, potentialPackageDocmapJsonPath = __path.resolve(docmapRootPath, type === 'npm' ? 'node_modules' : 'vendor', packageNameOrPath, 'docmap.json'), potentialRootPackageDocmapJsonPath = __path.resolve(packageMonoRoot, type === 'npm' ? 'node_modules' : 'vendor', packageNameOrPath, 'docmap.json');
                if (__fs.existsSync(potentialPackageDocmapJsonPath)) {
                    currentPathDocmapJsonPath = potentialPackageDocmapJsonPath;
                }
                else if (__fs.existsSync(`${packageNameOrPath}/docmap.json`)) {
                    currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
                }
                else if (__fs.existsSync(potentialRootPackageDocmapJsonPath)) {
                    currentPathDocmapJsonPath =
                        potentialRootPackageDocmapJsonPath;
                }
                else {
                    return;
                }
                const packageRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');
                // read the docmap file
                const docmapJson = __readJsonSync(currentPathDocmapJsonPath);
                // get package metas
                const packageMetas = __packageMetasSync(packageRootPath);
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
                    obj.path = __path.resolve(packageRootPath, obj.relPath);
                    // checking ".dev...."
                    let ext = obj.relPath.split('.').pop();
                    obj.path =
                        (_k = __checkPathWithMultipleExtensions(obj.path, [
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
            const docmapJsonFolderPath = __folderPath(finalParams.input);
            yield loadJson(docmapJsonFolderPath);
            // load npm dependencies docmap
            if (finalParams.dependencies) {
                const docmapPackageJson = __packageJsonSync(docmapJsonFolderPath);
                const packageJsonDeps = Object.assign(Object.assign({}, ((_a = docmapPackageJson.dependencies) !== null && _a !== void 0 ? _a : {})), ((_b = docmapPackageJson.devDependencies) !== null && _b !== void 0 ? _b : {}));
                for (let [depName, depVersion] of Object.entries(packageJsonDeps)) {
                    yield loadJson(depName, 'npm', true);
                }
            }
            // load composer dependencies
            const docmapComposerJson = __composerJsonSync(docmapJsonFolderPath);
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
                const toSort = __get(finalDocmapJson, dotPath);
                if (!toSort)
                    return;
                __set(finalDocmapJson, dotPath, __sort(toSort, (a, b) => {
                    return a.key.localeCompare(b.key);
                }));
            });
            finalParams.sortDeep.forEach((dotPath) => {
                const toSort = __get(finalDocmapJson, dotPath);
                if (!toSort)
                    return;
                __set(finalDocmapJson, dotPath, __sortDeep(toSort, (a, b) => {
                    return a.key.localeCompare(b.key);
                }));
            });
            // add the "parseDocblocksFromSourceFile" to each elements
            for (let [id, docmapObj] of Object.entries(finalDocmapJson.map)) {
                if (docmapObj.path) {
                    docmapObj.parseDocblocksFromSourceFile = (settings) => __awaiter(this, void 0, void 0, function* () {
                        const docblock = new __SDocblock(docmapObj.path, settings);
                        yield docblock.parse();
                        return docblock.toObject();
                    });
                }
            }
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
            const finalParams = (__deepMerge(__SDocmapSearchParamsInterface.defaults(), params !== null && params !== void 0 ? params : {}));
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
                        itemMatch = __micromatch.isMatch(valueToCheck.toLowerCase(), finalParams[prop].toLowerCase());
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
        const packageJson = __packageJsonSync();
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
                    tree: __deepMap(menuObj.tree, ({ prop, value }) => {
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
            finalMenu.custom[menuName].tree = __deepFilter(finalMenu.tree, 
            // @ts-ignore
            this.settings.customMenu[menuName]);
            // @ts-ignore
            finalMenu.custom[menuName].slug = __deepFilter(finalMenu.slug, 
            // @ts-ignore
            this.settings.customMenu[menuName]);
            Object.keys(finalMenu.packages).forEach((packageName) => {
                const packageObj = finalMenu.packages[packageName];
                // @ts-ignore
                const packageFilteredTree = __deepFilter(packageObj.tree, 
                // @ts-ignore
                this.settings.customMenu[menuName]);
                finalMenu.custom[menuName].tree = __deepMerge(finalMenu.custom[menuName].tree, packageFilteredTree);
                // @ts-ignore
                const packageFilteredSlug = __deepFilter(packageObj.slug, 
                // @ts-ignore
                this.settings.customMenu[menuName]);
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
        const finalParams = (__deepMerge(__SDocmapBuildParamsInterface.defaults(), params));
        return new Promise((resolve) => __awaiter(this, void 0, void 0, function* () {
            var _a, _b;
            let docmapJson = {
                map: {},
                generated: {
                    map: {},
                },
            };
            const packageRoot = __packageRootDir();
            const packageMonoRoot = __packageRootDir(process.cwd(), {
                highest: true,
            });
            // check if a file already exists
            if (__fs.existsSync(`${packageRoot}/docmap.json`)) {
                const currentDocmapJson = __readJsonSync(`${packageRoot}/docmap.json`);
                docmapJson = currentDocmapJson;
                docmapJson.generated = {
                    map: {},
                };
            }
            console.log(`<yellow>[build]</yellow> Building map by searching for files inside the current package`);
            // searching inside the current package for docblocks to use
            const filesInPackage = __SGlob.resolveSync(finalParams.globs.map((glob) => {
                return `${glob}:\\*\\s@namespace`;
            }), {
                cwd: packageRoot,
                exclude: (_a = finalParams.exclude) !== null && _a !== void 0 ? _a : [],
            });
            console.log(`<yellow>[build]</yellow> Found <cyan>${filesInPackage.length}</cyan> file(s) to parse in package`);
            for (let i = 0; i < filesInPackage.length; i++) {
                const file = filesInPackage[i];
                console.log(`<yellow>[build]</yellow> Parsing file "<cyan>${__path.relative(__packageRootDir(), 
                // @ts-ignore
                file.path)}</cyan>"`);
                const docblocksInstance = new __SDocblock(file.path, {
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
                    const filename = __fileName(file.path);
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
                    const dotPath = __namespaceCompliant(`${docblock.namespace}.${docblock.name}`);
                    if (docblock.namespace && !this._entries[dotPath]) {
                        docblockObj = Object.assign(Object.assign({}, docblockEntryObj), { filename, extension: filename.split('.').slice(1)[0], relPath: __path.relative(__packageRootDir(), file.path) });
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
                console.log(`<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(__packageRootDir() + '/', '')}</cyan>"`);
                __fs.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
            }
            resolve(docmapJson);
        }));
    }
}
SDocmap._cachedDocmapJson = {};
SDocmap._registeredTagsProxy = {};
export default SDocmap;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBSzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsVUFBVSxFQUNWLFlBQVksRUFDWixjQUFjLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNILFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsR0FDYixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsa0JBQWtCLEdBQ3JCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyw2QkFBNkIsTUFBTSw0Q0FBNEMsQ0FBQztBQUN2RixPQUFPLDRCQUE0QixNQUFNLDJDQUEyQyxDQUFDO0FBQ3JGLE9BQU8sOEJBQThCLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTywwQkFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRixTQUFTLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN6QixPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBNEhELE1B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