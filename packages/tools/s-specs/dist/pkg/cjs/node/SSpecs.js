"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const fs_1 = __importDefault(require("fs"));
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
        // resolve the @...
        const specs = new SSpecs(settings);
        specJson = specs.resolve(specJson);
        // return the new spec json
        return specJson;
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
        super((0, object_1.__deepMerge)((_a = s_sugar_config_1.default.get('specs')) !== null && _a !== void 0 ? _a : {}, settings !== null && settings !== void 0 ? settings : {}));
        if (!this.settings.namespaces) {
            throw new Error('[SSpecs] You MUST at least specify some "namespaces" folders to search specs files in...');
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
    read(specDotPath) {
        let finalValue;
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
        let finalSpecFilePath;
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
        specJson = this.resolve(specJson);
        // check if the spec extends another
        if (specJson.extends) {
            if (typeof specJson.extends == 'string' &&
                specJson.extends.slice(0, 1) === '@') {
                throw new Error(`The "extends": "${specJson.extends}" property cannot start with an "@"`);
            }
            let extendsJson = this.read(specJson.extends);
            specJson = (0, object_1.__deepMerge)(extendsJson, specJson);
            delete specJson.extends;
        }
        // if we have an internal spec dotpath
        if (internalSpecDotPath) {
            return (0, object_1.__get)(specJson, internalSpecDotPath);
        }
        // return the getted specJson
        return specJson;
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
    resolve(specJson) {
        // traverse each values to resolve them if needed
        specJson = (0, object_1.__deepMap)(specJson, ({ object, prop, value, path }) => {
            return this._resolve(value, specJson);
        });
        return specJson;
    }
    /**
     * This method take a value (string, boolean, etc...) and try to resolve it
     * if it is something like "@this.props...", or "@sugar.views...", etc...
     */
    _resolve(value, specJson) {
        let newValue = value;
        if (typeof value === 'string') {
            if (value.startsWith('@this')) {
                let internalDotPath = value.replace('@this', '');
                newValue = (0, object_1.__get)(specJson, internalDotPath);
                if (Array.isArray(newValue) || (0, is_1.__isPlainObject)(newValue)) {
                    newValue = (0, object_1.__deepMap)(newValue, ({ value: v }) => {
                        return this._resolve(v, newValue);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCwrQ0FBeUQ7QUFDekQsdURBQTJFO0FBQzNFLDRDQUFzQjtBQXNDdEIsTUFBcUIsTUFBTyxTQUFRLGlCQUFRO0lBQ3hDOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUNoQixHQUFpQixFQUNqQixXQUFxQyxFQUFFOztRQUV2QyxJQUFJLFFBQVEsR0FBRztZQUNYLEtBQUssRUFBRSxHQUFHLENBQUMsS0FBSztZQUNoQixXQUFXLEVBQUUsR0FBRyxDQUFDLFdBQVc7WUFDNUIsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDO1FBRUYsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ3RELE1BQU0sYUFBYSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztnQkFDM0MsQ0FBQyxDQUFDLElBQUk7Z0JBQ04sQ0FBQyxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQztvQkFDM0IsQ0FBQyxDQUFDLElBQUk7b0JBQ04sQ0FBQyxDQUFDLEVBQUUsQ0FBQztZQUVULElBQUksSUFBSSxDQUFDO1lBQ1QsSUFBSSxLQUFLLENBQUMsTUFBTSxJQUFJLEtBQUssQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFO2dCQUNyQyxJQUFJLEdBQUcsUUFBUSxDQUFDO2FBQ25CO1lBRUQsUUFBUSxLQUFLLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUM5QixLQUFLLFNBQVM7b0JBQ1YsUUFBUSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRzt3QkFDbkIsSUFBSSxFQUFFLElBQUksYUFBSixJ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