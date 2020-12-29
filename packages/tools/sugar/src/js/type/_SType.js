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
    var _a;
    var SError_1 = __importDefault(require("../error/SError"));
    var map_1 = __importDefault(require("../iterable/map"));
    var getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
    var typeof_1 = __importDefault(require("../value/typeof"));
    var deepMerge_1 = __importDefault(require("../object/deepMerge"));
    var parseHtml_1 = __importDefault(require("../console/parseHtml"));
    var parseTypeString_1 = __importDefault(require("./parseTypeString"));
    var STypeResult_1 = __importDefault(require("./STypeResult"));
    var getAvailableInterfaceTypes_1 = __importDefault(require("../interface/getAvailableInterfaceTypes"));
    /**
     * @name                SType
     * @namespace           sugar.js.type
     * @type                Class
     *
     * This class is the main one that MUST be used as parent one
     * when creating any type like object, string, etc...
     *
     * @param       {ISTypeSettings}      settings        An object of setting to configure your descriptor instance
     *
     * @setting     {String}        [id=this.constructor.name]        An id for your instance
     * @setting     {String}        [name=this.constructor.name]      A name for your instance
     * @setting     {Boolean}       [throw=true]            Specify if you want your instance to throw errors or not
     * @setting     {Boolean}       [verbose=true]          Specify if you want back an object describing the issue, or just a false
     * @setting     {Boolean}       [customTypes=true]      Specify if you want the instance to take care of custom types like "SType", "SPromise", etc. or not
     *
     * @todo      tests
     * @todo      doc
     *
     * @example       js
     * import SType from '@coffeekraken/sugar/js/descriptor/SType';
     * class MyDescriptor extends SType {
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
                    throw: true,
                    customTypes: true,
                    interfaces: true
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
                        if (res_1 !== false &&
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
                        var extendsStack = getExtendsStack_1.default(value).map(function (s) {
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
            return SType;
        }()),
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
        _a._instanciatedTypes = {},
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
        _a._registeredTypes = {},
        _a);
    return Cls;
});
//# sourceMappingURL=_SType.js.map