"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          inputContainer
 * @as          @sugar.ui.inputContainer
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
            width: 100%;
        `);
    }
    switch (finalParams.lnf) {
        case 'addon':
            if (finalParams.scope.includes('bare')) {
                vars.push(`
                    display: block;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBd0JHO0FBRUgsTUFBTSxzQ0FBdUMsU0FBUSxxQkFBWTtJQUM3RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsR0FBRyxFQUFFO2dCQUNELElBQUksRUFBRSxRQUFRO2dCQUNkLE1BQU0sRUFBRSxDQUFDLE9BQU8sRUFBRSxPQUFPLENBQUM7Z0JBQzFCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRTtvQkFDRixJQUFJLEVBQUUsZUFBZTtvQkFDckIsVUFBVSxFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsQ0FBQztpQkFDekI7Z0JBQ0QsTUFBTSxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQztnQkFDdkIsT0FBTyxFQUFFLENBQUMsTUFBTSxFQUFFLEtBQUssQ0FBQzthQUMzQjtTQUNKLENBQUM7SUFDTixDQUFDO0NBQ0o7QUFPa0QsMkRBQVM7QUFFNUQsbUJBQXlCLEVBQ3JCLE1BQU0sRUFDTixNQUFNLEVBQ04sV0FBVyxHQUtkO0lBQ0csTUFBTSxXQUFXLG1CQUNiLEdBQUcsRUFBRSxPQUFPLEVBQ1osS0FBSyxFQUFFLEVBQUUsSUFDTixNQUFNLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO1FBQ3BDLElBQUksQ0FBQyxJQUFJLENBQUM7O1NBRVQsQ0FBQyxDQUFDO0tBQ047SUFFRCxRQUFRLFdBQVcsQ0FBQyxHQUFHLEVBQUU7UUFDckIsS0FBSyxPQUFPO1lBQ1IsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLFFBQVEsQ0FBQyxNQUFNLENBQUMsRUFBRTtnQkFDcEMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkF5QlQsQ0FBQyxDQUFDO2FBQ047WUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2FBQ3RDO1lBRUQsTUFBTTtRQUNWLEtBQUssT0FBTyxDQUFDO1FBQ2I7WUFDSSxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFO2dCQUNwQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkFnQ1QsQ0FBQyxDQUFDO2FBQ047WUFDRCxJQUFJLFdBQVcsQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLEtBQUssQ0FBQyxFQUFFO2FBQ3RDO1lBRUQsTUFBTTtLQUNiO0lBRUQsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQXJHRCw0QkFxR0MifQ==