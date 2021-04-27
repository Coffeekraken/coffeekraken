// @ts-nocheck
import __map from '@coffeekraken/sugar/shared/iterable/map';
import __getExtendsStack from '@coffeekraken/sugar/shared/class/utils/getExtendsStack';
import __typeOf from '@coffeekraken/sugar/shared/value/typeof';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __parseHtml from '@coffeekraken/sugar/shared/console/parseHtml';
import __parseTypeString from './utils/parseTypeString';
import __STypeResult from './STypeResult';
import __SInterface from '@coffeekraken/s-interface';
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
        this.types = __parseTypeString(typeString).types;
        // save the settings
        this._settings = __deepMerge({
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
        settings = __deepMerge(this._settings, settings);
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
                                    type: __typeOf(v),
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
                        type: __typeOf(value),
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
        const res = new __STypeResult({
            typeString: this.typeString,
            value,
            expected: {
                type: this.typeString
            },
            received: {
                type: __typeOf(value)
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
        settings = __deepMerge(this._settings, settings);
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
        settings = __deepMerge(this._settings, settings);
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
                    throw __parseHtml(issueStr);
                }
                // add the issue in the verboseObj
                verboseObj.issues[typeId] = issueStr;
            }
            else if (typeObj.of !== undefined) {
                const sTypeInstance = new SType(typeObj.of.join('|'));
                castedValue = __map(castedValue, ({ value }) => {
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
                `Sorry but the value of type "<cyan>${__typeOf(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:\n`
            ];
            Object.keys(verboseObj.issues).forEach((descriptorId) => {
                stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
            });
            throw __parseHtml(stack.join('\n'));
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
export default SType;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXR5cGUvc3JjL3NoYXJlZC9fU1R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sS0FBSyxNQUFNLHlDQUF5QyxDQUFDO0FBQzVELE9BQU8saUJBQWlCLE1BQU0sd0RBQXdELENBQUM7QUFDdkYsT0FBTyxRQUFRLE1BQU0seUNBQXlDLENBQUM7QUFDL0QsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sOENBQThDLENBQUM7QUFDdkUsT0FBTyxpQkFFTixNQUFNLHlCQUF5QixDQUFDO0FBQ2pDLE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQW9HckQsTUFBTSxLQUFLO0lBK0VUOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksVUFBa0IsRUFBRSxXQUEyQixFQUFFO1FBQzNELHNCQUFzQjtRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3Qiw2QkFBNkI7UUFDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxxQ0FBcUM7UUFDckMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVM7WUFDL0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELHVCQUF1QjtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLGlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqRCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxXQUFXLENBQzFCO1lBQ0UsRUFBRSxFQUFFLElBQUksQ0FBQyxX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