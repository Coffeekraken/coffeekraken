import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiFormInputInterface extends __SInterface {
}
postcssSugarPluginUiFormInputInterface.definition = {
    style: {
        type: 'String',
        values: ['solid'],
        default: __theme().config('ui.input.defaultStyle'),
    },
    outline: {
        type: 'Boolean',
        default: __theme().config('ui.input.outline'),
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', outline: true, scope: [] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.outline) {
            vars.push(`
            @sugar.outline;
`);
        }
        vars.push(`
            @sugar.ui.base(input);
  `);
    }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            width: 100%;
        `);
    }
    switch (finalParams.style) {
        // case 'underline':
        //     if (finalParams.scope.indexOf('lnf') !== -1) {
        //         vars.push(`
        //             background-color: sugar.color(current, --alpha 0);
        //             border-top: none !important;
        //             border-left: none !important;
        //             border-right: none !important;
        //             border-bottom: sugar.color(current) solid sugar.theme(ui.input.borderWidth) !important;
        //             border-radius: 0;
        //             padding-inline: 0 !important;
        //             &:hover, &:focus {
        //                 background-color: sugar.color(current, --alpha 0.1);
        //             }
        //         `);
        //     }
        //     break;
        case 'solid':
        default:
            break;
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFHM0MsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN0RCxpREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDckQ7SUFDRCxPQUFPLEVBQUU7UUFDTCxJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUM7S0FDaEQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztRQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO0tBQzNCO0NBQ0osQ0FBQztBQVNOLE9BQU8sRUFBRSxzQ0FBc0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUUvRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQ2QsT0FBTyxFQUFFLElBQUksRUFDYixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1lBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUM7O0NBRXJCLENBQUMsQ0FBQztTQUNNO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7R0FFZixDQUFDLENBQUM7S0FDQTtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7S0FDTjtJQUVELFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixvQkFBb0I7UUFDcEIscURBQXFEO1FBQ3JELHNCQUFzQjtRQUN0QixpRUFBaUU7UUFDakUsMkNBQTJDO1FBQzNDLDRDQUE0QztRQUM1Qyw2Q0FBNkM7UUFDN0Msc0dBQXNHO1FBQ3RHLGdDQUFnQztRQUNoQyw0Q0FBNEM7UUFFNUMsaUNBQWlDO1FBQ2pDLHVFQUF1RTtRQUN2RSxnQkFBZ0I7UUFDaEIsY0FBYztRQUNkLFFBQVE7UUFDUixhQUFhO1FBQ2IsS0FBSyxPQUFPLENBQUM7UUFDYjtZQUNJLE1BQU07S0FDYjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=