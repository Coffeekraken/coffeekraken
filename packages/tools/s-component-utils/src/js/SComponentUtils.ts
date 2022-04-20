// @ts-nocheck
// @TODO            check how to override private static methods

// import __mustache from 'mustache';
import __SClass from '@coffeekraken/s-class';
import __SConductor from '@coffeekraken/s-conductor';
import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import __adoptStyleInShadowRoot from '@coffeekraken/sugar/js/dom/css/adoptStyleInShadowRoot';
import __injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
import __inViewportStatusChange from '@coffeekraken/sugar/js/dom/detect/inViewportStatusChange';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __autoCast from '@coffeekraken/sugar/shared/string/autoCast';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __SComponentUtilsDefaultPropsInterface from './interface/SComponentUtilsDefaultPropsInterface';

export interface ISComponentUtilsSettings {
    interface?: typeof __SInterface;
    style: string;
    defaultProps?: any;
}

export interface ISComponentUtilsCtorSettings {
    componentUtils: Partial<ISComponentUtilsSettings>;
}

export interface ISComponentUtilsDispatchSettings {
    $elm: HTMLElement;
    bubbles: boolean;
    cancelable: boolean;
    detail: any;
}

export interface ISComponentUtilsDefaultProps {
    id: string;
    mounted: boolean;
    mountWhen: 'directly' | 'direct' | 'inViewport';
    adoptStyle: boolean;
    bare: boolean;
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
     * @name            name
     * @type            String
     *
     * Get the name of the node or feature that this component utils is
     * used by. Get from `settings.componentUtils.name` then throught the passed
     * node using his tagName property
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get name(): string {
        return (
            this.componentUtilsSettings.name ?? this.node.tagName.toLowerCase()
        );
    }

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
     * @name            getDefaultProps
     * @type            Function
     * @static
     *
     * This static method allows you to get back some default props setted for a component/feature, etc...
     *
     * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
     * @return    {Any}                                 Some default props setted or an empty object
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static getDefaultProps(selector: string): any {
        return this._defaultProps[selector] ?? {};
    }

    /**
     * @name        componentUtilsSettings
     * @type        ISComponentUtilsSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get componentUtilsSettings(): ISComponentUtilsSettings {
        return (<any>this._settings).componentUtils;
    }

    _whenMountPromise;
    _whenMountedPromise;
    _isInViewport = false;

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
    constructor(
        node: HTMLElement,
        props: any,
        settings: Partial<ISComponentUtilsCtorSettings> = {},
    ) {
        super(
            __deepMerge(
                {
                    componentUtils: {},
                },
                settings,
            ),
        );

        this.node = node;
        this._props = props;

        // listen viewport status update
        this.inViewportStatusChange
            .on('enter', () => {
                this._isInViewport = true;
            })
            .on('leave', () => {
                this._isInViewport = false;
            });

        // build the final interface class to apply on props
        let InterfaceToApply = class InlineSComponentUtilsInterface extends __SInterface {
            // static definition = {};
        };
        // @ts-ignore
        InterfaceToApply.definition = {
            ...Object.assign(
                {},
                __SComponentUtilsDefaultPropsInterface.definition,
            ),
            // @ts-ignore
            ...(this.componentUtilsSettings.interface?.definition ?? {}),
        };
        // @ts-ignore
        this.InterfaceToApply = InterfaceToApply;

        // @ts-ignore
        const styleStr = this.componentUtilsSettings.style;
        this.injectStyle(styleStr ?? '');
    }

    /**
     * @name           inViewportStatusChange
     * @type            SPromise
     * @get
     * @async
     *
     * Detect when the component enters and leave the viewport
     *
     * @return          {SPromise}          An SPromise instance through which you want subscribe for events like "enter" and "exit"
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _inViewportStatusChangePromise;
    get inViewportStatusChange(): __SPromise<HTMLElement> {
        if (this._inViewportStatusChangePromise)
            return this._inViewportStatusChangePromise;
        this._inViewportStatusChangePromise = __inViewportStatusChange(
            this.node,
        );
        return this._inViewportStatusChangePromise;
    }

    /**
     * @name           waitAndExecute
     * @type            Function
     * @async
     *
     * This async method allows you to wait for the component (node) has reached
     * his "mount" state. This state depends fully on the "mountWhen" property.
     * When the state has been reached, the passed callback will be executed.
     *
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    waitAndExecute(callback: Function): Promise<any> {
        return __SConductor.when(this.node, this.props.mountWhen, callback);
    }

    /**
     * @name           dispatchEvent
     * @type            Function
     * @async
     *
     * This method allows you to dispatch some CustomEvents from your component node itself.
     * 1. An event called "%componentName.%eventName"
     * 2. An event called "%componentName" with in the detail object a "eventType" property set to the event name
     * 3. An event called "%eventName" with in the detail object a "eventComponent" property set to the component name
     *
     * @param           {String}            eventName     The event name to dispatch
     * @param           {ISComponentUtilsDispatchSettings}          [settings={}]     The settings to use for the dispatch
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    dispatchEvent(
        eventName: string,
        settings?: Partial<ISComponentUtilsDispatchSettings>,
    ): void {
        const finalSettings: ISComponentUtilsDispatchSettings = {
            $elm: this.node,
            bubbles: true,
            cancelable: true,
            detail: {},
            ...(settings ?? {}),
        };

        const componentName = this.name;

        // %componentName.%eventName
        finalSettings.$elm.dispatchEvent(
            new CustomEvent(`${componentName}.${eventName}`, finalSettings),
        );

        // %componentName
        finalSettings.$elm.dispatchEvent(
            new CustomEvent(componentName, {
                ...finalSettings,
                detail: {
                    ...finalSettings.detail,
                    eventType: eventName,
                },
            }),
        );

        // %eventName
        finalSettings.$elm.dispatchEvent(
            new CustomEvent(eventName, {
                ...finalSettings,
                detail: {
                    ...finalSettings.detail,
                    eventComponent: componentName,
                },
            }),
        );
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
    adoptStyleInShadowRoot(
        $shadowRoot: HTMLElement,
        $context: HTMLElement | typeof document,
    ): Promise<any> {
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
                passedProps[__camelCase(props[key]?.name ?? key)] = __autoCast(
                    value,
                );
            });
        } else {
            j;
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

        const _this = this;
        this._finalProps = new Proxy(this._finalProps, {
            get(target, prop, receiver) {
                return target[prop];
            },
            set(obj, prop, value) {
                const propDef = _this.InterfaceToApply.definition[prop];
                if (propDef?.physical) {
                    if (
                        value === false ||
                        value === undefined ||
                        value === null
                    ) {
                        _this.node.removeAttribute(__dashCase(prop));
                    } else {
                        _this.node.setAttribute(
                            __dashCase(prop),
                            String(value),
                        );
                    }
                }
                obj[prop] = value;
                return true;
            },
        });

        Object.keys(this._finalProps).forEach((prop) => {
            this._finalProps[prop] = this._finalProps[prop];
        });

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
                this.componentUtilsSettings.defaultProps ?? {},
                (<any>this.constructor)._defaultProps['*'] ?? {},
                (<any>this.constructor)._defaultProps[this.name] ?? {},
            ),
        );

        return this._defaultProps;
    }

    static getFinalInterface(int?: typeof __SInterface): __SInterface {
        class InlineSComponentUtilsInterface extends __SInterface {
            static definition =
                __SComponentUtilsDefaultPropsInterface.definition;
        }
        if (int) {
            InlineSComponentUtilsInterface.definition = {
                ...__SComponentUtilsDefaultPropsInterface.definition,
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
    exposeApi(apiObj: any, ctx: any = this.node): void {
        setTimeout(() => {
            let $on = this.node;
            Object.keys(apiObj).forEach((apiFnName) => {
                const apiFn = apiObj[apiFnName].bind(ctx);
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
                    `${this.node.tagName.toLowerCase()}${
                        clsName && !clsName.match(/^__/) ? '-' : ''
                    }${clsName}`,
            )
            .join(' ');

        if (style && !this.props.bare) {
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
     * @name            isInViewport
     * @type            Function
     *
     * true if the component is in the viewport, false if not
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isInViewport(): boolean {
        return this._isInViewport;
    }
}
