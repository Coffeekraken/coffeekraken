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
        var _a, _b, _c, _d, _e, _f;
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
        this._shouldUpdate = false;
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
        const defaultProps = __deepMerge((_d = (_c = this._settings.interface) === null || _c === void 0 ? void 0 : _c.defaults()) !== null && _d !== void 0 ? _d : {}, (_e = this._settings.defaultProps) !== null && _e !== void 0 ? _e : {}, (_f = this.constructor._defaultProps[this.name]) !== null && _f !== void 0 ? _f : {});
        const passedProps = {};
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
        // if (this._settings.interface) {
        //   this._settings.interface.definition = {
        //     ...this._settings.interface.definition,
        //     target: {
        //       type: 'String'
        //     }
        //   };
        //   Object.keys(this._settings.interface.definition).forEach(propName => {
        //     const obj = this._settings.interface.definition[propName];
        //     if (obj.type && (obj.type === 'Boolean' || obj.type === 'boolean')) {
        //       obj.type = {
        //         type: 'Boolean',
        //         nullishAsTrue: true
        //       }
        //       this._settings.interface.definition[propName] = obj;
        //     }
        //   });
        //   if (this.props.target) {
        //     if (!this.props.target.match(/^(\.|\[])/)) {
        //       this._targetSelector = `#${this.props.target}`;
        //     } else {
        //       this._targetSelector = this.props.target;
        //     }
        //     if (this._targetSelector) {
        //       const targets = Array.from(document.querySelectorAll(this._targetSelector));
        //       // @ts-ignore
        //       if (targets.length) this.$targets = targets;
        //     }
        //   }
        // }
        // __handlebars.registerHelper("striptags", function( txt ){
        //   // exit now if text is undefined 
        //   if(typeof txt == "undefined") return;
        //   // replacing the text
        //   return __striptags(txt);
        // });
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
        const $styles = document.querySelectorAll('style');
        if ($styles && this.node.shadowRoot) {
            const addedStyles = [];
            Array.from($styles).forEach($style => {
                var _a;
                if (Array.isArray(this.props.adoptStyles) && this.props.adoptStyles.indexOf((_a = $style.id) !== null && _a !== void 0 ? _a : '') === -1) {
                    return; // this style is not wanted...
                }
                const styleStr = new CSSStyleSheet();
                styleStr.replace($style.innerHTML);
                addedStyles.push(styleStr);
            });
            this.node.shadowRoot.adoptedStyleSheets = [...this.node.shadowRoot.adoptedStyleSheets, ...addedStyles];
        }
        const $links = document.querySelectorAll('link[rel="stylesheet"]');
        if ($links && this.node.shadowRoot) {
            Array.from($links).forEach($link => {
                var _a, _b;
                if (Array.isArray(this.props.adoptStyles) && this.props.adoptStyles.indexOf((_a = $link.id) !== null && _a !== void 0 ? _a : '') === -1) {
                    return; // this style is not wanted...
                }
                (_b = this.node.shadowRoot) === null || _b === void 0 ? void 0 : _b.appendChild($link.cloneNode());
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
     * @name          getAttributeSafely
     * @type          Function
     *
     * This method allows you to get an HTMLElement attribute safely.
     * It will check if it's a vue, react or another framework and will
     * get the attribute accordingly
     *
     * @param       {HTMLElement}       element       The element on which to get attribute
     * @param       {String}            attribute       The attribute name you want to get
     * @return      {Any}                               The attribute value getted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    getAttributeSafely(element, attribute) {
        var _a, _b, _c, _d;
        return ((_a = element.getAttribute) === null || _a === void 0 ? void 0 : _a.call(element, attribute)) || ((_d = (_c = (_b = element.__vnode) === null || _b === void 0 ? void 0 : _b.props) === null || _c === void 0 ? void 0 : _c.attrs) === null || _d === void 0 ? void 0 : _d[attribute]);
    }
    /**
     * @name          getDomPropertySafely
     * @type          Function
     *
     * This method allows you to get an HTMLElement attribute safely.
     * It will check if it's a vue, react or another framework and will
     * get the attribute accordingly
     *
     * @param       {HTMLElement}       element       The element on which to get attribute
     * @param       {String}            property       The property name you want to get
     * @return      {Any}                               The property value getted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    getDomPropertySafely(element, property) {
        var _a, _b;
        if ((_b = (_a = element.__vnode) === null || _a === void 0 ? void 0 : _a.props) === null || _b === void 0 ? void 0 : _b.domProps) {
            return element.__vnode.props.domProps[property];
        }
        return element[property];
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0NvbXBvbmVudFV0aWxzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU0NvbXBvbmVudFV0aWxzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sV0FBVyxNQUFNLDZDQUE2QyxDQUFDO0FBQ3RFLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBQzdDLHFDQUFxQztBQUNyQyxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLGdCQUFnQixNQUFNLGtEQUFrRCxDQUFDO0FBQ2hGLE9BQU8sTUFBTSxNQUFNLHNDQUFzQyxDQUFDO0FBeUMxRCxNQUFNLE9BQU8sK0JBQWdDLFNBQVEsWUFBWTs7QUFDeEQsMENBQVUsR0FBRztJQUNsQixTQUFTLEVBQUU7UUFDVCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7UUFDbEMsT0FBTyxFQUFFLFVBQVU7S0FDcEI7SUFDRCxXQUFXLEVBQUU7UUFDWCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO0tBQ2Q7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNqQixPQUFPLEVBQUUsS0FBSztLQUNmO0NBQ0YsQ0FBQTtBQUdILE1BQU0sQ0FBQyxPQUFPLE9BQU8sZUFBZ0IsU0FBUSxRQUFRO0lBdUVuRDs7Ozs7Ozs7O09BU0c7SUFDSCxZQUNFLElBQVksRUFDWixJQUFpQixFQUNqQixLQUFVLEVBQ1YsV0FBa0QsRUFBRTs7UUFFcEQsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLEVBQUUsUUFBUSxDQUFDLENBQUMsQ0FBQztRQXBEbkM7Ozs7Ozs7O1dBUUc7UUFDSCxhQUFRLEdBQWtCLEVBQUUsQ0FBQztRQUk3QixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQXlDcEIsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUNqQixJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxPQUFPO1lBQUUsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUN6RCxJQUFJLENBQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxPQUFPLDBDQUFFLFdBQVcsRUFBRSxNQUFLLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDOUQsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUMsVUFBVSxDQUFDO1NBQzdCO1FBRUQsUUFBUTtRQUNSLE1BQU0sWUFBWSxHQUFHLFdBQVcsQ0FDOUIsTUFBQSxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsU0FBUywwQ0FBRSxRQUFRLEVBQUUsbUNBQUksRUFBRSxFQUMxQyxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsWUFBWSxtQ0FBSSxFQUFFLEVBQ2pDLE1BQU0sSUFBSSxDQUFDLFdBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQ0FBSSxFQUFFLENBQ3ZELENBQUM7UUFDRixNQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7WUFDN0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLEVBQUU7O2dCQUMvQixJQUFJLEtBQUssQ0FBQztnQkFDVixJQUFJLENBQUEsTUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLDBDQUFFLFNBQVMsTUFBSyxTQUFTLEVBQUU7b0JBQ3ZDLElBQUksS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsS0FBSyxFQUFFO3dCQUFFLEtBQUssR0FBRyxJQUFJLENBQUM7O3dCQUN6QyxLQUFLLEdBQUcsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFNBQVMsQ0FBQztpQkFDbkM7Z0JBQ0QsSUFBSSxDQUFDLEtBQUs7b0JBQUUsT0FBTztnQkFDbkIsV0FBVyxDQUFDLFdBQVcsQ0FBQyxNQUFBLE1BQUEsS0FBSyxDQUFDLEdBQUcsQ0FBQywwQ0FBRSxJQUFJLG1DQUFJLEdBQUcsQ0FBQyxDQUFDLEdBQUcsS0FBSyxDQUFDO1lBQzVELENBQUMsQ0FBQyxDQUFDO1NBQ0o7YUFBTTtZQUNMLFdBQVcsR0FBRyxLQUFLLENBQUM7U0FDckI7UUFDRCxJQUFJLENBQUMsS0FBSyxHQUFHLFdBQVcsQ0FBQyxZQUFZLEVBQUUsV0FBVyxDQUFDLENBQUM7UUFFcEQsOEJBQThCO1FBQzlCLFFBQU8sSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTLEVBQUU7WUFDM0IsS0FBSyxZQUFZO2dCQUNmLENBQUMsR0FBUyxFQUFFO29CQUNWLE1BQU0sZ0JBQWdCLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2YsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO2dCQUNQLE1BQU07WUFDTixLQUFLLFVBQVUsQ0FBQztZQUNoQjtnQkFDRSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7Z0JBQ2YsTUFBTTtTQUNQO1FBSUQsa0NBQWtDO1FBQ2xDLDRDQUE0QztRQUM1Qyw4Q0FBOEM7UUFDOUMsZ0JBQWdCO1FBQ2hCLHVCQUF1QjtRQUN2QixRQUFRO1FBQ1IsT0FBTztRQUNQLDJFQUEyRTtRQUMzRSxpRUFBaUU7UUFDakUsNEVBQTRFO1FBQzVFLHFCQUFxQjtRQUNyQiwyQkFBMkI7UUFDM0IsOEJBQThCO1FBQzlCLFVBQVU7UUFDViw2REFBNkQ7UUFDN0QsUUFBUTtRQUNSLFFBQVE7UUFFUiw2QkFBNkI7UUFDN0IsbURBQW1EO1FBQ25ELHdEQUF3RDtRQUN4RCxlQUFlO1FBQ2Ysa0RBQWtEO1FBQ2xELFFBQVE7UUFDUixrQ0FBa0M7UUFDbEMscUZBQXFGO1FBQ3JGLHNCQUFzQjtRQUN0QixxREFBcUQ7UUFDckQsUUFBUTtRQUNSLE1BQU07UUFFTixJQUFJO1FBRUosNERBQTREO1FBQzVELHNDQUFzQztRQUN0QywwQ0FBMEM7UUFDMUMsMEJBQTBCO1FBQzFCLDZCQUE2QjtRQUU3QixNQUFNO0lBRVIsQ0FBQztJQS9HRCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQWdCLEVBQUUsS0FBVTtRQUNqRCxJQUFJLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxHQUFHLEtBQUssQ0FBQztJQUN2QyxDQUFDO0lBK0dLLEtBQUs7OztZQUNULElBQUksQ0FBQyxZQUFZLEdBQUcsSUFBSSxDQUFDO1lBQ3pCLE1BQUEsTUFBQSxJQUFJLENBQUMsSUFBSSxFQUFDLGFBQWEsa0RBQUksQ0FBQyxDQUFDLG9CQUFvQjtZQUNqRCxNQUFNLE1BQU0sRUFBRSxDQUFDO1lBQ2YseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXO2dCQUFFLElBQUksQ0FBQyxZQUFZLEVBQUUsQ0FBQztZQUNoRCxNQUFNLE1BQU0sRUFBRSxDQUFDO1lBQ2YsYUFBYTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFdBQVcsRUFBRSxJQUFJLENBQUMsQ0FBQzs7S0FDM0M7SUFFRCxZQUFZO1FBQ1IsTUFBTSxPQUFPLEdBQUcsUUFBUSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sQ0FBQyxDQUFDO1FBQ25ELElBQUksT0FBTyxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ25DLE1BQU0sV0FBVyxHQUFvQixFQUFFLENBQUM7WUFDeEMsS0FBSyxDQUFDLElBQUksQ0FBQyxPQUFPLENBQUMsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEVBQUU7O2dCQUNuQyxJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxPQUFPLENBQUMsTUFBQSxNQUFNLENBQUMsRUFBRSxtQ0FBSSxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtvQkFDbkcsT0FBTyxDQUFDLDhCQUE4QjtpQkFDdkM7Z0JBQ0QsTUFBTSxRQUFRLEdBQUcsSUFBSSxhQUFhLEVBQUUsQ0FBQztnQkFDckMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUM7Z0JBQ25DLFdBQVcsQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLENBQUM7WUFDN0IsQ0FBQyxDQUFDLENBQUE7WUFDRixJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQyxrQkFBa0IsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsa0JBQWtCLEVBQUUsR0FBRyxXQUFXLENBQUMsQ0FBQztTQUN4RztRQUNELE1BQU0sTUFBTSxHQUFHLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQ25FLElBQUksTUFBTSxJQUFJLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQ2xDLEtBQUssQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxFQUFFOztnQkFDakMsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsT0FBTyxDQUFDLE1BQUEsS0FBSyxDQUFDLEVBQUUsbUNBQUksRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7b0JBQ2xHLE9BQU8sQ0FBQyw4QkFBOEI7aUJBQ3ZDO2dCQUNELE1BQUEsSUFBSSxDQUFDLElBQUksQ0FBQyxVQUFVLDBDQUFFLFdBQVcsQ0FBQyxLQUFLLENBQUMsU0FBUyxFQUFFLENBQUMsQ0FBQztZQUN2RCxDQUFDLENBQUMsQ0FBQztTQUNKO0lBQ0wsQ0FBQztJQUVELFNBQVMsQ0FBQyxNQUFXO1FBQ25CLFVBQVUsQ0FBQyxHQUFHLEVBQUU7O1lBQ2QsSUFBSSxHQUFHLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQztZQUNwQixhQUFhO1lBQ2IsSUFBSSxNQUFBLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSwwQ0FBRSxVQUFVLEVBQUUsRUFBRSxpREFBaUQ7Z0JBQ3ZGLGFBQWE7Z0JBQ2IsR0FBRyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDO2FBQzVCO1lBQ0QsTUFBTSxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLEVBQUU7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztnQkFDaEMsR0FBRyxDQUFDLFNBQVMsQ0FBQyxHQUFHLEtBQUssQ0FBQztZQUN6QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsa0JBQWtCLENBQUMsT0FBb0IsRUFBRSxTQUFpQjs7UUFDeEQsT0FBTyxDQUFBLE1BQUEsT0FBTyxDQUFDLFlBQVksK0NBQXBCLE9BQU8sRUFBZ0IsU0FBUyxDQUFDLE1BQUksTUFBQSxNQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sMENBQUUsS0FBSywwQ0FBRSxLQUFLLDBDQUFHLFNBQVMsQ0FBQyxDQUFBLENBQUM7SUFDekYsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsb0JBQW9CLENBQUMsT0FBb0IsRUFBRSxRQUFnQjs7UUFFekQsSUFBSSxNQUFBLE1BQUEsT0FBTyxDQUFDLE9BQU8sMENBQUUsS0FBSywwQ0FBRSxRQUFRLEVBQUU7WUFDcEMsT0FBTyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsUUFBUSxDQUFDLENBQUM7U0FDakQ7UUFFRCxPQUFPLE9BQU8sQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUczQixDQUFDO0lBRUQ7Ozs7Ozs7Ozs7O09BV0c7SUFDSCxTQUFTLENBQUMsR0FBRyxHQUFHLEVBQUUsRUFBRSxLQUFLLEdBQUcsRUFBRTtRQUM1QixJQUFJLFNBQVMsR0FBRyxHQUFHO2FBQ2hCLEtBQUssQ0FBQyxHQUFHLENBQUM7YUFDVixHQUFHLENBQ0YsQ0FBQyxPQUFPLEVBQUUsRUFBRSxDQUNWLEdBQUcsSUFBSSxDQUFDLElBQUksR0FBRyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsR0FBRyxPQUFPLEVBQUUsQ0FDekU7YUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFYixJQUFJLEtBQUssSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLFlBQVksRUFBRTtZQUNwQyxTQUFTLElBQUksSUFBSSxLQUFLLEVBQUUsQ0FBQztTQUMxQjtRQUVELE9BQU8sU0FBUyxDQUFDO0lBQ25CLENBQUM7SUFFRCxVQUFVLENBQUMsS0FBSztRQUNkLE1BQU0sQ0FBQyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDN0MsQ0FBQyxDQUFDLFNBQVMsR0FBRyxLQUFLLENBQUM7UUFDcEIsNkJBQTZCO1FBQzdCLE9BQU8sQ0FBQyxDQUFDLFVBQVUsQ0FBQyxNQUFNLEtBQUssQ0FBQyxDQUFDLENBQUMsQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQyxVQUFVLENBQUMsQ0FBQyxDQUFDLENBQUMsU0FBUyxDQUFDO0lBQ3BFLENBQUM7SUFFRCxNQUFNO0lBQ04sb0NBQW9DO0lBQ3BDLDZCQUE2QjtJQUM3QixLQUFLO0lBQ0wsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxLQUFLO0lBQ0wsNEVBQTRFO0lBQzVFLDBHQUEwRztJQUMxRywwRUFBMEU7SUFDMUUsS0FBSztJQUNMLDBCQUEwQjtJQUMxQix3REFBd0Q7SUFDeEQsTUFBTTtJQUNOLHlEQUF5RDtJQUN6RCxtREFBbUQ7SUFDbkQsZ0JBQWdCO0lBQ2hCLElBQUk7SUFFSixNQUFNO0lBQ04sc0NBQXNDO0lBQ3RDLDZCQUE2QjtJQUM3QixLQUFLO0lBQ0wsOERBQThEO0lBQzlELG1DQUFtQztJQUNuQyxLQUFLO0lBQ0wsNEVBQTRFO0lBQzVFLDBHQUEwRztJQUMxRywwRUFBMEU7SUFDMUUsS0FBSztJQUNMLDBCQUEwQjtJQUMxQix3REFBd0Q7SUFDeEQsTUFBTTtJQUNOLDJEQUEyRDtJQUMzRCxxREFBcUQ7SUFDckQsZ0NBQWdDO0lBQ2hDLGdCQUFnQjtJQUNoQixJQUFJO0lBRUo7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxpQkFBaUIsQ0FBQyxJQUFZLEVBQUUsT0FBWTtRQUMxQyxPQUFPLElBQUksT0FBTyxDQUFDLENBQUMsT0FBTyxFQUFFLE1BQU0sRUFBRSxFQUFFO1lBRXJDLElBQUksWUFBWSxHQUFHLEtBQUssQ0FBQztZQUV6QixJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUU7Z0JBQzVDLE1BQU0sa0NBQ0QsT0FBTyxLQUNWLE1BQU07d0JBQ0osWUFBWSxHQUFHLElBQUksQ0FBQztvQkFDdEIsQ0FBQztvQkFDRCxTQUFTLENBQUMsSUFBSTt3QkFDWixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ2hCLENBQUMsR0FDRjthQUNGLENBQUMsQ0FBQyxDQUFDO1lBQ0osVUFBVSxDQUFDLEdBQUcsRUFBRTtnQkFDZCxJQUFJLENBQUMsWUFBWTtvQkFBRSxNQUFNLEVBQUUsQ0FBQztZQUM5QixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUVELG9CQUFvQixDQUFDLElBQVksRUFBRSxPQUFpQjtRQUNsRCxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixDQUFDLElBQUksRUFBRSxDQUFPLENBQUMsRUFBRSxFQUFFOztZQUMzQyxhQUFhO1lBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxDQUFDLENBQUMsTUFBTSwwQ0FBRSxNQUFNLENBQUE7Z0JBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDekMsYUFBYTtZQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7WUFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDN0IsYUFBYTtZQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7SUFDTCxDQUFDO0lBRUQsc0JBQXNCLENBQUMsUUFBUSxFQUFFLElBQVksRUFBRSxPQUFpQjtRQUM5RCxRQUFRLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ3pCLE9BQU8sQ0FBQyxnQkFBZ0IsQ0FBQyxJQUFJLEVBQUUsQ0FBTyxDQUFDLEVBQUUsRUFBRTs7Z0JBQ3pDLGFBQWE7Z0JBQ2IsSUFBSSxDQUFDLENBQUEsTUFBQSxDQUFDLENBQUMsTUFBTSwwQ0FBRSxNQUFNLENBQUE7b0JBQUUsT0FBTyxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ3pDLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsTUFBTSxHQUFHLEdBQUcsTUFBTSxPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQzdCLGFBQWE7Z0JBQ2IsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7WUFDMUIsQ0FBQyxDQUFBLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFBO0lBQ0osQ0FBQztJQUVELHVCQUF1QixDQUFDLElBQVksRUFBRSxPQUFpQjtRQUNyRCxJQUFJLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsRUFBRTtZQUM5QixPQUFPLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLENBQU8sQ0FBQyxFQUFFLEVBQUU7O2dCQUN6QyxhQUFhO2dCQUNiLElBQUksQ0FBQyxDQUFBLE1BQUEsQ0FBQyxDQUFDLE1BQU0sMENBQUUsTUFBTSxDQUFBO29CQUFFLE9BQU8sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUN6QyxhQUFhO2dCQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsTUFBTSxFQUFFLENBQUM7Z0JBQ2xCLE1BQU0sR0FBRyxHQUFHLE1BQU0sT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUM3QixhQUFhO2dCQUNiLENBQUMsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1lBQzFCLENBQUMsQ0FBQSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQTtJQUNKLENBQUM7O0FBelhEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNJLDZCQUFhLEdBQVEsRUFBRSxDQUFDIn0=