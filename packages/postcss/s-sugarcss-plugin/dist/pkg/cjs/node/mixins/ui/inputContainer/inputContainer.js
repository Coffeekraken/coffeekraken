"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
/**
 * @name          inputContainer
 * @as          @s.ui.inputContainer
 * @namespace     node.mixin.ui.inputContainer
 * @type               PostcssMixin
 * @interface       ./input
 * @platform      postcss
 * @status        beta
 *
 * Apply an input container style like "button", "addon", etc...
 *
 * @param       {'addon'|'group'}                           lnf         The style you want to apply
 * @return      {String}            The generated css
 *
 * @scope       bare            Structural css
 * @scope       lnf             Look and feel css
 *
 * @snippet         @s.ui.inputContainer
 *
 * @example     css
 * .my-input-container {
 *    @s.ui.inputContainer(group);
 * }
 *
 * @since      2.0.0
 * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
class SSugarcssPluginUiFormInputInterface extends s_interface_1.default {
    static get _definition() {
        return {
            lnf: {
                type: 'String',
                values: ['addon', 'group'],
                required: true,
            },
        };
    }
}
exports.interface = SSugarcssPluginUiFormInputInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ lnf: 'group' }, params);
    const vars = [];
    vars.push(`
        @s.scope 'bare' {
            width: 100%;
        }
    `);
    vars.push(`@s.scope 'bare' {`);
    switch (finalParams.lnf) {
        case 'addon':
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
            break;
        case 'group':
        default:
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
            break;
    }
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EwQkc7QUFFSCxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZO0lBQzFELE1BQU0sS0FBSyxXQUFXO1FBQ2xCLE9BQU87WUFDSCxHQUFHLEVBQUU7Z0JBQ0QsSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsTUFBTSxFQUFFLENBQUMsT0FBTyxFQUFFLE9BQU8sQ0FBQztnQkFDMUIsUUFBUSxFQUFFLElBQUk7YUFDakI7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTStDLHdEQUFTO0FBRXpELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixHQUFHLEVBQUUsT0FBTyxJQUNULE1BQU0sQ0FDWixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7S0FJVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsUUFBUSxXQUFXLENBQUMsR0FBRyxFQUFFO1FBQ3JCLEtBQUssT0FBTztZQUNSLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztpQkF3QkwsQ0FBQyxDQUFDO1lBQ1AsTUFBTTtRQUNWLEtBQUssT0FBTyxDQUFDO1FBQ2I7WUFDSSxJQUFJLENBQUMsSUFBSSxDQUFDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OzthQWdDVCxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ2I7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTNGRCw0QkEyRkMifQ==