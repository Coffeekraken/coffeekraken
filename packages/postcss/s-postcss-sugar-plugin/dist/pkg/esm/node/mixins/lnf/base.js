import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginLiikAndFeelBaseInterface extends __SInterface {
    static get _definition() {
        return {};
    }
}
export { postcssSugarPluginLiikAndFeelBaseInterface as interface };
/**
 * @name          base
 * @as          @s.lnf.base
 * @namespace     node.mixin.lnf
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 * @private
 *
 * This mixin apply some base look and feel depending on the current theme like:
 *
 * - Page background using the <s-color="accent">background</s-color> theme color
 * - Text color using the <s-color="accent">default</s-color> theme color
 *
 * @param       {String}        layout      The layout to generate
 * @return      {Css}                   The corresponding grid css
 *
 * @snippet         @s.lnf.base
 *
 * @example       css
 * @s.lnf.base;
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const css = `
        color: s.color(main, text);
        background-color: s.color(main, background);
        @s.font.family(default);
        @s.font.size(default);
        @s.shape(default);
        --s-scale: s.theme(scale.default);

        @s.wireframe {
            color: rgba(0, 0, 0, 0.5);
            @s.wireframe.background;

            @s.theme dark {
                color: rgba(255, 255, 255, 0.7);
            }
        }       

  `;
    vars.push(css);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0sMENBQTJDLFNBQVEsWUFBWTtJQUNqRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPLEVBQUUsQ0FBQztJQUNkLENBQUM7Q0FDSjtBQUlELE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVuRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxxQkFDVixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLEdBQUcsR0FBRzs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FpQmIsQ0FBQztJQUVBLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=