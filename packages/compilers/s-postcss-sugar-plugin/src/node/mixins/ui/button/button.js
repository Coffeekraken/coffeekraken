"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const themeVar_1 = __importDefault(require("../../../utils/themeVar"));
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
    // bare
    vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        cursor: pointer;
        padding: ${themeVar_1.default('ui.button.padding')};
      }
    `);
    // lnf
    vars.push(`
      @sugar.scope.lnf {
  `);
    vars.push(`
      border-radius: ${themeVar_1.default('ui.button.borderRadius')};
      transition: ${themeVar_1.default('ui.button.transition')};
  `);
    switch (finalParams.style) {
        case 'outlined':
            vars.push(`
          background-color: transparent;
          border-color: sugar.color(${finalParams.color});
          color: sugar.color(${finalParams.color});
          border-style: solid;
          border-width: ${1 / parseInt(defaultSize)}em;
          &:hover {
            background-color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--10`});
          }
        `);
            break;
        case 'text':
            vars.push(`
          background-color: transparent;
          color: sugar.color(${finalParams.color});
          &:hover {
            background-color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--10`});
          }
      `);
            break;
        case 'default':
        default:
            vars.push(`
        background-color: sugar.color(${finalParams.color});
        color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--i`});
        &:hover {
          background-color: sugar.color(${finalParams.textColor
                ? finalParams.textColor
                : `${finalParams.color}--i`});
          color: sugar.color(${finalParams.color});
        }
      `);
            break;
    }
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx1RUFBaUQ7QUFFakQsaUVBQTJDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7O0FBMEJkLHdEQUFTO0FBekJoRCw4Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztRQUN2QyxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFXSixtQkFDRSxTQUFxRCxFQUFFLEVBQ3ZELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxTQUFTLEVBQ2hCLFNBQVMsRUFBRSxFQUFFLEVBQ2IsS0FBSyxFQUFFLFNBQVMsSUFDYixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLFdBQVcsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsY0FBYyxDQUFDLENBQUM7SUFFckQsT0FBTztJQUNQLElBQUksQ0FBQyxJQUFJLENBQUM7Ozs7bUJBSU8sa0JBQVUsQ0FBQyxtQkFBbUIsQ0FBQzs7S0FFN0MsQ0FBQyxDQUFDO0lBRUwsTUFBTTtJQUNOLElBQUksQ0FBQyxJQUFJLENBQUM7O0dBRVQsQ0FBQyxDQUFDO0lBRUgsSUFBSSxDQUFDLElBQUksQ0FBQzt1QkFDVyxrQkFBVSxDQUFDLHdCQUF3QixDQUFDO29CQUN2QyxrQkFBVSxDQUFDLHNCQUFzQixDQUFDO0dBQ25ELENBQUMsQ0FBQztJQUVILFFBQVEsV0FBVyxDQUFDLEtBQUssRUFBRTtRQUN6QixLQUFLLFVBQVU7WUFDYixJQUFJLENBQUMsSUFBSSxDQUFDOztzQ0FFc0IsV0FBVyxDQUFDLEtBQUs7K0JBQ3hCLFdBQVcsQ0FBQyxLQUFLOzswQkFFdEIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7OzRDQUdyQyxXQUFXLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxNQUMxQjs7U0FFSCxDQUFDLENBQUM7WUFDTCxNQUFNO1FBQ1IsS0FBSyxNQUFNO1lBQ1QsSUFBSSxDQUFDLElBQUksQ0FBQzs7K0JBRWUsV0FBVyxDQUFDLEtBQUs7OzRDQUdsQyxXQUFXLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxNQUMxQjs7T0FFTCxDQUFDLENBQUM7WUFDSCxNQUFNO1FBQ1IsS0FBSyxTQUFTLENBQUM7UUFDZjtZQUNFLElBQUksQ0FBQyxJQUFJLENBQUM7d0NBQ3dCLFdBQVcsQ0FBQyxLQUFLOzZCQUUvQyxXQUFXLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUMxQjs7MENBR0ksV0FBVyxDQUFDLFNBQVM7Z0JBQ25CLENBQUMsQ0FBQyxXQUFXLENBQUMsU0FBUztnQkFDdkIsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FDMUI7K0JBQ3FCLFdBQVcsQ0FBQyxLQUFLOztPQUV6QyxDQUFDLENBQUM7WUFDSCxNQUFNO0tBQ1Q7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUF6RkQsNEJBeUZDIn0=