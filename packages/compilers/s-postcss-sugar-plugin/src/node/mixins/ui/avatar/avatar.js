import __SInterface from '@coffeekraken/s-interface';
class postcssSugarPluginUiAvatarInterface extends __SInterface {
}
postcssSugarPluginUiAvatarInterface.definition = {
    shape: {
        type: 'String',
        values: ['default', 'square', 'rounded'],
        default: 'default',
    },
    style: {
        type: 'String',
        value: ['solid'],
        default: 'solid',
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'shape', 'interactive'],
        default: ['bare', 'lnf', 'shape'],
    },
};
export { postcssSugarPluginUiAvatarInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ shape: 'square', style: 'solid', scope: ['bare', 'lnf', 'shape'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            position: relative;
            display: inline-block;
            overflow: hidden;
            width: 1em;
            height: 1em;
        `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    border-width: sugar.theme(ui.avatar.borderWidth);
                    border-color: sugar.color(current);
                    border-style: solid;
                    @sugar.depth(sugar.theme(ui.avatar.depth));
                `);
                break;
        }
    }
    // interactive
    if (finalParams.scope.indexOf('interactive') !== -1) {
        vars.push(`
            cursor: pointer;
        `);
        switch (finalParams.style) {
            case 'solid':
                vars.push(`
                    &:hover {
                        @sugar.outline($where: element);
                    }
                `);
                break;
        }
    }
    // shape
    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'rounded':
                vars.push(`
                    border-radius: sugar.theme(ui.avatar.borderRadius);
                    `);
                break;
            case 'default':
            default:
                vars.push(`
                    border-radius: 0.5em;
                `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXZhdGFyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXZhdGFyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBS3JELE1BQU0sbUNBQW9DLFNBQVEsWUFBWTs7QUFDbkQsOENBQVUsR0FBRztJQUNoQixLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUUsUUFBUTtRQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsU0FBUyxDQUFDO1FBQ3hDLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsQ0FBQyxPQUFPLENBQUM7UUFDaEIsT0FBTyxFQUFFLE9BQU87S0FDbkI7SUFDRCxLQUFLLEVBQUU7UUFDSCxJQUFJLEVBQUU7WUFDRixJQUFJLEVBQUUsZUFBZTtZQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO1NBQ3pCO1FBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsYUFBYSxDQUFDO1FBQy9DLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO0tBQ3BDO0NBQ0osQ0FBQztBQVNOLE9BQU8sRUFBRSxtQ0FBbUMsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUM1RCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxRQUFRLEVBQ2YsS0FBSyxFQUFFLE9BQU8sRUFDZCxLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUM1QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7U0FNVCxDQUFDLENBQUM7S0FDTjtJQUVELE1BQU07SUFDTixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLE9BQU87Z0JBQ1IsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsY0FBYztJQUNkLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsYUFBYSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDakQsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7UUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxPQUFPO2dCQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7aUJBSVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsUUFBUTtJQUNSLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDM0MsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOztpQkFFVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDOztxQkFFTCxDQUFDLENBQUM7Z0JBQ1AsTUFBTTtZQUNWLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7aUJBRVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsV0FBVyxDQUFDLElBQUksQ0FBQyxDQUFDO0FBQ3RCLENBQUMifQ==