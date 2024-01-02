import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          select
 * @as              @s.ui.select
 * @namespace     node.mixin.ui.select
 * @type               PostcssMixin
 * @interface     ./select          interface
 * @platform      postcss
 * @status        stable
 *
 * Apply the select style to any HTMLSelectElement
 *
 * @param       {'solid'|'underline'}                           [style='theme.ui.form.defaultLnf']         The lnf you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.select
 *
 * @example     css
 * .my-select {
 *    @s.ui.select;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormSelectInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'underline'],
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
        };
    }
}
export { SSugarcssPluginUiFormSelectInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', outline: true }, params);
    const vars = [];
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
        @s.scope.only 'bare' {
            @s.ui.base(select);
        }
        position: relative;
        -webkit-appearance: none;
        appearance: none;
        line-height: 1;
        outline: 0;
            `);
    vars.push('}');
    vars.push(`@s.scope 'lnf' {`);
    if (finalParams.outline) {
        vars.push(`
                &:focus:not(:hover) {
                    @s.outline;
                }
            `);
    }
    vars.push(`
        @s.scope.only 'bare' {
            @s.ui.base(select);
        }
        @s.shape();
        overflow: hidden;

        &.placeholder,
        &:invalid {
            color: s.color(main, text, --alpha 0.3);
        }

        &[multiple] option:checked,
        &[multiple] option[selected] {
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            background: s.color(current, --alpha 0.5);
            color: s.color(current, uiForeground);
        }
        &[multiple]:focus option:checked,
        &[multiple]:focus option[selected] {
            -moz-appearance: none;
            -webkit-appearance: none;
            appearance: none;
            background: s.color(current, ui);
            color: s.color(current, uiForeground);
        }

        &:not([multiple]) {
            padding-inline-end: calc(s.padding(ui.form.paddingInline) + 1.5em);

            --padding-inline: s.padding(ui.form.paddingInline);

            background-repeat: no-repeat;
            background-image: linear-gradient(45deg, transparent 50%, s.color(current) 50%), linear-gradient(135deg, s.color(current) 50%, transparent 50%);
            background-position: right calc(var(--padding-inline) + 5px) top 50%, right var(--padding-inline) top 50%;
            background-size: s.scalable(5px) s.scalable(5px), s.scalable(5px) s.scalable(5px);
        
            [dir="rtl"] &,
            &[dir="rtl"] {
                background-position: left var(--padding-inline) top 50%, left calc(var(--padding-inline) + s.scalable(5px)) top 50%;
            }
        }

        `);
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
        case 'default':
        default:
            break;
    }
    vars.push('}');
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sb0NBQXFDLFNBQVEsWUFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxRQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN0RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsb0NBQW9DLElBQUksU0FBUyxFQUFFLENBQUM7QUFFN0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLE9BQU8sRUFBRSxJQUFJLElBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRS9CLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OzthQVNELENBQUMsQ0FBQztJQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJTCxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQTZDTCxDQUFDLENBQUM7SUFFUCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxXQUFXO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O2lCQVlMLENBQUMsQ0FBQztZQUNQLE1BQU07UUFDVixLQUFLLFNBQVMsQ0FBQztRQUNmO1lBQ0ksTUFBTTtLQUNiO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==