import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../utils/theme';
import __minifyVar from '../../utils/minifyVar';
class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
}
postcssSugarPluginOpacityFunctionInterface.definition = {
    opacity: {
        type: 'String',
        values: Object.keys(__theme().config('opacity')),
        default: '100',
        required: true
    }
};
export { postcssSugarPluginOpacityFunctionInterface as interface };
export default function ({ params }) {
    const finalParams = Object.assign({ opacity: '100' }, params);
    const opacity = finalParams.opacity;
    if (__theme().config('opacity')[opacity] === undefined)
        return opacity;
    const opacityRes = opacity.split(' ').map((s) => {
        const size = __theme().config(`opacity.${s}`);
        if (!size)
            return size;
        return `var(${__minifyVar(`--s-theme-opacity-${s}`)}, ${size})`;
    });
    return opacityRes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BhY2l0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9wYWNpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxPQUFPLE1BQU0sbUJBQW1CLENBQUM7QUFDeEMsT0FBTyxXQUFXLE1BQU0sdUJBQXVCLENBQUM7QUFFaEQsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUM1RCxxREFBVSxHQUFHO0lBQ2xCLE9BQU8sRUFBRTtRQUNQLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ2hELE9BQU8sRUFBRSxLQUFLO1FBQ2QsUUFBUSxFQUFFLElBQUk7S0FDZjtDQUNGLENBQUM7QUFFSixPQUFPLEVBQUUsMENBQTBDLElBQUksU0FBUyxFQUFFLENBQUM7QUFNbkUsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBR1A7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsT0FBTyxFQUFFLEtBQUssSUFDWCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sT0FBTyxHQUFHLFdBQVcsQ0FBQyxPQUFPLENBQUM7SUFFcEMsSUFBSSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBRXZFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDOUMsTUFBTSxJQUFJLEdBQUcsT0FBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxFQUFFLENBQUMsQ0FBQztRQUM5QyxJQUFJLENBQUMsSUFBSTtZQUFFLE9BQU8sSUFBSSxDQUFDO1FBQ3ZCLE9BQU8sT0FBTyxXQUFXLENBQUMscUJBQXFCLENBQUMsRUFBRSxDQUFDLEtBQUssSUFBSSxHQUFHLENBQUM7SUFDbEUsQ0FBQyxDQUFDLENBQUM7SUFFSCxPQUFPLFVBQVUsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDOUIsQ0FBQyJ9