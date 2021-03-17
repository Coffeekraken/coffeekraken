// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../error/SError", "../iterable/map", "../class/getExtendsStack", "../value/typeof", "../object/deepMerge", "../console/parseHtml", "./parseTypeString", "./STypeResult", "../interface/getAvailableInterfaceTypes"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SError_1 = __importDefault(require("../error/SError"));
    var map_1 = __importDefault(require("../iterable/map"));
    var getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
    var typeof_1 = __importDefault(require("../value/typeof"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var parseTypeString_1 = __importDefault(require("./parseTypeString"));
    var STypeResult_1 = __importDefault(require("./STypeResult"));
    var getAvailableInterfaceTypes_1 = __importDefault(require("../interface/getAvailableInterfaceTypes"));
    var SType = /** @class */ (function () {
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
        function SType(typeString, settings) {
            if (settings === void 0) { settings = {}; }
            // save the typeString
            this.typeString = typeString;
            // standardise the typeString
            typeString = typeString.toLowerCase().trim();
            // check if already bein instanciated
            if (this.constructor._instanciatedTypes[typeString] !== undefined)
                return this.constructor._instanciatedTypes[typeString];
            // parse the typeString
            this.types = parseTypeString_1.default(typeString).types;
            // save the settings
            this._settings = deepMerge_1.default({
                id: this.constructor.name,
                name: this.constructor.name,
                throw: false,
                customTypes: true,
                interfaces: true,
                verbose: false
            }, settings);
            // save the instance into the instanciated stack
            this.constructor._instanciatedTypes[typeString] = this;
        }
        /**
         * @name      registerType
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
        SType.registerType = function (type) {
            if (type.id === undefined || typeof type.id !== 'string') {
                throw "Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...";
            }
            this._registeredTypes[type.id] = type;
        };
        /**
         * @name        is
         * @type        Function
         *
         * This method allows you to make sure the passed value correspond with the type(s)
         * this instance represent
         *
         * @param     {Any}       value       The value to check
         * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
         * @return    {Boolean}               true if correspond, false if not
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        SType.prototype.is = function (value, settings) {
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(this._settings, settings);
            var issues = {};
            // loop on each types
            for (var i = 0; i < this.types.length; i++) {
                var typeObj = this.types[i], typeId = typeObj.type;
                // check the value
                var res_1 = this._isType(value, typeId, settings);
                // if the result is falsy
                if (res_1 === true) {
                    // if this matching type does not have any "of" to check
                    // simply return true cause we have a type that match
                    if (typeObj.of === undefined)
                        return true;
                    // make sure the type of the passed value
                    // is one of that can contain some values
                    // like "object", "array" or "map"
                    var typeOf = typeof_1.default(value);
                    if (typeOf !== 'Array' && typeOf !== 'Object' && typeOf !== 'Map') {
                        if (settings.throw) {
                            throw "Sorry but you have specified a type string \"<yellow>" + this.typeString + "</yellow>\" with some \"<...>\" definition on a type \"<cyan>" + typeOf + "</cyan>\" that does not support \"child\" value(s)...";
                        }
                        else {
                            continue;
                        }
                    }
                    // get the keys on which to loop
                    var loopOn = typeOf === 'Object' ? Object.keys(value) : Array.from(value.keys());
                    // loop on all the keys found
                    for (var k = 0; k < loopOn.length; k++) {
                        for (var j = 0; j < typeObj.of.length; j++) {
                            var type = typeObj.of[j];
                            var idx = loopOn[k];
                            var v = typeOf === 'Map' ? value.get(idx) : value[idx];
                            // validate the value if needed
                            var ofRes = this._isType(v, type, settings);
                            if (ofRes !== true) {
                                issues[typeObj.type] = {
                                    expected: {
                                        type: typeObj.type
                                    },
                                    received: {
                                        type: typeof_1.default(v),
                                        value: v
                                    }
                                };
                            }
                            else {
                                // return true cause we found a match
                                return true;
                            }
                        }
                    }
                }
                else {
                    var issueObj = {
                        expected: {
                            type: typeObj.type
                        },
                        received: {
                            type: typeof_1.default(value),
                            value: value
                        }
                    };
                    if (res_1 !== undefined &&
                        res_1 !== null &&
                        res_1 !== false &&
                        res_1.toString &&
                        typeof res_1.toString === 'function') {
                        issueObj.message = res_1.toString();
                    }
                    issues[typeObj.type] = issueObj;
                }
            }
            // if (settings.throw === true) {
            //   throw __parseHtml(
            //     [
            //       `Sorry but the value passed:`,
            //       '',
            //       __toString(value),
            //       '',
            //       `which is of type "<red>${__typeOf(
            //         value
            //       )}</red>" does not correspond to the requested type(s) "<green>${
            //         this.typeString
            //       }</green>"`
            //     ].join('\n')
            //   );
            // }
            var res = new STypeResult_1.default({
                typeString: this.typeString,
                value: value,
                expected: {
                    type: this.typeString
                },
                received: {
                    type: typeof_1.default(value)
                },
                issues: issues,
                settings: settings
            });
            if (settings.throw === true)
                throw res.toString();
            return res;
        };
        /**
         * @name          _isType
         * @type          Function
         * @private
         *
         * This method simply take a type string like "string", "array", etc..., a value and
         * check if this value correspond to the passed type
         *
         * @param     {Any}       value       The value to validate
         * @param     {String}    type        The type to check the value with
         * @return    {Boolean}               true if all if ok, false if not
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        SType.prototype._isType = function (value, type, settings) {
            if (settings === void 0) { settings = {}; }
            settings = deepMerge_1.default(this._settings, settings);
            // console.log('type', type, settings);
            // check that the passed type is registered
            if (this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
                if (settings.interfaces === true) {
                    var availableInterfaceTypes = getAvailableInterfaceTypes_1.default();
                    if (availableInterfaceTypes[type] !== undefined) {
                        var res = availableInterfaceTypes[type].apply(value, {});
                        return res;
                    }
                }
                // handle custom types
                if (settings.customTypes === true) {
                    var typeOf = typeof_1.default(value).toLowerCase();
                    var extendsStack = Object.keys(getExtendsStack_1.default(value)).map(function (s) {
                        return s.toLowerCase();
                    });
                    if (type === typeOf || extendsStack.indexOf(type) !== -1)
                        return true;
                }
                if (settings.throw) {
                    throw "Sorry but you try to validate a value with the type \"<yellow>" + type + "</yellow>\" but this type is not registered...";
                }
                else {
                    return false;
                }
            }
            // validate the value using the "is" type method
            return this.constructor._registeredTypes[type.toLowerCase()].is(value);
        };
        /**
         * @name          cast
         * @type          Function
         *
         * This method allows you to cast the passed value to the wanted type.
         * !!! If multiple types are passed in the typeString, the first one that
         * is "castable" to will be used.
         *
         * @param     {Any}         value         The value you want to cast
         * @param     {ISTypeSettings}      [settings={}]       Some settings you want to override
         * @return    {Any|Error}                         The casted value, or undefined if cannot be casted
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        SType.prototype.cast = function (value, settings) {
            settings = deepMerge_1.default(this._settings, settings);
            // store exceptions coming from descriptors
            var verboseObj = {
                value: value,
                issues: {},
                settings: settings
            };
            var _loop_1 = function (i) {
                var typeObj = this_1.types[i], typeId = typeObj.type;
                // get the descriptor object
                var descriptorObj = this_1.constructor._registeredTypes[typeId.toLowerCase()];
                // check that we have a descriptor for this type
                if (descriptorObj === undefined) {
                    return "continue";
                }
                // check that this descriptor is eligeble for casting
                if (descriptorObj.cast === undefined)
                    return "continue";
                // try to cast the value
                var castedValue = void 0;
                // try {
                castedValue = descriptorObj.cast(value);
                if (castedValue instanceof Error) {
                    // add the issue in the verboseObj
                    verboseObj.issues[typeId] = castedValue.toString();
                    return "continue";
                }
                // handle the "of" parameter
                // make sure the passed type can have child(s)
                if (typeObj.of !== undefined &&
                    this_1.canHaveChilds(castedValue) === false) {
                    var issueStr = "Sorry but the passed type \"<yellow>" + typeId + "</yellow>\" has some child(s) dependencies \"<green>" + typeObj.of.join('|') + "</green>\" but this type can not have child(s)";
                    if (settings.throw === true) {
                        throw parseHtml_1.default(issueStr);
                    }
                    // add the issue in the verboseObj
                    verboseObj.issues[typeId] = issueStr;
                }
                else if (typeObj.of !== undefined) {
                    var sTypeInstance_1 = new SType(typeObj.of.join('|'));
                    castedValue = map_1.default(castedValue, function (key, value, idx) {
                        return sTypeInstance_1.cast(value, settings);
                    });
                }
                if (castedValue === null && descriptorObj.id === 'null')
                    return { value: null };
                if (castedValue === undefined && descriptorObj.id === 'undefined')
                    return { value: undefined };
                if (castedValue !== null && castedValue !== undefined)
                    return { value: castedValue };
                // something goes wrong
                verboseObj.issues[typeId] = "Something goes wrong but no details are available... Sorry";
            };
            var this_1 = this;
            // loop on each types
            for (var i = 0; i < this.types.length; i++) {
                var state_1 = _loop_1(i);
                if (typeof state_1 === "object")
                    return state_1.value;
            }
            // our value has not bein casted
            if (settings.throw) {
                var stack_1 = [
                    "Sorry but the value of type \"<cyan>" + typeof_1.default(value) + "</cyan>\" passed to be casted in type \"<yellow>" + this.typeString + "</yellow>\" can not be casted correctly. Here's why:\n"
                ];
                Object.keys(verboseObj.issues).forEach(function (descriptorId) {
                    stack_1.push("- <red>" + descriptorId + "</red>: " + verboseObj.issues[descriptorId]);
                });
                throw parseHtml_1.default(stack_1.join('\n'));
            }
            if (settings.verbose === true) {
                return new SError_1.default(verboseObj);
            }
            return new SError_1.default("Something goes wrong with the casting process but not details available sorry...");
        };
        /**
         * @name          canHaveChilds
         * @type          Function
         *
         * This method simply take a value and return true if can have child(s), false if not
         *
         * @param       {Any}       value       The value to check
         * @return      {Boolean}         true if can have child(s) (Object, Array and Map), false if not
         *
         * @since     2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        SType.prototype.canHaveChilds = function (value) {
            var type = typeof_1.default(value);
            return type === 'Array' || type === 'Object' || type === 'Map';
        };
        Object.defineProperty(SType.prototype, "name", {
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
                return this._settings.name;
            },
            enumerable: false,
            configurable: true
        });
        Object.defineProperty(SType.prototype, "id", {
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
                return this._settings.id;
            },
            enumerable: false,
            configurable: true
        });
        /**
         * @name      _instanciatedTypes
         * @type      ISTypeInstanciatedTypes
         * @static
         *
         * Store all the instanciated types to reuse them
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        SType._instanciatedTypes = {};
        /**
         * @name      _registeredTypes
         * @type      ISTypeRegisteredTypes
         * @static
         *
         * Store the registered _registeredTypes into a simple object
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com>
         */
        SType._registeredTypes = {};
        return SType;
    }());
    var Cls = SType;
    exports.default = SType;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC90eXBlL19TVHlwZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7O0lBRVYsMkRBQXVDO0lBQ3ZDLHdEQUFvQztJQUVwQyw2RUFBeUQ7SUFDekQsMkRBQXVDO0lBS3ZDLGtFQUE4QztJQUM5QyxtRUFBK0M7SUFDL0Msc0VBQWtEO0lBQ2xELDhEQUEwQztJQUMxQyx1R0FBbUY7SUF1R25GO1FBK0VFOzs7Ozs7Ozs7V0FTRztRQUNILGVBQVksVUFBa0IsRUFBRSxRQUE2QjtZQUE3Qix5QkFBQSxFQUFBLGFBQTZCO1lBQzNELHNCQUFzQjtZQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3Qiw2QkFBNkI7WUFDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QyxxQ0FBcUM7WUFDckMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVM7Z0JBQy9ELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakQsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDM0IsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixPQUFPLEVBQUUsS0FBSzthQUNm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