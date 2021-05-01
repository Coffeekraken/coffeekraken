import __SDescriptor from '@coffeekraken/s-descriptor';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
import __SInterfaceResult from './SInterfaceResult';
import __SClass from '@coffeekraken/s-class';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
// @ts-ignore
(global || window)._registeredInterfacesTypes = {};
// @ts-ignore
class SInterface extends __SClass {
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
            interface: {
                throw: true
            }
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
                default: false
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
        const result = this.apply({}, {
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
     * @param       {Any}                objectOrString              The object on which to apply the interface on, or a cli string to use as input
     * @param       {ISInterfaceSettings}               [settings={}]         An object of settings to configure your apply process
     * - throw (false) {Boolean}: Specify if you want that an error is throwned if the test does not pass
     * - return (String) {String}: Specify in which return you want the result back. Can be "String" of "Object".
     * @return      {Boolean|String}                              true if all is ok, a string describing the issue if not...
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    static apply(objectOrString, settings) {
        // instanciate a new SInterface
        const int = new this({
            interface: settings !== null && settings !== void 0 ? settings : {}
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
            exclude: ['help']
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
        const set = (__deepMerge(this.interfaceSettings, settings !== null && settings !== void 0 ? settings : {}));
        let objectOnWhichToApplyInterface = objectOrString;
        if (typeof objectOrString === 'string') {
            objectOnWhichToApplyInterface = __parseArgs(objectOrString);
            // remplacing aliases
            Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
                for (let i = 0; i < Object.keys(this._definition).length; i++) {
                    const defArgName = Object.keys(this._definition)[i];
                    const obj = this._definition[defArgName];
                    if (!obj.alias)
                        continue;
                    if (obj.alias === argName &&
                        objectOnWhichToApplyInterface[defArgName] === undefined) {
                        objectOnWhichToApplyInterface[defArgName] =
                            objectOnWhichToApplyInterface[argName];
                        delete objectOnWhichToApplyInterface[argName];
                    }
                }
            });
            Object.keys(objectOnWhichToApplyInterface).forEach((argName, i) => {
                if (argName === `${i}`) {
                    const definitionKeys = Object.keys(this._definition);
                    if (definitionKeys[i]) {
                        objectOnWhichToApplyInterface[definitionKeys[i]] =
                            objectOnWhichToApplyInterface[argName];
                    }
                    delete objectOnWhichToApplyInterface[argName];
                }
            });
        }
        const descriptor = new __SDescriptor({
            descriptor: Object.assign({ type: 'Object', rules: this._definition, throw: false }, ((_a = set.descriptor) !== null && _a !== void 0 ? _a : {}))
        });
        // handle base obj
        if (set.baseObj) {
            objectOnWhichToApplyInterface = __deepMerge(set.baseObj, objectOnWhichToApplyInterface);
        }
        const descriptorResult = descriptor.apply(objectOnWhichToApplyInterface);
        // instanciate a new interface result object
        const interfaceResult = new __SInterfaceResult({
            descriptorResult
        });
        if (interfaceResult.hasIssues() && set.throw) {
            throw new Error(interfaceResult.toString());
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
export default SInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUlOLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyw0QkFBNEIsTUFBTSw4QkFBOEIsQ0FBQztBQUV4RSxPQUFPLGtCQUF5QyxNQUFNLG9CQUFvQixDQUFDO0FBQzNFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBDQUEwQyxDQUFDO0FBK0RuRSxhQUFhO0FBQ2IsQ0FBQyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBQ25ELGFBQWE7QUFDYixNQUFNLFVBQVcsU0FBUSxRQUFRO0lBc1AvQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ3JELGFBQWE7UUFDYixLQUFLLENBQ0gsV0FBVyxDQUNUO1lBQ0UsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFySUo7Ozs7Ozs7Ozs7V0FVRztRQUNILGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztRQTRIekMsSUFBSSxDQUFDLFdBQVcsR0FBUyxJQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUN4RCxDQUFDO0lBL1BELE1BQU0sS0FBSyxVQUFVO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRztnQkFDdEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLHNDQUFzQyxJQUFJLENBQUMsSUFBSSx5QkFBeUI7Z0JBQ3JGLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztT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