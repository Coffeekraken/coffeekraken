import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          input
 * @as          @s.ui.input
 * @namespace     node.mixin.ui.input
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        stable
 *
 * Apply the input style to any element
 *
 * @param       {'solid'|'underline'}                           [style='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @s.ui.input
 *
 * @example     css
 * .my-input {
 *    @s.ui.input;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormInputInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'underline'],
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
export { SSugarcssPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', outline: true, scope: [] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.outline) {
            vars.push(`
                &:focus:not(:hover) {
                    @s.outline;
                }
            `);
        }
        vars.push(`
            @s.ui.base(input);
            @s.shape();
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
                    background-color: s.color(current, --alpha 0);
                    border-top: none !important;
                    border-left: none !important;
                    border-right: none !important;
                    border-bottom: s.color(current, --alpha 0.3) solid s.border.width(ui.form.borderWidth) !important;
                    padding-inline: 1ch !important;

                    &:hover, &:focus {
                        border-bottom: s.color(current, --alpha 1) solid s.border.width(ui.form.borderWidth) !important;
                        background-color: s.color(current, --alpha 0.1);
                    }
                `);
            }
            break;
        default:
            break;
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLFlBQVk7SUFDMUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO2dCQUM5QixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsUUFBUSxDQUFDLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQzthQUMzQztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUUQsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLE9BQU8sRUFDWixPQUFPLEVBQUUsSUFBSSxFQUNiLEtBQUssRUFBRSxFQUFFLElBQ04sTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7WUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlULENBQUMsQ0FBQztTQUNOO1FBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7O0dBR2YsQ0FBQyxDQUFDO0tBQ0E7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxXQUFXO1lBQ1osSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O2lCQVlULENBQUMsQ0FBQzthQUNOO1lBQ0QsTUFBTTtRQUNWO1lBQ0ksTUFBTTtLQUNiO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9