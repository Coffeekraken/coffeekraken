"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
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
    size: {
        type: 'String',
        default: 'default',
        alias: 's'
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ color: 'default', textColor: '', size: 'default' }, params);
    const vars = [];
    if (isInScope_1.default('bare')) {
        vars.push(`
      display: inline-block;
    `);
    }
    if (isInScope_1.default('lnf')) {
        vars.push(`background-color: sugar.color(${finalParams.color});`);
        vars.push(`color: sugar.color(${finalParams.textColor
            ? finalParams.textColor
            : `${finalParams.color}--i`});`);
        vars.push(`border-radius: ${themeVar_1.default('ui.button.borderRadius')};`);
        vars.push(`
      &:hover {
        background-color: sugar.color(${finalParams.textColor
            ? finalParams.textColor
            : `${finalParams.color}--i`});
        color: sugar.color(${finalParams.color});
      }
    `);
    }
    if (isInScope_1.default('size')) {
        vars.push(`padding: ${themeVar_1.default('ui.button.padding')};`);
        vars.push(`font-size: sugar.font.size(${finalParams.size});`);
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnV0dG9uLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYnV0dG9uLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCx1RUFBaUQ7QUFDakQseUVBQW1EO0FBRW5ELE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7O0FBMEJkLHdEQUFTO0FBekJoRCw4Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQVdKLG1CQUNFLFNBQXFELEVBQUUsRUFDdkQsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLFNBQVMsRUFDaEIsU0FBUyxFQUFFLEVBQUUsRUFDYixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksbUJBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDOztLQUVULENBQUMsQ0FBQztLQUNKO0lBRUQsSUFBSSxtQkFBVyxDQUFDLEtBQUssQ0FBQyxFQUFFO1FBQ3RCLElBQUksQ0FBQyxJQUFJLENBQUMsaUNBQWlDLFdBQVcsQ0FBQyxLQUFLLElBQUksQ0FBQyxDQUFDO1FBQ2xFLElBQUksQ0FBQyxJQUFJLENBQ1Asc0JBQ0UsV0FBVyxDQUFDLFNBQVM7WUFDbkIsQ0FBQyxDQUFDLFdBQVcsQ0FBQyxTQUFTO1lBQ3ZCLENBQUMsQ0FBQyxHQUFHLFdBQVcsQ0FBQyxLQUFLLEtBQzFCLElBQUksQ0FDTCxDQUFDO1FBQ0YsSUFBSSxDQUFDLElBQUksQ0FBQyxrQkFBa0Isa0JBQVUsQ0FBQyx3QkFBd0IsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVyRSxJQUFJLENBQUMsSUFBSSxDQUFDOzt3Q0FHSixXQUFXLENBQUMsU0FBUztZQUNuQixDQUFDLENBQUMsV0FBVyxDQUFDLFNBQVM7WUFDdkIsQ0FBQyxDQUFDLEdBQUcsV0FBVyxDQUFDLEtBQUssS0FDMUI7NkJBQ3FCLFdBQVcsQ0FBQyxLQUFLOztLQUV6QyxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksbUJBQVcsQ0FBQyxNQUFNLENBQUMsRUFBRTtRQUN2QixJQUFJLENBQUMsSUFBSSxDQUFDLFlBQVksa0JBQVUsQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUMxRCxJQUFJLENBQUMsSUFBSSxDQUFDLDhCQUE4QixXQUFXLENBQUMsSUFBSSxJQUFJLENBQUMsQ0FBQztLQUMvRDtJQUVELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBbERELDRCQWtEQyJ9