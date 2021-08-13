import __SClass from '@coffeekraken/s-class';
import __isOfType from '@coffeekraken/sugar/shared/is/ofType';
import __typeof from '@coffeekraken/sugar/shared/value/typeof';
import __SDescriptorResult from './SDescriptorResult';
import __get from '@coffeekraken/sugar/shared/object/get';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __set from '@coffeekraken/sugar/shared/object/set';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
// @ts-ignore
class SDescriptor extends __SClass {
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
        super(__deepMerge({
            descriptor: {
                rules: {},
                type: 'Object',
                arrayAsValue: false,
                throwOnMissingRule: false,
                complete: true,
            },
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
        const set = __deepMerge(this.descriptorSettings, settings || {});
        // ensure we can apply the descriptor
        if (value === undefined || value === null)
            value = {};
        // need to be before the instanciation of the
        // descriptorResult for references reasons... to check when have time
        const valuesObjToProcess = {}, finalValuesObj = {};
        // initialize the descriptor result instance
        this._descriptorResult = new __SDescriptorResult(this, finalValuesObj, Object.assign({}, set));
        const rules = set.rules;
        // check the passed value type correspond to the descriptor type
        if (!__isOfType(value, set.type)) {
            throw new Error(`Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${__typeof(value)}</cyan>" but only "<green>${set.type}</green>"...`);
        }
        // check the type to validate correctly the value
        if (Array.isArray(value) && !set.arrayAsValue) {
            // loop on each items
            throw new Error(`Sorry but the support for arrays like values has not been integrated for not...`);
            // value.forEach((item) => {});
        }
        else if (typeof value === 'object' && value !== null && value !== undefined) {
            // loop on each object properties
            Object.keys(rules).forEach((propName) => {
                // const ruleObj = rules[propName];
                if (__isGlob(propName) && value) {
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
                    valuesObjToProcess[propName] = __get(value, propName);
                }
            });
            Object.keys(valuesObjToProcess).forEach((propName) => {
                const ruleObj = rules[propName];
                // complete
                if (valuesObjToProcess[propName] === undefined && set.complete && ruleObj.default !== undefined) {
                    valuesObjToProcess[propName] = ruleObj.default;
                }
                // interface
                if (ruleObj.interface !== undefined) {
                    const interfaceValue = valuesObjToProcess[propName];
                    // _console.log('VAL', valuesObjToProcess[propName], propName);
                    valuesObjToProcess[propName] = ruleObj.interface.apply(interfaceValue || {}, {
                        complete: true,
                    });
                }
                // validate the property
                const validationResult = this._validate(valuesObjToProcess[propName], propName, ruleObj, set);
                if (validationResult !== undefined && validationResult !== null) {
                    __set(finalValuesObj, propName, validationResult);
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
                const params = ruleObj.processParams !== undefined ? ruleObj.processParams(ruleValue) : ruleValue;
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
        if (params && params.type && params.type.toLowerCase() === 'boolean' && ruleResult === true) {
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
export default SDescriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sbUJBSU4sTUFBTSxxQkFBcUIsQ0FBQztBQUM3QixPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLFFBQVEsTUFBTSxvQ0FBb0MsQ0FBQztBQUMxRCxPQUFPLEtBQUssTUFBTSx1Q0FBdUMsQ0FBQztBQUMxRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQWtGdEUsYUFBYTtBQUNiLE1BQU0sV0FBWSxTQUFRLFFBQVE7SUF5RjlCOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBbUM7UUFDM0Msb0JBQW9CO1FBQ3BCLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxVQUFVLEVBQUU7Z0JBQ1IsS0FBSyxFQUFFLEVBQUU7Z0JBQ1QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGtCQUFrQixFQUFFLEtBQUs7Z0JBQ3pCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztJQUNOLENBQUM7SUE5REQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFzQjtRQUN0QyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDdEQsTUFBTSxJQUFJLEtBQUssQ0FDWCwyRkFBMkYsQ0FDOUYsQ0FBQztTQUNMO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxF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