"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_descriptor_1 = __importDefault(require("@coffeekraken/s-descriptor"));
const cli_1 = require("@coffeekraken/sugar/cli");
const node_1 = __importDefault(require("@coffeekraken/sugar/shared/is/node"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
// @ts-ignore
if ((0, node_1.default)())
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        // @ts-ignore
        super((0, deepMerge_1.default)({
            stripUnkown: false,
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
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
         */
        this._definition = {};
        this._definition = this.constructor.definition;
    }
    static get definition() {
        var _a;
        if (this._cachedDefinition)
            return this._cachedDefinition;
        this._cachedDefinition = (_a = this._definition) !== null && _a !== void 0 ? _a : {};
        return this._cachedDefinition;
    }
    static set definition(value) {
        this._cachedDefinition = value;
    }
    static registerRenderer(rendererClass) {
        if (!rendererClass.id) {
            throw new Error(`Sorry but the interface renderer "<yellow>${rendererClass.name}</yellow>" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...`);
        }
        this._registeredRenderers[rendererClass.id] = rendererClass;
    }
    /**
     * @name      mix
     * @type      Function
     * @static
     *
     * This static method allows you to mix multiple interfaces into one
     *
     * @param     {SInterface[]}      ...ints       The interfaces to mix together
     * @return    {SInterface}                          The mixed interface
     *
     * @since     2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static mix(...ints) {
        const newInt = new SInterface();
        ints.forEach((int) => {
            // @ts-ignore
            if (int.definition) {
                // @ts-ignore
                newInt.definition = (0, deepMerge_1.default)(newInt.definition, int.definition);
            }
        });
        return newInt;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static override(definition) {
        const _this = this;
        class SInterfaceOverrided extends this {
        }
        SInterfaceOverrided.overridedName = `${_this.name} (overrided)`;
        SInterfaceOverrided.definition = (0, deepMerge_1.default)(_this.definition, definition);
        return SInterfaceOverrided;
    }
    /**
     * @name            isDefault
     * @type            Function
     * @static
     *
     * This static method allows you to check if a certain value is the default of a certain property or not.
     *
     * @param           {String}            prop        The property to check if it's the default of or not
     * @param           {Any}               value       The value to check with
     * @return          {Boolean}                       true if is the default value, false if not
     *
     * @since           2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static isDefault(prop, value) {
        const defaults = this.defaults();
        if (defaults[prop] === undefined) {
            return false;
        }
        if (defaults[prop] === value) {
            return true;
        }
        return false;
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static getAvailableTypes() {
        return (0, getAvailableInterfaceTypes_1.default)();
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static makeAvailableAsType(name = null) {
        const n = (name || this.name).toLowerCase();
        if (global !== undefined) {
            // @ts-ignore
            global._registeredInterfacesTypes[n] = this;
            // @ts-ignore
            global._registeredInterfacesTypes[n.replace('interface', '')] =
                this;
        }
        else if (window !== undefined) {
            // @ts-ignore
            window._registeredInterfacesTypes[n] = this;
            // @ts-ignore
            window._registeredInterfacesTypes[n.replace('interface', '')] =
                this;
        }
    }
    /**
     * @name              toObject
     * @type              Function
     * @static
     *
     * This function allows you to get back a simple object describing the interface
     *
     * @return              {ISInterfaceObj}                The interface in plain object format
     *
     * @since       2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static toObject() {
        var _a;
        return {
            name: this.name,
            description: (_a = this.description) !== null && _a !== void 0 ? _a : '',
            definition: (Object.assign({}, this.definition)),
        };
    }
    /**
     * @name              defaults
     * @type              Function
     * @static
     *
     * This function simply returns you the default interface values in object format
     *
     * @since         2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    static render(renderer = 'terminal', settings) {
        const set = (0, deepMerge_1.default)({
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    apply(objectOrString, settings) {
        var _a;
        const set = ((0, deepMerge_1.default)(this.settings, settings !== null && settings !== void 0 ? settings : {}));
        let objectOnWhichToApplyInterface = objectOrString;
        if (typeof objectOrString === 'string') {
            objectOnWhichToApplyInterface = (0, cli_1.__parseArgs)(objectOrString);
            // explicit params
            Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
                for (let i = 0; i < Object.keys(this._definition).length; i++) {
                    const defArgName = Object.keys(this._definition)[i];
                    const obj = this._definition[defArgName];
                    if (obj.explicit) {
                        if (obj.alias &&
                            ` ${objectOrString} `.match(new RegExp(`\\s-${obj.alias}\\s`)))
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
        const descriptor = new s_descriptor_1.default(Object.assign({ type: 'Object', rules: this._definition }, ((_a = set.descriptor) !== null && _a !== void 0 ? _a : {})));
        // handle base obj
        if (set.baseObj) {
            objectOnWhichToApplyInterface = (0, deepMerge_1.default)(set.baseObj, objectOnWhichToApplyInterface);
        }
        const descriptorResult = descriptor.apply(objectOnWhichToApplyInterface);
        if (descriptorResult.hasIssues()) {
            throw new Error(descriptorResult.toString());
        }
        let resultObj = descriptorResult.value;
        // if not strip unkown
        if (!set.stripUnkown) {
            resultObj = (0, deepMerge_1.default)(objectOnWhichToApplyInterface, resultObj);
        }
        // return new result object
        return resultObj;
    }
}
exports.default = SInterface;
/**
 * @name            description
 * @type            String
 * @static
 *
 * Store the interface description
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SInterface.description = '';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
SInterface._registeredRenderers = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDhFQUlvQztBQUNwQyxpREFBc0Q7QUFDdEQsOEVBQTBEO0FBQzFELDRGQUFzRTtBQUN0RSw4RkFBd0U7QUFvQ3hFLGFBQWE7QUFDYixJQUFJLElBQUEsY0FBUSxHQUFFO0lBQUUsTUFBTSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztBQUN2RCxhQUFhOztJQUNSLE1BQU0sQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFFNUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBNkJHO0FBRUgsYUFBYTtBQUNiLE1BQXFCLFVBQVcsU0FBUSxpQkFBUTtJQTZUNUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxRQUF1QztRQUMvQyxhQUFhO1FBQ2IsS0FBSyxDQUNELElBQUEsbUJBQVcsRUFDUDtZQUNJLFdBQVcsRUFBRSxLQUFLO1NBQ3JCLEVBQ0QsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUNqQixDQUNKLENBQUM7UUF6Sk47Ozs7Ozs7Ozs7V0FVRztRQUNILGdCQUFXLEdBQTZCLEVBQUUsQ0FBQztRQWdKdkMsSUFBSSxDQUFDLFdBQVcsR0FBUyxJQUFLLENBQUMsV0FBVyxDQUFDLFVBQVUsQ0FBQztJQUMxRCxDQUFDO0lBblVELE1BQU0sS0FBSyxVQUFVOztRQUNqQixJQUFJLElBQUksQ0FBQyxpQkFBaUI7WUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBQSxJQUFJLENBQUMsV0FBVyxtQ0FBSSxFQUFFLENBQUM7UUFDaEQsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7SUFDbEMsQ0FBQztJQUNELE1BQU0sS0FBSyxVQUFVLENBQUMsS0FBSztRQUN2QixJQUFJLENBQUMsaUJBQWlCLEdBQUcs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