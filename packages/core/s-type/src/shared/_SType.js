"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const map_1 = __importDefault(require("@coffeekraken/sugar/shared/iterable/map"));
const getExtendsStack_1 = __importDefault(require("@coffeekraken/sugar/shared/class/utils/getExtendsStack"));
const typeof_1 = __importDefault(require("@coffeekraken/sugar/shared/value/typeof"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const parseHtml_1 = __importDefault(require("@coffeekraken/sugar/shared/console/parseHtml"));
const parseTypeString_1 = __importDefault(require("./utils/parseTypeString"));
const STypeResult_1 = __importDefault(require("./STypeResult"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class SType {
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
    static registerType(type) {
        if (type.id === undefined || typeof type.id !== 'string') {
            throw `Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`;
        }
        this._registeredTypes[type.id] = type;
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
        else if (res instanceof STypeResult_1.default)
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
        settings = deepMerge_1.default(this._settings, settings);
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
                const issueObj = {
                    expected: {
                        type: typeObj.type
                    },
                    received: {
                        type: typeof_1.default(value),
                        value
                    }
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
        const res = new STypeResult_1.default({
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
        });
        if (settings.throw === true)
            throw new Error(res.toString());
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
        settings = deepMerge_1.default(this._settings, settings);
        // console.log('type', type, settings);
        // check that the passed type is registered
        if (this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
            if (settings.interfaces === true) {
                const availableInterfaceTypes = s_interface_1.default.getAvailableTypes();
                if (availableInterfaceTypes[type] !== undefined) {
                    const res = availableInterfaceTypes[type].apply(value, {});
                    return res;
                }
            }
            // handle custom types
            if (settings.customTypes === true) {
                const typeOf = typeof_1.default(value).toLowerCase();
                const extendsStack = Object.keys(getExtendsStack_1.default(value)).map((s) => s.toLowerCase());
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
        const verboseObj = {
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
                castedValue = map_1.default(castedValue, ({ value }) => {
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
            const stack = [
                `Sorry but the value of type "<cyan>${typeof_1.default(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:\n`
            ];
            Object.keys(verboseObj.issues).forEach((descriptorId) => {
                stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
            });
            throw parseHtml_1.default(stack.join('\n'));
        }
        if (settings.verbose === true) {
            return new Error(verboseObj);
        }
        return new Error(`Something goes wrong with the casting process but not details available sorry...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLGtGQUE0RDtBQUM1RCw2R0FBdUY7QUFDdkYscUZBQStEO0FBQy9ELDRGQUFzRTtBQUN0RSw2RkFBdUU7QUFDdkUsOEVBRWlDO0FBQ2pDLGdFQUEwQztBQUMxQyw0RUFBcUQ7QUFvR3JELE1BQU0sS0FBSztJQStFVDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFVBQWtCLEVBQUUsV0FBMkIsRUFBRTtRQUMzRCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsNkJBQTZCO1FBQzdCLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0MscUNBQXFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTO1lBQy9ELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUN6RCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7UUFDakQsb0JBQW9CO1FBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7WUFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDM0IsS0FBSyxFQUFFLEtBQUs7WUFDWixXQUFXLEVBQUUsSUFBSTtZQUNqQixVQUFVLEVBQUUsSUFBSTtZQUNoQixPQUFPLEVBQUUsS0FBSztTQUNmLEVBQ0QsUUFBUSxDQUNULENBQUM7UUFFRixnREFBZ0Q7UUFDaEQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxV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