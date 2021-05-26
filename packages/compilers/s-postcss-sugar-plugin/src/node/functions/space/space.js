import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginSpaceFunctionInterface extends __SInterface {
}
postcssSugarPluginSpaceFunctionInterface.definition = {
    space: {
        type: 'String',
        values: Object.keys(__theme().config('space')),
        default: 'default',
        required: true
    }
};
export { postcssSugarPluginSpaceFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ space: '' }, params);
    const space = finalParams.space;
    if (__theme().config('space')[space] === undefined)
        return space;
    const spaces = space.split(' ').map((s) => {
        const size = __theme().config(`space.${s}`);
        if (!size)
            return size;
        return `var(--s-theme-space-${s}, ${size})`;
    });
    return spaces.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3BhY2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJzcGFjZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUNyRCxPQUFPLE9BQU8sTUFBTSxtQkFBbUIsQ0FBQztBQUV4QyxNQUFNLHdDQUF5QyxTQUFRLFlBQVk7O0FBQzFELG1EQUFVLEdBQUc7SUFDbEIsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsTUFBTSxDQUFDLElBQUksQ0FBQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUM7UUFDOUMsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUsd0NBQXdDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNakUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBR1A7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLFdBQVcsQ0FBQyxLQUFLLENBQUM7SUFFaEMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsT0FBTyxDQUFDLENBQUMsS0FBSyxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sS0FBSyxDQUFDO0lBRWpFLE1BQU0sTUFBTSxHQUFHLEtBQUssQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDeEMsTUFBTSxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM1QyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sdUJBQXVCLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQztJQUM5QyxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDIn0=