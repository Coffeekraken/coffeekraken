"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_1 = __importDefault(require("fs"));
const glob_1 = __importDefault(require("glob"));
const path_2 = __importDefault(require("path"));
class SSpecs extends s_class_1.default {
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
            specJson = (0, object_1.__deepMerge)(specJson, int._specs);
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
        (0, object_1.__deepMap)(specs.props, ({ object, prop, value, path }) => {
            const valuePath = path
                .replace(/\.props/gm, '')
                .split('.')
                .slice(0, -1)
                .join('.');
            const v = (0, object_1.__get)(values, valuePath);
            if (v !== undefined && !object.props) {
                object.value = v;
            }
            return value;
        });
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
        super((0, object_1.__deepMerge)({
            read: {},
        }, (_a = s_sugar_config_1.default.get('specs')) !== null && _a !== void 0 ? _a : {}, settings !== null && settings !== void 0 ? settings : {}));
        if (!this.settings.namespaces) {
            throw new Error('[SSpecs] You MUST at least specify some "namespaces" folders to search specs files in...');
        }
        const monorepoRootPath = (0, path_1.__packageRootDir)(process.cwd(), {
            highest: true,
        });
        for (let [namespace, dirs] of Object.entries(this.settings.namespaces)) {
            this.settings.namespaces[namespace].forEach((dir, i) => {
                if (dir.startsWith('./node_modules')) {
                    this.settings.namespaces[namespace].push(`${monorepoRootPath}${dir.replace(/^\./, ``)}`);
                }
                if (dir.startsWith('.')) {
                    this.settings.namespaces[namespace][i] =
                        path_2.default.resolve(dir);
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
        const finalSettings = (0, object_1.__deepMerge)(
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
            if (fs_1.default.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
            // try from my/path => my/path/path.spec.json
            const parts = internalDotPath.split('.'), lastDotPart = parts[parts.length - 1];
            potentialSpecPath = `${dir}/${internalPath.replace('.spec.json', `/${lastDotPart}.spec.json`)}`;
            if (fs_1.default.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
        }
        if (!finalSpecFilePath) {
            throw new Error(`[SSpecs] The requested dotpath spec "${specDotPath}" does not resolve to any existing spec file...`);
        }
        // read the spec file
        let specJson = JSON.parse(fs_1.default.readFileSync(finalSpecFilePath).toString());
        // traverse each values to resolve them if needed
        specJson = (0, object_1.__deepMap)(specJson, ({ object, prop, value, path }) => {
            return this.resolve(value, object);
        });
        if (specJson.extends) {
            if (specJson.extends.startsWith('@')) {
                throw new Error(`The "extends": "${specJson.extends}" property cannot start with an "@"`);
            }
            let extendsJson = this.read(specJson.extends);
            specJson = (0, object_1.__deepMerge)(extendsJson, specJson);
        }
        // if we have an internal spec dotpath
        if (internalSpecDotPath) {
            return (0, object_1.__get)(specJson, internalSpecDotPath);
        }
        // load data file if wanted
        if (finalSettings.loadDataFile) {
        }
        // add metas about the spec file read
        specJson.metas = {
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
                const specFiles = glob_1.default.sync(`${folder}/**/*.spec.json`);
                specFiles.forEach((specFilePath) => {
                    const filename = path_2.default.basename(specFilePath), name = filename.replace('.spec.json', ''), dotpath = `${namespace}${specFilePath
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
                        dir: path_2.default.dirname(specFilePath),
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
                newValue = (0, object_1.__get)(specJson, internalDotPath);
                if (Array.isArray(newValue) || (0, is_1.__isPlainObject)(newValue)) {
                    newValue = (0, object_1.__deepMap)(newValue, ({ value: v }) => {
                        return this.resolve(v, newValue);
                    });
                }
            }
            else if (value.startsWith('@config.')) {
                const dotPath = value.replace('@config.', ''), config = s_sugar_config_1.default.get(dotPath);
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
exports.default = SSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCwrQ0FBeUQ7QUFDekQsdURBQTJFO0FBQzNFLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQW1EMUIsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBQ3hDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUNoQixHQUFpQixFQUNqQixXQUFxQyxFQUFFOztRQUV2QyxJQUFJLFFBQVEsR0FBRztZQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVc7WUFDNUIsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVULElBQUksSUFBSSxDQUFDO1lBQ1QsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNyQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25CO1lBRUQsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM5QixLQUFLLFNBQVM7b0JBQ1YsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJ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