"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_component_utils_1 = __importDefault(require("@coffeekraken/s-component-utils"));
const querySelectorLive_1 = __importDefault(require("@coffeekraken/sugar/js/dom/query/querySelectorLive"));
const deepMerge_1 = __importDefault(require("@coffeekraken/sugar/shared/object/deepMerge"));
class SFeature extends s_class_1.default {
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
        var _a, _b, _c, _d, _e;
        super((0, deepMerge_1.default)({}, settings));
        this.componentUtils = new s_component_utils_1.default(node, Object.assign(Object.assign(Object.assign({}, ((_a = this.settings) !== null && _a !== void 0 ? _a : {})), ((_b = this.settings.componentUtils) !== null && _b !== void 0 ? _b : {})), { name }));
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
        // @ts-ignore
        this.componentUtils.waitAndExecute(this.props.mountWhen, 
        // @ts-ignore
        (_e = this.mount) === null || _e === void 0 ? void 0 : _e.bind(this));
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
        (0, querySelectorLive_1.default)(`[${name}]`, ($elm) => {
            new feature(name, $elm, s_component_utils_1.default.getDefaultProps(name));
        });
    }
}
exports.default = SFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHdGQUFnRTtBQUVoRSwyR0FBcUY7QUFDckYsNEZBQXNFO0FBK0N0RSxNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUFrRjFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksSUFBWSxFQUNaLElBQWlCLEVBQ2pCLFFBQXFDOztRQUVyQyxLQUFLLENBQUMsSUFBQSxtQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpDLElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSwyQkFBaUIsQ0FBQyxJQUFJLGdEQUN6QyxDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsbUNBQUksRUFBRSxDQUFDLEdBQ3JCLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsbUNBQUksRUFBRSxDQUFDLEtBQ3ZDLElBQUksSUFDTixDQUFDO1FBRUgsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUNuQixHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FDbEQsQ0FBQztRQUVGLGVBQWU7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxjQUFjLENBQUMsV0FBVyxDQUN4QyxFQUFFLEVBQ0Y7WUFDSSxTQUFTLEVBQ0wsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsbUNBQ3ZCLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLDBDQUFFLFNBQVM7U0FDOUMsQ0FDSixDQUFDO1FBRUYsYUFBYTtRQUNiLElBQUksQ0FBQyxjQUFjLENBQUMsY0FBYyxDQUM5QixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDcEIsYUFBYTtRQUNiLE1BQUEsSUFBSSxDQUFDLEtBQUssMENBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUN6QixDQUFDO0lBQ04sQ0FBQztJQWhHRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCwyQkFBaUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxhQUFhLENBQ2hCLElBQVksRUFDWixPQUF3QixFQUN4QixlQUFvQixFQUFFO1FBRXRCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLElBQUEsMkJBQW1CLEVBQUMsSUFBSSxJQUFJLEdBQUcsRUFBRSxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ3RDLElBQUksT0FBTyxDQUFDLElBQUksRUFBRSxJQUFJLEVBQUUsMkJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7UUFDckUsQ0FBQyxDQUFDLENBQUM7SUFDUCxDQUFDO0NBOEZKO0FBOUtELDJCQThLQyJ9