"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class SSugarcssPluginUiBaseInterface extends s_interface_1.default {
    static get _definition() {
        return {
            name: {
                type: 'String',
                required: true,
            },
            scope: {
                type: 'String',
                default: ['bare', 'lnf'],
            },
        };
    }
}
exports.interface = SSugarcssPluginUiBaseInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', scope: ['bare', 'lnf'] }, params);
    if (!finalParams.name)
        return;
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: s.scalable(1rem);
            display: inline-block;
            padding-inline: s.padding(ui.${finalParams.name}.paddingInline);
            padding-block: s.padding(ui.${finalParams.name}.paddingBlock);


        `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: s.color(main, text);
            background-color: s.color(main, uiBackground);
            font-size: s.scalable(1rem);
            border: s.color(current, --alpha 0.2) solid s.theme(ui.${finalParams.name}.borderWidth);
            border-radius: s.border.radius(ui.${finalParams.name}.borderRadius);
            transition: s.theme(ui.${finalParams.name}.transition);
            @s.depth(${s_theme_1.default.get(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
                color: s.color(main, placeholder);
            }

            &::selection {
                color: s.color(current, 100);
                background-color: s.color(current);
            }

            &:not(textarea) {
                line-height: 1;
            }

            &[disabled] {
                @s.disabled();
            }

            @s.state.hover {
                border: s.color(current, --alpha 0.3) solid 1px;
            }
            @s.state.focus {
                border: s.color(current, --alpha 0.4) solid 1px;
            }
            @s.state.active {
                border: s.color(current, --alpha 0.4) solid 1px;
            }
    `);
    }
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTzBDLG1EQUFTO0FBRXBELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7UUFBRSxPQUFPO0lBRTlCLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7MkNBR3lCLFdBQVcsQ0FBQyxJQUFJOzBDQUNqQixXQUFXLENBQUMsSUFBSTs7O1NBR2pELENBQUMsQ0FBQztLQUNOO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7OztxRUFLRixXQUFXLENBQUMsSUFDaEI7Z0RBQ29DLFdBQVcsQ0FBQyxJQUFJO3FDQUMzQixXQUFXLENBQUMsSUFBSTt1QkFDOUIsaUJBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkI5RCxDQUFDLENBQUM7S0FDRjtJQUVELE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUEzRUQsNEJBMkVDIn0=