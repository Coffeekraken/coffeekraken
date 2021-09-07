import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
// import __handlebars from 'handlebars';
import __striptags from '@coffeekraken/sugar/shared/html/striptags';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __cloneClass from '@coffeekraken/sugar/shared/class/utils/cloneClass';
import __clone from '@coffeekraken/sugar/shared/object/clone';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';

/**
 * @name                SFeature
 * @namespace           shared
 * @type                Class
 * @extends             SClass
 * @status              beta
 *
 * This class allows you to create "features". Feature is like webcomponent but does not provide a
 * custom HTML tag.
 *
 * @param       {String}            name                    Specify the component name in dash-case
 * @param       {Object}            [settings={}]           Configure your instance as wanted
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @example             js
 * import SFeature from '@coffeekraken/s-lit-component';
 * const component = new SFeature('my-cool-component');
 * component.className('__something'); // => my-cool-component__something
 * component.className('hello'); // => my-cool-component-hello
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */

export interface ISFeatureSettings {
    interface?: typeof __SInterface;
    defaultProps?: any;
}

export interface ISFeatureCtorSettings {
    feature: Partial<ISFeatureSettings>;
}

export interface ISFeatureDefaultProps {
    id: string;
    mountWhen: 'directly' | 'inViewport';
}

export class SFeatureDefaultInterface extends __SInterface {
    static definition = {
        id: {
            type: 'String',
            physical: true,
        },
        mounted: {
            type: 'Boolean',
            default: false,
            physical: true,
        },
        mountWhen: {
            type: 'String',
            values: ['directly', 'inViewport'],
            default: 'directly',
        },
    };
}

export default class SFeature extends __SClass {
    /**
     * @name            name
     * @type            String
     *
     * Store the feature name
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    name: String;

    /**
     * @name            node
     * @type            HTMLElement
     *
     * Store the component node
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    node: HTMLElement;

    /**
     * @name            props
     * @type            Object
     *
     * Store the component props
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    props: any;

    _InterfaceToApply: __SInterface;

    /**
     * @name            setDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to set some default props for some particular
     * component(s). You can target components using simple css selectorl like "my-component#cool".
     * Once the component is instanciated, it will check if some defaults are specified and
     * extends them with the passed props.
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @param     {Any}         props         An object of props you want to set defaults for
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static _defaultProps: any = {};
    static setDefaultProps(selector: string | string[], props: any): void {
        Array.from(selector).forEach((sel) => {
            this._defaultProps[sel] = {
                ...(this._defaultProps[sel] ?? {}),
                ...props,
            };
        });
    }

    /**
     * @name              registerFeature
     * @type            Function
     * @static
     *
     * This static method allows you to register a new feature
     * associated with an HTMLElement attribute like "s-activate", etc...
     *
     * @param           {String}        name           The attribute that trigger the feature
     * @param           {SFeature}       feature                The actual feature class to use
     * @param           {Any}           [defaultProps={}]       Some default props to set for this feature
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static registerFeature(name: string, feature: typeof SFeature, defaultProps: any = {}) {
        this.setDefaultProps(name, defaultProps);
        __querySelectorLive(`[${name}]`, ($elm) => {
            new feature(name, $elm, defaultProps);
        });
    }

    /**
     * @name        featureSettings
     * @type        ISFeatureSettings
     * @get
     *
     * Access the feature settings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get featureSettings(): ISFeatureSettings {
        return (<any>this._settings).feature;
    }

    /**
     * @name            constructor
     * @type            Function
     * @constructor
     *
     * Constructor
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    constructor(name: string, node: HTMLElement, settings: Partial<ISFeatureCtorSettings> = {}) {
        super(
            __deepMerge(
                {
                    feature: {},
                },
                settings,
            ),
        );

        // name
        this.name = name;

        // node
        this.node = node;

        let InterfaceToApply = class InlineFeatureInterface extends __SInterface {
            static definition = {};
        };

        // @ts-ignore
        InterfaceToApply.definition = {
            ...Object.assign({}, SFeatureDefaultInterface.definition),
            // @ts-ignore
            ...(this.featureSettings.interface?.definition ?? {}),
        };
        // @ts-ignore
        this._InterfaceToApply = InterfaceToApply;

        // props
        const defaultProps = __deepMerge(
            // @ts-ignore
            InterfaceToApply.defaults(),
            this.featureSettings.defaultProps ?? {},
            (<any>this.constructor)._defaultProps['*'] ?? {},
            // @ts-ignore
            (<any>this.constructor)._defaultProps[this.name] ?? {},
        );

        const props = this.node.attributes;
        let passedProps = {};
        if (props.constructor.name === 'NamedNodeMap') {
            Object.keys(props).forEach((key) => {
                let value;
                if (props[key]?.nodeValue !== undefined) {
                    if (props[key].nodeValue === '') value = true;
                    else value = props[key].nodeValue;
                }
                if (!value) return;
                passedProps[__camelCase(props[key]?.name ?? key)] = value;
            });
        } else {
            passedProps = props;
        }
        this.props = new Proxy(
            __deepMerge(
                defaultProps,
                InterfaceToApply.apply(passedProps, {
                    descriptor: {
                        defaults: false,
                    },
                }),
            ),
            {
                // @ts-ignore
                set: (target, prop, value) => {
                    // @ts-ignore
                    if (this.beforePropChange) {
                        // @ts-ignore
                        const res = this.beforePropChange?.(prop, value);
                        if (res === undefined) return false;
                        value = res;
                    }

                    // set the actual value
                    target[prop] = value;

                    if (this._InterfaceToApply._definition?.[prop.toString()]?.physical) {
                        const attrName = __dashCase(prop);
                        if (value === false || value === null) {
                            this.node.removeAttribute(attrName);
                        } else {
                            this.node.setAttribute(attrName, value.toString());
                        }
                    }

                    // @ts-ignore
                    if (this.afterPropChanged) {
                        // @ts-ignore
                        this.afterPropChanged(prop, value);
                    }

                    return true;
                },
            },
        );

        (async () => {
            // mount component when needed
            switch (this.props.mountWhen) {
                case 'inViewport':
                    (async () => {
                        // @ts-ignore
                        await __whenInViewport(this.node);
                        // @ts-ignore
                        await this.mount();
                    })();
                    break;
                case 'direct':
                case 'directly':
                default:
                    // @ts-ignore
                    await this.mount();
                    break;
            }

            // set as mounted
            this.props.mounted = true;
        })();
    }

    /**
     * @name            beforePropChange
     * @type            Function
     *
     * This method allows you to catch a property change before it actually occurs.
     * You can return the value to set it as it is, return another value to set another one
     * or returns undefined to prevent the change to be commited.
     *
     * @param           {String}            prop        The property about to be updated
     * @param           {Any}               value       The value about to be setted
     * @return          {Any}                           The value you want to actually set, or undefined if you want to prevent the update
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name            afterPropChanged
     * @type            Function
     *
     * This method allows you to catch properties updates AFTER it has been commited.
     *
     * @param           {String}            prop        The property about to be updated
     * @param           {Any}               value       The value about to be setted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name            mount
     * @type            Function
     * @async
     *
     * This method allows you to actually mount your feature behavior.
     * It will be called depending on the "mountWhen" setting setted.
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */

    /**
     * @name            exposeApi
     * @type            Function
     *
     * This method allows you to pass a simple key value object
     * that tells binding of some methods on the actual dom node.
     *
     * @param       {Any}           apiObj          The simple key value pairs api object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    exposeApi(apiObj: any): void {
        setTimeout(() => {
            let $on = this.node;
            Object.keys(apiObj).forEach((apiFnName) => {
                const apiFn = apiObj[apiFnName].bind(this);
                $on[apiFnName] = apiFn;
            });
        });
    }

    /**
     * @name      isMounted
     * @type      Function
     *
     * This method returns true if the component is mounted, false if not
     *
     * @return    {Boolean}       true if is mounted, false if not
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isMounted() {
        return this.node?.hasAttribute('mounted');
    }
}
