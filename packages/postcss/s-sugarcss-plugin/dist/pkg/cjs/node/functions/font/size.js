"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          size
 * @as              s.font.size
 * @namespace     node.function.font
 * @type          PostcssFunction
 * @platform      postcss
 * @interface     ./size
 * @status        stable
 *
 * This function allows you to get a border size value depending on your theme config
 *
 * @param       {Number}        size      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.font']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.font.size($1)
 *
 * @example       css
 * .my-element {
 *    font-size: s.font.size(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginFontSizeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            size: {
                type: 'String',
                required: true,
                alias: 's',
            },
            scalable: {
                type: 'Boolean',
                default: s_theme_1.default.current.get('scalable.font'),
            },
        };
    }
}
exports.interface = SSugarcssPluginFontSizeInterface;
function default_1({ params, }) {
    const finalParams = Object.assign({ size: '', scalable: false }, params);
    let sizes = finalParams.size.split(' ').map((s) => {
        let size = s;
        // try to get the padding with the pased
        let val = s_theme_1.default.current.getSafe(`fontSize.${size}`);
        if (val !== undefined) {
            size = val;
        }
        if (isNaN(parseFloat(size)) &&
            size.match(/[a-zA-Z0-9]+\.[a-zA-Z0-9]+/) &&
            !size.match(/^s\./)) {
            return `s.theme(${size}, ${finalParams.scalable})`;
        }
        else if (`${size}`.match(/[a-zA-Z]+$/)) {
            if (finalParams.scalable) {
                return `s.scalable(${size})`;
            }
            return `${size}`;
        }
        else {
            if (finalParams.scalable) {
                return `calc(s.scalable(${size}) * 1px)`;
            }
            return `${size}px`;
        }
    });
    return sizes.join(' ');
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7SUFDdkQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILElBQUksRUFBRTtnQkFDRixJQUFJLEVBQUUsUUFBUTtnQkFDZCxRQUFRLEVBQUUsSUFBSTtnQkFDZCxLQUFLLEVBQUUsR0FBRzthQUNiO1lBQ0QsUUFBUSxFQUFFO2dCQUNOLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsZUFBZSxDQUFDO2FBQ2pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUM0QyxxREFBUztBQU90RCxtQkFBeUIsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLElBQUksRUFBRSxFQUFFLEVBQ1IsUUFBUSxFQUFFLEtBQUssSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksS0FBSyxHQUFHLFdBQVcsQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQzlDLElBQUksSUFBSSxHQUFHLENBQUMsQ0FBQztRQUViLHdDQUF3QztRQUN4QyxJQUFJLEdBQUcsR0FBRyxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxJQUFJLEVBQUUsQ0FBQyxDQUFDO1FBQ3ZELElBQUksR0FBRyxLQUFLLFNBQVMsRUFBRTtZQUNuQixJQUFJLEdBQUcsR0FBRyxDQUFDO1NBQ2Q7UUFFRCxJQUNJLEtBQUssQ0FBQyxVQUFVLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDdkIsSUFBSSxDQUFDLEtBQUssQ0FBQyw0QkFBNEIsQ0FBQztZQUN4QyxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLEVBQ3JCO1lBQ0UsT0FBTyxXQUFXLElBQUksS0FBSyxXQUFXLENBQUMsUUFBUSxHQUFHLENBQUM7U0FDdEQ7YUFBTSxJQUFJLEdBQUcsSUFBSSxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ3RDLElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtnQkFDdEIsT0FBTyxjQUFjLElBQUksR0FBRyxDQUFDO2FBQ2hDO1lBQ0QsT0FBTyxHQUFHLElBQUksRUFBRSxDQUFDO1NBQ3BCO2FBQU07WUFDSCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLE9BQU8sbUJBQW1CLElBQUksVUFBVSxDQUFDO2FBQzVDO1lBQ0QsT0FBTyxHQUFHLElBQUksSUFBSSxDQUFDO1NBQ3RCO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLEtBQUssQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDM0IsQ0FBQztBQXhDRCw0QkF3Q0MifQ==