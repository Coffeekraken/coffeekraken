import __SClass from '@coffeekraken/s-class';
import __SDescriptor from '@coffeekraken/s-descriptor';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
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
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
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
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    constructor(settings) {
        // @ts-ignore
        super(__deepMerge({
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
                newInt.definition = __deepMerge(newInt.definition, int.definition);
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
        SInterfaceOverrided.definition = __deepMerge(_this.definition, definition);
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
        const set = __deepMerge({
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
        const set = (__deepMerge(this.settings, settings !== null && settings !== void 0 ? settings : {}));
        let objectOnWhichToApplyInterface = objectOrString;
        if (typeof objectOrString === 'string') {
            objectOnWhichToApplyInterface = __parseArgs(objectOrString);
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
        const descriptor = new __SDescriptor(Object.assign({ type: 'Object', rules: this._definition }, ((_a = set.descriptor) !== null && _a !== void 0 ? _a : {})));
        // handle base obj
        if (set.baseObj) {
            objectOnWhichToApplyInterface = __deepMerge(set.baseObj, objectOnWhichToApplyInterface);
        }
        const descriptorResult = descriptor.apply(objectOnWhichToApplyInterface);
        if (descriptorResult.hasIssues()) {
            throw new Error(descriptorResult.toString());
        }
        let resultObj = descriptorResult.value;
        // if not strip unkown
        if (!set.stripUnkown) {
            resultObj = __deepMerge(objectOnWhichToApplyInterface, resultObj);
        }
        // return new result object
        return resultObj;
    }
}
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sYUFJTixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sV0FBVyxNQUFNLDBDQUEwQyxDQUFDO0FBQ25FLE9BQU8sUUFBUSxNQUFNLG9DQUFvQyxDQUFDO0FBQzFELE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sNEJBQTRCLE1BQU0sOEJBQThCLENBQUM7QUFvQ3hFLGFBQWE7QUFDYixJQUFJLFFBQVEsRUFBRTtJQUFFLE1BQU0sQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7QUFDdkQsYUFBYTs7SUFDUixNQUFNLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0FBRTVDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUVILGFBQWE7QUFDYixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBNlQ1Qzs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLFFBQXVDO1FBQy9DLGFBQWE7UUFDYixLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksV0FBVyxFQUFFLEtBQUs7U0FDckIsRUFDRCxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXpKTjs7Ozs7Ozs7OztXQVVHO1FBQ0gsZ0JBQVcsR0FBNkIsRUFBRSxDQUFDO1FBZ0p2QyxJQUFJLENBQUMsV0FBVyxHQUFTLElBQUssQ0FBQyxXQUFXLENBQUMsVUFBVSxDQUFDO0lBQzFELENBQUM7SUFuVUQsTUFBTSxLQUFLLFVBQVU7O1FBQ2pCLElBQUksSUFBSSxDQUFDLGlCQUFpQjtZQUFFLE9BQU8sSUFBSSxDQUFDLGlCQUFpQixDQUFDO1FBQzFELElBQUksQ0FBQyxpQkFBaUIsR0FBRyxNQUFBLElBQUksQ0FBQyxXQUFX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