"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const fs_1 = require("@coffeekraken/sugar/fs");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const path_1 = require("@coffeekraken/sugar/path");
const fs_2 = __importDefault(require("fs"));
const __glob = __importStar(require("glob"));
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
        super((0, object_1.__deepMerge)({
            read: {
                metas: true,
                models: true,
            },
        }, (0, object_1.__toPlainObject)((_a = s_sugar_config_1.default.get('specs')) !== null && _a !== void 0 ? _a : {}), settings !== null && settings !== void 0 ? settings : {}));
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
        const finalSettings = (0, object_1.__deepMerge)(
        // @ts-ignore
        this.settings.read, settings);
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
        const dirs = this.settings.namespaces[currentNamespace];
        for (let i = 0; i < dirs.length; i++) {
            const dir = dirs[i];
            // direct path my/path => my/path.spec.json
            let potentialSpecPath = `${dir}/${internalPath}`;
            if (fs_2.default.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
            // try from my/path => my/path/path.spec.json
            const parts = internalDotPath.split('.'), lastDotPart = parts[parts.length - 1];
            potentialSpecPath = `${dir}/${internalPath.replace('.spec.json', `/${lastDotPart}.spec.json`)}`;
            if (fs_2.default.existsSync(potentialSpecPath)) {
                finalSpecFilePath = potentialSpecPath;
                break;
            }
        }
        if (!finalSpecFilePath) {
            throw new Error(`[SSpecs] The requested dotpath spec "${specDotPath}" does not resolve to any existing spec file...`);
        }
        const specName = finalSpecFilePath
            .split('/')
            .pop()
            .replace('.spec.json', '');
        // read the spec file
        let specJson = JSON.parse(fs_2.default.readFileSync(finalSpecFilePath).toString());
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
        if (fs_2.default.existsSync(potentialPreviewUrl) && this.settings.previewUrl) {
            specJson.preview = this.settings.previewUrl({
                path: potentialPreviewUrl,
                name: specName,
                specs: internalDotPath,
                specsObj: specJson,
            });
        }
        // if we have an internal spec dotpath
        if (internalSpecDotPath) {
            return (0, object_1.__get)(specJson, internalSpecDotPath);
        }
        if (finalSettings.models) {
            const folderPath = finalSpecFilePath
                .split('/')
                .slice(0, -1)
                .join('/'), glob = `${folderPath}/*.${specName}.model.json`, files = __glob.sync(glob);
            if (files === null || files === void 0 ? void 0 : files.length) {
                specJson.models = {};
                files.forEach((filePath) => {
                    // read the model json
                    const modelJson = (0, fs_1.__readJsonSync)(filePath), fileName = filePath.split('/').pop(), name = fileName === null || fileName === void 0 ? void 0 : fileName.replace('.model.json', '');
                    // handle potential "preview.png" file alongside the model one
                    const potentialModelPreviewUrl = filePath.replace('.model.json', '.preview.png');
                    if (fs_2.default.existsSync(potentialModelPreviewUrl) &&
                        this.settings.previewUrl) {
                        modelJson.preview = this.settings.previewUrl({
                            path: potentialModelPreviewUrl,
                            name,
                            specs: internalDotPath,
                            specsObj: specJson,
                            modelObj: modelJson,
                        });
                    }
                    // add some metas to the model
                    if (finalSettings.metas) {
                        modelJson.metas = {
                            path: filePath,
                            dir: filePath.split('/').slice(0, -1).join('/'),
                            name,
                            specs: specDotPath,
                        };
                    }
                    // set the model in the json
                    specJson.models[name] = modelJson;
                });
            }
        }
        // add metas about the spec file read
        if (finalSettings.metas) {
            specJson.metas = {
                path: finalSpecFilePath,
                dir: finalSpecFilePath.split('/').slice(0, -1).join('/'),
                name: specName,
                specs: internalDotPath,
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
                const specFiles = __glob.sync(`${folder}/**/*.spec.json`);
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
                const dotPath = value.replace('@', ''), spec = this.read(dotPath, Object.assign({ metas: false, models: false }, (settings !== null && settings !== void 0 ? settings : {})));
                newValue = spec;
            }
        }
        return newValue;
    }
}
exports.default = SSpecs;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0Msa0ZBQTBEO0FBQzFELCtDQUF3RDtBQUN4RCwrQ0FBeUQ7QUFDekQsdURBTW9DO0FBQ3BDLG1EQUE0RDtBQUM1RCw0Q0FBc0I7QUFDdEIsNkNBQStCO0FBQy9CLGdEQUEwQjtBQWtFMUIsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBQ3hDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUNoQixHQUFpQixFQUNqQixXQUFxQyxFQUFFOztRQUV2QyxJQUFJLFFBQVEsR0FBRztZQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVc7WUFDNUIsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVULElBQUksSUFBSSxDQUFDO1lBQ1QsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNyQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25CO1lBRUQsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM5QixLQUFL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