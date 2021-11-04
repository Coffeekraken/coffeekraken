import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
class postcssSugarPluginUiFormInputInterface extends __SInterface {
}
postcssSugarPluginUiFormInputInterface.definition = {
    style: {
        type: 'String',
        values: ['solid'],
        default: __STheme.config('ui.input.defaultStyle'),
    },
    outline: {
        type: 'Boolean',
        default: __STheme.config('ui.input.outline'),
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsT0FBTyxZQUFZLE1BQU0sMkJBQTJCLENBQUM7QUFDckQsT0FBTyxRQUFRLE1BQU0sdUJBQXVCLENBQUM7QUFFN0MsTUFBTSxzQ0FBdUMsU0FBUSxZQUFZOztBQUN0RCxpREFBVSxHQUFHO0lBQ2hCLEtBQUssRUFBRTtRQUNILElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO1FBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsTUFBTSxDQUFDLHVCQUF1QixDQUFDO0tBQ3BEO0lBQ0QsT0FBTyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFNBQVM7UUFDZixPQUFPLEVBQUUsUUFBUSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQztLQUMvQztJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO1FBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7S0FDM0I7Q0FDSixDQUFDO0FBU04sT0FBTyxFQUFFLHNDQUFzQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRS9ELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLE9BQU8sRUFDZCxPQUFPLEVBQUUsSUFBSSxFQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Q0FFckIsQ0FBQyxDQUFDO1NBQ007UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOztHQUVmLENBQUMsQ0FBQztLQUNBO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOztTQUVULENBQUMsQ0FBQztLQUNOO0lBRUQsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3ZCLG9CQUFvQjtRQUNwQixxREFBcUQ7UUFDckQsc0JBQXNCO1FBQ3RCLGlFQUFpRTtRQUNqRSwyQ0FBMkM7UUFDM0MsNENBQTRDO1FBQzVDLDZDQUE2QztRQUM3QyxzR0FBc0c7UUFDdEcsZ0NBQWdDO1FBQ2hDLDRDQUE0QztRQUU1QyxpQ0FBaUM7UUFDakMsdUVBQXVFO1FBQ3ZFLGdCQUFnQjtRQUNoQixjQUFjO1FBQ2QsUUFBUTtRQUNSLGFBQWE7UUFDYixLQUFLLE9BQU8sQ0FBQztRQUNiO1lBQ0ksTUFBTTtLQUNiO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==