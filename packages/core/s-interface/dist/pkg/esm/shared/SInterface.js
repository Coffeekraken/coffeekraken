import __SClass from '@coffeekraken/s-class';
import __SDescriptor from '@coffeekraken/s-descriptor';
import { __parseArgs } from '@coffeekraken/sugar/cli';
import { __isPlainObject } from '@coffeekraken/sugar/is';
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
        // extend object props
        for (let [key, value] of Object.entries(this._definition)) {
            if (__isPlainObject(value.default) &&
                __isPlainObject(objectOnWhichToApplyInterface[key])) {
                objectOnWhichToApplyInterface[key] = __deepMerge(value.default, objectOnWhichToApplyInterface[key]);
            }
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLE9BQU8sYUFJTixNQUFNLDRCQUE0QixDQUFDO0FBQ3BDLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUN0RCxPQUFPLEVBQUUsZUFBZSxFQUFFLE1BQU0sd0JBQXdCLENBQUM7QUFDekQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sNEJBQTRCLE1BQU0sOEJBQThCLENBQUM7QUFvQ3hFLGFBQWE7QUFDYixJQUFJO0lBQ0EsSUFBSSxNQUFNO1FBQUUsTUFBTSxDQUFDLDBCQUEwQixHQUFHLEVBQUUsQ0FBQztJQUNuRCxhQUFhOztRQUNSLE1BQU0sQ0FBQywwQkFBMEIsR0FBRyxFQUFFLENBQUM7Q0FDL0M7QUFBQyxPQUFPLENBQUMsRUFBRSxHQUFFO0FBRWQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1ERztBQUVILGFBQWE7QUFDYixNQUFNLENBQUMsT0FBTyxPQUFPLFVBQVcsU0FBUSxRQUFRO0lBZ0I1QyxNQUFNLEtBQUssVUFBVTs7UUFDakIsSUFBSSxJQUFJLENBQUMsaUJBQWlCO1lBQUUsT0FBTyxJQUFJLENBQUMsaUJBQWlCLENBQUM7UUFDMUQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLE1BQUEsSUFBSSxDQUFDLFdBQVcsbUNBQUksRUFBRSxDQUFDO1FBRWhELDhEQUE4RDtRQUM5RCxpRkFBaUY7UUFDakYsS0FBSyxJQUFJLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEVBQUU7WUFDOUQsSUFBSSxPQUFPLENBQUEsTUFBQSxLQUFLLENBQUMsSUFBSSwwQ0FB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