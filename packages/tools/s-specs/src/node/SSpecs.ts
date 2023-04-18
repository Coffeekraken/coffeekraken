import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import {
    __deepMap,
    __deepMerge,
    __get,
    __set,
    __toPlainObject,
} from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';

/**
 * @name            SSpecs
 * @namespace       php
 * @type            Class
 * @platform        node
 * @status          beta
 *
 * This class allows you to access with ease some specification file(s) that supports internal and external references to other files, etc...
 * This is usefull to build specification files in json format that make share some parts through common files, etc...
 * You will also have easy access to your files through "namespaces" that represent different folders on your system. This will simplify
 * the way you read your files by prefixing your dotpath (simple fs "/" replacement) with the namespace you want to look in.
 *
 * @snippet          __SSpecs($1)
 * const specs = new __SSpecs($1);
 * const spec = specs.read('sugar.views.components.card');
 *
 * @example         js
 * import __SSpecs from '@coffeekraken/s-specs';
 * const spec = new __SSpecs({
 *   namespaces: {
 *      myNamespace: [
 *          '/my/absolute/path/to/my/specs/directory'
 *      ]
 *   }
 * });
 *
 * // read a spec file
 * const viewSpec = spec.read('myNamespace.views.mySpecFile');
 *
 * // read a spec file and specify an internal property to get
 * const title = spec.read('myNamespace.views.mySpecFile:title);
 *
 * @since           2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */

export interface ISSpecsSettings {
    namespaces: Record<string, string[]>;
    read: Partial<ISSpecsReadSettings>;
}

export interface ISSpecsReadSettings {}

export interface ISSpecsListResult {
    name: string;
    filename: string;
    dotpath: string;
    namespace: string;
    path: string;
    dir: string;
    read: Function;
}

export default class SSpecs extends __SClass {
    /**
     * @name            fromInterface
     * @type            Function
     * @status          beta
     * @static
     *
     * This method allows you to convert an SInterface class into a spec object
     *
     * @param       {SInterface}        int             The SInterface class you want to use for your spec object
     * @return      {Any}                               The requested spec object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static fromInterface(
        int: __SInterface,
        settings: Partial<ISSpecsSettings> = {},
    ): any {
        let specJson = {
            title: int.title,
            description: int.description,
            props: {},
        };

        for (let [prop, value] of Object.entries(int.definition)) {
            const repeatableStr = value.type.match(/\[\]$/)
                ? '[]'
                : value.type.match(/\{\}$/)
                ? '{}'
                : '';

            let type;
            if (value.values && value.values.length) {
                type = 'Select';
            }

            switch (value.type.toLowerCase()) {
                case 'boolean':
                    specJson.props[prop] = {
                        type: type ?? 'Checkbox',
                    };
                    break;
                case 'number':
                    specJson.props[prop] = {
                        type: type ?? 'Number',
                    };
                    break;
                case 'integer':
                    specJson.props[prop] = {
                        type: type ?? 'Integer',
                    };
                    break;
                case 'string':
                    specJson.props[prop] = {
                        type: type ?? 'Text',
                    };
                    break;
                default:
                    specJson.props[prop] = {
                        type: type ?? value.type ?? 'Text',
                    };
                    break;
            }
            specJson.props[prop] = {
                ...(specJson.props[prop] ?? {}),
                ...(value.specs ?? {}),
                type: `${specJson.props[prop].type}${repeatableStr}`,
                title: value.title,
                description: value.description,
                default: value.default,
                required: value.required,
            };

            if (type === 'Select') {
                specJson.props[prop].options = value.values.map((v) => {
                    return {
                        name: v,
                        value: v,
                    };
                });
            }
        }

        // take the "_specs" static property of the SInterface class
        // if exists
        if (int._specs) {
            specJson = __deepMerge(specJson, int._specs);
        }

        // resolve the @...
        const specs = new SSpecs(settings);
        specJson = specs.resolve(specJson);

        // return the new spec json
        return specJson;
    }

    static extractDefaults(specs: any): any {
        let defaults = {};

        function processProps(props: any, path: string[]): any {
            for (let [prop, propObj] of Object.entries(props)) {
                if (propObj.default !== undefined) {
                    __set(
                        defaults,
                        [...path, prop].filter((l) => l !== 'props'),
                        propObj.default,
                    );
                }
                if (propObj.props) {
                    processProps(propObj.props, [...path, prop, 'props']);
                }
            }
        }

        processProps(specs.props ?? {}, []);

        if (specs.default) {
            defaults = __deepMerge(defaults, specs.default);
        }

        return defaults;
    }

    /**
     * @name        constructor
     * @type        Function
     *
     * Constructor
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings?: Partial<ISSpecsSettings>) {
        super(
            __deepMerge(
                __toPlainObject(__SSugarConfig.get('specs') ?? {}),
                settings ?? {},
            ),
        );
        if (!this.settings.namespaces) {
            throw new Error(
                '[SSpecs] You MUST at least specify some "namespaces" folders to search specs files in...',
            );
        }

        const monorepoRootPath = __packageRootDir(process.cwd(), {
            highest: true,
        });
        for (let [namespace, dirs] of Object.entries(
            this.settings.namespaces,
        )) {
            this.settings.namespaces[namespace].forEach((dir, i) => {
                if (dir.startsWith('./node_modules')) {
                    this.settings.namespaces[namespace].push(
                        `${monorepoRootPath}${dir.replace(/^\./, ``)}`,
                    );
                }
                if (dir.startsWith('.')) {
                    this.settings.namespaces[namespace][i] =
                        __path.resolve(dir);
                }
            });
        }
    }

    /**
     * @name            read
     * @type            Function
     * @status          beta
     *
     * This method allows you to read a spec file and/or a value inside the passed spec file.
     *
     * @param       {String}        specDotPath        A dotpath that point to a json spec file relative to one of the registered "$settings.namespaces" folders. You can then specify an internal dotpath to get a specific value inside the passed file like so "sugar.views.props.attributes:title. Can also be an absolute path."
     * @return      {Any}                               The requested spec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(specDotPath: string, settings: Partial<ISSpecsReadSettings> = {}) {
        let finalSpecFilePath;

        // handle absolute file path
        if (specDotPath.startsWith('/')) {
            const fileName = __path.basename(specDotPath),
                dir = __path.dirname(specDotPath);

            // add the "absolute" namespace in the settings
            if (!settings.namespaces) {
                settings.namespaces = {};
            }
            settings.namespaces.absolute = [dir];

            // call the read method with this time the absolute namespace
            // prefix the fileName with the absolute namespace
            return this.read(
                `absolute.${fileName.replace('.spec.json', '')}`,
                settings,
            );
        }

        const finalSettings: ISSpecsReadSettings = __deepMerge(
            // @ts-ignore
            this.settings,
            settings,
        );

        let definedNamespaces = finalSettings.namespaces;
        let definesNamespacesKeys = Object.keys(definedNamespaces);

        let currentNamespace = '';
        for (let i = 0; i < definesNamespacesKeys.length; i++) {
            const namespace = definesNamespacesKeys[i];
            if (specDotPath.startsWith(namespace)) {
                currentNamespace = namespace;
                break;
            }
        }

        if (!currentNamespace) {
            throw new Error(
                `[SSpecs.read] The passed dotpath "<cyan>${specDotPath}</cyan>" does not correspond to any registered namespaces which are: ${definesNamespacesKeys.join(
                    '\n',
                )}`,
            );
        }

        let dotPathParts = specDotPath.split(':');

        let specFileDotPath = dotPathParts[0],
            internalSpecDotPath;
        if (dotPathParts[1]) {
            internalSpecDotPath = dotPathParts[1];
        }

        // compute internal namespace dotpath
        let internalDotPath = specFileDotPath.replace(
            `${currentNamespace}.`,
            '',
        );
        let internalPath = `${internalDotPath.split('.').join('/')}.spec.json`;

        // loop on each registered namespaces directories to check if the specDotPath
        // correspond to a file in one of them...
        const dirs = finalSettings.namespaces[currentNamespace];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];

            // direct path my/path => my/path.spec.json
            let potentialSpecPath = `${dir}/${internalPath}`;

            if (__fs.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }

            // try from my/path => my/path/path.spec.json
            const parts = internalDotPath.split('.'),
                lastDotPart = parts[parts.length - 1];

            potentialSpecPath = `${dir}/${internalPath.replace(
                '.spec.json',
                `/${lastDotPart}.spec.json`,
            )}`;

            if (__fs.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
        }

        if (!finalSpecFilePath) {
            throw new Error(
                `[SSpecs] The requested dotpath spec "${specDotPath}" does not resolve to any existing spec file...`,
            );
        }

        // read the spec file
        let specJson = JSON.parse(
            __fs.readFileSync(finalSpecFilePath).toString(),
        );

        // traverse each values to resolve them if needed
        specJson = __deepMap(specJson, ({ object, prop, value, path }) => {
            return this.resolve(value, object);
        });

        specJson = __deepMap(
            specJson,
            ({ object, prop, value, path }) => {
                if (prop === 'extends') {
                    if (value.startsWith('@')) {
                        throw new Error(
                            `The "extends": "${value}" property cannot start with an "@"`,
                        );
                    }
                    let extendsJson = this.read(value);
                    const newObj = __deepMerge(extendsJson, object);
                    Object.assign(object, newObj);
                }
                return value;
            },
            {
                clone: false,
            },
        );

        // if we have an internal spec dotpath
        if (internalSpecDotPath) {
            return __get(specJson, internalSpecDotPath);
        }

        // add metas about the spec file read
        specJson.metas = {
            dotpath: specDotPath,
            path: finalSpecFilePath,
            settings: finalSettings,
        };

        // return the getted specJson
        return specJson;
    }

    /**
     * @name            list
     * @type            Function
     * @platform        php
     * @status          beta
     *
     * This method allows you to list all the available spec files inside a particular namespace(s), or simply all.
     *
     * @param       {String}        $namespaces         An array of namespaces to list the specs from. If not set, list all the specs from all the namespaces
     * @return      {Any}                               A list of all the specs files available
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    list(namespaces = []) {
        let results: ISSpecsListResult[] = [],
            definedNamespaces = this.settings.namespaces,
            definedNamespacesKeys: string[] = Object.keys(definedNamespaces),
            finalNamespaces: string[] = [];

        if (!namespaces.length) {
            finalNamespaces = definedNamespacesKeys;
        } else {
            definedNamespacesKeys.forEach((definedNamespace) => {
                namespaces.forEach((passedNamespace) => {
                    if (definedNamespace.startsWith(passedNamespace)) {
                        if (!finalNamespaces.includes(definedNamespace)) {
                            finalNamespaces.push(definedNamespace);
                        }
                    }
                });
            });
        }

        finalNamespaces.forEach((namespace) => {
            const folders = definedNamespaces[namespace];

            folders.forEach((folder) => {
                const specFiles = __glob.sync(`${folder}/**/*.spec.json`);

                specFiles.forEach((specFilePath) => {
                    const filename = __path.basename(specFilePath),
                        name = filename.replace('.spec.json', ''),
                        dotpath = `${namespace}${specFilePath
                            .replace('.spec.json', '')
                            .replace(folder, '')
                            .split('/')
                            .join('.')}`;

                    results.push({
                        name,
                        filename,
                        dotpath,
                        namespace,
                        path: specFilePath,
                        dir: __path.dirname(specFilePath),
                        read: (settings: Partial<ISSpecsReadSettings>) => {
                            return this.read(dotpath, settings ?? {});
                        },
                    });
                });
            });
        });

        return results;
    }

    /**
     * @name            resolve
     * @type            Function
     * @status          beta
     *
     * This method allows you to pass a specJson object and resolve all the "@..." values in it
     *
     * @param       {Any}           specJson            The specJson to resolve
     * @return      {Any}                               The resolved specJson object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    resolve(value: any, specJson: any): any {
        let newValue = value;

        if (typeof value === 'string') {
            if (value.startsWith('@this')) {
                let internalDotPath = value.replace('@this', '');
                newValue = __get(specJson, internalDotPath);
                if (Array.isArray(newValue) || __isPlainObject(newValue)) {
                    newValue = __deepMap(newValue, ({ value: v }) => {
                        return this.resolve(v, newValue);
                    });
                }
            } else if (value.startsWith('@config.')) {
                const dotPath = value.replace('@config.', ''),
                    config = __SSugarConfig.get(dotPath);
                newValue = config;
            } else if (value.startsWith('@')) {
                const dotPath = value.replace('@', ''),
                    spec = this.read(dotPath);
                newValue = spec;
            }
        }
        return newValue;
    }
}
