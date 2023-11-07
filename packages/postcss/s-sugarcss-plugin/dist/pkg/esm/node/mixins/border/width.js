import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          width
 * @as              @s.border.width
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        stable
 *
 * This mixin allows you to apply a border width with a value coming
 * from the config.theme.border.width stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border width value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @s.border.width(10);
 *
 * @snippet         @s.border.width($1)
 *
 * @example       css
 * .my-element {
 *    @s.border.width(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginBorderwidthMixinInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'Number|String',
                required: true,
                default: __STheme.get('border.width.default'),
            },
        };
    }
}
export { SSugarcssPluginBorderwidthMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ width: 0 }, params);
    const vars = new CssVars();
    vars.code(`
        border-width: s.border.width(${finalParams.width});
    `);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBeUJHO0FBRUgsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZO0lBQy9ELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHNCQUFzQixDQUFDO2FBQ2hEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVqRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsQ0FBQyxJQUNMLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDO3VDQUN5QixXQUFXLENBQUMsS0FBSztLQUNuRCxDQUFDLENBQUM7SUFDSCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=