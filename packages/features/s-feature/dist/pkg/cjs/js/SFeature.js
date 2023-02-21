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
        this.utils = new s_component_utils_1.default(node, Object.assign(Object.assign(Object.assign({}, ((_a = this.settings) !== null && _a !== void 0 ? _a : {})), ((_b = this.settings.componentUtils) !== null && _b !== void 0 ? _b : {})), { useTagNameForClassName: false, name }));
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHdGQUFnRTtBQUVoRSxpREFBNkU7QUFDN0UsdURBQXlEO0FBZ0R6RCxNQUFxQixRQUFTLFNBQVEsaUJBQVE7SUE2RjFDOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksSUFBWSxFQUNaLElBQWlCLEVBQ2pCLFFBQXFDOztRQUVyQyxLQUFLLENBQUMsSUFBQSxvQkFBVyxFQUFDLEVBQUUsRUFBRSxRQUFRLENBQUMsQ0FBQyxDQUFDO1FBRWpDLHlCQUF5QjtRQUN6QixJQUFJLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO1lBQ3JCLElBQUEsbUJBQWEsRUFBQyxJQUFJLENBQUMsUUFBUSxDQUFDLEtBQUssRUFBRTtnQkFDL0IsRUFBRSxFQUFFLGFBQWEsSUFBSSxFQUFFO2FBQzFCLENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLDJCQUFpQixDQUFDLElBQUksZ0RBQ2hDLENBQUMsTUFBQSxJQUFJLENBQUMsUUFBUSxtQ0FBSSxFQUFFLENBQUMsR0FDckIsQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYyxtQ0FBSSxFQUFFLENBQUMsS0FDdkMsc0JBQXNCLEVBQUUsS0FBSyxFQUM3QixJQUFJLElBQ04sQ0FBQztRQUVILE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixPQUFPO1FBQ1AsSUFBSSxDQUFDLElBQUksR0FBRyxJQUFJLENBQUM7UUFFakIsZUFBZTtRQUNmLElBQUksQ0FBQyxLQUFLLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQy9CLEVBQUUsRUFDRjtZQUNJLFNBQVMsRUFDTCxNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsU0FBUyxtQ0FDdkIsTUFBQSxJQUFJLENBQUMsUUFBUSxDQUFDLGNBQWMsMENBQUUsU0FBUztTQUM5QyxDQUNKLENBQUM7UUFFRixvQ0FBb0M7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsR0FBRyxDQUFDLEdBQUcsSUFBSSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsRUFBRSxDQUFDLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7UUFFMUQsSUFBSSxDQUFDLEtBQUssQ0FBQyxjQUFjLENBQ3JCLElBQUksQ0FBQyxLQUFLLENBQUMsU0FBUztRQUNwQixhQUFhO1FBQ2IsR0FBUyxFQUFFOztZQUNQLGFBQWE7WUFDYixNQUFNLENBQUEsTUFBQSxJQUFJLENBQUMsS0FBSyxvREFBSSxDQUFBLENBQUM7WUFDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxPQUFPLEdBQUcsSUFBSSxDQUFDO1FBQzlCLENBQUMsQ0FBQSxDQUNKLENBQUM7SUFDTixDQUFDO0lBbkhEOzs7Ozs7Ozs7Ozs7Ozs7T0FlRztJQUNILE1BQU0sQ0FBQyxlQUFlLENBQUMsUUFBMkIsRUFBRSxLQUFVO1FBQzFELDJCQUFpQixDQUFDLGVBQWUsQ0FBQyxRQUFRLEVBQUUsS0FBSyxDQUFDLENBQUM7SUFDdkQsQ0FBQztJQUVEOzs7Ozs7Ozs7Ozs7OztPQWNHO0lBQ0gsTUFBTSxDQUFDLE1BQU0sQ0FDVCxJQUFZLEVBQ1osVUFBMkIsRUFDM0IsZUFBb0IsRUFBRTtRQUV0QixJQUFJLENBQUMsZUFBZSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUN6QyxJQUFBLHlCQUFtQixFQUNmLElBQUksSUFBSSxHQUFHLEVBQ1gsQ0FBQyxJQUFJLEVBQUUsRUFBRTtZQUNMLElBQUksVUFBVSxDQUNWLElBQUksRUFDSixJQUFJLEVBQ0osMkJBQWlCLENBQUMsZUFBZSxDQUFDLElBQUksQ0FBQyxDQUMxQyxDQUFDO1FBQ04sQ0FBQyxFQUNEO1FBQ0ksc0JBQXNCO1NBQ3pCLENBQ0osQ0FBQztJQUNOLENBQUM7Q0F1R0o7QUFsTUQsMkJBa01DIn0=