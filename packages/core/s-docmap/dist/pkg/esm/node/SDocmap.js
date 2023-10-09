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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBCQUEwQixDQUFDO0FBRW5ELE9BQU8sT0FBTyxNQUFNLHNCQUFzQixDQUFDO0FBQzNDLE9BQU8sRUFBRSxrQkFBa0IsRUFBRSxNQUFNLDhCQUE4QixDQUFDO0FBQ2xFLE9BQU8sRUFDSCxpQ0FBaUMsRUFDakMsVUFBVSxFQUNWLFlBQVksRUFDWixjQUFjLEdBQ2pCLE1BQU0sd0JBQXdCLENBQUM7QUFDaEMsT0FBTyxFQUNILFlBQVksRUFDWixTQUFTLEVBQ1QsV0FBVyxFQUNYLEtBQUssRUFDTCxLQUFLLEVBQ0wsTUFBTSxFQUNOLFVBQVUsR0FDYixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFDSCxpQkFBaUIsRUFDakIsa0JBQWtCLEdBQ3JCLE1BQU0sNkJBQTZCLENBQUM7QUFDckMsT0FBTyxFQUFFLGdCQUFnQixFQUFFLE1BQU0sMEJBQTBCLENBQUM7QUFFNUQsT0FBTyxFQUFFLG9CQUFvQixFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDbEUsT0FBTyxJQUFJLE1BQU0sSUFBSSxDQUFDO0FBQ3RCLE9BQU8sWUFBWSxNQUFNLFlBQVksQ0FBQztBQUN0QyxPQUFPLE1BQU0sTUFBTSxNQUFNLENBQUM7QUFDMUIsT0FBTyw2QkFBNkIsTUFBTSw0Q0FBNEMsQ0FBQztBQUN2RixPQUFPLDRCQUE0QixNQUFNLDJDQUEyQyxDQUFDO0FBQ3JGLE9BQU8sOEJBQThCLE1BQU0sNkNBQTZDLENBQUM7QUFDekYsT0FBTywwQkFBMEIsTUFBTSx5Q0FBeUMsQ0FBQztBQUVqRixTQUFTLGFBQWEsQ0FBQyxDQUFDLEdBQUcsRUFBRTtJQUN6QixPQUFPLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztBQUMzQixDQUFDO0FBeUhELE1B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