import __SInterface from '@coffeekraken/s-interface';
import __theme from '../../../utils/theme';
class postcssSugarPluginUiBadgeInterface extends __SInterface {
}
postcssSugarPluginUiBadgeInterface.definition = {
    style: {
        type: 'String',
        values: ['default', 'outline'],
        default: 'default',
    },
    shape: {
        type: 'String',
        values: ['default', 'square', 'pill'],
        default: 'default',
    },
    scope: {
        type: {
            type: 'Array<String>',
            splitChars: [',', ' '],
        },
        values: ['bare', 'lnf', 'shape'],
        default: ['bare', 'lnf', 'shape'],
    },
};
export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({ params, atRule, applyNoScopes, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ style: (_a = __theme().config('ui.button.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape'] }, params);
    finalParams.scope = applyNoScopes(finalParams.scope);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`   
        display: inline-block;
        white-space: nowrap;
    `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            font-size: sugar.scalable(0.75em);
            padding-inline: sugar.theme(ui.badge.paddingInline);
            padding-block: sugar.theme(ui.badge.paddingBlock);
            vertical-align: baseline;

            & > * {
                @sugar.color(main);
            }

        `);
        switch (finalParams.style) {
            case 'outline':
                vars.push(`
                position: relative;
                color: sugar.color(current);
                background: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: sugar.color(current) solid sugar.theme(ui.badge.borderWidth);
                    pointer-events: none;
                }
            `);
            case 'solid':
            default:
                vars.push(`
                     color: sugar.color(current, foreground);
                     background-color: sugar.color(current);
                     text-shadow: 0 0 3px sugar.color(current, --darken 10);
                `);
                break;
        }
    }
    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                    &:after {
                        border-radius: 0;
                    }
            `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 999999px;
                    &:after {
                        border-radius: 999999px;
                    }
                `);
                break;
            case 'default':
            default:
                vars.push(`
                    border-radius: 0.5em;
                    &:after {
                        border-radius: 0.5em;
                    }
                `);
                break;
        }
    }
    replaceWith(vars);
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ2xELDZDQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUNyQyxPQUFPLEVBQUUsU0FBUztLQUNyQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7U0FDekI7UUFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUNoQyxPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztLQUNwQztDQUNKLENBQUM7QUFTTixPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFDYixXQUFXLEdBTWQ7O0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxNQUFBLE9BQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyx3QkFBd0IsQ0FBQyxtQ0FBSSxPQUFPLEVBQzVELEtBQUssRUFBRSxTQUFTLEVBQ2hCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQzVCLE1BQU0sQ0FDWixDQUFDO0lBQ0YsV0FBVyxDQUFDLEtBQUssR0FBRyxhQUFhLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztLQUdiLENBQUMsQ0FBQztLQUNGO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7O1NBVVQsQ0FBQyxDQUFDO1FBRUgsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssU0FBUztnQkFDVixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7YUFlYixDQUFDLENBQUM7WUFDSCxLQUFLLE9BQU8sQ0FBQztZQUNiO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7aUJBSVQsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMzQyxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2FBS2IsQ0FBQyxDQUFDO2dCQUNDLE1BQU07WUFDVixLQUFLLE1BQU07Z0JBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVixLQUFLLFNBQVMsQ0FBQztZQUNmO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2lCQUtULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQztBQUN0QixDQUFDIn0=