"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          dropdown
 * @namespace     node.mixin.ui.dropdown
 * @type               PostcssMixin
 * @interface     ./dropdown          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the dropdown style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.dropdown.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'}             [shape='theme.ui.dropdown.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-dropdown {
 *    @sugar.ui.dropdown;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiDropdownInterface extends s_interface_1.default {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.dropdown.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: s_theme_1.default.get('ui.dropdown.defaultShape'),
            },
            position: {
                type: 'String',
                values: [
                    'top',
                    'top-start',
                    'top-end',
                    'bottom',
                    'bottom-start',
                    'bottom-end',
                ],
                default: 'bottom',
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'position'],
                default: ['bare', 'lnf', 'shape', 'position'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiDropdownInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', position: 'bottom', scope: [] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
          position: absolute;
          -webkit-appearance: none;
          appearance: none;
          line-height: 1;
          outline: 0;
          white-space: nowrap;
          cursor: auto;
          z-index: 10;

            @sugar.state.disabled {
                @sugar.disabled;
                opacity: 0 !important;
            }
      `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
        `);
        switch (finalParams.style) {
            case 'solid':
            default:
                vars.push(`
                    background-color: sugar.color(main, background);
                    border: sugar.theme(ui.dropdown.borderWidth) solid sugar.color(current, border);
                    @sugar.border.radius(ui.dropdown.borderRadius);
                    padding-inline: sugar.padding(ui.dropdown.paddingInline);
                    padding-block: sugar.padding(ui.dropdown.paddingBlock);
                    @sugar.depth(ui.dropdown.depth);
                    @sugar.transition(fast);

                    &-item {
                        padding-inline: sugar.padding(ui.dropdown.itemPaddingInline);
                        padding-block: sugar.padding(ui.dropdown.itemPaddingBlock);
                        background-color: sugar.color(current, --alpha 0);
                        @sugar.border.radius(ui.dropdown.borderRadius);
                        @sugar.transition(fast);

                        &:hover, &:focus {
                            background-color: sugar.color(current, --alpha 1 --darken 10%);
                        }

                    }

                `);
                break;
        }
    }
    if (finalParams.scope.includes('shape')) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 9999px;
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.border.radius(ui.dropdown.borderRadius);
                `);
                break;
        }
    }
    if (finalParams.scope.indexOf('position') !== -1) {
        switch (finalParams.position) {
            case 'top':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 50%;
                    transform: translateX(-50%);
                `);
                break;
            case 'top-end':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: auto;
                    right: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }

                `);
                break;
            case 'top-start':
                vars.push(`
                    bottom: 100%;
                    top: auto;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
                break;
            case 'bottom-start':
                vars.push(`
                    top: 100%;
                    left: 0;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: 0;
                        left: auto;
                    }
                `);
                break;
            case 'bottom-end':
                vars.push(`
                    top: 100%;
                    right: 0;
                    left: auto;
                    transform: none;

                    [dir="rtl"] &,
                    &[dir="rtl"] {
                        right: auto;
                        left: 0;
                    }
                `);
                break;
            case 'bottom':
            default:
                vars.push(`
                    top: 100%;
                    left: 50%;
                    transform: translateX(-50%);
                `);
                break;
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLHFDQUFzQyxTQUFRLHFCQUFZO0lBQzVELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsMEJBQTBCLENBQUM7YUFDcEQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLENBQUM7Z0JBQ3JDLE9BQU8sRUFBRSxpQkFBUSxDQUFDLEdBQUcsQ0FBQywwQkFBMEIsQ0FBQzthQUNwRDtZQUNELFFBQVEsRUFBRTtnQkFDTixJQUFJLEVBQUUsUUFBUTtnQkFDZCxNQUFNLEVBQUU7b0JBQ0osS0FBSztvQkFDTCxXQUFXO29CQUNYLFNBQVM7b0JBQ1QsUUFBUTtvQkFDUixjQUFjO29CQUNkLFlBQVk7aUJBQ2Y7Z0JBQ0QsT0FBTyxFQUFFLFFBQVE7YUFDcEI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxVQUFVLENBQUM7Z0JBQzVDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLFVBQVUsQ0FBQzthQUNoRDtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFlaUQsMERB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