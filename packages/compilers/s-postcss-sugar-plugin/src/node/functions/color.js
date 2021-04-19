"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
class postcssSugarPluginColorInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginColorInterface;
postcssSugarPluginColorInterface.definition = {
    name: {
        type: 'String',
        required: true,
        alias: 'n'
    },
    modifier: {
        type: 'String',
        alias: 'm'
    }
};
function default_1(params = {}) {
    const theme = s_sugar_config_1.default('theme');
    if (!theme.default.colors[params.name])
        throw new Error(`Sorry but the requested color "<yellow>${params.name}</yellow>" does not exists...`);
    let colorVar = `--s-colors-${params.name}`;
    if (params.modifier)
        colorVar += `-${params.modifier}`;
    else
        colorVar += '-default';
    return `var(${colorVar}, ${theme.default.colors[params.name].default})`;
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJjb2xvci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsa0ZBQXlEO0FBS3pELE1BQU0sZ0NBQWlDLFNBQVEscUJBQVk7O0FBYWQscURBQVM7QUFaN0MsMkNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtJQUNELFFBQVEsRUFBRTtRQUNSLElBQUksRUFBRSxRQUFRO1FBQ2QsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFTSixtQkFBeUIsU0FBa0QsRUFBRTtJQUMzRSxNQUFNLEtBQUssR0FBRyx3QkFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDO1FBQ3BDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLE1BQU0sQ0FBQyxJQUFJLCtCQUErQixDQUNyRixDQUFDO0lBRUosSUFBSSxRQUFRLEdBQUcsY0FBYyxNQUFNLENBQUMsSUFBSSxFQUFFLENBQUM7SUFDM0MsSUFBSSxNQUFNLENBQUMsUUFBUTtRQUFFLFFBQVEsSUFBSSxJQUFJLE1BQU0sQ0FBQyxRQUFRLEVBQUUsQ0FBQzs7UUFDbEQsUUFBUSxJQUFJLFVBQVUsQ0FBQztJQUU1QixPQUFPLE9BQU8sUUFBUSxLQUFLLEtBQUssQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLEdBQUcsQ0FBQztBQUMxRSxDQUFDO0FBWkQsNEJBWUMifQ==