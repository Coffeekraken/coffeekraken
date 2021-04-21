"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const default_1 = __importDefault(require("../../../functions/color/default"));
const padding_1 = __importDefault(require("../../../functions/size/padding"));
const s_postcss_compiler_1 = __importDefault(require("@coffeekraken/s-postcss-compiler"));
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
    },
    scope: {
        type: 'String',
        values: ['*', 'generic', 'color', 'size', 'lnf', 'hover'],
        default: '*'
    }
};
function default_2(params = {}, atRule) {
    const finalParams = Object.assign({ color: 'default', textColor: '', size: 'default', scope: '*' }, params);
    const color = default_1.default({
        name: finalParams.color
    });
    let textColor;
    if (finalParams.textColor) {
        textColor = default_1.default({
            name: finalParams.textColor
        });
    }
    else {
        textColor = default_1.default({
            name: `${finalParams.color}${finalParams.color.match(/\-\-i$/) ? '' : '--i'}`
        });
    }
    const vars = [];
    if (finalParams.scope === '*' || finalParams.scope === 'generic') {
        vars.push(`
      display: inline-block;
    `);
    }
    if (finalParams.scope === '*' || finalParams.scope === 'color') {
        vars.push(`background-color: ${color.toString()};`);
        vars.push(`color: ${textColor.toString()};`);
        vars.push(`&:hover {
      background-color: ${textColor};
      color: ${color};
    }`);
    }
    if (finalParams.scope === '*' || finalParams.scope === 'size') {
        vars.push(`padding: ${padding_1.default({
            name: finalParams.size
        })};`);
    }
    if (atRule) {
        const AST = s_postcss_compiler_1.default.postcss().process(vars.join('\n'));
        atRule.replaceWith(AST);
    }
    else {
        return vars.join('\n');
    }
}
exports.default = default_2;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBS3JELCtFQUF1RDtBQUV2RCw4RUFBd0Q7QUFDeEQsMEZBQWtFO0FBRWxFLE1BQU0sbUNBQW9DLFNBQVEscUJBQVk7O0FBZ0NkLHdEQUFTO0FBL0JoRCw4Q0FBVSxHQUFHO0lBQ2xCLEtBQUssRUFBRTtRQUNMLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsU0FBUyxFQUFFO1FBQ1QsSUFBSSxFQUFFLFFBQVE7UUFDZCxLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0lBQ0QsS0FBSyxFQUFFO1FBQ0wsSUFBSSxFQUFFLFFBQVE7UUFDZCxNQUFNLEVBQUUsQ0FBQyxHQUFHLEVBQUUsU0FBUyxFQUFFLE9BQU8sRUFBRSxNQUFNLEVBQUUsS0FBSyxFQUFFLE9BQU8sQ0FBQztRQUN6RCxPQUFPLEVBQUUsR0FBRztLQUNiO0NBQ0YsQ0FBQztBQVlKLG1CQUNFLFNBQXFELEVBQUUsRUFDdkQsTUFBTztJQUVQLE1BQU0sV0FBVyxtQkFDZixLQUFLLEVBQUUsU0FBUyxFQUNoQixTQUFTLEVBQUUsRUFBRSxFQUNiLElBQUksRUFBRSxTQUFTLEVBQ2YsS0FBSyxFQUFFLEdBQUcsSUFDUCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLGlCQUFPLENBQUM7UUFDcEIsSUFBSSxFQUFFLFdBQVcsQ0FBQyxLQUFLO0tBQ3hCLENBQUMsQ0FBQztJQUNILElBQUksU0FBUyxDQUFDO0lBQ2QsSUFBSSxXQUFXLENBQUMsU0FBUyxFQUFFO1FBQ3pCLFNBQVMsR0FBRyxpQkFBTyxDQUFDO1lBQ2xCLElBQUksRUFBRSxXQUFXLENBQUMsU0FBUztTQUM1QixDQUFDLENBQUM7S0FDSjtTQUFNO1FBQ0wsU0FBUyxHQUFHLGlCQUFPLENBQUM7WUFDbEIsSUFBSSxFQUFFLEdBQUcsV0FBVyxDQUFDLEtBQUssR0FDeEIsV0FBVyxDQUFDLEtBQUssQ0FBQyxLQUFLLENBQUMsUUFBUSxDQUFDLENBQUMsQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsS0FDM0MsRUFBRTtTQUNILENBQUMsQ0FBQztLQUNKO0lBRUQsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxTQUFTLEVBQUU7UUFDaEUsSUFBSSxDQUFDLElBQUksQ0FBQzs7S0FFVCxDQUFDLENBQUM7S0FDSjtJQUVELElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxHQUFHLElBQUksV0FBVyxDQUFDLEtBQUssS0FBSyxPQUFPLEVBQUU7UUFDOUQsSUFBSSxDQUFDLElBQUksQ0FBQyxxQkFBcUIsS0FBSyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUNwRCxJQUFJLENBQUMsSUFBSSxDQUFDLFVBQVUsU0FBUyxDQUFDLFFBQVEsRUFBRSxHQUFHLENBQUMsQ0FBQztRQUM3QyxJQUFJLENBQUMsSUFBSSxDQUFDOzBCQUNZLFNBQVM7ZUFDcEIsS0FBSztNQUNkLENBQUMsQ0FBQztLQUNMO0lBQ0QsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLEdBQUcsSUFBSSxXQUFXLENBQUMsS0FBSyxLQUFLLE1BQU0sRUFBRTtRQUM3RCxJQUFJLENBQUMsSUFBSSxDQUNQLFlBQVksaUJBQVMsQ0FBQztZQUNwQixJQUFJLEVBQUUsV0FBVyxDQUFDLElBQUk7U0FDdkIsQ0FBQyxHQUFHLENBQ04sQ0FBQztLQUNIO0lBRUQsSUFBSSxNQUFNLEVBQUU7UUFDVixNQUFNLEdBQUcsR0FBRyw0QkFBa0IsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO1FBQ2xFLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDekI7U0FBTTtRQUNMLE9BQU8sSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztLQUN4QjtBQUNILENBQUM7QUExREQsNEJBMERDIn0=