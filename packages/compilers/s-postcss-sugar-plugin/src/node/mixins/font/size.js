"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginFontSizeInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginFontSizeInterface;
postcssSugarPluginFontSizeInterface.definition = {
    size: {
        type: 'String|Number',
        values: Object.keys(theme_1.default().config('font.size')),
        required: true
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ size: 50 }, params);
    const vars = [];
    vars.push(`font-size: sugar.font.size(${finalParams.size})`);
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2l6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInNpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQUEsNEVBQXFEO0FBQ3JELDhEQUF3QztBQUV4QyxNQUFNLG1DQUFvQyxTQUFRLHFCQUFZOztBQWNkLHdEQUFTO0FBYmhELDhDQUFVLEdBQUc7SUFDbEIsSUFBSSxFQUFFO1FBQ0osSUFBSSxFQUFFLGVBQWU7UUFDckIsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQyxDQUFDO1FBQ2xELFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBU0osbUJBQ0UsU0FBdUQsRUFBRSxFQUN6RCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsRUFBRSxJQUNMLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBQzFCLElBQUksQ0FBQyxJQUFJLENBQUMsOEJBQThCLFdBQVcsQ0FBQyxJQUFJLEdBQUcsQ0FBQyxDQUFDO0lBRTdELE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBZkQsNEJBZUMifQ==