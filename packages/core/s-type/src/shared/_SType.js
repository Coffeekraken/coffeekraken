// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/sugar/shared/iterable/map", "@coffeekraken/sugar/shared/class/utils/getExtendsStack", "@coffeekraken/sugar/shared/value/typeof", "@coffeekraken/sugar/shared/object/deepMerge", "@coffeekraken/sugar/shared/console/parseHtml", "./utils/parseTypeString", "./STypeResult", "@coffeekraken/s-interface"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vLi4vcGFja2FnZXMvY29yZS9zLXR5cGUvc3JjL3NoYXJlZC9fU1R5cGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsa0ZBQTREO0lBQzVELDZHQUF1RjtJQUN2RixxRkFBK0Q7SUFDL0QsNEZBQXNFO0lBQ3RFLDZGQUF1RTtJQUN2RSw4RUFFaUM7SUFDakMsZ0VBQTBDO0lBQzFDLDRFQUFxRDtJQW9HckQsTUFBTSxLQUFLO1FBK0VUOzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksVUFBa0IsRUFBRSxXQUEyQixFQUFFO1lBQzNELHNCQUFzQjtZQUN0QixJQUFJLENBQUMsVUFBVSxHQUFHLFVBQVUsQ0FBQztZQUM3Qiw2QkFBNkI7WUFDN0IsVUFBVSxHQUFHLFVBQVUsQ0FBQyxXQUFXLEVBQUUsQ0FBQyxJQUFJLEVBQUUsQ0FBQztZQUM3QyxxQ0FBcUM7WUFDckMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVM7Z0JBQy9ELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsQ0FBQztZQUN6RCx1QkFBdUI7WUFDdkIsSUFBSSxDQUFDLEtBQUssR0FBRyx5QkFBaUIsQ0FBQyxVQUFVLENBQUMsQ0FBQyxLQUFLLENBQUM7WUFDakQsb0JBQW9CO1lBQ3BCLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDMUI7Z0JBQ0UsRUFBRSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDekIsSUFBSSxFQUFFLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtnQkFDM0IsS0FBSyxFQUFFLEtBQUs7Z0JBQ1osV0FBVyxFQUFFLElBQUk7Z0JBQ2pCLFVBQVUsRUFBRSxJQUFJO2dCQUNoQixPQUFPLEVBQUUsS0FBSzth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