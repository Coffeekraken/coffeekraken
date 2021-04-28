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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1pbnRlcmZhY2Uvc3JjL3NoYXJlZC9TSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsOEVBSW9DO0FBQ3BDLDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFFeEUsMEVBQTJFO0FBQzNFLG9FQUE2QztBQUM3Qyx5RkFBbUU7QUErRG5FLGFBQWE7QUFDYixDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFDbkQsYUFBYTtBQUNiLE1BQU0sVUFBVyxTQUFRLGlCQUFRO0lBc1AvQjs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQTJDO1FBQ3JELGFBQWE7UUFDYixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtZQUNFLFNBQVMsRUFBRTtnQkFDVCxLQUFLLEVBQUUsSUFBSTthQUNaO1NBQ0YsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1FBcklKOzs7Ozs7Ozs7O1dBVUc7UUFDSCxnQkFBVyxHQUE2QixFQUFFLENBQUM7UUE0SHpDLElBQUksQ0FBQyxXQUFXLEdBQVMsSUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7SUFDeEQsQ0FBQztJQS9QRCxNQUFNLEtBQUssVUFBVTtRQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7WUFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUc7Z0JBQ3RCLElBQUksRUFBRSxTQUFTO2dCQUNmLFdBQVcsRUFBRSxzQ0FBc0MsSUFBSSxDQUFDLElBQUkseUJBQXlCO2dCQUNyRixPQUFPLEVBQUUsS0FBSzthQUNmLENBQUM7U0FDSDtRQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztJQUMxQixDQUFDO0lBQ0QsTUFB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