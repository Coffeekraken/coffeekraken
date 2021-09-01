import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginMarginFunctionInterface extends __SInterface {
}
postcssSugarPluginMarginFunctionInterface.definition = {
    margin: {
        type: 'String',
        values: Object.keys(__theme().config('margin')),
        default: 'default',
        required: true,
    },
    scalable: {
        type: 'Boolean',
        default: __theme().config('scalable.margin'),
    },
};
export { postcssSugarPluginMarginFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ margin: '', scalable: false }, params);
    const margin = finalParams.margin;
    let margins = margin.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(margin.${s})`;
        return s;
    });
    if (finalParams.scalable) {
        margins = margins.map((p) => `sugar.scalable(${p})`);
    }
    return margins.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFyZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sT0FBTyxNQUFNLG1CQUFtQixDQUFDO0FBR3hDLE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDekQsb0RBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxRQUFRLENBQUMsQ0FBQztRQUMvQyxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxpQkFBaUIsQ0FBQztLQUMvQztDQUNKLENBQUM7QUFFTixPQUFPLEVBQUUseUNBQXlDLElBQUksU0FBUyxFQUFFLENBQUM7QUFPbEUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUFFLE1BQU0sRUFBZ0U7SUFDN0YsTUFBTSxXQUFXLG1CQUNiLE1BQU0sRUFBRSxFQUFFLEVBQ1YsUUFBUSxFQUFFLEtBQUssSUFDWixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sTUFBTSxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7SUFDbEMsSUFBSSxPQUFPLEdBQUcsTUFBTSxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN0QyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUFFLE9BQU8sc0JBQXNCLENBQUMsR0FBRyxDQUFDO1FBQzlELE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCxJQUFJLFdBQVcsQ0FBQyxRQUFRLEVBQUU7UUFDdEIsT0FBTyxHQUFHLE9BQU8sQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRSxDQUFDLGtCQUFrQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ3hEO0lBRUQsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUMifQ==