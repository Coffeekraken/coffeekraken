// @shared
import __SDescriptor from '../descriptor/SDescriptor';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
import __deepMerge from '../object/deepMerge';
import __SInterfaceResult from './SInterfaceResult';
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
        this._settings = __deepMerge(this.constructor.settings, this._settings, settings);
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
        SInterfaceOverrided.definition = __deepMerge(_this.definition, definition);
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
        return __getAvailableInterfaceTypes();
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
        settings = __deepMerge(this._settings, settings);
        const descriptor = new __SDescriptor(Object.assign({ id: settings.id, name: settings.name, type: 'Object', rules: this._definition, arrayAsValue: settings.arrayAsValue, complete: settings.complete === undefined ? true : settings.complete, throw: false }, (settings.descriptorSettings || {})));
        const descriptorResult = descriptor.apply(instance);
        // nativeConsole.log('in', this._definition);
        // instanciate a new interface result object
        const interfaceResult = new __SInterfaceResult({
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
export default SInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsVUFBVTtBQUdWLE9BQU8sYUFBYSxNQUFNLDJCQUEyQixDQUFDO0FBQ3RELE9BQU8sNEJBQTRCLE1BQU0sOEJBQThCLENBQUM7QUFDeEUsT0FBTyxXQUFXLE1BQU0scUJBQXFCLENBQUM7QUFPOUMsT0FBTyxrQkFBeUMsTUFBTSxvQkFBb0IsQ0FBQztBQW1FM0UsYUFBYTtBQUNiLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztBQUNuRCxNQUFNLFVBQVU7SUE4S2Q7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUFnQyxFQUFFO1FBdEc5Qzs7Ozs7Ozs7OztXQVVHO1FBQ0gsZ0JBQVcsR0FBc0IsRUFBRSxDQUFDO1FBZXBDOzs7Ozs7Ozs7V0FTRztRQUNILGNBQVMsR0FBd0I7WUFDL0IsWUFBWSxFQUFFLEtBQUs7WUFDbkIsS0FBSyxFQUFFLEtBQUs7WUFDWixRQUFRLEVBQUUsSUFBSTtTQUNmLENBQUM7UUErREEsYUFBYTtRQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsV0FBVyxDQUNwQixJQUFLLENBQUMsV0FBVyxDQUFDLFFBQVEsRUFDaEMsSUFBSSxDQUFDLFNBQVMsRUFDZCxRQUFRLENBQ1QsQ0FBQztRQUNGLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLEtBQUssU0FBUztZQUNuQyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUk7Z0JBQ1gsSUFBSSxDQUFDLFdBQVksQ0FBQyxhQUFhLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUM7UUFDbkUsSUFBSSxDQUFDLFdBQVcsR0FBUyxJQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUN4RCxDQUFDO0lBckxEOzs7Ozs7Ozs7Ozs7O09BYUc7SUFDSCxNQUFNLENBQUMsUUFBUSxDQUFDLFVB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