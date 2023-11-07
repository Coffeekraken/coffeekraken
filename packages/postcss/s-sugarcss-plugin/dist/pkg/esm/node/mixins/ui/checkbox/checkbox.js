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
 * @param       {'bare'|'lnf'}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
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
                default: __STheme.get('ui.form.defaultLnf'),
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
export { SSugarcssPluginUiCheckboxInterface as interface };
export default function ({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', scope: ['bare', 'lnf'] }, params);
    const vars = [``];
    switch (finalParams.lnf) {
        default:
            // bare
            if (finalParams.scope.indexOf('bare') !== -1) {
                vars.push(`
                    appearance: none !important;
                    -moz-appearance: none !important;
                    -webkit-appearance: none !important;
                    position: relative;
                    width: 1em; height: 1em;
                    font-size: clamp(s.scalable(24px), s.scalable(1rem), 999rem);

                    &:disabled {
                        @s.disabled;
                    }
            `);
            }
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`

                    transition: s.theme(ui.form.transition);
                    border: s.theme(ui.form.borderWidth) solid s.color(current);
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
                        box-shadow: 0 0 0 s.theme(ui.outline.borderWidth) s.color(current, --alpha 0.3);
                    }
 
        `);
            }
    }
    return vars;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sUUFBUSxNQUFNLHVCQUF1QixDQUFDO0FBRTdDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F3Qkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLFlBQVk7SUFDekQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxRQUFRLENBQUMsR0FBRyxDQUFDLG9CQUFvQixDQUFDO2FBQzlDO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPRCxPQUFPLEVBQUUsa0NBQWtDLElBQUksU0FBUyxFQUFFLENBQUM7QUFDM0QsTUFBTSxDQUFDLE9BQU8sV0FBVyxFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQjtZQUNJLE9BQU87WUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7OzthQVdiLENBQUMsQ0FBQzthQUNGO1lBRUQsTUFBTTtZQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7Z0JBQ3pDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQWdEakIsQ0FBQyxDQUFDO2FBQ0U7S0FDUjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUMifQ==