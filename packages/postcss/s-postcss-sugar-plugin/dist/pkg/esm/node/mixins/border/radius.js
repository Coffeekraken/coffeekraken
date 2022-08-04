import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          radius
 * @namespace     node.mixin.border
 * @type          PostcssMixin
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to apply a border radius with a value coming
 * from the config.theme.border.radius stack like 10, 20, etc...
 *
 * @param       {Number}      value     The border radius value you want to apply like 10, 20, etc...
 * @return      {Css}                   The generated css
 *
 * @todo      Add multiple values support like @sugar.border.radius(10 20);
 *
 * @example       css
 * .my-element {
 *    @sugar.border.radius(10);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderRadiusMixinInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'Number|String',
                required: true,
                default: __STheme.get('border.radius.default'),
            },
        };
    }
}
export { postcssSugarPluginBorderRadiusMixinInterface as interface };
export default function ({ params, atRule, CssVars, replaceWith, }) {
    const finalParams = Object.assign({ radius: 0 }, params);
    const vars = new CssVars();
    vars.code(`border-radius: sugar.border.radius(${finalParams.radius});`);
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZO0lBQ25FLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLGVBQWU7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2dCQUNkLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ2pEO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSw0Q0FBNEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUVyRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sT0FBTyxFQUNQLFdBQVcsR0FNZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsQ0FBQyxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUMzQixJQUFJLENBQUMsSUFBSSxDQUFDLHNDQUFzQyxXQUFXLENBQUMsTUFBTSxJQUFJLENBQUMsQ0FBQztJQUN4RSxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=