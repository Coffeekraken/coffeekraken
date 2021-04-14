"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_descriptor_1 = __importDefault(require("@coffeekraken/s-descriptor"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
const SInterfaceResult_1 = __importDefault(require("./SInterfaceResult"));
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const parseArgs_1 = __importDefault(require("@coffeekraken/sugar/shared/cli/parseArgs"));
// @ts-ignore
(global || window)._registeredInterfacesTypes = {};
// @ts-ignore
class SInterface extends s_class_1.default {
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
        super(deepMerge_1.default({
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
        const set = deepMerge_1.default({
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
        const set = (deepMerge_1.default(this.interfaceSettings, settings !== null && settings !== void 0 ? settings : {}));
        let objectOnWhichToApplyInterface = objectOrString;
        if (typeof objectOrString === 'string') {
            objectOnWhichToApplyInterface = parseArgs_1.default(objectOrString);
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
        const descriptor = new s_descriptor_1.default({
            descriptor: Object.assign({ type: 'Object', rules: this._definition, throw: false }, ((_a = set.descriptor) !== null && _a !== void 0 ? _a : {}))
        });
        // handle base obj
        if (set.baseObj) {
            objectOnWhichToApplyInterface = deepMerge_1.default(set.baseObj, objectOnWhichToApplyInterface);
        }
        const descriptorResult = descriptor.apply(objectOnWhichToApplyInterface);
        // instanciate a new interface result object
        const interfaceResult = new SInterfaceResult_1.default({
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
exports.default = SInterface;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSw4RUFJb0M7QUFDcEMsNEZBQXNFO0FBQ3RFLDhGQUF3RTtBQUV4RSwwRUFBMkU7QUFDM0Usb0VBQTZDO0FBQzdDLHlGQUFtRTtBQStEbkUsYUFBYTtBQUNiLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztBQUNuRCxhQUFhO0FBQ2IsTUFBTSxVQUFXLFNBQVEsaUJBQVE7SUFzUC9COzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksUUFBMkM7UUFDckQsYUFBYTtRQUNiLEtBQUssQ0FDSCxtQkFBVyxDQUNUO1lBQ0UsU0FBUyxFQUFFO2dCQUNULEtBQUssRUFBRSxJQUFJO2FBQ1o7U0FDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7UUFySUo7Ozs7Ozs7Ozs7V0FVRztRQUNILGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztRQTRIekMsSUFBSSxDQUFDLFdBQVcsR0FBUyxJQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUN4RCxDQUFDO0lBL1BELE1BQU0sS0FBSyxVQUFVO1FBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtZQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRztnQkFDdEIsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsV0FBVyxFQUFFLHNDQUFzQyxJQUFJLENBQUMsSUFBSSx5QkFBeUI7Z0JBQ3JGLE9BQU8sRUFBRSxLQUFLO2FBQ2YsQ0FBQztTQUNIO1FBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO0lBQzFCLENBQUM7SUFDRCxNQUFNLEtBQUssVUFBVSxDQUFDLEtBQUs7UUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7SUFDM0Is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