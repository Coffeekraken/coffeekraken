"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          space
 * @as          sugar.space
 * @namespace     node.function.space
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./space
 * @status        beta
 *
 * This function allows you to get a space value depending on your theme config
 *
 * @param       {String}        space      The space to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.space($1)
 *
 * @example       css
 * .my-element {
 *    padding: sugar.space(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginSpaceFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            space: {
                type: 'String',
                values: Object.keys(s_theme_1.default.get('space')),
                default: 'default',
                required: true,
            },
        };
    }
}
exports.interface = postcssSugarPluginSpaceFunctionInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ space: '' }, params);
    const space = finalParams.space;
    if (s_theme_1.default.get('space')[space] === undefined)
        return space;
    const spaces = space.split(' ').map((s) => {
        const size = s_theme_1.default.get(`space.${s}`);
        if (!size)
            return size;
        return `var(${`--s-theme-space-${s}`}, ${size})`;
    });
    return spaces.join(' ');
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBdUJHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxxQkFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDO2dCQUMxQyxPQUFPLEVBQUUsU0FBUztnQkFDbEIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ29ELDZEQUFTO0FBTTlELG1CQUF5QixFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFaEMsSUFBSSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxPQUFPLENBQUMsQ0FBQyxLQUFLLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTyxLQUFLLENBQUM7SUFFN0QsTUFBTSxNQUFNLEdBQUcsS0FBSyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxNQUFNLElBQUksR0FBRyxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxTQUFTLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDeEMsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2QixPQUFPLE9BQU8sbUJBQW1CLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ3JELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzVCLENBQUM7QUFyQkQsNEJBcUJDIn0=