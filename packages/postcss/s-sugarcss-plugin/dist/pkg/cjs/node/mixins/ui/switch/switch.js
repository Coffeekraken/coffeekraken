"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          switch
 * @as              @s.ui.switch
 * @namespace     node.mixin.ui.form
 * @type               PostcssMixin
 * @interface     ./switch          interface
 * @platform      postcss
 * @status        stable
 *
 * Apply the switch style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.form.defaultLnf']         The style you want to generate
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.switch
 *
 * @example     css
 * .my-switch {
 *    @s.ui.switch;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiSwitchMixinInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.current.get('ui.form.defaultLnf'),
            },
        };
    }
}
exports.interface = SSugarcssPluginUiSwitchMixinInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid' }, params);
    const vars = [];
    // bare
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
        
        font-size: clamp(s.scalable(20px), s.scalable(1rem), 999rem);

        --thumb-size: 1em;
        --thumb-color-active: s.color(current);
        --thumb-color-inactive: s.color(current, --desaturate 80);
        --thumb-border-width: s.border.width(ui.form.borderWidth);
        --thumb-border-color: s.color(current, border);

        --track-size: 0.5em;
        --track-color-active: s.color(current, --alpha 0.3);
        --track-color-inactive: s.color(main, ui, --alpha 0.2 --desaturate 80);
        --track-border-width: s.border.width(ui.form.borderWidth);
        --track-border-color: s.color(current, border);

        --thumb-transition-duration: s.theme(ui.form.transition);
        
        -webkit-appearance: none !important;
        -moz-appearance: none !important;
        appearance: none !important;
        width: calc(var(--thumb-size) * 2);
        height: var(--thumb-size);
        position: relative;
        pointer-events: all;
        cursor: pointer;
        touch-action: pan-y;
        /* outline-offset: 5px; */
        box-sizing: content-box;
        flex-shrink: 0;

        &::before {
            content: "";
            cursor: pointer;
            pointer-events: none;
            width: calc(var(--thumb-size) * 2 - 20%);
            height: var(--track-size);
            position: absolute;
            top: 50%; left: 10%;
            transform: translateY(-50%);
        }
        &::after {
            content: "";
            cursor: pointer;
            pointer-events: none;
            width: var(--thumb-size);
            height: var(--thumb-size);
            position: absolute;
            top: 50%; left: 0;
        }

        --thumb-position: calc(var(--thumb-size) / 2);
        @s.direction.rtl {
            --thumb-position: calc(100% - var(--thumb-size) / 2);
        }

        &:indeterminate {
            --thumb-position: 50%;
        }

        &:checked {
            --thumb-position: calc(100% - var(--thumb-size) / 2);

            @s.direction.rtl {
                --thumb-position: calc(var(--thumb-size) / 2);
            }
        }

        @s.state.disabled {
            --thumb-color: transparent;
            @s.disabled;
        }

        &:after {
            left: var(--thumb-position);
            transform: translate(-50%, -50%);
        }

    `);
    vars.push('}');
    switch (finalParams.lnf) {
        default:
            vars.push(`@s.scope 'lnf' {`);
            vars.push(`
             
                    &:before {
                        background: var(--track-color-inactive);
                        transition: var(--thumb-transition-duration);
                    }

                    &::after {
                        background: var(--thumb-color-inactive);
                        transition: var(--thumb-transition-duration);
                    }

                    &:checked {
                        &:before {
                            background: var(--track-color-active) !important;
                        }
                        &::after {
                            background: var(--thumb-color-active) !important;
                        }
                    }

                `);
            vars.push('}');
            break;
    }
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
                    @s.shape();
                    &:after,
                    &:before {
                        @s.shape();
                    }
                `);
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMEJHO0FBRUgsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTtJQUM1RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sQ0FBQztnQkFDakIsT0FBTyxFQUFFLGlCQUFRLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUN0RDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFNaUQsMERBQVM7QUFFM0QsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLElBQ1QsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsQ0FBQztJQUMvQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7S0E4RVQsQ0FBQyxDQUFDO0lBQ0gsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUVmLFFBQVEsV0FBVyxDQUFDLEdBQUcsRUFBRTtRQUNyQjtZQUNJLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztZQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7aUJBcUJMLENBQUMsQ0FBQztZQUNQLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7WUFFZixNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixDQUFDLENBQUM7SUFDOUIsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O2lCQU1HLENBQUMsQ0FBQztJQUNmLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBNUlELDRCQTRJQyJ9