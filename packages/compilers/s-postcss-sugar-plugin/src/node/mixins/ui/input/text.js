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
    focusOutline: {
        type: 'Boolean',
        default: __theme().config('ui.input.focusOutline'),
    },
    scope: {
        type: 'String',
        values: ['bare', 'lnf'],
        default: ['bare', 'lnf'],
    },
};
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', focusOutline: true, scope: [] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.focusOutline) {
            vars.push(`
            @sugar.state.focusOutline;
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
        //             background-color: sugar.color(ui, --alpha 0);
        //             border-top: none !important;
        //             border-left: none !important;
        //             border-right: none !important;
        //             border-bottom: sugar.color(ui) solid sugar.theme(ui.input.borderWidth) !important;
        //             border-radius: 0;
        //             padding-inline: 0 !important;
        //             &:hover, &:focus {
        //                 background-color: sugar.color(ui, --alpha 0.1);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFHckQsT0FBTyxPQUFPLE1BQU0sc0JBQXNCLENBQUM7QUFHM0MsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN0RCxpREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDckQ7SUFDRCxZQUFZLEVBQUU7UUFDVixJQUFJLEVBQUUsU0FBUztRQUNmLE9BQU8sRUFBRSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsdUJBQXVCLENBQUM7S0FDckQ7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7UUFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztLQUMzQjtDQUNKLENBQUM7QUFTTixPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLFlBQVksRUFBRSxJQUFJLEVBQ2xCLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLFdBQVcsQ0FBQyxZQUFZLEVBQUU7WUFDMUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Q0FFckIsQ0FBQyxDQUFDO1NBQ007UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOztHQUVmLENBQUMsQ0FBQztLQUNBO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOztTQUVULENBQUMsQ0FBQztLQUNOO0lBRUQsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLG9CQUFvQjtRQUNwQixxREFBcUQ7UUFDckQsc0JBQXNCO1FBQ3RCLDREQUE0RDtRQUM1RCwyQ0FBMkM7UUFDM0MsNENBQTRDO1FBQzVDLDZDQUE2QztRQUM3QyxpR0FBaUc7UUFDakcsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUU1QyxpQ0FBaUM7UUFDakMsa0VBQWtFO1FBQ2xFLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsUUFBUTtRQUNSLGFBQWE7UUFDYixLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksTUFBTTtLQUNiO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==