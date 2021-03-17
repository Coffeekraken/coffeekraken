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
        define(["require", "exports", "../is/ofType", "../value/typeof", "./SDescriptorResult", "../object/get", "../is/glob", "../object/flatten", "../object/set", "../object/deepMerge"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var ofType_1 = __importDefault(require("../is/ofType"));
    var typeof_1 = __importDefault(require("../value/typeof"));
    var SDescriptorResult_1 = __importDefault(require("./SDescriptorResult"));
    var get_1 = __importDefault(require("../object/get"));
    var glob_1 = __importDefault(require("../is/glob"));
    var flatten_1 = __importDefault(require("../object/flatten"));
    var set_1 = __importDefault(require("../object/set"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var SDescriptor = /** @class */ (function () {
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
            // ensure we can apply the descriptor
            if (value === undefined || value === null)
                value = {};
            // need to be before the instanciation of the
            // descriptorResult for references reasons... to check when have time
            var valuesObjToProcess = {}, finalValuesObj = {};
            // initialize the descriptor result instance
            this._descriptorResult = new SDescriptorResult_1.default(this, finalValuesObj, Object.assign({}, settings));
            // flatten the rules
            var rules = flatten_1.default(settings.rules, {
                excludeProps: ['default', 'interface'],
                keepLastIntact: true
            });
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
                Object.keys(rules).forEach(function (propName) {
                    var ruleObj = rules[propName];
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
                Object.keys(valuesObjToProcess).forEach(function (propName) {
                    var ruleObj = rules[propName];
                    // complete
                    if (valuesObjToProcess[propName] === undefined &&
                        settings.complete &&
                        ruleObj.default !== undefined) {
                        valuesObjToProcess[propName] = ruleObj.default;
                    }
                    // interface
                    if (ruleObj.interface !== undefined) {
                        var interfaceValue = valuesObjToProcess[propName];
                        // nativeConsole.log('VAL', valuesObjToProcess[propName], propName);
                        var interfaceRes = ruleObj.interface.apply(interfaceValue || {}, {
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
                    var validationResult = _this._validate(valuesObjToProcess[propName], propName, ruleObj, settings);
                    if (validationResult !== undefined && validationResult !== null) {
                        set_1.default(finalValuesObj, propName, validationResult);
                    }
                });
            }
            else {
                nativeConsole.warn(value);
                throw new Error("You can apply an <yellow>SDescriptor</yellow> only on an Object like value...");
            }
            // if (this._descriptorResult.hasIssues() && settings.throw) {
            //   throw this._descriptorResult.toString();
            // }
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
                    // nativeConsole.log('AAA', propName, value, params);
                    if (ruleObj.accept && ofType_1.default(value, ruleObj.accept) !== true)
                        return;
                    // console.log('CC', propName, value, params);
                    var ruleResult = ruleObj.apply(value, params, ruleSettings, __assign(__assign({}, settings), { name: settings.name + "." + propName }));
                    if (ruleResult === true)
                        return value;
                    var obj = ruleResult === false ? {} : ruleResult;
                    obj.__ruleObj = ruleObj;
                    obj.__propName = propName;
                    // nativeConsole.log(obj);
                    _this._descriptorResult.add(obj);
                }
            });
            // return the value that can have been processed
            return value;
        };
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
        return SDescriptor;
    }());
    var Cls = SDescriptor;
    exports.default = SDescriptor;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL2Rlc2NyaXB0b3IvX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztJQUdWLHdEQUFzQztJQUN0QywyREFBdUM7SUFDdkMsMEVBQXNEO0lBQ3RELHNEQUFrQztJQUNsQyxvREFBa0M7SUFFbEMsOERBQTBDO0lBQzFDLHNEQUFrQztJQUNsQyxrRUFBOEM7SUE2RjlDO1FBaUdFOzs7Ozs7Ozs7V0FTRztRQUNILHFCQUFZLFFBQStCO1lBQ3pDLG9CQUFvQjtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO2dCQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEVBQUUsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQ2hELElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQzNCLEtBQUssRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLEtBQUssSUFBSSxFQUFFO2dCQUNuQyxJQUFJLEVBQUUsUUFBUTtnQkFDZCxZQUFZLEVBQUUsS0FBSztnQkFDbkIsa0JBQWtCLEVBQUUsS0FBSztnQkFDekIsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osUUFBUSxFQUFFLElBQUk7Z0JBQ2QsT0FBTyxFQUFFLEtBQUs7YUFDZixFQUNELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxFQUN6QixRQUFRLENBQ1QsQ0FBQztRQUNKLENBQUM7UUEvQ0Q7Ozs7Ozs7Ozs7OztXQVlHO1FBQ0ksd0JBQVksR0FBbkIsVUFBb0IsSUFBc0I7WUFDeEMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFFO2dCQUN4RCxNQUFNLDJGQUEyRixDQUFDO2FBQ25HO1lB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