import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          radius
 * @namespace     node.mixins.border
 * @type          PostcssMixin
 * @platform      css
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
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginBorderRadiusMixinInterface extends __SInterface {
}
postcssSugarPluginBorderRadiusMixinInterface.definition = {
    radius: {
        type: 'Number|String',
        required: true,
        default: __STheme.config('border.radius.default'),
    },
};
export { postcssSugarPluginBorderRadiusMixinInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ radius: 0 }, params);
    const vars = [
        `border-radius: sugar.border.radius(${finalParams.radius});`,
    ];
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaXVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaXVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBc0JHO0FBRUgsTUFBTSw0Q0FBNkMsU0FBUSxZQUFZOztBQUM1RCx1REFBVSxHQUFHO0lBQ2hCLE1BQU0sRUFBRTtRQUNKLElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDcEQ7Q0FDSixDQUFDO0FBT04sT0FBTyxFQUFFLDRDQUE0QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRXJFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsTUFBTSxFQUFFLENBQUMsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ25CLHNDQUFzQyxXQUFXLENBQUMsTUFBTSxJQUFJO0tBQy9ELENBQUM7SUFDRixXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9