"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssUiFiltrableInputInterface extends s_interface_1.default {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid', 'gradient', 'outline', 'text'],
                default: s_theme_1.default.get('ui.button.defaultStyle'),
            },
            outline: {
                type: 'Boolean',
                default: s_theme_1.default.get('ui.button.outline'),
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
exports.interface = postcssUiFiltrableInputInterface;
/**
 * @name          filtrableInput
 * @namespace     ui.filtrableInput
 * @type               PostcssMixin
 * @interface     ./button          interface
 * @platform      css
 * @status        beta
 *
 * Apply the filtrable input style to any s-filtrable-input element
 *
 * @example     css
 * .s-filtrable-input {
 *    @sugar.ui.filtrableInput;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ style: s_theme_1.default.get('ui.button.defaultStyle'), outline: true, scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

            .s-filtrable-input__dropdown {
                @sugar.depth(ui.filtrableInput.depth);
                transition: sugar.theme(ui.filtrableInput.transition);
            }

            .s-filtrable-input__keywords {
                padding: sugar.padding(ui.filtrableInput.paddingBlock) sugar.padding(ui.filtrableInput.paddingInline);
            }

            .s-filtrable-input__list {
                width: 100%;
                transition: sugar.theme(ui.filtrableInput.transition);
                @sugar.scrollbar;
            }
            .s-filtrable-input__list-item {
                transition: sugar.theme(ui.filtrableInput.transition);
            }
        `);
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`

                .s-filtrable-input__dropdown {
                    background-color: sugar.color(base, background);
                    border-radius: sugar.border.radius(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input__keywords {
                    background: sugar.color(main, background);
                }

                .s-filtrable-input__list-item {
                    padding-inline: sugar.padding(ui.filtrableInput.paddingInline);
                    padding-block: sugar.padding(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid sugar.color(base, background, --lighten 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(base, --alpha 0);
                            background-color: sugar.color(base, --alpha 0.6);
                            color: sugar.color(base, foreground);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input__list-no-item):not(.s-filtrable-input__list-loading) {
                            border-top: 1px solid sugar.color(accent) !important;
                            background-color: sugar.color(accent) !important;
                            color: sugar.color(accent, foreground) !important;
                        }
                    }
                }
        `);
                break;
        }
        if (finalParams.outline) {
            vars.push(`
            

          `);
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxnQ0FBaUMsU0FBUSxxQkFBWTtJQUN2RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxVQUFVLEVBQUUsU0FBUyxFQUFFLE1BQU0sQ0FBQztnQkFDaEQsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDO2FBQ2xEO1lBQ0QsT0FBTyxFQUFFO2dCQUNMLElBQUksRUFBRSxTQUFTO2dCQUNmLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQzthQUM3QztZQUNELEtBQUssRUFBRTtnQkFDSCxJQUFJLEVBQUU7b0JBQ0YsSUFBSSxFQUFFLGVBQWU7b0JBQ3JCLFVBQVUsRUFBRSxDQUFDLEdBQUcsRUFBRSxHQUFHLENBQUM7aUJBQ3pCO2dCQUNELE1BQU0sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7Z0JBQ3ZCLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUTRDLHFEQUFTO0FBRXREOzs7Ozs7Ozs7Ozs7Ozs7OztHQWlCRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHdCQUF3QixDQUFDLEVBQzdDLE9BQU8sRUFBRSxJQUFJLEVBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2IsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBbUJULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLE9BQU8sQ0FBQztZQUNiO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztTQW9DakIsQ0FBQyxDQUFDO2dCQUNLLE1BQU07U0FDYjtRQUVELElBQUksV0FBVyxDQUFDLE9BQU8sRUFBRTtZQUNyQixJQUFJLENBQUMsSUFBSSxDQUFDOzs7V0FHWCxDQUFDLENBQUM7U0FDSjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXJHRCw0QkFxR0MifQ==