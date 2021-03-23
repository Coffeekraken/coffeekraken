"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ofType_1 = __importDefault(require("../is/ofType"));
const typeof_1 = __importDefault(require("../value/typeof"));
const SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
const get_1 = __importDefault(require("../object/get"));
const glob_1 = __importDefault(require("../is/glob"));
const set_1 = __importDefault(require("../object/set"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
class SDescriptor {
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
        this._settings = deepMerge_1.default({
            id: this.constructor.id || this.constructor.name,
            name: this.constructor.name,
            rules: this.constructor.rules || {},
            type: 'Object',
            arrayAsValue: false,
            throwOnMissingRule: false,
            throw: false,
            complete: true,
            verbose: false
        }, this.constructor.settings, settings);
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
     * @name          name
     * @type          String
     * @get
     *
     * Access the descriptor name. Either the value of settings.name, or the constructor name
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    get name() {
        return this._settings.name !== undefined
            ? this._settings.name
            : this.constructor.name;
    }
    /**
     * @name          id
     * @type          String
     * @get
     *
     * Access the descriptor id. Either the value of settings.name, or the constructor name
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    get id() {
        return this._settings.id !== undefined
            ? this._settings.id
            : this.constructor.id;
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
        settings = deepMerge_1.default(this._settings, settings);
        // ensure we can apply the descriptor
        if (value === undefined || value === null)
            value = {};
        // need to be before the instanciation of the
        // descriptorResult for references reasons... to check when have time
        const valuesObjToProcess = {}, finalValuesObj = {};
        // initialize the descriptor result instance
        this._descriptorResult = new SDescriptorResult_1.default(this, finalValuesObj, Object.assign({}, settings));
        // flatten the rules
        // const rules = __flatten(settings.rules, {
        //   excludeProps: ['default', 'interface'],
        //   keepLastIntact: true
        // });
        const rules = settings.rules;
        // check the passed value type correspond to the descriptor type
        if (!ofType_1.default(value, settings.type)) {
            throw `Sorry but this descriptor "<yellow>${settings.name}</yellow>" does not accept values of type "<cyan>${typeof_1.default(value)}</cyan>" but only "<green>${settings.type}</green>"...`;
        }
        // check the type to validate correctly the value
        if (Array.isArray(value) && !settings.arrayAsValue) {
            // loop on each items
            throw `Sorry but the support for arrays like values has not been integrated for not...`;
            value.forEach((item) => { });
        }
        else if (typeof value === 'object' &&
            value !== null &&
            value !== undefined) {
            // loop on each object properties
            Object.keys(rules).forEach((propName) => {
                const ruleObj = rules[propName];
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
                    settings.complete &&
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
                        console.log(interfaceRes.toString());
                    }
                    else {
                        valuesObjToProcess[propName] = interfaceRes.value;
                    }
                }
                // validate the property
                const validationResult = this._validate(valuesObjToProcess[propName], propName, ruleObj, settings);
                if (validationResult !== undefined && validationResult !== null) {
                    set_1.default(finalValuesObj, propName, validationResult);
                }
            });
        }
        else {
            _console.warn(value);
            throw new Error(`You can apply an <yellow>SDescriptor</yellow> only on an Object like value...`);
        }
        // if (this._descriptorResult.hasIssues() && settings.throw) {
        //   throw this._descriptorResult.toString();
        // }
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
                const ruleResult = ruleObj.apply(value, params, ruleSettings, Object.assign(Object.assign({}, settings), { name: `${settings.name}.${propName}` }));
                if (propName === 'input') {
                    _console.log('res', ruleResult);
                }
                if (ruleResult === true)
                    return value;
                else if (ruleResult instanceof Error) {
                    console.log('ERROR', ruleResult);
                    const obj = ruleResult === false ? {} : ruleResult;
                    obj.__ruleObj = ruleObj;
                    obj.__propName = propName;
                    // _console.log(obj);
                    this._descriptorResult.add(obj);
                }
                else {
                    return ruleResult;
                }
            }
        });
        // return the value that can have been processed
        return value;
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
/**
 * @name         settings
 * @type         ISDescriptorSettings
 * @static
 *
 * Store the default settings for this particular descriptor class
 *
 * @since         2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com>
 */
SDescriptor.settings = {};
const Cls = SDescriptor;
exports.default = SDescriptor;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDBEQUFzQztBQUN0Qyw2REFBdUM7QUFDdkMsNEVBRzZCO0FBQzdCLHdEQUFrQztBQUNsQyxzREFBa0M7QUFFbEMsd0RBQWtDO0FBQ2xDLG9FQUE4QztBQTRGOUMsTUFBTSxXQUFXO0lBaUdmOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBK0I7UUFDekMsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQ2hELElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDM0IsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxJQUFJLEVBQUU7WUFDbkMsSUFBSSxFQUFFLFFBQVE7WUFDZCxZQUFZLEVBQUUsS0FBSztZQUNuQixrQkFBa0IsRUFBRSxLQUFLO1lBQ3pCLEtBQUssRUFBRSxLQUFLO1lBQ1osUUFBUSxFQUFFLElBQUk7WUFDZCxPQUFPLEVBQUUsS0FBSztTQUNmLEVBQ0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQ3pCLFFBQVEsQ0FDVCxDQUFDO0lBQ0osQ0FBQztJQS9DRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQXNCO1FBQ3hDLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBRTtZQUN4RCxNQUFNLDJGQUEyRixDQUFDO1NBQ25HO1FBQ0QsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxJQUFJLENBQUM7SUFDeEMsQ0FBQztJ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