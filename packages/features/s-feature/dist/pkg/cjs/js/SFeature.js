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
class SFeature extends s_class_1.default {
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
}
exports.default = SFeature;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBQUEsb0VBQTZDO0FBRTdDLHdGQUFnRTtBQUVoRSxpREFBNkU7QUFpRDdFLE1BQXFCLFFBQVMsU0FBUSxpQkFBUTtJQXFDMUM7Ozs7Ozs7Ozs7Ozs7OztPQWVHO0lBQ0gsTUFBTSxDQUFDLGVBQWUsQ0FBQyxRQUEyQixFQUFFLEtBQVU7UUFDMUQsMkJBQWlCLENBQUMsZUFBZSxDQUFDLFFBQVEsRUFBRSxLQUFLLENBQUMsQ0FBQztJQUN2RCxDQUFDO0lBRUQ7Ozs7Ozs7Ozs7Ozs7O09BY0c7SUFDSCxNQUFNLENBQUMsTUFBTSxDQUNULElBQVksRUFDWixVQUEyQixFQUMzQixlQUFvQixFQUFFO1FBRXRCLElBQUksQ0FBQyxlQUFlLENBQUMsSUFBSSxFQUFFLFlBQVksQ0FBQyxDQUFDO1FBQ3pDLElBQUEseUJBQW1CLEVBQ2YsSUFBSSxJQUFJLEdBQUcsRUFDWCxDQUFDLElBQUksRUFBRSxFQUFFO1lBQ0wsSUFBSSxVQUFVLENBQ1YsSUFBSSxFQUNKLElBQUksRUFDSiwyQkFBaUIsQ0FBQyxlQUFlLENBQUMsSUFBSSxDQUFDLENBQzFDLENBQUM7UUFDTixDQUFDLEVBQ0Q7UUFDSSxzQkFBc0I7U0FDekIsQ0FDSixDQUFDO0lBQ04sQ0FBQztJQUVEOzs7Ozs7Ozs7T0FTRztJQUNILFlBQ0ksSUFBWSxFQUNaLElBQWlCLEVBQ2pCLFFBQXFDOztRQUVyQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUM7UUFFaEIseUJBQXlCO1FBQ3pCLElBQUksSUFBSSxDQUFDLFFBQVEsQ0FBQyxLQUFLLEVBQUU7WUFDckIsSUFBQSxtQkFBYSxFQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsS0FBSyxFQUFFO2dCQUMvQixFQUFFLEVBQUUsYUFBYSxJQUFJLEVBQUU7YUFDMUIsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsS0FBSyxHQUFHLElBQUksMkJBQWlCLENBQUMsSUFBSSxnREFDaEMsQ0FBQyxNQUFBLElBQUksQ0FBQyxRQUFRLG1DQUFJLEVBQUUsQ0FBQyxHQUNyQixDQUFDLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxjQUFjLG1DQUFJLEVBQUUsQ0FBQyxLQUN2QyxzQkFBc0IsRUFBRSxLQUFLLEVBQzdCLElBQUksSUFDTixDQUFDO1FBRUgsT0FBTztRQUNQLElBQUksQ0FBQyxJQUFJLEdBQUcsSUFBSSxDQUFDO1FBRWpCLE9BQU87UUFDUCxJQUFJLENBQUMsSUFBSSxHQUFHLElBQUksQ0FBQztRQUVqQixlQUFlO1FBQ2YsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FDL0IsRUFBRSxFQUNGO1lBQ0ksU0FBUyxFQUNMLE1BQUEsSUFBSSxDQUFDLFFBQVEsQ0FBQyxTQUFTLG1DQUN2QixNQUFBLElBQUksQ0FBQyxRQUFRLENBQUMsY0FBYywwQ0FBRSxTQUFTO1NBQzlDLENBQ0osQ0FBQztRQUVGLG9DQUFvQztRQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxHQUFHLENBQUMsR0FBRyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxFQUFFLENBQUMsQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztRQUUxRCxJQUFJLENBQUMsS0FBSyxDQUFDLGNBQWMsQ0FDckIsSUFBSSxDQUFDLEtBQUssQ0FBQyxTQUFTO1FBQ3BCLGFBQWE7UUFDYixHQUFTLEVBQUU7O1lBQ1AsYUFBYTtZQUNiLE1BQU0sQ0FBQSxNQUFBLElBQUksQ0FBQyxLQUFLLG9EQUFJLENBQUEsQ0FBQztZQUNyQixJQUFJLENBQUMsS0FBSyxDQUFDLE9BQU8sR0FBRyxJQUFJLENBQUM7UUFDOUIsQ0FBQyxDQUFBLENBQ0osQ0FBQztJQUNOLENBQUM7Q0EwQ0o7QUFsTUQsMkJBa01DIn0=