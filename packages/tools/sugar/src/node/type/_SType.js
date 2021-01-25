"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SError_1 = __importDefault(require("../error/SError"));
const map_1 = __importDefault(require("../iterable/map"));
const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
const typeof_1 = __importDefault(require("../value/typeof"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const parseHtml_1 = __importDefault(require("../console/parseHtml"));
const parseTypeString_1 = __importDefault(require("./parseTypeString"));
const STypeResult_1 = __importDefault(require("./STypeResult"));
const getAvailableInterfaceTypes_1 = __importDefault(require("../interface/getAvailableInterfaceTypes"));
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
        settings = deepMerge_1.default(this._settings, settings);
        // console.log('type', type, settings);
        // check that the passed type is registered
        if (this.constructor._registeredTypes[type.toLowerCase()] === undefined) {
            if (settings.interfaces === true) {
                const availableInterfaceTypes = getAvailableInterfaceTypes_1.default();
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7QUFFViw2REFBdUM7QUFDdkMsMERBQW9DO0FBRXBDLCtFQUF5RDtBQUN6RCw2REFBdUM7QUFLdkMsb0VBQThDO0FBQzlDLHFFQUErQztBQUMvQyx3RUFBa0Q7QUFDbEQsZ0VBQTBDO0FBQzFDLHlHQUFtRjtBQXVHbkYsTUFBTSxLQUFLO0lBK0VUOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksVUFBa0IsRUFBRSxXQUEyQixFQUFFO1FBQzNELHNCQUFzQjtRQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztRQUM3Qiw2QkFBNkI7UUFDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztRQUM3QyxxQ0FBcUM7UUFDckMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVM7WUFDL0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ3pELHVCQUF1QjtRQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztRQUNqRCxvQkFBb0I7UUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtZQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7WUFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtZQUMzQixLQUFLLEVBQUUsS0FBSztZQUNaLFdBQVcsRUFBRSxJQUFJO1lBQ2pCLFVBQVUsRUFBRSxJQUFJO1lBQ2hCLE9BQU8sRUFBRSxLQUFLO1NBQ2YsRUFDRCxRQUFRLENBQ1QsQ0FBQztRQUNGLGdEQUFnRDtRQUNoRCxJQUFJLENBQUMs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