"use strict";
// @ts-nocheck
// @TODO            check how to override private static methods
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_conductor_1 = __importDefault(require("@coffeekraken/s-conductor"));
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_state_1 = __importDefault(require("@coffeekraken/s-state"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const adoptStyleInShadowRoot_1 = __importDefault(require("@coffeekraken/sugar/js/dom/css/adoptStyleInShadowRoot"));
const injectStyle_1 = __importDefault(require("@coffeekraken/sugar/js/dom/css/injectStyle"));
const inViewportStatusChange_1 = __importDefault(require("@coffeekraken/sugar/js/dom/detect/inViewportStatusChange"));
const debounce_1 = __importDefault(require("@coffeekraken/sugar/shared/function/debounce"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const camelCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/camelCase"));
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const SComponentUtilsDefaultPropsInterface_1 = __importDefault(require("./interface/SComponentUtilsDefaultPropsInterface"));
const SComponentUtilsSettingsInterface_1 = __importDefault(require("./interface/SComponentUtilsSettingsInterface"));
class SComponentUtils extends s_class_1.default {
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
        super((0, deepMerge_1.default)(SComponentUtilsSettingsInterface_1.default.defaults(), settings !== null && settings !== void 0 ? settings : {}));
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
            const camelProp = (0, camelCase_1.default)(prop), dashProp = (0, dashCase_1.default)(prop);
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
                                _this.node.removeAttribute((0, dashCase_1.default)(prop));
                            }
                            else {
                                _this.node.setAttribute((0, dashCase_1.default)(prop), String(value));
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
            _state = new s_state_1.default(state, {
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
        props.responsive = (0, deepMerge_1.default)({
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
        window.addEventListener('resize', (0, debounce_1.default)(() => {
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
            const queries = s_theme_1.default.get(`media.queries`), nudeMedia = media.replace(/(<|>|=|\|)/gm, '');
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
    get inViewportStatusChange() {
        if (this._inViewportStatusChangePromise)
            return this._inViewportStatusChangePromise;
        this._inViewportStatusChangePromise = (0, inViewportStatusChange_1.default)(this.node);
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
        return s_conductor_1.default.when(this.node, when, callback);
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
        return (0, adoptStyleInShadowRoot_1.default)($shadowRoot, $context);
    }
    defaultProps(interf) {
        var _a, _b, _c, _d;
        if (this._defaultProps)
            return Object.assign({}, this._defaultProps);
        this._defaultProps = Object.assign({}, (0, deepMerge_1.default)(
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
        PropsInterface.definition = (0, deepMerge_1.default)((_a = SComponentUtilsDefaultPropsInterface_1.default.definition) !== null && _a !== void 0 ? _a : {}, (_b = interf === null || interf === void 0 ? void 0 : interf.definition) !== null && _b !== void 0 ? _b : {});
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
exports.default = SComponentUtils;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsZ0VBQWdFOzs7OztBQUVoRSxvRUFBNkM7QUFDN0MsNEVBQXFEO0FBQ3JELDRFQUFxRDtBQUVyRCxvRUFBNkM7QUFDN0Msb0VBQTZDO0FBQzdDLG1IQUE2RjtBQUM3Riw2RkFBdUU7QUFDdkUsc0hBQWdHO0FBQ2hHLDRGQUFzRTtBQUN0RSw0RkFBc0U7QUFDdEUsNEZBQXNFO0FBQ3RFLDBGQUFvRTtBQUNwRSw0SEFBc0c7QUFDdEcsb0hBQThGO0FBcUM5RixNQUFxQixlQUFnQixTQUFRLGlCQUFRO0lBK0hqRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNJLElBQWlCLEVBQ2pCLFFBQTRDO1FBRTVDLEtBQUssQ0FDRCxJQUFBLG1CQUFXLEVBQ1AsMENBQWtDLENBQUMsUUFBUSxFQUFFLEVBQzdDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FDakIsQ0FDSixDQUFDO1FBckdOOzs7Ozs7Ozs7OztXQVdHO1FBQ0gsVUFBSyxHQUFHLFNBQVMsQ0FBQztRQUVsQiwwQkFBcUIsR0FDakIsOENBQXNDLENBQUM7UUFpRTNDLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBb1N0QixrQkFBYSxHQUFHLEVBQUUsQ0FBQztRQTdRZixJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixnQ0FBZ0M7UUFDaEMsSUFBSSxDQUFDLHNCQUFzQjthQUN0QixFQUFFLENBQUMsT0FBTyxFQUFFLEdBQUcsRUFBRTtZQUNkLElBQUksQ0FBQyxhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxPQUFPLEVBQUUsR0FBRyxFQUFFO1lBQ2QsSUFBSSxDQUFDLGFBQWEsR0FBRyxLQUFLLENBQUM7UUFDL0IsQ0FBQyxDQUFDLENBQUM7UUFFUCxhQUFhO1FBQ2IsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLENBQUM7UUFDckMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FBQztJQUNyQyxDQUFDO0lBdkpELElBQUksS0FBSzs7UUFDTCxPQUFPLENBQ0gsTUFBQSxNQUFBLElBQUksQ0FBQyxNQUFNLG1DQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxtQ0FDZiw4Q0FBc0MsQ0FBQyxRQUFRLEVBQUUsQ0FDcEQsQ0FBQztJQUNOLENBQUM7SUFhRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsSUFBSSxJQUFJOztRQUNKLE9BQU8sTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksbUNBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLENBQUM7SUFDakUsQ0FBQztJQW9DRCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCxRQUFRLEdBQUcsS0FBSyxDQUFDLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLFFBQVEsQ0FBQyxDQUFDO1FBQzNELFFBQVEsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7WUFDckIsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQ2hCLENBQUMsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsR0FDL0IsS0FBSyxDQUNYLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7O09BWUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQWdCOztRQUNuQyx1Q0FDTyxDQUFDLE1BQUEsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxDQUFDLEdBQy9CLENBQUMsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsRUFDekM7SUFDTixDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxzQkFBc0I7UUFDdEIsT0FBYSxJQUFJLENBQUMsUUFBUyxDQUFDLGNBQWMsQ0FBQztJQUMvQyxDQUFDO0lBMkNEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsUUFBUSxDQUFDLEtBQVU7UUFDZixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztJQUN4QixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVMsQ0FBQyxLQUFVLEVBQUUsUUFBdUM7UUFDekQsSUFBSSxVQUFVLEdBQUcsRUFBRSxFQUNmLGNBQWMsR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLFFBQVEsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU3RCxLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsVUFBVSxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDekMsY0FBYyxDQUFDLFVBQVUsQ0FDNUIsRUFBRTtZQUNDLE1BQU0sU0FBUyxHQUFHLElBQUEsbUJBQVcsRUFBQyxJQUFJLENBQUMsRUFDL0IsUUFBUSxHQUFHLElBQUEsa0JBQVUsRUFBQyxJQUFJLENBQUMsQ0FBQztZQUNoQyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsQ0FBQyxLQUFLLElBQUksRUFBRTtnQkFDM0MsSUFBSSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLENBQUMsUUFBUSxDQUFDLEVBQzNDLEtBQUssR0FBRyxRQUFRLENBQUM7Z0JBQ3JCLElBQUksUUFBUSxLQUFLLElBQUksSUFBSSxRQUFRLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFO29CQUM3QyxLQUFLLEdBQUcsSUFBSSxDQUFDO2lCQUNoQjtxQkFBTTtvQkFDSCxLQUFLLEdBQUcsS0FBSyxDQUFDO2lCQUNqQjtnQkFDRCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO2FBQ2pDO2lCQUFNLElBQUksS0FBSyxDQUFDLFNBQVMsQ0FBQyxLQUFLLFNBQVMsRUFBRTtnQkFDdkMsVUFBVSxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQyxTQUFTLENBQUMsQ0FBQzthQUM1QztpQkFBTTtnQkFDSCxVQUFVLENBQUMsU0FBUyxDQUFDLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQzthQUM5QztTQUNKO1FBRUQsVUFBVSxHQUFHLGNBQWMsQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDOUMsTUFBTSxLQUFLLEdBQUcsSUFBSSxDQUFDO1FBRW5CLE1BQU0sTUFBTSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1FBQzdDLEtBQUssSUFBSSxDQUFDLElBQUksRUFBRSxLQUFLLENBQUMsSUFBSSxNQUFNLENBQUMsT0FBTyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ2xELE1BQU0sQ0FBQyxjQUFjLENBQUMsVUFBVSxFQUFFLElBQUksRUFBRTtnQkFDcEMsVUFBVSxFQUFFLElBQUk7Z0JBQ2hCLEdBQUc7b0JBQ0MsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ3hCLENBQUM7Z0JBQ0QsR0FBRyxDQUFDLEtBQUs7b0JBQ0wsSUFBSSxRQUFRLENBQUMsaUJBQWlCLEVBQUU7d0JBQzVCLE1BQU0sT0FBTyxHQUFHLGNBQWMsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2hELElBQUksT0FBTyxhQUFQLE9BQU8sdUJBQVAsT0FBTyxDQUFFLFFBQVEsRUFBRTs0QkFDbkIsSUFDSSxLQUFLLEtBQUssS0FBSztnQ0FDZixLQUFLLEtBQUssU0FBUztnQ0FDbkIsS0FBSyxLQUFLLElBQUksRUFDaEI7Z0NBQ0UsS0FBSyxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBQSxrQkFBVSxFQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7NkJBQ2hEO2lDQUFNO2dDQUNILEtBQUssQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUNuQixJQUFBLGtCQUFVLEVBQUMsSUFBSSxDQUFDLEVBQ2hCLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FDaEIsQ0FBQzs2QkFDTDt5QkFDSjtxQkFDSjtvQkFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUN6QixDQUFDO2FBQ0osQ0FBQyxDQUFDO1lBQ0gsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztTQUM1QjtRQUVELE9BQU8sVUFBVSxDQUFDO0lBQ3RCLENBQUM7SUFFRCxNQUFNO0lBQ04saUNBQWlDO0lBQ2pDLE1BQU07SUFDTix1QkFBdUI7SUFDdkIsK0JBQStCO0lBQy9CLG1DQUFtQztJQUNuQyxvRUFBb0U7SUFDcEUsaURBQWlEO0lBQ2pELFFBQVE7SUFDUixJQUFJO0lBRUo7Ozs7O09BS0c7SUFDSCxXQUFXLENBQ1AsS0FBVSxFQUNWLFFBQWlEO1FBRWpELE1BQU0sYUFBYSxtQkFDZixpQkFBaUIsRUFBRSxJQUFJLEVBQ3ZCLFVBQVUsRUFBRSxLQUFLLElBQ2QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLGFBQWE7UUFDYixLQUFLLEdBQUcsSUFBSSxDQUFDLFNBQVMsaUNBRVgsZUFBZSxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDLEdBQ3hELEtBQUssR0FFWixhQUFhLENBQ2hCLENBQUM7UUFFRix3QkFBd0I7UUFDeEIsSUFBSSxhQUFhLENBQUMsVUFBVSxFQUFFO1lBQzFCLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUNuQztRQUVELDZCQUE2QjtRQUM3QixJQUFJLENBQUMsTUFBTSxHQUFHLEtBQUssQ0FBQztRQUVwQixPQUFPLEtBQUssQ0FBQztJQUNqQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsV0FBVyxDQUNQLEtBQVUsRUFDVixRQUFpRDs7UUFFakQsTUFBTSxrQkFBa0IsaUNBQ3BCLEVBQUUsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLEVBQUUsSUFDYixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLG1DQUFJLEVBQUUsQ0FBQyxHQUMzQixDQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsSUFBSSxXQUFXLEdBQUcsS0FBSyxDQUFDO1FBQ3hCLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLGFBQWEsRUFBRTtZQUN4QyxVQUFVLEVBQUUsS0FBSztZQUNqQixHQUFHO2dCQUNDLE9BQU8sR0FBRyxFQUFFO29CQUNSLFdBQVcsR0FBRyxJQUFJLENBQUM7Z0JBQ3ZCLENBQUMsQ0FBQztZQUNOLENBQUM7U0FDSixDQUFDLENBQUM7UUFFSCwwQkFBMEI7UUFDMUIsSUFBSSxrQkFBa0IsQ0FBQyxJQUFJLElBQUksQ0FBQyxrQkFBa0IsQ0FBQyxFQUFFLEVBQUU7WUFDbkQsT0FBTyxDQUFDLEdBQUcsQ0FBQyxhQUFhLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3RDLE1BQU0sSUFBSSxLQUFLLENBQ1gsdURBQXVELENBQzFELENBQUM7U0FDTDtRQUVELGlCQUFpQjtRQUNqQixJQUFJLE1BQU0sQ0FBQztRQUNYLElBQUksS0FBSyxDQUFDLFFBQVEsRUFBRTtZQUNoQixNQUFNLEdBQUcsS0FBSyxDQUFDO1NBQ2xCO2FBQU07WUFDSCxNQUFNLEdBQUcsSUFBSSxpQkFBUSxDQUFDLEtBQUssRUFBRTtnQkFDekIsRUFBRSxFQUFFLGtCQUFrQixDQUFDLEVBQUU7Z0JBQ3pCLElBQUksRUFBRSxrQkFBa0IsQ0FBQyxJQUFJO2FBQ2hDLENBQUMsQ0FBQztTQUNOO1FBRUQsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQztJQUVEOzs7T0FHRztJQUNILG1CQUFtQixDQUFDLEtBQVU7O1FBQzFCLHFDQUFxQztRQUNyQyxLQUFLLENBQUMsVUFBVSxHQUFHLElBQUEsbUJBQVcsRUFDMUI7UUFDSSxzQ0FBc0M7U0FDekMsRUFDRCxNQUFBLEtBQUssQ0FBQyxVQUFVLG1DQUFJLEVBQUUsQ0FDekIsQ0FBQztRQUVGLE1BQU0sQ0FBQyxjQUFjLENBQUMsS0FBSyxFQUFFLHdCQUF3QixFQUFFO1lBQ25ELFVBQVUsRUFBRSxLQUFLO1lBQ2pCLFFBQVEsRUFBRSxJQUFJO1lBQ2QsS0FBSyxFQUFFLEVBQUU7U0FDWixDQUFDLENBQUM7UUFFSCxnQ0FBZ0M7UUFDaEMsOERBQThEO1FBQzlELG1EQUFtRDtRQUNuRCxLQUFLO1FBQ0wsNkJBQTZCO1FBQzdCLDhDQUE4QztRQUM5QyxnREFBZ0Q7UUFDaEQsb0NBQW9DO1FBQ3BDLHFCQUFxQjtRQUVyQixnREFBZ0Q7UUFDaEQseUJBQXlCO1FBQ3pCLHlEQUF5RDtRQUN6RCxpRUFBaUU7UUFDakUscURBQXFEO1FBQ3JELGdCQUFnQjtRQUNoQixrQ0FBa0M7UUFFbEMsd0RBQXdEO1FBQ3hELDBDQUEwQztRQUMxQyxpQ0FBaUM7UUFDakMsdUJBQXVCO1FBQ3ZCLHFEQUFxRDtRQUNyRCxnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLHVCQUF1QjtRQUN2Qiw4Q0FBOEM7UUFDOUMsZ0RBQWdEO1FBQ2hELGdCQUFnQjtRQUNoQix5REFBeUQ7UUFDekQsWUFBWTtRQUNaLFVBQVU7UUFDVixJQUFJO1FBRUosSUFDSSxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQyxNQUFNLEtBQUssQ0FBQztZQUMxQyxLQUFLLENBQUMsVUFBVSxDQUFDLFFBQVEsRUFDM0I7WUFDRSxPQUFPO1NBQ1Y7UUFFRCxrQkFBa0I7UUFDbEIsTUFBTSxDQUFDLGdCQUFnQixDQUNuQixRQUFRLEVBQ1IsSUFBQSxrQkFBVSxFQUFDLEdBQUcsRUFBRTtZQUNaLElBQUksQ0FBQyxxQkFBcUIsQ0FBQyxLQUFLLENBQUMsQ0FBQztRQUN0QyxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQ1YsQ0FBQztRQUVGLGNBQWM7UUFDZCxJQUFJLENBQUMscUJBQXFCLENBQUMsS0FBSyxDQUFDLENBQUM7SUFDdEMsQ0FBQztJQUVELHFCQUFxQixDQUFDLFFBQWEsRUFBRTs7UUFDakMsSUFBSSxZQUFZLEdBQUcsRUFBRSxFQUNqQixRQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWxCLE1BQU0sYUFBYSxHQUFHLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQztRQUUxRCw0QkFBNEI7UUFDNUIsS0FBSyxJQUFJLENBQUMsS0FBSyxFQUFFLGVBQWUsQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxFQUFFO1lBQ25FLG1CQUFtQjtZQUNuQixNQUFNLE9BQU8sR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxlQUFlLENBQUMsRUFDekMsU0FBUyxHQUFHLEtBQUssQ0FBQyxPQUFPLENBQUMsY0FBYyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1lBRWxELElBQUksS0FBSyxLQUFLLHdCQUF3QixFQUFFO2dCQUNwQyxTQUFTO2FBQ1o7WUFFRCxTQUFTLFVBQVU7Z0JBQ2YsS0FBSyxJQUFJLENBQUMsR0FBRyxFQUFFLEtBQUssQ0FBQyxJQUFJLE1BQU0sQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDLEVBQUU7b0JBQ3RELGdDQUFnQztvQkFDaEMsS0FBSyxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQztvQkFDL0MsbUJBQW1CO29CQUNuQixLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2lCQUN0QjtZQUNMLENBQUM7WUFFRCxJQUFJLEtBQUssQ0FBQyxLQUFLLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxPQUFPLENBQUMsS0FBSyxDQUFDLEVBQUU7Z0JBQ2pELElBQUksVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNDLElBQUksQ0FBQyxVQUFVLEVBQUU7b0JBQ2IsSUFBSSxDQUFDLGFBQWEsQ0FBQyxLQUFLLENBQUMsR0FBRyxpQkFBUSxDQUFDLGVBQWUsQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDNUQsVUFBVSxHQUFHLElBQUksQ0FBQyxhQUFhLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzFDO2dCQUNELElBQ0ksTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFLENBQUMsQ0FBQztxQkFDakQsT0FBTyxFQUNkO29CQUNFLFVBQVUsRUFBRSxDQUFDO29CQUNiLFlBQVksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7aUJBQzVCO2FBQ0o7aUJBQU07Z0JBQ0gsSUFBSSxNQUFNLENBQUMsVUFBVSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sRUFBRTtvQkFDbEMsVUFBVSxFQUFFLENBQUM7b0JBQ2IsWUFBWSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQztpQkFDNUI7YUFDSjtTQUNKO1FBRUQsd0JBQXdCO1FBQ3hCLElBQUksQ0FBQyxZQUFZLENBQUMsTUFBTSxFQUFFO1lBQ3RCLGtEQUFrRDtZQUNsRCxLQUFLLElBQUksQ0FBQyxHQUFHLEVBQUUsS0FBSyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FDbkMsTUFBQSxLQUFLLENBQUMsc0JBQXNCLG1DQUFJLEVBQUUsQ0FDckMsRUFBRTtnQkFDQyxLQUFLLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO2dCQUNuQixPQUFPLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQzthQUM1QztTQUNKO1FBRUQsOENBQThDO1FBQzlDLEtBQUssQ0FBQyxVQUFVLEdBQUcsYUFBYSxDQUFDO0lBQ3JDLENBQUM7SUFnQkQsSUFBSSxzQkFBc0I7UUFDdEIsSUFBSSxJQUFJLENBQUMsOEJBQThCO1lBQ25DLE9BQU8sSUFBSSxDQUFDLDhCQUE4QixDQUFDO1FBQy9DLElBQUksQ0FBQyw4QkFBOEIsR0FBRyxJQUFBLGdDQUF3QixFQUMxRCxJQUFJLENBQUMsSUFBSSxDQUNaLENBQUM7UUFDRixPQUFPLElBQUksQ0FBQyw4QkFBOEIsQ0FBQztJQUMvQyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsY0FBYyxDQUFDLElBQVksRUFBRSxRQUFrQjtRQUMzQyxPQUFPLHFCQUFZLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsSUFBSSxFQUFFLFFBQVEsQ0FBQyxDQUFDO0lBQ3hELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxhQUFhLENBQ1QsU0FBaUIsRUFDakIsUUFBb0Q7O1FBRXBELE1BQU0sYUFBYSxtQkFDZixJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksRUFDZixPQUFPLEVBQUUsSUFBSSxFQUNiLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLE1BQU0sRUFBRSxFQUFFLElBQ1AsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztRQUVGLE1BQU0sYUFBYSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUM7UUFFaEMsSUFBSSxNQUFBLElBQUksQ0FBQyxLQUFLLDBDQUFFLFdBQVcsRUFBRTtZQUN6Qiw0QkFBNEI7WUFDNUIsYUFBYSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQzVCLElBQUksV0FBVyxDQUFDLEdBQUcsYUFBYSxJQUFJLFNBQVMsRUFBRSxFQUFFLGFBQWEsQ0FBQyxDQUNsRSxDQUFDO1NBQ0w7YUFBTTtZQUNILGFBQWE7WUFDYixhQUFhLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FDNUIsSUFBSSxXQUFXLENBQUMsU0FBUyxrQ0FDbEIsYUFBYSxLQUNoQixNQUFNLGtDQUNDLGFBQWEsQ0FBQyxNQUFNLEtBQ3ZCLGNBQWMsRUFBRSxhQUFhLE9BRW5DLENBQ0wsQ0FBQztTQUNMO1FBRUQsaUJBQWlCO1FBQ2pCLGFBQWEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUM1QixJQUFJLFdBQVcsQ0FBQyxhQUFhLGtDQUN0QixhQUFhLEtBQ2hCLE1BQU0sa0NBQ0MsYUFBYSxDQUFDLE1BQU0sS0FDdkIsU0FBUyxFQUFFLFNBQVMsT0FFMUIsQ0FDTCxDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsc0JBQXNCLENBQ2xCLFdBQXdCLEVBQ3hCLFFBQXVDO1FBRXZDLE9BQU8sSUFBQSxnQ0FBd0IsRUFBQyxXQUFXLEVBQUUsUUFBUSxDQUFDLENBQUM7SUFDM0QsQ0FBQztJQWNELFlBQVksQ0FBQyxNQUE0Qjs7UUFDckMsSUFBSSxJQUFJLENBQUMsYUFBYTtZQUFFLE9BQU8sTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxhQUFhLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FDOUIsRUFBRSxFQUNGLElBQUEsbUJBQVc7UUFDUCxhQUFhO1FBQ2IsOENBQXNDLENBQUMsUUFBUSxFQUFFLEVBQ2pELE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsRUFDaEMsTUFBTSxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxFQUNoRCxNQUFNLElBQUksQ0FBQyxXQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUNBQUksRUFBRSxFQUN0RCxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxRQUFRLEVBQUUsbUNBQUksRUFBRSxDQUMzQixDQUNKLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxhQUFhLENBQUM7SUFDOUIsQ0FBQztJQWNELGNBQWMsQ0FBQyxNQUE0Qjs7UUFDdkMsSUFBSSxJQUFJLENBQUMsZUFBZTtZQUFFLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztRQUN0RCxNQUFNLGNBQWUsU0FBUSxxQkFBWTtTQUFHO1FBQzVDLGNBQWMsQ0FBQyxVQUFVLEdBQUcsSUFBQSxtQkFBVyxFQUNuQyxNQUFBLDhDQUFzQyxDQUFDLFVBQVUsbUNBQUksRUFBRSxFQUN2RCxNQUFBLE1BQU0sYUFBTixNQUFNLHVCQUFOLE1BQU0sQ0FBRSxVQUFVLG1DQUFJLEVBQUUsQ0FDM0IsQ0FBQztRQUNGLElBQUksQ0FBQyxlQUFlLEdBQUcsY0FBYyxDQUFDO1FBQ3RDLE9BQU8sSUFBSSxDQUFDLGVBQWUsQ0FBQztJQUNoQyxDQUFDO0lBR0QsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLE9BQU87UUFDOUIsYUFBYTtRQUNiLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDaEUsYUFBYTtRQUNiLElBQUksQ0FBQyxXQUFXLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUMxQyxJQUFBLHFCQUFhLEVBQUMsR0FBRyxFQUFFO1lBQ2YsRUFBRTtTQUNMLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7T0FXRztJQUNILFNBQVMsQ0FBQyxNQUFXLEVBQUUsTUFBVyxJQUFJLENBQUMsSUFBSTtRQUN2QyxVQUFVLENBQUMsR0FBRyxFQUFFO1lBQ1osSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLFNBQVMsRUFBRSxFQUFFO2dCQUN0QyxNQUFNLEtBQUssR0FBRyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO2dCQUMxQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzNCLENBQUMsQ0FBQyxDQUFDO1FBQ1AsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRTtRQUMxQixJQUFJLFNBQVMsR0FBRyxHQUFHO2FBQ2QsS0FBSyxDQUFDLEdBQUcsQ0FBQzthQUNWLEdBQUcsQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ2IsTUFBTSxLQUFLLEdBQWEsRUFBRSxDQUFDO1lBQzNCLG1DQUFtQztZQUNuQyxLQUFLLENBQUMsSUFBSSxDQUNOLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEdBQzlCLE9BQU8sSUFBSSxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFDN0MsR0FBRyxPQUFPLEVBQUUsQ0FDZixDQUFDO1lBQ0YsK0NBQStDO1lBQy9DLElBQ0ksSUFBSSxDQUFDLFFBQVEsQ0FBQyxJQUFJO2dCQUNsQixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsS0FBSyxJQUFJLENBQUMsUUFBUSxDQUFDLElBQUksRUFDeEQ7Z0JBQ0UsS0FBSyxDQUFDLElBQUksQ0FDTixHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsSUFBSSxDQUFDLFdBQVcsRUFBRSxHQUMvQixPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQzdDLEdBQUcsT0FBTyxFQUFFLENBQ2YsQ0FBQzthQUNMO1lBQ0QsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzNCLENBQUMsQ0FBQzthQUNELElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVmLElBQUksS0FBSyxFQUFFO1lBQ1AsU0FBUyxJQUFJLElBQUksS0FBSyxFQUFFLENBQUM7U0FDNUI7UUFFRCxPQUFPLFNBQVMsQ0FBQztJQUNyQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7T0FVRztJQUNILFNBQVM7O1FBQ0wsT0FBTyxNQUFBLElBQUksQ0FBQyxJQUFJLDBDQUFFLFlBQVksQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUM5QyxDQUFDO0lBRUQ7Ozs7Ozs7O09BUUc7SUFDSCxZQUFZO1FBQ1IsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO0lBQzlCLENBQUM7O0FBeHZCTCxrQ0F5dkJDO0FBM3JCRzs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSSw2QkFBYSxHQUFRLEVBQUUsQ0FBQztBQWtrQnhCLCtCQUFlLEdBQWEsRUFBRSxDQUFDIn0=