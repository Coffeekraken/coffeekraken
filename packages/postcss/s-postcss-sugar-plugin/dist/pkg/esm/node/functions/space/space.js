import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          space
 * @as          sugar.space
 * @namespace     node.function.space
 * @type          PostcssFunction
 * @platform      postcss
 * @interface    ./space
 * @status        beta
 *
 * This function allows you to get a space value depending on your theme config
 *
 * @param       {String}        space      The space to get
 * @return      {Css}                   The corresponding css
 *
 * @snippet         sugar.space($1)
 *
 * @example       css
 * .my-element {
 *    padding: sugar.space(20);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            space: {
                type: 'String',
                values: Object.keys(__STheme.get('space')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginSpaceFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ space: '' }, params);
    const space = finalParams.space;
    if (__STheme.get('space')[space] === undefined)
        return space;
    const spaces = space.split(' ').map((s) => {
        const size = __STheme.get(`space.${s}`);
        if (!size)
            return size;
        return `var(${`--s-theme-space-${s}`}, ${size})`;
    });
    return spaces.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sd0NBQXlDLFNBQVEsWUFBWTtJQUMvRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDLENBQUM7Z0JBQzFDLE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFaEMsSUFBSSxRQUFRLENBQUMsR0FBRyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUU3RCxNQUFNLE1BQU0sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3RDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLENBQUMsU0FBUyxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3hDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDdkIsT0FBTyxPQUFPLG1CQUFtQixDQUFDLEVBQUUsS0FBSyxJQUFJLEdBQUcsQ0FBQztJQUNyRCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM1QixDQUFDIn0=