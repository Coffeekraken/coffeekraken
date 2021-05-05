"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginFontInitInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginFontInitInterface;
postcssSugarPluginFontInitInterface.definition = {};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({}, params);
    const vars = [];
    const fontsFamiliesObj = theme_1.default().config('font.family');
    if (!fontsFamiliesObj.default) {
        throw new Error(`<red>[postcss.sugar.font.init]</red> Sorry but your theme does not provide any "<yellow>font.family.default</yellow>" font`);
    }
    vars.push([
        'html {',
        `@sugar.font.family(default);`,
        '@sugar.font.size(default);',
        '}'
    ].join('\n'));
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZOztBQU1kLHdEQUFTO0FBTGhELDhDQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUF5QixFQUN2QixNQUFNLEVBQ04sTUFBTSxFQUNOLGFBQWEsRUFLZDtJQUNDLE1BQU0sV0FBVyxxQkFDWixNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhLEVBQUUsQ0FBQztJQUUxQixNQUFNLGdCQUFnQixHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQztJQUV6RCxJQUFJLENBQUMsZ0JBQWdCLENBQUMsT0FBTyxFQUFFO1FBQzdCLE1BQU0sSUFBSSxLQUFLLENBQ2IsNEhBQTRILENBQzdILENBQUM7S0FDSDtJQUVELElBQUksQ0FBQyxJQUFJLENBQ1A7UUFDRSxRQUFRO1FBQ1IsOEJBQThCO1FBQzlCLDRCQUE0QjtRQUM1QixHQUFHO0tBQ0osQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQ2IsQ0FBQztJQUVGLE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBbENELDRCQWtDQyJ9