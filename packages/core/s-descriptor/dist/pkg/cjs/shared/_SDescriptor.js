"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_type_1 = __importDefault(require("@coffeekraken/s-type"));
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
const type_1 = require("@coffeekraken/sugar/type");
const SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
// @ts-ignore
class SDescriptor extends s_class_1.default {
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
        super((0, object_1.__deepMerge)({
            rules: {},
            type: 'Object',
            arrayAsValue: false,
            throwOnMissingRule: false,
            defaults: true,
        }, settings !== null && settings !== void 0 ? settings : {}));
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
        const set = ((0, object_1.__deepMerge)(this.settings, settings || {}));
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
        const typeInstance = new s_type_1.default(set.type);
        if (!typeInstance.is(value)) {
            throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${(0, type_1.__typeOf)(value)}</cyan>" but only "<green>${set.type}</green>"...`);
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
                    valuesObjToProcess[propName] = (0, object_1.__get)(value, propName);
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
                    valuesObjToProcess[propName] = ruleObj.interface.apply(interfaceValue || {}, {});
                }
                // validate the property
                const validationResult = this._validate(valuesObjToProcess[propName], propName, ruleObj, set);
                if (validationResult !== undefined &&
                    validationResult !== null) {
                    (0, object_1.__set)(finalValuesObj, propName, validationResult);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLGtFQUEyQztBQUMzQywrQ0FBa0Q7QUFDbEQsdURBQXVFO0FBQ3ZFLG1EQUFvRDtBQUNwRCw0RUFJNkI7QUE0RTdCLGFBQWE7QUFDYixNQUFNLFdBQVksU0FBUSxpQkFBUTtJQXFEOUI7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFzQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwyRkFBMkYsQ0FDOUYsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDMUMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBd0M7UUFDaEQsb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxJQUFBLG9CQUFXLEVBQ1A7WUFDSSxLQUFLLEVBQUUsRUFBRTtZQUNULElBQUksRUFBRSxRQUFRO1lBQ2QsWUFBWSxFQUFFLEtBQUs7WUFDbkIsa0JBQWtCLEVBQUUsS0FBSztZQUN6QixRQUFRLEVBQUUsSUFBSTtTQUNqQixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7Ozs7O09BZ0JHO0lBQ0gsS0FBSyxDQUNELEtBQVUsRUFDVixRQUF3QztRQUV4QyxrQkFBa0I7UUFDbEIsTUFBTSxHQUFHLEdBQXlCLENBQzlCLElBQUEsb0JBQVcsRUFBQyxJQUFJLENBQUMsUUFBUSxFQUFFLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FDN0MsQ0FBQztRQUVGLHFDQUFxQztR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