"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name           shape
 * @namespace      node.mixin.shape
 * @type           PostcssMixin
 * @platform        css
 * @status        beta
 *
 * This mixin allows you to apply a shape to any element that support it
 * by using the `border-radius: sugar.border.radius(shape)` statement like the buttons,
 * badges, etc...
 *
 * @param           {'square'|'pill'}           $shape      The shape you want for your item
 * @return        {Css}           The generated css
 *
 * @snippet         @sugar.shape($1)
 *
 * @example        css
 * .btn {
 *    @sugar.shape(square);
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
                --s-shape: sugar.border.radius();
            `);
            break;
        default:
            vars.push(`
                border-radius: sugar.border.radius(shape);
            `);
            break;
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsV0FBVyxFQUNQLGlKQUFpSjtnQkFDckosTUFBTSxFQUFFLENBQUMsUUFBUSxFQUFFLE1BQU0sRUFBRSxTQUFTLENBQUM7YUFDeEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTTRDLHFEQUFTO0FBQ3RELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsSUFBSSxJQUNSLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLFFBQVE7SUFDUixRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDdkIsS0FBSyxRQUFRO1lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7YUFFVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxNQUFNO1lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7YUFFVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1YsS0FBSyxTQUFTO1lBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7YUFFVCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1Y7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzthQUVULENBQUMsQ0FBQztZQUNILE1BQU07S0FDYjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUF6Q0QsNEJBeUNDIn0=