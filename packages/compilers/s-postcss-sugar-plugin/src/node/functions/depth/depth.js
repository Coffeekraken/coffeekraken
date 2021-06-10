// @ts-nocheck
import __SInterface from '@coffeekraken/s-interface';
import __themeVar from '../../utils/themeVar';
class postcssSugarPluginDepthFunctionInterface extends __SInterface {
}
postcssSugarPluginDepthFunctionInterface.definition = {
    depth: {
        type: 'Number|String',
        required: true
    }
};
export { postcssSugarPluginDepthFunctionInterface as interface };
export default function depth({ params }) {
    const finalParams = Object.assign({}, params);
    let intDepth = parseInt(finalParams.depth);
    if (typeof finalParams.depth !== 'number') {
        return finalParams.depth;
    }
    else {
        return __themeVar(`depth.${intDepth}`, false);
    }
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVwdGguanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJkZXB0aC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBRWQsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFJckQsT0FBTyxVQUFVLE1BQU0sc0JBQXNCLENBQUM7QUFHOUMsTUFBTSx3Q0FBeUMsU0FBUSxZQUFZOztBQUMxRCxtREFBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxlQUFlO1FBQ3JCLFFBQVEsRUFBRSxJQUFJO0tBQ2pCO0NBQ0YsQ0FBQztBQUVKLE9BQU8sRUFBRSx3Q0FBd0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQU1qRSxNQUFNLENBQUMsT0FBTyxVQUFVLEtBQUssQ0FBQyxFQUM1QixNQUFNLEVBR1A7SUFDQyxNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixJQUFJLFFBQVEsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBQzNDLElBQUksT0FBTyxXQUFXLENBQUMsS0FBSyxLQUFLLFFBQVEsRUFBRTtRQUN6QyxPQUFPLFdBQVcsQ0FBQyxLQUFLLENBQUM7S0FDMUI7U0FBTTtRQUNMLE9BQU8sVUFBVSxDQUFDLFNBQVMsUUFBUSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7S0FDL0M7QUFDSCxDQUFDIn0=