import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';
class postcssSugarPluginMarginFunctionInterface extends __SInterface {
}
postcssSugarPluginMarginFunctionInterface.definition = {
    margin: {
        type: 'String',
        values: Object.keys(__theme().config('margin')),
        default: 'default',
        required: true
    }
};
export { postcssSugarPluginMarginFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ margin: '' }, params);
    const margin = finalParams.margin;
    if (__theme().config('margin')[margin] === undefined)
        return margin;
    const margins = margin.split(' ').map((s) => {
        const size = __theme().config(`margin.${s}`);
        if (!size)
            return size;
        return `var(${__minifyVar(`--s-theme-margin-${s}`)}, ${size})`;
    });
    return margins.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFyZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBQ3hDLE9BQU8sV0FBVyxNQUFNLHVCQUF1QixDQUFDO0FBRWhELE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDM0Qsb0RBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNmO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1sRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3ZCLE1BQU0sRUFHUDtJQUNDLE1BQU0sV0FBVyxtQkFDZixNQUFNLEVBQUUsRUFBRSxJQUNQLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxNQUFNLEdBQUcsV0FBVyxDQUFDLE1BQU0sQ0FBQztJQUVsQyxJQUFJLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQyxNQUFNLENBQUMsS0FBSyxTQUFTO1FBQUUsT0FBTyxNQUFNLENBQUM7SUFFcEUsTUFBTSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUMxQyxNQUFNLElBQUksR0FBRyxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsVUFBVSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1FBQzdDLElBQUksQ0FBQyxJQUFJO1lBQUUsT0FBTyxJQUFJLENBQUM7UUFDdkIsT0FBTyxPQUFPLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxFQUFFLENBQUMsS0FBSyxJQUFJLEdBQUcsQ0FBQztJQUNqRSxDQUFDLENBQUMsQ0FBQztJQUVILE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMzQixDQUFDIn0=