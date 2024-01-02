import __SInterface from '@coffeekraken/s-interface';
import __STheme from '@coffeekraken/s-theme';
/**
 * @name          checkbox
 * @as              @s.ui.checkbox
 * @namespace     node.mixin.ui.form
 * @type               PostcssMixin
 * @interface     ./checkbox          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the checkbox style to any element
 *
 * @param       {'solid'}                           [lnf='theme.ui.form.defaultLnf']         The lnf(s) you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.checkbox
 *
 * @example     css
 * .my-checkbox {
 *    @s.ui.form;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiCheckboxInterface extends __SInterface {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: __STheme.current.get('ui.form.defaultLnf'),
            },
        };
    }
}
export { SSugarcssPluginUiCheckboxInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid' }, params);
    const vars = [``];
    // bare
    vars.push(`
        @s.scope 'bare' {
            appearance: none !important;
            -moz-appearance: none !important;
            -webkit-appearance: none !important;
            position: relative;
            width: 1em; height: 1em;
            font-size: clamp(s.scalable(24px), s.scalable(1rem), 999rem);

            &:disabled {
                @s.disabled;
            }
        }
    `);
    switch (finalParams.lnf) {
        default:
            // lnf
            vars.push(`
                    @s.scope 'lnf' {
                        transition: s.theme(ui.form.transition);
                        border: s.border.width(ui.form.borderWidth) solid s.color(current);
                        background-color: transparent;
                        transition: s.theme(ui.form.transition);
                        box-shadow: 0 0 0 0 s.color(current, --alpha 0.2);
                        cursor: pointer;
                        @s.shape();

                        
                        &:before {
                            content: '';
                            position: absolute;
                            top: 0; left: 0;
                            width: 100%; height: 100%;
                            background: s.color(current);
                            opacity: 0;
                            transition: s.theme(ui.form.transition);
                            @s.shape();
                        }
                        &:after {
                            content: '';
                            position: absolute;
                            top: 50%; left: 50%;
                            width: 100%; height: 100%;
                            transform: translate(-50%, -50%) scale(0.6);
                            background: s.color(current, background);
                            opacity: 0;
                            clip-path: polygon(38% 65%, 78% 0, 100% 13%, 46% 100%, 0 73%, 15% 51%);
                            transition: s.theme(ui.form.transition);
                            @s.shape();
                        }
                        label:hover > &:not(:disabled):before,
                        &:hover:not(:disabled):before,
                        label:hover > &:not(:disabled):after,
                        &:hover:not(:disabled):after {
                            opacity: 0.2;
                        }
                        &:checked:not(:disabled):before,
                        &:checked:not(:disabled):after {
                            opacity: 1 !important;
                        }

                        &:focus:not(:hover):not(:active):not(:disabled) {
                            box-shadow: 0 0 0 s.border.width(ui.outline.borderWidth) s.color(current, --alpha 0.3);
                        }
                    }
 
        `);
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTBCRztBQUVILE1BQU0sa0NBQW1DLFNBQVEsWUFBWTtJQUN6RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLFFBQVEsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQ3REO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU1ELE9BQU8sRUFBRSxrQ0FBa0MsSUFBSSxTQUFTLEVBQUUsQ0FBQztBQUMzRCxNQUFNLENBQUMsT0FBTyxXQUFXLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O0tBYVQsQ0FBQyxDQUFDO0lBRUgsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCO1lBQ0ksTUFBTTtZQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FpRGIsQ0FBQyxDQUFDO0tBQ047SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDIn0=