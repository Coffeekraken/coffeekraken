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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9kZXNjcmlwdG9yL19TRGVzY3JpcHRvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFHVix3REFBc0M7SUFDdEMsMkRBQXVDO0lBQ3ZDLDBFQUFzRDtJQUN0RCxzREFBa0M7SUFDbEMsb0RBQWtDO0lBRWxDLDhEQUEwQztJQUMxQyxzREFBa0M7SUFDbEMsa0VBQThDO0lBNkY5QztRQWlHRTs7Ozs7Ozs7O1dBU0c7UUFDSCxxQkFBWSxRQUErQjtZQUN6QyxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUNoRCxJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUMzQixLQUFLLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDbkMsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsWUFBWSxFQUFFLEtBQUs7Z0JBQ25CLGtCQUFrQixFQUFFLEtBQUs7Z0JBQ3pCLEtBQUssRUFBRSxLQUFLO2dCQUNaLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxLQUFLO2FBQ2YsRUFDRCxJQUFJLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDekIsUUFBUSxDQUNULENBQUM7UUFDSixDQUFDO1FBL0NEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNJLHdCQUFZLEdBQW5CLFVBQW9CLElBQXNCO1lBQ3hDLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBRTtnQkFDeEQsTUFBTSwyRkFBMkYsQ0FBQzthQUNuRztZ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