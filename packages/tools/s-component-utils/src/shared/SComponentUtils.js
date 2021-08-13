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
        var _a, _b, _c, _d, _e;
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
        Object.keys(this.props).forEach((prop) => {
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
        Array.from(selector).forEach((sel) => {
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
        Object.keys(InterfaceToApply.definition).forEach((prop) => {
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
                if ($link._stylesheet) {
                    this.node.shadowRoot.adoptedStyleSheets = [
                        ...this.node.shadowRoot.adoptedStyleSheets,
                        $link._stylesheet,
                    ];
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
                        Accept: 'text/css,*/*;q=0.1',
                    },
                });
                let cssStr = yield res.text();
                const stylesheet = new CSSStyleSheet();
                stylesheet.replace(cssStr);
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
                if ($style._stylesheet) {
                    this.node.shadowRoot.adoptedStyleSheets = [
                        ...this.node.shadowRoot.adoptedStyleSheets,
                        $style._stylesheet,
                    ];
                    return;
                }
                const stylesheet = new CSSStyleSheet();
                stylesheet.replace($style.innerHTML);
                $style._stylesheet = stylesheet;
                this.node.shadowRoot.adoptedStyleSheets = [
                    ...this.node.shadowRoot.adoptedStyleSheets,
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLHFDQUFxQztBQUNyQyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBQzFELE9BQU8sYUFBYSxNQUFNLHdDQUF3QyxDQUFDO0FBQ25FLE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBMENwRSxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsWUFBWTs7QUFDdEQsMENBQVUsR0FBRztJQUNoQixFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxVQUFVO0tBQ3RCO0lBQ0QsVUFBVSxFQUFFO1FBQ1IsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsSUFBSTtRQUNiLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsWUFBWSxFQUFFO1FBQ1YsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUdOLE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBeUVqRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUFZLElBQVksRUFBRSxJQUFpQixFQUFFLEtBQVUsRUFBRSxXQUFrRCxFQUFFOztRQUN6RyxLQUFLLENBQ0QsV0FBVyxDQUNQO1lBQ0ksSUFBSSxRQUFROztnQkFDUixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO1lBQzNELENBQUM7U0FDSixFQUNELFFBQVEsQ0FDWCxDQUNKLENBQUM7UUEzRE47Ozs7Ozs7O1dBUUc7UUFDSCxhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUs3QixpQkFBWSxHQUFHLEtBQUssQ0FBQztRQStDakIsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6RCxJQUFJLENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLFdBQVcsRUFBRSxNQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDNUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQy9CO1FBRUQsSUFBSSxnQkFBZ0IsR0FBRywrQkFBK0IsQ0FBQztRQUN2RCxJQUFJLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUyxFQUFFO1lBQzFCLGdCQUFnQixDQUFDLFVBQVUsbUNBQ3BCLGdCQUFnQixDQUFDLFVBQVUsR0FDM0IsSUFBSSxDQUFDLFNBQVMsQ0FBQyxTQUFTLENBQUMsVUFBVSxDQUN6QyxDQUFDO1NBQ0w7UUFDRCxJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFFMUMsUUFBUTtRQUNSLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FDNUIsZ0JBQWdCLENBQUMsUUFBUSxFQUFFLEVBQzNCLE1BQUEsSUFBSSxDQUFDLFNBQVMsQ0FBQyxZQUFZLG1DQUFJLEVBQUUsRUFDakMsTUFBTSxJQUFJLENBQUMsV0FBWSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQUksRUFBRSxFQUNoRCxNQUFNLElBQUksQ0FBQyxXQUFZLENBQUMsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsbUNBQUksRUFBRSxDQUN6RCxDQUFDO1FBQ0YsSUFBSSxXQUFXLEdBQUcsRUFBRSxDQUFDO1FBQ3JCLElBQUksS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLEtBQUssY0FBYyxFQUFFO1lBQzNDLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7O2dCQUMvQixJQUFJLEtBQUssQ0FBQztnQkFDVixJQUFJLENBQUEsTUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLDBDQUFFLFNBQVMsTUFBSyxTQUFTLEVBQUU7b0JBQ3JDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsS0FBSyxFQUFFO3dCQUFFLEtBQUssR0FBRyxJQUFJLENBQUM7O3dCQUN6QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDckM7Z0JBQ0QsSUFBSSxDQUFDLEtBQUs7b0JBQUUsT0FBTztnQkFDbkIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFBLE1BQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxJQUFJLG1DQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzlELENBQUMsQ0FBQyxDQUFDO1NBQ047YUFBTTtZQUNILFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDdkI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEQsMEJBQTBCO1FBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksRUFBRTtZQUN6QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFHLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDLFlBQVksQ0FBQztZQUM3QixDQUFDLENBQUM7U0FDTDtRQUVELE1BQU0sV0FBVyxHQUFHLENBQUMsUUFBUSxFQUFFLFFBQVEsRUFBRSxFQUFFO1lBQ3ZDLDJDQUEyQzs7WUFFM0MsSUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFVBQVUsMENBQUcsUUFBUSxDQUFDLDBDQUFFLFFBQVEsRUFBRTtnQkFDekQsSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEtBQUssSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDcEUsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTt3QkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsZUFBZSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsQ0FBQyxDQUFDO3FCQUNqRTtvQkFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxVQUFVLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQztpQkFDbkQ7cUJBQU07b0JBQ0gsSUFBSSxJQUFJLENBQUMsU0FBUyxDQUFDLFFBQVEsRUFBRTt3QkFDekIsSUFBSSxDQUFDLFNBQVMsQ0FBQyxRQUFRLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7cUJBQ25GO29CQUNELElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFVBQVUsQ0FBQyxRQUFRLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLENBQUM7aUJBQ3JFO2FBQ0o7UUFDTCxDQUFDLENBQUM7UUFFRixhQUFhO1FBQ2IsTUFBTSxZQUFZLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUM7UUFDdkMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsQ0FBQyxpQkFBaUIsRUFBRSxFQUFFO1lBQ3RDLGlCQUFpQixDQUFDLE9BQU8sQ0FBQyxDQUFDLFFBQVEsRUFBRSxRQUFRLEVBQUUsRUFBRTtnQkFDN0MsV0FBVyxDQUFDLFFBQVEsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztZQUNILFlBQVksYUFBWixZQUFZLHVCQUFaLFlBQVksQ0FBRyxpQkFBaUIsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQztRQUNGLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3JDLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ3ZDLENBQUMsQ0FBQyxDQUFDO1FBRUgsTUFBTSxRQUFRLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsU0FBUyxFQUFFLENBQUM7UUFDbkQsSUFBSSxDQUFDLFdBQVcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLENBQUM7UUFFbkMsOEJBQThCO1FBQzlCLFFBQVEsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDMUIsS0FBSyxZQUFZO2dCQUNiLENBQUMsR0FBUyxFQUFFO29CQUNSLE1BQU0sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2pCLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztnQkFDTCxNQUFNO1lBQ1YsS0FBSyxRQUFRLENBQUM7WUFDZCxLQUFLLFVBQVUsQ0FBQztZQUNoQjtnQkFDSSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2IsTUFBTTtTQUNiO0lBQ0wsQ0FBQztJQTVIRCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCxLQUFLLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1lBQ2pDLElBQUksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLEdBQUcsS0FBSyxDQUFDO1FBQ3BDLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQTBIRCxRQUFRO1FBQ0osT0FBTyxlQUFlLENBQUM7SUFDM0IsQ0FBQztJQUVELE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQyxHQUFrQjtRQUN2QyxJQUFJLGdCQUFnQixHQUFHLCtCQUErQixDQUFDO1FBQ3ZELElBQUksR0FBRyxFQUFFO1lBQ0wsZ0JBQWdCLENBQUMsVUFBVSxtQ0FDcEIsZ0JBQWdCLENBQUMsVUFBVSxHQUUzQixHQUFHLENBQUMsVUFBVSxDQUNwQixDQUFDO1NBQ0w7UUFDRCxPQUFPLGdCQUFnQixDQUFDO0lBQzVCLENBQUM7SUFFRCxNQUFNLENBQUMsVUFBVSxDQUFDLFVBQWUsRUFBRSxHQUFpQjtRQUNoRCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFDekIsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFckQsYUFBYTtRQUNiLE1BQU0sQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsVUFBVSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7O1lBQ3RELGFBQWE7WUFDYixNQUFNLFVBQVUsR0FBRyxnQkFBZ0IsQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDckQsYUFBYSxDQUFDLElBQUksQ0FBQyxxQkFDWixDQUFDLE1BQUEsVUFBVSxDQUFDLEdBQUcsbUNBQUksRUFBRSxDQUFDLENBQzVCLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxtQ0FDSixhQUFhLEdBQ2IsQ0FBQyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxFQUFFLENBQUMsQ0FDeEIsQ0FBQztRQUVGLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUFHRCxXQUFXLENBQUMsR0FBRyxFQUFFLEVBQUUsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU87UUFDbkMsSUFBSSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDO1lBQUUsT0FBTztRQUNoRSxJQUFJLENBQUMsV0FBVyxDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDMUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3ZCLENBQUM7SUFFSyxLQUFLOzs7WUFDUCxJQUFJLENBQUMsWUFBWSxHQUFHLElBQUksQ0FBQztZQUN6QixNQUFBLE1BQUEsSUFBSSxDQUFDLElBQUksRUFBQyxhQUFhLGtEQUFJLENBQUMsQ0FBQyxvQkFBb0I7WUFFakQsTUFBTSxNQUFNLEVBQUUsQ0FBQztZQUNmLHlCQUF5QjtZQUN6QixJQUFJLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVTtnQkFBRSxJQUFJLENBQUMsV0FBVyxFQUFFLENBQUM7WUFDOUMsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7Z0JBQ3JDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUN2QyxDQUFDLENBQUMsQ0FBQztZQUNILE1BQU0sTUFBTSxFQUFFLENBQUM7WUFDZixhQUFhO1lBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDOztLQUM1QjtJQUdELFdBQVc7UUFDUCxNQUFNLE1BQU0sR0FBRyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsd0JBQXdCLENBQUMsQ0FBQztRQUNuRSxJQUFJLE1BQU0sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNoQyxLQUFLLENBQUMsSUFBSSxDQUFDLE1BQU0sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFPLEtBQUssRUFBRSxFQUFFOztnQkFDdkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQUEsS0FBSyxDQUFDLEVBQUUsbUNBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQzlGLE9BQU8sQ0FBQyw4QkFBOEI7aUJBQ3pDO2dCQUVELElBQUksS0FBSyxDQUFDLFdBQVcsRUFBRTtvQkFDbkIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEdBQUc7d0JBQ3RDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCO3dCQUMxQyxLQUFLLENBQUMsV0FBVztxQkFDcEIsQ0FBQztvQkFDRixPQUFPO2lCQUNWO2dCQUVELE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLDBDQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztnQkFFckQsaURBQWlEO2dCQUNqRCxJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsV0FBVyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUM7b0JBQUUsT0FBTztnQkFDL0QsSUFBSSxDQUFDLFdBQVcsQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUV6QyxvRUFBb0U7Z0JBQ3BFLE1BQU0sR0FBRyxHQUFHLE1BQU0sS0FBSyxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUU7b0JBQ2hDLE9BQU8sRUFBRTt3QkFDTCxNQUFNLEVBQUUsb0JBQW9CO3FCQUMvQjtpQkFDSixDQUFDLENBQUM7Z0JBRUgsSUFBSSxNQUFNLEdBQUcsTUFBTSxHQUFHLENBQUMsSUFBSSxFQUFFLENBQUM7Z0JBQzlCLE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLENBQUM7Z0JBQzNCLEtBQUssQ0FBQyxXQUFXLEdBQUcsVUFBVSxDQUFDO1lBQ25DLENBQUMsQ0FBQSxDQUFDLENBQUM7U0FDTjtRQUVELE1BQU0sT0FBTyxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxPQUFPLENBQUMsQ0FBQztRQUNuRCxJQUFJLE9BQU8sSUFBSSxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUNqQyxLQUFLLENBQUMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLE1BQU0sRUFBRSxFQUFFOztnQkFDbkMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsVUFBVSxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLE1BQUEsTUFBTSxDQUFDLEVBQUUsbUNBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQy9GLE9BQU8sQ0FBQyw4QkFBOEI7aUJBQ3pDO2dCQUVELElBQUksTUFBTSxDQUFDLFdBQVcsRUFBRTtvQkFDcEIsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEdBQUc7d0JBQ3RDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCO3dCQUMxQyxNQUFNLENBQUMsV0FBVztxQkFDckIsQ0FBQztvQkFDRixPQUFPO2lCQUNWO2dCQUVELE1BQU0sVUFBVSxHQUFHLElBQUksYUFBYSxFQUFFLENBQUM7Z0JBQ3ZDLFVBQVUsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO2dCQUNyQyxNQUFNLENBQUMsV0FBVyxHQUFHLFVBQVUsQ0FBQztnQkFFaEMsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEdBQUc7b0JBQ3RDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCO29CQUMxQyxNQUFNLENBQUMsV0FBVztpQkFDckIsQ0FBQztZQUNOLENBQUMsQ0FBQyxDQUFDO1NBQ047SUFDTCxDQUFDO0lBRUQsU0FBUyxDQUFDLE1BQVc7UUFDakIsVUFBVSxDQUFDLEdBQUcsRUFBRTs7WUFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BCLGFBQWE7WUFDYixJQUFJLE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLDBDQUFFLFVBQVUsRUFBRTtnQkFDbEMsaURBQWlEO2dCQUNqRCxhQUFhO2dCQUNiLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQzthQUM5QjtZQUNELE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUMzQixDQUFDLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVEOzs7Ozs7Ozs7OztPQVdHO0lBQ0gsU0FBUyxDQUFDLEdBQUcsR0FBRyxFQUFFLEVBQUUsS0FBSyxHQUFHLEVBQUU7UUFDMUIsSUFBSSxTQUFTLEdBQUcsR0FBRzthQUNkLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQUMsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FBQzthQUN4RixJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFZixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUNsQyxTQUFTLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUM1QjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ3JCLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUzs7UUFDTCxPQUFPLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNaLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDcEIsNkJBQTZCO1FBQzdCLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3RFLENBQUM7SUFFRCxNQUFNO0lBQ04sb0NBQW9DO0lBQ3BDLDZCQUE2QjtJQUM3QixLQUFLO0lBQ0wsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxLQUFLO0lBQ0wsNEVBQTRFO0lBQzVFLDBHQUEwRztJQUMxRywwRUFBMEU7SUFDMUUsS0FBSztJQUNMLDBCQUEwQjtJQUMxQix3REFBd0Q7SUFDeEQsTUFBTTtJQUNOLHlEQUF5RDtJQUN6RCxtREFBbUQ7SUFDbkQsZ0JBQWdCO0lBQ2hCLElBQUk7SUFFSixNQUFNO0lBQ04sc0NBQXNDO0lBQ3RDLDZCQUE2QjtJQUM3QixLQUFLO0lBQ0wsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxLQUFLO0lBQ0wsNEVBQTRFO0lBQzVFLDBHQUEwRztJQUMxRywwRUFBMEU7SUFDMUUsS0FBSztJQUNMLDBCQUEwQjtJQUMxQix3REFBd0Q7SUFDeEQsTUFBTTtJQUNOLDJEQUEyRDtJQUMzRCxxREFBcUQ7SUFDckQsZ0NBQWdDO0lBQ2hDLGdCQUFnQjtJQUNoQixJQUFJO0lBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsT0FBWTtRQUN4QyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBQ25DLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FDbkIsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFO2dCQUNsQixNQUFNLGtDQUNDLE9BQU8sS0FDVixNQUFNO3dCQUNGLFlBQVksR0FBRyxJQUFJLENBQUM7b0JBQ3hCLENBQUM7b0JBQ0QsU0FBUyxDQUFDLElBQUk7d0JBQ1YsT0FBTyxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQixDQUFDLEdBQ0o7YUFDSixDQUFDLENBQ0wsQ0FBQztZQUNGLFVBQVUsQ0FBQyxHQUFHLEVBQUU7Z0JBQ1osSUFBSSxDQUFDLFlBQVk7b0JBQUUsTUFBTSxFQUFFLENBQUM7WUFDaEMsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRCxvQkFBb0IsQ0FBQyxJQUFZLEVBQUUsT0FBaUI7UUFDaEQsSUFBSSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTs7WUFDekMsYUFBYTtZQUNiLElBQUksQ0FBQyxDQUFBLE1BQUEsQ0FBQyxDQUFDLE1BQU0sMENBQUUsTUFBTSxDQUFBO2dCQUFFLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQ3pDLGFBQWE7WUFDYixDQUFDLENBQUMsTUFBTSxDQUFDLE1BQU0sRUFBRSxDQUFDO1lBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO1lBQzdCLGFBQWE7WUFDYixDQUFDLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUM1QixDQUFDLENBQUEsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHNCQUFzQixDQUFDLFFBQVEsRUFBRSxJQUFZLEVBQUUsT0FBaUI7UUFDNUQsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3ZDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxDQUFDLENBQUMsTUFBTSwwQ0FBRSxNQUFNLENBQUE7b0JBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztJQUVELHVCQUF1QixDQUFDLElBQVksRUFBRSxPQUFpQjtRQUNuRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxDQUFDLE9BQU8sRUFBRSxFQUFFO1lBQzlCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3ZDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxDQUFDLENBQUMsTUFBTSwwQ0FBRSxNQUFNLENBQUE7b0JBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDNUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNQLENBQUMsQ0FBQyxDQUFDO0lBQ1AsQ0FBQzs7QUE5YkQ7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0ksNkJBQWEsR0FBUSxFQUFFLENBQUM7QUFvS3hCLCtCQUFlLEdBQWEsRUFBRSxDQUFDO0FBc0IvQiwyQkFBVyxHQUFHLEVBQUUsQ0FBQyJ9