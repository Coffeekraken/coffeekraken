"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a;
const typeof_1 = __importDefault(require("../value/typeof"));
const upperFirst_1 = __importDefault(require("../string/upperFirst"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
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
const Cls = (_a = class SType {
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
                verbose: true
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
            // loop on each types
            for (let i = 0; i < this.types.length; i++) {
                const typeObj = this.types[i], typeId = typeObj.type;
                // check the value
                const res = this._isType(value, typeId);
                // if the result is falsy
                if (res !== true) {
                    if (settings.verbose === true) {
                        const typeOf = typeof_1.default(value);
                        const verboseObj = {
                            typeString: this.typeString,
                            value,
                            expected: {
                                type: upperFirst_1.default(typeId)
                            },
                            received: {
                                type: upperFirst_1.default(typeOf)
                            }
                        };
                        return verboseObj;
                    }
                    return false;
                }
                // check if the element has to be an array or an object containing some types
                if (typeObj.of !== undefined) {
                    // make sure the type of the passed value
                    // is one of that can contain some values
                    // like "object", "array" or "map"
                    const typeOf = typeof_1.default(value);
                    if (settings.throw &&
                        typeOf !== 'Array' &&
                        typeOf !== 'Object' &&
                        typeOf !== 'Map') {
                        throw `Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf}</cyan>" that does not support "child" value(s)...`;
                    }
                    const loopOn = typeOf === 'Array'
                        ? value.keys()
                        : typeOf === 'Object'
                            ? Object.keys(value)
                            : Array.from(value.keys());
                    for (let k = 0; k < loopOn.length; k++) {
                        let isValid = false, invalidType, invalidValue, invalidIdx;
                        for (let j = 0; j < typeObj.of.length; j++) {
                            if (isValid === false) {
                                const type = typeObj.of[j];
                                const idx = loopOn[k];
                                const v = typeOf === 'Map' ? value.get(idx) : value[idx];
                                // validate the value if needed
                                const ofRes = this._isType(v, type);
                                if (ofRes !== true) {
                                    invalidIdx = idx;
                                    invalidType = typeof_1.default(v);
                                    invalidValue = v;
                                }
                                isValid = ofRes;
                            }
                        }
                        // check if the checked value does not correspond to any of the passed
                        // types
                        if (isValid === false) {
                            if (settings.verbose === true) {
                                const verboseObj = {
                                    typeString: this.typeString,
                                    from: value,
                                    index: invalidIdx,
                                    value: invalidValue,
                                    expected: {
                                        type: typeObj.of.map((t) => upperFirst_1.default(t)).join(',')
                                    },
                                    received: {
                                        type: upperFirst_1.default(invalidType)
                                    }
                                };
                                return verboseObj;
                            }
                            return false;
                        }
                    }
                }
            }
            return true;
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
            if (settings.throw &&
                this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
                throw `Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`;
            }
            // validate the value using the "is" type method
            return this.constructor._registeredTypes[type.toLowerCase()].is(value);
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
