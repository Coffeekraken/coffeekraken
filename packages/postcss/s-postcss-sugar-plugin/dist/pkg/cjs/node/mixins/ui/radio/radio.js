"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
/**
 * @name          radio
 * @namespace     node.mixin.ui.radio
 * @type               PostcssMixin
 * @interface     ./radio          interface
 * @platform      postcss
 * @status        beta
 *
 * Apply the radio style to any element
 *
 * @param       {'solid'}                           [style='theme.ui.radio.defaultStyle']         The style you want to generate
 * @param       {'default'|'square'|'pill'|'circle'}             [shape='theme.ui.radio.defaultShape']         The shape you want to generate
 * @param       {('bare'|'lnf'|'shape'|'vr'|'tf')[]}        [scope=['bare', 'lnf', 'shape', 'vr', 'tf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @example     css
 * .my-radio {
 *    @sugar.ui.radio;
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiRadioInterface extends s_interface_1.default {
    static get _definition() {
        return {
            style: {
                type: 'String',
                values: ['solid'],
                default: s_theme_1.default.get('ui.radio.defaultStyle'),
            },
            shape: {
                type: 'String',
                values: ['default', 'square', 'pill', 'circle'],
                default: s_theme_1.default.get('ui.radio.defaultShape'),
            },
            scope: {
                type: {
                    type: 'Array<String>',
                    splitChars: [',', ' '],
                },
                values: ['bare', 'lnf', 'shape', 'vr'],
                default: ['bare', 'lnf', 'shape', 'vr'],
            },
        };
    }
}
exports.interface = postcssSugarPluginUiRadioInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ style: 'solid', shape: 'default', scope: ['bare', 'lnf', 'shape', 'vr'] }, params);
    const vars = [
        `
        
`,
    ];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
                
                appearance: none !important;
                -moz-appearance: none !important;
                -webkit-appearance: none !important;
                position: relative;
                width: 1.4em;
                height: 1.4em;
                font-size: sugar.scalable(1rem);
                margin-block: 0.7em 0.9em;

                &:disabled {
                    @sugar.disabled;
                }
            `);
    }
    switch (finalParams.style) {
        case 'solid':
            // lnf
            if (finalParams.scope.indexOf('lnf') !== -1) {
                vars.push(`
                
                    transition: sugar.theme(ui.radio.transition);
                    border: sugar.theme(ui.radio.borderWidth) solid sugar.color(current);
                    background-color: transparent;
                    transition: sugar.theme(ui.radio.transition);
                    box-shadow: 0 0 0 0 sugar.color(current, --alpha 0.2);

                    &:after {
                        content: '';
                        position: absolute;
                        top: 50%; left: 50%;
                        width: 0.4em; height: 0.4em;
                        transform: translate(-50%, -50%);
                        background: sugar.color(current);
                        opacity: 0;
                        transition: sugar.theme(ui.radio.transition);
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
    if (finalParams.scope.includes('shape')) {
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
            case 'circle':
                vars.push(`
                    border-radius: 9999px;
                    &:after {
                        border-radius: 9999px;
                    }
                `);
                break;
            default:
                vars.push(`
                    border-radius: sugar.border.radius(ui.radio.borderRadius);
                    &:after {
                        border-radius: sugar.border.radius(ui.radio.borderRadius);
                    }
                `);
                break;
        }
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0M7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FzQkc7QUFFSCxNQUFNLGtDQUFtQyxTQUFRLHFCQUFZO0lBQ3pELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxDQUFDO2dCQUNqQixPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFFBQVEsRUFBRSxNQUFNLEVBQUUsUUFBUSxDQUFDO2dCQUMvQyxPQUFPLEVBQUUsaUJBQVEsQ0FBQyxHQUFHLENBQUMsdUJBQXVCLENBQUM7YUFDakQ7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sRUFBRSxJQUFJLENBQUM7Z0JBQ3RDLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLEVBQUUsT0FBTyxFQUFFLElBQUksQ0FBQzthQUMxQztTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFROEMsdURBQVM7QUFDeEQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEtBQUssRUFBRSxPQUFPLEVBQ2QsS0FBSyxFQUFFLFNBQVMsRUFDaEIsS0FBSyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssRUFBRSxPQUFPLEVBQUUsSUFBSSxDQUFDLElBQ2xDLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWE7UUFDbkI7O0NBRVA7S0FDSSxDQUFDO0lBRUYsT0FBTztJQUNQLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDMUMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7YUFjTCxDQUFDLENBQUM7S0FDVjtJQUVELFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN2QixLQUFLLE9BQU87WUFDUixNQUFNO1lBQ04sSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxLQUFLLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtnQkFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O1NBOEJqQixDQUFDLENBQUM7YUFDRTtLQUNSO0lBRUQsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUNyQyxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDdkIsS0FBSyxRQUFRO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7O2lCQUtULENBQUMsQ0FBQztnQkFDSCxNQUFNO1lBQ1YsS0FBSyxNQUFNLENBQUM7WUFDWixLQUFLLFFBQVE7Z0JBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7aUJBS1QsQ0FBQyxDQUFDO2dCQUNILE1BQU07WUFDVjtnQkFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztpQkFLVCxDQUFDLENBQUM7Z0JBQ0gsTUFBTTtTQUNiO0tBQ0o7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBOUdELDRCQThHQyJ9