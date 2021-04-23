"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = require("@coffeekraken/s-sugar-config");
const themeVar_1 = __importDefault(require("../../../utils/themeVar"));
const isInScope_1 = __importDefault(require("../../../utils/isInScope"));
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
    const defaultSize = s_sugar_config_1.themeConfig('size.default');
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCxpRUFBMEU7QUFDMUUsdUVBQWlEO0FBQ2pELHlFQUFtRDtBQUVuRCxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZOztBQTBCZCx3REFBUztBQXpCaEQsOENBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxFQUFFLFVBQVUsRUFBRSxNQUFNLENBQUM7UUFDdkMsT0FBTyxFQUFFLFNBQVM7S0FDbkI7Q0FDRixDQUFDO0FBV0osbUJBQ0UsU0FBcUQsRUFBRSxFQUN2RCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixTQUFTLEVBQUUsRUFBRSxFQUNiLEtBQUssRUFBRSxTQUFTLElBQ2IsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxXQUFXLEdBQUcsNEJBQVcsQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVoRCxJQUFJLG1CQUFXLENBQUMsTUFBTSxDQUFDLEVBQUU7UUFDdkIsSUFBSSxDQUFDLElBQUksQ0FBQzs7O2lCQUdHLGtCQUFVLENBQUMsbUJBQW1CLENBQUM7S0FDM0MsQ0FBQyxDQUFDO0tBQ0o7SUFFRCxJQUFJLG1CQUFXLENBQUMsS0FBSyxDQUFDLEVBQUU7UUFDdEIsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0Isa0JBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUNyRSxJQUFJLENBQUMsSUFBSSxDQUFDLGVBQWUsa0JBQVUsQ0FBQyxzQkFBc0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNqRTtJQUVELElBQUksbUJBQVcsQ0FBQyxPQUFPLENBQUMsRUFBRTtRQUN4QixRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7WUFDekIsS0FBSyxVQUFVO2dCQUNiLElBQUksQ0FBQyxJQUFJLENBQUMsZ0NBQWdDLENBQUMsQ0FBQztnQkFDNUMsSUFBSSxDQUFDLElBQUksQ0FBQyw2QkFBNkIsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQzlELElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLHNCQUFzQixDQUFDLENBQUM7Z0JBQ2xDLElBQUksQ0FBQyxJQUFJLENBQUMsaUJBQWlCLENBQUMsR0FBRyxRQUFRLENBQUMsV0FBVyxDQUFDLEtBQUssQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLENBQUMsSUFBSSxDQUFDOzswQ0FHTixXQUFXLENBQUMsU0FBUztvQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO29CQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxNQUMxQjs7T0FFSCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssTUFBTTtnQkFDVCxJQUFJLENBQUMsSUFBSSxDQUFDLGdDQUFnQyxDQUFDLENBQUM7Z0JBQzVDLElBQUksQ0FBQyxJQUFJLENBQUMsc0JBQXNCLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO2dCQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDOzswQ0FHTixXQUFXLENBQUMsU0FBUztvQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO29CQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxNQUMxQjs7T0FFSCxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtZQUNSLEtBQUssU0FBUyxDQUFDO1lBQ2Y7Z0JBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQyxpQ0FBaUMsV0FBVyxDQUFDLEtBQUssSUFBSSxDQUFDLENBQUM7Z0JBQ2xFLElBQUksQ0FBQyxJQUFJLENBQ1Asc0JBQ0UsV0FBVyxDQUFDLFNBQVM7b0JBQ25CLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUztvQkFDdkIsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FDMUIsSUFBSSxDQUNMLENBQUM7Z0JBRUYsSUFBSSxDQUFDLElBQUksQ0FBQzs7MENBR04sV0FBVyxDQUFDLFNBQVM7b0JBQ25CLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUztvQkFDdkIsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FDMUI7K0JBQ3FCLFdBQVcsQ0FBQyxLQUFLOztPQUV6QyxDQUFDLENBQUM7Z0JBQ0QsTUFBTTtTQUNUO0tBQ0Y7SUFFRCxNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQXZGRCw0QkF1RkMifQ==