"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_descriptor_1 = __importDefault(require("@coffeekraken/s-descriptor"));
const cli_1 = require("@coffeekraken/sugar/cli");
const object_1 = require("@coffeekraken/sugar/object");
const getAvailableInterfaceTypes_1 = __importDefault(require("./getAvailableInterfaceTypes"));
// @ts-ignore
try {
    if (global)
        global._registeredInterfacesTypes = {};
    // @ts-ignore
    else
        window._registeredInterfacesTypes = {};
}
catch (e) { }
/**
 * @name            SInterface
 * @namespace       shared
 * @type            Class
 * @platform        node
 * @platform        js
 * @status          beta
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
        super((0, object_1.__deepMerge)({
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
                newInt.definition = (0, object_1.__deepMerge)(newInt.definition, int.definition);
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
        SInterfaceOverrided.definition = (0, object_1.__deepMerge)(_this.definition, definition);
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
        const set = (0, object_1.__deepMerge)({
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
        const set = ((0, object_1.__deepMerge)(this.settings, settings !== null && settings !== void 0 ? settings : {}));
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
            objectOnWhichToApplyInterface = (0, object_1.__deepMerge)(set.baseObj, objectOnWhichToApplyInterface);
        }
        const descriptorResult = descriptor.apply(objectOnWhichToApplyInterface);
        if (descriptorResult.hasIssues()) {
            throw new Error(descriptorResult.toString());
        }
        let resultObj = descriptorResult.value;
        // if not strip unkown
        if (!set.stripUnkown) {
            resultObj = (0, object_1.__deepMerge)(objectOnWhichToApplyInterface, resultObj);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBQzdDLDhFQUlvQztBQUNwQyxpREFBc0Q7QUFDdEQsdURBQXlEO0FBQ3pELDhGQUF3RTtBQW9DeEUsYUFBYTtBQUNiLElBQUk7SUFDQSxJQUFJLE1BQU07UUFBRSxNQUFNLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0lBQ25ELGFBQWE7O1FBQ1IsTUFBTSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztDQUMvQztBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FnQ0c7QUFFSCxhQUFhO0FBQ2IsTUFBcUIsVUFBVyxTQUFRLGlCQUFRO0lBNlQ1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLGFBQWE7UUFDYixLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQO1lBQ0ksV0FBVyxFQUFFLEtBQUs7U0FDckIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXpKTjs7Ozs7Ozs7OztXQVVHO1FBQ0gsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1FBZ0p2QyxJQUFJLENBQUMsV0FBVyxHQUFTLElBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzFELENBQUM7SUFuVUQsTUFBTSxLQUFLLFVBQVU7O1FBQ2pCLElBQUksSUFBSSxDQUFDLGlCQUFpQjtZQUFFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFBLElBQUksQ0FBQyxXQUFXLG1DQUFJLEVBQUUsQ0FBQztRQUNoRCxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztJQUNsQyxDQUFDO0lBQ0QsTUFBTSxLQUFLLFVBQVUsQ0FBQyxLQUFLO1FBQ3ZCLElB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