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
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
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
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
            outline: {
                type: 'Boolean',
                default: __STheme.current.get('ui.form.outline'),
            },
        };
    }
}
export { SSugarcssPluginUiFormInputInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', outline: true }, params);
    const vars = [];
    vars.push(`@s.scope 'lnf' {`);
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
    vars.push('}');
    vars.push(`
        @s.scope 'bare' {
            width: 100%;
        }
    `);
    vars.push(`@s.scope 'lnf' {`);
    switch (finalParams.lnf) {
        case 'underline':
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
            break;
        default:
            break;
    }
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sbUNBQW9DLFNBQVEsWUFBWTtJQUMxRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN0RDtZQUNELE9BQU8sRUFBRTtnQkFDTCxJQUFJLEVBQUUsU0FBUztnQkFDZixPQUFPLEVBQUUsUUFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsaUJBQWlCLENBQUM7YUFDbkQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT0QsT0FBTyxFQUFFLG1DQUFtQyxJQUFJLFNBQVMsRUFBRSxDQUFDO0FBRTVELE1BQU0sQ0FBQyxPQUFPLFdBQVcsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLE9BQU8sRUFDWixPQUFPLEVBQUUsSUFBSSxJQUNWLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUU5QixJQUFJLFdBQVcsQ0FBQyxPQUFPLEVBQUU7UUFDckIsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzthQUlMLENBQUMsQ0FBQztLQUNWO0lBRUQsSUFBSSxDQUFDLElBQUksQ0FBQzs7O0dBR1gsQ0FBQyxDQUFDO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCLEtBQUssV0FBVztZQUNaLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7OztpQkFZTCxDQUFDLENBQUM7WUFDUCxNQUFNO1FBQ1Y7WUFDSSxNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQyJ9