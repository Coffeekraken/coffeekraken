"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          inputContainer
 * @namespace     node.mixin.ui.inputContainer
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply an input container style like "button", "addon", etc...
 *
 * @param       {'addon'|'group'}                           lnf         The style you want to apply
 * @param       {('bare'|'lnf')[]}        [scope=['bare', 'lnf']]      The scope you want to generate
 * @return      {String}            The generated css
 *
 * @snippet         @sugar.ui.inputContainer
 *
 * @example     css
 * .my-input-container {
 *    @sugar.ui.inputContainer(group);
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class postcssSugarPluginUiFormInputInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['addon', 'group'],
                required: true,
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
exports.interface = postcssSugarPluginUiFormInputInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'group', scope: [] }, params);
    const vars = [];
    if (finalParams.scope.includes('bare')) {
        vars.push(`
            display: block;
            width: 100%;
        `);
    }
    switch (finalParams.lnf) {
        case 'addon':
            if (finalParams.scope.includes('bare')) {
                vars.push(`
                    position: relative;

                    & > *:first-child {
                        width: 100%;
                        padding-inline-end: 3em;
                    }
                    & > *:first-child + * {
                        display: flex;
                        align-items: center;
                        justify-content: center;
                        position: absolute;
                        height: 100%;
                        aspect-ratio: 1;
                        top: 0; right: 0;
                    }

                    [dir="rtl"] &, &[dir="rtl"] {
                        & > *:first-child + * {
                            right: auto;
                            left: 0;
                        }
                    }

                `);
            }
            if (finalParams.scope.includes('lnf')) {
            }
            break;
        case 'group':
        default:
            if (finalParams.scope.includes('bare')) {
                vars.push(`
                    display: flex;

                    &:not([dir="rtl"] &):not([dir="rtl"]) {
                        & > *:first-child,
                        & > .s-input-container > *:first-child {
                            border-top-right-radius: 0;
                            border-bottom-right-radius: 0;
                        }
                        & > *:last-child,
                        & > .s-input-container > *:last-child {
                            border-top-left-radius: 0;
                            border-bottom-left-radius: 0;
                        }
                    }
                    [dir="rtl"] &, &[dir="rtl"] {
                        & > *:first-child,
                        & > .s-input-container > *:first-child {
                            border-top-left-radius: 0;
                            border-bottom-left-radius: 0;
                        }
                        & > *:last-child,
                        & > .s-input-container > *:last-child {
                            border-top-right-radius: 0;
                            border-bottom-right-radius: 0;
                        }
                    }

                    & > *:not(:first-child, :last-child),
                    & > .s-input-container > *:not(:first-child, :last-child) {
                        border-radius: 0;
                    }
                `);
            }
            if (finalParams.scope.includes('lnf')) {
            }
            break;
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1Qkc7QUFFSCxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZO0lBQzdELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDMUIsUUFBUSxFQUFFLElBQUk7YUFDakI7WUFDRCxLQUFLLEVBQUU7Z0JBQ0gsSUFBSSxFQUFFO29CQUNGLElBQUksRUFBRSxlQUFlO29CQUNyQixVQUFVLEVBQUUsQ0FBQyxHQUFHLEVBQUUsR0FBRyxDQUFDO2lCQUN6QjtnQkFDRCxNQUFNLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2dCQUN2QixPQUFPLEVBQUUsQ0FBQyxNQUFNLEVBQUUsS0FBSyxDQUFDO2FBQzNCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU9rRCwyREFBUztBQUU1RCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsR0FBRyxFQUFFLE9BQU8sRUFDWixLQUFLLEVBQUUsRUFBRSxJQUNOLE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7O1NBR1QsQ0FBQyxDQUFDO0tBQ047SUFFRCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxPQUFPO1lBQ1IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQXdCVCxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7YUFDdEM7WUFFRCxNQUFNO1FBQ1YsS0FBSyxPQUFPLENBQUM7UUFDYjtZQUNJLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsTUFBTSxDQUFDLEVBQUU7Z0JBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O2lCQWdDVCxDQUFDLENBQUM7YUFDTjtZQUNELElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxRQUFRLENBQUMsS0FBSyxDQUFDLEVBQUU7YUFDdEM7WUFFRCxNQUFNO0tBQ2I7SUFFRCxPQUFPLElBQUksQ0FBQztBQUNoQixDQUFDO0FBckdELDRCQXFHQyJ9