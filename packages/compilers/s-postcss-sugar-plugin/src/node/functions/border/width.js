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
        required: true
    }
};
export { postcssSugarPluginBorderWidthFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ width: '' }, params);
    const width = finalParams.width;
    if (__theme().config('border.width')[width] === undefined)
        return width;
    const widthes = width.split(' ').map((s) => {
        const width = __theme().config(`border.width.${s}`);
        if (!width)
            return width;
        return `var(${__minifyVar(`--s-theme-border-width-${s}`)})`;
    });
    return widthes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUN4QyxPQUFPLFdBQVcsTUFBTSx1QkFBdUIsQ0FBQztBQUVoRCxNQUFNLDhDQUErQyxTQUFRLFlBQVk7O0FBQ2hFLHlEQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7UUFDckQsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUsOENBQThDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNdkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBR1A7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFaEMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXhFLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDekMsTUFBTSxLQUFLLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGdCQUFnQixDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQ3BELElBQUksQ0FBQyxLQUFLO1lBQUUsT0FBTyxLQUFLLENBQUM7UUFDekIsT0FBTyxPQUFPLFdBQVcsQ0FBQywwQkFBMEIsQ0FBQyxFQUFFLENBQUMsR0FBRyxDQUFDO0lBQzlELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzNCLENBQUMifQ==