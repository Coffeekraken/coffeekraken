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
const getGlob_1 = __importDefault(require("../object/getGlob"));
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
        // need to be before the instanciation of the
        // descriptorResult for references reasons... to check when have time
        const valuesObjToProcess = {}, finalValuesObj = {};
        // initialize the descriptor result instance
        this._descriptorResult = new SDescriptorResult_1.default(this, finalValuesObj, Object.assign({}, settings));
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
            Object.keys(settings.rules).forEach((propName) => {
                const ruleObj = get_1.default(settings.rules, propName);
                if (glob_1.default(propName)) {
                    const globPropValue = getGlob_1.default(value, `${propName}.*`, {
                        deepize: false
                    });
                    if (Object.keys(globPropValue).length) {
                        Object.keys(globPropValue).forEach((propName) => {
                            valuesObjToProcess[propName] = globPropValue[propName];
                            settings.rules[propName] = ruleObj;
                        });
                    }
                }
                else {
                    valuesObjToProcess[propName] = get_1.default(value, propName);
                }
            });
            Object.keys(valuesObjToProcess).forEach((propName) => {
                const ruleObj = get_1.default(settings.rules, propName);
                // complete
                if (get_1.default(valuesObjToProcess, propName) === undefined &&
                    settings.complete &&
                    ruleObj.default !== undefined) {
                    set_1.default(valuesObjToProcess, propName, ruleObj.default);
                }
                // interface
                if (ruleObj.interface !== undefined) {
                    const interfaceValue = get_1.default(valuesObjToProcess, propName);
                    const interfaceRes = ruleObj.interface.apply(interfaceValue || {}, {
                        complete: true,
                        throw: false
                    });
                    if (interfaceRes.hasIssues()) {
                        console.log(interfaceRes.toString());
                    }
                    else {
                        set_1.default(valuesObjToProcess, propName, interfaceRes.value);
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
            throw `Sorry but the support for values other than objects has not been integrated for not...`;
            // validate the object property
            // const validationResult = this._validate(
            //   value,
            //   undefined,
            //   undefined,
            //   settings
            // );
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
                if (ruleObj.accept && ofType_1.default(value, ruleObj.accept) !== true)
                    return;
                const ruleResult = ruleObj.apply(value, params, ruleSettings, Object.assign(Object.assign({}, settings), { name: `${settings.name}.${propName}` }));
                if (ruleResult === true)
                    return value;
                const obj = ruleResult === false ? {} : ruleResult;
                obj.__ruleObj = ruleObj;
                obj.__propName = propName;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFHViwwREFBc0M7QUFDdEMsNkRBQXVDO0FBQ3ZDLDRFQUFzRDtBQUN0RCx3REFBa0M7QUFDbEMsc0RBQWtDO0FBQ2xDLGdFQUEwQztBQUUxQyx3REFBa0M7QUFDbEMsb0VBQThDO0FBNkY5QyxNQUFNLFdBQVc7SUFpR2Y7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUErQjtRQUN6QyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDaEQsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtZQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtZQUNuQyxJQUFJLEVBQUUsUUFBUTtZQUNkLFlBQVksRUFBRSxLQUFLO1lBQ25CLGtCQUFrQixFQUFFLEtBQUs7WUFDekIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsSUFBSTtZQUNkLE9BQU8sRUFBRSxLQUFLO1NBQ2YsRUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDekIsUUFBUSxDQUNULENBQUM7SUFDSixDQUFDO0lBL0NEOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBc0I7UUFDeEMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQ3hELE1BQU0sMkZBQTJGLENBQUM7U0FDbkc7UUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFH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