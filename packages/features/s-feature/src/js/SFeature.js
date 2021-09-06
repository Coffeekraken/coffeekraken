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
import __dashCase from '@coffeekraken/sugar/shared/string/dashCase';
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
export class SFeatureDefaultInterface extends __SInterface {
}
SFeatureDefaultInterface.definition = {
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
};
export default class SFeature extends __SClass {
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
    constructor(name, node, settings = {}) {
        var _a, _b, _c, _d, _e;
        var _f;
        super(__deepMerge({
            feature: {},
        }, settings));
        // name
        this.name = name;
        // node
        this.node = node;
        let InterfaceToApply = (_f = class InlineFeatureInterface extends __SInterface {
            },
            _f.definition = {},
            _f);
        // @ts-ignore
        InterfaceToApply.definition = Object.assign(Object.assign({}, Object.assign({}, SFeatureDefaultInterface.definition)), ((_b = (_a = this.featureSettings.interface) === null || _a === void 0 ? void 0 : _a.definition) !== null && _b !== void 0 ? _b : {}));
        // @ts-ignore
        this._InterfaceToApply = InterfaceToApply;
        // props
        const defaultProps = __deepMerge(
        // @ts-ignore
        InterfaceToApply.defaults(), (_c = this.featureSettings.defaultProps) !== null && _c !== void 0 ? _c : {}, (_d = this.constructor._defaultProps['*']) !== null && _d !== void 0 ? _d : {}, 
        // @ts-ignore
        (_e = this.constructor._defaultProps[this.name]) !== null && _e !== void 0 ? _e : {});
        const props = this.node.attributes;
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
        this.props = new Proxy(__deepMerge(defaultProps, InterfaceToApply.apply(passedProps, {
            descriptor: {
                defaults: false,
            },
        })), {
            // @ts-ignore
            set: (target, prop, value) => {
                var _a, _b, _c;
                // @ts-ignore
                if (this.beforePropChange) {
                    // @ts-ignore
                    const res = (_a = this.beforePropChange) === null || _a === void 0 ? void 0 : _a.call(this, prop, value);
                    if (res === undefined)
                        return false;
                    value = res;
                }
                // set the actual value
                target[prop] = value;
                if ((_c = (_b = this._InterfaceToApply._definition) === null || _b === void 0 ? void 0 : _b[prop.toString()]) === null || _c === void 0 ? void 0 : _c.physical) {
                    const attrName = __dashCase(prop);
                    if (value === false || value === null) {
                        this.node.removeAttribute(attrName);
                    }
                    else {
                        this.node.setAttribute(attrName, value.toString());
                    }
                }
                // @ts-ignore
                if (this.afterPropChanged) {
                    // @ts-ignore
                    this.afterPropChanged(prop, value);
                }
                return true;
            },
        });
        (() => __awaiter(this, void 0, void 0, function* () {
            // mount component when needed
            switch (this.props.mountWhen) {
                case 'inViewport':
                    (() => __awaiter(this, void 0, void 0, function* () {
                        // @ts-ignore
                        yield __whenInViewport(this.node);
                        // @ts-ignore
                        yield this.mount();
                    }))();
                    break;
                case 'direct':
                case 'directly':
                default:
                    // @ts-ignore
                    yield this.mount();
                    break;
            }
            // set as mounted
            this.props.mounted = true;
        }))();
    }
    static setDefaultProps(selector, props) {
        Array.from(selector).forEach((sel) => {
            var _a;
            this._defaultProps[sel] = Object.assign(Object.assign({}, ((_a = this._defaultProps[sel]) !== null && _a !== void 0 ? _a : {})), props);
        });
    }
    /**
     * @name              registerFeature
     * @type            Function
     * @static
     *
     * This static method allows you to register a new feature
     * associated with an HTMLElement attribute like "s-activate", etc...
     *
     * @param           {String}        name           The attribute that trigger the feature
     * @param           {SFeature}       feature                The actual feature class to use
     * @param           {Any}           [defaultProps={}]       Some default props to set for this feature
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    static registerFeature(name, feature, defaultProps = {}) {
        this.setDefaultProps(name, defaultProps);
        __querySelectorLive(`[${name}]`, ($elm) => {
            new feature(name, $elm, defaultProps);
        });
    }
    /**
     * @name        featureSettings
     * @type        ISFeatureSettings
     * @get
     *
     * Access the feature settings
     *
     * @since           2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    get featureSettings() {
        return this._settings.feature;
    }
    /**
     * @name            beforePropChange
     * @type            Function
     *
     * This method allows you to catch a property change before it actually occurs.
     * You can return the value to set it as it is, return another value to set another one
     * or returns undefined to prevent the change to be commited.
     *
     * @param           {String}            prop        The property about to be updated
     * @param           {Any}               value       The value about to be setted
     * @return          {Any}                           The value you want to actually set, or undefined if you want to prevent the update
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
    /**
     * @name            afterPropChanged
     * @type            Function
     *
     * This method allows you to catch properties updates AFTER it has been commited.
     *
     * @param           {String}            prop        The property about to be updated
     * @param           {Any}               value       The value about to be setted
     *
     * @since       2.0.0
     * @author 		Olivier Bossel<olivier.bossel@gmail.com>
     */
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
    /**
     * @name
     */
    exposeApi(apiObj) {
        setTimeout(() => {
            let $on = this.node;
            Object.keys(apiObj).forEach((apiFnName) => {
                const apiFn = apiObj[apiFnName].bind(this);
                $on[apiFnName] = apiFn;
            });
        });
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
SFeature._defaultProps = {};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUM3QyxxQ0FBcUM7QUFDckMsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxXQUFXLE1BQU0sNkNBQTZDLENBQUM7QUFDdEUsT0FBTyxnQkFBZ0IsTUFBTSxrREFBa0QsQ0FBQztBQUdoRixPQUFPLFVBQVUsTUFBTSw0Q0FBNEMsQ0FBQztBQUdwRSxPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBMkNyRixNQUFNLE9BQU8sd0JBQXlCLFNBQVEsWUFBWTs7QUFDL0MsbUNBQVUsR0FBRztJQUNoQixFQUFFLEVBQUU7UUFDQSxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsU0FBUyxFQUFFO1FBQ1AsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxVQUFVLEVBQUUsWUFBWSxDQUFDO1FBQ2xDLE9BQU8sRUFBRSxVQUFVO0tBQ3RCO0NBQ0osQ0FBQztBQUdOLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUyxTQUFRLFFBQVE7SUFrRzFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsV0FBMkMsRUFBRTs7O1FBQ3RGLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQUVGLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixPQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsSUFBSSxnQkFBZ0IsU0FBRyxNQUFNLHNCQUF1QixTQUFRLFlBQVk7YUFFdkU7WUFEVSxhQUFVLEdBQUcsRUFBRztlQUMxQixDQUFDO1FBRUYsYUFBYTtRQUNiLGdCQUFnQixDQUFDLFVBQVUsbUNBQ3BCLE1BQU0sQ0FBQyxNQUFNLENBQUMsRUFBRSxFQUFFLHdCQUF3QixDQUFDLFVBQVUsQ0FBQyxHQUV0RCxDQUFDLE1BQUEsTUFBQSxJQUFJLENBQUMsZUFBZSxDQUFDLFNBQVMsMENBQUUsVUFBVSxtQ0FBSSxFQUFFLENBQUMsQ0FDeEQsQ0FBQztRQUNGLGFBQWE7UUFDYixJQUFJLENBQUMsaUJBQWlCLEdBQUcsZ0JBQWdCLENBQUM7UUFFMUMsUUFBUTtRQUNSLE1BQU0sWUFBWSxHQUFHLFdBQVc7UUFDNUIsYUFBYTtRQUNiLGdCQUFnQixDQUFDLFFBQVEsRUFBRSxFQUMzQixNQUFBLElBQUksQ0FBQyxlQUFlLENBQUMsWUFBWSxtQ0FBSSxFQUFFLEVBQ3ZDLE1BQU0sSUFBSSxDQUFDLFdBQVksQ0FBQyxhQUFhLENBQUMsR0FBRyxDQUFDLG1DQUFJLEVBQUU7UUFDaEQsYUFBYTtRQUNiLE1BQU0sSUFBSSxDQUFDLFdBQVksQ0FBQyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxtQ0FBSSxFQUFFLENBQ3pELENBQUM7UUFFRixNQUFNLEtBQUssR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsQ0FBQztRQUNuQyxJQUFJLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDckIsSUFBSSxLQUFLLENBQUMsV0FBVyxDQUFDLElBQUksS0FBSyxjQUFjLEVBQUU7WUFDM0MsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7Z0JBQy9CLElBQUksS0FBSyxDQUFDO2dCQUNWLElBQUksQ0FBQSxNQUFBLEtBQUssQ0FBQyxHQUFHLENBQUMsMENBQUUsU0FBUyxNQUFLLFNBQVMsRUFBRTtvQkFDckMsSUFBSSxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxLQUFLLEVBQUU7d0JBQUUsS0FBSyxHQUFHLElBQUksQ0FBQzs7d0JBQ3pDLEtBQUssR0FBRyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsU0FBUyxDQUFDO2lCQUNyQztnQkFDRCxJQUFJLENBQUMsS0FBSztvQkFBRSxPQUFPO2dCQUNuQixXQUFXLENBQUMsV0FBVyxDQUFDLE1BQUEsTUFBQSxLQUFLLENBQUMsR0FBRyxDQUFDLDBDQUFFLElBQUksbUNBQUksR0FBRyxDQUFDLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDOUQsQ0FBQyxDQUFDLENBQUM7U0FDTjthQUFNO1lBQ0gsV0FBVyxHQUFHLEtBQUssQ0FBQztTQUN2QjtRQUNELElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxLQUFLLENBQ2xCLFdBQVcsQ0FDUCxZQUFZLEVBQ1osZ0JBQWdCLENBQUMsS0FBSyxDQUFDLFdBQVcsRUFBRTtZQUNoQyxVQUFVLEVBQUU7Z0JBQ1IsUUFBUSxFQUFFLEtBQUs7YUFDbEI7U0FDSixDQUFDLENBQ0wsRUFDRDtZQUNJLGFBQWE7WUFDYixHQUFHLEVBQUUsQ0FBQyxNQUFNLEVBQUUsSUFBSSxFQUFFLEtBQUssRUFBRSxFQUFFOztnQkFDekIsYUFBYTtnQkFDYixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsYUFBYTtvQkFDYixNQUFNLEdBQUcsR0FBRyxNQUFBLElBQUksQ0FBQyxnQkFBZ0IsK0NBQXJCLElBQUksRUFBb0IsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO29CQUNqRCxJQUFJLEdBQUcsS0FBSyxTQUFTO3dCQUFFLE9BQU8sS0FBSyxDQUFDO29CQUNwQyxLQUFLLEdBQUcsR0FBRyxDQUFDO2lCQUNmO2dCQUVELHVCQUF1QjtnQkFDdkIsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQztnQkFFckIsSUFBSSxNQUFBLE1BQUEsSUFBSSxDQUFDLGlCQUFpQixDQUFDLFdBQVcsMENBQUcsSUFBSSxDQUFDLFFBQVEsRUFBRSxDQUFDLDBDQUFFLFFBQVEsRUFBRTtvQkFDakUsTUFBTSxRQUFRLEdBQUcsVUFBVSxDQUFDLElBQUksQ0FBQyxDQUFDO29CQUNsQyxJQUFJLEtBQUssS0FBSyxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksRUFBRTt3QkFDbkMsSUFBSSxDQUFDLElBQUksQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUFDLENBQUM7cUJBQ3ZDO3lCQUFNO3dCQUNILElBQUksQ0FBQyxJQUFJLENBQUMsWUFBWSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsUUFBUSxFQUFFLENBQUMsQ0FBQztxQkFDdEQ7aUJBQ0o7Z0JBRUQsYUFBYTtnQkFDYixJQUFJLElBQUksQ0FBQyxnQkFBZ0IsRUFBRTtvQkFDdkIsYUFBYTtvQkFDYixJQUFJLENBQUMsZ0JBQWdCLENBQUMsSUFBSSxFQUFFLEtBQUssQ0FBQyxDQUFDO2lCQUN0QztnQkFFRCxPQUFPLElBQUksQ0FBQztZQUNoQixDQUFDO1NBQ0osQ0FDSixDQUFDO1FBRUYsQ0FBQyxHQUFTLEVBQUU7WUFDUiw4QkFBOEI7WUFDOUIsUUFBUSxJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDMUIsS0FBSyxZQUFZO29CQUNiLENBQUMsR0FBUyxFQUFFO3dCQUNSLGFBQWE7d0JBQ2IsTUFBTSxnQkFBZ0IsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7d0JBQ2xDLGFBQWE7d0JBQ2IsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7b0JBQ3ZCLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztvQkFDTCxNQUFNO2dCQUNWLEtBQUssUUFBUSxDQUFDO2dCQUNkLEtBQUssVUFBVSxDQUFDO2dCQUNoQjtvQkFDSSxhQUFhO29CQUNiLE1BQU0sSUFBSSxDQUFDLEtBQUssRUFBRSxDQUFDO29CQUNuQixNQUFNO2FBQ2I7WUFFRCxpQkFBaUI7WUFDakIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUMsQ0FBQSxDQUFDLEVBQUUsQ0FBQztJQUNULENBQUM7SUE5S0QsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUEyQixFQUFFLEtBQVU7UUFDMUQsS0FBSyxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTs7WUFDakMsSUFBSSxDQUFDLGFBQWEsQ0FBQyxHQUFHLENBQUMsbUNBQ2hCLENBQUMsTUFBQSxJQUFJLENBQUMsYUFBYSxDQUFDLEdBQUcsQ0FBQyxtQ0FBSSxFQUFFLENBQUMsR0FDL0IsS0FBSyxDQUNYLENBQUM7UUFDTixDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBWSxFQUFFLE9BQXdCLEVBQUUsZUFBb0IsRUFBRTtRQUNqRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUMxQyxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGVBQWU7UUFDZixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDO0lBQ3pDLENBQUM7SUFxSUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFFSDs7Ozs7Ozs7Ozs7T0FXRztJQUVIOzs7Ozs7Ozs7O09BVUc7SUFFSDs7T0FFRztJQUNILFNBQVMsQ0FBQyxNQUFXO1FBQ2pCLFVBQVUsQ0FBQyxHQUFHLEVBQUU7WUFDWixJQUFJLEdBQUcsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDO1lBQ3BCLE1BQU0sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsU0FBUyxFQUFFLEVBQUU7Z0JBQ3RDLE1BQU0sS0FBSyxHQUFHLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7Z0JBQzNDLEdBQUcsQ0FBQyxTQUFTLENBQUMsR0FBRyxLQUFLLENBQUM7WUFDM0IsQ0FBQyxDQUFDLENBQUM7UUFDUCxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7OztPQVVHO0lBQ0gsU0FBUzs7UUFDTCxPQUFPLE1BQUEsSUFBSSxDQUFDLElBQUksMENBQUUsWUFBWSxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzlDLENBQUM7O0FBcFFEOzs7Ozs7Ozs7Ozs7Ozs7R0FlRztBQUNJLHNCQUFhLEdBQVEsRUFBRSxDQUFDIn0=