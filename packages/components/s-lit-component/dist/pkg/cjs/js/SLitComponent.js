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
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
const dashCase_1 = __importDefault(require("@coffeekraken/sugar/shared/string/dashCase"));
const wait_1 = __importDefault(require("@coffeekraken/sugar/shared/time/wait"));
const lit_1 = require("lit");
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
        this.settings = (0, deepMerge_1.default)({
            componentUtils: {},
            shadowDom: false,
            get rootNode() {
                var _a;
                return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
            },
        }, settings);
        // shadow handler
        if (this.settings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
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
        // component class
        this.classList.add(...this.componentUtils.className('').split(' '));
        (() => __awaiter(this, void 0, void 0, function* () {
            var _k, _l;
            const defaultProps = s_component_utils_1.default.getDefaultProps(this.tagName.toLowerCase());
            const mountWhen = (_l = (_k = this.getAttribute('mount-when')) !== null && _k !== void 0 ? _k : defaultProps.mountWhen) !== null && _l !== void 0 ? _l : 'direct';
            // wait until mount
            yield this.componentUtils.waitAndExecute(mountWhen, this._mount.bind(this));
        }))();
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
                Object.assign(this.props, finalProps);
            }
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
            yield (0, wait_1.default)();
            if (this.props.adoptStyle && this.shadowRoot) {
                yield this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
exports.default = SLitComponent;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsZ0VBQWdFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBR2hFLHFGQUV5QztBQUV6Qyw0RkFBc0U7QUFDdEUsMEZBQW9FO0FBQ3BFLGdGQUEwRDtBQUMxRCw2QkFBaUM7QUFtQmpDLE1BQXFCLGFBQWMsU0FBUSxnQkFBVTtJQThIakQ7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFBWSxXQUE0QyxFQUFFOztRQUN0RCxLQUFLLEVBQUUsQ0FBQztRQXhJWjs7Ozs7Ozs7O1dBU0c7UUFDSCxhQUFRLEdBQUcsRUFBRSxDQUFDO1FBRWQ7Ozs7Ozs7O1dBUUc7UUFDSCxVQUFLLEdBQVEsRUFBRSxDQUFDO1FBRWhCLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBbUhsQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUEsbUJBQVcsRUFDdkI7WUFDSSxjQUFjLEVBQUUsRUFBRTtZQUNsQixTQUFTLEVBQUUsS0FBSztZQUNoQixJQUFJLFFBQVE7O2dCQUNSLE9BQU8sTUFBQSxJQUFJLENBQUMsVUFBVSwwQ0FBRSxhQUFhLENBQUMsZUFBZSxDQUFDLENBQUM7WUFDM0QsQ0FBQztTQUNKLEVBQ0QsUUFBUSxDQUNYLENBQUM7UUFFRixpQkFBaUI7UUFDakIsSUFBSSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsS0FBSyxLQUFLLEVBQUU7WUFDbkMsSUFBSSxDQUFDLGdCQUFnQixHQUFHLEdBQUcsRUFBRTtnQkFDekIsT0FBTyxJQUFJLENBQUM7WUFDaEIsQ0FBQyxDQUFDO1NBQ0w7UUFFRCxhQUFhO1FBQ2IsTUFBTSxnQkFBZ0IsR0FBRyxNQUFBLElBQUksQ0FBQyxZQUFZLDBDQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN2RCxhQUFhO1FBQ2IsSUFBSSxDQUFDLFlBQVksR0FBRyxHQUFTLEVBQUU7WUFD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