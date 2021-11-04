import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginBorderWidthFunctionInterface extends __SInterface {
}
postcssSugarPluginBorderWidthFunctionInterface.definition = {
    width: {
        type: 'String',
        values: Object.keys(__STheme.config('border.width')),
        default: 'default',
        required: true,
    },
};
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2lkdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ3aWR0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLFFBQVEsTUFBTSx1QkFBdUIsQ0FBQztBQUU3QyxNQUFNLDhDQUErQyxTQUFRLFlBQVk7O0FBQzlELHlEQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO1FBQ3BELE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSw4Q0FBOEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU12RSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsV0FBVyxDQUFDLEtBQUssQ0FBQztJQUVoQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRXZFLE1BQU0sT0FBTyxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdkMsTUFBTSxLQUFLLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxnQkFBZ0IsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUNuRCxJQUFJLENBQUMsS0FBSztZQUFFLE9BQU8sS0FBSyxDQUFDO1FBQ3pCLE9BQU8sT0FBTywwQkFBMEIsQ0FBQyxFQUFFLEtBQ3ZDLFdBQVcsQ0FBQyxLQUFLLEtBQUssU0FBUyxDQUFDLENBQUMsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDLEVBQ3JELEVBQUUsQ0FBQztJQUNQLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUMifQ==