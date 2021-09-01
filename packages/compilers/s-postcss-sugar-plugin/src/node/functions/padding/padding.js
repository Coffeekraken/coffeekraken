import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
class postcssSugarPluginPaddingFunctionInterface extends __SInterface {
}
postcssSugarPluginPaddingFunctionInterface.definition = {
    padding: {
        type: 'String',
        values: Object.keys(__theme().config('padding')),
        default: 'default',
        required: true,
    },
    scalable: {
        type: 'Boolean',
        default: __theme().config('scalable.padding'),
    },
};
export { postcssSugarPluginPaddingFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ padding: '', scalable: true }, params);
    const padding = finalParams.padding;
    let paddings = padding.split(' ').map((s) => {
        if (s === `${parseInt(s)}`)
            return `sugar.theme(padding.${s})`;
        return s;
    });
    if (finalParams.scalable) {
        paddings = paddings.map((p) => `sugar.scalable(${p})`);
    }
    return paddings.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFkZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInBhZGRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFHeEMsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sRUFBRSxTQUFTO1FBQ2xCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0lBQ0QsUUFBUSxFQUFFO1FBQ04sSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGtCQUFrQixDQUFDO0tBQ2hEO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU9uRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQUUsTUFBTSxFQUFpRTtJQUM5RixNQUFNLFdBQVcsbUJBQ2IsT0FBTyxFQUFFLEVBQUUsRUFDWCxRQUFRLEVBQUUsSUFBSSxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUNwQyxJQUFJLFFBQVEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO1FBQ3hDLElBQUksQ0FBQyxLQUFLLEdBQUcsUUFBUSxDQUFDLENBQUMsQ0FBQyxFQUFFO1lBQUUsT0FBTyx1QkFBdUIsQ0FBQyxHQUFHLENBQUM7UUFDL0QsT0FBTyxDQUFDLENBQUM7SUFDYixDQUFDLENBQUMsQ0FBQztJQUVILElBQUksV0FBVyxDQUFDLFFBQVEsRUFBRTtRQUN0QixRQUFRLEdBQUcsUUFBUSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFLENBQUMsa0JBQWtCLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDMUQ7SUFFRCxPQUFPLFFBQVEsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQyJ9