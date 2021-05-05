import __SDescriptor from '@coffeekraken/s-descriptor';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
import __SInterfaceResult from './SInterfaceResult';
import __SClass from '@coffeekraken/s-class';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __isNode from '@coffeekraken/sugar/shared/is/node';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxhQUlOLE1BQU0sNEJBQTRCLENBQUM7QUFDcEMsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyw0QkFBNEIsTUFBTSw4QkFBOEIsQ0FBQztBQUV4RSxPQUFPLGtCQUF5QyxNQUFNLG9CQUFvQixDQUFDO0FBQzNFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sV0FBVyxNQUFNLDBDQUEwQyxDQUFDO0FBQ25FLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBZ0MxRCxhQUFhO0FBQ2IsSUFBSSxRQUFRLEVBQUU7SUFBRSxNQUFNLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBQ3ZELGFBQWE7O0lBQ1IsTUFBTSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztBQUU1Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFFSCxhQUFhO0FBQ2IsTUFBTSxDQUFDLE9BQU8sT0FBTyxVQUFXLFNBQVEsUUFBUTtJQXNQOUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUEyQztRQUNyRCxhQUFhO1FBQ2IsS0FBSyxDQUNILFdBQVcsQ0FDVDtZQUNFLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBcklKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxnQkFBVyxHQUE2QixFQUFFLENBQUM7UUE0SHpDLElBQUksQ0FBQyxXQUFXLEdBQVMsSUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDeEQsQ0FBQztJQS9QRCxNQUFNLEtBQUssVUFBVTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7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