"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const themeVar_1 = __importDefault(require("../../../utils/themeVar"));
const theme_1 = __importDefault(require("../../../utils/theme"));
class postcssSugarPluginUiFormInputInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginUiFormInputInterface;
postcssSugarPluginUiFormInputInterface.definition = {
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
        values: ['default'],
        default: 'default'
    }
};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ color: 'default', textColor: 'text', style: 'default' }, params);
    const vars = [];
    const defaultSize = theme_1.default().config('size.default');
    // bare
    vars.push(`
      @sugar.scope.bare {
        display: inline-block;
        padding: ${themeVar_1.default('ui.form.padding')};
      }
    `);
    // lnf
    vars.push(`
      @sugar.scope.lnf {
  `);
    vars.push(`
      border-radius: ${themeVar_1.default('ui.form.borderRadius')};
      transition: ${themeVar_1.default('ui.form.transition')};
  `);
    switch (finalParams.style) {
        default:
            vars.push(`
          background-color: transparent;
          border-color: sugar.color(${finalParams.color});
          color: sugar.color(${finalParams.textColor}, 30);
          border-style: solid;
          border-width: ${1 / parseInt(defaultSize)}em;
          padding: ${themeVar_1.default('ui.form.padding')};
          &:hover {
            border-color: sugar.color(${finalParams.color}, 50);
          }
        `);
            break;
    }
    vars.push('}');
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5wdXQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpbnB1dC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsdUVBQWlEO0FBRWpELGlFQUEyQztBQUUzQyxNQUFNLHNDQUF1QyxTQUFRLHFCQUFZOztBQTBCZCwyREFBUztBQXpCbkQsaURBQVUsR0FBRztJQUNsQixLQUFLLEVBQUU7UUFDTCxJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFNBQVMsRUFBRTtRQUNULElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLENBQUMsU0FBUyxDQUFDO1FBQ25CLE9BQU8sRUFBRSxTQUFTO0tBQ25CO0NBQ0YsQ0FBQztBQVdKLG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixTQUFTLEVBQUUsTUFBTSxFQUNqQixLQUFLLEVBQUUsU0FBUyxJQUNiLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sV0FBVyxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxjQUFjLENBQUMsQ0FBQztJQUVyRCxPQUFPO0lBQ1AsSUFBSSxDQUFDLElBQUksQ0FBQzs7O21CQUdPLGtCQUFVLENBQUMsaUJBQWlCLENBQUM7O0tBRTNDLENBQUMsQ0FBQztJQUVMLE1BQU07SUFDTixJQUFJLENBQUMsSUFBSSxDQUFDOztHQUVULENBQUMsQ0FBQztJQUVILElBQUksQ0FBQyxJQUFJLENBQUM7dUJBQ1csa0JBQVUsQ0FBQyxzQkFBc0IsQ0FBQztvQkFDckMsa0JBQVUsQ0FBQyxvQkFBb0IsQ0FBQztHQUNqRCxDQUFDLENBQUM7SUFFSCxRQUFRLFdBQVcsQ0FBQyxLQUFLLEVBQUU7UUFDekI7WUFDRSxJQUFJLENBQUMsSUFBSSxDQUFDOztzQ0FFc0IsV0FBVyxDQUFDLEtBQUs7K0JBQ3hCLFdBQVcsQ0FBQyxTQUFTOzswQkFFMUIsQ0FBQyxHQUFHLFFBQVEsQ0FBQyxXQUFXLENBQUM7cUJBQzlCLGtCQUFVLENBQUMsaUJBQWlCLENBQUM7O3dDQUVWLFdBQVcsQ0FBQyxLQUFLOztTQUVoRCxDQUFDLENBQUM7WUFDTCxNQUFNO0tBQ1Q7SUFDRCxJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRWYsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUF6REQsNEJBeURDIn0=