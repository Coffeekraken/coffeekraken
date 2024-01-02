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
class SSugarcssPluginUiFormSelectInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid', 'underline'],
                default: s_theme_1.default.current.get('ui.form.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiFormSelectInterface;
function default_1({ params, atRule, replaceWith, }) {
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
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSxvQ0FBcUMsU0FBUSxxQkFBWTtJQUMzRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxXQUFXLENBQUM7Z0JBQzlCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsb0JBQW9CLENBQUM7YUFDdEQ7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT2dELHlEQUFTO0FBRTFELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLE9BQU8sRUFBRSxJQUFJLElBQ1YsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsSUFBSSxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO0lBRS9CLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7OzthQVNELENBQUMsQ0FBQztJQUNYLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxXQUFXLENBQUMsT0FBTyxFQUFFO1FBQ3JCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7YUFJTCxDQUFDLENBQUM7S0FDVjtJQUVELElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQTZDTCxDQUFDLENBQUM7SUFFUCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxXQUFXO1lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7O2lCQVlMLENBQUMsQ0FBQztZQUNQLE1BQU07UUFDVixLQUFLLFNBQVMsQ0FBQztRQUNmO1lBQ0ksTUFBTTtLQUNiO0lBQ0QsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUE5R0QsNEJBOEdDIn0=