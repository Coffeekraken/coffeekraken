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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSw4RUFJb0M7SUFDcEMsNEZBQXNFO0lBQ3RFLDhGQUF3RTtJQUV4RSwwRUFBMkU7SUFDM0Usb0VBQTZDO0lBQzdDLHlGQUFtRTtJQStEbkUsYUFBYTtJQUNiLENBQUMsTUFBTSxJQUFJLE1BQU0sQ0FBQyxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztJQUNuRCxhQUFhO0lBQ2IsTUFBTSxVQUFXLFNBQVEsaUJBQVE7UUFzUC9COzs7Ozs7Ozs7V0FTRztRQUNILFlBQVksUUFBMkM7WUFDckQsYUFBYTtZQUNiLEtBQUssQ0FDSCxtQkFBVyxDQUNUO2dCQUNFLFNBQVMsRUFBRTtvQkFDVCxLQUFLLEVBQUUsSUFBSTtpQkFDWjthQUNGLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNmLENBQ0YsQ0FBQztZQXJJSjs7Ozs7Ozs7OztlQVVHO1lBQ0gsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1lBNEh6QyxJQUFJLENBQUMsV0FBVyxHQUFTLElBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO1FBQ3hELENBQUM7UUEvUEQsTUFBTSxLQUFLLFVBQVU7WUFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUMxQixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUksR0FBRztvQkFDdEIsSUFBSSxFQUFFLFNBQVM7b0JBQ2YsV0FBVyxFQUFFLHNDQUFzQyxJQUFJLENBQUMsSUFBSSx5QkFBeUI7b0JBQ3JGLE9BQU8sRUFBRSxLQUFLO2lCQUNmLENBQUM7YUFDSDtZQUNELE9BQU8sSUFBSSxDQUFDLFdBQVcsQ0FBQztRQUMxQixDQUFDO1FBQ0QsTUFBTSxLQUFLLFVBQVUsQ0FBQyxLQUFLO1lBQ3pCLElBQUksQ0FBQyxXQUFXLEdBQUcsS0FB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