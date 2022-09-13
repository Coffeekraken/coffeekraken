"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const css_1 = require("@coffeekraken/sugar/css");
/**
 * @name          family
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface      ./family
 * @status        beta
 *
 * This function allows you to get a font family value depending on your theme config
 *
 * @param       {String}        name      The font name to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      font-family: sugar.font.family(code);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginFontFamilyInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
                alias: 'n',
            },
        };
    }
}
exports.interface = postcssSugarPluginFontFamilyInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ name: '' }, params);
    const name = finalParams.name;
    if ((0, css_1.__isValidUnitValue)(name)) {
        return name;
    }
    return `sugar.theme(font.family.${name}.font-family)`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxpREFBNkQ7QUFFN0Q7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBb0JHO0FBRUgsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2dCQUNkLEtBQUssRUFBRSxHQUFHO2FBQ2I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQ2lELDBEQUFTO0FBTTNELG1CQUF5QixFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUM7SUFFOUIsSUFBSSxJQUFBLHdCQUFrQixFQUFDLElBQUksQ0FBQyxFQUFFO1FBQzFCLE9BQU8sSUFBSSxDQUFDO0tBQ2Y7SUFFRCxPQUFPLDJCQUEyQixJQUFJLGVBQWUsQ0FBQztBQUMxRCxDQUFDO0FBakJELDRCQWlCQyJ9