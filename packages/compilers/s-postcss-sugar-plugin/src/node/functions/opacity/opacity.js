import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginOpacityFunctionInterface extends __SInterface {
}
postcssSugarPluginOpacityFunctionInterface.definition = {
    opacity: {
        type: 'String',
        values: Object.keys(__STheme.config('opacity')),
        default: '100',
        required: true,
    },
};
export { postcssSugarPluginOpacityFunctionInterface as interface };
export default function ({ params, }) {
    const finalParams = Object.assign({ opacity: '100' }, params);
    const opacity = finalParams.opacity;
    if (__STheme.config('opacity')[opacity] === undefined)
        return opacity;
    const opacityRes = opacity.split(' ').map((s) => {
        const size = __STheme.config(`opacity.${s}`);
        if (!size)
            return size;
        return `var(${`--s-theme-opacity-${s}`}, ${size})`;
    });
    return opacityRes.join(' ');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3BhY2l0eS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIm9wYWNpdHkudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSwwQ0FBMkMsU0FBUSxZQUFZOztBQUMxRCxxREFBVSxHQUFHO0lBQ2hCLE9BQU8sRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMvQyxPQUFPLEVBQUUsS0FBSztRQUNkLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSwwQ0FBMEMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1uRSxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sR0FHVDtJQUNHLE1BQU0sV0FBVyxtQkFDYixPQUFPLEVBQUUsS0FBSyxJQUNYLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxPQUFPLEdBQUcsV0FBVyxDQUFDLE9BQU8sQ0FBQztJQUVwQyxJQUFJLFFBQVEsQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUFDLENBQUMsT0FBTyxDQUFDLEtBQUssU0FBUztRQUFFLE9BQU8sT0FBTyxDQUFDO0lBRXRFLE1BQU0sVUFBVSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxFQUFFLEVBQUU7UUFDNUMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsRUFBRSxDQUFDLENBQUM7UUFDN0MsSUFBSSxDQUFDLElBQUk7WUFBRSxPQUFPLElBQUksQ0FBQztRQUN2QixPQUFPLE9BQU8scUJBQXFCLENBQUMsRUFBRSxLQUFLLElBQUksR0FBRyxDQUFDO0lBQ3ZELENBQUMsQ0FBQyxDQUFDO0lBRUgsT0FBTyxVQUFVLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQ2hDLENBQUMifQ==