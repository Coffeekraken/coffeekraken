"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
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
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
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
class postcssSugarPluginUiFormSelectInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'underline'],
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
exports.interface = postcssSugarPluginUiFormSelectInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', scope: ['bare', 'lnf'], outline: true }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            @s.ui.base(select, $scope: bare);
            position: relative;
            -webkit-appearance: none;
            appearance: none;
            line-height: 1;
            outline: 0;
            `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        if (finalParams.outline) {
            vars.push(`
                &:focus:not(:hover) {
                    @s.outline;
                }
            `);
        }
        vars.push(`
            @s.ui.base(select, $scope: lnf);
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
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0sdUNBQXdDLFNBQVEscUJBQVk7SUFDOUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLEVBQUUsV0FBVyxDQUFDO2dCQUM5QixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDOUM7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQVFtRCw0REFBUztBQUU3RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLE9BQU8sRUFDWixLQUFLLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDLEVBQ3RCLE9BQU8sRUFBRSxJQUFJLElBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7O2FBT0wsQ0FBQyxDQUFDO0tBQ1Y7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQ3pDLElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7O2FBSVQsQ0FBQyxDQUFDO1NBQ047UUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBMkNULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtZQUNyQixLQUFLLFdBQVc7Z0JBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O2lCQVlULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDSSxNQUFNO1NBQ2I7S0FDSjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUExR0QsNEJBMEdDIn0=