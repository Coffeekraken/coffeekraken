// @ts-nocheck
// @TODO            check how to override private static methods

// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/css/adoptStyleInShadowRoot';
import __injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import { LitElement } from 'lit';
import __SClass from '@coffeekraken/s-class';

export class SComponentDefaultInterface extends __SInterface {
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
        adoptStyle: {
            type: 'Boolean',
            default: true,
            physical: true,
        },
        defaultStyle: {
            type: 'Boolean',
            default: true,
            physical: true,
        },
    };
}

export interface ISComponentUtilsSettings {
    interface?: typeof __SInterface;
    style: string;
    defaultProps?: any;
}

export interface ISComponentUtilsCtorSettings {
    sComponent: Partial<ISComponentUtilsSettings>;
}

export interface ISComponentDefaultProps {
    id: string;
    mountWhen: 'directly' | 'inViewport';
    adoptStyle: boolean;
    defaultStyle: boolean;
}

export default class SComponent extends __SClass {
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

    /**
     * @name            node
     * @type            Object
     *
     * Store the component node
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    node: HTMLElement;

    /**
     * @name            state
     * @type            String
     *
     * Track the state of the component.
     * - pending: default state when nothing has been done
     * - mount: state when the component has to be mounted
     * - mounted: state when the component has been mounded
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    state = 'pending';

    InterfaceToApply: __SInterface;

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
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            this._defaultProps[sel] = {
                ...(this._defaultProps[sel] ?? {}),
                ...props,
            };
        });
    }

    /**
     * @name        sComponentUtilsSettings
     * @type        ISComponentUtilsSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get sComponentUtilsSettings(): ISComponentUtilsSettings {
        return (<any>this._settings).sComponentUtils;
    }

    _whenMountPromise;
    _whenMountedPromise;

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
    constructor(node: HTMLElement, props: any, settings: Partial<ISComponentUtilsCtorSettings> = {}) {
        super(
            __deepMerge(
                {
                    sComponentUtils: {},
                },
                settings,
            ),
        );

        this.node = node;
        this._props = props;

        // build the final interface class to apply on props
        let InterfaceToApply = class InlineSComponentUtilsInterface extends __SInterface {
            static definition = {};
        };
        // @ts-ignore
        InterfaceToApply.definition = {
            ...Object.assign({}, SComponentDefaultInterface.definition),
            // @ts-ignore
            ...(this.sComponentUtilsSettings.interface?.definition ?? {}),
        };
        // @ts-ignore
        this.InterfaceToApply = InterfaceToApply;

        // @ts-ignore
        const styleStr = this.sComponentUtilsSettings.style;
        this.injectStyle(styleStr ?? '');

        // waiting for mount state
        this._whenMountedPromise = new Promise(async (resolveMounted) => {
            this._whenMountPromise = new Promise(async (resolveMount) => {
                // mount component when needed
                switch (this.props.mountWhen) {
                    case 'inViewport':
                        (async () => {
                            // @ts-ignore
                            await __whenInViewport(this.node);
                        })();
                        break;
                    case 'direct':
                    case 'directly':
                    default:
                        break;
                }
                resolveMount(() => {
                    this.state = 'mounted';
                    resolveMounted();
                });
            });
        });
    }

    /**
     * @name           whenMountState
     * @type            Function
     * @async
     *
     * This asynv method allows you to wait for the component (node) has reached
     * his "mount" state. This state depends fully on the "mountWhen" property
     *
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    whenMountState(): Promise<any> {
        return this._whenMountPromise;
    }

    /**
     * @name           whenMountedState
     * @type            Function
     * @async
     *
     * This asynv method allows you to wait for the component (node) has reached
     * his "mounted" state. This state depends fully on the "mountWhen" property
     *
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    whenMountedState(): Promise<any> {
        return this._whenMountedPromise;
    }

    /**
     * @name        adoptStyleInShadowRoot
     * @type        Function
     * @async
     *
     * This method allows you to make the passed shadowRoot element adopt
     * the style of the passed context who's by default the document itself
     *
     * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
     * @param      {HTMLElement}                   [$context=document]     The context from which you want to adopt the styles
     * @return      {Promise}                                               Return a promise fullfilled when the styles have been adopted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    adoptStyleInShadowRoot($shadowRoot: HTMLElement, $context: HTMLElement | typeof document): Promise<any> {
        return __adoptStyleInShadowRoot($shadowRoot, $context);
    }

    /**
     * @name           props
     * @type            Any
     *
     * This property allows you to get back the current props object
     *
     * @return      {Any}           The current props object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _finalProps;
    get props(): any {
        // if props already builded
        if (this._finalProps) return this._finalProps;

        const props = this._props;
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
        this._finalProps = __deepMerge(
            this.defaultProps,
            this.InterfaceToApply.apply(passedProps, {
                descriptor: {
                    defaults: false,
                },
            }),
        );
        return this._finalProps;
    }

    /**
     * @name           defaultProps
     * @type            Any
     *
     * This property allows you to get back the default props object
     * that has been build using the SComponentUtilsDefaultProps interface
     * and the one you passed in the sComponent.interface setting
     *
     * @return      {Any}           The props object with all the default values
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _defaultProps;
    get defaultProps(): any {
        if (this._defaultProps) return Object.assign({}, this._defaultProps);
        this._defaultProps = Object.assign(
            {},
            __deepMerge(
                // @ts-ignore
                this.InterfaceToApply.defaults(),
                this.sComponentUtilsSettings.defaultProps ?? {},
                (<any>this.constructor)._defaultProps['*'] ?? {},
                (<any>this.constructor)._defaultProps[this.node.tagName.toLowerCase()] ?? {},
            ),
        );
        return this._defaultProps;
    }

    static getFinalInterface(int?: typeof __SInterface): __SInterface {
        class InlineSComponentUtilsInterface extends __SInterface {
            static definition = SComponentDefaultInterface.definition;
        }
        if (int) {
            InlineSComponentUtilsInterface.definition = {
                ...SComponentDefaultInterface.definition,
                // @ts-ignore
                ...int.definition,
            };
        }
        // @ts-ignore
        return InlineSComponentUtilsInterface;
    }

    static _injectedStyles: string[] = [];
    injectStyle(css, id = this.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1) return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        __injectStyle(css, id);
    }

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
                const apiFn = apiObj[apiFnName];
                $on[apiFnName] = apiFn;
            });
        });
    }

    /**
     * @name          className
     * @type          Function
     *
     * This method allows you to get a component ready className like my-component__something, etc...
     *
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space
     * @return        {String}                    The generated class that you can apply
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    className(cls = '', style = '') {
        let clsString = cls
            .split(' ')
            .map(
                (clsName) =>
                    `${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`,
            )
            .join(' ');

        if (style && this.props.defaultStyle) {
            clsString += ` ${style}`;
        }

        return clsString;
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

    /**
     * @name        dispatchSyncEvent
     * @type        Function
     *
     * This method allows you to dispatch a sync event that will wait for an answer
     * before passing to the next statements.
     * This mechanism work by sending a "ping" event to check if someone (another component) listen to us.
     * If their's no answer, we pass to the next statements whichout doing anything but
     * if we have an answer, we send the actual event and wait for an answer.
     *
     * @param     {String}     name       The event name you want to send
     * @param     {Any}       details     Some details you want to attach to the event
     * @return    {SPromise}              An SPromise instance that will be resolved if we get an answer and rejected if not
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    // dispatchSyncEvent(name: string, details: any): Promise<any> {
    //     return new Promise((resolve, reject) => {
    //         let hasListeners = false;

    //         this.dispatchEvent(
    //             new CustomEvent(name, {
    //                 detail: {
    //                     ...details,
    //                     onPing() {
    //                         hasListeners = true;
    //                     },
    //                     onResolve(data) {
    //                         resolve(data);
    //                     },
    //                 },
    //             }),
    //         );
    //         setTimeout(() => {
    //             if (!hasListeners) reject();
    //         });
    //     });
    // }
}
