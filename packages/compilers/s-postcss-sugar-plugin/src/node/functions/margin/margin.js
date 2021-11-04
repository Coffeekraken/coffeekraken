import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginMarginFunctionInterface extends __SInterface {
}
postcssSugarPluginMarginFunctionInterface.definition = {
    margin: {
        type: 'String',
        values: Object.keys(__STheme.config('margin')),
        default: 'default',
        required: true,
    },
    scalable: {
        type: 'Boolean',
        default: __STheme.config('scalable.margin'),
    },
};
export { postcssSugarPluginMarginFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ margin: '', scalable: false }, params);
    const margin = finalParams.margin;
    let margins = margin.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(margin.${s}, ${finalParams.scalable})`;
        return s;
    });
    return margins.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFyZ2luLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibWFyZ2luLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDLE1BQU0seUNBQTBDLFNBQVEsWUFBWTs7QUFDekQsb0RBQVUsR0FBRztJQUNoQixNQUFNLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxNQUFNLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLENBQUM7UUFDOUMsT0FBTyxFQUFFLFNBQVM7UUFDbEIsUUFBUSxFQUFFLElBQUk7S0FDakI7SUFDRCxRQUFRLEVBQUU7UUFDTixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLGlCQUFpQixDQUFDO0tBQzlDO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSx5Q0FBeUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU9sRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixNQUFNLEVBQUUsRUFBRSxFQUNWLFFBQVEsRUFBRSxLQUFLLElBQ1osTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLE1BQU0sR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO0lBQ2xDLElBQUksT0FBTyxHQUFHLE1BQU0sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDdEMsSUFBSSxDQUFDLEtBQUssR0FBRyxRQUFRLENBQUMsQ0FBQyxDQUFDLEVBQUU7WUFDdEIsT0FBTyxzQkFBc0IsQ0FBQyxLQUFLLFdBQVcsQ0FBQyxRQUFRLEdBQUcsQ0FBQztRQUMvRCxPQUFPLENBQUMsQ0FBQztJQUNiLENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzdCLENBQUMifQ==