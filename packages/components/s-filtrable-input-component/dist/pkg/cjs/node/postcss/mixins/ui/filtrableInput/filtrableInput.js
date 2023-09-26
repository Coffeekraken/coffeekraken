"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
class postcssUiFiltrableInputInterface extends s_interface_1.default {
    static get _definition() {
        return {
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
 * @snippet         @s.ui.filtrableInput($1);
 *
 * @example     css
 * .s-filtrable-input {
 *    @s.ui.filtrableInput;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
function default_1({ params, atRule, sharedData, replaceWith, }) {
    const finalParams = Object.assign({ scope: ['bare', 'lnf'] }, params);
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
    `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`

            .s-filtrable-input_dropdown {
                transition: s.theme(ui.filtrableInput.transition);
            }

            .s-filtrable-input_keywords {
                padding: s.padding(ui.filtrableInput.paddingBlock) s.padding(ui.filtrableInput.paddingInline);
            }

            .s-filtrable-input_list {
                width: 100%;
                transition: s.theme(ui.filtrableInput.transition);
                @s.scrollbar;
            }
            .s-filtrable-input_list-item {
                transition: s.theme(ui.filtrableInput.transition);
            }
        `);
        vars.push(`

                .s-filtrable-input_dropdown {
                    background-color: s.color(main, background);
                    border-radius: s.border.radius(ui.filtrableInput.borderRadius);
                }

                .s-filtrable-input_keywords {
                    background: s.color(main, background);
                }

                .s-filtrable-input_list-item {
                    padding-inline: s.padding(ui.filtrableInput.paddingInline);
                    padding-block: s.padding(ui.filtrableInput.paddingBlock);
                    border-top: 1px solid s.color(main, background, --lighten 5);

                    &:hover,
                    &:focus,
                    &:focus:not(.active),
                    &:focus:not(:active) {
                        &:not(.s-filtrable-input_list-no-item):not(.s-filtrable-input_list-loading) {
                            border-top: 1px solid s.color(main, --alpha 0);
                            background-color: s.color(main, --alpha 0.05);
                        }
                    }

                    &.active,
                    &:active {
                        &:not(.s-filtrable-input_list-no-item):not(.s-filtrable-input_list-loading) {
                            border-top: 1px solid s.color(accent) !important;
                            background-color: s.color(accent) !important;

                            &, * {
                                color: s.color(accent, foreground) !important;
                            }
                        }
                    }
                }
        `);
    }
    // wireframe
    vars.push(`
        @s.wireframe {
            .s-filtrable-input_dropdown {
                @s.wireframe.background;
                @s.wireframe.border;
            }
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCxNQUFNLGdDQUFpQyxTQUFRLHFCQUFZO0lBQ3ZELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU00QyxxREFBUztBQUV0RDs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQW1CRztBQUVILG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFVBQVUsRUFDVixXQUFXLEdBTWQ7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQyxJQUNuQixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDO0tBQ2IsQ0FBQyxDQUFDO0tBQ0Y7SUFFRCxNQUFNO0lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUN6QyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FrQlQsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7U0FzQ1QsQ0FBQyxDQUFDO0tBQ047SUFFRCxZQUFZO0lBQ1osSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7OztLQU9ULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFsR0QsNEJBa0dDIn0=