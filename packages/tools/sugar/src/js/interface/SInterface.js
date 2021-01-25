"use strict";
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SDescriptor_1 = __importDefault(require("../descriptor/SDescriptor"));
const getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
const deepMerge_1 = __importDefault(require("../object/deepMerge"));
const SInterfaceResult_1 = __importDefault(require("./SInterfaceResult"));
// @ts-ignore
(global || window)._registeredInterfacesTypes = {};
class SInterface {
    /**
     * @name              constructor
     * @type              Function
     * @constructor
     *
     * Constructor
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    constructor(settings = {}) {
        /**
         * @name              _definition
         * @type              ISDescriptorRules
         * @private
         *
         * This property store all the SDescriptor rules that this interface
         * implements for each properties
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._definition = {};
        /**
         * @name              _settings
         * @type              ISDescriptorRules
         * @private
         *
         * This property store all the settings for your SInterface instance
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._settings = {
            arrayAsValue: false,
            throw: false,
            complete: true
        };
        // @ts-ignore
        this._settings = deepMerge_1.default(this.constructor.settings, this._settings, settings);
        if (this._settings.name === undefined)
            this._settings.name =
                this.constructor.overridedName || this.constructor.name;
        this._definition = this.constructor.definition;
    }
    /**
     * @name      overrie
     * @type      Function
     * @static
     *
     * This static method is usefull to make a duplicate of the base interface with some updates
     * in the definition object.
     *
     * @param     {Object}      definition      A definition object to override or extends the base one
     * @return    {SInterface}                  A new interface overrided with your new values
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static override(definition) {
        const _this = this;
        class SInterfaceOverrided extends this {
        }
        SInterfaceOverrided.overridedName = `${_this.name} (overrided)`;
        SInterfaceOverrided.definition = deepMerge_1.default(_this.definition, definition);
        return SInterfaceOverrided;
    }
    /**
     * @name            getAvailableTypes
     * @type            Function
     * @static
     *
     * This static method allows you to get the types that have been make widely available
     * using the ```makeAvailableAsType``` method.
     *
     * @return      {Object<SInterface>}          An object listing all the interface types maked available widely
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static getAvailableTypes() {
        return getAvailableInterfaceTypes_1.default();
    }
    /**
     * @name            makeAvailableAsType
     * @type            Function
     * @static
     *
     * This static method allows you to promote your interface at the level where it can be
     * used in the "type" interface definition property like so "Object<MyCoolType>"
     *
     * @param       {String}      [name=null]       A custom name to register your interface. Otherwise take the class name and register two types: MyClassInterface => MyClassInterface && MyClass
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static makeAvailableAsType(name = null) {
        const n = (name || this.name).toLowerCase();
        if (global !== undefined) {
            // @ts-ignore
            global._registeredInterfacesTypes[n] = this;
            // @ts-ignore
            global._registeredInterfacesTypes[n.replace('interface', '')] = this;
        }
        else if (window !== undefined) {
            // @ts-ignore
            window._registeredInterfacesTypes[n] = this;
            // @ts-ignore
            window._registeredInterfacesTypes[n.replace('interface', '')] = this;
        }
    }
    /**
     * @name              defaults
     * @type              Function
     * @static
     *
     * This function simply returns you the default interface values in object format
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static defaults() {
        const result = this.apply({}, {
            complete: true,
            throw: false
        });
        if (!result.hasIssues())
            return result.value;
        return {};
    }
    /**
     * @name              apply
     * @type              Function
     * @static
     *
     * This static method allows you to apply the interface on an object instance.
     * By default, if something is wrong in your class implementation, an error with the
     * description of what's wrong will be thrown. You can change that behavior if you prefer having
     * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
     *
     * @param       {Any}                instance              The instance to apply the interface on
     * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
     * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
     * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
     * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static apply(instance, settings = {}) {
        // instanciate a new SInterface
        const int = new this(settings);
        return int.apply(instance, settings);
    }
    /**
     * @name              apply
     * @type              Function
     *
     * This method allows you to apply the interface on an object instance.
     * By default, if something is wrong in your class implementation, an error with the
     * description of what's wrong will be thrown. You can change that behavior if you prefer having
     * true returned when all is ok, or a string describing the current issue by specify the "settings.throw" property to false.
     *
     * @param       {Any}                instance              The instance to apply the interface on
     * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
     * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    apply(instance, settings = {}) {
        settings = deepMerge_1.default(this._settings, settings);
        const descriptor = new SDescriptor_1.default(Object.assign({ id: settings.id, name: settings.name, type: 'Object', rules: this._definition, arrayAsValue: settings.arrayAsValue, complete: settings.complete === undefined ? true : settings.complete, throw: false }, (settings.descriptorSettings || {})));
        const descriptorResult = descriptor.apply(instance);
        // instanciate a new interface result object
        const interfaceResult = new SInterfaceResult_1.default({
            descriptorResult
        });
        if (interfaceResult.hasIssues() && settings.throw) {
            throw interfaceResult.toString();
        }
        // return new result object
        return interfaceResult;
    }
}
/**
 * @name              definition
 * @type              ISDescriptorRules
 * @static
 *
 * This property store all the SDescriptor rules that this interface
 * implements for each properties
 *
 * @since             2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SInterface.definition = {};
/**
 * @name              settings
 * @type              ISDescriptorRules
 * @static
 *
 * This property store all the settings for your SInterface class. These settings
 * can be overrided at instance level
 *
 * @since             2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SInterface.settings = {};
const Cls = SInterface;
exports.default = SInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLFVBQVU7Ozs7O0FBR1YsNEVBQXNEO0FBQ3RELDhGQUF3RTtBQUN4RSxvRUFBOEM7QUFPOUMsMEVBQTJFO0FBbUUzRSxhQUFhO0FBQ2IsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBQ25ELE1BQU0sVUFBVTtJQThLZDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFdBQWdDLEVBQUU7UUF0RzlDOzs7Ozs7Ozs7O1dBVUc7UUFDSCxnQkFBVyxHQUFzQixFQUFFLENBQUM7UUFlcEM7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUF3QjtZQUMvQixZQUFZLEVBQUUsS0FBSztZQUNuQixLQUFLLEVBQUUsS0FBSztZQUNaLFFBQVEsRUFBRSxJQUFJO1NBQ2YsQ0FBQztRQStEQSxhQUFhO1FBQ2IsSUFBSSxDQUFDLFNBQVMsR0FBRyxtQkFBVyxDQUNwQixJQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFDZCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUztZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Z0JBQ1gsSUFBSSxDQUFDLFdBQVksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVcsR0FBUyxJQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUN4RCxDQUFDO0lBckxEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLFVBQVU7UUFDeEIsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBQ25CLE1BQU0sbUJBQW9CLFNBQVEsSUFBSTs7UUFDN0IsaUNBQWEsR0FB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