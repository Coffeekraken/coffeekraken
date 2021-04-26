"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const themeVar_1 = __importDefault(require("../../../utils/themeVar"));
const isInScope_1 = __importDefault(require("../../../utils/isInScope"));
const theme_1 = __importDefault(require("../../../utils/theme"));
class postcssSugarPluginUiButtonInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUiButtonInterface;
postcssSugarPluginUiButtonInterface.definition = {
    color: {
        type: 'String',
        required: true,
        default: 'default',
        alias: 'c'
    },
    textColor: {
        type: 'String',
        alias: 't'
    },
    style: {
        type: 'String',
        values: ['default', 'outlined', 'text'],
        default: 'default'
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ color: 'default', textColor: '', style: 'default' }, params);
    const vars = [];
    const defaultSize = theme_1.default().config('size.default');
    if (isInScope_1.default('bare')) {
        vars.push(`
      display: inline-block;
      cursor: pointer;
      padding: ${themeVar_1.default('ui.button.padding')};
    `);
    }
    if (isInScope_1.default('lnf')) {
        vars.push(`border-radius: ${themeVar_1.default('ui.button.borderRadius')};`);
        vars.push(`transition: ${themeVar_1.default('ui.button.transition')};`);
    }
    if (isInScope_1.default('color')) {
        switch (finalParams.style) {
            case 'outlined':
                vars.push('background-color: transparent;');
                vars.push(`border-color: sugar.color(${finalParams.color});`);
                vars.push(`color: sugar.color(${finalParams.color});`);
                vars.push(`border-style: solid;`);
                vars.push(`border-width: ${1 / parseInt(defaultSize)}em;`);
                vars.push(`
        &:hover {
          background-color: sugar.color(${finalParams.textColor
                    ? finalParams.textColor
                    : `${finalParams.color}--10`});
        }
      `);
                break;
            case 'text':
                vars.push('background-color: transparent;');
                vars.push(`color: sugar.color(${finalParams.color});`);
                vars.push(`
        &:hover {
          background-color: sugar.color(${finalParams.textColor
                    ? finalParams.textColor
                    : `${finalParams.color}--10`});
        }
      `);
                break;
            case 'default':
            default:
                vars.push(`background-color: sugar.color(${finalParams.color});`);
                vars.push(`color: sugar.color(${finalParams.textColor
                    ? finalParams.textColor
                    : `${finalParams.color}--i`});`);
                vars.push(`
        &:hover {
          background-color: sugar.color(${finalParams.textColor
                    ? finalParams.textColor
                    : `${finalParams.color}--i`});
          color: sugar.color(${finalParams.color});
        }
      `);
                break;
        }
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx1RUFBaUQ7QUFDakQseUVBQW1EO0FBQ25ELGlFQUEyQztBQUUzQyxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZOztBQTBCZCx3REFBUztBQXpCaEQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUM7UUFDdkMsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUFDO0FBV0osbUJBQ0UsU0FBcUQsRUFBRSxFQUN2RCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixTQUFTLEVBQUUsRUFBRSxFQUNiLEtBQUssRUFBRSxTQUFTLElBQ2IsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxXQUFXLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDO0lBRXJELElBQUksbUJBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDOzs7aUJBR0csa0JBQVUsQ0FBQyxtQkFBbUIsQ0FBQztLQUMzQyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksbUJBQVcsQ0FBQyxLQUFLLENBQUMsRUFBRTtRQUN0QixJQUFJLENBQUMsSUFBSSxDQUFDLGtCQUFrQixrQkFBVSxDQUFDLHdCQUF3QixDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQ3JFLElBQUksQ0FBQyxJQUFJLENBQUMsZUFBZSxrQkFBVSxDQUFDLHNCQUFzQixDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2pFO0lBRUQsSUFBSSxtQkFBVyxDQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ3hCLFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtZQUN6QixLQUFLLFVBQVU7Z0JBQ2IsSUFBSSxDQUFDLElBQUksQ0FBQyxnQ0FBZ0MsQ0FBQyxDQUFDO2dCQUM1QyxJQUFJLENBQUMsSUFBSSxDQUFDLDZCQUE2QixXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLENBQUMsQ0FBQztnQkFDbEMsSUFBSSxDQUFDLElBQUksQ0FBQyxpQkFBaUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUMsS0FBSyxDQUFDLENBQUM7Z0JBQzNELElBQUksQ0FBQyxJQUFJLENBQUM7OzBDQUdOLFdBQVcsQ0FBQyxTQUFTO29CQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7b0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLE1BQzFCOztPQUVILENBQUMsQ0FBQztnQkFDRCxNQUFNO1lBQ1IsS0FBSyxNQUFNO2dCQUNULElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyxzQkFBc0IsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUM7OzBDQUdOLFdBQVcsQ0FBQyxTQUFTO29CQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7b0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLE1BQzFCOztPQUVILENBQUMsQ0FBQztnQkFDRCxNQUFNO1lBQ1IsS0FBSyxTQUFTLENBQUM7WUFDZjtnQkFDRSxJQUFJLENBQUMsSUFBSSxDQUFDLGlDQUFpQyxXQUFXLENBQUMsS0FBSyxJQUFJLENBQUMsQ0FBQztnQkFDbEUsSUFBSSxDQUFDLElBQUksQ0FDUCxzQkFDRSxXQUFXLENBQUMsU0FBUztvQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO29CQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUMxQixJQUFJLENBQ0wsQ0FBQztnQkFFRixJQUFJLENBQUMsSUFBSSxDQUFDOzswQ0FHTixXQUFXLENBQUMsU0FBUztvQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO29CQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUMxQjsrQkFDcUIsV0FBVyxDQUFDLEtBQUs7O09BRXpDLENBQUMsQ0FBQztnQkFDRCxNQUFNO1NBQ1Q7S0FDRjtJQUVELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBdkZELDRCQXVGQyJ9