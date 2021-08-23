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
import __injectStyle from '@coffeekraken/sugar/js/css/injectStyle';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
export class SComponentUtilsDefaultInterface extends __SInterface {
}
SComponentUtilsDefaultInterface.definition = {
    id: {
        type: 'String',
        physical: true,
    },
    mounted: {
        type: 'Boolean',
        default: false,
        physical: true,
    },
    mountWhen: {
        type: 'String',
        values: ['directly', 'inViewport'],
        default: 'directly',
    },
    adoptStyle: {
        type: 'Boolean',
        default: true,
        physical: true,
    },
    defaultStyle: {
        type: 'Boolean',
        default: false,
        physical: true,
    },
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
        var _a, _b, _c, _d, _e, _f;
        var _g;
        super(__deepMerge({
            get rootNode() {
                var _a;
                return (_a = node.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
            },
        }, settings));
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
        // @ts-ignore
        if (!this.node.tagName)
            this.node = this.node.parentNode;
        // @ts-ignore
        if (((_b = (_a = this.node.parentNode) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === this.name) {
            // @ts-ignore
            this.node = node.parentNode;
        }
        let InterfaceToApply = (_c = this._settings.interface) !== null && _c !== void 0 ? _c : (_g = class InlineComponentUtilsInterface extends __SInterface {
            },
            _g.definition = Object.assign({}, SComponentUtilsDefaultInterface.definition),
            _g);
        if (this._settings.interface) {
            InterfaceToApply.definition = Object.assign(Object.assign({}, InterfaceToApply.definition), this._settings.interface.definition);
        }
        this._InterfaceToApply = InterfaceToApply;
        // props
        const defaultProps = __deepMerge(InterfaceToApply.defaults(), (_d = this._settings.defaultProps) !== null && _d !== void 0 ? _d : {}, (_e = this.constructor._defaultProps['*']) !== null && _e !== void 0 ? _e : {}, (_f = this.constructor._defaultProps[this.name]) !== null && _f !== void 0 ? _f : {});
        let passedProps = {};
        if (props.constructor.name === 'NamedNodeMap') {
            Object.keys(props).forEach((key) => {
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
        this.props = __deepMerge(defaultProps, InterfaceToApply.apply(passedProps, {
            descriptor: {
                defaults: false,
            },
        }));
        // litElement shouldUpdate
        // @ts-ignore
        if (!this.node.shouldUpdate) {
            // @ts-ignore
            this.node.shouldUpdate = () => {
                return this.shouldUpdate;
            };
        }
        const _updateProp = (propName, oldValue) => {
            var _a, _b;
            if (this[propName] === oldValue)
                return;
            // @ts-ignore
            if ((_b = (_a = this._InterfaceToApply.definition) === null || _a === void 0 ? void 0 : _a[propName]) === null || _b === void 0 ? void 0 : _b.physical) {
                if (this.node[propName] === false || this.node[propName] === undefined) {
                    if (this._settings.rootNode) {
                        this._settings.rootNode.removeAttribute(__dashCase(propName));
                    }
                    this.node.removeAttribute(__dashCase(propName));
                }
                else {
                    if (this._settings.rootNode) {
                        this._settings.rootNode.setAttribute(__dashCase(propName), this.node[propName]);
                    }
                    this.node.setAttribute(__dashCase(propName), this.node[propName]);
                }
            }
        };
        // @ts-ignore
        const superUpdated = this.node.updated;
        // @ts-ignore
        this.node.updated = (changedProperties) => {
            changedProperties.forEach((oldValue, propName) => {
                _updateProp(propName, oldValue);
            });
            superUpdated === null || superUpdated === void 0 ? void 0 : superUpdated(changedProperties);
        };
        Object.keys(this.props).forEach((prop) => {
            _updateProp(prop, this.node[prop]);
        });
        // @ts-ignore
        const styleStr = this.node.constructor.getStyles();
        this.injectStyle(styleStr.cssText);
        // mount component when needed
        switch (this.props.mountWhen) {
            case 'inViewport':
                (() => __awaiter(this, void 0, void 0, function* () {
                    // @ts-ignore
                    yield __whenInViewport(this.node);
                    this.mount();
                }))();
                break;
            case 'direct':
            case 'directly':
            default:
                this.mount();
                break;
        }
    }
    static setDefaultProps(selector, props) {
        Array.from(selector).forEach((sel) => {
            var _a;
            this._defaultProps[sel] = Object.assign(Object.assign({}, ((_a = this._defaultProps[sel]) !== null && _a !== void 0 ? _a : {})), props);
        });
    }
    static getFinalInterface(int) {
        class InlineComponentUtilsInterface extends __SInterface {
        }
        InlineComponentUtilsInterface.definition = SComponentUtilsDefaultInterface.definition;
        if (int) {
            InlineComponentUtilsInterface.definition = Object.assign(Object.assign({}, SComponentUtilsDefaultInterface.definition), int.definition);
        }
        // @ts-ignore
        return InlineComponentUtilsInterface;
    }
    static properties(properties, int) {
        const propertiesObj = {};
        const InterfaceToApply = this.getFinalInterface(int);
        // @ts-ignore
        Object.keys(InterfaceToApply.definition).forEach((prop) => {
            var _a;
            // @ts-ignore
            const definition = InterfaceToApply.definition[prop];
            propertiesObj[prop] = Object.assign({}, ((_a = definition.lit) !== null && _a !== void 0 ? _a : {}));
            // const type = definition.type?.type ?? definition.type ?? 'string';
            if (definition.physical) {
                propertiesObj[prop].reflect = true;
            }
        });
        const props = Object.assign(Object.assign({}, propertiesObj), (properties !== null && properties !== void 0 ? properties : {}));
        return props;
    }
    injectStyle(css, id = this.node.tagName) {
        // @ts-ignore
        if (this.constructor._injectedStyles.indexOf(id) !== -1)
            return;
        // @ts-ignore
        this.constructor._injectedStyles.push(id);
        __injectStyle(css);
    }
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.shouldUpdate = true;
            // @ts-ignore
            (_b = (_a = this.node).requestUpdate) === null || _b === void 0 ? void 0 : _b.call(_a); // litelement update
            yield __wait();
            // adopting parent styles
            if (this.props.adoptStyle)
                this._adoptStyle();
            Object.keys(this.props).forEach((prop) => {
                this.node[prop] = this.props[prop];
            });
            yield __wait();
            // @ts-ignore
            this.node.mounted = true;
        });
    }
    _adoptStyle() {
        const $links = document.querySelectorAll('link[rel="stylesheet"]');
        if ($links && this.node.shadowRoot) {
            Array.from($links).forEach(($link) => __awaiter(this, void 0, void 0, function* () {
                var _a, _b;
                if (Array.isArray(this.props.adoptStyle) && this.props.adoptStyle.indexOf((_a = $link.id) !== null && _a !== void 0 ? _a : '') === -1) {
                    return; // this style is not wanted...
                }
                // @ts-ignore
                if ($link._stylesheet) {
                    // @ts-ignore
                    this.node.shadowRoot.adoptedStyleSheets = [
                        // @ts-ignore
                        ...this.node.shadowRoot.adoptedStyleSheets,
                        // @ts-ignore
                        $link._stylesheet,
                    ];
                    return;
                }
                (_b = this.node.shadowRoot) === null || _b === void 0 ? void 0 : _b.appendChild($link.cloneNode());
                // avoid processing multiple time same stylesheet
                // @ts-ignore
                if (this.constructor._styleNodes.indexOf($link) !== -1)
                    return;
                // @ts-ignore
                this.constructor._styleNodes.push($link);
                // request stylesheet to store it in a unique CSSStylesheet instance
                // @ts-ignore
                const res = yield fetch($link.href, {
                    headers: {
                        Accept: 'text/css,*/*;q=0.1',
                    },
                });
                let cssStr = yield res.text();
                const stylesheet = new CSSStyleSheet();
                // @ts-ignore
                stylesheet.replace(cssStr);
                // @ts-ignore
                $link._stylesheet = stylesheet;
            }));
        }
        const $styles = document.querySelectorAll('style');
        if ($styles && this.node.shadowRoot) {
            Array.from($styles).forEach(($style) => {
                var _a;
                if (Array.isArray(this.props.adoptStyle) && this.props.adoptStyle.indexOf((_a = $style.id) !== null && _a !== void 0 ? _a : '') === -1) {
                    return; // this style is not wanted...
                }
                // @ts-ignore
                if ($style._stylesheet) {
                    // @ts-ignore
                    this.node.shadowRoot.adoptedStyleSheets = [
                        // @ts-ignore
                        ...this.node.shadowRoot.adoptedStyleSheets,
                        // @ts-ignore
                        $style._stylesheet,
                    ];
                    return;
                }
                const stylesheet = new CSSStyleSheet();
                // @ts-ignore
                stylesheet.replace($style.innerHTML);
                // @ts-ignore
                $style._stylesheet = stylesheet;
                // @TODO            avoid these ts-ignore
                // @ts-ignore
                this.node.shadowRoot.adoptedStyleSheets = [
                    // @ts-ignore
                    ...this.node.shadowRoot.adoptedStyleSheets,
                    // @ts-ignore
                    $style._stylesheet,
                ];
            });
        }
    }
    exposeApi(apiObj) {
        setTimeout(() => {
            var _a;
            let $on = this.node;
            // @ts-ignore
            if ((_a = this.node.parentNode) === null || _a === void 0 ? void 0 : _a._component) {
                // check if the parent a a vue3-component-wrapper
                // @ts-ignore
                $on = this.node.parentNode;
            }
            Object.keys(apiObj).forEach((apiFnName) => {
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
    /**
     * @name      isMounted
     * @type      Function
     *
     * This method returns true if the component is mounted, false if not
     *
     * @return    {Boolean}       true if is mounted, false if not
     *
     * @since   2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    isMounted() {
        var _a;
        return (_a = this.node) === null || _a === void 0 ? void 0 : _a.hasAttribute('mounted');
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
                    } }),
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
        $targets.forEach(($target) => {
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
        this.$targets.forEach(($target) => {
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
 * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
 * @param     {Any}         props         An object of props you want to set defaults for
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
SComponentUtils._defaultProps = {};
SComponentUtils._injectedStyles = [];
SComponentUtils._styleNodes = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLHFDQUFxQztBQUNyQyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25FLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBbURwRSxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsWUFBWTs7QUFDdEQsMENBQVUsR0FBRztJQUNoQixFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxVQUFVO0tBQ3RCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUdOLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0Is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