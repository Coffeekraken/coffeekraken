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
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
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
exports.interface = SSugarcssPluginUiSwitchMixinInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'solid', scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
        
        font-size: clamp(s.scalable(20px), s.scalable(1rem), 999rem);

        --thumb-size: 1em;
        --thumb-color-active: s.color(current);
        --thumb-color-inactive: s.color(current, --desaturate 80);
        --thumb-border-width: s.theme(ui.form.borderWidth);
        --thumb-border-color: s.color(current, border);

        --track-size: 0.5em;
        --track-color-active: s.color(current, --alpha 0.3);
        --track-color-inactive: s.color(main, ui, --alpha 0.2 --desaturate 80);
        --track-border-width: s.theme(ui.form.borderWidth);
        --track-border-color: s.color(current, border);

        --thumb-position: 0%;

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


        --thumb-position: calc(--thumb-size) / 2);
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
    }
    switch (finalParams.lnf) {
        default:
            if (finalParams.scope.indexOf('lnf') !== -1) {
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
            }
            break;
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
                    @s.shape();
                    &:after,
                    &:before {
                        @s.shape();
                    }
                `);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQXdCRztBQUVILE1BQU0scUNBQXNDLFNBQVEscUJBQVk7SUFDNUQsTUFBTSxLQUFLLFdBQVc7UUFDbEIsT0FBTztZQUNILEdBQUcsRUFBRTtnQkFDRCxJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUUsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pCLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxvQkFBb0IsQ0FBQzthQUM5QztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBT2lELDBEQUFTO0FBRTNELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxFQUNaLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBaUZiLENBQUMsQ0FBQztLQUNGO0lBRUQsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCO1lBQ0ksSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXFCVCxDQUFDLENBQUM7YUFDTjtZQUVELE1BQU07S0FDYjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7O2lCQU1ELENBQUMsQ0FBQztLQUNkO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQWhKRCw0QkFnSkMifQ==