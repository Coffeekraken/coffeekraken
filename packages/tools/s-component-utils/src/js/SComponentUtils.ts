// @ts-nocheck
// @TODO            check how to override private static methods

import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';
import __SPromise from '@coffeekraken/s-promise';
import __SState from '@coffeekraken/s-state';
import __STheme from '@coffeekraken/s-theme';

import { __adoptStyleInShadowRoot } from '@coffeekraken/sugar/dom';

import { __when } from '@coffeekraken/sugar/dom';
import { __debounce } from '@coffeekraken/sugar/function';
import __injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
import __inViewportStatusChange from '@coffeekraken/sugar/js/dom/detect/inViewportStatusChange';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SComponentUtilsDefaultPropsInterface from './interface/SComponentUtilsDefaultPropsInterface';
import __SComponentUtilsSettingsInterface from './interface/SComponentUtilsSettingsInterface';

export interface ISComponentUtilsSettings {
    name: string;
    interface?: typeof __SInterface;
    style: string;
    state: ISComponentUtilsStateSettings;
    defaultProps?: any;
    prefixEvent: boolean;
}

export interface ISComponentUtilsStateSettings {
    save: boolean;
    id: string;
}

export interface ISComponentUtilsPropsSettings {
    interface: typeof __SInterface;
    reflectAttributes: boolean;
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
    mountWhen:
        | 'directly'
        | 'direct'
        | 'inViewport'
        | 'nearViewport'
        | 'interact';
    mountDelay: number;
    adoptStyle: boolean;
    responsive: any;
    verbose: boolean;
}

export default class SComponentUtils extends __SClass {
    /**
     * @name            props
     * @type            Object
     *
     * Store the component props
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _props;
    get props(): any {
        return (
            this._props ??
            this.node.props ??
            __SComponentUtilsDefaultPropsInterface.defaults()
        );
    }

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
        return this.settings.name ?? this.node.tagName.toLowerCase();
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

    DefaultPropsInterface: __SInterface =
        __SComponentUtilsDefaultPropsInterface;

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
        return {
            ...(this._defaultProps['*'] ?? {}),
            ...(this._defaultProps[selector] ?? {}),
        };
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
        return (<any>this.settings).componentUtils;
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
        settings?: Partial<ISComponentUtilsSettings>,
    ) {
        super(
            __deepMerge(
                __SComponentUtilsSettingsInterface.defaults(),
                settings ?? {},
            ),
        );

        this.node = node;

        // listen viewport status update
        this.inViewportStatusChange
            .on('enter', () => {
                this._isInViewport = true;
            })
            .on('leave', () => {
                this._isInViewport = false;
            });

        // @ts-ignore
        const styleStr = this.settings.style;
        this.injectStyle(styleStr ?? '');
    }

    /**
     * @name            setProps
     * @type            Function
     *
     * This method allows you to set the component props at componentUtils level
     * to be able to use them across methods.
     *
     * @param       {Any}           props           The props to be used
     *
     * @since          2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    setProps(props: any): void {
        this._props = props;
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
    initProps(props: any, settings: ISComponentUtilsPropsSettings): any {
        let finalProps = {},
            PropsInterface = this.PropsInterface(settings.interface);

        for (let [prop, definition] of Object.entries(
            PropsInterface.definition,
        )) {
            const camelProp = __camelCase(prop),
                dashProp = __dashCase(prop);
            if (this.node.getAttribute(dashProp) !== null) {
                let rawValue = this.node.getAttribute(dashProp),
                    value = rawValue;
                if (rawValue === null || rawValue.trim() === '') {
                    value = true;
                } else {
                    value = value;
                }
                finalProps[camelProp] = value;
            } else if (props[camelProp] !== undefined) {
                finalProps[camelProp] = props[camelProp];
            } else {
                finalProps[camelProp] = definition.default;
            }
        }

        finalProps = PropsInterface.apply(finalProps);
        const _this = this;

        const _props = Object.assign({}, finalProps);
        for (let [prop, value] of Object.entries(finalProps)) {
            Object.defineProperty(finalProps, prop, {
                enumarable: true,
                get() {
                    return _props[prop];
                },
                set(value) {
                    if (settings.reflectAttributes) {
                        const propDef = PropsInterface.definition[prop];
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
                    }
                    _props[prop] = value;
                },
            });
            finalProps[prop] = value;
        }

        return finalProps;
    }

    // /**
    //  * Init the cssPartial feature
    //  */
    // handleCssPartial() {
    //     // css partial if needed
    //     if (this.props.cssPartial) {
    //         this.node.setAttribute('partial', this.props.cssPartial);
    //         this.node.setAttribute('s-css', true);
    //     }
    // }

    /**
     * This method handle the passed props object and apply some behaviors
     * like the responsive props, etc...
     *
     * This will also set the "props" property in the instance.
     */
    handleProps(
        props: any,
        settings?: Partial<ISComponentUtilsPropsSettings>,
    ): void {
        const finalSettings: ISComponentUtilsPropsSettings = {
            reflectAttributes: true,
            responsive: false,
            ...(settings ?? {}),
        };

        // init props
        props = this.initProps(
            {
                ...SComponentUtils.getDefaultProps(this.name.toLowerCase()),
                ...props,
            },
            finalSettings,
        );

        // init responsive props
        if (finalSettings.responsive) {
            this.makePropsResponsive(props);
        }

        // save reference in instance
        this._props = props;

        return props;
    }

    /**
     * This method to handle the state object passed in the settings.
     * It will check if the state need to be saved, restored, etc...
     */
    handleState(
        state: any,
        settings?: Partial<ISComponentUtilsStateSettings>,
    ): void {
        const finalStateSettings: ISComponentUtilsStateSettings = {
            id: this.node.id,
            ...(this.settings.state ?? {}),
            ...(settings ?? {}),
        };

        let preventSave = false;
        Object.defineProperty(state, 'preventSave', {
            enumerable: false,
            get() {
                return () => {
                    preventSave = true;
                };
            },
        });

        // make sure we have an id
        if (finalStateSettings.save && !finalStateSettings.id) {
            console.log('HTMLElement', this.node);
            throw new Error(
                `To save the state, the HTMLElement must have an id...`,
            );
        }

        // handling state
        let _state;
        if (state.isSState) {
            _state = state;
        } else {
            _state = new __SState(state, {
                id: finalStateSettings.id,
                save: finalStateSettings.save,
            });
        }

        return _state;
    }

    /**
     * Check if some <responsive> tags are defined in the component, or if a "responsive" prop exists
     * to adapt properties depending on the viewport size.
     */
    makePropsResponsive(props: any) {
        // ensure we have a responsive object
        props.responsive = __deepMerge(
            {
                // original: Object.assign({}, props),
            },
            props.responsive ?? {},
        );

        Object.defineProperty(props, 'toResetResponsiveProps', {
            enumerable: false,
            writable: true,
            value: {},
        });

        // check for "<responsive>" tags
        // const $responsives = Array.from(this.node.children).filter(
        //     ($child) => $child.tagName === 'RESPONSIVE',
        // );
        // if ($responsives.length) {
        //     $responsives.forEach(($responsive) => {
        //         const attrs = $responsive.attributes,
        //             responsiveProps = {};
        //         let media;

        //         Object.keys(attrs).forEach((key) => {
        //             let value;
        //             if (attrs[key]?.nodeValue !== undefined) {
        //                 if (attrs[key].nodeValue === '') value = true;
        //                 else value = attrs[key].nodeValue;
        //             }
        //             if (!value) return;

        //             const propName = attrs[key]?.name ?? key;
        //             if (propName === 'media') {
        //                 media = value;
        //             } else {
        //                 responsiveProps[propName] = value;
        //             }
        //         });
        //         if (media) {
        //             if (!props.responsive[media]) {
        //                 props.responsive[media] = {};
        //             }
        //             props.responsive[media] = responsiveProps;
        //         }
        //     });
        // }

        if (
            Object.keys(props.responsive).length === 1 &&
            props.responsive.original
        ) {
            return;
        }

        // apply on resize
        window.addEventListener(
            'resize',
            __debounce(() => {
                this._applyResponsiveProps(props);
            }, 100),
        );

        // first apply
        this._applyResponsiveProps(props);
    }
    _mediaQueries = {};
    _applyResponsiveProps(props: any = {}) {
        let matchedMedia = [],
            newProps = {};

        const responsiveObj = Object.assign({}, props.responsive);

        // search for the good media
        for (let [media, responsiveProps] of Object.entries(props.responsive)) {
            // media query name
            const queries = __STheme.get(`media.queries`),
                nudeMedia = media.replace(/(<|>|=|\|)/gm, '');

            if (media === 'toResetResponsiveProps') {
                continue;
            }

            function applyProps() {
                for (let [key, value] of Object.entries(responsiveProps)) {
                    // save the props to reset later
                    props.toResetResponsiveProps[key] = props[key];
                    // assign new value
                    props[key] = value;
                }
            }

            if (media.match(/[a-zA-Z0-9<>=]/) && queries[media]) {
                let mediaQuery = this._mediaQueries[media];
                if (!mediaQuery) {
                    this._mediaQueries[media] = __STheme.buildMediaQuery(media);
                    mediaQuery = this._mediaQueries[media];
                }
                if (
                    window.matchMedia(mediaQuery.replace(/^@media\s/, ''))
                        .matches
                ) {
                    applyProps();
                    matchedMedia.push(media);
                }
            } else {
                if (window.matchMedia(media).matches) {
                    applyProps();
                    matchedMedia.push(media);
                }
            }
        }

        // reset props if needed
        if (!matchedMedia.length) {
            // console.log(props, props.responsive?.original);
            for (let [key, value] of Object.entries(
                props.toResetResponsiveProps ?? {},
            )) {
                props[key] = value;
                delete props.toResetResponsiveProps[key];
            }
        }

        // ensure we keep the responsive object intact
        props.responsive = responsiveObj;
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
     * @param       {String}            when            When you want to execute the callback. Can be "direct", "inViewport", "nearViewport", "outOfViewport", "interact", "visible" or "stylesheetReady"
     * @param       {Function}          callback            The callback to execute
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    waitAndExecute(when: string, callback: Function): Promise<any> {
        return new Promise(async (resolve, reject) => {
            // // check if we are in a custom element
            // const $closestCustomElement = __traverseUp(this.node, ($elm) => {
            //     const customElementClass = window.customElements.get(
            //         $elm.tagName.toLowerCase(),
            //     );
            //     if (customElementClass) {
            //         return $elm;
            //     }
            // });
            // if ($closestCustomElement) {
            //     await __whenAttribute($closestCustomElement, 'mounted');
            // }

            if (!when || when === 'direct' || when === 'directly') {
                await __wait();
            } else {
                await __when(this.node, when);
            }

            callback?.(this.node);
            resolve(this.node);
        });
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
     * @param           {String}            eventName     The event name to dispatch
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

        if (this.props?.prefixEvent) {
            // %componentName.%eventName
            finalSettings.$elm.dispatchEvent(
                new CustomEvent(`${componentName}.${eventName}`, finalSettings),
            );
        } else {
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
     * @name           defaultProps
     * @type            Any
     *
     * This allows you to get back the default props object
     *
     * @return      {Any}           The props object with all the default values
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _defaultProps;
    defaultProps(interf?: typeof __SInterface): any {
        if (this._defaultProps) return Object.assign({}, this._defaultProps);
        this._defaultProps = Object.assign(
            {},
            __deepMerge(
                // @ts-ignore
                __SComponentUtilsDefaultPropsInterface.defaults(),
                this.settings.defaultProps ?? {},
                (<any>this.constructor)._defaultProps['*'] ?? {},
                (<any>this.constructor)._defaultProps[this.name] ?? {},
                interf?.defaults() ?? {},
            ),
        );

        return this._defaultProps;
    }

    /**
     * @name           PropsInterface
     * @type            Any
     *
     * This allows you to get back the default props class interface
     *
     * @return      {SInterface}           The props object with all the default values
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _PropsInterface;
    PropsInterface(interf?: typeof __SInterface): any {
        if (this._PropsInterface) return this._PropsInterface;
        class PropsInterface extends __SInterface {}
        PropsInterface.definition = __deepMerge(
            __SComponentUtilsDefaultPropsInterface.definition ?? {},
            interf?.definition ?? {},
        );
        this._PropsInterface = PropsInterface;
        return this._PropsInterface;
    }

    static _injectedStyles: string[] = [];
    injectStyle(css, id = this.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1) return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        __injectStyle(css, {
            id,
        });
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
            .map((clsName) => {
                const clses: string[] = [];
                // class from the component tagname
                clses.push(
                    `${this.node.tagName.toLowerCase()}${
                        clsName && !clsName.match(/^__/) ? '-' : ''
                    }${clsName}`,
                );
                // class from the passed "name" in the settings
                if (
                    this.settings.name &&
                    this.node.tagName.toLowerCase() !== this.settings.name
                ) {
                    clses.push(
                        `${this.settings.name.toLowerCase()}${
                            clsName && !clsName.match(/^__/) ? '-' : ''
                        }${clsName}`,
                    );
                }
                return clses.join(' ');
            })
            .join(' ');

        if (style) {
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
     * @return    {Boolean}       true if is mounted, false if not
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
