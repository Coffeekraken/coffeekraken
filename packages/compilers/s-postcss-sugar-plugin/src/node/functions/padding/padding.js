import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
}
postcssSugarPluginPaddingFunctionInterface.definition = {
    padding: {
        type: 'String',
        values: Object.keys(__STheme.config('padding')),
        default: 'default',
        required: true,
    },
    scalable: {
        type: 'Boolean',
        default: __STheme.config('scalable.padding'),
    },
};
export { postcssSugarPluginPaddingFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ padding: '', scalable: true }, params);
    const padding = finalParams.padding;
    let paddings = padding.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(padding.${s}, ${finalParams.scalable})`;
        return s;
    });
    return paddings.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxPQUFPLEVBQUUsU0FBUztRQUNsQixRQUFRLEVBQUUsSUFBSTtLQUNqQjtJQUNELFFBQVEsRUFBRTtRQUNOLElBQUksRUFBRSxTQUFTO1FBQ2YsT0FBTyxFQUFFLFFBQVEsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7S0FDL0M7Q0FDSixDQUFDO0FBRU4sT0FBTyxFQUFFLDBDQUEwQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBT25FLE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxHQUdUO0lBQ0csTUFBTSxXQUFXLG1CQUNiLE9BQU8sRUFBRSxFQUFFLEVBQ1gsUUFBUSxFQUFFLElBQUksSUFDWCxNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFDcEMsSUFBSSxRQUFRLEdBQUcsT0FBTyxDQUFDLEtBQUssQ0FBQyxHQUFHLENBQUMsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLEVBQUUsRUFBRTtRQUN4QyxJQUFJLENBQUMsS0FBSyxHQUFHLFFBQVEsQ0FBQyxDQUFDLENBQUMsRUFBRTtZQUN0QixPQUFPLHVCQUF1QixDQUFDLEtBQUssV0FBVyxDQUFDLFFBQVEsR0FBRyxDQUFDO1FBQ2hFLE9BQU8sQ0FBQyxDQUFDO0lBQ2IsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQyJ9