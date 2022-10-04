"use strict";
// @ts-nocheck
// @TODO            check how to override private static methods
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const SComponent_1 = __importDefault(require("../shared/SComponent"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const dom_1 = require("@coffeekraken/sugar/dom");
const function_1 = require("@coffeekraken/sugar/function");
const is_1 = require("@coffeekraken/sugar/is");
const object_1 = require("@coffeekraken/sugar/object");
class SComponent extends SComponent_1.default {
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
    constructor(name, settings) {
        super(name, (0, object_1.__deepMerge)(settings !== null && settings !== void 0 ? settings : {}));
        this._mediaQueries = {};
    }
    /**
     * Check if some <responsive> tags are defined in the component, or if a "responsive" prop exists
     * to adapt properties depending on the viewport size.
     */
    makePropsResponsive(props) {
        var _a;
        // ensure we have a responsive object
        props.responsive = (0, object_1.__deepMerge)({
        // original: Object.assign({}, props),
        }, (_a = props.responsive) !== null && _a !== void 0 ? _a : {});
        Object.defineProperty(props, 'toResetResponsiveProps', {
            enumerable: false,
            writable: true,
            value: {},
        });
        if (Object.keys(props.responsive).length === 1 &&
            props.responsive.original) {
            return;
        }
        // apply on resize
        window.addEventListener('resize', (0, function_1.__debounce)(() => {
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
     * @param           {ISComponentDispatchSettings}          [settings={}]     The settings to use for the dispatch
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    dispatchEvent($elm, eventName, settings) {
        const finalSettings = Object.assign({ bubbles: true, cancelable: true, detail: {} }, (settings !== null && settings !== void 0 ? settings : {}));
        const componentName = this.name;
        // %eventName
        $elm.dispatchEvent(new CustomEvent(eventName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventComponent: componentName }) })));
        // %componentName
        $elm.dispatchEvent(new CustomEvent(componentName, Object.assign(Object.assign({}, finalSettings), { detail: Object.assign(Object.assign({}, finalSettings.detail), { eventType: eventName }) })));
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
    /**
     * @name        injectStyleInShadowRoot
     * @type        Function
     * @async
     *
     * This method allows you to specify some css urls you want to be loaded inside the shadowRoot
     *
     * @param       {String|String[]}               cssDeps                The css urls you want to load inside the shadowRoot
     * @param       {HTMLShadowRootElement}         $shadowRoot             The shadow root you want to adopt the $context styles
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    injectStyleInShadowRoot(cssDeps, $shadowRoot) {
        if (!Array.isArray(cssDeps)) {
            cssDeps = [cssDeps];
        }
        cssDeps.forEach((dep) => {
            var _a;
            let $styleOrLink;
            try {
                $styleOrLink = (_a = document
                    .querySelector(`link#${dep}`)) === null || _a === void 0 ? void 0 : _a.cloneNode(true);
            }
            catch (e) { }
            if (dep.match(/^[a-zA-Z0-9_-]+$/)) {
                $styleOrLink = document.createElement('link');
                $styleOrLink.rel = 'stylesheet';
                $styleOrLink.href = `${s_sugar_config_1.default.get('serve.css.path')}/partials/${dep}.css`;
            }
            if ((0, is_1.__isPath)(dep) && !$styleOrLink) {
                $styleOrLink = document.createElement('link');
                $styleOrLink.rel = 'stylesheet';
                $styleOrLink.href = dep;
            }
            if (!$styleOrLink) {
                $styleOrLink = document.createElement('style');
                $styleOrLink.type = 'text/css';
                $styleOrLink.appendChild(document.createTextNode(dep));
            }
            $shadowRoot.appendChild($styleOrLink);
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
    exposeApi($on, apiObj, ctx) {
        setTimeout(() => {
            Object.keys(apiObj).forEach((apiFnName) => {
                const apiFn = apiObj[apiFnName].bind(ctx);
                $on[apiFnName] = apiFn;
            });
        });
    }
}
exports.default = SComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsZ0VBQWdFOzs7OztBQUVoRSxzRUFBZ0Q7QUFFaEQsb0VBQTZDO0FBRTdDLGtGQUEwRDtBQUMxRCxpREFBbUU7QUFFbkUsMkRBQTBEO0FBQzFELCtDQUFrRDtBQUNsRCx1REFBeUQ7QUFRekQsTUFBcUIsVUFBVyxTQUFRLG9CQUFZO0lBQ2hEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLFFBQXVDO1FBQzdELEtBQUssQ0FBQyxJQUFJLEVBQUUsSUFBQSxvQkFBVyxFQUFDLFFBQVEsYUFBUixRQUFRLGNBQVIsUUFBUSxHQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUM7UUF3QzdDLGtCQUFhLEdBQUcsRUFBRSxDQUFDO0lBdkNuQixDQUFDO0lBRUQ7OztPQUdHO0lBQ0gsbUJBQW1CLENBQUMsS0FBVTs7UUFDMUIscUNBQXFDO1FBQ3JDLEtBQUssQ0FBQyxVQUFVLEdBQUcsSUFBQSxvQkFBVyxFQUMxQjtRQUNJLHNDQUFzQztTQUN6QyxFQUNELE1BQUEsS0FBSyxDQUFDLFVBQVUsbUNBQUksRUFBRSxDQUN6QixDQUFDO1FBRUYsTUFBTSxDQUFDLGNBQWMsQ0FBQyxLQUFLLEVBQUUsd0JBQXdCLEVBQUU7WUFDbkQsVUFBVSxFQUFFLEtBQUs7WUFDakIsUUFBUSxFQUFFLElBQUk7WUFDZCxLQUFLLEVBQUUsRUFBRTtTQUNaLENBQUMsQ0FBQztRQUVILElBQ0ksTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLENBQUMsTUFBTSxLQUFLLENBQUM7WUFDMUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxRQUFRLEVBQzNCO1lBQ0UsT0FBTztTQUNWO1FBRUQsa0JBQWtCO1FBQ2xCLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FDbkIsUUFBUSxFQUNSLElBQUEscUJBQVUsRUFBQyxHQUFHLEVBQUU7WUFD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