// @ts-nocheck
// @shared
import __SError from '../error/SError';
import __map from '../iterable/map';
import __getExtendsStack from '../class/getExtendsStack';
import __typeOf from '../value/typeof';
import __deepMerge from '../object/deepMerge';
import __parseHtml from '../console/parseHtml';
import __parseTypeString from './parseTypeString';
import __STypeResult from './STypeResult';
import __getAvailableInterfaceTypes from '../interface/getAvailableInterfaceTypes';
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
        settings = __deepMerge(this._settings, settings);
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
            throw res.toString();
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
                const availableInterfaceTypes = __getAvailableInterfaceTypes();
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
                    throw __parseHtml(issueStr);
                }
                // add the issue in the verboseObj
                verboseObj.issues[typeId] = issueStr;
            }
            else if (typeObj.of !== undefined) {
                const sTypeInstance = new SType(typeObj.of.join('|'));
                castedValue = __map(castedValue, (key, value, idx) => {
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
                `Sorry but the value of type "<cyan>${__typeOf(value)}</cyan>" passed to be casted in type "<yellow>${this.typeString}</yellow>" can not be casted correctly. Here's why:\n`
            ];
            Object.keys(verboseObj.issues).forEach((descriptorId) => {
                stack.push(`- <red>${descriptorId}</red>: ${verboseObj.issues[descriptorId]}`);
            });
            throw __parseHtml(stack.join('\n'));
        }
        if (settings.verbose === true) {
            return new __SError(verboseObj);
        }
        return new __SError(`Something goes wrong with the casting process but not details available sorry...`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVO0FBRVYsT0FBTyxRQUFRLE1BQU0saUJBQWlCLENBQUM7QUFDdkMsT0FBTyxLQUFLLE1BQU0saUJBQWlCLENBQUM7QUFFcEMsT0FBTyxpQkFBaUIsTUFBTSwwQkFBMEIsQ0FBQztBQUN6RCxPQUFPLFFBQVEsTUFBTSxpQkFBaUIsQ0FBQztBQUt2QyxPQUFPLFdBQVcsTUFBTSxxQkFBcUIsQ0FBQztBQUM5QyxPQUFPLFdBQVcsTUFBTSxzQkFBc0IsQ0FBQztBQUMvQyxPQUFPLGlCQUFpQixNQUFNLG1CQUFtQixDQUFDO0FBQ2xELE9BQU8sYUFBYSxNQUFNLGVBQWUsQ0FBQztBQUMxQyxPQUFPLDRCQUE0QixNQUFNLHlDQUF5QyxDQUFDO0FBdUduRixNQUFNLEtBQUs7SUErRVQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxVQUFrQixFQUFFLFdBQTJCLEVBQUU7UUFDM0Qsc0JBQXNCO1FBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLDZCQUE2QjtRQUM3QixVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzdDLHFDQUFxQztRQUNyQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUztZQUMvRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDekQsdUJBQXVCO1FBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcsaUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1FBQ2pELG9CQUFvQjtRQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FDMUI7WUFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJ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