import __SClass from '@coffeekraken/s-class';
import __SDescriptor from '@coffeekraken/s-descriptor';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
// @ts-ignore
if (__isNode())
    global._registeredInterfacesTypes = {};
// @ts-ignore
else
    window._registeredInterfacesTypes = {};
/**
 * @name            SInterface
 * @namespace       s-interface.shared
 * @type            Class
 *
 * This class allows you to define some rules that some object or instance
 * have to follow. You will be able to apply these rules and see what
 * does not fit correctly.
 *
 * @todo         doc
 * @todo        tests
 * @todo        add possibility to set a "details" on each rules for better returns
 *
 * @example         js
 * import SInterface from '@coffeekraken/sugar/js/interface/SInterface';
 * class MyCoolInterface extends SInterface {
 *     static rules = {
 *          myProperty: {
 *              type: 'String',
 *              required: true
 *          }
 *      }
 * }
 * MyCoolInterface.apply({
 *      myProperty: 'Hello'
 * }); // => true
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
// @ts-ignore
export default class SInterface extends __SClass {
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
    constructor(settings) {
        // @ts-ignore
        super(__deepMerge({
            interface: {},
        }, settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name              _definition
         * @type              ISInterfaceDefinitionMap
         * @private
         *
         * This property store all the SDescriptor rules that this interface
         * implements for each properties
         *
         * @since             2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        this._definition = {};
        this._definition = this.constructor.definition;
    }
    static get definition() {
        if (!this._definition.help) {
            this._definition.help = {
                type: 'Boolean',
                description: `Display the help for this "<yellow>${this.name}</yellow>" interface...`,
                default: false,
            };
        }
        return this._definition;
    }
    static set definition(value) {
        this._definition = value;
    }
    /**
     * @name      interfaceSettings
     * @type      ISInterfaceSettings
     * @get
     *
     * Access the interface settings
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    get interfaceSettings() {
        return this._settings.interface;
    }
    static registerRenderer(rendererClass) {
        if (!rendererClass.id) {
            throw new Error(`Sorry but the interface renderer "<yellow>${rendererClass.name}</yellow>" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...`);
        }
        this._registeredRenderers[rendererClass.id] = rendererClass;
    }
    /**
     * @name      overrie
     * @type      Function
     * @static
     *
     * This static method is usefull to make a duplicate of the base interface with some updates
     * in the definition object.
     *
     * @param     {Object}      definition      A definition object to override or extends the base one
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
        const defaults = {};
        Object.keys(this.definition).forEach((key) => {
            const propObj = this.definition[key];
            if (propObj.default !== undefined) {
                defaults[key] = propObj.default;
            }
        });
        return defaults;
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
     * @param       {Any}                objectOrString              The object on which to apply the interface on, or a cli string to use as input
     * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
     * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
     * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static apply(objectOrString, settings) {
        // instanciate a new SInterface
        const int = new this({
            interface: settings !== null && settings !== void 0 ? settings : {},
        });
        return int.apply(objectOrString);
    }
    /**
     * @name            help
     * @type            Function
     * @static
     *
     * This static method allows you to get back the help using the
     * passed renderer. Awailable rendered are for now:
     * - terminal (default): The default terminal renderer
     * - more to come depending on needs...
     *
     * @param         {String}          [renderer="terminal"]        The registered renderer you want to use.
     * @param         {ISInterfaceRendererSettings}     [settings={}]     Some settings to configure your render
     *
     * @setting     {'terminal'}        [renderer="terminal"]       The renderer you want to use.
     * @setting     {Array<String>}     [exclude=['help']]                An array of properties you don't want to render
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static render(renderer = 'terminal', settings) {
        const set = __deepMerge({
            renderer: 'terminal',
            exclude: ['help'],
        }, settings);
        // check that the renderer is registered
        if (!this._registeredRenderers[renderer]) {
            throw new Error(`Sorry but the requested renderer "<yellow>${renderer}</yellow>" does not exists... Here's the available renderers: <green>${Object.keys(this._registeredRenderers).join(', ')}</green>`);
        }
        // instanciate the renderer and render the interface
        const rendererInstance = new this._registeredRenderers[renderer](this, set);
        return rendererInstance.render();
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
     * @param       {Any}                objectOrString              The object on which to apply the interface on, or a cli like string to use as input
     * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
     * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    apply(objectOrString, settings) {
        var _a;
        const set = __deepMerge(this.interfaceSettings, settings !== null && settings !== void 0 ? settings : {});
        let objectOnWhichToApplyInterface = objectOrString;
        if (typeof objectOrString === 'string') {
            objectOnWhichToApplyInterface = __parseArgs(objectOrString);
            // explicit params
            Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
                for (let i = 0; i < Object.keys(this._definition).length; i++) {
                    const defArgName = Object.keys(this._definition)[i];
                    const obj = this._definition[defArgName];
                    if (obj.explicit) {
                        if (obj.alias && ` ${objectOrString} `.match(new RegExp(`\\s-${obj.alias}\\s`)))
                            return;
                        else if (` ${objectOrString} `.match(new RegExp(`\\s--${argName}\\s`)))
                            return;
                        delete objectOnWhichToApplyInterface[argName];
                    }
                }
            });
            // remplacing aliases
            Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
                for (let i = 0; i < Object.keys(this._definition).length; i++) {
                    const defArgName = Object.keys(this._definition)[i];
                    const obj = this._definition[defArgName];
                    if (!obj.alias)
                        continue;
                    if (obj.alias === argName && objectOnWhichToApplyInterface[defArgName] === undefined) {
                        objectOnWhichToApplyInterface[defArgName] = objectOnWhichToApplyInterface[argName];
                        delete objectOnWhichToApplyInterface[argName];
                    }
                }
            });
            Object.keys(objectOnWhichToApplyInterface).forEach((argName, i) => {
                if (argName === `${i}`) {
                    const definitionKeys = Object.keys(this._definition);
                    if (definitionKeys[i]) {
                        objectOnWhichToApplyInterface[definitionKeys[i]] = objectOnWhichToApplyInterface[argName];
                    }
                    delete objectOnWhichToApplyInterface[argName];
                }
            });
        }
        const descriptor = new __SDescriptor({
            descriptor: Object.assign({ type: 'Object', rules: this._definition }, ((_a = set.descriptor) !== null && _a !== void 0 ? _a : {})),
        });
        // handle base obj
        if (set.baseObj) {
            objectOnWhichToApplyInterface = __deepMerge(set.baseObj, objectOnWhichToApplyInterface);
        }
        const descriptorResult = descriptor.apply(objectOnWhichToApplyInterface);
        if (descriptorResult.hasIssues()) {
            throw new Error(descriptorResult.toString());
        }
        // return new result object
        return descriptorResult.value;
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
// static definition: ISDescriptorRules = {};
// @ts-ignore
SInterface._definition = {};
/**
 * @name      registerRenderer
 * @type      Function
 * @static
 *
 * This static method allows you to register a renderer that you can then
 * use through the ```interface.render('{rendererId}')``` interface method
 *
 * @param     {SInterfaceRenderer}      rendererClass       The renderer class you want to register
 *
 * @since     2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
SInterface._registeredRenderers = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxhQUE4RSxNQUFNLDRCQUE0QixDQUFDO0FBQ3hILE9BQU8sV0FBVyxNQUFNLDBDQUEwQyxDQUFDO0FBQ25FLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sNEJBQTRCLE1BQU0sOEJBQThCLENBQUM7QUFnQ3hFLGFBQWE7QUFDYixJQUFJLFFBQVEsRUFBRTtJQUFFLE1BQU0sQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFDdkQsYUFBYTs7SUFDUixNQUFNLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILGFBQWE7QUFDYixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBNk81Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ25ELGFBQWE7UUFDYixLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksU0FBUyxFQUFFLEVBQUU7U0FDaEIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQTFITjs7Ozs7Ozs7OztXQVVHO1FBQ0gsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1FBaUh2QyxJQUFJLENBQUMsV0FBVyxHQUFTLElBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzFELENBQUM7SUFwUEQsTUFBTSxLQUFLLFVBQVU7UUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO1lBQ3hCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHO2dCQUNwQixJQUFJLEVBQUUsU0FBUztnQkFDZixXQUFXLEVBQUUsc0NBQXNDLElBQUksQ0FBQyxJQUFJLHlCQUF5QjtnQkFDckYsT0FBTyxFQUFFLEtBQUs7YUFDakIsQ0FBQztTQUNMO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzVCLENBQUM7SUFDRCxNQUFNLEtBQUssVUFBVSxDQUFDLEtBQUs7UUFDdkIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDN0IsQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILElBQUksaUJBQWlCO1FBQ2pCLE9BQWEsSUFBSyxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUM7SUFDM0MsQ0FBQztJQWdCRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsYUFBa0I7UUFDdEMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxFQUFFLEVBQUU7WUFDbkIsTUFBTSxJQUFJLEtBQUssQ0FDWCw2Q0FBNkMsYUFBYSxDQUFDLElBQUksb0hBQW9ILENBQ3RMLENBQUM7U0FDTDtRQUNELElBQUksQ0FBQyxvQkFBb0IsQ0FBQyxhQUFhLENBQUMsRUFBRSxDQUFDLEdBQUcsYUFBYSxDQUFDO0lBQ2hFLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7OztPQWFHO0lBQ0gsTUFBTSxDQUFDLFFBQVEsQ0FBQyxVQUFVO1FBQ3RCLE1BQU0sS0FBSyxHQUFHLElBQUksQ0FBQztRQUNuQixNQUFNLG1CQUFvQixTQUFRLElBQUk7O1FBQzNCLGlDQUFhLEdBQUcsR0FBRyxLQUFLLENBQUMsSUFBSSxjQUFjLENBQUM7UUFDNUMsOEJBQVUsR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDLFVBQVUsRUFBRSxVQUFVLENBQUMsQ0FBQztRQUVsRSxPQUFPLG1CQUFtQixDQUFDO0lBQy9CLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsaUJBQWlCO1FBQ3BCLE9BQU8sNEJBQTRCLEVBQUUsQ0FBQztJQUMxQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7OztPQVlHO0lBQ0gsTUFBTSxDQUFDLG1CQUFtQixDQUFDLElBQUksR0FBRyxJQUFJO1FBQ2xDLE1BQU0sQ0FBQyxHQUFHLENBQUMsSUFBSSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxXQUFXLEVBQUUsQ0FBQztRQUM1QyxJQUFJLE1BQU0sS0FBSyxTQUFTLEVBQUU7WUFDdEIsYUFBYTtZQUNiLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsR0FBRyxJQUFJLENBQUM7WUFDNUMsYUFBYTtZQUNiLE1BQU0sQ0FBQywwQkFBMEIsQ0FBQyxDQUFDLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztTQUN4RTthQUFNLElBQUksTUFBTSxLQUFLLFNBQVMsRUFBRTtZQUM3QixhQUFhO1lBQ2IsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxHQUFHLElBQUksQ0FBQztZQUM1QyxhQUFhO1lBQ2IsTUFBTSxDQUFDLDBCQUEwQixDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDLEdBQUcsSUFBSSxDQUFDO1NBQ3hFO0lBQ0wsQ0FBQztJQWVEOzs7Ozs7Ozs7T0FTRztJQUNILE1BQU0sQ0FBQyxRQUFRO1FBQ1gsTUFBTSxRQUFRLEdBQUcsRUFBRSxDQUFDO1FBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ3pDLE1BQU0sT0FBTyxHQUFHLElBQUksQ0FBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDckMsSUFBSSxPQUFPLENBQUMsT0FBTyxLQUFLLFNBQVMsRUFBRTtnQkFDL0IsUUFBUSxDQUFDLEdBQUcsQ0FBQyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUM7YUFDbkM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE9BQU8sUUFBUSxDQUFDO0lBQ3BCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7Ozs7T0FpQkc7SUFDSCxNQUFNLENBQUMsS0FBSyxDQUFDLGNBQW1CLEVBQUUsUUFBdUM7UUFDckUsK0JBQStCO1FBQy9CLE1BQU0sR0FBRyxHQUFHLElBQUksSUFBSSxDQUFDO1lBQ2pCLFNBQVMsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFO1NBQzVCLENBQUMsQ0FBQztRQUNILE9BQU8sR0FBRyxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQWtCRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQUMsUUFBUSxHQUFHLFVBQVUsRUFBRSxRQUErQztRQUNoRixNQUFNLEdBQUcsR0FBZ0MsV0FBVyxDQUNoRDtZQUNJLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQztTQUNwQixFQUNELFFBQVEsQ0FDWCxDQUFDO1FBRUYsd0NBQXdDO1FBQ3hDLElBQUksQ0FBTyxJQUFLLENBQUMsb0JBQW9CLENBQUMsUUFBUSxDQUFDLEVBQUU7WUFDN0MsTUFBTSxJQUFJLEtBQUssQ0FDWCw2Q0FBNkMsUUFBUSx3RUFBd0UsTUFBTSxDQUFDLElBQUksQ0FDOUgsSUFBSyxDQUFDLG9CQUFvQixDQUNuQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUN6QixDQUFDO1NBQ0w7UUFFRCxvREFBb0Q7UUFDcEQsTUFBTSxnQkFBZ0IsR0FBRyxJQUFVLElBQUssQ0FBQyxvQkFBb0IsQ0FBQyxRQUFRLENBQUMsQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLENBQUM7UUFDbkYsT0FBTyxnQkFBZ0IsQ0FBQyxNQUFNLEVBQUUsQ0FBQztJQUNyQyxDQUFDO0lBMEJEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILEtBQUssQ0FBQyxjQUFtQixFQUFFLFFBQXVDOztRQUM5RCxNQUFNLEdBQUcsR0FBd0IsV0FBVyxDQUFDLElBQUksQ0FBQyxpQkFBaUIsRUFBRSxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztRQUVyRixJQUFJLDZCQUE2QixHQUFHLGNBQWMsQ0FBQztRQUVuRCxJQUFJLE9BQU8sY0FBYyxLQUFLLFFBQVEsRUFBRTtZQUNwQyw2QkFBNkIsR0FBRyxXQUFXLENBQUMsY0FBYyxDQUFDLENBQUM7WUFFNUQsa0JBQWtCO1lBQ2xCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pDLElBQUksR0FBRyxDQUFDLFFBQVEsRUFBRTt3QkFDZCxJQUFJLEdBQUcsQ0FBQyxLQUFLLElBQUksSUFBSSxjQUFjLEdBQUcsQ0FBQyxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxHQUFHLENBQUMsS0FBSyxLQUFLLENBQUMsQ0FBQzs0QkFBRSxPQUFPOzZCQUNuRixJQUFJLElBQUksY0FBYyxHQUFHLENBQUMsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLFFBQVEsT0FBTyxLQUFLLENBQUMsQ0FBQzs0QkFBRSxPQUFPO3dCQUMvRSxPQUFPLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUNqRDtpQkFDSjtZQUNMLENBQUMsQ0FBQyxDQUFDO1lBRUgscUJBQXFCO1lBQ3JCLE1BQU0sQ0FBQyxJQUFJLENBQUMsNkJBQTZCLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRTtnQkFDM0QsS0FBSyxJQUFJLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxDQUFDLE1BQU0sRUFBRSxDQUFDLEVBQUUsRUFBRTtvQkFDM0QsTUFBTSxVQUFVLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQ3BELE1BQU0sR0FBRyxHQUFHLElBQUksQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDLENBQUM7b0JBQ3pDLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSzt3QkFBRSxTQUFTO29CQUN6QixJQUFJLEdBQUcsQ0FBQyxLQUFLLEtBQUssT0FBTyxJQUFJLDZCQUE2QixDQUFDLFVBQVUsQ0FBQyxLQUFLLFNBQVMsRUFBRTt3QkFDbEYsNkJBQTZCLENBQUMsVUFBVSxDQUFDLEdBQUcsNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7d0JBQ25GLE9BQU8sNkJBQTZCLENBQUMsT0FBTyxDQUFDLENBQUM7cUJBQ2pEO2lCQUNKO1lBQ0wsQ0FBQyxDQUFDLENBQUM7WUFFSCxNQUFNLENBQUMsSUFBSSxDQUFDLDZCQUE2QixDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLENBQUMsRUFBRSxFQUFFO2dCQUM5RCxJQUFJLE9BQU8sS0FBSyxHQUFHLENBQUMsRUFBRSxFQUFFO29CQUNwQixNQUFNLGNBQWMsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztvQkFDckQsSUFBSSxjQUFjLENBQUMsQ0FBQyxDQUFDLEVBQUU7d0JBQ25CLDZCQUE2QixDQUFDLGNBQWMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDO3FCQUM3RjtvQkFDRCxPQUFPLDZCQUE2QixDQUFDLE9BQU8sQ0FBQyxDQUFDO2lCQUNqRDtZQUNMLENBQUMsQ0FBQyxDQUFDO1NBQ047UUFFRCxNQUFNLFVBQVUsR0FBRyxJQUFJLGFBQWEsQ0FBQztZQUNqQyxVQUFVLGtCQUNOLElBQUksRUFBRSxRQUFRLEVBQ2QsS0FBSyxFQUFFLElBQUksQ0FBQyxXQUFXLElBQ3BCLENBQUMsTUFBQSxHQUFHLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQUMsQ0FDNUI7U0FDSixDQUFDLENBQUM7UUFFSCxrQkFBa0I7UUFDbEIsSUFBSSxHQUFHLENBQUMsT0FBTyxFQUFFO1lBQ2IsNkJBQTZCLEdBQUcsV0FBVyxDQUFDLEdBQUcsQ0FBQyxPQUFPLEVBQUUsNkJBQTZCLENBQUMsQ0FBQztTQUMzRjtRQUVELE1BQU0sZ0JBQWdCLEdBQXVCLFVBQVUsQ0FBQyxLQUFLLENBQUMsNkJBQTZCLENBQUMsQ0FBQztRQUU3RixJQUFJLGdCQUFnQixDQUFDLFNBQVMsRUFBRSxFQUFFO1lBQzlCLE1BQU0sSUFBSSxLQUFLLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztTQUNoRDtRQUVELDJCQUEyQjtRQUMzQixPQUFPLGdCQUFnQixDQUFDLEtBQUssQ0FBQztJQUNsQyxDQUFDOztBQXRWRDs7Ozs7Ozs7OztHQVVHO0FBQ0gsNkNBQTZDO0FBQzdDLGFBQWE7QUFDTixzQkFBVyxHQUFzQixFQUFFLENBQUM7QUE2QjNDOzs7Ozs7Ozs7Ozs7R0FZRztBQUNJLCtCQUFvQixHQUF3QixFQUFFLENBQUMifQ==