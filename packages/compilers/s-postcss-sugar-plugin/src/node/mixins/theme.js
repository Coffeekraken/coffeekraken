"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const sugar_1 = __importDefault(require("@coffeekraken/sugar/shared/config/sugar"));
const flatten_1 = __importDefault(require("@coffeekraken/sugar/shared/object/flatten"));
const postcss_1 = __importDefault(require("postcss"));
class postcssSugarPluginThemeinInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginThemeinInterface;
postcssSugarPluginThemeinInterface.definition = {
    name: {
        type: 'String',
        required: true,
        default: 'default',
        alias: 'n'
    }
};
function default_1(params = {}, atRule) {
    const theme = sugar_1.default('theme');
    if (!theme[params.name])
        throw new Error(`Sorry but the requested theme "<yellow>${params.name}</yellow>" does not exists...`);
    const flattenedTheme = flatten_1.default(theme[params.name]);
    const vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
        vars.push(`--s-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
    });
    const AST = postcss_1.default.parse(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsb0ZBQW9FO0FBQ3BFLHdGQUFrRTtBQUNsRSxzREFBZ0M7QUFHaEMsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTs7QUFXZCx1REFBUztBQVYvQyw2Q0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQUtKLG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU07SUFDMUMsTUFBTSxLQUFLLEdBQUcsZUFBYSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQ3JDLElBQUksQ0FBQyxLQUFLLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQztRQUNyQixNQUFNLElBQUksS0FBSyxDQUNiLDBDQUEwQyxNQUFNLENBQUMsSUFBSSwrQkFBK0IsQ0FDckYsQ0FBQztJQUVKLE1BQU0sY0FBYyxHQUFHLGlCQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQ3JELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQUMsT0FBTyxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sRUFBRSxHQUFHLENBQUMsS0FBSyxjQUFjLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3hFLENBQUMsQ0FBQyxDQUFDO0lBQ0gsTUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWZELDRCQWVDIn0=