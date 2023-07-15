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
const cli_1 = require("@coffeekraken/sugar/cli");
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
    static apply(what, spec) {
        if (!spec) {
            throw new Error(`[SSpecs.apply] You MUST specify a valid spec object as the second parameter...`);
        }
        if (typeof what === 'string') {
            what = (0, cli_1.__parseArgs)(what);
        }
        const specsData = (0, object_1.__deepMerge)(this.extractDefaults(spec), what);
        // @TODO            implement the "required" checks, etc...
        return specsData;
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
                    const modelJson = (0, fs_1.__readJsonSync)(filePath), fileName = filePath.split('/').pop(), name = fileName === null || fileName === void 0 ? void 0 : fileName.replace('.model.json', ''), modelName = name === null || name === void 0 ? void 0 : name.split('/')[0];
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
                    specJson.models[modelName] = modelJson;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFBQSxvRUFBNkM7QUFFN0Msa0ZBQTBEO0FBQzFELGlEQUFzRDtBQUN0RCwrQ0FBd0Q7QUFDeEQsK0NBQXlEO0FBQ3pELHVEQU1vQztBQUNwQyxtREFBNEQ7QUFDNUQsNENBQXNCO0FBQ3RCLDZDQUErQjtBQUMvQixnREFBMEI7QUFrRTFCLE1BQXFCLE1BQU8sU0FBUSxpQkFBUTtJQUN4Qzs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FDaEIsR0FBaUIsRUFDakIsV0FBcUMsRUFBRTs7UUFFdkMsSUFBSSxRQUFRLEdBQUc7WUFDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1lBQzVCLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxJQUFJO29CQUNOLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFVCxJQUFJLElBQUksQ0FBQztZQUNULElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDckMsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUNuQjtZQUVELFFBQVEsS0FBSyxDQUFDLElBQUksQ0FBQyxXQUFXLEVBQUUsRUFB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