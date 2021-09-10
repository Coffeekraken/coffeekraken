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
// import __mustache from 'mustache';
import __SInterface from '@coffeekraken/s-interface';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __wait from '@coffeekraken/sugar/shared/time/wait';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { LitElement } from 'lit';
export class SLitComponentDefaultInterface extends __SInterface {
}
SLitComponentDefaultInterface.definition = {
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
            sComponentUtils: {},
            sLitComponent: {
                shadowDom: true,
                get rootNode() {
                    var _a;
                    return (_a = this.shadowRoot) === null || _a === void 0 ? void 0 : _a.querySelector('*:first-child');
                },
            },
        }, settings);
        this.componentUtils = new __SComponentUtils(this, this.attributes, {
            sComponentUtils: Object.assign(Object.assign({}, ((_a = this._settings.sComponentUtils) !== null && _a !== void 0 ? _a : {})), { style: (_e = (_c = (_b = this.constructor.styles) === null || _b === void 0 ? void 0 : _b.cssText) !== null && _c !== void 0 ? _c : (_d = this._settings.sComponentUtils) === null || _d === void 0 ? void 0 : _d.style) !== null && _e !== void 0 ? _e : '' }),
        });
        this.props = this.componentUtils.props;
        // shadow handler
        if (this.sLitComponentSettings.shadowDom === false) {
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
            const mountedCallback = yield this.componentUtils.whenMountState();
            yield this.mount();
            mountedCallback();
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
     * @name        sLitComponentSettings
     * @type        ISLitComponentSettings
     * @get
     *
     * Access the component utils sertings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get sLitComponentSettings() {
        return this._settings.sLitComponent;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0xpdENvbXBvbmVudC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlNMaXRDb21wb25lbnQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLGdFQUFnRTs7Ozs7Ozs7OztBQUVoRSxxQ0FBcUM7QUFDckMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFFdEUsT0FBTyxVQUFVLE1BQU0sNENBQTRDLENBQUM7QUFDcEUsT0FBTyxNQUFNLE1BQU0sc0NBQXNDLENBQUM7QUFDMUQsT0FBTyxpQkFBaUIsTUFBTSxpQ0FBaUMsQ0FBQztBQUNoRSxPQUFPLEVBQUUsVUFBVSxFQUFFLE1BQU0sS0FBSyxDQUFDO0FBRWpDLE1BQU0sT0FBTyw2QkFBOEIsU0FBUSxZQUFZOztBQUNwRCx3Q0FBVSxHQUFHO0lBQ2hCLEVBQUUsRUFBRTtRQUNBLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxTQUFTLEVBQUU7UUFDUCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFVBQVUsRUFBRSxZQUFZLENBQUM7UUFDbEMsT0FBTyxFQUFFLFVBQVU7S0FDdEI7SUFDRCxVQUFVLEVBQUU7UUFDUixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxJQUFJO1FBQ2IsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBcUJOLE1BQU0sQ0FBQyxPQUFPLE9BQU8sYUFBYyxTQUFRLFVBQVU7SUE0RGpEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVks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