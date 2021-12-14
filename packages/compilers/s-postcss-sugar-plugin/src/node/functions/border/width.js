import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          width
 * @namespace     node.function.border
 * @type          PostcssFunction
 * @platform      postcss
 * @status        beta
 *
 * This function allows you to get a border width value depending on your theme config
 *
 * @param       {String}        width      The width to get
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *    border-width: sugar.border.width(50);
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
    static get _definition() {
        return {
            width: {
                type: 'String',
                values: Object.keys(__STheme.config('border.width')),
                default: 'default',
                required: true,
            },
        };
    }
}
export { postcssSugarPluginBorderWidthFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ width: '' }, params);
    const width = finalParams.width;
    if (__STheme.config('border.width')[width] === undefined)
        return width;
    const widthes = width.split(' ').map((s) => {
        const width = __STheme.config(`border.width.${s}`);
        if (!width)
            return width;
        return `var(${`--s-theme-border-width-${s}`}) ${finalParams.width !== 'default' ? '!important' : ''}`;
    });
    return widthes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3Qzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILE1BQU0sOENBQStDLFNBQVEsWUFBWTtJQUNyRSxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7Z0JBQ3BELE9BQU8sRUFBRSxTQUFTO2dCQUNsQixRQUFRLEVBQUUsSUFBSTthQUNqQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFDRCxPQUFPLEVBQUUsOENBQThDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNdkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFaEMsSUFBSSxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV2RSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxNQUFNLENBQUMsZ0JBQWdCLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDbkQsSUFBSSxDQUFDLEtBQUs7WUFBRSxPQUFPLEtBQUssQ0FBQztRQUN6QixPQUFPLE9BQU8sMEJBQTBCLENBQUMsRUFBRSxLQUN2QyxXQUFXLENBQUMsS0FBSyxLQUFLLFNBQVMsQ0FBQyxDQUFDLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQyxFQUNyRCxFQUFFLENBQUM7SUFDUCxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUM3QixDQUFDIn0=