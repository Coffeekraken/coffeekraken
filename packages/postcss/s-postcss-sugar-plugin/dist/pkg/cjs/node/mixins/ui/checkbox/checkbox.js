"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          checkbox
 * @as              @sugar.ui.checkbox
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
 * @snippet         @sugar.ui.checkbox
 *
 * @example     css
 * .my-checkbox {
 *    @sugar.ui.form;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiCheckboxInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.form.defaultLnf'),
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
exports.interface = postcssSugarPluginUiCheckboxInterface;
function default_1({ params, atRule, replaceWith, }) {
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
                width: 1.2em;
                height: 1.2em;
                font-size: sugar.scalable(1rem);

                &:disabled {
                    @sugar.disabled;
                }
            `);
            }
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.form.transition);
                    border: sugar.theme(ui.form.borderWidth) solid sugar.color(current);
                    background-color: transparent;
                    transition: sugar.theme(ui.form.transition);
                    box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);
                    @sugar.shape();

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.6em; height: 0.6em;
                        transform: translate(-50%, -50%);
                        background: sugar.color(current);
                        opacity: 0;
                        transition: sugar.theme(ui.form.transition);
                        @sugar.shape();
                    }
                    label:hover > &:not(:disabled):after,
                    &:hover:not(:disabled):after {
                        opacity: 0.2;
                    }
                    &:checked:not(:disabled):after {
                        opacity: 1 !important;
                    }

                    &:focus:not(:hover):not(:active):not(:disabled) {
                        box-shadow: 0 0 0 sugar.theme(ui.outline.borderWidth) sugar.color(current, --alpha 0.3);
                    }
 
        `);
            }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT2lELDBEQUFTO0FBQzNELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxDQUFDLEVBQUUsQ0FBQyxDQUFDO0lBRTVCLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQjtZQUNJLE9BQU87WUFDUCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO2dCQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7O2FBYWIsQ0FBQyxDQUFDO2FBQ0Y7WUFFRCxNQUFNO1lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FnQ2pCLENBQUMsQ0FBQzthQUNFO0tBQ1I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBNUVELDRCQTRFQyJ9