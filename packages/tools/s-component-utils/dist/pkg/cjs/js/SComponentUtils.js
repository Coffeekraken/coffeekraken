"use strict";
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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_front_1 = __importDefault(require("@coffeekraken/s-front"));
const s_frontspec_1 = __importDefault(require("@coffeekraken/s-frontspec"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_state_1 = __importDefault(require("@coffeekraken/s-state"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const string_1 = require("@coffeekraken/sugar/string");
const fastdom_1 = __importDefault(require("fastdom"));
const dom_1 = require("@coffeekraken/sugar/dom");
const dom_2 = require("@coffeekraken/sugar/dom");
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
        const whenInViewportPromise = (0, dom_2.__whenInViewport)(this.node, {
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
            console.warn(`<red>[SComponentUtils]</red> To use responsive props on components and features, you MUST call the SFront.init() method in your main entry file...`);
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
            if (!Array.isArray(when)) {
                when = [when];
            }
            // handle lod (level of details)
            if (this.props.lod !== undefined) {
                yield (0, dom_2.__when)(this.node, `lod:${this.props.lod}`);
            }
            // wait
            yield (0, dom_2.__when)(this.node, when);
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
        return (0, dom_1.__adoptStyleInShadowRoot)($shadowRoot, $context);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsZ0VBQWdFOzs7Ozs7Ozs7Ozs7OztBQUVoRSxvRUFBNkM7QUFDN0Msb0VBQTZDO0FBQzdDLDRFQUFxRDtBQUNyRCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBQzdDLG9FQUE2QztBQUU3Qyx1REFBeUQ7QUFFekQsc0RBQWdDO0FBRWhDLGlEQUFtRTtBQUVuRSxpREFBbUU7QUFDbkUsMkRBQTBEO0FBQzFELGdHQUEwRTtBQUMxRSx1REFBeUQ7QUFDekQsMEZBQW9FO0FBQ3BFLDRIQUFzRztBQUN0RyxvSEFBOEY7QUE2QzlGLE1BQXFCLGVBQWdCLFNBQVEsaUJBQVE7SUEwQmpELElBQUksS0FBSzs7UUFDTCxPQUFPLENBQ0gsTUFBQSxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxtQ0FDZiw4Q0FBc0MsQ0FBQyxRQUFRLEVBQUUsQ0FDcEQsQ0FBQztJQUNOLENBQUM7SUEyQkQ7Ozs7Ozs7Ozs7T0FVRztJQUNILElBQUksSUFBSTs7UUFDSixPQUFPLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJLG1DQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUFDO0lBQ2pFLENBQUM7SUFvQ0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUEyQixFQUFFLEtBQVU7UUFDMUQsUUFBUSxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUMsQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMzRCxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O1lBQ3JCLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG1DQUNoQixDQUFDLE1BQUEsSUFBSSxDQUFDLGFB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