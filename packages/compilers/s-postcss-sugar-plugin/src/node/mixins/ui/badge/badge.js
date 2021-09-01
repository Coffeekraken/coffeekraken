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
            splitChars: [','],
        },
        values: ['bare', 'lnf', 'shape'],
        default: ['bare', 'lnf', 'shape'],
    },
};
export { postcssSugarPluginUiBadgeInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    var _a;
    const finalParams = Object.assign({ style: (_a = __theme().config('ui.button.defaultStyle')) !== null && _a !== void 0 ? _a : 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape'] }, params);
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
            padding-inline: sugar.scalable(sugar.theme(ui.badge.paddingInline));
            padding-block: sugar.scalable(sugar.theme(ui.badge.paddingBlock));
            vertical-align: baseline;
        `);
        switch (finalParams.style) {
            case 'outline':
                vars.push(`
                position: relative;
                color: sugar.color(ui);
                background: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: sugar.color(ui) solid sugar.theme(ui.badge.borderWidth);
                    pointer-events: none;
                }
            `);
            case 'solid':
            default:
                vars.push(`
                     color: sugar.color(ui, foreground);
                     background-color: sugar.color(ui);
                     text-shadow: 0 0 3px sugar.color(ui, --darken 10);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFkZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJiYWRnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxPQUFPLFlBQVksTUFBTSwyQkFBMkIsQ0FBQztBQUdyRCxPQUFPLE9BQU8sTUFBTSxzQkFBc0IsQ0FBQztBQUUzQyxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7O0FBQ2xELDZDQUFVLEdBQUc7SUFDaEIsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsU0FBUyxDQUFDO1FBQzlCLE9BQU8sRUFBRSxTQUFTO0tBQ3JCO0lBQ0QsS0FBSyxFQUFFO1FBQ0gsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsUUFBUSxFQUFFLE1BQU0sQ0FBQztRQUNyQyxPQUFPLEVBQUUsU0FBUztLQUNyQjtJQUNELEtBQUssRUFBRTtRQUNILElBQUksRUFBRTtZQUNGLElBQUksRUFBRSxlQUFlO1lBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNwQjtRQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO1FBQ2hDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDO0tBQ3BDO0NBQ0osQ0FBQztBQVNOLE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUMzRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkOztJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsTUFBQSxPQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsd0JBQXdCLENBQUMsbUNBQUksT0FBTyxFQUM1RCxLQUFLLEVBQUUsU0FBUyxFQUNoQixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQyxJQUM1QixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7OztLQUdiLENBQUMsQ0FBQztLQUNGO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztTQUtULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O2FBZWIsQ0FBQyxDQUFDO1lBQ0gsS0FBSyxPQUFPLENBQUM7WUFDYjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2lCQUlULENBQUMsQ0FBQztnQkFDSCxNQUFNO1NBQ2I7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDM0MsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1lBQ3ZCLEtBQUssUUFBUTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OzthQUtiLENBQUMsQ0FBQztnQkFDQyxNQUFNO1lBQ1YsS0FBSyxNQUFNO2dCQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2lCQUtULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztpQkFLVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7QUFDdEIsQ0FBQyJ9