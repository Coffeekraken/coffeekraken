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
        define(["require", "exports", "../iterable/map", "../class/getExtendsStack", "../value/typeof", "../object/deepMerge", "../console/parseHtml", "./parseTypeString", "./STypeResult", "@coffeekraken/s-interface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const map_1 = __importDefault(require("../iterable/map"));
    const getExtendsStack_1 = __importDefault(require("../class/getExtendsStack"));
    const typeof_1 = __importDefault(require("../value/typeof"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const parseHtml_1 = __importDefault(require("../console/parseHtml"));
    const parseTypeString_1 = __importDefault(require("./parseTypeString"));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDBEQUFvQztJQUNwQywrRUFBeUQ7SUFDekQsNkRBQXVDO0lBQ3ZDLG9FQUE4QztJQUM5QyxxRUFBK0M7SUFDL0Msd0VBRTJCO0lBQzNCLGdFQUEwQztJQUMxQyw0RUFBcUQ7SUFvR3JELE1BQU0sS0FBSztRQStFVDs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFVBQWtCLEVBQUUsV0FBMkIsRUFBRTtZQUMzRCxzQkFBc0I7WUFDdEIsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7WUFDN0IsNkJBQTZCO1lBQzdCLFVBQVUsR0FBRyxVQUFVLENBQUMsV0FBVyxFQUFFLENBQUMsSUFBSSxFQUFFLENBQUM7WUFDN0MscUNBQXFDO1lBQ3JDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxrQkFBa0IsQ0FBQyxVQUFVLENBQUMsS0FBSyxTQUFTO2dCQUMvRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLENBQUM7WUFDekQsdUJBQXVCO1lBQ3ZCLElBQUksQ0FBQyxLQUFLLEdBQUcseUJBQWlCLENBQUMsVUFBVSxDQUFDLENBQUMsS0FBSyxDQUFDO1lBQ2pELG9CQUFvQjtZQUNwQixJQUFJLENBQUMsU0FBUyxHQUFHLG1CQUFXLENBQzFCO2dCQUNFLEVBQUUsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQ3pCLElBQUksRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7Z0JBQzNCLEtBQUssRUFBRSxLQUFLO2dCQUNaLFdBQVcsRUFBRSxJQUFJO2dCQUNqQixVQUFVLEVBQUUsSUFBSTtnQkFDaEIsT0FBTyxFQUFFLEtBQUs7YUFDZixFQUNELFFBQVEsQ0FDVCxDQUFDO1lBRUYsZ0RBQWdEO1lBQ2hELElBQUksQ0FBQyxXQUFXLENB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