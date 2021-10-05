import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';
class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
}
postcssSugarPluginBorderWidthFunctionInterface.definition = {
    width: {
        type: 'String',
        values: Object.keys(__theme().config('border.width')),
        default: 'default',
        required: true,
    },
};
export { postcssSugarPluginBorderWidthFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ width: '' }, params);
    const width = finalParams.width;
    if (__theme().config('border.width')[width] === undefined)
        return width;
    const widthes = width.split(' ').map((s) => {
        const width = __theme().config(`border.width.${s}`);
        if (!width)
            return width;
        return `var(${__minifyVar(`--s-theme-border-width-${s}`)}) ${finalParams.width !== 'default' ? '!important' : ''}`;
    });
    return widthes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUN4QyxPQUFPLFdBQVcsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRCxNQUFNLDhDQUErQyxTQUFRLFlBQVk7O0FBQzlELHlEQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDakI7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLDhDQUE4QyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBTXZFLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLEtBQUssR0FBRyxXQUFXLENBQUMsS0FBSyxDQUFDO0lBRWhDLElBQUksT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLEtBQUssQ0FBQyxLQUFLLFNBQVM7UUFBRSxPQUFPLEtBQUssQ0FBQztJQUV4RSxNQUFNLE9BQU8sR0FBRyxLQUFLLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3ZDLE1BQU0sS0FBSyxHQUFHLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3pCLE9BQU8sT0FBTyxXQUFXLENBQUMsMEJBQTBCLENBQUMsRUFBRSxDQUFDLEtBQ3BELFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ3JELEVBQUUsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUMifQ==