import __SClass from '@coffeekraken/s-class';
import __isOfType from '@coffeekraken/sugar/shared/is/ofType';
import __typeof from '@coffeekraken/sugar/shared/value/typeof';
import __SDescriptorResult from './SDescriptorResult';
import __get from '@coffeekraken/sugar/shared/object/get';
import __isGlob from '@coffeekraken/sugar/shared/is/glob';
import __set from '@coffeekraken/sugar/shared/object/set';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
/**
 * @name                SDescriptor
 * @namespace           s-descriptor.shared
 * @type                Class
 * @extends             SClass
 * @status              beta
 *
 * Make a description...
 *
 * @param       {ISDescriptorSettings}      settings        An object of setting to configure your descriptor instance
 *
 * @todo      handle array values
 * @todo      handle not object values
 * @todo      doc
 * @todo      interfaces
 *
 * @example       js
 * import SDescriptor from '@coffeekraken/sugar/js/descriptor/SDescriptor';
 * class MyDescriptor extends SDescriptor {
 *    constructor(settings) {
 *      super(settings);
 *      // do something...
 *    }
 * }
 *
 * @since       2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
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
        const set = (__deepMerge(this.descriptorSettings, settings || {}));
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
            throw `Sorry but this descriptor "<yellow>${this.metas.name}</yellow>" does not accept values of type "<cyan>${__typeof(value)}</cyan>" but only "<green>${set.type}</green>"...`;
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
                    __set(finalValuesObj, propName, validationResult);
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
export default SDescriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sVUFBVSxNQUFNLHNDQUFzQyxDQUFDO0FBQzlELE9BQU8sUUFBUSxNQUFNLHlDQUF5QyxDQUFDO0FBQy9ELE9BQU8sbUJBQW1CLE1BQU0scUJBQXFCLENBQUM7QUFDdEQsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFDMUQsT0FBTyxRQUFRLE1BQU0sb0NBQW9DLENBQUM7QUFDMUQsT0FBTyxLQUFLLE1BQU0sdUNBQXVDLENBQUM7QUFDMUQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFrQnRFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFFSCxhQUFhO0FBQ2IsTUFBTSxXQUFZLFNBQVEsUUFBUTtJQXVGaEM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUFtQztRQUM3QyxvQkFBb0I7UUFDcEIsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLFVBQVUsRUFBRTtnQkFDVixLQUFLLEVBQUUsRUFBRTtnQkFDVCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsa0JBQWtCLEVBQUUsS0FBSztnQkFDekIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7YUFDZjtTQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztJQUNKLENBQUM7SUE5REQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFzQjtRQUN4QyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQUU7WUFDeEQsTUFB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