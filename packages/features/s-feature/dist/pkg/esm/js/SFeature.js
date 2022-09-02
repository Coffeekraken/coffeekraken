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
import __querySelectorLive from '@coffeekraken/sugar/js/dom/query/querySelectorLive';
import __deepMerge from '@coffeekraken/sugar/shared/object/deepMerge';
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
    constructor(name, node, settings) {
        var _a, _b, _c, _d;
        super(__deepMerge({}, settings));
        this.componentUtils = new __SComponentUtils(node, Object.assign(Object.assign(Object.assign({}, ((_a = this.settings) !== null && _a !== void 0 ? _a : {})), ((_b = this.settings.componentUtils) !== null && _b !== void 0 ? _b : {})), { name }));
        // name
        this.name = name;
        // node
        this.node = node;
        // add the base class on the feature
        this.node.classList.add(...this.componentUtils.className('').split(' '));
        // assign props
        this.props = this.componentUtils.handleProps({}, {
            interface: (_c = this.settings.interface) !== null && _c !== void 0 ? _c : (_d = this.settings.componentUtils) === null || _d === void 0 ? void 0 : _d.interface,
        });
        this.componentUtils.waitAndExecute(this.props.mountWhen, 
        // @ts-ignore
        () => __awaiter(this, void 0, void 0, function* () {
            var _e;
            // @ts-ignore
            yield ((_e = this.mount) === null || _e === void 0 ? void 0 : _e.call(this));
            this.props.mounted = true;
        }));
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
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUFBLE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE9BQU8saUJBQWlCLE1BQU0saUNBQWlDLENBQUM7QUFFaEUsT0FBTyxtQkFBbUIsTUFBTSxvREFBb0QsQ0FBQztBQUNyRixPQUFPLFdBQVcsTUFBTSw2Q0FBNkMsQ0FBQztBQStDdEUsTUFBTSxDQUFDLE9BQU8sT0FBTyxRQUFTLFNBQVEsUUFBUTtJQWtGMUM7Ozs7Ozs7OztPQVNHO0lBQ0gsWUFDSSxJQUFZLEVBQ1osSUFBaUIsRUFDakIsUUFBcUM7O1FBRXJDLEtBQUssQ0FBQyxXQUFXLENBQUMsRUFBRSxFQUFFLFFBQVEsQ0FBQyxDQUFDLENBQUM7UUFFakMsSUFBSSxDQUFDLGNBQWMsR0FBRyxJQUFJLGlCQUFpQixDQUFDLElBQUksZ0RBQ3pDLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsR0FDckIsQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUMsS0FDdkMsSUFBSSxJQUNOLENBQUM7UUFFSCxPQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQ25CLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUNsRCxDQUFDO1FBRUYsZUFBZTtRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLGNBQWMsQ0FBQyxXQUFXLENBQ3hDLEVBQUUsRUFDRjtZQUNJLFNBQVMsRUFDTCxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxtQ0FDdkIsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsMENBQUUsU0FBUztTQUM5QyxDQUNKLENBQUM7UUFFRixJQUFJLENBQUMsY0FBYyxDQUFDLGNBQWMsQ0FDOUIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLGFBQWE7UUFDYixHQUFTLEVBQUU7O1lBQ1AsYUFBYTtZQUNiLE1BQU0sQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLG9EQUFJLENBQUEsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQyxDQUFBLENBQ0osQ0FBQztJQUNOLENBQUM7SUFuR0Q7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUEyQixFQUFFLEtBQVU7UUFDMUQsaUJBQWlCLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsYUFBYSxDQUNoQixJQUFZLEVBQ1osT0FBd0IsRUFDeEIsZUFBb0IsRUFBRTtRQUV0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxtQkFBbUIsQ0FBQyxJQUFJLElBQUksR0FBRyxFQUFFLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDdEMsSUFBSSxPQUFPLENBQUMsSUFBSSxFQUFFLElBQUksRUFBRSxpQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztRQUNyRSxDQUFDLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FpR0oifQ==