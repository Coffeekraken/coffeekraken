"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
var _a, _b, _c;
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
// @ts-nocheck
// @TODO            check how to override private static methods
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_media_1 = __importDefault(require("@coffeekraken/s-media"));
const s_state_1 = __importDefault(require("@coffeekraken/s-state"));
const string_1 = require("@coffeekraken/sugar/string");
const fastdom_1 = __importDefault(require("fastdom"));
const dom_2 = require("@coffeekraken/sugar/dom");
const datetime_1 = require("@coffeekraken/sugar/datetime");
const dom_3 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
const injectStyle_1 = __importDefault(require("@coffeekraken/sugar/js/dom/inject/injectStyle"));
const object_1 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const SComponentUtilsDefaultPropsInterface_1 = __importDefault(require("./interface/SComponentUtilsDefaultPropsInterface"));
const SComponentUtilsSettingsInterface_1 = __importDefault(require("./interface/SComponentUtilsSettingsInterface"));
// ensure we keep the same default for nested contents like iframe, etc...
document._sDefaultProps = (_c = (_b = (_a = window.top) === null || _a === void 0 ? void 0 : _a.document) === null || _b === void 0 ? void 0 : _b._sDefaultProps) !== null && _c !== void 0 ? _c : {};
class SComponentUtils extends s_class_1.default {
    get props() {
        var _a, _b;
        return ((_b = (_a = this._props) !== null && _a !== void 0 ? _a : this.node.props) !== null && _b !== void 0 ? _b : SComponentUtilsDefaultPropsInterface_1.default.defaults());
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
    static setDefaultProps(selector, props) {
        selector = Array.isArray(selector) ? selector : [selector];
        selector.forEach((sel) => {
            var _a;
            document._sDefaultProps[sel] = Object.assign(Object.assign({}, ((_a = document._sDefaultProps[sel]) !== null && _a !== void 0 ? _a : {})), props);
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
        return Object.assign(Object.assign({}, ((_a = document._sDefaultProps['*']) !== null && _a !== void 0 ? _a : {})), ((_b = document._sDefaultProps[selector]) !== null && _b !== void 0 ? _b : {}));
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
        super((0, object_1.__deepMerge)(SComponentUtilsSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
        /**
         * @name            fastdom
         * @type            Object
         *
         * Access the fastdom api
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.fastdom = fastdom_1.default;
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
        this.DefaultPropsInterface = SComponentUtilsDefaultPropsInterface_1.default;
        this._isInViewport = false;
        this._mediaQueries = {};
        this.node = node;
        // monitor if the component is in viewport or not
        const whenInViewportPromise = (0, dom_3.__whenInViewport)(this.node, {
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
        this.injectStyle(styleStr !== null && styleStr !== void 0 ? styleStr : '');
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
            const camelProp = (0, string_1.__camelCase)(prop), dashProp = (0, dashCase_1.default)(prop), attrValue = this.node.getAttribute(dashProp);
            if (attrValue !== null) {
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
                            fastdom_1.default.mutate(() => {
                                if (value === false ||
                                    value === undefined ||
                                    value === null) {
                                    _this.node.removeAttribute((0, dashCase_1.default)(prop));
                                }
                                else {
                                    _this.node.setAttribute((0, dashCase_1.default)(prop), String(value));
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
    _isThemeAvailable() {
        var _a, _b;
        return ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.theme) !== undefined;
    }
    /**
     * Check if an sFront instance has been instanciated
     */
    _isFrontAvailable() {
        var _a, _b;
        return ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.front) !== undefined;
    }
    /**
     * Check if an SFrontspec instance has been instanciated
     */
    _isFrontspecAvailable() {
        var _a, _b;
        return ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.frontspec) !== undefined;
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
            _state = new s_state_1.default(Object.assign({}, state), {
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
    makePropsResponsive(props) {
        var _a, _b, _c, _d, _e;
        if (!this._isFrontAvailable() ||
            !((_d = (_c = (_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.frontspec) === null || _c === void 0 ? void 0 : _c.get) === null || _d === void 0 ? void 0 : _d.call(_c, 'media.queries'))) {
            if (!this.constructor._isResponsivePropsWarningLogged) {
                this.constructor._isResponsivePropsWarningLogged = true;
                console.warn(`<red>[SComponentUtils]</red> To use responsive props on components and features, you MUST call the SFront.init() method in your main entry file...`);
            }
            return;
        }
        // ensure we have a responsive object
        props.responsive = (0, object_1.__deepMerge)({
        // original: Object.assign({}, props),
        }, (_e = props.responsive) !== null && _e !== void 0 ? _e : {});
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
                        responsiveProps[(0, string_1.__camelCase)(propName)] = value;
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
        window.addEventListener('resize', (0, function_1.__debounce)(100, () => {
            this._applyResponsiveProps(props);
        }));
        // first apply
        this._applyResponsiveProps(props);
    }
    _applyResponsiveProps(props = {}) {
        var _a;
        let matchedMedia = [], newProps = {};
        const responsiveObj = Object.assign({}, props.responsive);
        const mediaInstance = new s_media_1.default();
        // search for the good media
        for (let [media, responsiveProps] of Object.entries(props.responsive)) {
            // media query name
            const queries = s_frontspec_1.default.get(`media.queries`), nudeMedia = media.replace(/(<|>|=|\|)/gm, '');
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
            var _a;
            // make sure to not init components that are in
            if (this.node.tagName.toLowerCase() !== 's-carpenter') {
                const $carpenter = (_a = this.constructor._$carpenter) !== null && _a !== void 0 ? _a : document.querySelector('s-carpenter');
                if ($carpenter && !(0, dom_1.__isInIframe)()) {
                    return;
                }
            }
            if (!Array.isArray(when)) {
                when = [when];
            }
            // handle lod (level of details)
            if (this.props.lod !== undefined) {
                yield (0, dom_3.__when)(this.node, `lod:${this.props.lod}`);
            }
            // wait
            if (!when.includes('direct') && !when.includes('directly')) {
                yield (0, dom_3.__when)(this.node, when);
            }
            else {
                yield (0, datetime_1.__wait)();
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
        return (0, dom_2.__adoptStyleInShadowRoot)($shadowRoot, $context);
    }
    defaultProps(interf) {
        var _a, _b, _c, _d;
        if (this._defaultProps)
            return Object.assign({}, this._defaultProps);
        this._defaultProps = Object.assign({}, (0, object_1.__deepMerge)(
        // @ts-ignore
        SComponentUtilsDefaultPropsInterface_1.default.defaults(), (_a = this.settings.defaultProps) !== null && _a !== void 0 ? _a : {}, (_b = this.constructor._defaultProps['*']) !== null && _b !== void 0 ? _b : {}, (_c = this.constructor._defaultProps[this.name]) !== null && _c !== void 0 ? _c : {}, (_d = interf === null || interf === void 0 ? void 0 : interf.defaults()) !== null && _d !== void 0 ? _d : {}));
        return this._defaultProps;
    }
    PropsInterface(interf) {
        var _a, _b;
        if (this._PropsInterface)
            return this._PropsInterface;
        class PropsInterface extends s_interface_1.default {
        }
        PropsInterface.definition = (0, object_1.__deepMerge)((_a = SComponentUtilsDefaultPropsInterface_1.default.definition) !== null && _a !== void 0 ? _a : {}, (_b = interf === null || interf === void 0 ? void 0 : interf.definition) !== null && _b !== void 0 ? _b : {});
        this._PropsInterface = PropsInterface;
        return this._PropsInterface;
    }
    injectStyle(css, id = this.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1)
            return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        (0, injectStyle_1.default)(css, {
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
                var _a, _b;
                let clses = [];
                // class from the component tagname if wanted
                if (this.settings.useTagNameForClassName) {
                    clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/)
                        ? '-'
                        : ''}${clsName}`);
                }
                // class from the passed "name" in the settings
                if (this.settings.name &&
                    this.node.tagName.toLowerCase() !== this.settings.name) {
                    clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/)
                        ? '-'
                        : ''}${clsName}`);
                }
                // replace '---' by '--'
                clses = clses.map((c) => c.replace('---', '--'));
                // classmap
                if ((_b = (_a = document.env) === null || _a === void 0 ? void 0 : _a.SUGAR) === null || _b === void 0 ? void 0 : _b.classmap) {
                    clses = clses.map((cls) => {
                        var _a;
                        return (_a = document.env.SUGAR.classmap[cls]) !== null && _a !== void 0 ? _a : cls;
                    });
                }
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
            const clses = [];
            // class from the passed "name" in the settings
            if (this.settings.name &&
                this.node.tagName.toLowerCase() !== this.settings.name) {
                clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^_{1,2}/) ? '-' : ''}${clsName}`);
            }
            else {
                clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^_{1,2}/) ? '-' : ''}${clsName}`);
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
    /**
     * @name            isActive
     * @type            Function
     *
     * true if the component is active or not. A component is active when
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isActive() {
        if (this.props.activeWhen.includes('lod') &&
            this.props.lod !== undefined &&
            this._isFrontAvailable() &&
            s_front_1.default.instance.lod.level < this.props.lod) {
            return false;
        }
        if (this.props.activeWhen.includes('inViewport') &&
            !this._isInViewport) {
            return false;
        }
        return true;
    }
}
exports.default = SComponentUtils;
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
SComponentUtils.fastdom = fastdom_1.default;
/**
 * Track if the responsive props warning has been logged to avoid
 * continusly log it
 */
SComponentUtils._isResponsivePropsWarningLogged = false;
SComponentUtils._injectedStyles = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQUFBLGlEQUF1RDtBQUN2RCxjQUFjO0FBQ2QsZ0VBQWdFO0FBRWhFLG9FQUE2QztBQUM3QyxvRUFBNkM7QUFDN0MsNEVBQXFEO0FBQ3JELDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFDN0Msb0VBQTZDO0FBRTdDLHVEQUF5RDtBQUV6RCxzREFBZ0M7QUFFaEMsaURBQW1FO0FBRW5FLDJEQUFzRDtBQUN0RCxpREFBbUU7QUFDbkUsMkRBQTBEO0FBQzFELGdHQUEwRTtBQUMxRSx1REFBeUQ7QUFDekQsMEZBQW9FO0FBQ3BFLDRIQUFzRztBQUN0RyxvSEFBOEY7QUE2QzlGLDBFQUEwRTtBQUMxRSxRQUFRLENBQUMsY0FBYyxHQUFHLE1BQUEsTUFBQSxNQUFBLE1BQU0sQ0FBQyxHQUFHLDBDQUFFLFFBQVEsMENBQUUsY0FBYyxtQ0FBSSxFQUFFLENBQUM7QUFFckUsTUFBcUIsZUFBZ0IsU0FBUSxpQkFBUTtJQWtDakQsSUFBSSxLQUFLOztRQUNMLE9BQU8sQ0FDSCxNQUFBLE1BQUEsSUFBSSxDQUFDLE1BQU0sbUNBQ1gsSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLG1DQUNmLDhDQUFzQyxDQUFDLFFBQVEsRUFBRSxDQUNwRCxDQUFDO0lBQ04sQ0FBQztJQWlDRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxJQUFJOztRQUNKLE9BQU8sTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksbUNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakUsQ0FBQztJQW1CRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7WUFDckIsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUNBQ3JCLENBQUMsTUFBQSxRQUFRLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsR0FDcEMsS0FBSyxDQUNYLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQWdCOztRQUNuQyx1Q0FDTyxDQUFDLE1BQUEsUUFBUSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxDQUFDLEdBQ3BDLENBQUMsTUFBQSxRQUFRLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsRUFDOUM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDdEIsT0FBYSxJQUFJLENBQUMsUUFBUyxDQUFDLGNBQWMsQ0FBQztJQUMvQyxDQUFDO0lBTUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxJQUFpQixFQUNqQixRQUE0QztRQUU1QyxLQUFLLENBQ0QsSUFBQSxvQkFBVyxFQUNQLDBDQUFrQyxDQUFDLFFBQVEsRUFBRSxFQUM3QyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQ2pCLENBQ0osQ0FBQztRQWpJTjs7Ozs7Ozs7V0FRRztRQUNILFlBQU8sR0FHSCxpQkFBUyxDQUFDO1FBaUJkOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUVsQiwwQkFBcUIsR0FDakIsOENBQXNDLENBQUM7UUFnRTNDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBcVZ0QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQTlUZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixpREFBaUQ7UUFDakQsTUFBTSxxQkFBcUIsR0FBRyxJQUFBLHNCQUFnQixFQUFDLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDdEQsSUFBSSxFQUFFLEtBQUs7U0FDZCxDQUFDLENBQUM7UUFDSCxxQkFBcUI7YUFDaEIsRUFBRSxDQUFDLElBQUksRUFBRSxHQUFHLEVBQUU7WUFDWCxJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDLENBQUM7YUFDRCxFQUFFLENBQUMsS0FBSyxFQUFFLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxhQUFhLEdBQUcsS0FBSyxDQUFDO1FBQy9CLENBQUMsQ0FBQyxDQUFDO1FBRVAsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7WUFDakIsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1NBQ3JDO1FBRUQsYUFBYTtRQUNiLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDO1FBQ3JDLElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQUM7SUFDckMsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxDQUFDLEtBQVU7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVMsQ0FBQyxLQUFVLEVBQUUsUUFBdUM7UUFDekQsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUNmLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3RCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDekMsY0FBYyxDQUFDLFVBQVUsQ0FDNUIsRUFBRTtZQUNDLE1BQU0sU0FBUyxHQUFHLElBQUEsb0JBQVcsRUFBQyxJQUFJLENBQUMsRUFDL0IsUUFBUSxHQUFHLElBQUEsa0JBQVUsRUFBQyxJQUFJLENBQUMsRUFDM0IsU0FBUyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxDQUFDO1lBQ2pELElBQUksU0FBUyxLQUFLLElBQUksRUFBRTtnQkFDcEIsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQzNDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUM3QyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDSCxLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUNqQjtnQkFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2pDO2lCQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDdkMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQzthQUM5QztTQUNKO1FBRUQsVUFBVSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRTtnQkFDcEMsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLEdBQUc7b0JBQ0MsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsR0FBRyxDQUFDLEtBQUs7b0JBQ0wsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7d0JBQzVCLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsRUFBRTs0QkFDbkIsaUJBQVMsQ0FBQyxNQUFNLENBQUMsR0FBRyxFQUFFO2dDQUNsQixJQUNJLEtBQUssS0FBSyxLQUFLO29DQUNmLEtBQUssS0FBSyxTQUFTO29DQUNuQixLQUFLLEtBQUssSUFBSSxFQUNoQjtvQ0FDRSxLQUFLLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FDdEIsSUFBQSxrQkFBVSxFQUFDLElBQUksQ0FBQyxDQUNuQixDQUFDO2lDQUNMO3FDQUFNO29DQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUNuQixJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFDLEVBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDaEIsQ0FBQztpQ0FDTDs0QkFDTCxDQUFDLENBQUMsQ0FBQzt5QkFDTjtxQkFDSjtvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRDs7T0FFRztJQUNLLGlCQUFpQjs7UUFDckIsT0FBTyxDQUFBLE1BQUEsTUFBQSxRQUFRLENBQUMsR0FBRywwQ0FBRSxLQUFLLDBDQUFFLEtBQUssTUFBSyxTQUFTLENBQUM7SUFDcEQsQ0FBQztJQUVEOztPQUVHO0lBQ0ssaUJBQWlCOztRQUNyQixPQUFPLENBQUEsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsS0FBSyxNQUFLLFNBQVMsQ0FBQztJQUNwRCxDQUFDO0lBRUQ7O09BRUc7SUFDSyxxQkFBcUI7O1FBQ3pCLE9BQU8sQ0FBQSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxTQUFTLE1BQUssU0FBUyxDQUFDO0lBQ3hELENBQUM7SUFFRCxNQUFNO0lBQ04saUNBQWlDO0lBQ2pDLE1BQU07SUFDTix1QkFBdUI7SUFDdkIsK0JBQStCO0lBQy9CLG1DQUFtQztJQUNuQyxvRUFBb0U7SUFDcEUsaURBQWlEO0lBQ2pELFFBQVE7SUFDUixJQUFJO0lBRUo7Ozs7O09BS0c7SUFDSCxXQUFXLENBQ1AsS0FBVSxFQUNWLFFBQWlEO1FBRWpELE1BQU0sYUFBYSxtQkFDZixpQkFBaUIsRUFBRSxJQUFJLEVBQ3ZCLFVBQVUsRUFBRSxJQUFJLElBQ2IsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLGFBQWE7UUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsaUNBRVgsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQ3hELEtBQUssR0FFWixhQUFhLENBQ2hCLENBQUM7UUFFRix3QkFBd0I7UUFDeEIsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUNQLEtBQVUsRUFDVixRQUFpRDs7UUFFakQsTUFBTSxrQkFBa0IsaUNBQ3BCLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFDYixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLG1DQUFJLEVBQUUsQ0FBQyxHQUMzQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRTtZQUN4QyxVQUFVLEVBQUUsS0FBSztZQUNqQixHQUFHO2dCQUNDLE9BQU8sR0FBRyxFQUFFO29CQUNSLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQztZQUNOLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCwwQkFBMEI7UUFDMUIsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQ1gseUVBQXlFLENBQzVFLENBQUM7U0FDTDtRQUVELGlCQUFpQjtRQUNqQixJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNoQixNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO2FBQU07WUFDSCxNQUFNLEdBQUcsSUFBSSxpQkFBUSxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxFQUFFO2dCQUM1QyxFQUFFLEVBQUUsa0JBQWtCLENBQUMsRUFBRTtnQkFDekIsSUFBSSxFQUFFLGtCQUFrQixDQUFDLElBQUk7Z0JBQzdCLGVBQWUsRUFBRSxDQUFDLFFBQVEsQ0FBQzthQUM5QixDQUFDLENBQUM7U0FDTjtRQUVELE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUM7SUFFRDs7O09BR0c7SUFDSCxtQkFBbUIsQ0FBQyxLQUFVOztRQUMxQixJQUNJLENBQUMsSUFBSSxDQUFDLGlCQUFpQixFQUFFO1lBQ3pCLENBQUMsQ0FBQSxNQUFBLE1BQUEsTUFBQSxNQUFBLFFBQVEsQ0FBQyxHQUFHLDBDQUFFLEtBQUssMENBQUUsU0FBUywwQ0FBRSxHQUFHLG1EQUFHLGVBQWUsQ0FBQyxDQUFBLEVBQ3pEO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsK0JBQStCLEVBQUU7Z0JBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsK0JBQStCLEdBQUcsSUFBSSxDQUFDO2dCQUN4RCxPQUFPLENBQUMsSUFBSSxDQUNSLG9KQUFvSixDQUN2SixDQUFDO2FBQ0w7WUFDRCxPQUFPO1NBQ1Y7UUFFRCxxQ0FBcUM7UUFDckMsS0FBSyxDQUFDLFVBQVUsR0FBRyxJQUFBLG9CQUFXLEVBQzFCO1FBQ0ksc0NBQXNDO1NBQ3pDLEVBQ0QsTUFBQSxLQUFLLENBQUMsVUFBVSxtQ0FBSSxFQUFFLENBQ3pCLENBQUM7UUFFRixNQUFNLENBQUMsY0FBYyxDQUFDLEtBQUssRUFBRSx3QkFBd0IsRUFBRTtZQUNuRCxVQUFVLEVBQUUsS0FBSztZQUNqQixRQUFRLEVBQUUsSUFBSTtZQUNkLEtBQUssRUFBRSxFQUFFO1NBQ1osQ0FBQyxDQUFDO1FBRUgsZ0NBQWdDO1FBQ2hDLE1BQU0sWUFBWSxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQ3RELENBQUMsTUFBTSxFQUFFLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxLQUFLLFlBQVksQ0FDOUMsQ0FBQztRQUVGLElBQUksWUFBWSxDQUFDLE1BQU0sRUFBRTtZQUNyQixZQUFZLENBQUMsT0FBTyxDQUFDLENBQUMsV0FBVyxFQUFFLEVBQUU7Z0JBQ2pDLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxVQUFVLEVBQ2hDLGVBQWUsR0FBRyxFQUFFLENBQUM7Z0JBQ3pCLElBQUksS0FBSyxDQUFDO2dCQUVWLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O29CQUMvQixJQUFJLEtBQUssQ0FBQztvQkFDVixJQUFJLENBQUEsTUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLDBDQUFFLFNBQVMsTUFBSyxTQUFTLEVBQUU7d0JBQ3JDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsS0FBSyxFQUFFOzRCQUFFLEtBQUssR0FBRyxJQUFJLENBQUM7OzRCQUN6QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztxQkFDckM7b0JBQ0QsSUFBSSxDQUFDLEtBQUs7d0JBQUUsT0FBTztvQkFFbkIsTUFBTSxRQUFRLEdBQUcsTUFBQSxNQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsMENBQUUsSUFBSSxtQ0FBSSxHQUFHLENBQUM7b0JBQ3pDLElBQUksUUFBUSxLQUFLLE9BQU8sRUFBRTt3QkFDdEIsS0FBSyxHQUFHLEtBQUssQ0FBQztxQkFDakI7eUJBQU07d0JBQ0gsZUFBZSxDQUFDLElBQUEsb0JBQVcsRUFBQyxRQUFRLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztxQkFDbEQ7Z0JBQ0wsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsSUFBSSxLQUFLLEVBQUU7b0JBQ1AsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEVBQUU7d0JBQzFCLEtBQUssQ0FBQyxVQUFVLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFBRSxDQUFDO3FCQUNoQztvQkFDRCxLQUFLLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxHQUFHLGVBQWUsQ0FBQztpQkFDN0M7WUFDTCxDQUFDLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUMxQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFDM0I7WUFDRSxPQUFPO1NBQ1Y7UUFFRCxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLGdCQUFnQixDQUNuQixRQUFRLEVBQ1IsSUFBQSxxQkFBVSxFQUFDLEdBQUcsRUFBRSxHQUFHLEVBQUU7WUFDakIsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUNMLENBQUM7UUFFRixjQUFjO1FBQ2QsSUFBSSxDQUFDLHFCQUFxQixDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQ3RDLENBQUM7SUFFRCxxQkFBcUIsQ0FBQyxRQUFhLEVBQUU7O1FBQ2pDLElBQUksWUFBWSxHQUFHLEVBQUUsRUFDakIsUUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVsQixNQUFNLGFBQWEsR0FBRyxNQUFNLENBQUMsTUFBTSxDQUFDLEVBQUUsRUFBRSxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFMUQsTUFBTSxhQUFhLEdBQUcsSUFBSSxpQkFBUSxFQUFFLENBQUM7UUFFckMsNEJBQTRCO1FBQzVCLEtBQUssSUFBSSxDQUFDLEtBQUssRUFBRSxlQUFlLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsRUFBRTtZQUNuRSxtQkFBbUI7WUFDbkIsTUFBTSxPQUFPLEdBQUcscUJBQVksQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDLEVBQzdDLFNBQVMsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLGNBQWMsRUFBRSxFQUFFLENBQUMsQ0FBQztZQUVsRCxJQUFJLEtBQUssS0FBSyx3QkFBd0IsRUFBRTtnQkFDcEMsU0FBUzthQUNaO1lBRUQsU0FBUyxVQUFVO2dCQUNmLEtBQUssSUFBSSxDQUFDLEdBQUcsRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQyxFQUFFO29CQUN0RCxnQ0FBZ0M7b0JBQ2hDLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7b0JBQy9DLG1CQUFtQjtvQkFDbkIsS0FBSyxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztpQkFDdEI7WUFDTCxDQUFDO1lBRUQsSUFBSSxLQUFLLENBQUMsS0FBSyxDQUFDLGdCQUFnQixDQUFDLElBQUksT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFO2dCQUNqRCxJQUFJLFVBQVUsR0FBRyxJQUFJLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzQyxJQUFJLENBQUMsVUFBVSxFQUFFO29CQUNiLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLEdBQUcsYUFBYSxDQUFDLFVBQVUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUQsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO2dCQUNELElBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDakQsT0FBTyxFQUNkO29CQUNFLFVBQVUsRUFBRSxDQUFDO29CQUNiLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVCO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDbEMsVUFBVSxFQUFFLENBQUM7b0JBQ2IsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUI7YUFDSjtTQUNKO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3RCLGtEQUFrRDtZQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDbkMsTUFBQSxLQUFLLENBQUMsc0JBQXNCLG1DQUFJLEVBQUUsQ0FDckMsRUFBRTtnQkFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixPQUFPLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBRUQsOENBQThDO1FBQzlDLEtBQUssQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxjQUFjLENBQUMsSUFBdUIsRUFBRSxRQUFrQjtRQUN0RCxPQUFPLElBQUksT0FBTyxDQUFDLENBQU8sT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ3pDLHlDQUF5QztZQUN6QyxvRUFBb0U7WUFDcEUsNERBQTREO1lBQzVELHNDQUFzQztZQUN0QyxTQUFTO1lBQ1QsZ0NBQWdDO1lBQ2hDLHVCQUF1QjtZQUN2QixRQUFRO1lBQ1IsTUFBTTtZQUNOLCtCQUErQjtZQUMvQiwrREFBK0Q7WUFDL0QsSUFBSTs7WUFFSiwrQ0FBK0M7WUFDL0MsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxhQUFhLEVBQUU7Z0JBQ25ELE1BQU0sVUFBVSxHQUNaLE1BQUEsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLG1DQUM1QixRQUFRLENBQUMsYUFBYSxDQUFDLGFBQWEsQ0FBQyxDQUFDO2dCQUMxQyxJQUFJLFVBQVUsSUFBSSxDQUFDLElBQUEsa0JBQVksR0FBRSxFQUFFO29CQUMvQixPQUFPO2lCQUNWO2FBQ0o7WUFFRCxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDdEIsSUFBSSxHQUFHLENBQUMsSUFBSSxDQUFDLENBQUM7YUFDakI7WUFFRCxnQ0FBZ0M7WUFDaEMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsS0FBSyxTQUFTLEVBQUU7Z0JBQzlCLE1BQU0sSUFBQSxZQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxPQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxFQUFFLENBQUMsQ0FBQzthQUNwRDtZQUVELE9BQU87WUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsVUFBVSxDQUFDLEVBQUU7Z0JBQ3hELE1BQU0sSUFBQSxZQUFNLEVBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsQ0FBQzthQUNqQztpQkFBTTtnQkFDSCxNQUFNLElBQUEsaUJBQU0sR0FBRSxDQUFDO2FBQ2xCO1lBRUQsUUFBUSxhQUFSLFFBQVEsdUJBQVIsUUFBUSxDQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN0QixPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3ZCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsYUFBYSxDQUNULFNBQWlCLEVBQ2pCLFFBQW9EOztRQUVwRCxNQUFNLGFBQWEsbUJBQ2YsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLEVBQ2YsT0FBTyxFQUFFLElBQUksRUFDYixVQUFVLEVBQUUsSUFBSSxFQUNoQixNQUFNLEVBQUUsRUFBRSxJQUNQLENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7UUFFRixNQUFNLGFBQWEsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1FBRWhDLElBQUksTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxXQUFXLEVBQUU7WUFDekIsNEJBQTRCO1lBQzVCLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUM1QixJQUFJLFdBQVcsQ0FBQyxHQUFHLGFBQWEsSUFBSSxTQUFTLEVBQUUsRUFBRSxhQUFhLENBQUMsQ0FDbEUsQ0FBQztTQUNMO2FBQU07WUFDSCxhQUFhO1lBQ2IsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQzVCLElBQUksV0FBVyxDQUFDLFNBQVMsa0NBQ2xCLGFBQWEsS0FDaEIsTUFBTSxrQ0FDQyxhQUFhLENBQUMsTUFBTSxLQUN2QixjQUFjLEVBQUUsYUFBYSxPQUVuQyxDQUNMLENBQUM7U0FDTDtRQUVELGlCQUFpQjtRQUNqQixhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FDNUIsSUFBSSxXQUFXLENBQUMsYUFBYSxrQ0FDdEIsYUFBYSxLQUNoQixNQUFNLGtDQUNDLGFBQWEsQ0FBQyxNQUFNLEtBQ3ZCLFNBQVMsRUFBRSxTQUFTLE9BRTFCLENBQ0wsQ0FBQztJQUNOLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILHNCQUFzQixDQUNsQixXQUF3QixFQUN4QixRQUF1QztRQUV2QyxPQUFPLElBQUEsOEJBQXdCLEVBQUMsV0FBVyxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQzNELENBQUM7SUFjRCxZQUFZLENBQUMsTUFBNEI7O1FBQ3JDLElBQUksSUFBSSxDQUFDLGFBQWE7WUFBRSxPQUFPLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQzlCLEVBQUUsRUFDRixJQUFBLG9CQUFXO1FBQ1AsYUFBYTtRQUNiLDhDQUFzQyxDQUFDLFFBQVEsRUFBRSxFQUNqRCxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsWUFBWSxtQ0FBSSxFQUFFLEVBQ2hDLE1BQU0sSUFBSSxDQUFDLFdBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG1DQUFJLEVBQUUsRUFDaEQsTUFBTSxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLG1DQUFJLEVBQUUsRUFDdEQsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsUUFBUSxFQUFFLG1DQUFJLEVBQUUsQ0FDM0IsQ0FDSixDQUFDO1FBRUYsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFjRCxjQUFjLENBQUMsTUFBNEI7O1FBQ3ZDLElBQUksSUFBSSxDQUFDLGVBQWU7WUFBRSxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7UUFDdEQsTUFBTSxjQUFlLFNBQVEscUJBQVk7U0FBRztRQUM1QyxjQUFjLENBQUMsVUFBVSxHQUFHLElBQUEsb0JBQVcsRUFDbkMsTUFBQSw4Q0FBc0MsQ0FBQyxVQUFVLG1DQUFJLEVBQUUsRUFDdkQsTUFBQSxNQUFNLGFBQU4sTUFBTSx1QkFBTixNQUFNLENBQUUsVUFBVSxtQ0FBSSxFQUFFLENBQzNCLENBQUM7UUFDRixJQUFJLENBQUMsZUFBZSxHQUFHLGNBQWMsQ0FBQztRQUN0QyxPQUFPLElBQUksQ0FBQyxlQUFlLENBQUM7SUFDaEMsQ0FBQztJQUdELFdBQVcsQ0FBQyxHQUFHLEVBQUUsRUFBRSxHQUFHLElBQUksQ0FBQyxPQUFPO1FBQzlCLGFBQWE7UUFDYixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUM7WUFBRSxPQUFPO1FBQ2hFLGFBQWE7UUFDYixJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsSUFBQSxxQkFBYSxFQUFDLEdBQUcsRUFBRTtZQUNmLEVBQUU7U0FDTCxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTLENBQUMsTUFBVyxFQUFFLE1BQVcsSUFBSSxDQUFDLElBQUk7UUFDdkMsVUFBVSxDQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7WUFDcEIsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxTQUFTLEVBQUUsRUFBRTtnQkFDdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDMUMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsR0FBRyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUU7UUFDcEIsSUFBSSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRW5CLElBQUksR0FBRyxLQUFLLElBQUksRUFBRTtZQUNkLFNBQVMsR0FBRyxHQUFHO2lCQUNWLEtBQUssQ0FBQyxHQUFHLENBQUM7aUJBQ1YsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7O2dCQUNiLElBQUksS0FBSyxHQUFhLEVBQUUsQ0FBQztnQkFDekIsNkNBQTZDO2dCQUM3QyxJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsc0JBQXNCLEVBQUU7b0JBQ3RDLEtBQUssQ0FBQyxJQUFJLENBQ04sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxhQUFhLENBQUM7d0JBQ3BDLENBQUMsQ0FBQyxHQUFHO3dCQUNMLENBQUMsQ0FBQyxFQUNWLEdBQUcsT0FBTyxFQUFFLENBQ2YsQ0FBQztpQkFDTDtnQkFDRCwrQ0FBK0M7Z0JBQy9DLElBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO29CQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFDeEQ7b0JBQ0UsS0FBSyxDQUFDLElBQUksQ0FDTixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQzt3QkFDcEMsQ0FBQyxDQUFDLEdBQUc7d0JBQ0wsQ0FBQyxDQUFDLEVBQ1YsR0FBRyxPQUFPLEVBQUUsQ0FDZixDQUFDO2lCQUNMO2dCQUNELHdCQUF3QjtnQkFDeEIsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLENBQUMsQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLElBQUksQ0FBQyxDQUFDLENBQUM7Z0JBRWpELFdBQVc7Z0JBQ1gsSUFBSSxNQUFBLE1BQUEsUUFBUSxDQUFDLEdBQUcsMENBQUUsS0FBSywwQ0FBRSxRQUFRLEVBQUU7b0JBQy9CLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O3dCQUN0QixPQUFPLE1BQUEsUUFBUSxDQUFDLEdBQUcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxHQUFHLENBQUM7b0JBQ25ELENBQUMsQ0FBQyxDQUFDO2lCQUNOO2dCQUVELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztZQUMzQixDQUFDLENBQUM7aUJBQ0QsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1NBQ2xCO1FBRUQsSUFBSSxLQUFLLEVBQUU7WUFDUCxTQUFTLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUM1QjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILElBQUksQ0FBQyxHQUFHLEdBQUcsRUFBRSxFQUFFLEtBQUssR0FBRyxFQUFFO1FBQ3JCLElBQUksU0FBUyxHQUFHLEdBQUc7YUFDZCxLQUFLLENBQUMsR0FBRyxDQUFDO2FBQ1YsR0FBRyxDQUFDLENBQUMsT0FBTyxFQUFFLEVBQUU7WUFDYixNQUFNLEtBQUssR0FBYSxFQUFFLENBQUM7WUFDM0IsK0NBQStDO1lBQy9DLElBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFDeEQ7Z0JBQ0UsS0FBSyxDQUFDLElBQUksQ0FDTixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFNBQVMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQ2pELEdBQUcsT0FBTyxFQUFFLENBQ2YsQ0FBQzthQUNMO2lCQUFNO2dCQUNILEtBQUssQ0FBQyxJQUFJLENBQ04sR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsR0FDOUIsT0FBTyxJQUFJLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUNqRCxHQUFHLE9BQU8sRUFBRSxDQUNmLENBQUM7YUFDTDtZQUNELE9BQU8sS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMzQixDQUFDLENBQUM7YUFDRCxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFZCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7O1FBQ0wsT0FBTyxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7SUFFRDs7Ozs7Ozs7T0FRRztJQUNILFFBQVE7UUFDSixJQUNJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7WUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLEtBQUssU0FBUztZQUM1QixJQUFJLENBQUMsaUJBQWlCLEVBQUU7WUFDeEIsaUJBQVEsQ0FBQyxRQUFRLENBQUMsR0FBRyxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsRUFDOUM7WUFDRSxPQUFPLEtBQUssQ0FBQztTQUNoQjtRQUNELElBQ0ksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQztZQUM1QyxDQUFDLElBQUksQ0FBQyxhQUFhLEVBQ3JCO1lBQ0UsT0FBTyxLQUFLLENBQUM7U0FDaEI7UUFDRCxPQUFPLElBQUksQ0FBQztJQUNoQixDQUFDOztBQWg4Qkwsa0NBaThCQztBQXg3Qkc7Ozs7Ozs7OztHQVNHO0FBQ0ksdUJBQU8sR0FHVixpQkFBUyxDQUFDO0FBb0JkOzs7R0FHRztBQUNJLCtDQUErQixHQUFHLEtBQUssQ0FBQztBQWt0QnhDLCtCQUFlLEdBQWEsRUFBRSxDQUFDIn0=