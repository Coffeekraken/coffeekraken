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
    const finalParams = Object.assign({ name: '' }, params);
    const theme = s_sugar_config_1.default('theme');
    if (!theme[finalParams.name])
        throw new Error(`Sorry but the requested theme "<yellow>${finalParams.name}</yellow>" does not exists...`);
    // @ts-ignore
    const flattenedTheme = flatten_1.default(theme[finalParams.name]);
    const vars = [];
    Object.keys(flattenedTheme).forEach((key) => {
        vars.push(`--s-theme-${finalParams.name}-${key.replace(/\./gm, '-')}: ${flattenedTheme[key]};`);
    });
    if (atRule.parent.type === 'root') {
        vars.unshift(':root {');
        vars.push('}');
    }
    const AST = postcss_1.default.parse(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVmYXVsdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZmF1bHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELGtGQUF5RDtBQUN6RCx3RkFBa0U7QUFDbEUsc0RBQWdDO0FBR2hDLE1BQU0sa0NBQW1DLFNBQVEscUJBQVk7O0FBZWQsdURBQVM7QUFkL0MsNkNBQVUsR0FBRztJQUNsQixJQUFJLEVBQUU7UUFDSixJQUFJLEVBQUUsUUFBUTtRQUNkLFFBQVEsRUFBRSxJQUFJO1FBQ2QsT0FBTyxFQUFFLFNBQVM7UUFDbEIsS0FBSyxFQUFFLEdBQUc7S0FDWDtDQUNGLENBQUM7QUFTSixtQkFDRSxTQUFrRCxFQUFFLEVBQ3BELE1BQU07SUFFTixNQUFNLFdBQVcsbUJBQ2YsSUFBSSxFQUFFLEVBQUUsSUFDTCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sS0FBSyxHQUFHLHdCQUFhLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDckMsSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUMsSUFBSSxDQUFDO1FBQzFCLE1BQU0sSUFBSSxLQUFLLENBQ2IsMENBQTBDLFdBQVcsQ0FBQyxJQUFJLCtCQUErQixDQUMxRixDQUFDO0lBRUosYUFBYTtJQUNiLE1BQU0sY0FBYyxHQUFHLGlCQUFTLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzFELE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUMxQixNQUFNLENBQUMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzFDLElBQUksQ0FBQyxJQUFJLENBQ1AsYUFBYSxXQUFXLENBQUMsSUFBSSxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxFQUFFLEdBQUcsQ0FBQyxLQUN2RCxjQUFjLENBQUMsR0FBRyxDQUNwQixHQUFHLENBQ0osQ0FBQztJQUNKLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksS0FBSyxNQUFNLEVBQUU7UUFDakMsSUFBSSxDQUFDLE9BQU8sQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUN4QixJQUFJLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0tBQ2hCO0lBRUQsTUFBTSxHQUFHLEdBQUcsaUJBQVMsQ0FBQyxLQUFLLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBRTdDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQWxDRCw0QkFrQ0MifQ==