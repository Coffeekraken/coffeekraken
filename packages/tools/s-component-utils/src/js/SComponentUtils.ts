import { __isInIframe } from '@coffeekraken/sugar/dom';
// @ts-nocheck
// @TODO            check how to override private static methods

import __SClass from '@coffeekraken/s-class';
import __SFront from '@coffeekraken/s-front';
import __SFrontspec from '@coffeekraken/s-frontspec';
import __SInterface from '@coffeekraken/s-interface';
import __SMedia from '@coffeekraken/s-media';
import __SState from '@coffeekraken/s-state';

import { __camelCase } from '@coffeekraken/sugar/string';

import __fastdom from 'fastdom';

import { __adoptStyleInShadowRoot } from '@coffeekraken/sugar/dom';

import { __wait } from '@coffeekraken/sugar/datetime';
import {
    __injectStyle,
    __when,
    __whenInViewport,
} from '@coffeekraken/sugar/dom';
import { __debounce } from '@coffeekraken/sugar/function';
import { __deepMerge } from '@coffeekraken/sugar/object';
import { __dashCase } from '@coffeekraken/sugar/string';
import __SComponentUtilsDefaultPropsInterface from './interface/SComponentUtilsDefaultPropsInterface.js';
import __SComponentUtilsSettingsInterface from './interface/SComponentUtilsSettingsInterface.js';

export interface ISComponentUtilsSettings {
    name: string;
    interface?: typeof __SInterface;
    style: string;
    state: ISComponentUtilsStateSettings;
    defaultProps?: any;
    prefixEvent: boolean;
    useTagNameForClassName: boolean;
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
    activeWhen: 'inViewport' | 'lod';
    mountDelay: number;
    adoptStyle: boolean;
    responsive: any;
    verbose: boolean;
}

// ensure we keep the same default for nested contents like iframe, etc...
document._sDefaultProps = window.top?.document?._sDefaultProps ?? {};

export default class SComponentUtils extends __SClass {
    /**
     * Store a reference to the "s-carpenter" component in the dom.
     * If it's present, mean that we need to not execute the features/component
     * cause the HTML of the page will be injected into an iframe where
     * these will be executed normally
     */
    static _$carpenter;

    /**
     * @name            fastdom
     * @type            Object
     * @static
     *
     * Access the fastdom api
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static fastdom: {
        mutate: Function;
        measure: Function;
    } = __fastdom;

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
     * Track if the responsive props warning has been logged to avoid
     * continusly log it
     */
    static _isResponsivePropsWarningLogged = false;

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
     * @name            fastdom
     * @type            Object
     *
     * Access the fastdom api
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    fastdom: {
        mutate: Function;
        measure: Function;
    } = __fastdom;

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
    static setDefaultProps(selector: string | string[], props: any): void {
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            document._sDefaultProps[sel] = {
                ...(document._sDefaultProps[sel] ?? {}),
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
            ...(document._sDefaultProps['*'] ?? {}),
            ...(document._sDefaultProps[selector] ?? {}),
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

        // monitor if the component is in viewport or not
        const whenInViewportPromise = __whenInViewport(this.node, {
            once: false,
        });
        whenInViewportPromise
            .on('in', () => {
                this._isInViewport = true;
            })
            .on('out', () => {
                this._isInViewport = false;
            });

        // bare class
        if (this.props.bare) {
            this.node.classList.add('s-bare');
        }

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
                dashProp = __dashCase(prop),
                attrValue = this.node.getAttribute(dashProp);
            if (attrValue !== null) {
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
                            __fastdom.mutate(() => {
                                if (
                                    value === false ||
                                    value === undefined ||
                                    value === null
                                ) {
                                    _this.node.removeAttribute(
                                        __dashCase(prop),
                                    );
                                } else {
                                    _this.node.setAttribute(
                                        __dashCase(prop),
                                        String(value),
                                    );
                                }
                            });
                        }
                    }
                    _props[prop] = value;
                },
            });
            finalProps[prop] = value;
        }

        return finalProps;
    }

    /**
     * Check if an STheme instance has been instanciated
     */
    private _isThemeAvailable(): boolean {
        return document.env?.SUGAR?.theme !== undefined;
    }

    /**
     * Check if an sFront instance has been instanciated
     */
    private _isFrontAvailable(): boolean {
        return document.env?.SUGAR?.front !== undefined;
    }

    /**
     * Check if an SFrontspec instance has been instanciated
     */
    private _isFrontspecAvailable(): boolean {
        return document.env?.SUGAR?.frontspec !== undefined;
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
            responsive: true,
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
                `To save the state of your component, the HTMLElement must have an id...`,
            );
        }

        // handling state
        let _state;
        if (state.isSState) {
            _state = state;
        } else {
            _state = new __SState(Object.assign({}, state), {
                id: finalStateSettings.id,
                save: finalStateSettings.save,
                excludeFromSave: ['status'],
            });
        }

        return _state;
    }

    /**
     * Check if some <responsive> tags are defined in the component, or if a "responsive" prop exists
     * to adapt properties depending on the viewport size.
     */
    makePropsResponsive(props: any) {
        if (
            !this._isFrontAvailable() ||
            !document.env?.SUGAR?.frontspec?.get?.('media.queries')
        ) {
            if (!this.constructor._isResponsivePropsWarningLogged) {
                this.constructor._isResponsivePropsWarningLogged = true;
                console.warn(
                    `<red>[SComponentUtils]</red> To use responsive props on components and features, you MUST call the SFront.init() method in your main entry file...`,
                );
            }
            return;
        }

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
        const $responsives = Array.from(this.node.children).filter(
            ($child) => $child.tagName === 'RESPONSIVE',
        );

        if ($responsives.length) {
            $responsives.forEach(($responsive) => {
                const attrs = $responsive.attributes,
                    responsiveProps = {};
                let media;

                Object.keys(attrs).forEach((key) => {
                    let value;
                    if (attrs[key]?.nodeValue !== undefined) {
                        if (attrs[key].nodeValue === '') value = true;
                        else value = attrs[key].nodeValue;
                    }
                    if (!value) return;

                    const propName = attrs[key]?.name ?? key;
                    if (propName === 'media') {
                        media = value;
                    } else {
                        responsiveProps[__camelCase(propName)] = value;
                    }
                });
                if (media) {
                    if (!props.responsive[media]) {
                        props.responsive[media] = {};
                    }
                    props.responsive[media] = responsiveProps;
                }
            });
        }

        if (
            Object.keys(props.responsive).length === 1 &&
            props.responsive.original
        ) {
            return;
        }

        // apply on resize
        window.addEventListener(
            'resize',
            __debounce(100, () => {
                this._applyResponsiveProps(props);
            }),
        );

        // first apply
        this._applyResponsiveProps(props);
    }
    _mediaQueries = {};
    _applyResponsiveProps(props: any = {}) {
        let matchedMedia = [],
            newProps = {};

        const responsiveObj = Object.assign({}, props.responsive);

        const mediaInstance = new __SMedia();

        // search for the good media
        for (let [media, responsiveProps] of Object.entries(props.responsive)) {
            // media query name
            const queries = __SFrontspec.get(`media.queries`),
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
                    this._mediaQueries[media] = mediaInstance.buildQuery(media);
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
     * @name           waitAndExecute
     * @type            Function
     * @async
     *
     * This async method allows you to wait for the component (node) has reached
     * his "mount" state. This state depends fully on the "mountWhen" property.
     * When the state has been reached, the passed callback will be executed.
     *
     * @param       {String|String[]}            when            When you want to execute the callback. Can be "direct", "inViewport", "nearViewport", "outOfViewport", "interact", "visible" or "stylesheetReady"
     * @param       {Function}          callback            The callback to execute
     * @return          {Promise}           A promise fullfilled when the component (node) has reached his "mount" state
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    waitAndExecute(when: string | string[], callback: Function): Promise<any> {
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

            // make sure to not init components that are in
            if (this.node.tagName.toLowerCase() !== 's-carpenter') {
                const $carpenter =
                    this.constructor._$carpenter ??
                    document.querySelector('s-carpenter');
                if ($carpenter && !__isInIframe()) {
                    return;
                }
            }

            if (!Array.isArray(when)) {
                when = [when];
            }

            // handle lod (level of details)
            if (this.props.lod !== undefined) {
                await __when(this.node, `lod:${this.props.lod}`);
            }

            // wait
            if (!when.includes('direct') && !when.includes('directly')) {
                await __when(this.node, when);
            } else {
                await __wait();
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
     * @name          cls
     * @type          Function
     *
     * This method allows you to get a component ready class like my-component__something, etc...
     *
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space. If null, does not print any class at all but the "style" one
     * @return        {String}                    The generated class that you can apply
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    cls(cls = '', style = '') {
        let clsString = '';

        if (cls !== null) {
            clsString = cls
                .split(' ')
                .map((clsName) => {
                    let clses: string[] = [];
                    // class from the component tagname if wanted
                    if (this.settings.useTagNameForClassName) {
                        clses.push(
                            `${this.node.tagName.toLowerCase()}${
                                clsName && !clsName.match(/^(_{1,2}|-)/)
                                    ? '-'
                                    : ''
                            }${clsName}`,
                        );
                    }
                    // class from the passed "name" in the settings
                    if (
                        this.settings.name &&
                        this.node.tagName.toLowerCase() !== this.settings.name
                    ) {
                        clses.push(
                            `${this.settings.name.toLowerCase()}${
                                clsName && !clsName.match(/^(_{1,2}|-)/)
                                    ? '-'
                                    : ''
                            }${clsName}`,
                        );
                    }
                    // replace '---' by '--'
                    clses = clses.map((c) => c.replace('---', '--'));

                    return clses.join(' ');
                })
                .join(' ');
        }

        if (style) {
            clsString += ` ${style}`;
        }

        return clsString;
    }

    /**
     * @name          uCls
     * @type          Function
     *
     * This method returns you only 1 class that is based on the passed "name" and not on the "tagName".
     *
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space
     * @return        {String}                    The generated class that you can apply
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    uCls(cls = '', style = '') {
        let clsString = cls
            .split(' ')
            .map((clsName) => {
                const clses: string[] = [];
                // class from the passed "name" in the settings
                if (
                    this.settings.name &&
                    this.node.tagName.toLowerCase() !== this.settings.name
                ) {
                    clses.push(
                        `${this.settings.name.toLowerCase()}${
                            clsName && !clsName.match(/^_{1,2}/) ? '-' : ''
                        }${clsName}`,
                    );
                } else {
                    clses.push(
                        `${this.node.tagName.toLowerCase()}${
                            clsName && !clsName.match(/^_{1,2}/) ? '-' : ''
                        }${clsName}`,
                    );
                }
                return clses.join(' ');
            })
            .join('');

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

    /**
     * @name            isActive
     * @type            Function
     *
     * true if the component is active or not. A component is active when
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isActive(): boolean {
        if (
            this.props.activeWhen.includes('lod') &&
            this.props.lod !== undefined &&
            this._isFrontAvailable() &&
            __SFront.instance.lod.level < this.props.lod
        ) {
            return false;
        }
        if (
            this.props.activeWhen.includes('inViewport') &&
            !this._isInViewport
        ) {
            return false;
        }
        return true;
    }
}
