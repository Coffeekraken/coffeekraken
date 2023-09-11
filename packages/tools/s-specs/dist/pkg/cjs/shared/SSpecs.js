"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_validator_1 = __importDefault(require("@coffeekraken/s-validator"));
const cli_1 = require("@coffeekraken/sugar/cli");
const object_1 = require("@coffeekraken/sugar/object");
class SSpecsBase extends s_class_1.default {
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
        // return the new spec json
        return specJson;
    }
    static validate(values, specs) {
        var _a;
        const validator = new s_validator_1.default();
        if (typeof values === 'string') {
            values = (0, cli_1.__parseArgs)(values);
        }
        const finalResult = {
            valid: true,
            props: {},
        };
        function processProps(props, path) {
            var _a, _b;
            for (let [prop, propObj] of Object.entries(props)) {
                if (propObj.props) {
                    processProps(propObj.props, [...path, prop, 'props']);
                }
                else {
                    const valuePath = [
                        ...path.filter((l) => l !== 'props'),
                        prop,
                    ];
                    const valueToValidate = (0, object_1.__get)(values, valuePath);
                    const result = validator.validate(valueToValidate, Object.assign({ type: ((_a = propObj.type) === null || _a === void 0 ? void 0 : _a.toLowerCase()) !== 'text'
                            ? propObj.type
                            : 'String', required: propObj.required }, ((_b = propObj.rules) !== null && _b !== void 0 ? _b : {})));
                    if (finalResult.valid && !result.valid) {
                        finalResult.valid = false;
                    }
                    finalResult.props[valuePath.join('.')] = result;
                }
            }
        }
        processProps((_a = specs.props) !== null && _a !== void 0 ? _a : {}, []);
        return finalResult;
    }
    static apply(what, spec) {
        if (!spec) {
            throw new Error(`[SSpecs.apply] You MUST specify a valid spec object as the second parameter...`);
        }
        if (typeof what === 'string') {
            what = (0, cli_1.__parseArgs)(what);
        }
        const specsData = (0, object_1.__deepMerge)(this.extractDefaults(spec), what);
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
        super((0, object_1.__deepMerge)({}, settings !== null && settings !== void 0 ? settings : {}));
    }
}
exports.default = SSpecsBase;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRzdDLDRFQUFxRDtBQUNyRCxpREFBc0Q7QUFDdEQsdURBQXVFO0FBOEN2RSxNQUFxQixVQUFXLFNBQVEsaUJBQVE7SUFDNUM7Ozs7Ozs7Ozs7Ozs7T0FhRztJQUNILE1BQU0sQ0FBQyxhQUFhLENBQ2hCLEdBQWlCLEVBQ2pCLFdBQXFDLEVBQUU7O1FBRXZDLElBQUksUUFBUSxHQUFHO1lBQ1gsS0FBSyxFQUFFLEdBQUcsQ0FBQyxLQUFLO1lBQ2hCLFdBQVcsRUFBRSxHQUFHLENBQUMsV0FBVztZQUM1QixLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUM7UUFFRixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsVUFBVSxDQUFDLEVBQUU7WUFDdEQsTUFBTSxhQUFhLEdBQUcsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO2dCQUMzQyxDQUFDLENBQUMsSUFBSTtnQkFDTixDQUFDLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDO29CQUMzQixDQUFDLENBQUMsSUFBSTtvQkFDTixDQUFDLENBQUMsRUFBRSxDQUFDO1lBRVQsSUFBSSxJQUFJLENBQUM7WUFDVCxJQUFJLEtBQUssQ0FBQyxNQUFNLElBQUksS0FBSyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUU7Z0JBQ3JDLElBQUksR0FBRyxRQUFRLENBQUM7YUFDbkI7WUFFRCxRQUFRLEtBQUssQ0FBQyxJQUFJLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQzlCLEtBQUssU0FBUztvQkFDVixRQUFRLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHO3dCQUNuQixJQUFJLEVBQUUsSUFBSSxhQUFKLElBQUksY0FBSixJQUFJ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