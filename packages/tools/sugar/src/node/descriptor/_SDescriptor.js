"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const ofType_1 = __importDefault(require("../is/ofType"));
const typeof_1 = __importDefault(require("../value/typeof"));
const SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
const get_1 = __importDefault(require("../object/get"));
const glob_1 = __importDefault(require("../is/glob"));
const flatten_1 = __importDefault(require("../object/flatten"));
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
        const rules = flatten_1.default(settings.rules, {
            excludeProps: ['default', 'interface'],
            keepLastIntact: true
        });
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
            // nativeConsole.log('aa', valuesObjToProcess);
            Object.keys(valuesObjToProcess).forEach((propName) => {
                let ruleObj = rules[propName];
                // complete
                if (valuesObjToProcess[propName] === undefined &&
                    settings.complete &&
                    ruleObj.default !== undefined) {
                    valuesObjToProcess[propName] = ruleObj.default;
                }
                // interface
                if (ruleObj.interface !== undefined) {
                    const interfaceValue = valuesObjToProcess[propName];
                    // nativeConsole.log('VAL', valuesObjToProcess[propName], propName);
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
            nativeConsole.warn(value);
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
                // nativeConsole.log('AAA', propName, value, params);
                if (ruleObj.accept && ofType_1.default(value, ruleObj.accept) !== true)
                    return;
                // console.log('CC', propName, value, params);
                const ruleResult = ruleObj.apply(value, params, ruleSettings, Object.assign(Object.assign({}, settings), { name: `${settings.name}.${propName}` }));
                if (ruleResult === true)
                    return value;
                const obj = ruleResult === false ? {} : ruleResult;
                obj.__ruleObj = ruleObj;
                obj.__propName = propName;
                // nativeConsole.log(obj);
                this._descriptorResult.add(obj);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFHViwwREFBc0M7QUFDdEMsNkRBQXVDO0FBQ3ZDLDRFQUFzRDtBQUN0RCx3REFBa0M7QUFDbEMsc0RBQWtDO0FBRWxDLGdFQUEwQztBQUMxQyx3REFBa0M7QUFDbEMsb0VBQThDO0FBNkY5QyxNQUFNLFdBQVc7SUFpR2Y7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUErQjtRQUN6QyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDaEQsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQyxJQUFJLEVBQUUsUUFBUTtZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2YsRUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDekIsUUFBUSxDQUNULENBQUM7SUFDSixDQUFDO0lBL0NEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBc0I7UUFDeEMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQ3hELE1BQU0sMkZBQTJGLENBQUM7U0FDbkc7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFH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