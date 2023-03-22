import __SClass from '@coffeekraken/s-class';
import __SDescriptor from '@coffeekraken/s-descriptor';
import { __parseArgs } from '@coffeekraken/sugar/cli';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
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
 * @snippet         extends __SInterface
 * class $1 extends __SInterface {
 *      static get _definition() {
 *          return {
 *              $2
 *          }
 *      }
 * }
 *
 * @example         js
 * import __SInterface from '@coffeekraken/s-interface';
 * class MyCoolInterface extends SInterface {
 *     static get _definition() {
 *          return {
 *              myProperty: {
 *                  type: 'String',
 *                  required: true
 *              },
 *              otherProperty: {
 *                  type: 'String',
 *                  default: 'Something'
 *              }
 *          }
 *      }
 * }
 * MyCoolInterface.apply({
 *      myProperty: 'Hello'
 * });
 * // {
 * //       myProperty: 'Hello',
 * //       otherProperty: 'Something'
 * // }
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
// @ts-ignore
export default class SInterface extends __SClass {
    static get definition() {
        var _a, _b;
        if (this._cachedDefinition)
            return this._cachedDefinition;
        this._cachedDefinition = (_a = this._definition) !== null && _a !== void 0 ? _a : {};
        // Make sure the type are note "String[]" but "Array<String>".
        // @TODO        Move this code elsewhere or simply add support for ...[] notation
        for (let [prop, value] of Object.entries(this._cachedDefinition)) {
            if (typeof ((_b = value.type) === null || _b === void 0 ? void 0 : _b.type) === 'string') {
                if (value.type.type.match(/\[\]/)) {
                    this._cachedDefinition[prop].type.type =
                        value.type.type.replace(/([a-zA-Z0-9-_]+)\[\]/gm, 'Array<$1>');
                    continue;
                }
            }
            if (typeof value.type === 'string') {
                if (value.type.match(/\[\]/)) {
                    this._cachedDefinition[prop].type = value.type.replace(/([a-zA-Z0-9-_]+)\[\]/gm, 'Array<$1>');
                }
            }
        }
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
                            ` ${objectOrString} `.match(new RegExp(`\\s-${obj.alias}\\s`))) {
                            return;
                        }
                        else if (` ${objectOrString} `.match(new RegExp(`\\s--${argName}\\s`))) {
                            return;
                        }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sYUFJTixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsV0FBVyxFQUFFLE1BQU0sNEJBQTRCLENBQUM7QUFDekQsT0FBTyw0QkFBNEIsTUFBTSw4QkFBOEIsQ0FBQztBQW9DeEUsYUFBYTtBQUNiLElBQUk7SUFDQSxJQUFJLE1BQU07UUFBRSxNQUFNLENBQUMsMEJBQTBCLEdBQUcsRUFBRSxDQUFDO0lBQ25ELGFBQWE7O1FBQ1IsTUFBTSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztDQUMvQztBQUFDLE9BQU8sQ0FBQyxFQUFFLEdBQUU7QUFFZDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbURHO0FBRUgsYUFBYTtBQUNiLE1BQU0sQ0FBQyxPQUFPLE9BQU8sVUFBVyxTQUFRLFFBQVE7SUFnQjVDLE1BQU0sS0FBSyxVQUFVOztRQUNqQixJQUFJLElBQUksQ0FBQyxpQkFBaUI7WUFBRSxPQUFPLElBQUksQ0FBQyxpQkFBaUIsQ0FBQztRQUMxRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsTUFBQSxJQUFJLENBQUMsV0FBVyxtQ0FBSSxFQUFFLENBQUM7UUFFaEQsOERBQThEO1FBQzlELGlGQUFpRjtRQUNqRixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsRUFBRTtZQUM5RCxJQUFJLE9BQU8sQ0FBQSxNQUFBLEtBQUssQ0FBQyxJQUFJLDBDQUFFLElBQUksQ0FBQSxLQUFLLFFBQVEsRUFBRTtnQkFDdEMsSUFBSSxLQUFL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