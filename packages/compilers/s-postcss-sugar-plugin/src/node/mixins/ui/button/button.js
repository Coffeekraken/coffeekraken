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
function default_1({ params, atRule, processNested }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCx1RUFBaUQ7QUFFakQsaUVBQTJDO0FBRTNDLE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7O0FBMEJkLHdEQUFTO0FBekJoRCw4Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxTQUFTLEVBQUUsVUFBVSxFQUFFLE1BQU0sQ0FBQztRQUN2QyxPQUFPLEVBQUUsU0FBUztLQUNuQjtDQUNGLENBQUM7QUFVSixtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLFNBQVMsRUFDaEIsU0FBUyxFQUFFLEVBQUUsRUFDYixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sV0FBVyxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRCxPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7OzttQkFJTyxrQkFBVSxDQUFDLG1CQUFtQixDQUFDOztLQUU3QyxDQUFDLENBQUM7SUFFTCxNQUFNO0lBQ04sSUFBSSxDQUFDLElBQUksQ0FBQzs7R0FFVCxDQUFDLENBQUM7SUFFSCxJQUFJLENBQUMsSUFBSSxDQUFDO3VCQUNXLGtCQUFVLENBQUMsd0JBQXdCLENBQUM7b0JBQ3ZDLGtCQUFVLENBQUMsc0JBQXNCLENBQUM7R0FDbkQsQ0FBQyxDQUFDO0lBRUgsUUFBUSxXQUFXLENBQUMsS0FBSyxFQUFFO1FBQ3pCLEtBQUssVUFBVTtZQUNiLElBQUksQ0FBQyxJQUFJLENBQUM7O3NDQUVzQixXQUFXLENBQUMsS0FBSzsrQkFDeEIsV0FBVyxDQUFDLEtBQUs7OzBCQUV0QixDQUFDLEdBQUcsUUFBUSxDQUFDLFdBQVcsQ0FBQzs7NENBR3JDLFdBQVcsQ0FBQyxTQUFTO2dCQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLE1BQzFCOztTQUVILENBQUMsQ0FBQztZQUNMLE1BQU07UUFDUixLQUFLLE1BQU07WUFDVCxJQUFJLENBQUMsSUFBSSxDQUFDOzsrQkFFZSxXQUFXLENBQUMsS0FBSzs7NENBR2xDLFdBQVcsQ0FBQyxTQUFTO2dCQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLE1BQzFCOztPQUVMLENBQUMsQ0FBQztZQUNILE1BQU07UUFDUixLQUFLLFNBQVMsQ0FBQztRQUNmO1lBQ0UsSUFBSSxDQUFDLElBQUksQ0FBQzt3Q0FDd0IsV0FBVyxDQUFDLEtBQUs7NkJBRS9DLFdBQVcsQ0FBQyxTQUFTO2dCQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7Z0JBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEtBQzFCOzswQ0FHSSxXQUFXLENBQUMsU0FBUztnQkFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO2dCQUN2QixDQUFDLENBQUMsR0FBRyxXQUFXLENBQUMsS0FBSyxLQUMxQjsrQkFDcUIsV0FBVyxDQUFDLEtBQUs7O09BRXpDLENBQUMsQ0FBQztZQUNILE1BQU07S0FDVDtJQUNELElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFZixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQTdGRCw0QkE2RkMifQ==