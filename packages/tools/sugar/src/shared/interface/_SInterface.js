var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../descriptor/SDescriptor", "../object/deepMerge", "./getAvailableInterfaceTypes", "./SInterfaceResult"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const SDescriptor_1 = __importDefault(require("../descriptor/SDescriptor"));
    const deepMerge_1 = __importDefault(require("../object/deepMerge"));
    const getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
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
            /**
             * @name              _settings
             * @type              ISInterfaceSettings
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
            // _console.log('in', this._definition);
            // instanciate a new interface result object
            const interfaceResult = new SInterfaceResult_1.default({
                descriptorResult
            });
            if (interfaceResult.hasIssues() && settings.throw) {
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
    /**
     * @name              settings
     * @type              ISInterfaceSettings
     * @static
     *
     * This property store all the settings for your SInterface class. These settings
     * can be overrided at instance level
     *
     * @since             2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    SInterface.settings = {};
    exports.default = SInterface;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiX1NJbnRlcmZhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJfU0ludGVyZmFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDRFQUdtQztJQUVuQyxvRUFBOEM7SUFDOUMsOEZBQXdFO0lBRXhFLDBFQUEyRTtJQXFFM0UsYUFBYTtJQUNiLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztJQUNuRCxNQUFNLFVBQVU7UUFvUWQ7Ozs7Ozs7OztXQVNHO1FBQ0gsWUFBWSxXQUFnQyxFQUFFO1lBdEo5Qzs7Ozs7Ozs7OztlQVVHO1lBQ0gsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1lBZTNDOzs7Ozs7Ozs7ZUFTRztZQUNILGNBQVMsR0FBd0I7Z0JBQy9CLFlBQVksRUFBRSxLQUFLO2dCQUNuQixLQUFLLEVBQUUsS0FBSztnQkFDWixRQUFRLEVBQUUsSUFBSTthQUNmLENBQUM7WUErR0EsYUFBYTtZQUNiLElBQUksQ0FBQyxTQUFTLEdBQUcsbUJBQVcsQ0FDcEIsSUFBSyxDQUFDLFdBQVcsQ0FBQyxRQUFRLEVBQ2hDLElBQUksQ0FBQyxTQUFTLEVBQ2QsUUFBUSxDQUNULENBQUM7WUFDRixJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSSxLQUFLLFNBQVM7Z0JBQ25DLElBQUksQ0FBQyxTQUFTLENBQUMsSUFBSTtvQkFDWCxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQztZQUVuRSxJQUFJLENBQUMsV0FBVyxHQUFTLElBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3hELENBQUM7UUEzUUQsTUFBTSxLQUFLLFVBQVU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRztvQkFDdEIsSUFBSSxFQUFFLFNB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