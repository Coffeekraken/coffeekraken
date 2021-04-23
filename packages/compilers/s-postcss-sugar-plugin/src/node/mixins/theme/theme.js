"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const s_sugar_config_1 = __importDefault(require("@coffeekraken/s-sugar-config"));
const flatten_1 = __importDefault(require("@coffeekraken/sugar/shared/object/flatten"));
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
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ name: '' }, params);
    const theme = s_sugar_config_1.default('theme');
    if (!theme.themes[finalParams.name])
        throw new Error(`Sorry but the requested theme "<yellow>${finalParams.name}</yellow>" does not exists...`);
    // @ts-ignore
    const flattenedTheme = flatten_1.default(theme.themes[finalParams.name]);
    const vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
        vars.push(`--s-theme-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
    });
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGhlbWUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJ0aGVtZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBQSw0RUFBcUQ7QUFDckQsa0ZBQXlEO0FBQ3pELHdGQUFrRTtBQUVsRSxNQUFNLGtDQUFtQyxTQUFRLHFCQUFZOztBQWVkLHVEQUFTO0FBZC9DLDZDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLFFBQVE7UUFDZCxRQUFRLEVBQUUsSUFBSTtRQUNkLE9BQU8sRUFBRSxTQUFTO1FBQ2xCLEtBQUssRUFBRSxHQUFHO0tBQ1g7Q0FDRixDQUFDO0FBU0osbUJBQ0UsU0FBa0QsRUFBRSxFQUNwRCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsRUFBRSxJQUNMLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxLQUFLLEdBQUcsd0JBQWEsQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUNyQyxJQUFJLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQ2pDLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLFdBQVcsQ0FBQyxJQUFJLCtCQUErQixDQUMxRixDQUFDO0lBRUosYUFBYTtJQUNiLE1BQU0sY0FBYyxHQUFHLGlCQUFTLENBQUMsS0FBSyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUNqRSxNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFDMUIsTUFBTSxDQUFDLElBQUksQ0FBQyxjQUFjLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMxQyxJQUFJLENBQUMsSUFBSSxDQUFDLGFBQWEsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLEVBQUUsR0FBRyxDQUFDLEtBQUssY0FBYyxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUM5RSxDQUFDLENBQUMsQ0FBQztJQUVILElBQUksTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTSxFQUFFO1FBQ2pDLElBQUksQ0FBQyxPQUFPLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztLQUNoQjtJQUVELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBOUJELDRCQThCQyJ9