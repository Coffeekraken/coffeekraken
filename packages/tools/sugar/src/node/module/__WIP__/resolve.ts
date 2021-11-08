import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import __fs from 'fs';
import __path from 'path';
import __deepMerge from '../../shared/object/deepMerge';
import __checkPathWithMultipleExtensions from '../fs/checkPathWithMultipleExtensions';
import __existsSync from '../fs/existsSync';
import __isFile from '../is/file';
import __packageRootDir from '../path/packageRootDir';
import __builtInNodeModules from './buildInNodeModules';
import __exportsMatch from './exportsMatch';
import __readJsonSync from '@coffeekraken/sugar/node/fs/readJsonSync';

/**
 * @name            resolve
 * @namespace            node.module
 * @type            Function
 * @platform        ts
 * @platform        node
 * @status          wip
 *
 * This function take as parameter a module path to resolve and returns back the
 * correct path to this module. It check for package.json file and fields like "main", "module", etc...
 *
 * @feature     Main entry point export     (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Subpath exports     (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Subpath patterns      (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Conditional exports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Nested conditions       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @feature     Conditions Definitions      (https://nodejs.org/api/packages.html#packages_subpath_exports)
 *
 * @todo        Nested node_modules
 * @todo        Exports sugar         (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @todo        Subpath folder mappings         (https://nodejs.org/api/packages.html#packages_subpath_exports)
 * @todo        Subpath imports       (https://nodejs.org/api/packages.html#packages_subpath_exports)
 *
 * @param       {String}        module          The module to resolve
 * @param       {IResolveSettings}      [settings={}]       Some settings to configure your resolve process
 * @return      {String}                                The path to the module to actually load
 *
 * @example         js
 * import resolve from '@coffeekraken/sugar/node/module/resolve';
 * resolve('@coffeekraken/sugar'); // => /something/node_modules/@coffeekraken/sugar/index.js
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */

export class ResolveSettingsInterface extends __SInterface {
    static get _definition() {
        return {
            dirs: {
                type: 'Array<String>',
                default: __SSugarConfig.get('module.resolve.dirs'),
            },
            extensions: {
                type: 'Array<String>',
                default: __SSugarConfig.get('module.resolve.extensions'),
            },
            fields: {
                type: 'Array<String>',
                default: __SSugarConfig.get('module.resolve.fields'),
            },
            buildInModules: {
                type: 'Boolean',
                default: __SSugarConfig.get('module.resolve.builtInModules'),
            },
            preferExports: {
                type: 'Boolean',
                default: __SSugarConfig.get('module.resolve.preferExports'),
            },
            method: {
                type: 'String',
                values: ['import', 'require'],
                default: __SSugarConfig.get('module.resolve.method'),
            },
            target: {
                type: 'String',
                values: ['node', 'default'],
                default: __SSugarConfig.get('module.resolve.target'),
            },
            rootDir: {
                type: 'String',
                default: __packageRootDir(),
            },
        };
    }
}

export interface IResolveSettings {
    dirs: string[];
    extensions: string[];
    fields: string[];
    builtInModules: boolean;
    preferExports: boolean;
    method: 'import' | 'require';
    target: 'node' | 'default';
    rootDir: string;
}

export default function resolve(
    moduleName: string,
    settings?: Partial<IResolveSettings>,
) {
    const set = <IResolveSettings>__deepMerge(
        {
            ...ResolveSettingsInterface.defaults(),
        },
        settings || {},
    );

    console.log(set);

    // make sure we are in a node module package
    if (!__fs.existsSync(`${set.rootDir}/package.json`)) {
        throw new Error(
            `[resolve] Sorry but the "<yellow>resolve</yellow>" function can be used only inside a package with a proper "<cyan>package.json</cyan>" file at his root`,
        );
    }

    const rootPackageJson = __readJsonSync(`${set.rootDir}/package.json`);

    // // if is an absolute or relative path
    // if (moduleName.match(/^[\.\/]/)) {
    //   console.log('abs or relative path', moduleName);¨
    //   return moduleName;
    // }

    // build in modules
    const builtInModulesArray = Object.keys(__builtInNodeModules);
    if (builtInModulesArray.indexOf(moduleName) !== -1 && set.builtInModules)
        return moduleName;

    let requestedModuleDirPath: string,
        requestedModuleName: string | undefined,
        requestedInternalModulePath: string,
        absPath: string,
        requestedModulePackageJson: any;

    // check in packageJson dependencies
    const allDependencies = {
        ...(rootPackageJson.dependencies || {}),
        ...(rootPackageJson.devDependencies || {}),
    };
    for (let i = 0; i < Object.keys(allDependencies).length; i++) {
        const dep = Object.keys(allDependencies)[i];
        if (moduleName.slice(0, dep.length - 1)[0] === dep) {
            requestedModuleName = dep;
            break;
        }
    }

    // loop on directories
    if (!requestedModuleName) {
        for (let i = 0; i < set.dirs.length; i++) {
            const dirPath = set.dirs[i];

            // if moduleName starts with a "." or a "/"
            // this mean that we do not target a module in the "node_modules" folder
            if (!moduleName.match(/^[\.\/]/)) {
                // find the module directory by checking for the two first something/else
                const parts = moduleName.split('/');

                if (
                    parts.length >= 1 &&
                    __existsSync(
                        __path.resolve(dirPath, parts[0], 'package.json'),
                    )
                ) {
                    requestedModulePackageJson = __readJsonSync(
                        __path.resolve(dirPath, parts[0], 'package.json'),
                    );

                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = __path.resolve(dirPath, parts[0]);
                    requestedInternalModulePath = parts.slice(1).join('/');
                } else if (
                    parts.length >= 2 &&
                    __existsSync(
                        __path.resolve(
                            dirPath,
                            parts[0],
                            parts[1],
                            'package.json',
                        ),
                    )
                ) {
                    requestedModulePackageJson = __readJsonSync(
                        __path.resolve(
                            dirPath,
                            parts[0],
                            parts[1],
                            'package.json',
                        ),
                    );
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = __path.resolve(
                        dirPath,
                        parts[0],
                        parts[1],
                    );
                    requestedInternalModulePath = parts.slice(2).join('/');
                }
            } else {
                // check if is a file in the dir using the extensions
                const filePath = __checkPathWithMultipleExtensions(
                    __path.resolve(dirPath, moduleName),
                    set.extensions,
                );
                if (filePath) return filePath;

                // check if the passed moduleName is a node module
                if (
                    __existsSync(
                        __path.resolve(dirPath, moduleName, 'package.json'),
                    )
                ) {
                    requestedModulePackageJson = __readJsonSync(
                        __path.resolve(dirPath, moduleName, 'package.json'),
                    );
                    requestedModuleName = requestedModulePackageJson.name;
                    requestedModuleDirPath = __path.resolve(
                        dirPath,
                        moduleName,
                    );
                } else {
                    absPath = __path.resolve(dirPath, moduleName);
                }
            }
        }
    }

    if (!requestedModuleName) {
        throw new Error(
            `[resolve] Sorry but the requested package "<yellow>${moduleName}</yellow>" se`,
        );
    }

    // abs path
    // @ts-ignore
    if (absPath && __isFile(absPath)) return absPath;

    let depPath;
    if (
        rootPackageJson.dependencies &&
        rootPackageJson.dependencies[requestedModulePackageJson.name]
    ) {
        depPath = rootPackageJson.dependencies[requestedModulePackageJson.name];
    }
    if (
        rootPackageJson.devDependencies &&
        rootPackageJson.devDependencies[requestedModulePackageJson.name]
    ) {
        depPath =
            rootPackageJson.devDependencies[requestedModulePackageJson.name];
    }
    if (depPath && depPath.match(/^file:/)) {
        requestedModuleDirPath = __path.resolve(
            set.rootDir,
            depPath.replace(/^file:/, ''),
        );
    }

    // @ts-ignore
    if (requestedModulePackageJson && requestedModuleDirPath) {
        // if internal module path exists
        // @ts-ignore
        if (requestedInternalModulePath) {
            const potentialPath = __checkPathWithMultipleExtensions(
                __path.resolve(
                    requestedModuleDirPath,
                    requestedInternalModulePath,
                ),
                set.extensions,
            );
            if (potentialPath) return potentialPath;
        }

        // @ts-ignore
        function exportsMatch() {
            const matchPath = __exportsMatch(
                requestedModuleDirPath,
                requestedModulePackageJson.exports,
                requestedInternalModulePath,
                {
                    extensions: set.extensions,
                    method: set.method,
                    target: set.target,
                },
            );
            if (matchPath) return matchPath;
        }

        // exports field with an requestedInternalModulePath
        if (
            requestedModulePackageJson.exports !== undefined &&
            set.preferExports
        ) {
            const exportsRes = exportsMatch();
            if (exportsRes) return exportsRes;
        }

        // "fields" check
        for (let j = 0; j < set.fields.length; j++) {
            const field = set.fields[j];
            if (!requestedModulePackageJson[field]) continue;
            const filePath = __path.resolve(
                requestedModuleDirPath,
                requestedModulePackageJson[field],
            );
            if (!__isFile(filePath)) continue;
            return filePath;
        }

        // exports field with an requestedInternalModulePath
        if (
            requestedModulePackageJson.exports !== undefined &&
            !set.preferExports
        ) {
            const exportsRes = exportsMatch();
            if (exportsRes) return exportsRes;
        }
    }

    // console.log('requestedModulePackageJson', requestedModulePackageJson);
    // console.log('requestedModuleName', requestedModuleName);
    // console.log('requestedInternalModulePath', requestedInternalModulePath);
    // console.log('requestedModuleDirPath', requestedModuleDirPath);
    // console.log('absPath', absPath);

    // nothing found
    throw new Error(
        `Sorry but the requested module "<yellow>${moduleName}</yellow>" cannot be resolved correctly...`,
    );
}
