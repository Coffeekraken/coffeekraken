import __SClass from '@coffeekraken/s-class';
import __SDocblock from '@coffeekraken/s-docblock';
import __SGlob from '@coffeekraken/s-glob';
import __SPromise from '@coffeekraken/s-promise';
import __deepMap from '@coffeekraken/sugar/shared/object/deepMap';
import __getFilename from '@coffeekraken/sugar/node/fs/filename';
import __fsPool from '@coffeekraken/sugar/node/fs/pool';
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
import __md5 from '@coffeekraken/sugar/shared/crypt/md5';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';
import __require from '@coffeekraken/sugar/node/esm/require';
import __writeJsonSync from '@coffeekraken/sugar/node/fs/writeJsonSync';
import __replaceTokens from '@coffeekraken/sugar/node/token/replaceTokens';
import __SDuration from '@coffeekraken/s-duration';
import __copySync from '@coffeekraken/sugar/node/fs/copySync';
import __ensureDirSync from '@coffeekraken/sugar/node/fs/ensureDirSync';
import __writeFileSync from '@coffeekraken/sugar/node/fs/writeFileSync';
import __npmInstall from '@coffeekraken/sugar/node/npm/install';
import __folderPath from '@coffeekraken/sugar/node/fs/folderPath';
import __SFile from '@coffeekraken/s-file';
import __set from '@coffeekraken/sugar/shared/object/set';
import __get from '@coffeekraken/sugar/shared/object/get';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __uniqid from '@coffeekraken/sugar/shared/string/uniqid';

import __interfaceFieldProxy from './fieldsProxy/interfaceFieldProxy';

/**
 * @name                SDocMap
 * @namespace           node
 * @type                Class
 * @extends             SPromise
 * @status              wip
 *
 * This class represent the ```docMap.json``` file and allows you to build it from some sources (glob pattern(s))
 * and save it inside a directory you choose.
 *
 * @param           {Object}        [settings={}]           An object of settings to configure your docMap instance:
 * - filename (docMap.json) {String}: Specify the filename you want
 * - outputDir (packageRootDir()) {String}: Specify the directory where you want to save your docMap.json file when using the ```save``` method
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SDocMap from 'coffeekraken/sugar/node/doc/SDocMap';
 * const docMap = new SDocMap({
 *  outputDir: '/my/cool/directory'
 * });
 * await docMap.scan('/my/cool/directory/*.js');
 * await docMap.save();
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export interface ISDocMapBuildParams {
    watch: boolean;
    globs: string[];
    exclude: string[];
    noExtends: boolean;
    filters: Record<string, RegExp>;
    fields: string[];
    save: boolean;
    outPath: string;
}

export interface ISDocMapSnapshotParams {
    outDir: string;
}

export interface ISDocmapInstallSnapshotsParams {
    glob: string;
}

export interface ISDocMapReadParams {
    input: string;
    snapshot: string;
    snapshotDir: string;
}

export interface ISDocMapFieldProxyFn {
    (data: any): any;
}

export interface ISDocMapSettings {
    fieldsProxy: Record<string, ISDocMapFieldProxyFn>;
}

export interface ISDocMapCtorSettings {
    docmap: Partial<ISDocMapSettings>;
}

export interface ISDocMapEntry {
    absPath?: string;
    name?: string;
    namespace?: string;
    filename?: string;
    extension?: string;
    relPath?: string;
    directory?: string;
    relDirectory?: string;
    type?: string;
    description?: string;
    extends?: boolean;
    static?: boolean;
    since?: string;
    status?: string;
    package?: any;
    menu?: any;
}
export interface ISDocMapEntries {
    [key: string]: ISDocMapEntry;
}

export interface ISDocmapMenuObjItem {
    name: any;
    slug: any;
    [key: string]: Partial<ISDocmapMenuObjItem>;
}

export interface ISDocmapMenuObj {
    packages: Record<string, Partial<ISDocmapMenuObjItem>>;
    tree: Record<string, Partial<ISDocmapMenuObjItem>>;
    slug: Record<string, Partial<ISDocmapMenuObjItem>>;
    mixedTree: Record<string, Partial<ISDocmapMenuObjItem>>;
    mixedSlug: Record<string, Partial<ISDocmapMenuObjItem>>;
}

export interface ISDocmapMetasObj {
    type: 'current' | 'snapshot';
    snapshot?: string;
}

export interface ISDocMapObj {
    metas: ISDocmapMetasObj;
    map: ISDocMapEntries;
    menu: Partial<ISDocmapMenuObj>;
    snapshots: string[];
}

export interface ISDocMap {
    _entries: ISDocMapEntries;
}

class SDocMap extends __SClass implements ISDocMap {
    static interfaces = {};

    static _registeredFieldsProxy = {};
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
    static registerFieldProxy(field: string, processor: ISDocMapFieldProxyFn): any {
        this._registeredFieldsProxy[field] = processor;
    }

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
    _entries: ISDocMapEntries = {};

    /**
     * @name    _docmapJson
     * @type    Object
     * @private
     *
     * Store the docmap readed with the method "read"
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _docmapJson: any;

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
    get docmapSettings(): ISDocMapSettings {
        return (<any>this._settings).docmap;
    }

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
    constructor(settings?: Partial<ISDocMapCtorSettings>) {
        super(
            __deepMerge(
                {
                    metas: {
                        id: 'SDocMap',
                    },
                    docmap: {
                        fieldsProxy: {},
                    },
                },
                settings || {},
            ),
        );
        // @ts-ignore
        this.docmapSettings.fieldsProxy = {
            // @ts-ignore
            ...this.constructor._registeredFieldsProxy,
            ...this.docmapSettings.fieldsProxy,
        };
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
    read(params?: Partial<ISDocMapReadParams>): Promise<ISDocMapObj> {
        return new __SPromise(
            async ({ resolve, pipe, emit }) => {
                const finalParams = <ISDocMapReadParams>(
                    __deepMerge(__SDocMapReadParamsInterface.defaults(), params ?? {})
                );

                // snapshot param handling
                if (finalParams.snapshot) {
                    finalParams.input = __path.resolve(finalParams.snapshotDir, finalParams.snapshot, 'docmap.json');
                }

                let docmapRootPath = __folderPath(finalParams.input);

                if (!__fs.existsSync(finalParams.input)) {
                    throw new Error(
                        `<red>[${this.constructor.name}.${this.metas.id}]</red> Sorry but the file "<cyan>${finalParams.input}</cyan>" does not exists...`,
                    );
                }

                const packageMonoRoot = __packageRoot(process.cwd(), true);

                const extendedPackages: string[] = [];
                const finalDocmapJson: Partial<ISDocMapObj> = {
                    metas: {
                        type: finalParams.snapshot ? 'snapshot' : 'current',
                        snapshot: finalParams.snapshot,
                    },
                    map: {},
                    menu: {},
                    snapshots: [],
                };

                const loadJson = async (packageNameOrPath, currentPath) => {
                    if (extendedPackages.indexOf(packageNameOrPath) !== -1) return;
                    extendedPackages.push(packageNameOrPath);

                    let currentPathDocmapJsonPath,
                        potentialPackagePath = __path.resolve(
                            docmapRootPath,
                            'node_modules',
                            packageNameOrPath,
                            'docmap.json',
                        ),
                        potentialRootPackagePath = __path.resolve(
                            packageMonoRoot,
                            'node_modules',
                            packageNameOrPath,
                            'docmap.json',
                        );

                    if (__fs.existsSync(potentialPackagePath)) {
                        currentPathDocmapJsonPath = potentialPackagePath;
                    } else if (__fs.existsSync(`${packageNameOrPath}/docmap.json`)) {
                        currentPathDocmapJsonPath = `${packageNameOrPath}/docmap.json`;
                    } else if (__fs.existsSync(potentialRootPackagePath)) {
                        currentPathDocmapJsonPath = potentialRootPackagePath;
                    } else {
                        throw new Error(
                            `<red>[read]</red> Sorry but the references docmap path/package "<yellow>${packageNameOrPath}</yellow>" does not exists`,
                        );
                    }

                    if (!currentPathDocmapJsonPath) return;

                    const extendsRootPath = currentPathDocmapJsonPath.replace('/docmap.json', '');

                    const packageJsonPath = `${extendsRootPath}/package.json`;
                    if (!__fs.existsSync(packageJsonPath)) {
                        throw new Error(
                            `<red>[${this.constructor.name}]</red> Sorry but the package "<yellow>${extendsRootPath}</yellow>" does not have any valid "<cyan>package.json</cyan>" file at his root`,
                        );
                    }

                    const currentPackageJson = __readJsonSync(packageJsonPath);
                    const docmapJson = __readJsonSync(currentPathDocmapJsonPath);

                    Object.keys(docmapJson.map).forEach((namespace) => {
                        if (docmapJson.map[namespace]) {
                            docmapJson.map[namespace].package = currentPackageJson.name;
                        }
                    });
                    Object.keys(docmapJson.generated?.map ?? []).forEach((namespace) => {
                        if (docmapJson.generated.map[namespace]) {
                            docmapJson.generated.map[namespace].package = currentPackageJson.name;
                        }
                    });

                    docmapJson.extends = [...(docmapJson.extends ?? []), ...(docmapJson.generated?.extends ?? [])];
                    docmapJson.map = {
                        ...(docmapJson.map ?? {}),
                        ...(docmapJson.generated?.map ?? {}),
                    };

                    delete docmapJson.generated;

                    for (let i = 0; i < docmapJson.extends.length; i++) {
                        const extendsPackageName = docmapJson.extends[i];
                        await loadJson(extendsPackageName, extendsRootPath);
                    }

                    for (let i = 0; i < Object.keys(docmapJson.map).length; i++) {
                        const namespace = Object.keys(docmapJson.map)[i];
                        const obj = docmapJson.map[namespace];
                        obj.path = __path.resolve(extendsRootPath, obj.relPath);

                        docmapJson.map[namespace] = obj;
                    }

                    finalDocmapJson.map = {
                        ...finalDocmapJson.map,
                        ...(docmapJson.map ?? {}),
                    };
                };

                const docmapJsonFolderPath = __folderPath(finalParams.input);
                await loadJson(docmapJsonFolderPath, docmapJsonFolderPath);

                // loading available snapshots
                if (__fs.existsSync(finalParams.snapshotDir)) {
                    const availableSnapshots = __fs.readdirSync(finalParams.snapshotDir);
                    finalDocmapJson.snapshots = availableSnapshots;
                } else {
                    finalDocmapJson.snapshots = [];
                }

                // save the docmap json
                this._docmapJson = finalDocmapJson;

                finalDocmapJson.menu = this._extractMenu(finalDocmapJson);

                // return the final docmap
                resolve(finalDocmapJson);
            },
            {
                metas: {
                    id: `read`,
                },
            },
        );
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
    _extractMenu(docmapJson: Partial<ISDocMapObj> = this._docmapJson): ISDocmapMenuObj {
        const docmapJsonMenuByPackage = {};

        // split menus by packages
        // @ts-ignore
        Object.keys(docmapJson.map).forEach((namespace) => {
            // @ts-ignore
            const docmapObj = docmapJson.map[namespace];
            if (!docmapObj.menu) return;
            if (!docmapJsonMenuByPackage[docmapObj.package]) {
                docmapJsonMenuByPackage[docmapObj.package] = [];
            }
            docmapJsonMenuByPackage[docmapObj.package].push(docmapObj);
        });

        let finalMenu: ISDocmapMenuObj = {
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
                finalMenu = {
                    ...finalMenu,
                    ...menuObj,
                };
            } else {
                const scopedSlugMenu = {};
                Object.keys(menuObj.slug).forEach((slug) => {
                    scopedSlugMenu[`/${packageName}${slug}`] = menuObj.slug[slug];
                });
                finalMenu.packages[packageName] = {
                    name: packageJson.name,
                    tree: __deepMap(menuObj.tree, ({ prop, value }) => {
                        if (prop === 'slug') return `/${packageName}${value}`;
                        return value;
                    }),
                    slug: scopedSlugMenu,
                };
            }
        });

        // mixed menus
        let mixedTree = Object.assign({}, finalMenu.tree ?? {}),
            mixedSlug = Object.assign({}, finalMenu.slug ?? {});
        Object.keys(finalMenu.packages).forEach((packageName) => {
            const packageObj = finalMenu.packages[packageName];
            mixedTree = __deepMerge(mixedTree, packageObj.tree ?? {});
            mixedSlug = __deepMerge(mixedSlug, packageObj.slug ?? {});
        });
        finalMenu.mixedTree = mixedTree;
        finalMenu.mixedSlug = mixedSlug;

        // @ts-ignore
        return finalMenu;
    }

    _extractMenuFromDocmapJsonStack(docmapJsonMap) {
        const menuObj = {},
            menuObjBySlug = {},
            menuObjByPackage = {};

        // extract menus
        Object.keys(docmapJsonMap).forEach((namespace) => {
            const docmapObj = docmapJsonMap[namespace];

            if (!docmapObj.menu) return;

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
    build(params: Partial<ISDocMapBuildParams>): Promise<any> {
        const finalParams = <ISDocMapBuildParams>__deepMerge(__SDocMapBuildParamsInterface.defaults(), params);
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
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

                    const globs: string[] = [`${packageRoot}/node_modules/**{0,2}/docmap.json`];
                    if (packageRoot !== packageMonoRoot) {
                        globs.push(`${packageMonoRoot}/node_modules/**{0,2}/docmap.json`);
                    }

                    const currentDocmapFiles = __SGlob.resolve(globs, {
                        defaultExcludes: false,
                        exclude: finalParams.exclude ?? [],
                    });

                    emit('log', {
                        value: `<yellow>[build]</yellow> Found <cyan>${currentDocmapFiles.length}</cyan> docmap.json file(s) in dependencies`,
                    });

                    const extendsArray: string[] = [];
                    currentDocmapFiles.forEach((file) => {
                        const currentPackageJson = __readJsonSync(`${file.dirPath}/package.json`);
                        if (currentPackageJson.name === packageJson.name) return;
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
                    exclude: finalParams.exclude ?? [],
                });

                emit('log', {
                    value: `<yellow>[build]</yellow> Found <cyan>${filesInPackage.length}</cyan> file(s) to parse in package`,
                });

                for (let i = 0; i < filesInPackage.length; i++) {
                    const file = filesInPackage[i];
                    const content = (<__SFile>file).raw;

                    emit('log', {
                        value: `<yellow>[build]</yellow> Parsing file "<cyan>${__path.relative(
                            __packageRootDir(),
                            // @ts-ignore
                            file.path,
                        )}</cyan>"`,
                    });

                    const docblocksInstance = new __SDocblock(content, {
                        docblock: {
                            filepath: (<__SFile>file).path,
                        },
                    });

                    await docblocksInstance.parse();

                    const docblocks = docblocksInstance.toObject();

                    if (!docblocks || !docblocks.length) continue;

                    let docblockObj: any = {};
                    const children: any = {};
                    for (let j = 0; j < docblocks.length; j++) {
                        const docblock = docblocks[j];
                        for (
                            let k = 0;
                            // @ts-ignore
                            k < Object.keys(finalParams.filters).length;
                            k++
                        ) {
                            const filterReg =
                                // @ts-ignore
                                finalParams.filters[Object.keys(finalParams.filters)[k]];
                            // @ts-ignore
                            const value = docblock[Object.keys(finalParams.filters)[k]];
                            if (value === undefined) continue;
                            if (value.match(filterReg)) break;
                        }

                        if (docblock.name && docblock.name.slice(0, 1) === '_') continue;
                        if (docblock.private) continue;

                        // const path = __path.relative(outputDir, filepath);
                        const filename = __getFilename((<__SFile>file).path);

                        const docblockEntryObj: ISDocMapEntry = {};

                        for (let l = 0; l < finalParams.fields.length; l++) {
                            const field = finalParams.fields[l];
                            if (docblock[field] === undefined) continue;
                            if (field === 'namespace')
                                docblock[field] = `${packageJson.name.replace('/', '.')}.${docblock[field]}`;
                            // props proxy
                            if (this.docmapSettings.fieldsProxy[field]) {
                                docblockEntryObj[field] = await this.docmapSettings.fieldsProxy[field](docblock[field]);
                            } else {
                                docblockEntryObj[field] = docblock[field];
                            }
                        }

                        if (docblock.namespace) {
                            docblockObj = {
                                ...docblockEntryObj,
                                filename,
                                extension: filename.split('.').slice(1)[0],
                                relPath: __path.relative(__packageRootDir(), (<__SFile>file).path),
                            };
                            this._entries[`${docblock.namespace}.${__camelCase(docblock.name)}`] = docblockObj;
                        } else if (docblock.name) {
                            children[__camelCase(docblock.name)] = docblockEntryObj;
                        }
                    }
                    docblockObj.children = children;
                }

                emit('log', {
                    value: `<yellow>[build]</yellow> <green>${
                        Object.keys(this._entries).length
                    }</green> entries gathered for this docMap`,
                });

                emit('notification', {
                    type: 'success',
                    message: `${this.metas.id} build success`,
                });

                // save entries inside the json map property
                docmapJson.generated.map = this._entries;

                if (finalParams.save) {
                    emit('log', {
                        value: `<green>[save]</green> File saved <green>successfully</green> under "<cyan>${finalParams.outPath.replace(
                            __packageRootDir() + '/',
                            '',
                        )}</cyan>"`,
                    });
                    __fs.writeFileSync(finalParams.outPath, JSON.stringify(docmapJson, null, 4));
                }

                resolve(docmapJson);
            },
            {
                metas: {
                    id: `build`,
                },
            },
        );
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
    installSnapshot(params: Partial<ISDocmapInstallSnapshotsParams>): Promise<any> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const finalParams = <ISDocmapInstallSnapshotsParams>(
                    __deepMerge(__SDocmapInstallSnapshotParamsInterface.defaults(), params ?? {})
                );

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
                    const folderPath = <string>folders[i];

                    emit('log', {
                        value: `<yellow>[install]</yellow> Installing snapshot <yellow>${__path.relative(
                            __packageRootDir(),
                            folderPath,
                        )}</yellow>`,
                    });

                    const packageJson = __packageJsonSync();
                    const packageMonoRootPath = __packageRoot(process.cwd(), true);

                    // symlink repos from monorepo
                    const removedDependencies = {},
                        removedDevDependencies = {};
                    if (packageMonoRootPath !== __packageRoot()) {
                        const packageJsonFiles = __SGlob.resolve(`${packageMonoRootPath}/**/package.json`);

                        packageJsonFiles.forEach((file) => {
                            if (file.dirPath === packageMonoRootPath) return;
                            if (
                                !packageJson.dependencies?.[file.content.name] &&
                                !packageJson.devDependencies?.[file.content.name]
                            )
                                return;

                            if (packageJson.dependencies?.[file.content.name]) {
                                removedDependencies[file.content.name] = packageJson.dependencies[file.content.name];
                                delete packageJson.dependencies[file.content.name];
                            }
                            if (packageJson.devDependencies?.[file.content.name]) {
                                removedDevDependencies[file.content.name] =
                                    packageJson.devDependencies[file.content.name];
                                delete packageJson.devDependencies[file.content.name];
                            }

                            const packageFolderPath = __folderPath(file.path);
                            const destinationFolderPath = `${folderPath}/node_modules/${file.content.name}`;
                            __ensureDirSync(destinationFolderPath.split('/').slice(0, -1).join('/'));
                            try {
                                __fs.unlinkSync(destinationFolderPath);
                            } catch (e) {}
                            __fs.symlinkSync(packageFolderPath, destinationFolderPath);
                        });
                    }
                    if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
                        __writeJsonSync(`${folderPath}/package.json`, packageJson);
                    }

                    // installing dependencies
                    await pipe(
                        __npmInstall({
                            cwd: folderPath,
                            yarn: true,
                            args: {
                                silent: false,
                            },
                        }),
                    );

                    // restoring package.json
                    if (Object.keys(removedDependencies).length || Object.keys(removedDevDependencies).length) {
                        packageJson.dependencies = {
                            ...packageJson.dependencies,
                            ...removedDependencies,
                        };
                        packageJson.devDependencies = {
                            ...packageJson.devDependencies,
                            ...removedDevDependencies,
                        };
                        __writeJsonSync(`${folderPath}/package.json`, packageJson);
                    }

                    emit('log', {
                        value: `<green>[success]</green> Snapshot "<yellow>${__path.relative(
                            __packageRootDir(),
                            folderPath,
                        )}</yellow>" installed <green>successfully</green>`,
                    });
                }

                emit('log', {
                    value: `<green>[success]</green> Snapshot(s) installed <green>successfully</green> in <yellow>${
                        duration.end().formatedDuration
                    }</yellow>`,
                });
            },
            {
                metas: {
                    id: `installSnapshots`,
                },
            },
        );
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
    snapshot(params: Partial<ISDocMapSnapshotParams>): Promise<any> {
        return new __SPromise(
            async ({ resolve, reject, emit, pipe }) => {
                const finalParams = <ISDocMapSnapshotParams>(
                    __deepMerge(__SDocmapSnapshotParamsInterface.defaults(), params)
                );

                const duration = new __SDuration();

                emit('log', {
                    value: `<yellow>[snapshot]</yellow> Creating a docmap snapshot. This can take some time so please be patient...`,
                });

                if (!__fs.existsSync(`${__packageRootDir()}/package.json`)) {
                    throw new Error(
                        `<red>[${this.constructor.name}.snapshot]</red> Sorry but a package.json file is required in order to create a snapshot...`,
                    );
                }
                if (!__fs.existsSync(`${__packageRootDir()}/docmap.json`)) {
                    throw new Error(
                        `<red>[${this.constructor.name}.snapshot]</red> Sorry but a docmap.json file is required in order to create a snapshot...`,
                    );
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
                } catch (e) {}

                const fullMap = {
                    ...docmapJson.map,
                    ...docmapJson.generated.map,
                };

                Object.keys(fullMap).forEach((namespace) => {
                    const docmapObj = fullMap[namespace];
                    const path = __path.resolve(__packageRootDir(), docmapObj.relPath);
                    let content = __fs.readFileSync(path, 'utf8').toString();
                    if (docmapObj.type === 'markdown') {
                    } else {
                        const docblock = new __SDocblock(content);
                        content = docblock.toString();
                    }
                    __writeFileSync(__path.resolve(outDir, docmapObj.relPath), content);
                });

                emit('log', {
                    value: `<green>[save]</green> Snapshot saved under "<cyan>${__path.relative(
                        process.cwd(),
                        outDir,
                    )}</cyan>"`,
                });
                emit('log', {
                    value: `<green>[success]</green> Snapshot generated <green>successfully</green> in <yellow>${
                        duration.end().formatedDuration
                    }</yellow>`,
                });

                resolve();
            },
            {
                metas: {
                    id: `snapshot`,
                },
            },
        );
    }
}

// register global field proxy
// SDocMap.registerFieldProxy('interface', __interfaceFieldProxy);

export default SDocMap;
