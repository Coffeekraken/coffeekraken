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
        define(["require", "exports", "../error/SError", "../iterable/map", "../class/getExtendsStack", "../value/typeof", "../object/deepMerge", "../console/parseHtml", "./parseTypeString", "./STypeResult", "@coffeekraken/s-interface"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SError_1 = __importDefault(require("../error/SError"));
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NUeXBlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiX1NUeXBlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLDZEQUF1QztJQUN2QywwREFBb0M7SUFDcEMsK0VBQXlEO0lBQ3pELDZEQUF1QztJQUN2QyxvRUFBOEM7SUFDOUMscUVBQStDO0lBQy9DLHdFQUUyQjtJQUMzQixnRUFBMEM7SUFDMUMsNEVBQXFEO0lBb0dyRCxNQUFNLEtBQUs7UUErRVQ7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxVQUFrQixFQUFFLFdBQTJCLEVBQUU7WUFDM0Qsc0JBQXNCO1lBQ3RCLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1lBQzdCLDZCQUE2QjtZQUM3QixVQUFVLEdBQUcsVUFBVSxDQUFDLFdBQVcsRUFBRSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdDLHFDQUFxQztZQUNyQyxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsa0JBQWtCLENBQUMsVUFBVSxDQUFDLEtBQUssU0FBUztnQkFDL0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDLGtCQUFrQixDQUFDLFVBQVUsQ0FBQyxDQUFDO1lBQ3pELHVCQUF1QjtZQUN2QixJQUFJLENBQUMsS0FBSyxHQUFHLHlCQUFpQixDQUFDLFVBQVUsQ0FBQyxDQUFDLEtBQUssQ0FBQztZQUNqRCxvQkFBb0I7WUFDcEIsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUMxQjtnQkFDRSxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUN6QixJQUFJLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJO2dCQUMzQixLQUFLLEVBQUUsS0FBSztnQkFDWixXQUFXLEVBQUUsSUFBSTtnQkFDakIsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLE9BQU8sRUFBRSxLQUFLO2FBQ2YsRUFDRCxRQUFRLENBQ1QsQ0FBQztZQUVGLGdEQUFnRDtZQUNoRCxJQUFJ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