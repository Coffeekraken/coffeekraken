// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/ofType", "../value/typeof", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var ofType_1 = __importDefault(require("../is/ofType"));
    var typeof_2 = __importDefault(require("../value/typeof"));
    var deepMerge_2 = __importDefault(require("../object/deepMerge"));
    /**
     * @name                SDescriptor
     * @namespace           sugar.js.descriptor
     * @type                Class
     *
     * This class is the main one that MUST be used as parent one
     * when creating any descriptor like object, string, etc...
     *
     * @param       {ISDescriptorSettings}      settings        An object of setting to configure your descriptor instance
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
    var Cls = (_a = /** @class */ (function () {
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
            function SDescriptor(settings) {
                // save the settings
                this._settings = deepMerge_2.default({
                    arrayAsValue: false,
                    throwOnMissingRule: true
                }, settings);
                // check that the descriptor class has a static "description" property
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
            SDescriptor.registerRule = function (rule) {
                if (rule.id === undefined || typeof rule.id !== 'string') {
                    throw "Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...";
                }
                this._registeredRules[rule.id] = rule;
            };
            /**
             * @name        apply
             * @type        Function
             * @static
             *
             * This static method allows you to apply the descriptor on a value
             * withour having to instanciate a new descriptor.
             *
             * @param       {Any}         value         The value on which you want to apply the descriptor
             * @param       {ISDescriptorSettings}      [settings={}]       An object of settings to configure your apply process
             * @return      {ISDescriptorResultObj|true}            true if the descriptor does not have found any issue(s), an ISDescriptorResultObj object if not
             *
             * @since       2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com>
             */
            SDescriptor.apply = function (value, settings) {
                var instance = new this(settings);
                return instance.apply(value);
            };
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
            SDescriptor.prototype.apply = function (value, settings) {
                var _this = this;
                // handle settings
                settings = deepMerge_2.default(this._settings, settings);
                // check the passed value type correspond to the descriptor type
                if (!ofType_1.default(value, this.constructor.type)) {
                    throw "Sorry but this descriptor \"<yellow>" + this.constructor.name + "</yellow>\" does not accept values of type \"<cyan>" + typeof_2.default(value) + "</cyan>\" but only \"<green>" + this.constructor.type + "</green>\"...";
                }
                // check the type to validate correctly the value
                if (Array.isArray(value) && !settings.arrayAsValue) {
                    // loop on each items
                    value.forEach(function (item) { });
                }
                else if (typeof value === 'object') {
                    // loop on each object properties
                    Object.keys(value).forEach(function (propName) {
                        var propValue = value[propName];
                        // validate the object property
                        _this._validate(propValue, propName, settings);
                    });
                }
                else {
                    // validate the passed value
                }
                return true;
            };
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
            SDescriptor.prototype._validate = function (value, propName, settings) {
                var _this = this;
                // check if we have a propName, meaning that we are validating an object
                var rules = this.constructor.rules;
                if (propName !== undefined) {
                    if (this.constructor.rules[propName] === undefined)
                        return true;
                    rules = this.constructor.rules[propName];
                }
                // loop on the rules object
                Object.keys(rules).forEach(function (ruleName) {
                    var ruleValue = rules[ruleName];
                    // make sure we have this rule registered
                    if (_this.constructor._registeredRules[ruleName] === undefined) {
                        if (settings.throwOnMissingRule) {
                            throw "Sorry but you try to validate a value using the \"<yellow>" + ruleName + "</yellow>\" rule but this rule is not registered. Here's the available rules:\n          - " + Object.keys(_this.constructor._registeredRules).join('\n- ');
                        }
                    }
                    else {
                        console.log('validte', ruleName);
                    }
                });
            };
            return SDescriptor;
        }()),
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
        _a._registeredRules = {},
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
        _a.rules = {},
        /**
         * @name      type
         * @type      String
         * @static
         * @default     Object
         *
         * Specify the type of the values that this descriptor is made for.
         * Can be:
         * - String|Array<String>
         * - Object
         * - Number
         * - Integer
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        _a.type = 'Object',
        _a);
    return Cls;
});
