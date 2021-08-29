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
            // case 'interact':
            //     this.node.addEventListener('mouseover', (e) => {
            //         console.log('over');
            //     });
            //     this.node.addEventListener('touchstart', (e) {
            //         console.log('touchStart');
            //     });
            //     this.node.addEventListener('focus', (e) => {
            //         console.log('focus');
            //     });
            //     this.node.addEventListener('focusin', (e) => {
            //         console.log('in');
            //     });
            //     break;
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