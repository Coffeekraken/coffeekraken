import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          radius
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a border radius value depending on your theme config
 *
 * @param       {String}        radius      The radius to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    border-radius: sugar.border.radius(30);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginBorderRadiusFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            radius: {
                type: 'String',
                values: Object.keys(__STheme.config('border.radius')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginBorderRadiusFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ radius: '' }, params);
    const radius = finalParams.radius;
    if (__STheme.config('border.radius')[radius] === undefined)
        return radius;
    const radiuses = radius.split(' ').map((s) => {
        return `var(${`--s-theme-border-radius-${s}`}) ${finalParams.radius !== 'default' ? '!important' : ''}`;
    });
    return radiuses.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmFkaXVzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicmFkaXVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBbUJHO0FBRUgsTUFBTSwrQ0FBZ0QsU0FBUSxZQUFZO0lBQ3RFLE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxNQUFNLEVBQUU7Z0JBQ0osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxlQUFlLENBQUMsQ0FBQztnQkFDckQsT0FBTyxFQUFFLFNBQVM7Z0JBQ2xCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQUNELE9BQU8sRUFBRSwrQ0FBK0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU14RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsRUFBRSxJQUNQLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUVsQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsTUFBTSxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sTUFBTSxDQUFDO0lBRTFFLE1BQU0sUUFBUSxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDekMsT0FBTyxPQUFPLDJCQUEyQixDQUFDLEVBQUUsS0FDeEMsV0FBVyxDQUFDLE1BQU0sS0FBSyxTQUFTLENBQUMsQ0FBQyxDQUFDLFlBQVksQ0FBQyxDQUFDLENBQUMsRUFDdEQsRUFBRSxDQUFDO0lBQ1AsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQyJ9