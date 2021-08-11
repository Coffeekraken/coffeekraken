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
        physical: true
    },
    mounted: {
        type: 'Boolean',
        default: false,
        physical: true
    },
    mountWhen: {
        type: 'String',
        values: ['directly', 'inViewport'],
        default: 'directly'
    },
    adoptStyle: {
        type: 'Boolean',
        default: true,
        physical: true
    },
    defaultStyle: {
        type: 'Boolean',
        default: false,
        physical: true
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
        var _a, _b, _c, _d, _e;
        super(__deepMerge({
            get rootNode() {
                var _a;
                return (_a = node.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
            }
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
        if (!this.node.tagName)
            this.node = this.node.parentNode;
        if (((_b = (_a = this.node.parentNode) === null || _a === void 0 ? void 0 : _a.tagName) === null || _b === void 0 ? void 0 : _b.toLowerCase()) === this.name) {
            this.node = node.parentNode;
        }
        let InterfaceToApply = SComponentUtilsDefaultInterface;
        if (this._settings.interface) {
            InterfaceToApply.definition = Object.assign(Object.assign({}, InterfaceToApply.definition), this._settings.interface.definition);
        }
        this._InterfaceToApply = InterfaceToApply;
        // props
        const defaultProps = __deepMerge(InterfaceToApply.defaults(), (_c = this._settings.defaultProps) !== null && _c !== void 0 ? _c : {}, (_d = this.constructor._defaultProps['*']) !== null && _d !== void 0 ? _d : {}, (_e = this.constructor._defaultProps[this.name]) !== null && _e !== void 0 ? _e : {});
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
        const _updateProp = (propName, oldValue) => {
            // if (this[propName] === oldValue) return;
            var _a, _b;
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
                    console.log(propName, this.node[propName]);
                    this.node.setAttribute(__dashCase(propName), this.node[propName]);
                }
            }
        };
        // @ts-ignore
        const superUpdated = this.node.updated;
        this.node.updated = (changedProperties) => {
            changedProperties.forEach((oldValue, propName) => {
                _updateProp(propName, oldValue);
            });
            superUpdated === null || superUpdated === void 0 ? void 0 : superUpdated(changedProperties);
        };
        Object.keys(this.props).forEach(prop => {
            _updateProp(prop, this.node[prop]);
        });
        const styleStr = this.node.constructor.getStyles();
        this.injectStyle(styleStr.cssText);
        // mount component when needed
        switch (this.props.mountWhen) {
            case 'inViewport':
                (() => __awaiter(this, void 0, void 0, function* () {
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
        Array.from(selector).forEach(sel => {
            this._defaultProps[sel] = props;
        });
    }
    attrsStr() {
        return 'coco="jhello"';
    }
    static getFinalInterface(int) {
        let InterfaceToApply = SComponentUtilsDefaultInterface;
        if (int) {
            InterfaceToApply.definition = Object.assign(Object.assign({}, InterfaceToApply.definition), int.definition);
        }
        return InterfaceToApply;
    }
    static properties(properties, int) {
        const propertiesObj = {};
        const InterfaceToApply = this.getFinalInterface(int);
        // @ts-ignore
        Object.keys(InterfaceToApply.definition).forEach(prop => {
            var _a;
            // @ts-ignore
            const definition = InterfaceToApply.definition[prop];
            propertiesObj[prop] = Object.assign({}, ((_a = definition.lit) !== null && _a !== void 0 ? _a : {}));
        });
        const props = Object.assign(Object.assign({}, propertiesObj), (properties !== null && properties !== void 0 ? properties : {}));
        return props;
    }
    injectStyle(css, id = this.node.tagName) {
        if (this.constructor._injectedStyles.indexOf(id) !== -1)
            return;
        this.constructor._injectedStyles.push(id);
        __injectStyle(css);
    }
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            this.shouldUpdate = true;
            (_b = (_a = this.node).requestUpdate) === null || _b === void 0 ? void 0 : _b.call(_a); // litelement update
            yield __wait();
            // adopting parent styles
            if (this.props.adoptStyle)
                this._adoptStyle();
            Object.keys(this.props).forEach(prop => {
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
                if (Array.isArray(this.props.adoptStyle) && this.props.adoptStyle.indexOf((_a = $style.id) !== null && _a !== void 0 ? _a : '') === -1) {
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
 * @param     {String|String[]}      selector      The selector to use to target elements on which these props will be applied
 * @param     {Any}         props         An object of props you want to set defaults for
 *
 * @since       2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
SComponentUtils._defaultProps = {};
SComponentUtils._injectedStyles = [];
SComponentUtils._styleNodes = [];
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLHFDQUFxQztBQUNyQyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25FLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBMENwRSxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsWUFBWTs7QUFDeEQsMENBQVUsR0FBRztJQUNsQixFQUFFLEVBQUU7UUFDRixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2Y7SUFDRCxPQUFPLEVBQUU7UUFDUCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsVUFBVSxFQUFFLFlBQVksQ0FBQztRQUNsQyxPQUFPLEVBQUUsVUFBVTtLQUNwQjtJQUNELFVBQVUsRUFBRTtRQUNWLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLElBQUk7UUFDYixRQUFRLEVBQUUsSUFBSTtLQUNmO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDakIsT0FBTyxFQUFFLEtBQUs7UUFDZCxRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQTtBQUdILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBMEVuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLElBQVksRUFDWixJQUFpQixFQUNqQixLQUFVLEVBQ1YsV0FBa0QsRUFBRTs7UUFFcEQsS0FBSyxDQUFDLFdBQVcsQ0FBQztZQUNoQixJQUFJLFFBQVE7O2dCQUNWLE9BQU8sTUFBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDekQsQ0FBQztTQUNGLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQTNEaEI7Ozs7Ozs7O1dBUUc7UUFDSCxhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUs3QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQStDbkIsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6RCxJQUFJLENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLFdBQVcsRUFBRSxNQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDOUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQzdCO1FBRUQsSUFBSSxnQkFBZ0IsR0FBRywrQkFBK0IsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzVCLGdCQUFnQixDQUFDLFVBQVUsbUNBQ3RCLGdCQUFnQixDQUFDLFVBQVUsR0FDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUN2QyxDQUFBO1NBQ0Y7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFFMUMsUUFBUTtRQUNSLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FDOUIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQzNCLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsRUFDakMsTUFBTSxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxFQUNoRCxNQUFNLElBQUksQ0FBQyxXQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUNBQUksRUFBRSxDQUN2RCxDQUFDO1FBQ0YsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO1lBQzdDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxFQUFFOztnQkFDL0IsSUFBSSxLQUFLLENBQUM7Z0JBQ1YsSUFBSSxDQUFBLE1BQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxTQUFTLE1BQUssU0FBUyxFQUFFO29CQUN2QyxJQUFJLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLEtBQUssRUFBRTt3QkFBRSxLQUFLLEdBQUcsSUFBSSxDQUFDOzt3QkFDekMsS0FBSyxHQUFHLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxTQUFTLENBQUM7aUJBQ25DO2dCQUNELElBQUksQ0FBQyxLQUFLO29CQUFFLE9BQU87Z0JBQ25CLFdBQVcsQ0FBQyxXQUFXLENBQUMsTUFBQSxNQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsMENBQUUsSUFBSSxtQ0FBSSxHQUFHLENBQUMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUM1RCxDQUFDLENBQUMsQ0FBQztTQUNKO2FBQU07WUFDTCxXQUFXLEdBQUcsS0FBSyxDQUFDO1NBQ3JCO1FBQ0QsSUFBSSxDQUFDLEtBQUssR0FBRyxXQUFXLENBQUMsWUFBWSxFQUFFLFdBQVcsQ0FBQyxDQUFDO1FBRXBELDBCQUEwQjtRQUMxQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEVBQUU7WUFDM0IsSUFBSSxDQUFDLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUFFO2dCQUM1QixPQUFPLElBQUksQ0FBQyxZQUFZLENBQUM7WUFDM0IsQ0FBQyxDQUFBO1NBQ0Y7UUFFRCxNQUFNLFdBQVcsR0FBRyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRTtZQUN6QywyQ0FBMkM7O1lBRXpDLElBQUksTUFBQSxNQUFBLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxVQUFVLDBDQUFHLFFBQVEsQ0FBQywwQ0FBRSxRQUFRLEVBQUU7Z0JBQzNELElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxTQUFTLEVBQUU7b0JBQ3RFLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztxQkFDL0Q7b0JBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsVUFBVSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ2pEO3FCQUFNO29CQUNMLElBQUksSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLEVBQUU7d0JBQzNCLElBQUksQ0FBQyxTQUFTLENBQUMsUUFBUSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUNqRjtvQkFDRCxPQUFPLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7b0JBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ25FO2FBQ0Y7UUFDTCxDQUFDLENBQUE7UUFFRCxhQUFhO1FBQ2IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQ3hDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDL0MsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNsQyxDQUFDLENBQUMsQ0FBQztZQUNILFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3BDLENBQUMsQ0FBQTtRQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtZQUNyQyxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyQyxDQUFDLENBQUMsQ0FBQTtRQUdGLE1BQU0sUUFBUSxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsV0FBVyxDQUFDLFNBQVMsRUFBRSxDQUFDO1FBQ25ELElBQUksQ0FBQyxXQUFXLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBRW5DLDhCQUE4QjtRQUM5QixRQUFPLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFO1lBQzNCLEtBQUssWUFBWTtnQkFDZixDQUFDLEdBQVMsRUFBRTtvQkFDVixNQUFNLGdCQUFnQixDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztvQkFDbEMsSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO2dCQUNmLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztnQkFDUCxNQUFNO1lBQ04sS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFVBQVUsQ0FBQztZQUNoQjtnQkFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2YsTUFBTTtTQUNQO0lBQ0gsQ0FBQztJQTlIRCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQXlCLEVBQUUsS0FBVTtRQUMxRCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsRUFBRTtZQUNqQyxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxHQUFHLEtBQUssQ0FBQztRQUNsQyxDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUE0SEQsUUFBUTtRQUNOLE9BQU8sZUFBZSxDQUFDO0lBQ3pCLENBQUM7SUFFRCxNQUFNLENBQUMsaUJBQWlCLENBQUMsR0FBa0I7UUFDekMsSUFBSSxnQkFBZ0IsR0FBRywrQkFBK0IsQ0FBQztRQUN2RCxJQUFJLEdBQUcsRUFBRTtZQUNQLGdCQUFnQixDQUFDLFVBQVUsbUNBQ3RCLGdCQUFnQixDQUFDLFVBQVUsR0FFM0IsR0FBRyxDQUFDLFVBQVUsQ0FDbEIsQ0FBQTtTQUNGO1FBQ0QsT0FBTyxnQkFBZ0IsQ0FBQztJQUMxQixDQUFDO0lBRUQsTUFBTSxDQUFDLFVBQVUsQ0FBQyxVQUFlLEVBQUUsR0FBaUI7UUFDbEQsTUFBTSxhQUFhLEdBQUcsRUFBRSxDQUFDO1FBQ3pCLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSxDQUFDLGlCQUFpQixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBRXJELGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTs7WUFDdEQsYUFBYTtZQUNiLE1BQU0sVUFBVSxHQUFHLGdCQUFnQixDQUFDLFVBQVUsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNyRCxhQUFhLENBQUMsSUFBSSxDQUFDLHFCQUNkLENBQUMsTUFBQSxVQUFVLENBQUMsR0FBRyxtQ0FBSSxFQUFFLENBQUMsQ0FDMUIsQ0FBQztRQUNKLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxLQUFLLG1DQUNOLGFBQWEsR0FDYixDQUFDLFVBQVUsYUFBVixVQUFVLGNBQVYsVUFBVSxHQUFJLEVBQUUsQ0FBQyxDQUN0QixDQUFDO1FBRUYsT0FBTyxLQUFLLENBQUM7SUFDZixDQUFDO0lBR0QsV0FBVyxDQUFDLEdBQUcsRUFBRSxFQUFFLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1FBQ3JDLElBQUksSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQztZQUFFLE9BQU87UUFDaEUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNyQixDQUFDO0lBR0ssS0FBSzs7O1lBQ1QsSUFBSSxDQUFDLFlBQVksR0FBRyxJQUFJLENBQUM7WUFDekIsTUFBQSxNQUFBLElBQUksQ0FBQyxJQUFJLEVBQUMsYUFBYSxrREFBSSxDQUFDLENBQUMsb0JBQW9CO1lBRWpELE1BQU0sTUFBTSxFQUFFLENBQUM7WUFDZix5QkFBeUI7WUFDekIsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVU7Z0JBQUUsSUFBSSxDQUFDLFdBQVcsRUFBRSxDQUFDO1lBQzlDLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsRUFBRTtnQkFDckMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1lBQ0gsTUFBTSxNQUFNLEVBQUUsQ0FBQztZQUNmLGFBQWE7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7O0tBRTFCO0lBR0QsV0FBVztRQUNQLE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBRWxDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQU0sS0FBSyxFQUFDLEVBQUU7O2dCQUN2QyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBQSxLQUFLLENBQUMsRUFBRSxtQ0FBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDaEcsT0FBTyxDQUFDLDhCQUE4QjtpQkFDdkM7Z0JBRUQsSUFBSSxLQUFLLENBQUMsV0FBVyxFQUFFO29CQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsS0FBSyxDQUFDLFdBQVcsQ0FBQyxDQUFDO29CQUMxRyxPQUFPO2lCQUNSO2dCQUVELE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLDBDQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFFckQsaURBQWlEO2dCQUNqRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUUsT0FBTztnQkFDL0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV6QyxvRUFBb0U7Z0JBQ3BFLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ2xDLE9BQU8sRUFBRTt3QkFDUCxNQUFNLEVBQUUsb0JBQW9CO3FCQUM3QjtpQkFDRixDQUFDLENBQUM7Z0JBRUgsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBRWpDLENBQUMsQ0FBQSxDQUFDLENBQUM7U0FDSjtRQUVELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNuQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsRUFBRTs7Z0JBQ25DLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLFVBQVUsQ0FBQyxJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFBLE1BQU0sQ0FBQyxFQUFFLG1DQUFJLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO29CQUNqRyxPQUFPLENBQUMsOEJBQThCO2lCQUN2QztnQkFFRCxJQUFJLE1BQU0sQ0FBQyxXQUFXLEVBQUU7b0JBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLGtCQUFrQixHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsRUFBRSxNQUFNLENBQUMsV0FBVyxDQUFDLENBQUM7b0JBQzNHLE9BQU87aUJBQ1I7Z0JBRUQsTUFBTSxVQUFVLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDdkMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ3JDLE1BQU0sQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO2dCQUVoQyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1lBRTdHLENBQUMsQ0FBQyxDQUFDO1NBQ0o7SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQVc7UUFDbkIsVUFBVSxDQUFDLEdBQUcsRUFBRTs7WUFDZCxJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BCLGFBQWE7WUFDYixJQUFJLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLDBDQUFFLFVBQVUsRUFBRSxFQUFFLGlEQUFpRDtnQkFDdkYsYUFBYTtnQkFDYixHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDNUI7WUFDRCxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsRUFBRTtnQkFDdEMsTUFBTSxLQUFLLEdBQUcsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNoQyxHQUFHLENBQUMsU0FBUyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQ3pCLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRTtRQUM1QixJQUFJLFNBQVMsR0FBRyxHQUFHO2FBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQ0YsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNWLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FDekU7YUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFYixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUNwQyxTQUFTLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUMxQjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUzs7UUFDUCxPQUFPLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzVDLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNkLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDcEIsNkJBQTZCO1FBQzdCLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNO0lBQ04sb0NBQW9DO0lBQ3BDLDZCQUE2QjtJQUM3QixLQUFLO0lBQ0wsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxLQUFLO0lBQ0wsNEVBQTRFO0lBQzVFLDBHQUEwRztJQUMxRywwRUFBMEU7SUFDMUUsS0FBSztJQUNMLDBCQUEwQjtJQUMxQix3REFBd0Q7SUFDeEQsTUFBTTtJQUNOLHlEQUF5RDtJQUN6RCxtREFBbUQ7SUFDbkQsZ0JBQWdCO0lBQ2hCLElBQUk7SUFFSixNQUFNO0lBQ04sc0NBQXNDO0lBQ3RDLDZCQUE2QjtJQUM3QixLQUFLO0lBQ0wsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxLQUFLO0lBQ0wsNEVBQTRFO0lBQzVFLDBHQUEwRztJQUMxRywwRUFBMEU7SUFDMUUsS0FBSztJQUNMLDBCQUEwQjtJQUMxQix3REFBd0Q7SUFDeEQsTUFBTTtJQUNOLDJEQUEyRDtJQUMzRCxxREFBcUQ7SUFDckQsZ0NBQWdDO0lBQ2hDLGdCQUFnQjtJQUNoQixJQUFJO0lBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsT0FBWTtRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBRXJDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzVDLE1BQU0sa0NBQ0QsT0FBTyxLQUNWLE1BQU07d0JBQ0osWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDdEIsQ0FBQztvQkFDRCxTQUFTLENBQUMsSUFBSTt3QkFDWixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hCLENBQUMsR0FDRjthQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0osVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsWUFBWTtvQkFBRSxNQUFNLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLElBQVksRUFBRSxPQUFpQjtRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFPLENBQUMsRUFBRSxFQUFFOztZQUMzQyxhQUFhO1lBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxDQUFDLENBQUMsTUFBTSwwQ0FBRSxNQUFNLENBQUE7Z0JBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsYUFBYTtZQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsYUFBYTtZQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQVksRUFBRSxPQUFpQjtRQUM5RCxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3pDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxDQUFDLENBQUMsTUFBTSwwQ0FBRSxNQUFNLENBQUE7b0JBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHVCQUF1QixDQUFDLElBQVksRUFBRSxPQUFpQjtRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7O2dCQUN6QyxhQUFhO2dCQUNiLElBQUksQ0FBQyxDQUFBLE1BQUEsQ0FBQyxDQUFDLE1BQU0sMENBQUUsTUFBTSxDQUFBO29CQUFFLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxhQUFhO2dCQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixhQUFhO2dCQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7O0FBN2JEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNJLDZCQUFhLEdBQVEsRUFBRSxDQUFDO0FBc0t4QiwrQkFBZSxHQUFhLEVBQUUsQ0FBQztBQXdCL0IsMkJBQVcsR0FBRyxFQUFFLENBQUMifQ==