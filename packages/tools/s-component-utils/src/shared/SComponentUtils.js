var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __SClass from '@coffeekraken/s-class';
// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
import __camelCase from '@coffeekraken/sugar/shared/string/camelCase';
import __whenInViewport from '@coffeekraken/sugar/js/dom/detect/whenInViewport';
import __wait from '@coffeekraken/sugar/shared/time/wait';
export class SComponentUtilsDefaultInterface extends __SInterface {
}
SComponentUtilsDefaultInterface.definition = {
    mountWhen: {
        type: 'String',
        values: ['directly', 'inViewport'],
        default: 'directly'
    },
    adoptStyles: {
        type: 'Boolean',
        default: true
    },
    defaultStyle: {
        type: 'Boolean',
        default: false
    }
};
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
    constructor(name, node, props, settings = {}) {
        var _a, _b, _c, _d, _e, _f, _g;
        super(__deepMerge({}, settings));
        /**
         * @name            $targets
         * @type            HTMLElement[]
         *
         * Store the target(s) getted using the "target" property
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.$targets = [];
        this.shouldUpdate = false;
        // name
        this.name = name;
        // node
        this.node = node;
        if (!this.node.tagName)
            this.node = this.node.parentNode;
        if (((_b = (_a = this.node.parentNode) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === this.name) {
            this.node = node.parentNode;
        }
        // props
        const defaultProps = __deepMerge((_d = (_c = this._settings.interface) === null || _c === void 0 ? void 0 : _c.defaults()) !== null && _d !== void 0 ? _d : {}, (_e = this._settings.defaultProps) !== null && _e !== void 0 ? _e : {}, (_f = this.constructor._defaultProps['*']) !== null && _f !== void 0 ? _f : {}, (_g = this.constructor._defaultProps[this.name]) !== null && _g !== void 0 ? _g : {});
        let passedProps = {};
        if (props.constructor.name === 'NamedNodeMap') {
            Object.keys(props).forEach(key => {
                var _a, _b, _c;
                let value;
                if (((_a = props[key]) === null || _a === void 0 ? void 0 : _a.nodeValue) !== undefined) {
                    if (props[key].nodeValue === '')
                        value = true;
                    else
                        value = props[key].nodeValue;
                }
                if (!value)
                    return;
                passedProps[__camelCase((_c = (_b = props[key]) === null || _b === void 0 ? void 0 : _b.name) !== null && _c !== void 0 ? _c : key)] = value;
            });
        }
        else {
            passedProps = props;
        }
        this.props = __deepMerge(defaultProps, passedProps);
        // litElement shouldUpdate
        if (!this.node.shouldUpdate) {
            this.node.shouldUpdate = () => {
                return this.shouldUpdate;
            };
        }
        // mount component when needed
        switch (this.props.mountWhen) {
            case 'inViewport':
                (() => __awaiter(this, void 0, void 0, function* () {
                    yield __whenInViewport(this.node);
                    this.mount();
                }))();
                break;
            case 'directly':
            default:
                this.mount();
                break;
        }
    }
    static setDefaultProps(selector, props) {
        this._defaultProps[selector] = props;
    }
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.shouldUpdate = true;
            (_b = (_a = this.node).requestUpdate) === null || _b === void 0 ? void 0 : _b.call(_a); // litelement update
            yield __wait();
            // adopting parent styles
            if (this.props.adoptStyles)
                this._adoptStyles();
            yield __wait();
            // @ts-ignore
            this.node.setAttribute('s-mounted', true);
        });
    }
    _adoptStyles() {
        const $links = document.querySelectorAll('link[rel="stylesheet"]');
        if ($links && this.node.shadowRoot) {
            Array.from($links).forEach(($link) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (Array.isArray(this.props.adoptStyles) && this.props.adoptStyles.indexOf((_a = $link.id) !== null && _a !== void 0 ? _a : '') === -1) {
                    return; // this style is not wanted...
                }
                if ($link._stylesheet) {
                    this.node.shadowRoot.adoptedStyleSheets = [...this.node.shadowRoot.adoptedStyleSheets, $link._stylesheet];
                    return;
                }
                (_b = this.node.shadowRoot) === null || _b === void 0 ? void 0 : _b.appendChild($link.cloneNode());
                // avoid processing multiple time same stylesheet
                if (this.constructor._styleNodes.indexOf($link) !== -1)
                    return;
                this.constructor._styleNodes.push($link);
                // request stylesheet to store it in a unique CSSStylesheet instance
                const res = yield fetch($link.href, {
                    headers: {
                        Accept: 'text/css,*/*;q=0.1'
                    }
                });
                let cssStr = yield res.text();
                const stylesheet = new CSSStyleSheet();
                stylesheet.replace(cssStr);
                $link._stylesheet = stylesheet;
            }));
        }
        const $styles = document.querySelectorAll('style');
        if ($styles && this.node.shadowRoot) {
            Array.from($styles).forEach($style => {
                var _a;
                if (Array.isArray(this.props.adoptStyles) && this.props.adoptStyles.indexOf((_a = $style.id) !== null && _a !== void 0 ? _a : '') === -1) {
                    return; // this style is not wanted...
                }
                if ($style._stylesheet) {
                    this.node.shadowRoot.adoptedStyleSheets = [...this.node.shadowRoot.adoptedStyleSheets, $style._stylesheet];
                    return;
                }
                const stylesheet = new CSSStyleSheet();
                stylesheet.replace($style.innerHTML);
                $style._stylesheet = stylesheet;
                this.node.shadowRoot.adoptedStyleSheets = [...this.node.shadowRoot.adoptedStyleSheets, $style._stylesheet];
            });
        }
    }
    exposeApi(apiObj) {
        setTimeout(() => {
            var _a;
            let $on = this.node;
            // @ts-ignore
            if ((_a = this.node.parentNode) === null || _a === void 0 ? void 0 : _a._component) { // check if the parent a a vue3-component-wrapper
                // @ts-ignore
                $on = this.node.parentNode;
            }
            Object.keys(apiObj).forEach(apiFnName => {
                const apiFn = apiObj[apiFnName];
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
            .map((clsName) => `${this.name}${clsName && !clsName.match(/^__/) ? '-' : ''}${clsName}`)
            .join(' ');
        if (style && this.props.defaultStyle) {
            clsString += ` ${style}`;
        }
        return clsString;
    }
    decodeHtml(input) {
        const e = document.createElement('textarea');
        e.innerHTML = input;
        // handle case of empty input
        return e.childNodes.length === 0 ? '' : e.childNodes[0].nodeValue;
    }
    // /**
    //  * @name          compileMustache
    //  * @type          Function
    //  *
    //  * This method allows you to compile some mustache template
    //  * directly from your component.
    //  *
    //  * @param         {String}        template        The template to compile
    //  * @param         {any}           data            The data with which you want to compile your template
    //  * @return        {String}                        The compiled template
    //  *
    //  * @since         2.0.0
    //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
    //  */
    // compileMustache(template: string, data: any): string {
    //   const res = __mustache.render(template, data);
    //   return res;
    // }
    // /**
    //  * @name          renderHandlerbars
    //  * @type          Function
    //  *
    //  * This method allows you to compile some mustache template
    //  * directly from your component.
    //  *
    //  * @param         {String}        template        The template to compile
    //  * @param         {any}           data            The data with which you want to compile your template
    //  * @return        {String}                        The compiled template
    //  *
    //  * @since         2.0.0
    //  * @author 		Olivier Bossel<olivier.bossel@gmail.com>
    //  */
    // renderHandlerbars(template: string, data: any): string {
    //   const renderFn = __handlebars.compile(template);
    //   const res = renderFn(data);
    //   return res;
    // }
    /**
     * @name        dispatchSyncEvent
     * @type        Function
     *
     * This method allows you to dispatch a sync event that will wait for an answer
     * before passing to the next statements.
     * This mechanism work by sending a "ping" event to check if someone (another component) listen to us.
     * If their's no answer, we pass to the next statements whichout doing anything but
     * if we have an answer, we send the actual event and wait for an answer.
     *
     * @param     {String}     name       The event name you want to send
     * @param     {Any}       details     Some details you want to attach to the event
     * @return    {SPromise}              An SPromise instance that will be resolved if we get an answer and rejected if not
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    dispatchSyncEvent(name, details) {
        return new Promise((resolve, reject) => {
            let hasListeners = false;
            this.node.dispatchEvent(new CustomEvent(name, {
                detail: Object.assign(Object.assign({}, details), { onPing() {
                        hasListeners = true;
                    },
                    onResolve(data) {
                        resolve(data);
                    } })
            }));
            setTimeout(() => {
                if (!hasListeners)
                    reject();
            });
        });
    }
    addSyncEventListener(name, handler) {
        this.node.addEventListener(name, (e) => __awaiter(this, void 0, void 0, function* () {
            var _a;
            // @ts-ignore
            if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.onPing))
                return handler(e);
            // @ts-ignore
            e.detail.onPing();
            const res = yield handler(e);
            // @ts-ignore
            e.detail.onResolve(res);
        }));
    }
    addSyncEventListenerOn($targets, name, handler) {
        $targets.forEach($target => {
            $target.addEventListener(name, (e) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                // @ts-ignore
                if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.onPing))
                    return handler(e);
                // @ts-ignore
                e.detail.onPing();
                const res = yield handler(e);
                // @ts-ignore
                e.detail.onResolve(res);
            }));
        });
    }
    addTargetsEventListener(name, handler) {
        this.$targets.forEach($target => {
            $target.addEventListener(name, (e) => __awaiter(this, void 0, void 0, function* () {
                var _a;
                // @ts-ignore
                if (!((_a = e.detail) === null || _a === void 0 ? void 0 : _a.onPing))
                    return handler(e);
                // @ts-ignore
                e.detail.onPing();
                const res = yield handler(e);
                // @ts-ignore
                e.detail.onResolve(res);
            }));
        });
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
 * @param     {String}      selector      The selector to use to target elements on which these props will be applied
 * @param     {Any}         props         An object of props you want to set defaults for
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
SComponentUtils._defaultProps = {};
SComponentUtils._styleNodes = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLHFDQUFxQztBQUNyQyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBeUMxRCxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsWUFBWTs7QUFDeEQsMENBQVUsR0FBRztJQUNsQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7UUFDbEMsT0FBTyxFQUFFLFVBQVU7S0FDcEI7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNqQixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQTtBQUdILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBdUVuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLElBQVksRUFDWixJQUFpQixFQUNqQixLQUFVLEVBQ1YsV0FBa0QsRUFBRTs7UUFFcEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQXBEbkM7Ozs7Ozs7O1dBUUc7UUFDSCxhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUk3QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQXlDbkIsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcs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