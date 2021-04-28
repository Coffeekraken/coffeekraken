"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const ofType_1 = __importDefault(require("@coffeekraken/sugar/shared/is/ofType"));
const typeof_1 = __importDefault(require("@coffeekraken/sugar/shared/value/typeof"));
const SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
const get_1 = __importDefault(require("@coffeekraken/sugar/shared/object/get"));
const glob_1 = __importDefault(require("@coffeekraken/sugar/shared/is/glob"));
const set_1 = __importDefault(require("@coffeekraken/sugar/shared/object/set"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings) {
        // save the settings
        super(deepMerge_1.default({
            descriptor: {
                rules: {},
                type: 'Object',
                arrayAsValue: false,
                throwOnMissingRule: false,
                throw: false,
                complete: true,
                verbose: false
            }
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
            throw `Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...`;
        }
        this._registeredRules[rule.id] = rule;
    }
    /**
     * @name      descriptorSettings
     * @type      ISDescriptorSettings
     * @get
     *
     * Access the descriptor settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get descriptorSettings() {
        return this._settings.descriptor;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    apply(value, settings) {
        // handle settings
        const set = (deepMerge_1.default(this.descriptorSettings, settings || {}));
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
        if (!ofType_1.default(value, set.type)) {
            throw `Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${typeof_1.default(value)}</cyan>" but only "<green>${set.type}</green>"...`;
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
                if (glob_1.default(propName) && value) {
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
                    valuesObjToProcess[propName] = get_1.default(value, propName);
                }
            });
            Object.keys(valuesObjToProcess).forEach((propName) => {
                const ruleObj = rules[propName];
                // complete
                if (valuesObjToProcess[propName] === undefined &&
                    set.complete &&
                    ruleObj.default !== undefined) {
                    valuesObjToProcess[propName] = ruleObj.default;
                }
                // interface
                if (ruleObj.interface !== undefined) {
                    const interfaceValue = valuesObjToProcess[propName];
                    // _console.log('VAL', valuesObjToProcess[propName], propName);
                    const interfaceRes = ruleObj.interface.apply(interfaceValue || {}, {
                        complete: true,
                        throw: false
                    });
                    if (interfaceRes.hasIssues()) {
                        throw new Error(interfaceRes.toString());
                    }
                    else {
                        valuesObjToProcess[propName] = interfaceRes.value;
                    }
                }
                // validate the property
                const validationResult = this._validate(valuesObjToProcess[propName], propName, ruleObj, set);
                if (validationResult !== undefined && validationResult !== null) {
                    set_1.default(finalValuesObj, propName, validationResult);
                }
            });
        }
        else {
            console.warn(value);
            throw new Error(`You can apply an <yellow>SDescriptor</yellow> only on an Object like value...`);
        }
        if (this._descriptorResult.hasIssues() && set.throw) {
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    _validate(value, propName, rulesObj, settings) {
        if (rulesObj === undefined)
            return value;
        if (rulesObj.required === undefined || rulesObj.required === false) {
            if (value === undefined || value === null)
                return value;
        }
        let resultValue = value;
        // loop on the rules object
        Object.keys(rulesObj).forEach((ruleName) => {
            // do not take care of "default" rule name
            if (ruleName === 'default')
                return;
            const ruleValue = rulesObj[ruleName];
            // make sure we have this rule registered
            if (this.constructor._registeredRules[ruleName] === undefined) {
                if (settings.throwOnMissingRule) {
                    throw `Sorry but you try to validate a value using the "<yellow>${ruleName}</yellow>" rule but this rule is not registered. Here's the available rules:
              - ${Object.keys(this.constructor._registeredRules).join('\n- ')}`;
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
                            newResultValue = [...newResultValue, ...processedValue];
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
        if (ruleResult === true)
            return value;
        else if (ruleResult instanceof Error) {
            const obj = {
                __error: ruleResult,
                __ruleObj: ruleObj,
                __propName: propName
            };
            // @ts-ignore
            this._descriptorResult.add(obj);
            return value;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLWRlc2NyaXB0b3Ivc3JjL3NoYXJlZC9fU0Rlc2NyaXB0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxvRUFBNkM7QUFDN0Msa0ZBQThEO0FBQzlELHFGQUErRDtBQUMvRCw0RUFJNkI7QUFDN0IsZ0ZBQTBEO0FBQzFELDhFQUEwRDtBQUMxRCxnRkFBMEQ7QUFDMUQsNEZBQXNFO0FBd0Z0RSxhQUFhO0FBQ2IsTUFBTSxXQUFZLFNBQVEsaUJBQVE7SUF1RmhDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDN0Msb0JBQW9CO1FBQ3BCLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSxFQUFFO2dCQUNULElBQUksRUFBRSxRQUFRO2dCQUNkLFlBQVksRUFBRSxLQUFLO2dCQUNuQixrQkFBa0IsRUFBRSxLQUFLO2dCQUN6QixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsSUFBSTtnQkFDZCxPQUFPLEVBQUUsS0FBSzthQUNmO1NBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQTlERDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQXNCO1FBQ3hDLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBRTtZQUN4RCxNQUFNLDJGQUEyRixDQUFDO1NBQ25HO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksa0JBQWtC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