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
    // ready: {
    //     type: 'Boolean',
    //     default: false,
    //     physical: true,
    // },
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
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k;
        var _l;
        super(__deepMerge({
            componentUtils: {
                get rootNode() {
                    var _a;
                    return (_a = node.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
                },
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
        let InterfaceToApply = (_l = class InlineComponentUtilsInterface extends __SInterface {
            },
            _l.definition = {},
            _l);
        // @ts-ignore
        InterfaceToApply.definition = Object.assign(Object.assign({}, Object.assign({}, SComponentUtilsDefaultInterface.definition)), ((_d = (_c = this.componentUtilsSettings.interface) === null || _c === void 0 ? void 0 : _c.definition) !== null && _d !== void 0 ? _d : {}));
        // @ts-ignore
        this._InterfaceToApply = InterfaceToApply;
        // props
        const defaultProps = __deepMerge(
        // @ts-ignore
        InterfaceToApply.defaults(), (_e = this.componentUtilsSettings.defaultProps) !== null && _e !== void 0 ? _e : {}, (_f = this.constructor._defaultProps['*']) !== null && _f !== void 0 ? _f : {}, (_g = this.constructor._defaultProps[this.name]) !== null && _g !== void 0 ? _g : {});
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
        // set each props on the node
        Object.keys(this.props).forEach((prop) => {
            // _updateProp(prop, this.node[prop]);
            this.node[prop] = this.props[prop];
        });
        // @ts-ignore
        const nodeFirstUpdated = (_h = this.node.firstUpdated) === null || _h === void 0 ? void 0 : _h.bind(this.node);
        // @ts-ignore
        this.node.firstUpdated = () => __awaiter(this, void 0, void 0, function* () {
            if (nodeFirstUpdated) {
                yield nodeFirstUpdated();
            }
            // set the component as mounted
            // @ts-ignore
            this.node.mounted = true;
        });
        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = (_j = this.node.shouldUpdate) === null || _j === void 0 ? void 0 : _j.bind(this.node);
        // @ts-ignore
        this.node.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res)
                    return false;
            }
            return this.shouldUpdate;
        };
        // @ts-ignore
        const styleStr = this.node.constructor.styles;
        this.injectStyle((_k = styleStr === null || styleStr === void 0 ? void 0 : styleStr.cssText) !== null && _k !== void 0 ? _k : '');
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
        return this._settings.componentUtils;
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
            var _a, _b, _c, _d, _e, _f;
            // @ts-ignore
            const definition = InterfaceToApply.definition[prop];
            propertiesObj[prop] = Object.assign({}, ((_a = definition.lit) !== null && _a !== void 0 ? _a : {}));
            // const type = definition.type?.type ?? definition.type ?? 'string';
            if (definition.physical ||
                ((_c = (_b = definition.type) === null || _b === void 0 ? void 0 : _b.toLowerCase) === null || _c === void 0 ? void 0 : _c.call(_b)) === 'boolean' ||
                ((_f = (_e = (_d = definition.type) === null || _d === void 0 ? void 0 : _d.type) === null || _e === void 0 ? void 0 : _e.toLowerCase) === null || _f === void 0 ? void 0 : _f.call(_e)) === 'boolean') {
                propertiesObj[prop].reflect = true;
                propertiesObj[prop].attribute = __dashCase(prop);
                propertiesObj[prop].converter = {
                    toAttribute(value) {
                        if (value === false || value === null)
                            return null;
                        return String(value);
                    },
                };
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
        return __awaiter(this, void 0, void 0, function* () {
            // adopting parent styles
            if (this.props.adoptStyle)
                yield this._adoptStyle();
            // set the not as updatable
            this.shouldUpdate = true;
            // @ts-ignore
            this.node.requestUpdate();
        });
    }
    _adoptStyle() {
        return __awaiter(this, void 0, void 0, function* () {
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
            return true;
        });
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLHFDQUFxQztBQUNyQyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLGtEQUFrRCxDQUFDO0FBRWhGLE9BQU8sYUFBYSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25FLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBb0RwRSxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsWUFBWTs7QUFDdEQsMENBQVUsR0FBRztJQUNoQixFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsV0FBVztJQUNYLHVCQUF1QjtJQUN2QixzQkFBc0I7SUFDdEIsc0JBQXNCO0lBQ3RCLEtBQUs7SUFDTCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7UUFDbEMsT0FBTyxFQUFFLFVBQVU7S0FDdEI7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBR04s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