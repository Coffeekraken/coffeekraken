"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           shape
 * @as              @s.shape
 * @namespace      node.mixin.shape
 * @type           PostcssMixin
 * @platform        css
 * @status        stable
 *
 * This mixin allows you to apply a shape to any element that support it
 * by using the `border-radius: sugar.border.radius(shape)` statement like the buttons,
 * badges, etc...
 *
 * @param           {'square'|'pill'}           $shape      The shape you want for your item
 * @return        {Css}           The generated css
 *
 * @snippet         @s.shape($1)
 *
 * @example        css
 * .btn {
 *    @s.shape(square);
 * }
 *
 * @since       2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class PostcssSugarPluginShapeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            shape: {
                type: 'String',
                description: 'Specify the shape you want. Can be "square", "pill" or "default". If not specified, will print the border-radius necessary to shape an element.',
                values: ['square', 'pill', 'default'],
            },
        };
    }
}
exports.interface = PostcssSugarPluginShapeInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ shape: null }, params);
    const vars = [];
    // shape
    switch (finalParams.shape) {
        case 'square':
            vars.push(`
                --s-shape: 0;
            `);
            break;
        case 'pill':
            vars.push(`
                --s-shape: 99999px;
            `);
            break;
        case 'default':
            vars.push(`
                --s-shape: s.border.radius();
            `);
            break;
        default:
            vars.push(`
                border-radius: s.border.radius(shape);
            `);
            break;
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLFdBQVcsRUFDUCxpSkFBaUo7Z0JBQ3JKLE1BQU0sRUFBRSxDQUFDLFFBQVEsRUFBRSxNQUFNLEVBQUUsU0FBUyxDQUFDO2FBQ3hDO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU00QyxxREFBUztBQUN0RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLElBQUksSUFDUixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixRQUFRO0lBQ1IsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLEtBQUssUUFBUTtZQUNULElBQUksQ0FBQyxJQUFJLENBQUM7O2FBRVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssTUFBTTtZQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7O2FBRVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWLEtBQUssU0FBUztZQUNWLElBQUksQ0FBQyxJQUFJLENBQUM7O2FBRVQsQ0FBQyxDQUFDO1lBQ0gsTUFBTTtRQUNWO1lBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7YUFFVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBekNELDRCQXlDQyJ9