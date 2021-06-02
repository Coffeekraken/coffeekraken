import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUtilCenterInterface extends __SInterface {
}
postcssSugarPluginUtilCenterInterface.definition = {
    method: {
        type: 'String',
        values: ['abs'],
        required: true,
        default: 'abs'
    },
    direction: {
        type: 'String',
        values: ['x', 'y', 'both'],
        required: true,
        default: 'both'
    }
};
export { postcssSugarPluginUtilCenterInterface as interface };
export default function ({ params, atRule, replaceWith }) {
    const finalParams = Object.assign({ method: 'abs', direction: 'both' }, params);
    const vars = [];
    switch (finalParams.method) {
        case 'abs':
        default:
            vars.push(`
            position: absolute;
            ${finalParams.direction === 'both' || finalParams.direction === 'x'
                ? 'left: 50%;'
                : ''}
            ${finalParams.direction === 'both' || finalParams.direction === 'y'
                ? 'top: 50%;'
                : ''}
            ${finalParams.direction === 'both'
                ? 'transform: translate(-50%, -50%);'
                : finalParams.direction === 'y'
                    ? 'transform: translateY(-50%);'
                    : 'transform: translateX(-50%);'}
        `);
            break;
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2VudGVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2VudGVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBRXJELE1BQU0scUNBQXNDLFNBQVEsWUFBWTs7QUFDdkQsZ0RBQVUsR0FBRztJQUNsQixNQUFNLEVBQUU7UUFDTixJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLEtBQUssQ0FBQztRQUNmLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLEtBQUs7S0FDZjtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUM7UUFDMUIsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsTUFBTTtLQUNoQjtDQUNGLENBQUM7QUFRSixPQUFPLEVBQUUscUNBQXFDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFOUQsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsRUFLWjtJQUNDLE1BQU0sV0FBVyxtQkFDZixNQUFNLEVBQUUsS0FBSyxFQUNiLFNBQVMsRUFBRSxNQUFNLElBQ2QsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsUUFBUSxXQUFXLENBQUMsTUFBTSxFQUFFO1FBQzFCLEtBQUssS0FBSyxDQUFDO1FBQ1g7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDOztjQUdGLFdBQVcsQ0FBQyxTQUFTLEtBQUssTUFBTSxJQUFJLFdBQVcsQ0FBQyxTQUFTLEtBQUssR0FBRztnQkFDL0QsQ0FBQyxDQUFDLFlBQVk7Z0JBQ2QsQ0FBQyxDQUFDLEVBQ047Y0FFRSxXQUFXLENBQUMsU0FBUyxLQUFLLE1BQU0sSUFBSSxXQUFXLENBQUMsU0FBUyxLQUFLLEdBQUc7Z0JBQy9ELENBQUMsQ0FBQyxXQUFXO2dCQUNiLENBQUMsQ0FBQyxFQUNOO2NBRUUsV0FBVyxDQUFDLFNBQVMsS0FBSyxNQUFNO2dCQUM5QixDQUFDLENBQUMsbUNBQW1DO2dCQUNyQyxDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVMsS0FBSyxHQUFHO29CQUMvQixDQUFDLENBQUMsOEJBQThCO29CQUNoQyxDQUFDLENBQUMsOEJBQ047U0FDSCxDQUFDLENBQUM7WUFDTCxNQUFNO0tBQ1Q7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDcEIsQ0FBQyJ9