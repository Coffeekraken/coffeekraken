"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const SError_1 = __importDefault(require("../error/SError"));
const map_1 = __importDefault(require("../iterable/map"));
const SPromise_1 = __importDefault(require("../promise/SPromise"));
const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
const typeof_1 = __importDefault(require("../value/typeof"));
const toString_1 = __importDefault(require("../string/toString"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const parseTypeString_1 = __importDefault(require("./parseTypeString"));
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
const Cls = (_a = class SType extends SPromise_1.default {
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
        constructor(typeString, settings = {}) {
            super();
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
                verbose: true,
                customTypes: true
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
        static registerType(type) {
            if (type.id === undefined || typeof type.id !== 'string') {
                throw `Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`;
            }
            this._registeredTypes[type.id] = type;
        }
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
        is(value, settings = {}) {
            settings = deepMerge_1.default(this._settings, settings);
            let issues = {};
            // loop on each types
            for (let i = 0; i < this.types.length; i++) {
                const typeObj = this.types[i], typeId = typeObj.type;
                // check the value
                const res = this._isType(value, typeId, settings);
                // if the result is falsy
                if (res === true) {
                    // if this matching type does not have any "of" to check
                    // simply return true cause we have a type that match
                    if (typeObj.of === undefined)
                        return true;
                    // make sure the type of the passed value
                    // is one of that can contain some values
                    // like "object", "array" or "map"
                    const typeOf = typeof_1.default(value);
                    if (typeOf !== 'Array' && typeOf !== 'Object' && typeOf !== 'Map') {
                        if (settings.throw) {
                            throw `Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf}</cyan>" that does not support "child" value(s)...`;
                        }
                        else {
                            continue;
                        }
                    }
                    // get the keys on which to loop
                    const loopOn = typeOf === 'Object' ? Object.keys(value) : Array.from(value.keys());
                    // loop on all the keys found
                    for (let k = 0; k < loopOn.length; k++) {
                        for (let j = 0; j < typeObj.of.length; j++) {
                            const type = typeObj.of[j];
                            const idx = loopOn[k];
                            const v = typeOf === 'Map' ? value.get(idx) : value[idx];
                            // validate the value if needed
                            const ofRes = this._isType(v, type, settings);
                            if (ofRes !== true) {
                                if (issues[typeObj.type] === undefined)
                                    issues[typeObj.type] = [];
                                issues[typeObj.type].push({
                                    expected: {
                                        type: typeObj.type
                                    },
                                    received: {
                                        type: typeof_1.default(v),
                                        value: v
                                    }
                                });
                            }
                            else {
                                // return true cause we found a match
                                return true;
                            }
                        }
                    }
                }
            }
            if (settings.throw === true) {
                throw parseHtml_1.default([
                    `Sorry but the value passed:`,
                    '',
                    toString_1.default(value),
                    '',
                    `which is of type "<red>${typeof_1.default(value)}</red>" does not correspond to the requested type(s) "<green>${this.typeString}</green>"`
                ].join('\n'));
            }
            if (settings.verbose === true) {
                const verboseObj = {
                    typeString: this.typeString,
                    value,
                    expected: {
                        type: this.typeString
                    },
                    received: {
                        type: typeof_1.default(value)
                    },
                    issues,
                    settings
                };
                return verboseObj;
            }
            else {
                return false;
            }
        }
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
        _isType(value, type, settings = {}) {
            settings = deepMerge_1.default(this._settings, settings);
            // check that the passed type is registered
            if (this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
                // handle custom types
                if (settings.customTypes === true) {
                    const typeOf = typeof_1.default(value).toLowerCase();
                    const extendsStack = getExtendsStack_1.default(value).map((s) => s.toLowerCase());
                    if (type === typeOf || extendsStack.indexOf(type) !== -1)
                        return true;
                }
                if (settings.throw) {
                    throw `Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`;
                }
                else {
                    return false;
                }
            }
            // validate the value using the "is" type method
            return this.constructor._registeredTypes[type.toLowerCase()].is(value);
        }
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
        cast(value, settings) {
            settings = deepMerge_1.default(this._settings, settings);
            // store exceptions coming from descriptors
            let verboseObj = {
                value,
                issues: {},
                settings
            };
            // loop on each types
            for (let i = 0; i < this.types.length; i++) {
                const typeObj = this.types[i], typeId = typeObj.type;
                // get the descriptor object
                const descriptorObj = this.constructor._registeredTypes[typeId.toLowerCase()];
                // check that we have a descriptor for this type
                if (descriptorObj === undefined) {
                    // pass to the next descriptor
                    continue;
                }
                // check that this descriptor is eligeble for casting
                if (descriptorObj.cast === undefined)
                    continue;
                // try to cast the value
                let castedValue;
                // try {
                castedValue = descriptorObj.cast(value);
                if (castedValue instanceof Error) {
                    // add the issue in the verboseObj
                    verboseObj.issues[typeId] = castedValue.toString();
                    // next
                    continue;
                }
                // handle the "of" parameter
                // make sure the passed type can have child(s)
                if (typeObj.of !== undefined &&
                    this.canHaveChilds(castedValue) === false) {
                    const issueStr = `Sorry but the passed type "<yellow>${typeId}</yellow>" has some child(s) dependencies "<green>${typeObj.of.join('|')}</green>" but this type can not have child(s)`;
                    if (settings.throw === true) {
                        throw parseHtml_1.default(issueStr);
                    }
                    // add the issue in the verboseObj
                    verboseObj.issues[typeId] = issueStr;
                }
                else if (typeObj.of !== undefined) {
                    const sTypeInstance = new SType(typeObj.of.join('|'));
                    castedValue = map_1.default(castedValue, (key, value, idx) => {
                        return sTypeInstance.cast(value, settings);
                    });
                }
                if (castedValue === null && descriptorObj.id === 'null')
                    return null;
                if (castedValue === undefined && descriptorObj.id === 'undefined')
                    return undefined;
                if (castedValue !== null && castedValue !== undefined)
                    return castedValue;
                // something goes wrong
                verboseObj.issues[typeId] = `Something goes wrong but no details are available... Sorry`;
            }
            // our value has not bein casted
            if (settings.throw) {
                let stack = [
                    `Sorry but the value of type "<cyan>${typeof_1.default(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:\n`
                ];
                Object.keys(verboseObj.issues).forEach((descriptorId) => {
                    stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
                });
                throw parseHtml_1.default(stack.join('\n'));
            }
            if (settings.verbose === true) {
                return new SError_1.default(verboseObj);
            }
            return new SError_1.default(`Something goes wrong with the casting process but not details available sorry...`);
        }
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
        canHaveChilds(value) {
            const type = typeof_1.default(value);
            return type === 'Array' || type === 'Object' || type === 'Map';
        }
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
        get name() {
            return this._settings.name;
        }
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
        get id() {
            return this._settings.id;
        }
    },
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
module.exports = Cls;
//# sourceMappingURL=module.js.map