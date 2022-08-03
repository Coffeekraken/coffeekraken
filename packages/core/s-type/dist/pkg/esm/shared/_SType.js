// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __getExtendsStack from '@coffeekraken/sugar/shared/class/getExtendsStack';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __map from '@coffeekraken/sugar/shared/iterable/map';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __parseTypeString from '@coffeekraken/sugar/shared/type/parseTypeString';
import __typeOf from '@coffeekraken/sugar/shared/value/typeof';
import __STypeResult from './STypeResult';
class SType {
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
        this.types = __parseTypeString(typeString);
        // save the settings
        this.settings = __deepMerge({
            id: this.constructor.name,
            name: this.constructor.name,
            customTypes: true,
            interfaces: true,
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
            throw new Error(`Sorry but you try to register a type that does not fit the ISTypeDescriptor interface...`);
        }
        this._registeredTypes[type.id] = type;
    }
    /**
     * @name      parseTypeString
     * @type      Function
     * @static
     *
     * This static method allows you to parse a type string using the `@coffeekraken/sugar/shared/type/parseTypeString` function.
     *
     * @param     {String}        typeString      The type string to parse
     * @return    {ITypeStringObject[]}             An array of object(s) describing the type string passed
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com>
     */
    static parseTypeString(typeString) {
        return __parseTypeString(typeString);
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
        else if (res instanceof __STypeResult)
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
        settings = __deepMerge(this.settings, settings);
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
                const typeOf = __typeOf(value);
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
                                    type: __typeOf(v),
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
                        type: __typeOf(value),
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
        const res = new __STypeResult({
            typeString: this.typeString,
            value,
            expected: {
                type: this.typeString,
            },
            received: {
                type: __typeOf(value),
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
        settings = __deepMerge(this.settings, settings);
        // console.log('type', type, settings);
        // check that the passed type is registered
        if (this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
            if (settings.interfaces === true) {
                const availableInterfaceTypes = __SInterface.getAvailableTypes();
                if (availableInterfaceTypes[type] !== undefined) {
                    const res = availableInterfaceTypes[type].apply(value, {});
                    return res;
                }
            }
            // handle custom types
            if (settings.customTypes === true) {
                const typeOf = __typeOf(value).toLowerCase();
                const extendsStack = Object.keys(__getExtendsStack(value)).map((s) => s.toLowerCase());
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
        settings = __deepMerge(this.settings, settings);
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
                throw new Error(__parseHtml(issueStr));
            }
            else if (typeObj.of !== undefined) {
                const sTypeInstance = new SType(typeObj.of.join('|'));
                castedValue = __map(castedValue, ({ value }) => {
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
            `Sorry but the value of type "<cyan>${__typeOf(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:\n`,
        ];
        Object.keys(verboseObj.issues).forEach((descriptorId) => {
            stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
        });
        throw new Error(__parseHtml(stack.join('\n')));
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
        const type = __typeOf(value);
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
export default SType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLGlCQUFpQixNQUFNLGtEQUFrRCxDQUFDO0FBQ2pGLE9BQU8sV0FBVyxNQUFNLDhDQUE4QyxDQUFDO0FBQ3ZFLE9BQU8sS0FBSyxNQUFNLHlDQUF5QyxDQUFDO0FBQzVELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8saUJBRU4sTUFBTSxpREFBaUQsQ0FBQztBQUN6RCxPQUFPLFFBQVEsTUFBTSx5Q0FBeUMsQ0FBQztBQUMvRCxPQUFPLGFBQWEsTUFBTSxlQUFlLENBQUM7QUFpRzFDLE1BQU0sS0FBSztJQWtHUDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFVBQWtCLEVBQUUsV0FBMkIsRUFBRTtRQUN6RCxzQkFBc0I7UUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7UUFDN0IsNkJBQTZCO1FBQzdCLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7UUFDN0MscUNBQXFDO1FBQ3JDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTO1lBQzdELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzRCx1QkFBdUI7UUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyxpQkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUMzQyxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFFBQVEsR0FBRyxXQUFXLENBQ3ZCO1lBQ0ksRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtZQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO1lBQzNCLFdBQVcsRUFB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