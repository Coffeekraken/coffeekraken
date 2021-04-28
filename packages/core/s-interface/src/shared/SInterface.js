var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "@coffeekraken/s-descriptor", "@coffeekraken/sugar/shared/object/deepMerge", "./getAvailableInterfaceTypes", "./SInterfaceResult", "@coffeekraken/s-class", "@coffeekraken/sugar/shared/cli/parseArgs"], factory);
    }
})(function (require, exports) {
    "use strict";
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
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL2NvcmUvcy1pbnRlcmZhY2Uvc3JjL3NoYXJlZC9TSW50ZXJmYWNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsOEVBSW9DO0lBQ3BDLDRGQUFzRTtJQUN0RSw4RkFBd0U7SUFFeEUsMEVBQTJFO0lBQzNFLG9FQUE2QztJQUM3Qyx5RkFBbUU7SUErRG5FLGFBQWE7SUFDYixDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7SUFDbkQsYUFBYTtJQUNiLE1BQU0sVUFBVyxTQUFRLGlCQUFRO1FBc1AvQjs7Ozs7Ozs7O1dBU0c7UUFDSCxZQUFZLFFBQTJDO1lBQ3JELGFBQWE7WUFDYixLQUFLLENBQ0gsbUJBQVcsQ0FDVDtnQkFDRSxTQUFTLEVBQUU7b0JBQ1QsS0FBSyxFQUFFLElBQUk7aUJBQ1o7YUFDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7WUFySUo7Ozs7Ozs7Ozs7ZUFVRztZQUNILGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztZQTRIekMsSUFBSSxDQUFDLFdBQVcsR0FBUyxJQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztRQUN4RCxDQUFDO1FBL1BELE1BQU0sS0FBSyxVQUFVO1lBQ25CLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksRUFBRTtnQkFDMUIsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEdBQUc7b0JBQ3RCLElBQUksRUFBRSxTQUFTO29CQUNmLFdBQVcsRUFBRSxzQ0FBc0MsSUFBSSxDQUFDLElBQUkseUJBQXlCO29CQUNyRixPQUFPLEVBQUUsS0FBSztpQkFDZixDQUFDO2FBQ0g7WUFDRCxPQUFPLElBQUksQ0FBQyxXQUFXLENBQUM7UUFDMUIs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