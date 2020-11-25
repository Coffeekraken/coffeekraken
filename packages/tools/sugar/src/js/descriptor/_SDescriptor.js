// @ts-nocheck
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../string/uniqid", "../is/ofType", "../value/typeof", "./SDescriptorResult", "../object/get", "../object/set", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var uniqid_1 = __importDefault(require("../string/uniqid"));
    var ofType_1 = __importDefault(require("../is/ofType"));
    var typeof_1 = __importDefault(require("../value/typeof"));
    var SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
    var get_1 = __importDefault(require("../object/get"));
    var set_1 = __importDefault(require("../object/set"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
    var __descriptorsStack = {};
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
                if (typeof settings === 'string') {
                    // restore from a generated descriptor
                    var descriptorObj = __descriptorsStack[settings];
                    this.constructor.rules = descriptorObj.rules;
                    this.constructor.type = descriptorObj.type || 'Object';
                    this.constructor.settings = descriptorObj.settings || {};
                    settings = {};
                    if (descriptorObj.name)
                        settings.name = descriptorObj.name;
                    if (descriptorObj.id)
                        settings.id = descriptorObj.id;
                }
                // save the settings
                this._settings = deepMerge_1.default({
                    arrayAsValue: false,
                    throwOnMissingRule: false,
                    throwOnError: false,
                    complete: true
                }, this.constructor.settings, settings);
            }
            /**
             * @name       generate
             * @type       Function
             * @static
             *
             * This static method allows you to generate quickly a new descriptor
             * bysimply passing some properties as settings.
             *
             * @param         {ISDescriptorGenerateSettings}      descriptorObj          An object describing your descriptor
             * @return        {Class}                                    A new class that represent your descriptor
             *
             * @setting       {String}        [name=null]             A name for your descriptor
             * @setting       {String}        [id=null]               An id for your descriptor
             * @setting       {ISDescriptorRules}         rules           An object of rules that your descriptor has to apply
             * @setting       {String}        [type='Object']         Specify some type(s) that your descriptor accept to validate
             * @setting       {ISDecriptorSettings}       [settings={}]       An object of settings to configure your descriptor
             *
             * @since         2.0.0
             * @author    Olivier Bossel <olivier.bossel@gmail.com>
             */
            SDescriptor.generate = function (descriptorObj) {
                var id = uniqid_1.default();
                __descriptorsStack[id] = descriptorObj;
                var SGeneratedDescriptor = /** @class */ (function (_super) {
                    __extends(SGeneratedDescriptor, _super);
                    function SGeneratedDescriptor() {
                        return _super !== null && _super.apply(this, arguments) || this;
                    }
                    return SGeneratedDescriptor;
                }(SDescriptor));
                SGeneratedDescriptor._descriptorId = id;
                return SGeneratedDescriptor;
            };
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
                var instance;
                if (this._descriptorId) {
                    instance = new SDescriptor(this._descriptorId);
                }
                else {
                    instance = new this(settings);
                }
                return instance.apply(value, settings);
            };
            Object.defineProperty(SDescriptor.prototype, "name", {
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
                get: function () {
                    return this._settings.name !== undefined
                        ? this._settings.name
                        : this.constructor.name;
                },
                enumerable: false,
                configurable: true
            });
            Object.defineProperty(SDescriptor.prototype, "id", {
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
                get: function () {
                    return this._settings.id !== undefined
                        ? this._settings.id
                        : this.constructor.id;
                },
                enumerable: false,
                configurable: true
            });
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
                settings = deepMerge_1.default(this._settings, settings);
                // initialize the descriptor result instance
                this._descriptorResult = new SDescriptorResult_1.default(this, value, Object.assign({}, settings));
                // check the passed value type correspond to the descriptor type
                if (!ofType_1.default(value, this.constructor.type)) {
                    throw "Sorry but this descriptor \"<yellow>" + this.constructor.name + "</yellow>\" does not accept values of type \"<cyan>" + typeof_1.default(value) + "</cyan>\" but only \"<green>" + this.constructor.type + "</green>\"...";
                }
                // check the type to validate correctly the value
                if (Array.isArray(value) && !settings.arrayAsValue) {
                    // loop on each items
                    value.forEach(function (item) { });
                }
                else if (typeof value === 'object' &&
                    value !== null &&
                    value !== undefined) {
                    // loop on each object properties
                    Object.keys(this.constructor.rules).forEach(function (propName) {
                        var propValue = get_1.default(value, propName);
                        // validate the object property
                        var validationResult = _this._validate(propValue, propName, settings);
                        if (validationResult !== undefined && validationResult !== null) {
                            set_1.default(value, propName, validationResult);
                        }
                    });
                }
                else {
                    // validate the object property
                    var validationResult = this._validate(value, undefined, settings);
                }
                if (this._descriptorResult.hasIssues() && settings.throwOnError) {
                    throw this._descriptorResult.toString();
                }
                if (this._descriptorResult.hasIssues())
                    return this._descriptorResult;
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
                // check the "complete" setting
                if (settings.complete) {
                    if ((value === null || value === undefined) &&
                        rules.default !== undefined) {
                        value = rules.default;
                    }
                }
                // loop on the rules object
                Object.keys(rules).forEach(function (ruleName) {
                    // do not take care of "default" rule name
                    if (ruleName === 'default')
                        return;
                    var ruleValue = rules[ruleName];
                    // make sure we have this rule registered
                    if (_this.constructor._registeredRules[ruleName] === undefined) {
                        if (settings.throwOnMissingRule) {
                            throw "Sorry but you try to validate a value using the \"<yellow>" + ruleName + "</yellow>\" rule but this rule is not registered. Here's the available rules:\n              - " + Object.keys(_this.constructor._registeredRules).join('\n- ');
                        }
                    }
                    else {
                        var ruleObj = _this.constructor._registeredRules[ruleName];
                        var params = ruleObj.processParams !== undefined
                            ? ruleObj.processParams(ruleValue)
                            : ruleValue;
                        var ruleSettings = ruleObj.settings !== undefined ? ruleObj.settings : {};
                        // check if the rule accept this type of value
                        if (ruleObj.accept && ofType_1.default(value, ruleObj.accept) !== true)
                            return;
                        var ruleResult = ruleObj.apply(value, params, ruleSettings, settings);
                        if (ruleResult === true)
                            return value;
                        var obj = ruleResult === false ? {} : ruleResult;
                        obj.__ruleObj = ruleObj;
                        obj.__propName = propName;
                        _this._descriptorResult.add(obj);
                    }
                });
                // return the value that can have been processed
                return value;
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
         *
         * @todo      check utility of this property
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        _a.type = 'Object',
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
        _a.settings = {},
        _a);
    return Cls;
});
