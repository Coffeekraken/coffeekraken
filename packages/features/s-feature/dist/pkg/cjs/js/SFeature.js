"use strict";
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
const s_class_1 = __importDefault(require("@coffeekraken/s-class"));
const s_component_utils_1 = __importDefault(require("@coffeekraken/s-component-utils"));
const dom_1 = require("@coffeekraken/sugar/dom");
const object_1 = require("@coffeekraken/sugar/object");
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
        var _a, _b, _c, _d;
        super((0, object_1.__deepMerge)({}, settings));
        // inject style if needed
        if (this.settings.style) {
            (0, dom_1.__injectStyle)(this.settings.style, {
                id: `s-feature-${name}`,
            });
        }
        this.cu = new s_component_utils_1.default(node, Object.assign(Object.assign(Object.assign({}, ((_a = this.settings) !== null && _a !== void 0 ? _a : {})), ((_b = this.settings.componentUtils) !== null && _b !== void 0 ? _b : {})), { useTagNameForClassName: false, name }));
        this.componentUtils = this.cu;
        // name
        this.name = name;
        // node
        this.node = node;
        // assign props
        this.props = this.cu.handleProps({}, {
            interface: (_c = this.settings.interface) !== null && _c !== void 0 ? _c : (_d = this.settings.componentUtils) === null || _d === void 0 ? void 0 : _d.interface,
        });
        // add the base class on the feature
        this.node.classList.add(...this.cu.cls('').split(' '));
        this.cu.waitAndExecute(this.props.mountWhen, 
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
        s_component_utils_1.default.setDefaultProps(selector, props);
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
        (0, dom_1.__querySelectorLive)(`[${name}]`, ($elm) => {
            new featureCls(name, $elm, s_component_utils_1.default.getDefaultProps(name));
        }, {
        // attributes: [name],
        });
    }
}
exports.default = SFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHdGQUFnRTtBQUVoRSxpREFBNkU7QUFDN0UsdURBQXlEO0FBK0N6RCxNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUE2RjFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksSUFBWSxFQUNaLElBQWlCLEVBQ2pCLFFBQXFDOztRQUVyQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpDLHlCQUF5QjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUEsbUJBQWEsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDL0IsRUFBRSxFQUFFLGFBQWEsSUFBSSxFQUFFO2FBQzFCLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLEVBQUUsR0FBRyxJQUFJLDJCQUFpQixDQUFDLElBQUksZ0RBQzdCLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsR0FDckIsQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUMsS0FDdkMsc0JBQXNCLEVBQUUsS0FBSyxFQUM3QixJQUFJLElBQ04sQ0FBQztRQUNILElBQUksQ0FBQyxjQUFjLEdBQUcsSUFBSSxDQUFDLEVBQUUsQ0FBQztRQUU5QixPQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLGVBQWU7UUFDZixJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsV0FBVyxDQUM1QixFQUFFLEVBQ0Y7WUFDSSxTQUFTLEVBQ0wsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLFNBQVMsbUNBQ3ZCLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLDBDQUFFLFNBQVM7U0FDOUMsQ0FDSixDQUFDO1FBRUYsb0NBQW9DO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLEdBQUcsQ0FBQyxHQUFHLElBQUksQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDLEVBQUUsQ0FBQyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDO1FBRXZELElBQUksQ0FBQyxFQUFFLENBQUMsY0FBYyxDQUNsQixJQUFJLENBQUMsS0FBSyxDQUFDLFNBQVM7UUFDcEIsYUFBYTtRQUNiLEdBQVMsRUFBRTs7WUFDUCxhQUFhO1lBQ2IsTUFBTSxDQUFBLE1BQUEsSUFBSSxDQUFDLEtBQUssb0RBQUksQ0FBQSxDQUFDO1lBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxHQUFHLElBQUksQ0FBQztRQUM5QixDQUFDLENBQUEsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQXBIRDs7Ozs7Ozs7Ozs7Ozs7O09BZUc7SUFDSCxNQUFNLENBQUMsZUFBZSxDQUFDLFFBQTJCLEVBQUUsS0FBVTtRQUMxRCwyQkFBaUIsQ0FBQyxlQUFlLENBQUMsUUFBUSxFQUFFLEtBQUssQ0FBQyxDQUFDO0lBQ3ZELENBQUM7SUFFRDs7Ozs7Ozs7Ozs7Ozs7T0FjRztJQUNILE1BQU0sQ0FBQyxNQUFNLENBQ1QsSUFBWSxFQUNaLFVBQTJCLEVBQzNCLGVBQW9CLEVBQUU7UUFFdEIsSUFBSSxDQUFDLGVBQWUsQ0FBQyxJQUFJLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFDekMsSUFBQSx5QkFBbUIsRUFDZixJQUFJLElBQUksR0FBRyxFQUNYLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDTCxJQUFJLFVBQVUsQ0FDVixJQUFJLEVBQ0osSUFBSSxFQUNKLDJCQUFpQixDQUFDLGVBQWUsQ0FBQyxJQUFJLENBQUMsQ0FDMUMsQ0FBQztRQUNOLENBQUMsRUFDRDtRQUNJLHNCQUFzQjtTQUN6QixDQUNKLENBQUM7SUFDTixDQUFDO0NBd0dKO0FBbk1ELDJCQW1NQyJ9