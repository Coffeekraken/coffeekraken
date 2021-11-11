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
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { LitElement } from 'lit';
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
        var _a, _b, _c, _d, _e, _f, _g;
        super();
        /**
         * @name            _settings
         * @type            Object
         * @private
         *
         * Store the settings
         *
         * @since       2.0.0
         * @author 		Olivier Bossel<olivier.bossel@gmail.com>
         */
        this._settings = {};
        this._shouldUpdate = false;
        this._settings = __deepMerge({
            componentUtils: {},
            litComponent: {
                shadowDom: true,
                get rootNode() {
                    var _a;
                    return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
                },
            },
        }, settings);
        this.componentUtils = new __SComponentUtils(this, this.attributes, {
            componentUtils: Object.assign(Object.assign({}, ((_a = this._settings.componentUtils) !== null && _a !== void 0 ? _a : {})), { style: (_e = (_c = (_b = this.constructor.styles) === null || _b === void 0 ? void 0 : _b.cssText) !== null && _c !== void 0 ? _c : (_d = this._settings.componentUtils) === null || _d === void 0 ? void 0 : _d.style) !== null && _e !== void 0 ? _e : '' }),
        });
        this.props = this.componentUtils.props;
        // shadow handler
        if (this.litComponentSettings.shadowDom === false) {
            this.createRenderRoot = () => {
                return this;
            };
        }
        // set each props on the node
        Object.keys(this.componentUtils.props).forEach((prop) => {
            this[prop] = this.componentUtils.props[prop];
        });
        // @ts-ignore
        const nodeFirstUpdated = (_f = this.firstUpdated) === null || _f === void 0 ? void 0 : _f.bind(this);
        // @ts-ignore
        this.firstUpdated = () => __awaiter(this, void 0, void 0, function* () {
            if (nodeFirstUpdated) {
                yield nodeFirstUpdated();
            }
            // set the component as mounted
            // @ts-ignore
            this.mounted = true;
        });
        // litElement shouldUpdate
        // @ts-ignore
        const nodeShouldUpdate = (_g = this.shouldUpdate) === null || _g === void 0 ? void 0 : _g.bind(this);
        // @ts-ignore
        this.shouldUpdate = () => {
            if (nodeShouldUpdate) {
                const res = nodeShouldUpdate();
                if (!res)
                    return false;
            }
            return this._shouldUpdate;
        };
        (() => __awaiter(this, void 0, void 0, function* () {
            yield this.componentUtils.waitOnMountState();
            console.log('MOUNT', this);
            yield this.mount();
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
        __SComponentUtils.setDefaultProps(selector, props);
    }
    /**
     * @name        litComponentSettings
     * @type        ISLitComponentSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get litComponentSettings() {
        return this._settings.litComponent;
    }
    static properties(properties, int) {
        const propertiesObj = {};
        const InterfaceToApply = __SComponentUtils.getFinalInterface(int);
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
    mount() {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function* () {
            // set the not as updatable
            this._shouldUpdate = true;
            // @ts-ignore
            this.requestUpdate();
            this.componentUtils.injectStyle((_b = (_a = this.constructor.styles) === null || _a === void 0 ? void 0 : _a.cssText) !== null && _b !== void 0 ? _b : '', this.tagName);
            yield __wait();
            if (this.componentUtils.props.adoptStyle && this.shadowRoot) {
                yield this.componentUtils.adoptStyleInShadowRoot(this.shadowRoot);
            }
            return true;
        });
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLGdFQUFnRTs7Ozs7Ozs7OztBQU9oRSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUV0RSxPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUNwRSxPQUFPLE1BQU0sTUFBTSxzQ0FBc0MsQ0FBQztBQUMxRCxPQUFPLGlCQUFpQixNQUFNLGlDQUFpQyxDQUFDO0FBQ2hFLE9BQU8sRUFBRSxVQUFVLEVBQUUsTUFBTSxLQUFLLENBQUM7QUFvQmpDLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFVBQVU7SUE0RGpEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksV0FBZ0QsRUFBRTs7UUFDMUQsS0FBSyxFQUFFLENBQUM7UUF0RVo7Ozs7Ozs7OztXQVNHO1FBQ0gsY0FBUyxHQUFHLEVBQUUsQ0FBQztRQWFmLGtCQUFhLEdBQUcsS0FBSyxDQUFDO1FBaURsQixJQUFJLENBQUMsU0FBUyxHQUFHLFdBQVcsQ0FDeEI7WUFDSSxjQUFjLEVBQUUsRUFBRTtZQUNsQixZQUFZLEVBQUU7Z0JBQ1YsU0FBUyxFQUFFLElBQUk7Z0JBQ2YsSUFBSSxRQUFROztvQkFDUixPQUFPLE1BQUEsSUFBSSxDQUFDLFVBQVUsMENBQUUsYUFBYSxDQUFDLGVBQWUsQ0FBQyxDQUFDO2dCQUMzRCxDQUFDO2FBQ0o7U0FDSixFQUNELFFBQVEsQ0FDWCxDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQy9ELGNBQWMsa0NBQ1AsQ0FBQyxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUMsS0FDeEMsS0FBSyxFQUNELE1BQUEsTUFBQSxNQUFBLElBQUksQ0FBQyxXQUFXLENBQUMsTUFB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