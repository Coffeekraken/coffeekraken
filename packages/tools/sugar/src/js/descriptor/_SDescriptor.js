// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../is/ofType", "../value/typeof", "./SDescriptorResult", "../object/get", "../is/glob", "../object/getGlob", "../object/flatten", "../object/set", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    var _a;
    var ofType_1 = __importDefault(require("../is/ofType"));
    var typeof_1 = __importDefault(require("../value/typeof"));
    var SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
    var get_1 = __importDefault(require("../object/get"));
    var glob_1 = __importDefault(require("../is/glob"));
    var getGlob_1 = __importDefault(require("../object/getGlob"));
    var flatten_1 = __importDefault(require("../object/flatten"));
    var set_1 = __importDefault(require("../object/set"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    /**
     * @name                SDescriptor
     * @namespace           sugar.js.descriptor
     * @type                Class
     * @status              beta
     *
     * This class is the main one that MUST be used as parent one
     * when creating any descriptor like object, string, etc...
     *
     * @param       {ISDescriptorSettings}      settings        An object of setting to configure your descriptor instance
     *
     * @todo      handle array values
     * @todo      handle not object values
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
                this._settings = deepMerge_1.default({
                    id: this.constructor.id || this.constructor.name,
                    name: this.constructor.name,
                    rules: this.constructor.rules || {},
                    type: 'Object',
                    arrayAsValue: false,
                    throwOnMissingRule: false,
                    throwOnMissingRequiredProp: true,
                    throw: false,
                    complete: true
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
            SDescriptor.registerRule = function (rule) {
                if (rule.id === undefined || typeof rule.id !== 'string') {
                    throw "Sorry but you try to register a rule that does not fit the ISDescriptionRule interface...";
                }
                this._registeredRules[rule.id] = rule;
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
                if (!ofType_1.default(value, settings.type)) {
                    throw "Sorry but this descriptor \"<yellow>" + settings.name + "</yellow>\" does not accept values of type \"<cyan>" + typeof_1.default(value) + "</cyan>\" but only \"<green>" + settings.type + "</green>\"...";
                }
                // check the type to validate correctly the value
                if (Array.isArray(value) && !settings.arrayAsValue) {
                    // loop on each items
                    throw "Sorry but the support for arrays like values has not been integrated for not...";
                    value.forEach(function (item) { });
                }
                else if (typeof value === 'object' &&
                    value !== null &&
                    value !== undefined) {
                    // loop on each object properties
                    Object.keys(flatten_1.default(settings.rules, {
                        keepLastIntact: true
                    })).forEach(function (propName) {
                        var ruleObj = get_1.default(settings.rules, propName);
                        // complete
                        if (!glob_1.default(propName) &&
                            get_1.default(value, propName) === undefined &&
                            settings.complete &&
                            ruleObj.default !== undefined) {
                            set_1.default(value, propName, ruleObj.default);
                        }
                        var globPropValue = getGlob_1.default(value, propName, {
                            deepize: false
                        });
                        if (settings.throwOnMissingRequiredProp &&
                            ruleObj.required !== undefined &&
                            ruleObj.required !== false &&
                            Object.keys(globPropValue).length === 0) {
                            globPropValue[propName] = undefined;
                        }
                        if (Object.keys(globPropValue).length) {
                            // check the finded properties
                            Object.keys(globPropValue).forEach(function (path) {
                                // validate the property
                                var validationResult = _this._validate(globPropValue[path], path, ruleObj, settings);
                                if (validationResult !== undefined && validationResult !== null) {
                                    set_1.default(value, path, validationResult);
                                }
                            });
                        }
                    });
                }
                else {
                    throw "Sorry but the support for values other than objects has not been integrated for not...";
                    // validate the object property
                    var validationResult = this._validate(value, undefined, undefined, settings);
                }
                if (this._descriptorResult.hasIssues() && settings.throw) {
                    throw this._descriptorResult.toString();
                }
                return this._descriptorResult;
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
            SDescriptor.prototype._validate = function (value, propName, rulesObj, settings) {
                var _this = this;
                if (rulesObj === undefined)
                    return value;
                if (rulesObj.required === undefined || rulesObj.required === false) {
                    if (value === undefined || value === null)
                        return value;
                }
                // loop on the rules object
                Object.keys(rulesObj).forEach(function (ruleName) {
                    // do not take care of "default" rule name
                    if (ruleName === 'default')
                        return;
                    var ruleValue = rulesObj[ruleName];
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
                        var ruleResult = ruleObj.apply(value, params, ruleSettings, __assign(__assign({}, settings), { name: settings.name + "." + propName }));
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
//# sourceMappingURL=_SDescriptor.js.map