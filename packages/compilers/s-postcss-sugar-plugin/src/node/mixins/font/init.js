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
function default_1(params = {}, atRule, processNested) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5pdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluaXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZOztBQU1kLHdEQUFTO0FBTGhELDhDQUFVLEdBQUcsRUFBRSxDQUFDO0FBT3pCLG1CQUNFLFNBQXFELEVBQUUsRUFDdkQsTUFBTSxFQUNOLGFBQWE7SUFFYixNQUFNLFdBQVcscUJBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxnQkFBZ0IsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsYUFBYSxDQUFDLENBQUM7SUFFekQsSUFBSSxDQUFDLGdCQUFnQixDQUFDLE9BQU8sRUFBRTtRQUM3QixNQUFNLElBQUksS0FBSyxDQUNiLDRIQUE0SCxDQUM3SCxDQUFDO0tBQ0g7SUFFRCxJQUFJLENBQUMsSUFBSSxDQUNQO1FBQ0UsUUFBUTtRQUNSLDhCQUE4QjtRQUM5Qiw0QkFBNEI7UUFDNUIsR0FBRztLQUNKLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUNiLENBQUM7SUFFRixNQUFNLEdBQUcsR0FBRyxhQUFhLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDO0lBQzNDLE1BQU0sQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUM7QUFDMUIsQ0FBQztBQTlCRCw0QkE4QkMifQ==