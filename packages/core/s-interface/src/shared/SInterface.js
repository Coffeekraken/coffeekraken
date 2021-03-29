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
                interface: {}
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
            }
            const descriptor = new s_descriptor_1.default({
                descriptor: Object.assign({ type: 'Object', rules: this._definition, throw: false }, ((_a = set.descriptor) !== null && _a !== void 0 ? _a : {}))
            });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSw4RUFJb0M7SUFDcEMsNEZBQXNFO0lBQ3RFLDhGQUF3RTtJQUV4RSwwRUFBMkU7SUFDM0Usb0VBQTZDO0lBQzdDLHlGQUFtRTtJQWdFbkUsYUFBYTtJQUNiLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztJQUNuRCxhQUFhO0lBQ2IsTUFBTSxVQUFXLFNBQVEsaUJBQVE7UUFzUC9COzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksUUFBMkM7WUFDckQsYUFBYTtZQUNiLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLFNBQVMsRUFBRSxFQUFFO2FBQ2QsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2YsQ0FDRixDQUFDO1lBbklKOzs7Ozs7Ozs7O2VBVUc7WUFDSCxnQkFBVyxHQUE2QixFQUFFLENBQUM7WUEwSHpDLElBQUksQ0FBQyxXQUFXLEdBQVMsSUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7UUFDeEQsQ0FBQztRQTdQRCxNQUFNLEtBQUssVUFBVTtZQUNuQixJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzFCLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxHQUFHO29CQUN0QixJQUFJLEVBQUUsU0FBUztvQkFDZixXQUFXLEVBQUUsc0NBQXNDLElBQUksQ0FBQyxJQUFJLHlCQUF5QjtvQkFDckYsT0FBTyxFQUFFLEtBQUs7aUJBQ2YsQ0FBQzthQUNIO1lBQ0QsT0FBTyxJQUFJLENBQUMsV0FBVyxDQUFDO1FBQzFCLENBQUM7UUFDRCxNQUFNLEtBQUssVUFBVSxDQUFDLEtBQUs7WUFDekIsSUFBSSxDQUFDLFdBQVcsR0FBRyxLQUFLLENBQUM7UUFDM0IsQ0FBQztRQUVE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