import __SClass from '@coffeekraken/s-class';
import __SDescriptor, {
    ISDescriptorResult,
    ISDescriptorRules,
    ISDescriptorSettings,
} from '@coffeekraken/s-descriptor';
import __parseArgs from '@coffeekraken/sugar/shared/cli/parseArgs';
import __isNode from '@coffeekraken/sugar/shared/is/node';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __getAvailableInterfaceTypes from './getAvailableInterfaceTypes';
import type { ISInterfaceRendererSettings } from './renderers/ISInterfaceRenderer';

export interface ISInterfaceSettings {
    descriptor?: Partial<ISDescriptorSettings>;
    baseObj?: any;
    stripUnkown?: boolean;
}

export interface ISInterfaceDefinitionProperty {
    type: string;
    description: string;
    default: any;
    alias: string;
    [key: string]: any;
}
export interface ISInterfaceDefinitionMap extends ISDescriptorRules {
    [key: string]: Partial<ISInterfaceDefinitionProperty>;
}

export interface ISInterfaceObj {
    name?: string;
    description?: string;
    definition: Record<string, ISInterfaceDefinitionProperty>;
}

export interface ISInterfaceCtor {
    new (settings?: Partial<ISInterfaceSettings>): ISInterface;
    definition: ISInterfaceDefinitionMap;
    defaults(): any;
}
export interface ISInterface {
    _definition: ISInterfaceDefinitionMap;
}

// @ts-ignore
if (__isNode()) global._registeredInterfacesTypes = {};
// @ts-ignore
else window._registeredInterfacesTypes = {};

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
     * @name              definition
     * @type              ISDescriptorRules
     * @static
     *
     * This property store all the SDescriptor rules that this interface
     * implements for each properties
     *
     * @since             2.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
     */
    // static definition: ISDescriptorRules = {};
    // @ts-ignore
    static _definition: ISDescriptorRules;
    static _cachedDefinition: ISDescriptorRules;
    static get definition() {
        if (this._cachedDefinition) return this._cachedDefinition;
        this._cachedDefinition = this._definition ?? {};
        return this._cachedDefinition;
    }
    static set definition(value) {
        this._cachedDefinition = value;
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
    static description = '';

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
    static _registeredRenderers: Record<string, any> = {};
    static registerRenderer(rendererClass: any): void {
        if (!rendererClass.id) {
            throw new Error(
                `Sorry but the interface renderer "<yellow>${rendererClass.name}</yellow>" that you want to register is missing the required <yellow>static</yellow> <green>id</green> property...`,
            );
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
    static mix(...ints: SInterface[]): SInterface {
        const newInt = new SInterface();
        ints.forEach((int) => {
            // @ts-ignore
            if (int.definition) {
                // @ts-ignore
                newInt.definition = __deepMerge(
                    newInt.definition,
                    int.definition,
                );
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
            static overridedName = `${_this.name} (overrided)`;
            static definition = __deepMerge(_this.definition, definition);
        }
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
        } else if (window !== undefined) {
            // @ts-ignore
            window._registeredInterfacesTypes[n] = this;
            // @ts-ignore
            window._registeredInterfacesTypes[n.replace('interface', '')] =
                this;
        }
    }

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
    _definition: ISInterfaceDefinitionMap = {};

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
    static toObject(): ISInterfaceObj {
        return {
            name: this.name,
            description: this.description ?? '',
            definition: <ISInterfaceDefinitionProperty>(
                Object.assign({}, this.definition)
            ),
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
    static apply(
        objectOrString: any,
        settings?: Partial<ISInterfaceSettings>,
    ): any {
        // instanciate a new SInterface
        const int = new this({
            interface: settings ?? {},
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
    static render(
        renderer = 'terminal',
        settings?: Partial<ISInterfaceRendererSettings>,
    ): string {
        const set = <ISInterfaceRendererSettings>__deepMerge(
            {
                renderer: 'terminal',
                exclude: ['help'],
            },
            settings,
        );

        // check that the renderer is registered
        if (!(<any>this)._registeredRenderers[renderer]) {
            throw new Error(
                `Sorry but the requested renderer "<yellow>${renderer}</yellow>" does not exists... Here's the available renderers: <green>${Object.keys(
                    (<any>this)._registeredRenderers,
                ).join(', ')}</green>`,
            );
        }

        // instanciate the renderer and render the interface
        const rendererInstance = new (<any>this)._registeredRenderers[renderer](
            this,
            set,
        );
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
    constructor(settings?: Partial<ISInterfaceSettings>) {
        // @ts-ignore
        super(
            __deepMerge(
                {
                    stripUnkown: false,
                },
                settings ?? {},
            ),
        );

        this._definition = (<any>this).constructor.definition;
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
    apply(objectOrString: any, settings?: Partial<ISInterfaceSettings>): any {
        const set = <ISInterfaceSettings>(
            __deepMerge(this.settings, settings ?? {})
        );

        let objectOnWhichToApplyInterface = objectOrString;

        if (typeof objectOrString === 'string') {
            objectOnWhichToApplyInterface = __parseArgs(objectOrString);

            // explicit params
            Object.keys(objectOnWhichToApplyInterface).forEach((argName) => {
                for (let i = 0; i < Object.keys(this._definition).length; i++) {
                    const defArgName = Object.keys(this._definition)[i];
                    const obj = this._definition[defArgName];
                    if (obj.explicit) {
                        if (
                            obj.alias &&
                            ` ${objectOrString} `.match(
                                new RegExp(`\\s-${obj.alias}\\s`),
                            )
                        )
                            return;
                        else if (
                            ` ${objectOrString} `.match(
                                new RegExp(`\\s--${argName}\\s`),
                            )
                        )
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
                    if (!obj.alias) continue;
                    if (
                        obj.alias === argName &&
                        objectOnWhichToApplyInterface[defArgName] === undefined
                    ) {
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
            type: 'Object',
            rules: this._definition,
            ...(set.descriptor ?? {}),
        });

        // handle base obj
        if (set.baseObj) {
            objectOnWhichToApplyInterface = __deepMerge(
                set.baseObj,
                objectOnWhichToApplyInterface,
            );
        }

        const descriptorResult: ISDescriptorResult = descriptor.apply(
            objectOnWhichToApplyInterface,
        );

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
