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
    static extractDefaults(specs) {
        var _a;
        let defaults = {};
        function processProps(props, path) {
            for (let [prop, propObj] of Object.entries(props)) {
                if (propObj.default !== undefined) {
                    (0, object_1.__set)(defaults, [...path, prop].filter((l) => l !== 'props'), propObj.default);
                }
                if (propObj.props) {
                    processProps(propObj.props, [...path, prop, 'props']);
                }
            }
        }
        processProps((_a = specs.props) !== null && _a !== void 0 ? _a : {}, []);
        if (specs.default) {
            defaults = (0, object_1.__deepMerge)(defaults, specs.default);
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
    constructor(settings) {
        var _a;
        super((0, object_1.__deepMerge)((0, object_1.__toPlainObject)((_a = s_sugar_config_1.default.get('specs')) !== null && _a !== void 0 ? _a : {}), settings !== null && settings !== void 0 ? settings : {}));
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
     * @param       {String}        specDotPath        A dotpath that point to a json spec file relative to one of the registered "$settings.namespaces" folders. You can then specify an internal dotpath to get a specific value inside the passed file like so "sugar.views.props.attributes:title. Can also be an absolute path."
     * @return      {Any}                               The requested spec value
     *
     * @since       2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    read(specDotPath, settings = {}) {
        let finalSpecFilePath;
        // handle absolute file path
        if (specDotPath.startsWith('/')) {
            const fileName = path_2.default.basename(specDotPath), dir = path_2.default.dirname(specDotPath);
            // add the "absolute" namespace in the settings
            if (!settings.namespaces) {
                settings.namespaces = {};
            }
            settings.namespaces.absolute = [dir];
            // call the read method with this time the absolute namespace
            // prefix the fileName with the absolute namespace
            return this.read(`absolute.${fileName.replace('.spec.json', '')}`, settings);
        }
        const finalSettings = (0, object_1.__deepMerge)({
            metas: true,
        }, 
        // @ts-ignore
        this.settings, settings);
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
            throw new Error(`[SSpecs.read] The passed dotpath "<cyan>${specDotPath}</cyan>" does not correspond to any registered namespaces which are: ${definesNamespacesKeys.join('\n')}`);
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
        const dirs = finalSettings.namespaces[currentNamespace];
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
            return this.resolve(value, object, finalSettings);
        });
        specJson = (0, object_1.__deepMap)(specJson, ({ object, prop, value, path }) => {
            if (prop === 'extends') {
                if (value.startsWith('@')) {
                    throw new Error(`The "extends": "${value}" property cannot start with an "@"`);
                }
                let extendsJson = this.read(value, finalSettings);
                const newObj = (0, object_1.__deepMerge)(extendsJson, object);
                Object.assign(object, newObj);
            }
            return value;
        }, {
            clone: false,
        });
        // check if we have a ".preview.png" file alongside the spec file
        const potentialPreviewUrl = finalSpecFilePath.replace('.spec.json', '.preview.png');
        if (fs_1.default.existsSync(potentialPreviewUrl) && this.settings.previewUrl) {
            specJson.preview = this.settings.previewUrl({
                path: potentialPreviewUrl,
                name: internalDotPath.split('.').pop(),
                specs: internalDotPath,
                specsObj: specJson,
            });
        }
        // if we have an internal spec dotpath
        if (internalSpecDotPath) {
            return (0, object_1.__get)(specJson, internalSpecDotPath);
        }
        // add metas about the spec file read
        if (finalSettings.metas) {
            specJson.metas = {
                dotpath: specDotPath,
                path: finalSpecFilePath,
                settings: finalSettings,
            };
        }
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
    resolve(value, specJson, settings) {
        let newValue = value;
        if (typeof value === 'string') {
            if (value.startsWith('@this')) {
                let internalDotPath = value.replace('@this', '');
                newValue = (0, object_1.__get)(specJson, internalDotPath);
                if (Array.isArray(newValue) || (0, is_1.__isPlainObject)(newValue)) {
                    newValue = (0, object_1.__deepMap)(newValue, ({ value: v }) => {
                        return this.resolve(v, newValue, settings);
                    });
                }
            }
            else if (value.startsWith('@config.')) {
                const dotPath = value.replace('@config.', ''), config = s_sugar_config_1.default.get(dotPath);
                newValue = config;
            }
            else if (value.startsWith('@')) {
                const dotPath = value.replace('@', ''), spec = this.read(dotPath, settings);
                newValue = spec;
            }
        }
        return newValue;
    }
}
exports.default = SSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCwrQ0FBeUQ7QUFDekQsdURBTW9DO0FBQ3BDLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsZ0RBQTBCO0FBQzFCLGdEQUEwQjtBQStEMUIsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBQ3hDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUNoQixHQUFpQixFQUNqQixXQUFxQyxFQUFFOztRQUV2QyxJQUFJLFFBQVEsR0FBRztZQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVc7WUFDNUIsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVULElBQUksSUFBSSxDQUFDO1lBQ1QsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNyQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25CO1lBRUQsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM5QixLQUFLLFNBQVM7b0JBQ1YsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJ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