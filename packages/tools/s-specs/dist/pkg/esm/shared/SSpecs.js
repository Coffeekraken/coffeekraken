import __SClass from '@coffeekraken/s-class';
import __SValidator from '@coffeekraken/s-validator';
import { __parseArgs } from '@coffeekraken/sugar/cli';
import { __deepMerge, __get, __set } from '@coffeekraken/sugar/object';
export default class SSpecsBase extends __SClass {
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
        // const specs = new SSpecs(settings);
        // specJson = specs.resolve(specJson);
        // return the new spec json
        return specJson;
    }
    static validate(values, specs) {
        var _a;
        const validator = new __SValidator();
        if (typeof values === 'string') {
            values = __parseArgs(values);
        }
        const errors = {};
        function processProps(props, path) {
            for (let [prop, propObj] of Object.entries(props)) {
                if (propObj.props) {
                    processProps(propObj.props, [...path, prop, 'props']);
                }
                else {
                    const valueToValidate = __get(values, [
                        ...path.filter((l) => l !== 'props'),
                        prop,
                    ]);
                    console.log('to', valueToValidate);
                    const result = validator.validate(valueToValidate, {
                        type: propObj.type,
                        min: 100,
                    });
                    console.log('rrrrr', result);
                    console.log('Proces', prop);
                }
            }
        }
        processProps((_a = specs.props) !== null && _a !== void 0 ? _a : {}, []);
        // for (let [prop, propObj] of Object.entries(spec?.props ?? {})) {
        //     if (propObj.props) {
        //     }
        // }
        // const result = validator.validate(what, {});
        // console.log('validate', result);
    }
    static apply(what, spec) {
        if (!spec) {
            throw new Error(`[SSpecs.apply] You MUST specify a valid spec object as the second parameter...`);
        }
        if (typeof what === 'string') {
            what = __parseArgs(what);
        }
        const specsData = __deepMerge(this.extractDefaults(spec), what);
        // @TODO            implement the "required" checks, etc...
        return specsData;
    }
    static extractDefaults(specs) {
        var _a;
        let defaults = {};
        function processProps(props, path) {
            for (let [prop, propObj] of Object.entries(props)) {
                if (propObj.default !== undefined) {
                    __set(defaults, [...path, prop].filter((l) => l !== 'props'), propObj.default);
                }
                if (propObj.props) {
                    processProps(propObj.props, [...path, prop, 'props']);
                }
            }
        }
        processProps((_a = specs.props) !== null && _a !== void 0 ? _a : {}, []);
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
    constructor(settings) {
        super(__deepMerge({}, settings !== null && settings !== void 0 ? settings : {}));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLEtBQUssRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQXlDdkUsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQUM1Qzs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FDaEIsR0FBaUIsRUFDakIsV0FBcUMsRUFBRTs7UUFFdkMsSUFBSSxRQUFRLEdBQUc7WUFDWCxLQUFLLEVBQUUsR0FBRyxDQUFDLEtBQUs7WUFDaEIsV0FBVyxFQUFFLEdBQUcsQ0FBQyxXQUFXO1lBQzVCLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQztRQUVGLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUN0RCxNQUFNLGFBQWEsR0FBRyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7Z0JBQzNDLENBQUMsQ0FBQyxJQUFJO2dCQUNOLENBQUMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUM7b0JBQzNCLENBQUMsQ0FBQyxJQUFJO29CQUNOLENBQUMsQ0FBQyxFQUFFLENBQUM7WUFFVCxJQUFJLElBQUksQ0FBQztZQUNULElBQUksS0FBSyxDQUFDLE1BQU0sSUFBSSxLQUFLLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRTtnQkFDckMsSUFBSSxHQUFHLFFBQVEsQ0FBQzthQUNuQjtZQUVELFFBQVEsS0FBSyxD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