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
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __SComponentUtils from '@coffeekraken/s-component-utils';
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
        var _a;
        super(__deepMerge({
            componentUtils: {},
            feature: {},
        }, settings));
        this.componentUtils = new __SComponentUtils(node, node.attributes, {
            componentUtils: Object.assign(Object.assign({}, ((_a = this._settings.componentUtils) !== null && _a !== void 0 ? _a : {})), { name }),
        });
        this.props = this.componentUtils.props;
        // name
        this.name = name;
        // node
        this.node = node;
        // this.props = new Proxy(
        //     __deepMerge(
        //         defaultProps,
        //         InterfaceToApply.apply(passedProps, {
        //             descriptor: {
        //                 defaults: false,
        //             },
        //         }),
        //     ),
        //     {
        //         // @ts-ignore
        //         set: (target, prop, value) => {
        //             // @ts-ignore
        //             if (this.beforePropChange) {
        //                 // @ts-ignore
        //                 const res = this.beforePropChange?.(prop, value);
        //                 if (res === undefined) return false;
        //                 value = res;
        //             }
        //             // set the actual value
        //             target[prop] = value;
        //             if (this._InterfaceToApply._definition?.[prop.toString()]?.physical) {
        //                 const attrName = __dashCase(prop);
        //                 if (value === false || value === null) {
        //                     this.node.removeAttribute(attrName);
        //                 } else {
        //                     this.node.setAttribute(attrName, value.toString());
        //                 }
        //             }
        //             // @ts-ignore
        //             if (this.afterPropChanged) {
        //                 // @ts-ignore
        //                 this.afterPropChanged(prop, value);
        //             }
        //             return true;
        //         },
        //     },
        // );
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
            new feature(name, $elm, __SComponentUtils.getDefaultProps(name));
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQVk3QyxPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUEyQ2hFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUyxTQUFRLFFBQVE7SUE0RjFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQVksSUFBWSxFQUFFLElBQWlCLEVBQUUsV0FBMkMsRUFBRTs7UUFDdEYsS0FBSyxDQUNELFdBQVcsQ0FDUDtZQUNJLGNBQWMsRUFBRSxFQUFFO1lBQ2xCLE9BQU8sRUFBRSxFQUFFO1NBQ2QsRUFDRCxRQUFRLENBQ1gsQ0FDSixDQUFDO1FBRUYsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsVUFBVSxFQUFFO1lBQy9ELGNBQWMsa0NBQ1AsQ0FBQyxNQUFBLElBQUksQ0FBQyxTQUFTLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUMsS0FDeEMsSUFBSSxHQUNQO1NBQ0osQ0FBQyxDQUFDO1FBQ0gsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsY0FBYyxDQUFDLEtBQUssQ0FBQztRQUV2QyxPQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLDBCQUEwQjtRQUMxQixtQkFBbUI7UUFDbkIsd0JBQXdCO1FBQ3hCLGdEQUFnRDtRQUNoRCw0QkFBNEI7UUFDNUIsbUNBQW1DO1FBQ25DLGlCQUFpQjtRQUNqQixjQUFjO1FBQ2QsU0FBUztRQUNULFFBQVE7UUFDUix3QkFBd0I7UUFDeEIsMENBQTBDO1FBQzFDLDRCQUE0QjtRQUM1QiwyQ0FBMkM7UUFDM0MsZ0NBQWdDO1FBQ2hDLG9FQUFvRTtRQUNwRSx1REFBdUQ7UUFDdkQsK0JBQStCO1FBQy9CLGdCQUFnQjtRQUVoQixzQ0FBc0M7UUFDdEMsb0NBQW9DO1FBRXBDLHFGQUFxRjtRQUNyRixxREFBcUQ7UUFDckQsMkRBQTJEO1FBQzNELDJEQUEyRDtRQUMzRCwyQkFBMkI7UUFDM0IsMEVBQTBFO1FBQzFFLG9CQUFvQjtRQUNwQixnQkFBZ0I7UUFFaEIsNEJBQTRCO1FBQzVCLDJDQUEyQztRQUMzQyxnQ0FBZ0M7UUFDaEMsc0RBQXNEO1FBQ3RELGdCQUFnQjtRQUVoQiwyQkFBMkI7UUFDM0IsYUFBYTtRQUNiLFNBQVM7UUFDVCxLQUFLO1FBRUwsQ0FBQyxHQUFTLEVBQUU7WUFDUixNQUFNLGVBQWUsR0FBRyxNQUFNLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxFQUFFLENBQUM7WUFDbkUsTUFBTSxJQUFJLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDbkIsZUFBZSxFQUFFLENBQUM7UUFDdEIsQ0FBQyxDQUFBLENBQUMsRUFBRSxDQUFDO0lBQ1QsQ0FBQztJQTNJRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsSUFBWSxFQUFFLE9BQXdCLEVBQUUsZUFBb0IsRUFBRTtRQUNqRixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7SUFFRDs7Ozs7Ozs7O09BU0c7SUFDSCxJQUFJLGVBQWU7UUFDZixPQUFhLElBQUksQ0FBQyxTQUFVLENBQUMsT0FBTyxDQUFDO0lBQ3pDLENBQUM7Q0ErSEoifQ==