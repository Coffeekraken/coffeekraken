"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          color
 * @as            s.color
 * @namespace     node.function.color
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./color
 * @status        stable
 *
 * This function allows you to get a color value depending on your theme config.
 *
 * @param       {String}        color      The color to get
 * @param       {String}        [shade=null]      The color shade to get
 * @param       {String}        [modifier=null]     A color modifier like "--alpha 0.3 --saturate 20", etc...
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.color($1)
 *
 * @example       css
 * .my-element {
 *    color: s.color(accent);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class shadeNameInterface extends s_interface_1.default {
    static get _definition() {
        return {
            saturate: {
                type: 'Number|String',
                default: 0,
            },
            desaturate: {
                type: 'Number',
                default: 0,
            },
            darken: {
                type: 'Number',
                default: 0,
            },
            lighten: {
                type: 'Number',
                default: 0,
            },
            spin: {
                type: 'Number',
                default: 0,
            },
            alpha: {
                type: 'Number',
                default: 1,
            },
        };
    }
}
class SSugarcssPluginColorInterface extends s_interface_1.default {
    static get _definition() {
        return {
            color: {
                type: 'String',
                alias: 'c',
                required: true,
            },
            shade: {
                type: 'String',
                alias: 'v',
            },
            modifier: {
                type: 'String',
                alias: 'm',
            },
        };
    }
}
exports.interface = SSugarcssPluginColorInterface;
function color({ params, }) {
    const finalParams = Object.assign({ color: '', shade: undefined, modifier: undefined }, params);
    // const colorObj = __STheme.resolveColor(
    //     finalParams.color,
    //     finalParams.shade,
    //     finalParams.modifier,
    //     {
    //         return: 'object',
    //     },
    // );
    return `${s_theme_1.default.resolveColor(finalParams.color, finalParams.shade, finalParams.modifier, {
        return: 'var',
    })}`;
}
exports.default = color;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7Ozs7QUFFZCw0RUFBcUQ7QUFDckQsb0VBQTZDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSxrQkFBbUIsU0FBUSxxQkFBWTtJQUN6QyxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxlQUFlO2dCQUNyQixPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsVUFBVSxFQUFFO2dCQUNSLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxPQUFPLEVBQUUsQ0FBQzthQUNiO1lBQ0QsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDO2FBQ2I7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsT0FBTyxFQUFFLENBQUM7YUFDYjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFFRCxNQUFNLDZCQUE4QixTQUFRLHFCQUFZO0lBQ3BELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7Z0JBQ1YsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsS0FBSyxFQUFFLEdBQUc7YUFDYjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUN5QyxrREFBUztBQVFuRCxTQUF3QixLQUFLLENBQUMsRUFDMUIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLEVBQ1QsS0FBSyxFQUFFLFNBQVMsRUFDaEIsUUFBUSxFQUFFLFNBQVMsSUFDaEIsTUFBTSxDQUNaLENBQUM7SUFFRiwwQ0FBMEM7SUFDMUMseUJBQXlCO0lBQ3pCLHlCQUF5QjtJQUN6Qiw0QkFBNEI7SUFDNUIsUUFBUTtJQUNSLDRCQUE0QjtJQUM1QixTQUFTO0lBQ1QsS0FBSztJQUVMLE9BQU8sR0FBRyxpQkFBUSxDQUFDLFlBQVksQ0FDM0IsV0FBVyxDQUFDLEtBQUssRUFDakIsV0FBVyxDQUFDLEtBQUssRUFDakIsV0FBVyxDQUFDLFFBQVEsRUFDcEI7UUFDSSxNQUFNLEVBQUUsS0FBSztLQUNoQixDQUNKLEVBQUUsQ0FBQztBQUNSLENBQUM7QUE3QkQsd0JBNkJDIn0=