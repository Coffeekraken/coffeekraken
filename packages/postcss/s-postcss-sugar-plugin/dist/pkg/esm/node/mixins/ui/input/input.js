import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          input
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply the input style to any element
 *
 * @param       {'default'}                           [style='theme.ui.form.defaultLnf']         The style you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.input
 *
 * @example     css
 * .my-input {
 *    @sugar.ui.input;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormInputInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['default', 'underline'],
                default: __STheme.get('ui.form.defaultLnf'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.get('ui.form.outline'),
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
    }
}
export { postcssSugarPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'default', outline: true, scope: [] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.outline) {
            vars.push(`
                &:focus:not(:hover) {
                    @sugar.outline;
                }
            `);
        }
        vars.push(`
            @sugar.ui.base(input);
            @sugar.shape();
  `);
    }
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            width: 100%;
        `);
    }
    switch (finalParams.lnf) {
        case 'underline':
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                    background-color: sugar.color(current, --alpha 0);
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: sugar.color(current, --alpha 0.3) solid sugar.border.width(ui.form.borderWidth) !important;
                    padding-inline: 1ch !important;

                    &:hover, &:focus {
                        border-bottom: sugar.color(current, --alpha 1) solid sugar.border.width(ui.form.borderWidth) !important;
                        background-color: sugar.color(current, --alpha 0.1);
                    }
                `);
            }
            break;
        default:
            break;
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXVCRztBQUVILE1BQU0sc0NBQXVDLFNBQVEsWUFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxXQUFXLENBQUM7Z0JBQ2hDLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLGlCQUFpQixDQUFDO2FBQzNDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFRRCxPQUFPLEVBQUUsc0NBQXNDLElBQUksU0FBUyxFQUFFLENBQUM7QUFFL0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsU0FBUyxFQUNkLE9BQU8sRUFBRSxJQUFJLEVBQ2IsS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7R0FHZixDQUFDLENBQUM7S0FDQTtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7U0FFVCxDQUFDLENBQUM7S0FDTjtJQUVELFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQixLQUFLLFdBQVc7WUFDWixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7aUJBWVQsQ0FBQyxDQUFDO2FBQ047WUFDRCxNQUFNO1FBQ1Y7WUFDSSxNQUFNO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=