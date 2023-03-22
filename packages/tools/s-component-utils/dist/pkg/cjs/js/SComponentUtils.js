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
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
// @ts-nocheck
// @TODO            check how to override private static methods
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_state_1 = __importDefault(require("@coffeekraken/s-state"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const string_1 = require("@coffeekraken/sugar/string");
const fastdom_1 = __importDefault(require("fastdom"));
const dom_2 = require("@coffeekraken/sugar/dom");
const dom_3 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
const injectStyle_1 = __importDefault(require("@coffeekraken/sugar/js/dom/inject/injectStyle"));
const object_1 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const SComponentUtilsDefaultPropsInterface_1 = __importDefault(require("./interface/SComponentUtilsDefaultPropsInterface"));
const SComponentUtilsSettingsInterface_1 = __importDefault(require("./interface/SComponentUtilsSettingsInterface"));
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
            const camelProp = (0, string_1.__camelCase)(prop), dashProp = (0, dashCase_1.default)(prop);
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
                exclude: ['status'],
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
                    this._mediaQueries[media] = s_theme_1.default.buildMediaQuery(media);
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
     * @param         {String}        cls         The class you want to process. Can be multiple classes separated by a space
     * @return        {String}                    The generated class that you can apply
     *
     * @since         2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    cls(cls = '', style = '') {
        let clsString = cls
            .split(' ')
            .map((clsName) => {
            var _a, _b;
            let clses = [];
            // class from the component tagname if wanted
            if (this.settings.useTagNameForClassName) {
                clses.push(`${this.node.tagName.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`);
            }
            // class from the passed "name" in the settings
            if (this.settings.name &&
                this.node.tagName.toLowerCase() !== this.settings.name) {
                clses.push(`${this.settings.name.toLowerCase()}${clsName && !clsName.match(/^(_{1,2}|-)/) ? '-' : ''}${clsName}`);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsaURBQXVEO0FBQ3ZELGNBQWM7QUFDZCxnRUFBZ0U7QUFFaEUsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUM3Qyw0RUFBcUQ7QUFDckQsNEVBQXFEO0FBQ3JELG9FQUE2QztBQUM3QyxvRUFBNkM7QUFFN0MsdURBQXlEO0FBRXpELHNEQUFnQztBQUVoQyxpREFBbUU7QUFFbkUsaURBQW1FO0FBQ25FLDJEQUEwRDtBQUMxRCxnR0FBMEU7QUFDMUUsdURBQXlEO0FBQ3pELDBGQUFvRTtBQUNwRSw0SEFBc0c7QUFDdEcsb0hBQThGO0FBNkM5RixNQUFxQixlQUFnQixTQUFRLGlCQUFRO0lBa0NqRCxJQUFJLEtBQUs7O1FBQ0wsT0FBTyxDQUNILE1BQUEsTUFBQSxJQUFJLENBQUMsTUFBTSxtQ0FDWCxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssbUNBQ2YsOENBQXNDLENBQUMsUUFBUSxFQUFFLENBQ3BELENBQUM7SUFDTixDQUFDO0lBaUNEOzs7Ozs7Ozs7O09BVUc7SUFDSCxJQUFJLElBQUk7O1FBQ0osT0FBTyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxtQ0FBSSxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQztJQUNqRSxDQUFDO0lBb0NELE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBMkIsRUFBRSxLQUFVO1FBQzFELFFBQVEsR0FBRyxLQUFLLENBQUMsT0FBTyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDM0QsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFOztZQUNyQixJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQ0FDaEIsQ0FBQyxNQUFB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