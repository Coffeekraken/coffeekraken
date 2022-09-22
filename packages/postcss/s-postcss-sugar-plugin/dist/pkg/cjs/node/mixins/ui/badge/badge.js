"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          badge
 * @namespace     node.mixin.ui.badge
 * @type          PostcssMixin
 * @interface       ./badge
 * @platform      postcss
 * @status        beta
 *
 * This mixin allows you to generate the "badge" UI component css.
 *
 * @param       {'solid'|'outline'}                           [style='theme.ui.badge.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'}             [shape='theme.ui.badge.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape']]      The scope you want to generate
 * @return      {Css}                   The corresponding css
 *
 * @example       css
 * .my-element {
 *      \@sugar.ui.badge();
 * }
 *
 * @since     2.0.0
 * @author 	                Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiBadgeInterface extends s_interface_1.default {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid', 'outline'],
                default: s_theme_1.default.get('ui.badge.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill'],
                default: s_theme_1.default.get('ui.badge.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape'],
                default: ['bare', 'lnf', 'shape'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiBadgeInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape'] }, params);
    const vars = [];
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`   
        display: inline-flex;
        align-items: center;
        white-space: nowrap;
        user-select: none;
    `);
    }
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            font-size: sugar.scalable(0.75em);
            padding-inline: sugar.padding(ui.badge.paddingInline);
            padding-block: sugar.padding(ui.badge.paddingBlock);
            vertical-align: baseline;

            & > * {
                @sugar.color(main);
            }

        `);
        switch (finalParams.style) {
            case 'outline':
                vars.push(`
                position: relative;
                color: sugar.color(current);
                background: none !important;
                
                &:after {
                    content: '';
                    position: absolute;
                    top: 0;
                    left: 0;
                    bottom: 0;
                    right: 0;
                    border: sugar.color(current) solid sugar.theme(ui.badge.borderWidth);
                    pointer-events: none;
                }
            `);
                break;
            case 'solid':
            default:
                vars.push(`
                     color: sugar.color(current, foreground);
                     background-color: sugar.color(current);
                `);
                break;
        }
    }
    if (finalParams.scope.indexOf('shape') !== -1) {
        switch (finalParams.shape) {
            case 'square':
                vars.push(`
                    border-radius: 0;
                    &:after {
                        border-radius: 0;
                    }
            `);
                break;
            case 'pill':
                vars.push(`
                    border-radius: 999999px;
                    &:after {
                        border-radius: 999999px;
                    }
                `);
                break;
            case 'default':
            default:
                vars.push(`
                    border-radius: 0.5em;
                    &:after {
                        border-radius: 0.5em;
                    }
                `);
                break;
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLFNBQVMsQ0FBQztnQkFDNUIsT0FBTyxFQUFFLGlCQUFRLENBQUMsR0FBRyxDQUFDLHVCQUF1QixDQUFDO2FBQ2pEO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLFNBQVMsRUFBRSxRQUFRLEVBQUUsTUFBTSxDQUFDO2dCQUNyQyxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztnQkFDaEMsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLENBQUM7YUFDcEM7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBUThDLHVEQUFTO0FBQ3hELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixLQUFLLEVBQUUsT0FBTyxFQUNkLEtBQUssRUFBRSxTQUFTLEVBQ2hCLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxDQUFDLElBQzVCLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7S0FLYixDQUFDLENBQUM7S0FDRjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7OztTQVVULENBQUMsQ0FBQztRQUVILFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFNBQVM7Z0JBQ1YsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7O2FBZWIsQ0FBQyxDQUFDO2dCQUNDLE1BQU07WUFDVixLQUFLLE9BQU8sQ0FBQztZQUNiO2dCQUNJLElBQUksQ0FBQyxJQUFJLENBQUM7OztpQkFHVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsQ0FBQyxFQUFFO1FBQzNDLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN2QixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7YUFLYixDQUFDLENBQUM7Z0JBQ0MsTUFBTTtZQUNWLEtBQUssTUFBTTtnQkFDUCxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztpQkFLVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtZQUNWLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0ksSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07U0FDYjtLQUNKO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXBHRCw0QkFvR0MifQ==