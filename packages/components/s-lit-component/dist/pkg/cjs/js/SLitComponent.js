"use strict";
// @ts-nocheck
// @TODO            check how to override private static methods
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_component_utils_1 = __importStar(require("@coffeekraken/s-component-utils"));
const datetime_1 = require("@coffeekraken/sugar/datetime");
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const lit_1 = require("lit");
let _debug = false;
class SLitComponent extends lit_1.LitElement {
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
        this.settings = (0, object_1.__deepMerge)({
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
            (0, dom_1.__querySelectorLive)('style', ($style) => {
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
        this.componentUtils = new s_component_utils_1.default(this, Object.assign(Object.assign(Object.assign({}, ((_c = this.settings) !== null && _c !== void 0 ? _c : {})), ((_d = this.settings.componentUtils) !== null && _d !== void 0 ? _d : {})), { style: (_j = (_g = (_f = (_e = this.constructor.styles) === null || _e === void 0 ? void 0 : _e.cssText) !== null && _f !== void 0 ? _f : this.settings.style) !== null && _g !== void 0 ? _g : (_h = this.settings.componentUtils) === null || _h === void 0 ? void 0 : _h.style) !== null && _j !== void 0 ? _j : '' }));
        (() => __awaiter(this, void 0, void 0, function* () {
            var _k, _l;
            const defaultProps = s_component_utils_1.default.getDefaultProps(this.tagName.toLowerCase());
            const mountWhen = (_l = (_k = this.getAttribute('mount-when')) !== null && _k !== void 0 ? _k : defaultProps.mountWhen) !== null && _l !== void 0 ? _l : 'direct';
            // component class
            this.classList.add(...this.componentUtils.className('').split(' '));
            yield (0, datetime_1.__wait)();
            yield (0, datetime_1.__wait)();
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
        s_component_utils_1.default.setDefaultProps(selector, props);
    }
    static createProperties(properties, int) {
        var _a;
        const propertiesObj = {};
        class SLitComponentPropsInterface extends s_component_utils_1.SComponentUtilsDefaultPropsInterface {
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
                propertiesObj[prop].attribute = (0, dashCase_1.default)(prop);
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
            const _this = this, defaultProps = s_component_utils_1.default.getDefaultProps(this.tagName.toLowerCase());
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
                let attrValue = this.getAttribute((0, dashCase_1.default)(prop));
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
            yield (0, datetime_1.__wait)();
            if (this.props.adoptStyle && this.shadowRoot) {
                yield this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
exports.default = SLitComponent;
SLitComponent._keepInjectedCssBeforeStylesheetLinksInited = false;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsZ0VBQWdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2hFLHFGQUV5QztBQUV6QywyREFBc0Q7QUFDdEQsaURBQThEO0FBQzlELHVEQUF5RDtBQUN6RCwwRkFBb0U7QUFDcEUsNkJBQWlDO0FBY2pDLElBQUksTUFBTSxHQUFHLEtBQUssQ0FBQztBQVduQixNQUFxQixhQUFjLFNBQVEsZ0JBQVU7SUFtTWpEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBNEMsRUFBRTs7UUFDdEQsS0FBSyxFQUFFLENBQUM7UUEzTVo7Ozs7Ozs7OztXQVNHO1FBQ0gsYUFBUSxHQUFHLEVBQUUsQ0FBQztRQUVkOzs7Ozs7OztXQVFHO1FBQ0gsVUFBSyxHQUFRLEVBQUUsQ0FBQztRQUVoQixrQkFBYSxHQUFHLEtBQUssQ0FBQztRQUV0QixXQUFNLEdBQUcsRUFBRSxDQUFDO1FBb0xSLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBQSxvQkFBVyxFQUN2QjtZQUNJLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLFNBQVMsRUFBRSxLQUFLO1lBQ2hCLElBQUksUUFBUTs7Z0JBQ1IsT0FBTyxNQUFBLElBQUksQ0FBQyxVQUFVLDBDQUFFLGFBQWEsQ0FBQyxlQUFlLENBQUMsQ0FBQztZQUMzRCxDQUFDO1NBQ0osRUFDRCxRQUFRLENBQ1gsQ0FBQztRQUVGLHFCQUFxQjtRQUNyQixJQUFJLElBQUksQ0FBQyxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3hCLElBQUksQ0FBQyxLQUFLLEdBQUcsTUFBTSxDQUFDLE1BQU0sQ0FBQyxFQUFFLEVBQUUsSUFBSSxDQUFDLFdBQVcsQ0FBQyxLQUFLLENBQUMsQ0FBQztTQUMxRDtRQUVELGlCQUFpQjtRQUNqQixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxLQUFLLEtBQUss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