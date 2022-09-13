"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const is_1 = require("@coffeekraken/sugar/is");
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
        if (!(0, is_1.__isOfType)(value, set.type)) {
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
                if ((0, is_1.__isGlob)(propName) && value) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLCtDQUE4RDtBQUM5RCw0RkFBc0U7QUFDdEUsZ0ZBQTBEO0FBQzFELGdGQUEwRDtBQUMxRCxxRkFBK0Q7QUFDL0QsNEVBSTZCO0FBa0Y3QixhQUFhO0FBQ2IsTUFBTSxXQUFZLFNBQVEsaUJBQVE7SUEyRTlCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0M7UUFDaEQsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1A7WUFDSSxLQUFLLEVBQUUsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsWUFBWSxFQUFFLEtBQUs7WUFDbkIsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixRQUFRLEVBQUUsSUFBSTtTQUNqQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQTlDRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQXNCO1FBQ3RDLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBRTtZQUN0RCxNQUFNLElBQUksS0FBSyxDQUNYLDJGQUEyRixDQUM5RixDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztJQUMxQyxDQUFDO0lBNEJEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsS0FBSyxDQUNELEtBQVUsRUFDVixRQUF3QztRQUV4QyxrQkFBa0I7UUFDbEIsTUFBTSxHQUFHLEdBQXlCLENBQzlCLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDN0MsQ0FB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