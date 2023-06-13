var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import __SClass from '@coffeekraken/s-class';
import __SComponentUtils from '@coffeekraken/s-component-utils';
import { __injectStyle, __querySelectorLive } from '@coffeekraken/sugar/dom';
export default class SFeature extends __SClass {
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
     * @name              define
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
    static define(name, featureCls, defaultProps = {}) {
        this.setDefaultProps(name, defaultProps);
        __querySelectorLive(`[${name}]`, ($elm) => {
            new featureCls(name, $elm, __SComponentUtils.getDefaultProps(name));
        }, {
        // attributes: [name],
        });
    }
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
    constructor(name, node, settings) {
        var _a, _b, _c, _d;
        super(settings);
        // inject style if needed
        if (this.settings.style) {
            __injectStyle(this.settings.style, {
                id: `s-feature-${name}`,
            });
        }
        this.utils = new __SComponentUtils(node, Object.assign(Object.assign(Object.assign({}, ((_a = this.settings) !== null && _a !== void 0 ? _a : {})), ((_b = this.settings.componentUtils) !== null && _b !== void 0 ? _b : {})), { useTagNameForClassName: false, name }));
        // name
        this.name = name;
        // node
        this.node = node;
        // assign props
        this.props = this.utils.handleProps({}, {
            interface: (_c = this.settings.interface) !== null && _c !== void 0 ? _c : (_d = this.settings.componentUtils) === null || _d === void 0 ? void 0 : _d.interface,
        });
        // add the base class on the feature
        this.node.classList.add(...this.utils.cls('').split(' '));
        this.utils.waitAndExecute(this.props.mountWhen, 
        // @ts-ignore
        () => __awaiter(this, void 0, void 0, function* () {
            var _e;
            // @ts-ignore
            yield ((_e = this.mount) === null || _e === void 0 ? void 0 : _e.call(this));
            this.props.mounted = true;
        }));
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxFQUFFLGFBQWEsRUFBRSxtQkFBbUIsRUFBRSxNQUFNLHlCQUF5QixDQUFDO0FBaUQ3RSxNQUFNLENBQUMsT0FBTyxPQUFPLFFBQVMsU0FBUSxRQUFRO0lBcUMxQzs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQ1QsSUFBWSxFQUNaLFVBQTJCLEVBQzNCLGVBQW9CLEVBQUU7UUFFdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekMsbUJBQW1CLENBQ2YsSUFBSSxJQUFJLEdBQUcsRUFDWCxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ0wsSUFBSSxVQUFVLENBQ1YsSUFBSSxFQUNKLElBQUksRUFDSixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQzFDLENBQUM7UUFDTixDQUFDLEVBQ0Q7UUFDSSxzQkFBc0I7U0FDekIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksSUFBWSxFQUNaLElBQWlCLEVBQ2pCLFFBQXFDOztRQUVyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEIseUJBQXlCO1FBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDckIsYUFBYSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUMvQixFQUFFLEVBQUUsYUFBYSxJQUFJLEVBQUU7YUFDMUIsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksaUJBQWlCLENBQUMsSUFBSSxnREFDaEMsQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxHQUNyQixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLG1DQUFJLEVBQUUsQ0FBQyxLQUN2QyxzQkFBc0IsRUFBRSxLQUFLLEVBQzdCLElBQUksSUFDTixDQUFDO1FBRUgsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixlQUFlO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDL0IsRUFBRSxFQUNGO1lBQ0ksU0FBUyxFQUNMLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLG1DQUN2QixNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYywwQ0FBRSxTQUFTO1NBQzlDLENBQ0osQ0FBQztRQUVGLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLGFBQWE7UUFDYixHQUFTLEVBQUU7O1lBQ1AsYUFBYTtZQUNiLE1BQU0sQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLG9EQUFJLENBQUEsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQyxDQUFBLENBQ0osQ0FBQztJQUNOLENBQUM7Q0EwQ0oifQ==