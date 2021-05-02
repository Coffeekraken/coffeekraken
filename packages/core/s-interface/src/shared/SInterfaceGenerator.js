// import {
//   ISDescriptorRules,
//   ISDescriptorSettings,
//   ISDescriptorResult
// } from '@coffeekraken/s-descriptor/src/shared/ISDescriptor';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
import __SInterfaceResult from './SInterfaceResult';
import __SClass from '@coffeekraken/s-class';
// @ts-ignore
(global || window)._registeredInterfacesTypes = {};
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
export default function SInterfaceGenerator({ __SDescriptor }) {
    var _a;
    // @ts-ignore
    return _a = class SInterface extends __SClass {
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
                    // objectOnWhichToApplyInterface = __parseArgs(objectOrString);
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
        },
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
        _a._definition = {},
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
        _a._registeredRenderers = {},
        _a;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ludGVyZmFjZUdlbmVyYXRvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNJbnRlcmZhY2VHZW5lcmF0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsV0FBVztBQUNYLHVCQUF1QjtBQUN2QiwwQkFBMEI7QUFDMUIsdUJBQXVCO0FBQ3ZCLCtEQUErRDtBQUMvRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLDRCQUE0QixNQUFNLDhCQUE4QixDQUFDO0FBRXhFLE9BQU8sa0JBQXlDLE1BQU0sb0JBQW9CLENBQUM7QUFDM0UsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFxQzdDLGFBQWE7QUFDYixDQUFDLE1BQU0sSUFBSSxNQUFNLENBQUMsQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFFbkQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBRUgsTUFBTSxDQUFDLE9BQU8sVUFBVSxtQkFBbUIsQ0FBQyxFQUFFLGFBQWEsRUFBRTs7SUFDM0QsYUFBYTtJQUNiLFlBQU8sTUFBTSxVQUFXLFNBQVEsUUFBUTtZQXNQdEM7Ozs7Ozs7OztlQVNHO1lBQ0gsWUFBWSxRQUEyQztnQkFDckQsYUFBYTtnQkFDYixLQUFLLENBQ0gsV0FBVyxDQUNUO29CQUNFLFNBQVMsRUFBRTt3QkFDVCxLQUFLLEVBQUUsSUFBSTtxQkFDWjtpQkFDRixFQUNELFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDZixDQUNGLENBQUM7Z0JBcklKOzs7Ozs7Ozs7O21CQVVHO2dCQUNILGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztnQkE0SHpDLElBQUksQ0FBQyxXQUFXLEdBQVMsSUFBSyxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDeEQsQ0FBQztZQS9QRCxNQUFNLEtBQUssVUFBVTtnQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSSxFQUFFO29CQUMxQixJQUFJLENB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