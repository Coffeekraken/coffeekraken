"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_theme_1 = __importDefault(require("@coffeekraken/s-theme"));
class postcssSugarPluginUiBaseInterface extends s_interface_1.default {
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
exports.interface = postcssSugarPluginUiBaseInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '', scope: ['bare', 'lnf'] }, params);
    if (!finalParams.name)
        return;
    const vars = [];
    // bare
    if (finalParams.scope.indexOf('bare') !== -1) {
        vars.push(`
            font-size: sugar.scalable(1rem);
            display: inline-block;
            padding-inline: sugar.padding(ui.${finalParams.name}.paddingInline);
            padding-block: sugar.padding(ui.${finalParams.name}.paddingBlock);


        `);
    }
    // lnf
    if (finalParams.scope.indexOf('lnf') !== -1) {
        vars.push(`
            color: sugar.color(main, uiForeground);
            background-color: sugar.color(main, ui);
            font-size: sugar.scalable(1rem);
            border: sugar.color(current, --alpha 0.2) solid sugar.theme(ui.${finalParams.name}.borderWidth);
            border-radius: sugar.border.radius(ui.${finalParams.name}.borderRadius);
            transition: sugar.theme(ui.${finalParams.name}.transition);
            @sugar.depth(${s_theme_1.default.get(`ui.${finalParams.name}.depth`)});
            cursor: auto !important;

            &::placeholder {
                color: sugar.color(main, placeholder);
            }

            &::selection {
                color: sugar.color(current, 100);
                background-color: sugar.color(current);
            }

            &:not(textarea) {
                line-height: 1;
            }

            &[disabled] {
                @sugar.disabled();
            }

            @sugar.state.hover {
                border: sugar.color(current, --alpha 0.3) solid 1px;
            }
            @sugar.state.focus {
                border: sugar.color(current, --alpha 0.4) solid 1px;
            }
            @sugar.state.active {
                border: sugar.color(current, --alpha 0.4) solid 1px;
            }
    `);
    }
    // wireframe
    vars.push(`
        @sugar.lod.wireframe {
            @sugar.wireframe.background;
            @sugar.wireframe.border;
        }
    `);
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSxpQ0FBa0MsU0FBUSxxQkFBWTtJQUN4RCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0QsS0FBSyxFQUFFO2dCQUNILElBQUksRUFBRSxRQUFRO2dCQUNkLE9BQU8sRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUM7YUFDM0I7U0FDSixDQUFDO0lBQ04sQ0FBQztDQUNKO0FBTzZDLHNEQUFTO0FBRXZELG1CQUF5QixFQUNyQixNQUFNLEVBQ04sTUFBTSxFQUNOLFdBQVcsR0FLZDtJQUNHLE1BQU0sV0FBVyxtQkFDYixJQUFJLEVBQUUsRUFBRSxFQUNSLEtBQUssRUFBRSxDQUFDLE1BQU0sRUFBRSxLQUFLLENBQUMsSUFDbkIsTUFBTSxDQUNaLENBQUM7SUFFRixJQUFJLENBQUMsV0FBVyxDQUFDLElBQUk7UUFBRSxPQUFPO0lBRTlCLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixPQUFPO0lBQ1AsSUFBSSxXQUFXLENBQUMsS0FBSyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDOzs7K0NBRzZCLFdBQVcsQ0FBQyxJQUFJOzhDQUNqQixXQUFXLENBQUMsSUFBSTs7O1NBR3JELENBQUMsQ0FBQztLQUNOO0lBRUQsTUFBTTtJQUNOLElBQUksV0FBVyxDQUFDLEtBQUssQ0FBQyxPQUFPLENBQUMsS0FBSyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUU7UUFDekMsSUFBSSxDQUFDLElBQUksQ0FBQzs7Ozs2RUFLRixXQUFXLENBQUMsSUFDaEI7b0RBRUksV0FBVyxDQUFDLElBQ2hCO3lDQUM2QixXQUFXLENBQUMsSUFBSTsyQkFDOUIsaUJBQVEsQ0FBQyxHQUFHLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkJsRSxDQUFDLENBQUM7S0FDRjtJQUVELFlBQVk7SUFDWixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OztLQUtULENBQUMsQ0FBQztJQUVILE9BQU8sSUFBSSxDQUFDO0FBQ2hCLENBQUM7QUFyRkQsNEJBcUZDIn0=