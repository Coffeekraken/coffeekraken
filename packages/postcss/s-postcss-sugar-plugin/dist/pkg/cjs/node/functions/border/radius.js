"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          radius
 * @as            sugar.border.radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @interface       ./radius
 * @status        beta
 *
 * This function allows you to get a border radius value depending on your theme config
 *
 * @param       {String}        radius      The radius to get
 * @param       {Boolean}       [scalable='theme.scalable.padding']      Whether to scale the value or not
 * @return      {Css}                   The corresponding css
 *
 * @snippet         s.border.radius($1)
 *
 * @example       css
 * .my-element {
 *    border-radius: s.border.radius(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderRadiusFunctionInterface extends s_interface_1.default {
    static get _definition() {
        return {
            radius: {
                type: 'String',
                values: [
                    ...Object.keys(s_theme_1.default.get('border.radius')),
                    'shape',
                ],
                default: 'default',
                required: true,
            },
            scalable: {
                type: 'Boolean',
                default: s_theme_1.default.get('scalable.padding'),
            },
        };
    }
}
exports.interface = postcssSugarPluginBorderRadiusFunctionInterface;
function default_1({ params, themeValueProxy, }) {
    const finalParams = Object.assign({ radius: '', scalable: true }, params);
    let radiuses = finalParams.radius.split(' ').map((s) => {
        let val;
        // theme value
        s = themeValueProxy(s);
        // try to get the padding with the pased
        val = s_theme_1.default.getSafe(`border.radius.${s}`);
        if (val !== undefined) {
            s = val;
        }
        // default return simply his value
        if (s === 'shape') {
            return `var(--s-shape, s.theme(border.radius.default, ${finalParams.scalable}))`;
        }
        else if (`${s}`.match(/[a-zA-Z]+$/)) {
            // @ts-ignore
            if (finalParams.scalable) {
                return `s.scalable(${s})`;
            }
            return `${s}`;
        }
        else {
            return `calc(s.theme(border.radius.default, ${finalParams.scalable}) * ${s})`;
        }
    });
    return radiuses.join(' ');
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sK0NBQWdELFNBQVEscUJBQVk7SUFDdEUsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILE1BQU0sRUFBRTtnQkFDSixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUU7b0JBQ0osR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLGlCQUFRLENBQUMsR0FBRyxDQUFDLGVBQWUsQ0FBQyxDQUFDO29CQUM3QyxPQUFPO2lCQUNWO2dCQUNELE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsa0JBQWtCLENBQUM7YUFDNUM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBQzJELG9FQUFTO0FBT3JFLG1CQUF5QixFQUNyQixNQUFNLEVBQ04sZUFBZSxHQUlsQjtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsRUFBRSxFQUNWLFFBQVEsRUFBRSxJQUFJLElBQ1gsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLFFBQVEsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUNuRCxJQUFJLEdBQUcsQ0FBQztRQUVSLGNBQWM7UUFDZCxDQUFDLEdBQUcsZUFBZSxDQUFDLENBQUMsQ0FBQyxDQUFDO1FBRXZCLHdDQUF3QztRQUN4QyxHQUFHLEdBQUcsaUJBQVEsQ0FBQyxPQUFPLENBQUMsaUJBQWlCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFFN0MsSUFBSSxHQUFHLEtBQUssU0FBUyxFQUFFO1lBQ25CLENBQUMsR0FBRyxHQUFHLENBQUM7U0FDWDtRQUVELGtDQUFrQztRQUNsQyxJQUFJLENBQUMsS0FBSyxPQUFPLEVBQUU7WUFDZixPQUFPLGlEQUFpRCxXQUFXLENBQUMsUUFBUSxJQUFJLENBQUM7U0FDcEY7YUFBTSxJQUFJLEdBQUcsQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLFlBQVksQ0FBQyxFQUFFO1lBQ25DLGFBQWE7WUFDYixJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7Z0JBQ3RCLE9BQU8sY0FBYyxDQUFDLEdBQUcsQ0FBQzthQUM3QjtZQUNELE9BQU8sR0FBRyxDQUFDLEVBQUUsQ0FBQztTQUNqQjthQUFNO1lBQ0gsT0FBTyx1Q0FBdUMsV0FBVyxDQUFDLFFBQVEsT0FBTyxDQUFDLEdBQUcsQ0FBQztTQUNqRjtJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxRQUFRLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzlCLENBQUM7QUF6Q0QsNEJBeUNDIn0=