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
import __SComponentUtils, { SComponentUtilsDefaultPropsInterface, } from '@coffeekraken/s-component-utils';
import { __wait } from '@coffeekraken/sugar/datetime';
import { __querySelectorLive } from '@coffeekraken/sugar/dom';
import { __deepMerge } from '@coffeekraken/sugar/object';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import { LitElement } from 'lit';
let _debug = false;
export default class SLitComponent extends LitElement {
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
    constructor(settings = {}) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        super();
        /**
         * @name            settings
         * @type            Object
         * @private
         *
         * Store the settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.settings = {};
        /**
         * @name            props
         * @type            Object
         *
         * Store the component props
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this.props = {};
        this._shouldUpdate = false;
        this._state = {};
        this.settings = __deepMerge({
            componentUtils: {},
            shadowDom: false,
            get rootNode() {
                var _a;
                return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
            },
        }, settings);
        // init default state
        if (this.constructor.state) {
            this.state = Object.assign({}, this.constructor.state);
        }
        // shadow handler
        if (this.settings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
        }
        // make sure the injected styles stays BEFORE the link[rel="stylesheet"]
        // to avoid style override
        if (!SLitComponent._keepInjectedCssBeforeStylesheetLinksInited) {
            const $firstStylesheetLink = document.head.querySelector('link[rel="stylesheet"]');
            __querySelectorLive('style', ($style) => {
                if ($firstStylesheetLink) {
                    document.head.insertBefore($style, $firstStylesheetLink);
                }
            }, {
                rootNode: document.head,
            });
            SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = true;
        }
        // @ts-ignore
        const nodeFirstUpdated = (_a = this.firstUpdated) === null || _a === void 0 ? void 0 : _a.bind(this);
        // @ts-ignore
        this.firstUpdated = () => __awaiter(this, void 0, void 0, function* () {
            if (nodeFirstUpdated) {
                yield nodeFirstUpdated();
            }
            // set the component as mounted
            // @ts-ignore
            this.props.mounted = true;
        });
        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = (_b = this.shouldUpdate) === null || _b === void 0 ? void 0 : _b.bind(this);
        // @ts-ignore
        this.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res)
                    return false;
            }
            return this._shouldUpdate;
        };
        this.componentUtils = new __SComponentUtils(this, Object.assign(Object.assign(Object.assign({}, ((_c = this.settings) !== null && _c !== void 0 ? _c : {})), ((_d = this.settings.componentUtils) !== null && _d !== void 0 ? _d : {})), { style: (_j = (_g = (_f = (_e = this.constructor.styles) === null || _e === void 0 ? void 0 : _e.cssText) !== null && _f !== void 0 ? _f : this.settings.style) !== null && _g !== void 0 ? _g : (_h = this.settings.componentUtils) === null || _h === void 0 ? void 0 : _h.style) !== null && _j !== void 0 ? _j : '' }));
        (() => __awaiter(this, void 0, void 0, function* () {
            var _k, _l;
            const defaultProps = __SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
            const mountWhen = (_l = (_k = this.getAttribute('mount-when')) !== null && _k !== void 0 ? _k : defaultProps.mountWhen) !== null && _l !== void 0 ? _l : 'direct';
            // component class
            this.classList.add(...this.componentUtils.className('').split(' '));
            yield __wait();
            yield __wait();
            if (!mountWhen.match(/^direct(ly)?$/)) {
                // wait until mount
                yield this.componentUtils.waitAndExecute(mountWhen, () => {
                    this._mount();
                });
            }
            else {
                this._mount();
            }
        }))();
    }
    get state() {
        return this._state;
    }
    set state(state) {
        Object.assign(this._state, state);
    }
    /**
     * @name            define
     * @type            Function
     * @static
     *
     * This static method allows you to define a custom element just like the `customElement.define` does.
     * The trick is that this define method will not initialize the component directly. It will
     * wait until it is near the viewport before actually creating a new element names "%tagName-up".
     * This will be the custom element that is registered and that will replace your "%tagName" HTMLElement.
     *
     * @param
     * @param       {Any}           props          The initial props to apply to your custom element
     * @param       {String}        tagName         The tagname you want to search in the DOM
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static define(tagName, Cls, props = {}, settings = {}) {
        var _a;
        const win = (_a = settings.window) !== null && _a !== void 0 ? _a : window;
        if (win.customElements.get(tagName.toLowerCase())) {
            return;
        }
        // set the default props
        SLitComponent.setDefaultProps(tagName, props);
        win.customElements.define(tagName.toLowerCase(), class extends Cls {
        });
        // // register the custom element with the suffix "-up"
        // try {
        //     customElements.define(`${tagName}-up`, Cls);
        // } catch (e) {}
        // function copyAttributes($source, $target) {
        //     return Array.from($source.attributes).forEach((attribute) => {
        //         // if ($target[attribute.name] !== undefined) {
        //         //     $target[attribute.name] = attribute.nodeValue;
        //         // }
        //         $target.setAttribute(attribute.name, attribute.nodeValue);
        //     });
        // }
        // __querySelectorLive(tagName, ($elm) => {
        //     const $node = document.createElement(`${tagName}-up`);
        //     $node.classList.add($elm.tagName.toLowerCase().replace(/-up$/, ''));
        //     copyAttributes($elm, $node);
        //     while ($elm.childNodes.length > 0) {
        //         $node.appendChild($elm.childNodes[0]);
        //     }
        //     $elm.parentNode.insertBefore($node, $elm.nextSibling);
        //     $elm.remove();
        // });
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
    static setDefaultProps(selector, props) {
        __SComponentUtils.setDefaultProps(selector, props);
    }
    static createProperties(properties, int) {
        var _a;
        const propertiesObj = {};
        class SLitComponentPropsInterface extends SComponentUtilsDefaultPropsInterface {
        }
        SLitComponentPropsInterface.definition = Object.assign(Object.assign({}, SLitComponentPropsInterface.definition), ((_a = int === null || int === void 0 ? void 0 : int.definition) !== null && _a !== void 0 ? _a : {}));
        // @ts-ignore
        Object.keys(SLitComponentPropsInterface.definition).forEach((prop) => {
            var _a, _b, _c, _d, _e, _f, _g, _h;
            // @ts-ignore
            const definition = SLitComponentPropsInterface.definition[prop];
            propertiesObj[prop] = Object.assign({}, ((_a = definition.lit) !== null && _a !== void 0 ? _a : {}));
            let type = String, typeStr = (_c = (_b = definition.type) === null || _b === void 0 ? void 0 : _b.type) !== null && _c !== void 0 ? _c : definition.type;
            switch (typeStr.toLowerCase()) {
                case 'boolean':
                    type = Boolean;
                    break;
                case 'object':
                    type = Object;
                    break;
                case 'number':
                    type = Number;
                    break;
                default:
                    if (typeStr.match(/\[\]$/)) {
                        type = Array;
                    }
                    break;
            }
            // const type = definition.type?.type ?? definition.type ?? 'string';
            // set the type
            propertiesObj[prop].type = type;
            // set the default value
            propertiesObj[prop].default = definition.default;
            // handle physical and boolean attributes
            if (definition.physical ||
                ((_e = (_d = definition.type) === null || _d === void 0 ? void 0 : _d.toLowerCase) === null || _e === void 0 ? void 0 : _e.call(_d)) === 'boolean' ||
                ((_h = (_g = (_f = definition.type) === null || _f === void 0 ? void 0 : _f.type) === null || _g === void 0 ? void 0 : _g.toLowerCase) === null || _h === void 0 ? void 0 : _h.call(_g)) === 'boolean') {
                propertiesObj[prop].reflect = true;
                propertiesObj[prop].attribute = __dashCase(prop);
                propertiesObj[prop].converter = {
                    fromAttribute: (value, type) => {
                        if (value === 'true' || value === '')
                            return true;
                        return value;
                    },
                    toAttribute(value) {
                        if (value === 'false' ||
                            value === false ||
                            value === null) {
                            return null;
                        }
                        return String(value);
                    },
                };
            }
        });
        const props = Object.assign(Object.assign({}, propertiesObj), (properties !== null && properties !== void 0 ? properties : {}));
        return props;
    }
    /**
     * @name            mount
     * @type            Function
     * @async
     *
     * This method allows you to actually mount your feature behavior.
     * It will be called depending on the "mountWhen" setting setted.
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    _mount() {
        var _a, _b, _c;
        return __awaiter(this, void 0, void 0, function* () {
            const _this = this, defaultProps = __SComponentUtils.getDefaultProps(this.tagName.toLowerCase());
            let properties = this.constructor.properties;
            if (!properties) {
                properties = this.constructor.createProperties();
            }
            // this.props stack
            let finalProps = {};
            for (let [prop, obj] of Object.entries(properties)) {
                Object.defineProperty(this.props, prop, {
                    enumerable: true,
                    get() {
                        return _this[prop];
                    },
                    set(value) {
                        _this[prop] = value;
                    },
                });
                let attrValue = this.getAttribute(__dashCase(prop));
                if (attrValue !== null) {
                    if (attrValue === 'false')
                        attrValue = false;
                    if (attrValue === '')
                        attrValue = true;
                    finalProps[prop] = attrValue;
                }
                // default props
                if (finalProps[prop] === undefined && this[prop] === undefined) {
                    finalProps[prop] = (_a = defaultProps[prop]) !== null && _a !== void 0 ? _a : obj.default;
                }
            }
            if (this.settings.interface) {
                finalProps = this.settings.interface.apply(finalProps);
            }
            Object.assign(this.props, finalProps);
            // make props responsive
            this.componentUtils.makePropsResponsive(this.props);
            // handle state if needed
            if (this.state) {
                this.state = this.componentUtils.handleState(this.state, {
                    save: this.props.saveState,
                });
                this.state.$set('*', () => {
                    this.requestUpdate();
                });
            }
            // verbose
            if (this.props.verbose) {
                console.log(`[${this.tagName.toLowerCase()}]${this.id ? ` #${this.id} ` : ' '}mounting`);
            }
            // custom mount function
            if (this.mount && typeof this.mount === 'function') {
                yield this.mount();
            }
            // set the not as updatable
            this._shouldUpdate = true;
            // @ts-ignore
            this.requestUpdate();
            yield this.updateComplete;
            this.componentUtils.injectStyle((_c = (_b = this.constructor.styles) === null || _b === void 0 ? void 0 : _b.cssText) !== null && _c !== void 0 ? _c : '', this.tagName);
            yield __wait();
            if (this.props.adoptStyle && this.shadowRoot) {
                yield this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxnRUFBZ0U7Ozs7Ozs7Ozs7QUFHaEUsT0FBTyxpQkFBaUIsRUFBRSxFQUN0QixvQ0FBb0MsR0FDdkMsTUFBTSxpQ0FBaUMsQ0FBQztBQUV6QyxPQUFPLEVBQUUsTUFBTSxFQUFFLE1BQU0sOEJBQThCLENBQUM7QUFDdEQsT0FBTyxFQUFFLG1CQUFtQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDOUQsT0FBTyxFQUFFLFdBQVcsRUFBRSxNQUFNLDRCQUE0QixDQUFDO0FBQ3pELE9BQU8sVUFBVSxNQUFNLDRDQUE0QyxDQUFDO0FBQ3BFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFjakMsSUFBSSxNQUFNLEdBQUcsS0FBSyxDQUFDO0FBV25CLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFVBQVU7SUFtTWpEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBNEMsRUFBRTs7UUFDdEQsS0FBSyxFQUFFLENBQUM7UUEzTVo7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVkOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUVoQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUV0QixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBb0xSLElBQUksQ0FBQyxRQUFRLEdBQUcsV0FBVyxDQUN2QjtZQUNJLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLElBQUksUUFBUTs7Z0JBQ1IsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzRCxDQUFDO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxRDtRQUVELGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxLQUFLLEtBQUssRUFBRTtZQUNuQyxJQUFJLENBQUMsZ0JBQWdCLEdBQUcsR0FBRyxFQUFFO2dCQUN6QixPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDLENBQUM7U0FDTDtRQUVELHdFQUF3RTtRQUN4RSwwQkFBMEI7UUFDMUIsSUFBSSxDQUFDLGFBQWEsQ0FBQywyQ0FBMkMsRUFBRTtZQUM1RCxNQUFNLG9CQUFvQixHQUFHLFFBQVEsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUNwRCx3QkFBd0IsQ0FDM0IsQ0FBQztZQUNGLG1CQUFtQixDQUNmLE9BQU8sRUFDUCxDQUFDLE1BQU0sRUFBRSxFQUFFO2dCQUNQLElBQUksb0JBQW9CLEVBQUU7b0JBQ3RCLFFBQVEsQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUN0QixNQUFNLEVBQ04sb0JBQW9CLENBQ3ZCLENBQUM7aUJBQ0w7WUFDTCxDQUFDLEVBQ0Q7Z0JBQ0ksUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJO2FBQzFCLENBQ0osQ0FBQztZQUNGLGFBQWEsQ0FBQywyQ0FBMkMsR0FBRyxJQUFJLENBQUM7U0FDcEU7UUFFRCxhQUFhO1FBQ2IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFTLEVBQUU7WUFDM0IsSUFBSSxnQkFBZ0IsRUFBRTtnQkFDbEIsTUFBTSxnQkFBZ0IsRUFBRSxDQUFDO2FBQzVCO1lBQ0QsK0JBQStCO1lBQy9CLGFBQWE7WUFDYixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQyxDQUFBLENBQUM7UUFFRiwwQkFBMEI7UUFDMUIsYUFBYTtRQUNiLE1BQU0sZ0JBQWdCLEdBQUcsTUFBQSxJQUFJLENBQUMsWUFBWSwwQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7UUFDdkQsYUFBYTtRQUNiLElBQUksQ0FBQyxZQUFZLEdBQUcsR0FBRyxFQUFFO1lBQ3JCLElBQUksZ0JBQWdCLEVBQUU7Z0JBQ2xCLE1BQU0sR0FBRyxHQUFHLGdCQUFnQixFQUFFLENBQUM7Z0JBQy9CLElBQUksQ0FBQyxHQUFHO29CQUFFLE9BQU8sS0FBSyxDQUFDO2FBQzFCO1lBQ0QsT0FBTyxJQUFJLENBQUMsYUFBYSxDQUFDO1FBQzlCLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLGdEQUN6QyxDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLEdBQ3JCLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUFDLEtBQ3ZDLEtBQUssRUFDRCxNQUFBLE1BQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSwwQ0FBRSxPQUFPLG1DQUNoQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssbUNBQ25CLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLDBDQUFFLEtBQUssbUNBQ25DLEVBQUUsSUFDUixDQUFDO1FBRUgsQ0FBQyxHQUFTLEVBQUU7O1lBQ1IsTUFBTSxZQUFZLEdBQUcsaUJBQWlCLENBQUMsZUFBZSxDQUNsRCxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUM3QixDQUFDO1lBQ0YsTUFBTSxTQUFTLEdBQ1gsTUFBQSxNQUFBLElBQUksQ0FBQyxZQUFZLENBQUMsWUFBWSxDQUFDLG1DQUMvQixZQUFZLENBQUMsU0FBUyxtQ0FDdEIsUUFBUSxDQUFDO1lBRWIsa0JBQWtCO1lBQ2xCLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7WUFFcEUsTUFBTSxNQUFNLEVBQUUsQ0FBQztZQUNmLE1BQU0sTUFBTSxFQUFFLENBQUM7WUFDZixJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxlQUFlLENBQUMsRUFBRTtnQkFDbkMsbUJBQW1CO2dCQUNuQixNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUFDLFNBQVMsRUFBRSxHQUFHLEVBQUU7b0JBQ3JELElBQUksQ0FBQyxNQUFNLEVBQUUsQ0FBQztnQkFDbEIsQ0FBQyxDQUFDLENBQUM7YUFDTjtpQkFBTTtnQkFDSCxJQUFJLENBQUMsTUFBTSxFQUFFLENBQUM7YUFDakI7UUFDTCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBMVJELElBQUksS0FBSztRQUNMLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN2QixDQUFDO0lBQ0QsSUFBSSxLQUFLLENBQUMsS0FBSztRQUNYLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN0QyxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7Ozs7T0FnQkc7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUNULE9BQWUsRUFDZixHQUFrQixFQUNsQixRQUFhLEVBQUUsRUFDZixXQUFrRCxFQUFFOztRQUVwRCxNQUFNLEdBQUcsR0FBRyxNQUFBLFFBQVEsQ0FBQyxNQUFNLG1DQUFJLE1BQU0sQ0FBQztRQUV0QyxJQUFJLEdBQUcsQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxXQUFXLEVBQUUsQ0FBQyxFQUFFO1lBQy9DLE9BQU87U0FDVjtRQUVELHdCQUF3QjtRQUN4QixhQUFhLENBQUMsZUFBZSxDQUFDLE9BQU8sRUFBRSxLQUFLLENBQUMsQ0FBQztRQUM5QyxHQUFHLENBQUMsY0FBYyxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLEVBQUUsS0FBTSxTQUFRLEdBQUc7U0FBRyxDQUFDLENBQUM7UUFFdkUsdURBQXVEO1FBQ3ZELFFBQVE7UUFDUixtREFBbUQ7UUFDbkQsaUJBQWlCO1FBRWpCLDhDQUE4QztRQUM5QyxxRUFBcUU7UUFDckUsMERBQTBEO1FBQzFELGdFQUFnRTtRQUNoRSxlQUFlO1FBQ2YscUVBQXFFO1FBQ3JFLFVBQVU7UUFDVixJQUFJO1FBRUosMkNBQTJDO1FBQzNDLDZEQUE2RDtRQUM3RCwyRUFBMkU7UUFDM0UsbUNBQW1DO1FBQ25DLDJDQUEyQztRQUMzQyxpREFBaUQ7UUFDakQsUUFBUTtRQUNSLDZEQUE2RDtRQUM3RCxxQkFBcUI7UUFDckIsTUFBTTtJQUNWLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRCxNQUFNLENBQUMsZ0JBQWdCLENBQUMsVUFBZSxFQUFFLEdBQWlCOztRQUN0RCxNQUFNLGFBQWEsR0FBRyxFQUFFLENBQUM7UUFFekIsTUFBTSwyQkFBNEIsU0FBUSxvQ0FBb0M7U0FBRztRQUVqRiwyQkFBMkIsQ0FBQyxVQUFVLG1DQUMvQiwyQkFBMkIsQ0FBQyxVQUFVLEdBQ3RDLENBQUMsTUFBQSxHQUFHLGFBQUgsR0FBRyx1QkFBSCxHQUFHLENBQUUsVUFBVSxtQ0FBSSxFQUFFLENBQUMsQ0FDN0IsQ0FBQztRQUVGLGFBQWE7UUFDYixNQUFNLENBQUMsSUFBSSxDQUFDLDJCQUEyQixDQUFDLFVBQVUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFOztZQUNqRSxhQUFhO1lBQ2IsTUFBTSxVQUFVLEdBQUcsMkJBQTJCLENBQUMsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2hFLGFBQWEsQ0FBQyxJQUFJLENBQUMscUJBQ1osQ0FBQyxNQUFBLFVBQVUsQ0FBQyxHQUFHLG1DQUFJLEVBQUUsQ0FBQyxDQUM1QixDQUFDO1lBRUYsSUFBSSxJQUFJLEdBQUcsTUFBTSxFQUNiLE9BQU8sR0FBRyxNQUFBLE1BQUEsVUFBVSxDQUFDLElBQUksMENBQUUsSUFBSSxtQ0FBSSxVQUFVLENBQUMsSUFBSSxDQUFDO1lBQ3ZELFFBQVEsT0FBTyxDQUFDLFdBQVcsRUFBRSxFQUFFO2dCQUMzQixLQUFLLFNBQVM7b0JBQ1YsSUFBSSxHQUFHLE9BQU8sQ0FBQztvQkFDZixNQUFNO2dCQUNWLEtBQUssUUFBUTtvQkFDVCxJQUFJLEdBQUcsTUFBTSxDQUFDO29CQUNkLE1BQU07Z0JBQ1YsS0FBSyxRQUFRO29CQUNULElBQUksR0FBRyxNQUFNLENBQUM7b0JBQ2QsTUFBTTtnQkFDVjtvQkFDSSxJQUFJLE9BQU8sQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEVBQUU7d0JBQ3hCLElBQUksR0FBRyxLQUFLLENBQUM7cUJBQ2hCO29CQUNELE1BQU07YUFDYjtZQUVELHFFQUFxRTtZQUVyRSxlQUFlO1lBQ2YsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7WUFFaEMsd0JBQXdCO1lBQ3hCLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsVUFBVSxDQUFDLE9BQU8sQ0FBQztZQUVqRCx5Q0FBeUM7WUFDekMsSUFDSSxVQUFVLENBQUMsUUFBUTtnQkFDbkIsQ0FBQSxNQUFBLE1BQUEsVUFBVSxDQUFDLElBQUksMENBQUUsV0FBVyxrREFBSSxNQUFLLFNBQVM7Z0JBQzlDLENBQUEsTUFBQSxNQUFBLE1BQUEsVUFBVSxDQUFDLElBQUksMENBQUUsSUFBSSwwQ0FBRSxXQUFXLGtEQUFJLE1BQUssU0FBUyxFQUN0RDtnQkFDRSxhQUFhLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztnQkFDbkMsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDLFNBQVMsR0FBRyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQ2pELGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQyxTQUFTLEdBQUc7b0JBQzVCLGFBQWEsRUFBRSxDQUFDLEtBQUssRUFBRSxJQUFJLEVBQUUsRUFBRTt3QkFDM0IsSUFBSSxLQUFLLEtBQUssTUFBTSxJQUFJLEtBQUssS0FBSyxFQUFFOzRCQUFFLE9BQU8sSUFBSSxDQUFDO3dCQUNsRCxPQUFPLEtBQUssQ0FBQztvQkFDakIsQ0FBQztvQkFDRCxXQUFXLENBQUMsS0FBSzt3QkFDYixJQUNJLEtBQUssS0FBSyxPQUFPOzRCQUNqQixLQUFLLEtBQUssS0FBSzs0QkFDZixLQUFLLEtBQUssSUFBSSxFQUNoQjs0QkFDRSxPQUFPLElBQUksQ0FBQzt5QkFDZjt3QkFDRCxPQUFPLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQztvQkFDekIsQ0FBQztpQkFDSixDQUFDO2FBQ0w7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUVILE1BQU0sS0FBSyxtQ0FDSixhQUFhLEdBQ2IsQ0FBQyxVQUFVLGFBQVYsVUFBVSxjQUFWLFVBQVUsR0FBSSxFQUFFLENBQUMsQ0FDeEIsQ0FBQztRQUVGLE9BQU8sS0FBSyxDQUFDO0lBQ2pCLENBQUM7SUF3SEQ7Ozs7Ozs7Ozs7T0FVRztJQUVHLE1BQU07OztZQUNSLE1BQU0sS0FBSyxHQUFHLElBQUksRUFDZCxZQUFZLEdBQUcsaUJBQWlCLENBQUMsZUFBZSxDQUM1QyxJQUFJLENBQUMsT0FBTyxDQUFDLFdBQVcsRUFBRSxDQUM3QixDQUFDO1lBRU4sSUFBSSxVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxVQUFVLENBQUM7WUFDN0MsSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDYixVQUFVLEdBQUcsSUFBSSxDQUFDLFdBQVcsQ0FBQyxnQkFBZ0IsRUFBRSxDQUFDO2FBQ3BEO1lBRUQsbUJBQW1CO1lBQ25CLElBQUksVUFBVSxHQUFHLEVBQUUsQ0FBQztZQUNwQixLQUFLLElBQUksQ0FBQyxJQUFJLEVBQUUsR0FBRyxDQUFDLElBQUksTUFBTSxDQUFDLE9BQU8sQ0FBQyxVQUFVLENBQUMsRUFBRTtnQkFDaEQsTUFBTSxDQUFDLGNBQWMsQ0FBQyxJQUFJLENBQUMsS0FBSyxFQUFFLElBQUksRUFBRTtvQkFDcEMsVUFBVSxFQUFFLElBQUk7b0JBQ2hCLEdBQUc7d0JBQ0MsT0FBTyxLQUFLLENBQUMsSUFBSSxDQUFDLENBQUM7b0JBQ3ZCLENBQUM7b0JBQ0QsR0FBRyxDQUFDLEtBQUs7d0JBQ0wsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztvQkFDeEIsQ0FBQztpQkFDSixDQUFDLENBQUM7Z0JBRUgsSUFBSSxTQUFTLEdBQUcsSUFBSSxDQUFDLFlBQVksQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztnQkFDcEQsSUFBSSxTQUFTLEtBQUssSUFBSSxFQUFFO29CQUNwQixJQUFJLFNBQVMsS0FBSyxPQUFPO3dCQUFFLFNBQVMsR0FBRyxLQUFLLENBQUM7b0JBQzdDLElBQUksU0FBUyxLQUFLLEVBQUU7d0JBQUUsU0FBUyxHQUFHLElBQUksQ0FBQztvQkFDdkMsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLFNBQVMsQ0FBQztpQkFDaEM7Z0JBRUQsZ0JBQWdCO2dCQUNoQixJQUFJLFVBQVUsQ0FBQyxJQUFJLENBQUMsS0FBSyxTQUFTLElBQUksSUFBSSxDQUFDLElBQUksQ0FBQyxLQUFLLFNBQVMsRUFBRTtvQkFDNUQsVUFBVSxDQUFDLElBQUksQ0FBQyxHQUFHLE1BQUEsWUFBWSxDQUFDLElBQUksQ0FBQyxtQ0FBSSxHQUFHLENBQUMsT0FBTyxDQUFDO2lCQUN4RDthQUNKO1lBRUQsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsRUFBRTtnQkFDekIsVUFBVSxHQUFHLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUMxRDtZQUNELE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssRUFBRSxVQUFVLENBQUMsQ0FBQztZQUV0Qyx3QkFBd0I7WUFDeEIsSUFBSSxDQUFDLGNBQWMsQ0FBQyxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUM7WUFFcEQseUJBQXlCO1lBQ3pCLElBQUksSUFBSSxDQUFDLEtBQUssRUFBRTtnQkFDWixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxLQUFLLEVBQUU7b0JBQ3JELElBQUksRUFBRSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7aUJBQzdCLENBQUMsQ0FBQztnQkFDSCxJQUFJLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUUsR0FBRyxFQUFFO29CQUN0QixJQUFJLENBQUMsYUFBYSxFQUFFLENBQUM7Z0JBQ3pCLENBQUMsQ0FBQyxDQUFDO2FBQ047WUFFRCxVQUFVO1lBQ1YsSUFBSSxJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sRUFBRTtnQkFDcEIsT0FBTyxDQUFDLEdBQUcsQ0FDUCxJQUFJLElBQUksQ0FBQyxPQUFPLENBQUMsV0FBVyxFQUFFLElBQzFCLElBQUksQ0FBQyxFQUFFLENBQUMsQ0FBQyxDQUFDLEtBQUssSUFBSSxDQUFDLEVBQUUsR0FBRyxDQUFDLENBQUMsQ0FBQyxHQUNoQyxVQUFVLENBQ2IsQ0FBQzthQUNMO1lBRUQsd0JBQXdCO1lBQ3hCLElBQUksSUFBSSxDQUFDLEtBQUssSUFBSSxPQUFPLElBQUksQ0FBQyxLQUFLLEtBQUssVUFBVSxFQUFFO2dCQUNoRCxNQUFNLElBQUksQ0FBQyxLQUFLLEVBQUUsQ0FBQzthQUN0QjtZQUVELDJCQUEyQjtZQUMzQixJQUFJLENBQUMsYUFBYSxHQUFHLElBQUksQ0FBQztZQUMxQixhQUFhO1lBQ2IsSUFBSSxDQUFDLGFBQWEsRUFBRSxDQUFDO1lBQ3JCLE1BQU0sSUFBSSxDQUFDLGNBQWMsQ0FBQztZQUMxQixJQUFJLENBQUMsY0FBYyxDQUFDLFdBQVcsQ0FDM0IsTUFBQSxNQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsTUFBTSwwQ0FBRSxPQUFPLG1DQUFJLEVBQUUsRUFDdEMsSUFBSSxDQUFDLE9BQU8sQ0FDZixDQUFDO1lBQ0YsTUFBTSxNQUFNLEVBQUUsQ0FBQztZQUNmLElBQUksSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLElBQUksSUFBSSxDQUFDLFVBQVUsRUFBRTtnQkFDMUMsTUFBTSxJQUFJLENBQUMsY0FBYyxDQUFDLHNCQUFzQixDQUFDLElBQUksQ0FBQyxVQUFVLENBQUMsQ0FBQzthQUNyRTtZQUVELE9BQU8sSUFBSSxDQUFDOztLQUNmOztBQXhaTSx5REFBMkMsR0FBRyxLQUFLLENBQUMifQ==