"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const glob_1 = __importDefault(require("@coffeekraken/sugar/shared/is/glob"));
const ofType_1 = __importDefault(require("@coffeekraken/sugar/shared/is/ofType"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const typeof_1 = __importDefault(require("@coffeekraken/sugar/shared/value/typeof"));
const SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
// @ts-ignore
class SDescriptor extends s_class_1.default {
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        // save the settings
        super((0, deepMerge_1.default)({
            rules: {},
            type: 'Object',
            arrayAsValue: false,
            throwOnMissingRule: false,
            defaults: true,
        }, settings !== null && settings !== void 0 ? settings : {}));
    }
    /**
     * @name      registerRule
     * @type      Function
     * @static
     *
     * This static method allows you to register a new rule
     * by passing a valid ISDescriptorRule object
     *
     * @param     {ISDescriptorRule}        rule        The rule object to register
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    static registerRule(rule) {
        if (rule.id === undefined || typeof rule.id !== 'string') {
            throw new Error(`Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`);
        }
        this._registeredRules[rule.id] = rule;
    }
    /**
     * @name          apply
     * @type          Function
     *
     * This method simply apply the descriptor instance on the passed value.
     * The value can be anything depending on the descriptor you use.
     * When you pass an Array, by default it will apply the descriptor on
     * each array items. If you don't want this behavior and the Array passed has to be
     * treated as a single value, pass the "arrayAsValue" setting to true
     *
     * @param       {Any}       value         The value to apply the descriptor on
     * @param       {ISDescriptorSettings}        [settings={}]       An object of settings to configure your descriptor. These settings will override the base ones passed in the constructor
     * @return      {ISDescriptorResultObj|true}           Will return true if all is ok, and an object describing the issue if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    apply(value, settings) {
        // handle settings
        const set = ((0, deepMerge_1.default)(this.settings, settings || {}));
        // ensure we can apply the descriptor
        if (value === undefined || value === null)
            value = {};
        // need to be before the instanciation of the
        // descriptorResult for references reasons... to check when have time
        const valuesObjToProcess = {}, finalValuesObj = {};
        // initialize the descriptor result instance
        this._descriptorResult = new SDescriptorResult_1.default(this, finalValuesObj, Object.assign({}, set));
        const rules = set.rules;
        // check the passed value type correspond to the descriptor type
        if (!(0, ofType_1.default)(value, set.type)) {
            throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${(0, typeof_1.default)(value)}</cyan>" but only "<green>${set.type}</green>"...`);
        }
        // check the type to validate correctly the value
        if (Array.isArray(value) && !set.arrayAsValue) {
            // loop on each items
            throw new Error(`Sorry but the support for arrays like values has not been integrated for not...`);
            // value.forEach((item) => {});
        }
        else if (typeof value === 'object' &&
            value !== null &&
            value !== undefined) {
            // loop on each object properties
            Object.keys(rules).forEach((propName) => {
                // const ruleObj = rules[propName];
                if ((0, glob_1.default)(propName) && value) {
                    // const globPropValue = __getGlob(value, `${propName}.*`, {
                    //   deepize: false
                    // });
                    // if (Object.keys(globPropValue).length) {
                    //   Object.keys(globPropValue).forEach((propName) => {
                    //     valuesObjToProcess[propName] = globPropValue[propName];
                    //     rules[propName] = ruleObj;
                    //   });
                    // }
                }
                else {
                    valuesObjToProcess[propName] = (0, get_1.default)(value, propName);
                }
            });
            Object.keys(valuesObjToProcess).forEach((propName) => {
                const ruleObj = rules[propName];
                // complete
                if (valuesObjToProcess[propName] === undefined &&
                    set.defaults &&
                    ruleObj.default !== undefined) {
                    valuesObjToProcess[propName] = ruleObj.default;
                }
                // interface
                if (ruleObj.interface !== undefined) {
                    const interfaceValue = valuesObjToProcess[propName];
                    // _console.log('VAL', valuesObjToProcess[propName], propName);
                    valuesObjToProcess[propName] = ruleObj.interface.apply(interfaceValue || {}, {});
                }
                // validate the property
                const validationResult = this._validate(valuesObjToProcess[propName], propName, ruleObj, set);
                if (validationResult !== undefined &&
                    validationResult !== null) {
                    (0, set_1.default)(finalValuesObj, propName, validationResult);
                }
            });
        }
        else {
            console.warn(value);
            throw new Error(`You can apply an <yellow>SDescriptor</yellow> only on an Object like value...`);
        }
        if (this._descriptorResult.hasIssues()) {
            throw new Error(this._descriptorResult.toString());
        }
        return this._descriptorResult;
    }
    /**
     * @name          _validate
     * @type          Function
     * @private
     *
     * This method take a value and validate it using the defined rules
     *
     * @param       {Any}       value       The value to validate
     * @return      {ISDescriptionValidationResult|true}        true if the validation has been made correctly, an object describing the issue if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    _validate(value, propName, rulesObj, settings) {
        if (rulesObj === undefined)
            return value;
        if (rulesObj.required === undefined || rulesObj.required === false) {
            if (value === undefined || value === null)
                return value;
        }
        let rulesNamesInOrder = Object.keys(rulesObj).filter((l) => l !== 'default');
        rulesNamesInOrder = rulesNamesInOrder
            .sort((a, b) => {
            const objA = this.constructor._registeredRules[a];
            const objB = this.constructor._registeredRules[b];
            if (!objA)
                return -1;
            if (!objB)
                return 1;
            if (objA.priority === undefined)
                objA.priority = 9999999999;
            if (objB.priority === undefined)
                objB.priority = 9999999999;
            return objA.priotity - objB.priority;
        })
            .reverse();
        let resultValue = value;
        // loop on the rules object
        rulesNamesInOrder.forEach((ruleName) => {
            const ruleValue = rulesObj[ruleName];
            // make sure we have this rule registered
            if (this.constructor._registeredRules[ruleName] === undefined) {
                if (settings.throwOnMissingRule) {
                    throw new Error(`Sorry but you try to validate a value using the "<yellow>${ruleName}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys(this.constructor._registeredRules).join('\n- ')}`);
                }
            }
            else {
                const ruleObj = this.constructor._registeredRules[ruleName];
                const params = ruleObj.processParams !== undefined
                    ? ruleObj.processParams(ruleValue)
                    : ruleValue;
                const ruleSettings = ruleObj.settings !== undefined ? ruleObj.settings : {};
                // check if the rule accept this type of value
                // _console.log('AAA', propName, value, params);
                // if (ruleObj.accept && __isOfType(value, ruleObj.accept) !== true)
                //   return;
                // console.log('CC', propName, value, params);
                if (ruleSettings.mapOnArray && Array.isArray(resultValue)) {
                    let newResultValue = [];
                    resultValue.forEach((v) => {
                        const processedValue = this._processRule(v, ruleObj, propName, params, ruleSettings, settings);
                        if (Array.isArray(processedValue)) {
                            newResultValue = [
                                ...newResultValue,
                                ...processedValue,
                            ];
                        }
                        else {
                            newResultValue.push(processedValue);
                        }
                    });
                    resultValue = newResultValue;
                }
                else {
                    const processedValue = this._processRule(resultValue, ruleObj, propName, params, ruleSettings, settings);
                    resultValue = processedValue;
                }
            }
        });
        // return the value that can have been processed
        return resultValue;
    }
    _processRule(value, ruleObj, propName, params, ruleSettings, settings) {
        const ruleResult = ruleObj.apply(value, params, ruleSettings, Object.assign(Object.assign({}, settings), { propName, name: `${settings.name}.${propName}` }));
        if (params &&
            params.type &&
            params.type.toLowerCase() === 'boolean' &&
            ruleResult === true) {
            return true;
        }
        if (ruleResult instanceof Error) {
            const obj = {
                __error: ruleResult,
                __ruleObj: ruleObj,
                __propName: propName,
            };
            if (this._descriptorResult) {
                this._descriptorResult.add(obj);
                throw new Error(this._descriptorResult.toString());
            }
        }
        else {
            return ruleResult;
        }
    }
}
/**
 * @name      _registeredRules
 * @type      Object
 * @static
 *
 * Store the registered _registeredRules into a simple object
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
SDescriptor._registeredRules = {};
/**
 * @name      rules
 * @type      Object
 * @static
 *
 * Store the registered rules into a simple object
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
SDescriptor.rules = {};
/**
 * @name      type
 * @type      String
 * @static
 * @default     Object
 *
 * Specify the type of the values that this descriptor is made for.
 * Can be:
 *
 * @todo      check utility of this property
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
SDescriptor.type = 'Object';
exports.default = SDescriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDhFQUEwRDtBQUMxRCxrRkFBOEQ7QUFDOUQsNEZBQXNFO0FBQ3RFLGdGQUEwRDtBQUMxRCxnRkFBMEQ7QUFDMUQscUZBQStEO0FBQy9ELDRFQUk2QjtBQWtGN0IsYUFBYTtBQUNiLE1BQU0sV0FBWSxTQUFRLGlCQUFRO0lBMkU5Qjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXdDO1FBQ2hELG9CQUFvQjtRQUNwQixLQUFLLENBQ0QsSUFBQSxtQkFBVyxFQUNQO1lBQ0ksS0FBSyxFQUFFLEVBQUU7WUFDVCxJQUFJLEVBQUUsUUFBUTtZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsUUFBUSxFQUFFLElBQUk7U0FDakIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUE5Q0Q7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFzQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwyRkFBMkYsQ0FDOUYsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQTRCRDs7Ozs7Ozs7Ozs7Ozs7OztPQWdCRztJQUNILEtBQUssQ0FDRCxLQUFVLEVBQ1YsUUFBd0M7UUFFeEMsa0JBQWtCO1FBQ2xCLE1BQU0sR0FBRyxHQUF5QixDQUM5QixJQUFBLG1CQUFXLEVBQUMsSUFBSSxDQUFDLFFBQVEsRUFBRSxRQUFRLElBQUksRUFBRSxD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