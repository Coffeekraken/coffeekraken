// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginDepthFunctionInterface extends __SInterface {
}
postcssSugarPluginDepthFunctionInterface.definition = {
    depth: {
        type: 'Number|String',
        required: true,
    },
};
export { postcssSugarPluginDepthFunctionInterface as interface };
export default function depth({ params, }) {
    const finalParams = Object.assign({}, params);
    let intDepth = parseInt(finalParams.depth);
    if (typeof finalParams.depth !== 'number') {
        return finalParams.depth;
    }
    else {
        return __STheme.cssVar(`depth.${intDepth}`, false);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXB0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUN4RCxtREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0osQ0FBQztBQUVOLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1qRSxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUMxQixNQUFNLEdBR1Q7SUFDRyxNQUFNLFdBQVcscUJBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN2QyxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUM7S0FDNUI7U0FBTTtRQUNILE9BQU8sUUFBUSxDQUFDLE1BQU0sQ0FBQyxTQUFTLFFBQVEsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO0tBQ3REO0FBQ0wsQ0FBQyJ9