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
import { __camelCase } from '@coffeekraken/sugar/string';
import __fastdom from 'fastdom';
import { __adoptStyleInShadowRoot } from '@coffeekraken/sugar/dom';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __when } from '@coffeekraken/sugar/dom';
import { __debounce } from '@coffeekraken/sugar/function';
import __inViewportStatusChange from '@coffeekraken/sugar/js/dom/detect/inViewportStatusChange';
import __injectStyle from '@coffeekraken/sugar/js/dom/inject/injectStyle';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
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
         * @name            fastdom
         * @type            Object
         *
         * Access the fastdom api
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.fastdom = __fastdom;
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
                            __fastdom.mutate(() => {
                                if (value === false ||
                                    value === undefined ||
                                    value === null) {
                                    _this.node.removeAttribute(__dashCase(prop));
                                }
                                else {
                                    _this.node.setAttribute(__dashCase(prop), String(value));
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
        const finalSettings = Object.assign({ reflectAttributes: true, responsive: true }, (settings !== null && settings !== void 0 ? settings : {}));
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
            throw new Error(`To save the state of your component, the HTMLElement must have an id...`);
        }
        // handling state
        let _state;
        if (state.isSState) {
            _state = state;
        }
        else {
            _state = new __SState(Object.assign({}, state), {
                id: finalStateSettings.id,
                save: finalStateSettings.save,
                exclude: ['status'],
            });
        }
        if (this.node.id === 'version-selector') {
            console.log('this', Object.assign({}, _state));
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
        const $responsives = Array.from(this.node.children).filter(($child) => $child.tagName === 'RESPONSIVE');
        if ($responsives.length) {
            $responsives.forEach(($responsive) => {
                const attrs = $responsive.attributes, responsiveProps = {};
                let media;
                Object.keys(attrs).forEach((key) => {
                    var _a, _b, _c;
                    let value;
                    if (((_a = attrs[key]) === null || _a === void 0 ? void 0 : _a.nodeValue) !== undefined) {
                        if (attrs[key].nodeValue === '')
                            value = true;
                        else
                            value = attrs[key].nodeValue;
                    }
                    if (!value)
                        return;
                    const propName = (_c = (_b = attrs[key]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : key;
                    if (propName === 'media') {
                        media = value;
                    }
                    else {
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
            let clses = [];
            // class from the component tagname if wanted
            if (this.settings.useTagNameForClassName) {
                clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^(__|-)/) ? '-' : ''}${clsName}`);
            }
            // class from the passed "name" in the settings
            if (this.settings.name &&
                this.node.tagName.toLowerCase() !== this.settings.name) {
                clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^(__|-)/) ? '-' : ''}${clsName}`);
            }
            // replace '---' by '--'
            clses = clses.map((c) => c.replace('---', '--'));
            return clses.join(' ');
        })
            .join(' ');
        if (style) {
            clsString += ` ${style}`;
        }
        return clsString;
    }
    /**
     * @name          uniqueClassName
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
    uniqueClassName(cls = '', style = '') {
        let clsString = cls
            .split(' ')
            .map((clsName) => {
            const clses = [];
            // class from the passed "name" in the settings
            if (this.settings.name &&
                this.node.tagName.toLowerCase() !== this.settings.name) {
                clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`);
            }
            else {
                clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`);
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
 * @name            fastdom
 * @type            Object
 * @static
 *
 * Access the fastdom api
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
SComponentUtils.fastdom = __fastdom;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7Ozs7Ozs7Ozs7QUFFaEUsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFFckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFDN0MsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBRXpELE9BQU8sU0FBUyxNQUFNLFNBQVMsQ0FBQztBQUVoQyxPQUFPLEVBQUUsd0JBQXdCLEVBQUUsTUFBTSx5QkFBeUIsQ0FBQztBQUVuRSxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLE1BQU0sRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBQ2pELE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSw4QkFBOEIsQ0FBQztBQUMxRCxPQUFPLHdCQUF3QixNQUFNLDBEQUEwRCxDQUFDO0FBQ2hHLE9BQU8sYUFBYSxNQUFNLCtDQUErQyxDQUFDO0FBQzFFLE9BQU8sRUFBRSxXQUFXLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUN6RCxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLHNDQUFzQyxNQUFNLGtEQUFrRCxDQUFDO0FBQ3RHLE9BQU8sa0NBQWtDLE1BQU0sOENBQThDLENBQUM7QUE0QzlGLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBNEpqRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLElBQWlCLEVBQ2pCLFFBQTRDO1FBRTVDLEtBQUssQ0FDRCxXQUFXLENBQ1Asa0NBQWtDLENBQUMsUUFBUSxFQUFFLEVBQzdDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUs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