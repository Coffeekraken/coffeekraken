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
        (() => __awaiter(this, void 0, void 0, function* () {
            var _b;
            // @ts-ignore
            this.componentUtils.waitAndExecute((_b = this.mount) === null || _b === void 0 ? void 0 : _b.bind(this));
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
     * @name              defineFeature
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
    static defineFeature(name, feature, defaultProps = {}) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU0ZlYXR1cmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTRmVhdHVyZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7QUFBQSxPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQUN0RSxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQVk3QyxPQUFPLG1CQUFtQixNQUFNLG9EQUFvRCxDQUFDO0FBQ3JGLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFrRGhFLE1BQU0sQ0FBQyxPQUFPLE9BQU8sUUFBUyxTQUFRLFFBQVE7SUFnRzFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksSUFBWSxFQUNaLElBQWlCLEVBQ2pCLFdBQTJDLEVBQUU7O1FBRTdDLEtBQUssQ0FDRCxXQUFXLENBQ1A7WUFDSSxjQUFjLEVBQUUsRUFBRTtZQUNsQixPQUFPLEVBQUUsRUFBRTtTQUNkLEVBQ0QsUUFBUSxDQUNYLENBQ0osQ0FBQztRQUVGLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxpQkFBaUIsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLFVBQVUsRUFBRTtZQUMvRCxjQUFjLGtDQUNQLENBQUMsTUFBQSxJQUFJLENBQUMsU0FBUyxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUFDLEtBQ3hDLElBQUksR0FDUDtTQUNKLENBQUMsQ0FBQztRQUNILElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxLQUFLLENBQUM7UUFFdkMsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixDQUFDLEdBQVMsRUFBRTs7WUFDUixhQUFhO1lBQ2IsSUFBSSxDQUFDLGNBQWMsQ0FBQyxjQUFjLENBQUMsTUFBQSxJQUFJLENBQUMsS0FBSywwQ0FBRSxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUMvRCxDQUFDLENBQUEsQ0FBQyxFQUFFLENBQUM7SUFDVCxDQUFDO0lBdkdEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBMkIsRUFBRSxLQUFVO1FBQzFELGlCQUFpQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLGFBQWEsQ0FDaEIsSUFBWSxFQUNaLE9BQXdCLEVBQ3hCLGVBQW9CLEVBQUU7UUFFdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekMsbUJBQW1CLENBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsaUJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0lBRUQ7Ozs7Ozs7OztPQVNHO0lBQ0gsSUFBSSxlQUFlO1FBQ2YsT0FBYSxJQUFJLENBQUMsU0FBVSxDQUFDLE9BQU8sQ0FBQztJQUN6QyxDQUFDO0NBdUZKIn0=