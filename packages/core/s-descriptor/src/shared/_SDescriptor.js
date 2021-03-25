var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-class", "@coffeekraken/sugar/shared/is/ofType", "@coffeekraken/sugar/shared/value/typeof", "./SDescriptorResult", "@coffeekraken/sugar/shared/object/get", "@coffeekraken/sugar/shared/is/glob", "@coffeekraken/sugar/shared/object/set", "@coffeekraken/sugar/shared/object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
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
            }, settings || {}));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsb0VBQTZDO0lBQzdDLGtGQUE4RDtJQUM5RCxxRkFBK0Q7SUFDL0QsNEVBSTZCO0lBQzdCLGdGQUEwRDtJQUMxRCw4RUFBMEQ7SUFDMUQsZ0ZBQTBEO0lBQzFELDRGQUFzRTtJQW9GdEUsYUFBYTtJQUNiLE1BQU0sV0FBWSxTQUFRLGlCQUFRO1FBdUZoQzs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFFBQXdDO1lBQ2xELG9CQUFvQjtZQUNwQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsWUFBWSxFQUFFLEtBQUs7b0JBQ25CLGtCQUFrQixFQUFFLEtBQUs7b0JBQ3pCLEtBQUssRUFBRSxLQUFLO29CQUNaLFFBQVEsRUFBRSxJQUFJO29CQUNkLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2FBQ0YsRUFDRCxRQUFRLElBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztRQUNKLENBQUM7UUE5REQ7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0gsTUFBTSxDQUFDLFlBQVksQ0FBQyxJQUFzQjtZQUN4QyxJQUFJLElBQUksQ0FBQyxFQUFFLEtBQUssU0FBUyxJQUFJLE9BQU8sSUFBSSxDQUFDLEVBQUUsS0FBSyxRQUFRLEVBQUU7Z0JBQ3hELE1BQU0sMkZBQTJGLENBQUM7YUFDbkc7WUFDRCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxHQUFHLElBQUksQ0FBQztRQUN4QyxDQUFDO1FBRUQ7Ozs7Ozs7OztXQVNHO1FBQ0gsSUFBSSxrQkFBa0I7WUFDcEIsT0FBYSxJQUFLLENBQUMsU0FBUyxDQUFDLFVBQVUsQ0FBQztRQUMxQyxDQUFDO1FBZ0NEOzs7Ozs7Ozs7Ozs7Ozs7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