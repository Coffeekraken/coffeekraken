import __SClass from '@coffeekraken/s-class';
import __SSugarConfig from '@coffeekraken/s-sugar-config';
import { __isPlainObject } from '@coffeekraken/sugar/is';
import { __deepMap, __deepMerge, __get } from '@coffeekraken/sugar/object';
import { __packageRootDir } from '@coffeekraken/sugar/path';
import __fs from 'fs';
import __glob from 'glob';
import __path from 'path';
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
    static fromInterface(int, settings = {}) {
        var _a, _b, _c;
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
                        type: type !== null && type !== void 0 ? type : 'Checkbox',
                    };
                    break;
                case 'number':
                    specJson.props[prop] = {
                        type: type !== null && type !== void 0 ? type : 'Number',
                    };
                    break;
                case 'integer':
                    specJson.props[prop] = {
                        type: type !== null && type !== void 0 ? type : 'Integer',
                    };
                    break;
                case 'string':
                    specJson.props[prop] = {
                        type: type !== null && type !== void 0 ? type : 'Text',
                    };
                    break;
                default:
                    specJson.props[prop] = {
                        type: (_a = type !== null && type !== void 0 ? type : value.type) !== null && _a !== void 0 ? _a : 'Text',
                    };
                    break;
            }
            specJson.props[prop] = Object.assign(Object.assign(Object.assign({}, ((_b = specJson.props[prop]) !== null && _b !== void 0 ? _b : {})), ((_c = value.specs) !== null && _c !== void 0 ? _c : {})), { type: `${specJson.props[prop].type}${repeatableStr}`, title: value.title, description: value.description, default: value.default, required: value.required });
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
    /**
     * @name            applyValuesToSpecs
     * @type            Function
     * @status          beta
     * @static
     *
     * This method allows you to apply an object of value directly on a specs object.
     * It will apply each values to the "value" property of each props
     *
     * @param       {SInterface}        int             The SInterface class you want to use for your spec object
     * @return      {Any}                               The requested spec object
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static applyValuesToSpecs(values = {}, specs) {
        specs.values = values;
        // __deepMap(values, ({ object, prop, value, path }) => {
        //     // const valuePath = path
        //     //     .replace(/\.props/gm, '')
        //     //     .split('.')
        //     //     .slice(0, -1)
        //     //     .join('.');
        //     console.log(path);
        //     // const v = __get(values, valuePath);
        //     // if (v !== undefined && !object.props) {
        //     //     object.value = v;
        //     // }
        //     return value;
        // });
        return specs;
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
    constructor(settings) {
        var _a;
        super(__deepMerge({
            read: {},
        }, (_a = __SSugarConfig.get('specs')) !== null && _a !== void 0 ? _a : {}, settings !== null && settings !== void 0 ? settings : {}));
        if (!this.settings.namespaces) {
            throw new Error('[SSpecs] You MUST at least specify some "namespaces" folders to search specs files in...');
        }
        const monorepoRootPath = __packageRootDir(process.cwd(), {
            highest: true,
        });
        for (let [namespace, dirs] of Object.entries(this.settings.namespaces)) {
            this.settings.namespaces[namespace].forEach((dir, i) => {
                if (dir.startsWith('./node_modules')) {
                    this.settings.namespaces[namespace].push(`${monorepoRootPath}${dir.replace(/^\./, ``)}`);
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
     * @param       {String}        specDotPath        A dotpath that point to a json spec file relative to one of the registered "$settings.namespaces" folders. You can then specify an internal dotpath to get a specific value inside the passed file like so "sugar.views.props.attributes:title"
     * @return      {Any}                               The requested spec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(specDotPath, settings) {
        var _a;
        let finalSpecFilePath;
        const finalSettings = __deepMerge(
        // @ts-ignore
        (_a = this.settings.read) !== null && _a !== void 0 ? _a : {}, settings !== null && settings !== void 0 ? settings : {});
        let definedNamespaces = this.settings.namespaces;
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
            throw new Error(`[SSpecs.read] The passed dotpath ${specDotPath}" does not correspond to any registered namespaces which are: ${definesNamespacesKeys.join('\n')}`);
        }
        let dotPathParts = specDotPath.split(':');
        let specFileDotPath = dotPathParts[0], internalSpecDotPath;
        if (dotPathParts[1]) {
            internalSpecDotPath = dotPathParts[1];
        }
        // compute internal namespace dotpath
        let internalDotPath = specFileDotPath.replace(`${currentNamespace}.`, '');
        let internalPath = `${internalDotPath.split('.').join('/')}.spec.json`;
        // loop on each registered namespaces directories to check if the specDotPath
        // correspond to a file in one of them...
        const dirs = this.settings.namespaces[currentNamespace];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            // direct path my/path => my/path.spec.json
            let potentialSpecPath = `${dir}/${internalPath}`;
            if (__fs.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
            // try from my/path => my/path/path.spec.json
            const parts = internalDotPath.split('.'), lastDotPart = parts[parts.length - 1];
            potentialSpecPath = `${dir}/${internalPath.replace('.spec.json', `/${lastDotPart}.spec.json`)}`;
            if (__fs.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
        }
        if (!finalSpecFilePath) {
            throw new Error(`[SSpecs] The requested dotpath spec "${specDotPath}" does not resolve to any existing spec file...`);
        }
        // read the spec file
        let specJson = JSON.parse(__fs.readFileSync(finalSpecFilePath).toString());
        // traverse each values to resolve them if needed
        specJson = __deepMap(specJson, ({ object, prop, value, path }) => {
            return this.resolve(value, object);
        });
        specJson = __deepMap(specJson, ({ object, prop, value, path }) => {
            if (prop === 'extends') {
                if (value.startsWith('@')) {
                    throw new Error(`The "extends": "${value}" property cannot start with an "@"`);
                }
                let extendsJson = this.read(value);
                const newObj = __deepMerge(extendsJson, object);
                Object.assign(object, newObj);
            }
            return value;
        }, {
            cloneFirst: false,
        });
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
        let results = [], definedNamespaces = this.settings.namespaces, definedNamespacesKeys = Object.keys(definedNamespaces), finalNamespaces = [];
        if (!namespaces.length) {
            finalNamespaces = definedNamespacesKeys;
        }
        else {
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
                    const filename = __path.basename(specFilePath), name = filename.replace('.spec.json', ''), dotpath = `${namespace}${specFilePath
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
                        read: (settings) => {
                            return this.read(dotpath, settings !== null && settings !== void 0 ? settings : {});
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
    resolve(value, specJson) {
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
            }
            else if (value.startsWith('@config.')) {
                const dotPath = value.replace('@config.', ''), config = __SSugarConfig.get(dotPath);
                newValue = config;
            }
            else if (value.startsWith('@')) {
                const dotPath = value.replace('@', ''), spec = this.read(dotPath);
                newValue = spec;
            }
        }
        return newValue;
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sY0FBYyxNQUFNLDhCQUE4QixDQUFDO0FBQzFELE9BQU8sRUFBRSxlQUFlLEVBQUUsTUFBTSx3QkFBd0IsQ0FBQztBQUN6RCxPQUFPLEVBQUUsU0FBUyxFQUFFLFdBQVcsRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUMzRSxPQUFPLEVBQUUsZ0JBQWdCLEVBQUUsTUFBTSwwQkFBMEIsQ0FBQztBQUM1RCxPQUFPLElBQUksTUFBTSxJQUFJLENBQUM7QUFDdEIsT0FBTyxNQUFNLE1BQU0sTUFBTSxDQUFDO0FBQzFCLE9BQU8sTUFBTSxNQUFNLE1BQU0sQ0FBQztBQW1EMUIsTUFBTSxDQUFDLE9BQU8sT0FBTyxNQUFPLFNBQVEsUUFBUTtJQUN4Qzs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FDaEIsR0FBaUIsRUFDakIsV0FBcUMsRUFBRTs7UUFFdkMsSUFBSSxRQUFRLEdBQUc7WUFDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1lBQzVCLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxJQUFJO29CQUNOLENBQUMsQ0FBQyxF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