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
        };
    }
}
exports.interface = SSugarcssPluginUiBaseInterface;
function default_1({ params, atRule, replaceWith, }) {
    const finalParams = Object.assign({ name: '' }, params);
    if (!finalParams.name)
        return;
    const vars = [];
    // bare
    vars.push(`@s.scope 'bare' {`);
    vars.push(`
            font-size: s.scalable(1rem);
            display: inline-block;
            padding-inline: s.padding(ui.${finalParams.name}.paddingInline);
            padding-block: s.padding(ui.${finalParams.name}.paddingBlock);


        `);
    vars.push('}');
    // lnf
    vars.push(`@s.scope 'lnf' {`);
    vars.push(`
            color: s.color(main, text);
            background-color: s.color(main, uiBackground);
            font-size: s.scalable(1rem);
            border: s.color(current, --alpha 0.2) solid s.border.width(ui.${finalParams.name}.borderWidth);
            border-radius: s.border.radius(ui.${finalParams.name}.borderRadius);
            transition: s.theme(ui.${finalParams.name}.transition);
            @s.depth(${s_theme_1.default.current.get(`ui.${finalParams.name}.depth`)});
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
    vars.push('}');
    return vars;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxvRUFBNkM7QUFFN0MsTUFBTSw4QkFBK0IsU0FBUSxxQkFBWTtJQUNyRCxNQUFNLEtBQUssV0FBVztRQUNsQixPQUFPO1lBQ0gsSUFBSSxFQUFFO2dCQUNGLElBQUksRUFBRSxRQUFRO2dCQUNkLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQztJQUNOLENBQUM7Q0FDSjtBQU0wQyxtREFBUztBQUVwRCxtQkFBeUIsRUFDckIsTUFBTSxFQUNOLE1BQU0sRUFDTixXQUFXLEdBS2Q7SUFDRyxNQUFNLFdBQVcsbUJBQ2IsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1osQ0FBQztJQUVGLElBQUksQ0FBQyxXQUFXLENBQUMsSUFBSTtRQUFFLE9BQU87SUFFOUIsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE9BQU87SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7SUFDL0IsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzJDQUc2QixXQUFXLENBQUMsSUFBSTswQ0FDakIsV0FBVyxDQUFDLElBQUk7OztTQUdqRCxDQUFDLENBQUM7SUFDUCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7OzRFQUtFLFdBQVcsQ0FBQyxJQUNoQjtnREFDb0MsV0FBVyxDQUFDLElBQUk7cUNBQzNCLFdBQVcsQ0FBQyxJQUFJO3VCQUM5QixpQkFBUSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsTUFBTSxXQUFXLENBQUMsSUFBSSxRQUFRLENBQUM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0tBNkJ0RSxDQUFDLENBQUM7SUFDSCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQTFFRCw0QkEwRUMifQ==