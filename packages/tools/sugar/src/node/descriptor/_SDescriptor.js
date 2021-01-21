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
//# sourceMappingURL=_SDescriptor.js.map