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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL3R5cGUvX1NUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViwyREFBdUM7SUFDdkMsd0RBQW9DO0lBRXBDLDZFQUF5RDtJQUN6RCwyREFBdUM7SUFLdkMsa0VBQThDO0lBQzlDLG1FQUErQztJQUMvQyxzRUFBa0Q7SUFDbEQsOERBQTBDO0lBQzFDLHVHQUFtRjtJQXVHbkY7UUErRUU7Ozs7Ozs7OztXQVNHO1FBQ0gsZUFBWSxVQUFrQixFQUFFLFFBQTZCO1lBQTdCLHlCQUFBLEVBQUEsYUFBNkI7WUFDM0Qsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLDZCQUE2QjtZQUM3QixVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLHFDQUFxQztZQUNyQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUztnQkFDL0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELHVCQUF1QjtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNqRCxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUMzQixLQUFLLEVBQUUsS0FBSztnQkFDWixXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2FBQ2Ys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