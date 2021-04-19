"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
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
    const theme = s_sugar_config_1.default('theme');
    if (!theme[params.name])
        throw new Error(`Sorry but the requested theme "<yellow>${params.name}</yellow>" does not exists...`);
    const flattenedTheme = flatten_1.default(theme[params.name]);
    const vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
        vars.push(`--s-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
    });
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = postcss_1.default.parse(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsa0ZBQXlEO0FBQ3pELHdGQUFrRTtBQUNsRSxzREFBZ0M7QUFHaEMsTUFBTSxrQ0FBbUMsU0FBUSxxQkFBWTs7QUFXZCx1REFBUztBQVYvQyw2Q0FBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsUUFBUSxFQUFFLElBQUk7UUFDZCxPQUFPLEVBQUUsU0FBUztRQUNsQixLQUFLLEVBQUUsR0FBRztLQUNYO0NBQ0YsQ0FBQztBQUtKLG1CQUF5QixNQUFNLEdBQUcsRUFBRSxFQUFFLE1BQU07SUFDMUMsTUFBTSxLQUFLLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUM7UUFDckIsTUFBTSxJQUFJLEtBQUssQ0FDYiwwQ0FBMEMsTUFBTSxDQUFDLElBQUksK0JBQStCLENBQ3JGLENBQUM7SUFFSixNQUFNLGNBQWMsR0FBRyxpQkFBUyxDQUFDLEtBQUssQ0FBQyxNQUFNLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNyRCxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLE9BQU8sR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN4RSxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQjtJQUVELE1BQU0sR0FBRyxHQUFHLGlCQUFTLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUU3QyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFyQkQsNEJBcUJDIn0=