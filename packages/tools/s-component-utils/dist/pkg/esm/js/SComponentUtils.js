// @ts-nocheck
// @TODO            check how to override private static methods
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SInterface from '@coffeekraken/s-interface';
import __SState from '@coffeekraken/s-state';
import __STheme from '@coffeekraken/s-theme';
import { __adoptStyleInShadowRoot } from '@coffeekraken/sugar/dom';
import __injectStyle from '@coffeekraken/sugar/js/dom/css/injectStyle';
import __inViewportStatusChange from '@coffeekraken/sugar/js/dom/detect/inViewportStatusChange';
import { __when } from '@coffeekraken/sugar/dom';
import __debounce from '@coffeekraken/sugar/shared/function/debounce';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SComponentUtilsDefaultPropsInterface from './interface/SComponentUtilsDefaultPropsInterface';
import __SComponentUtilsSettingsInterface from './interface/SComponentUtilsSettingsInterface';
export default class SComponentUtils extends __SClass {
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
    constructor(node, settings) {
        super(__deepMerge(__SComponentUtilsSettingsInterface.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
        this.state = 'pending';
        this.DefaultPropsInterface = __SComponentUtilsDefaultPropsInterface;
        this._isInViewport = false;
        this._mediaQueries = {};
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
        this.injectStyle(styleStr !== null && styleStr !== void 0 ? styleStr : '');
    }
    get props() {
        var _a, _b;
        return ((_b = (_a = this._props) !== null && _a !== void 0 ? _a : this.node.props) !== null && _b !== void 0 ? _b : __SComponentUtilsDefaultPropsInterface.defaults());
    }
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
    get name() {
        var _a;
        return (_a = this.settings.name) !== null && _a !== void 0 ? _a : this.node.tagName.toLowerCase();
    }
    static setDefaultProps(selector, props) {
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            var _a;
            this._defaultProps[sel] = Object.assign(Object.assign({}, ((_a = this._defaultProps[sel]) !== null && _a !== void 0 ? _a : {})), props);
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
    static getDefaultProps(selector) {
        var _a, _b;
        return Object.assign(Object.assign({}, ((_a = this._defaultProps['*']) !== null && _a !== void 0 ? _a : {})), ((_b = this._defaultProps[selector]) !== null && _b !== void 0 ? _b : {}));
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
    get componentUtilsSettings() {
        return this.settings.componentUtils;
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
    setProps(props) {
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
    initProps(props, settings) {
        let finalProps = {}, PropsInterface = this.PropsInterface(settings.interface);
        for (let [prop, definition] of Object.entries(PropsInterface.definition)) {
            const camelProp = __camelCase(prop), dashProp = __dashCase(prop);
            if (this.node.getAttribute(dashProp) !== null) {
                let rawValue = this.node.getAttribute(dashProp), value = rawValue;
                if (rawValue === null || rawValue.trim() === '') {
                    value = true;
                }
                else {
                    value = value;
                }
                finalProps[camelProp] = value;
            }
            else if (props[camelProp] !== undefined) {
                finalProps[camelProp] = props[camelProp];
            }
            else {
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
                        if (propDef === null || propDef === void 0 ? void 0 : propDef.physical) {
                            if (value === false ||
                                value === undefined ||
                                value === null) {
                                _this.node.removeAttribute(__dashCase(prop));
                            }
                            else {
                                _this.node.setAttribute(__dashCase(prop), String(value));
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
    handleProps(props, settings) {
        const finalSettings = Object.assign({ reflectAttributes: true, responsive: false }, (settings !== null && settings !== void 0 ? settings : {}));
        // init props
        props = this.initProps(Object.assign(Object.assign({}, SComponentUtils.getDefaultProps(this.name.toLowerCase())), props), finalSettings);
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
    handleState(state, settings) {
        var _a;
        const finalStateSettings = Object.assign(Object.assign({ id: this.node.id }, ((_a = this.settings.state) !== null && _a !== void 0 ? _a : {})), (settings !== null && settings !== void 0 ? settings : {}));
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
            throw new Error(`To save the state, the HTMLElement must have an id...`);
        }
        // handling state
        let _state;
        if (state.isSState) {
            _state = state;
        }
        else {
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
    makePropsResponsive(props) {
        var _a;
        // ensure we have a responsive object
        props.responsive = __deepMerge({
        // original: Object.assign({}, props),
        }, (_a = props.responsive) !== null && _a !== void 0 ? _a : {});
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
        if (Object.keys(props.responsive).length === 1 &&
            props.responsive.original) {
            return;
        }
        // apply on resize
        window.addEventListener('resize', __debounce(() => {
            this._applyResponsiveProps(props);
        }, 100));
        // first apply
        this._applyResponsiveProps(props);
    }
    _applyResponsiveProps(props = {}) {
        var _a;
        let matchedMedia = [], newProps = {};
        const responsiveObj = Object.assign({}, props.responsive);
        // search for the good media
        for (let [media, responsiveProps] of Object.entries(props.responsive)) {
            // media query name
            const queries = __STheme.get(`media.queries`), nudeMedia = media.replace(/(<|>|=|\|)/gm, '');
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
                if (window.matchMedia(mediaQuery.replace(/^@media\s/, ''))
                    .matches) {
                    applyProps();
                    matchedMedia.push(media);
                }
            }
            else {
                if (window.matchMedia(media).matches) {
                    applyProps();
                    matchedMedia.push(media);
                }
            }
        }
        // reset props if needed
        if (!matchedMedia.length) {
            // console.log(props, props.responsive?.original);
            for (let [key, value] of Object.entries((_a = props.toResetResponsiveProps) !== null && _a !== void 0 ? _a : {})) {
                props[key] = value;
                delete props.toResetResponsiveProps[key];
            }
        }
        // ensure we keep the responsive object intact
        props.responsive = responsiveObj;
    }
    get inViewportStatusChange() {
        if (this._inViewportStatusChangePromise)
            return this._inViewportStatusChangePromise;
        this._inViewportStatusChangePromise = __inViewportStatusChange(this.node);
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
    waitAndExecute(when, callback) {
        return new Promise((resolve, reject) => __awaiter(this, void 0, void 0, function* () {
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
                yield __wait();
            }
            else {
                yield __when(this.node, when);
            }
            callback === null || callback === void 0 ? void 0 : callback(this.node);
            resolve(this.node);
        }));
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
    dispatchEvent(eventName, settings) {
        var _a;
        const finalSettings = Object.assign({ $elm: this.node, bubbles: true, cancelable: true, detail: {} }, (settings !== null && settings !== void 0 ? settings : {}));
        const componentName = this.name;
        if ((_a = this.props) === null || _a === void 0 ? void 0 : _a.prefixEvent) {
            // %componentName.%eventName
            finalSettings.$elm.dispatchEvent(new CustomEvent(`${componentName}.${eventName}`, finalSettings));
        }
        else {
            // %eventName
            finalSettings.$elm.dispatchEvent(new CustomEvent(eventName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventComponent: componentName }) })));
        }
        // %componentName
        finalSettings.$elm.dispatchEvent(new CustomEvent(componentName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventType: eventName }) })));
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
    adoptStyleInShadowRoot($shadowRoot, $context) {
        return __adoptStyleInShadowRoot($shadowRoot, $context);
    }
    defaultProps(interf) {
        var _a, _b, _c, _d;
        if (this._defaultProps)
            return Object.assign({}, this._defaultProps);
        this._defaultProps = Object.assign({}, __deepMerge(
        // @ts-ignore
        __SComponentUtilsDefaultPropsInterface.defaults(), (_a = this.settings.defaultProps) !== null && _a !== void 0 ? _a : {}, (_b = this.constructor._defaultProps['*']) !== null && _b !== void 0 ? _b : {}, (_c = this.constructor._defaultProps[this.name]) !== null && _c !== void 0 ? _c : {}, (_d = interf === null || interf === void 0 ? void 0 : interf.defaults()) !== null && _d !== void 0 ? _d : {}));
        return this._defaultProps;
    }
    PropsInterface(interf) {
        var _a, _b;
        if (this._PropsInterface)
            return this._PropsInterface;
        class PropsInterface extends __SInterface {
        }
        PropsInterface.definition = __deepMerge((_a = __SComponentUtilsDefaultPropsInterface.definition) !== null && _a !== void 0 ? _a : {}, (_b = interf === null || interf === void 0 ? void 0 : interf.definition) !== null && _b !== void 0 ? _b : {});
        this._PropsInterface = PropsInterface;
        return this._PropsInterface;
    }
    injectStyle(css, id = this.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1)
            return;
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
    exposeApi(apiObj, ctx = this.node) {
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
            const clses = [];
            // class from the component tagname
            clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`);
            // class from the passed "name" in the settings
            if (this.settings.name &&
                this.node.tagName.toLowerCase() !== this.settings.name) {
                clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`);
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
        var _a;
        return (_a = this.node) === null || _a === void 0 ? void 0 : _a.hasAttribute('mounted');
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
    isInViewport() {
        return this._isInViewport;
    }
}
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
SComponentUtils._defaultProps = {};
SComponentUtils._injectedStyles = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7Ozs7Ozs7Ozs7QUFFaEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLHdCQUF3QixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFFbkUsT0FBTyxhQUFhLE1BQU0sNENBQTRDLENBQUM7QUFDdkUsT0FBTyx3QkFBd0IsTUFBTSwwREFBMEQsQ0FBQztBQUNoRyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDakQsT0FBTyxVQUFVLE1BQU0sOENBQThDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFDcEUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxzQ0FBc0MsTUFBTSxrREFBa0QsQ0FBQztBQUN0RyxPQUFPLGtDQUFrQyxNQUFNLDhDQUE4QyxDQUFDO0FBMkM5RixNQUFNLENBQUMsT0FBTyxPQUFPLGVBQWdCLFNBQVEsUUFBUTtJQStIakQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxJQUFpQixFQUNqQixRQUE0QztRQUU1QyxLQUFLLENBQ0QsV0FBVyxDQUNQLGtDQUFrQyxDQUFDLFFBQVEsRUFBRSxFQUM3QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQXJHTjs7Ozs7Ozs7Ozs7V0FXRztRQUNILFVBQUssR0FBRyxTQUFTLENBQUM7UUFFbEIsMEJB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