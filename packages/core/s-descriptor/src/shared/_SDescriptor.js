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
            }, settings !== null && settings !== void 0 ? settings : {}));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NEZXNjcmlwdG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NEZXNjcmlwdG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsb0VBQTZDO0lBQzdDLGtGQUE4RDtJQUM5RCxxRkFBK0Q7SUFDL0QsNEVBSTZCO0lBQzdCLGdGQUEwRDtJQUMxRCw4RUFBMEQ7SUFDMUQsZ0ZBQTBEO0lBQzFELDRGQUFzRTtJQXdGdEUsYUFBYTtJQUNiLE1BQU0sV0FBWSxTQUFRLGlCQUFRO1FBdUZoQzs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFFBQW1DO1lBQzdDLG9CQUFvQjtZQUNwQixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxVQUFVLEVBQUU7b0JBQ1YsS0FBSyxFQUFFLEVBQUU7b0JBQ1QsSUFBSSxFQUFFLFFBQVE7b0JBQ2QsWUFBWSxFQUFFLEtBQUs7b0JBQ25CLGtCQUFrQixFQUFFLEtBQUs7b0JBQ3pCLEtBQUssRUFBRSxLQUFLO29CQUNaLFFBQVEsRUFBRSxJQUFJO29CQUNkLE9BQU8sRUFBRSxLQUFLO2lCQUNmO2FBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBQ0osQ0FBQztRQTlERDs7Ozs7Ozs7Ozs7O1dBWUc7UUFDSCxNQUFNLENBQUMsWUFBWSxDQUFDLElBQXNCO1lBQ3hDLElBQUksSUFBSSxDQUFDLEVBQUUsS0FBSyxTQUFTLElBQUksT0FBTyxJQUFJLENBQUMsRUFBRSxLQUFLLFFBQVEsRUFBRTtnQkFDeEQsTUFBTSwyRkFBMkYsQ0FBQzthQUNuRztZQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO1FBQ3hDLENBQUM7UUFFRDs7Ozs7Ozs7O1dBU0c7UUFDSCxJQUFJLGtCQUFrQjtZQUNwQixPQUFhLElBQUssQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUFDO1FBQzFDLENBQUM7UUFnQ0Q7Ozs7Ozs7Ozs7Ozs7Ozs7V0FnQkc7UUFDSCxLQUFLLENBQ0gsS0FBVSxFQUNWLFFBQXdDO1lBRXhDLGtCQUFrQjtZQUNsQixNQUFNLEdBQUcsR0FBeUIsQ0FDaEMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsa0JBQWtCLEVBQUUsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUNyRCxDQUFDO1lBRUYscUNBQXFDO1lBQ3JDLElBQUksS0FBSyxLQUFLLFNBQVMsSUFBSSxLQUFLLEtBQUssSUFBSTtnQkFBRSxLQUFLLEdBQUcsRUFBRSxDQUFDO1lBRXRELDZDQUE2QztZQUM3QyxxRUFBcUU7WUFDckUsTUFBTSxrQkFBa0IsR0FBRyxFQUFFLEVBQzNCLGNBQWMsR0FBRyxFQUFFLENBQUM7WUFFdEIsNENBQTRDO1lBQzVDLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxJQUFJLDJCQUFtQixDQUM5QyxJQUFJLEVBQ0osY0FBYyxFQUNkLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEdBQUcsQ0FBQyxDQUN2QixDQUFDO1lBRUYsTUFBTSxLQUFLLEdBQUcsR0FBRyxDQUFDLEtBQUssQ0FBQztZQUV4QixnRUFBZ0U7WUFDaEUsSUFBSSxDQUFDLGdCQUFVLENBQUMsS0FBSyxFQUFFLEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDaEMsTUFBTSxzQ0FDSixJQUFJLENBQUMsS0FBSyxDQUFDLElBQ2Isb0RBQW9ELGdCQUFRLENBQzFELEtBQUssQ0FDTiw2QkFBNkIsR0FBRyxDQUFDLElBQUksY0FBYyxDQUFDO2FBQ3REO1lBRUQsaURBQWlEO1lBQ2pELElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxZQUFZLEVBQUU7Z0JBQzdDLHFCQUFxQjtnQkFDckIsTUFBTSxJQUFJLEtBQUssQ0FDYixpRkFBaUYsQ0FDbEYsQ0FBQztnQkFDRiwrQkFBK0I7YUFDaEM7aUJBQU0sSUFDTCxPQUFPLEtBQUssS0FBSyxRQUFRO2dCQUN6QixLQUFLLEtBQUssSUFBSTtnQkFDZCxLQUFLLEtBQUssU0FBUyxFQUNuQjtnQkFDQSxpQ0FBaUM7Z0JBQ2pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ3RDLG1DQUFtQztvQkFFbkMsSUFBSSxjQUFRLENBQUMsUUFBUSxDQUFDLElBQUksS0FBSyxFQUFFO3dCQUMvQiw0REFBNEQ7d0JBQzVELG1CQUFtQjt3QkFDbkIsTUFBTTt3QkFDTiwyQ0FBMkM7d0JBQzNDLHVEQUF1RDt3QkFDdkQsOERBQThEO3dCQUM5RCxpQ0FBaUM7d0JBQ2pDLFFBQVE7d0JBQ1IsSUFBSTtxQkFDTDt5QkFBTTt3QkFDTCxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxhQUFLLENBQUMsS0FBSyxFQUFFLFFBQVEsQ0FBQyxDQUFDO3FCQUN2RDtnQkFDSCxDQUFDLENBQUMsQ0FBQztnQkFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsUUFBUSxFQUFFLEVBQUU7b0JBQ25ELE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDaEMsV0FBVztvQkFDWCxJQUNFLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxLQUFLLFNBQVM7d0JBQzFDLEdBQUcsQ0FBQyxRQUFRO3dCQUNaLE9BQU8sQ0FBQyxPQUFPLEtBQUssU0FBUyxFQUM3Qjt3QkFDQSxrQkFBa0IsQ0FBQyxRQUFRLENBQUMsR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDO3FCQUNoRDtvQkFFRCxZQUFZO29CQUNaLElBQUksT0FBTyxDQUFDLFNBQVMsS0FBSyxTQUFTLEVBQUU7d0JBQ25DLE1BQU0sY0FBYyxHQUFHLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxDQUFDO3dCQUNwRCwrREFBK0Q7d0JBQy9ELE1BQU0sWUFBWSxHQUFHLE9BQU8sQ0FBQyxTQUFTLENBQUMsS0FBSyxDQUFDLGNBQWMsSUFBSSxFQUFFLEVBQUU7NEJBQ2pFLFFBQVEsRUFBRSxJQUFJOzRCQUNkLEtBQUssRUFBRSxLQUFLO3lCQUNiLENBQUMsQ0FBQzt3QkFDSCxJQUFJLFlBQVksQ0FBQyxTQUFTLEVBQUUsRUFBRTs0QkFDNUIsTUFBTSxJQUFJLEtBQUssQ0FBQyxZQUFZLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQzt5QkFDMUM7NkJBQU07NEJBQ0wsa0JBQWtCLENBQUMsUUFBUSxDQUFDLEdBQUcsWUFBWSxDQUFDLEtBQUssQ0FBQzt5QkFDbkQ7cUJBQ0Y7b0JBRUQsd0JBQXdCO29CQUN4QixNQUFNLGdCQUFnQixHQUFHLElBQUksQ0FBQyxTQUFTLENBQ3JDLGtCQUFrQixDQUFDLFFBQVEsQ0FBQyxFQUM1QixRQUFRLEVBQ1IsT0FBTyxFQUNQLEdBQUcsQ0FDSixDQUFDO29CQUVGLElBQUksZ0JBQWdCLEtBQUssU0FBUyxJQUFJLGdCQUFnQixLQUFLLElBQUksRUFBRTt3QkFDL0QsYUFBSyxDQUFDLGNBQWMsRUFBRSxRQUFRLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztxQkFDbkQ7Z0JBQ0gsQ0FBQyxDQUFDLENBQUM7YUFDSjtpQkFBTTtnQkFDTCxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUNwQixNQUFNLElBQUksS0FBSyxDQUNiLCtFQUErRSxDQUNoRixDQUFDO2FBQ0g7WUFFRCxJQUFJLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxTQUFTLEVBQUUsSUFBSSxHQUFHLENBQUMsS0FBSyxFQUFFO2dCQUNuRCxNQUFNLElBQUksS0FBSyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxRQUFRLEVBQUUsQ0FBQyxDQUFDO2FBQ3BEO1lBRUQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDaEMsQ0FBQztRQUVEOzs7Ozs7Ozs7Ozs7V0FZRztRQUNILFNBQVMsQ0FDUCxLQUFVLEVBQ1YsUUFBZ0IsRUFDaEIsUUFBYSxFQUNiLFFBQThCO1lBRTlCLElBQUksUUFBUSxLQUFLLFNBQVM7Z0JBQUUsT0FBTyxLQUFLLENBQUM7WUFFekMsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLFNBQVMsSUFBSSxRQUFRLENBQUMsUUFBUSxLQUFLLEtBQUssRUFBRTtnQkFDbEUsSUFBSSxLQUFLLEtBQUssU0FBUyxJQUFJLEtBQUssS0FBSyxJQUFJO29CQUFFLE9BQU8sS0FBSyxDQUFDO2FBQ3pEO1lBRUQsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1lBRXhCLDJCQUEyQjtZQUMzQixNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxFQUFFO2dCQUN6QywwQ0FBMEM7Z0JBQzFDLElBQUksUUFBUSxLQUFLLFNBQVM7b0JBQUUsT0FBTztnQkFDbkMsTUFBTSxTQUFTLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxDQUFDO2dCQUNyQyx5Q0FBeUM7Z0JBQ3pDLElBQVUsSUFBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ3BFLElBQUksUUFBUSxDQUFDLGtCQUFrQixFQUFFO3dCQUMvQixNQUFNLDREQUE0RCxRQUFRO2tCQUNsRSxNQUFNLENBQUMsSUFBSSxDQUFPLElBQUssQ0FBQyxXQUFXLENBQUMsZ0JBQWdCLENBQUMsQ0FBQyxJQUFJLENBQzVELE1BQU0sQ0FDUCxFQUFFLENBQUM7cUJBQ1Q7aUJBQ0Y7cUJBQU07b0JBQ0wsTUFBTSxPQUFPLEdBQVMsSUFBSyxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztvQkFDbkUsTUFBTSxNQUFNLEdBQ1YsT0FBTyxDQUFDLGFBQWEsS0FBSyxTQUFTO3dCQUNqQyxDQUFDLENBQUMsT0FBTyxDQUFDLGFBQWEsQ0FBQyxTQUFTLENBQUM7d0JBQ2xDLENBQUMsQ0FBQyxTQUFTLENBQUM7b0JBQ2hCLE1BQU0sWUFBWSxHQUNoQixPQUFPLENBQUMsUUFBUSxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRSxDQUFDO29CQUN6RCw4Q0FBOEM7b0JBQzlDLGdEQUFnRDtvQkFDaEQsb0VBQW9FO29CQUNwRSxZQUFZO29CQUNaLDhDQUE4QztvQkFFOUMsSUFBSSxZQUFZLENBQUMsVUFBVSxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsV0FBVyxDQUFDLEVBQUU7d0JBQ3pELElBQUksY0FBYyxHQUFVLEVBQUUsQ0FBQzt3QkFDL0IsV0FBVyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFOzRCQUN4QixNQUFNLGNBQWMsR0FBRyxJQUFJLENBQUMsWUFBWSxDQUN0QyxDQUFDLEVBQ0QsT0FBTyxFQUNQLFFBQVEsRUFDUixNQUFNLEVBQ04sWUFBWSxFQUNaLFFBQVEsQ0FDVCxDQUFDOzRCQUNGLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxjQUFjLENBQUMsRUFBRTtnQ0FDakMsY0FBYyxHQUFHLENBQUMsR0FBRyxjQUFjLEVBQUUsR0FBRyxjQUFjLENBQUMsQ0FBQzs2QkFDekQ7aUNBQU07Z0NBQ0wsY0FBYyxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQzs2QkFDckM7d0JBQ0gsQ0FBQyxDQUFDLENBQUM7d0JBQ0gsV0FBVyxHQUFHLGNBQWMsQ0FBQztxQkFDOUI7eUJBQU07d0JBQ0wsTUFBTSxjQUFjLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FDdEMsV0FBVyxFQUNYLE9BQU8sRUFDUCxRQUFRLEVBQ1IsTUFBTSxFQUNOLFlBQVksRUFDWixRQUFRLENBQ1QsQ0FBQzt3QkFDRixXQUFXLEdBQUcsY0FBYyxDQUFDO3FCQUM5QjtpQkFDRjtZQUNILENBQUMsQ0FBQyxDQUFDO1lBRUgsZ0RBQWdEO1lBQ2hELE9BQU8sV0FBVyxDQUFDO1FBQ3JCLENBQUM7UUFFRCxZQUFZLENBQUMsS0FBSyxFQUFFLE9BQU8sRUFBRSxRQUFRLEVBQUUsTUFBTSxFQUFFLFlBQVksRUFBRSxRQUFRO1lBQ25FLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxFQUFFLE1BQU0sRUFBRSxZQUFZLGtDQUN2RCxRQUFRLEtBQ1gsUUFBUSxFQUNSLElBQUksRUFBRSxHQUFHLFFBQVEsQ0FBQyxJQUFJLElBQUksUUFBUSxFQUFFLElBQ3BDLENBQUM7WUFFSCxJQUFJLFVBQVUsS0FBSyxJQUFJO2dCQUFFLE9BQU8sS0FBSyxDQUFDO2lCQUNqQyxJQUFJLFVBQVUsWUFBWSxLQUFLLEVBQUU7Z0JBQ3BDLE1BQU0sR0FBRyxHQUEyQjtvQkFDbEMsT0FBTyxFQUFFLFVBQVU7b0JBQ25CLFNBQVMsRUFBRSxPQUFPO29CQUNsQixVQUFVLEVBQUUsUUFBUTtpQkFDckIsQ0FBQztnQkFDRixhQUFhO2dCQUNiLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLENBQUMsR0FBRyxDQUFDLENBQUM7Z0JBQ2hDLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7aUJBQU07Z0JBQ0wsT0FBTyxVQUFVLENBQUM7YUFDbkI7UUFDSCxDQUFDOztJQTdWRDs7Ozs7Ozs7O09BU0c7SUFDSSw0QkFBZ0IsR0FBZ0MsRUFBRSxDQUFDO0lBRTFEOzs7Ozs7Ozs7T0FTRztJQUNJLGlCQUFLLEdBQXNCLEVBQUUsQ0FBQztJQUVyQzs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0ksZ0JBQUksR0FBRyxRQUFRLENBQUM7SUEwVHpCLGtCQUFlLFdBQVcsQ0FBQyJ9