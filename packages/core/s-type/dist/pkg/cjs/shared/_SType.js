"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const class_1 = require("@coffeekraken/sugar/class");
const console_1 = require("@coffeekraken/sugar/console");
const iterable_1 = require("@coffeekraken/sugar/iterable");
const object_1 = require("@coffeekraken/sugar/object");
const type_1 = require("@coffeekraken/sugar/type");
const STypeResult_js_1 = __importDefault(require("./STypeResult.js"));
function __isNode() {
    return (typeof process !== 'undefined' &&
        process.release &&
        process.release.name === 'node');
}
function __getAvailableInterfaceTypes() {
    // @ts-ignore
    if (__isNode())
        return global._registeredInterfacesTypes || {};
    // @ts-ignore
    else if (window !== undefined)
        return window._registeredInterfacesTypes || {};
    else
        return {};
}
class SType {
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
            throw new Error(`Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`);
        }
        this._registeredTypes[type.id] = type;
    }
    /**
     * @name      parseTypeString
     * @type      Function
     * @static
     *
     * This static method allows you to parse a type string.
     *
     * @param     {String}        typeString      The type string to parse
     * @return    {ITypeStringObject[]}             An array of object(s) describing the type string passed
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    static parseTypeString(typeString) {
        return (0, type_1.__parseTypeString)(typeString);
    }
    /**
     * @name      constructor
     * @type      Function
     * @constructor
     *
     * Constructor
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
        if (typeString.includes('[]')) {
            console.log(typeString);
        }
        this.types = (0, type_1.__parseTypeString)(typeString);
        if (typeString.includes('[]')) {
            console.log(this.types);
        }
        // save the settings
        this.settings = (0, object_1.__deepMerge)({
            id: this.constructor.name,
            name: this.constructor.name,
            customTypes: true,
            interfaces: true,
        }, settings);
        // save the instance into the instanciated stack
        this.constructor._instanciatedTypes[typeString] = this;
    }
    /**
     * @name      is
     * @type      Function
     *
     * This method make a simple check to see if the passed value correspond to the
     * type that this instance represent.
     * Same as the ```check``` method, but return only a Boolean.
     *
     * @param     {Any}       value       The value to check
     * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
     * @return    {Boolean}               true if correspond, false if not
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    is(value, settings = {}) {
        const res = this.check(value, settings);
        if (res === true)
            return true;
        else if (res instanceof STypeResult_js_1.default)
            return !res.hasIssues();
        return true;
    }
    /**
     * @name        check
     * @type        Function
     *
     * This method allows you to make sure the passed value correspond with the type(s)
     * this instance represent
     * If all is ok, return true, otherwise return an instance of the STypeResult class that
     * describe what is wrong
     *
     * @param     {Any}       value       The value to check
     * @param     {ISTypeSettings}        [settings={}]     Some settings to configure your check
     * @return    {Boolean|STypeResult}               true if correspond, an instance of the STypeResult class if not
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    check(value, settings = {}) {
        settings = (0, object_1.__deepMerge)(this.settings, settings);
        const issues = {};
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
                const typeOf = (0, type_1.__typeOf)(value);
                if (typeOf !== 'Array' &&
                    typeOf !== 'Object' &&
                    typeOf !== 'Map') {
                    throw new Error(`Sorry but you have specified a type string "<yellow>${this.typeString}</yellow>" with some "<...>" definition on a type "<cyan>${typeOf}</cyan>" that does not support "child" value(s)...`);
                }
                // get the keys on which to loop
                const loopOn = typeOf === 'Object'
                    ? Object.keys(value)
                    : Array.from(value.keys());
                if (!loopOn.length)
                    return true;
                // loop on all the keys found
                for (let k = 0; k < loopOn.length; k++) {
                    for (let j = 0; j < typeObj.of.length; j++) {
                        const type = typeObj.of[j];
                        const idx = loopOn[k];
                        const v = typeOf === 'Map' ? value.get(idx) : value[idx];
                        // validate the value if needed
                        const ofRes = this._isType(v, type, settings);
                        if (ofRes !== true) {
                            issues[typeObj.type] = {
                                expected: {
                                    type: typeObj.type,
                                },
                                received: {
                                    type: (0, type_1.__typeOf)(v),
                                    value: v,
                                },
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
                const issueObj = {
                    expected: {
                        type: typeObj.type,
                    },
                    received: {
                        type: (0, type_1.__typeOf)(value),
                        value,
                    },
                };
                if (res !== undefined &&
                    res !== null &&
                    res !== false &&
                    res.toString &&
                    typeof res.toString === 'function') {
                    issueObj.message = res.toString();
                }
                issues[typeObj.type] = issueObj;
            }
        }
        const res = new STypeResult_js_1.default({
            typeString: this.typeString,
            value,
            expected: {
                type: this.typeString,
            },
            received: {
                type: (0, type_1.__typeOf)(value),
            },
            issues,
            settings,
        });
        return res;
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
        settings = (0, object_1.__deepMerge)(this.settings, settings);
        // console.log('type', type, settings);
        // check that the passed type is registered
        if (this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
            if (settings.interfaces === true) {
                const availableInterfaceTypes = __getAvailableInterfaceTypes();
                if (availableInterfaceTypes[type] !== undefined) {
                    const res = availableInterfaceTypes[type].apply(value, {});
                    return res;
                }
            }
            // handle custom types
            if (settings.customTypes === true) {
                const typeOf = (0, type_1.__typeOf)(value).toLowerCase();
                const extendsStack = Object.keys((0, class_1.__getExtendsStack)(value)).map((s) => s.toLowerCase());
                if (type === typeOf || extendsStack.indexOf(type) !== -1)
                    return true;
            }
            throw new Error(`Sorry but you try to validate a value with the type "<yellow>${type}</yellow>" but this type is not registered...`);
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
    cast(value, params, settings) {
        settings = (0, object_1.__deepMerge)(this.settings, settings);
        // store exceptions coming from descriptors
        const verboseObj = {
            value,
            issues: {},
            settings,
            toString() {
                const strAr = Object.entries(this.issues);
                return strAr.map((l) => l[1]).join('\n');
            },
        };
        // check if the value is already at the good type
        if (this.is(value)) {
            return value;
        }
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
            castedValue = descriptorObj.cast(value, params);
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
                throw new Error((0, console_1.__parseHtml)(issueStr));
            }
            else if (typeObj.of !== undefined) {
                const sTypeInstance = new SType(typeObj.of.join('|'));
                castedValue = (0, iterable_1.__map)(castedValue, ({ value }) => {
                    return sTypeInstance.cast(value, params, settings);
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
        const stack = [
            `Sorry but the value of type "<cyan>${(0, type_1.__typeOf)(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:\n`,
        ];
        Object.keys(verboseObj.issues).forEach((descriptorId) => {
            stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
        });
        throw new Error((0, console_1.__parseHtml)(stack.join('\n')));
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
        const type = (0, type_1.__typeOf)(value);
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
        return this.settings.name;
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
        return this.settings.id;
    }
}
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
const Cls = SType;
exports.default = SType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLHFEQUE4RDtBQUM5RCx5REFBMEQ7QUFDMUQsMkRBQXFEO0FBQ3JELHVEQUF5RDtBQUV6RCxtREFBdUU7QUFDdkUsc0VBQTZDO0FBNEY3QyxTQUFTLFFBQVE7SUFDYixPQUFPLENBQ0gsT0FBTyxPQUFPLEtBQUssV0FBVztRQUM5QixPQUFPLENBQUMsT0FBTztRQUNmLE9BQU8sQ0FBQyxPQUFPLENBQUMsSUFBSSxLQUFLLE1BQU0sQ0FDbEMsQ0FBQztBQUNOLENBQUM7QUFDRCxTQUFTLDRCQUE0QjtJQUNqQyxhQUFhO0lBQ2IsSUFBSSxRQUFRLEVBQUU7UUFBRSxPQUFPLE1BQU0sQ0FBQywwQkFBMEIsSUFBSSxFQUFFLENBQUM7SUFDL0QsYUFBYTtTQUNSLElBQUksTUFBTSxLQUFLLFNBQVM7UUFDekIsT0FBTyxNQUFNLENBQUMsMEJBQTBCLElBQUksRUFBRSxDQUFDOztRQUM5QyxPQUFPLEVBQUUsQ0FBQztBQUNuQixDQUFDO0FBRUQsTUFBTSxLQUFLO0lBMkRQOzs7Ozs7Ozs7Ozs7T0FZRztJQUNILE1BQU0sQ0FBQyxZQUFZLENBQUMsSUFBc0I7UUFDdEMsSUFBSSxJQUFJLENBQUMsRUFBRSxLQUFLLFNBQVMsSUFBSSxPQUFPLElBQUksQ0FBQyxFQUFFLEtBQUssUUFBUSxFQUFFO1lBQ3RELE1BQU0sSUFBSSxLQUFLLENBQ1gsMEZBQTBGLENBQzdGLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDO0lBQzFDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFVBQWtCO1FBQ3JDLE9BQU8sSUFBQSx3QkFBaUIsRUFBQyxVQUFVLENBQUMsQ0FBQztJQUN6QyxDQUFDO0lBRUQ7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