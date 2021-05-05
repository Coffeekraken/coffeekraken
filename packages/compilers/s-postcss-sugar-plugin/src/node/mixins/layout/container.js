"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginLayoutContainerInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginLayoutContainerInterface;
postcssSugarPluginLayoutContainerInterface.definition = {};
function default_1({ params, atRule, processNested }) {
    const finalParams = Object.assign({ ratio: 1 }, params);
    const vars = [
        `
    margin: auto;
  `
    ];
    const containerConfig = theme_1.default().config('layout.container');
    Object.keys(containerConfig).forEach((key) => {
        vars.push(`${key}: ${containerConfig[key]};`);
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCw4REFBd0M7QUFFeEMsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTs7QUFRZCwrREFBUztBQVB2RCxxREFBVSxHQUFHLEVBQUUsQ0FBQztBQVN6QixtQkFBeUIsRUFDdkIsTUFBTSxFQUNOLE1BQU0sRUFDTixhQUFhLEVBS2Q7SUFDQyxNQUFNLFdBQVcsbUJBQ2YsS0FBSyxFQUFFLENBQUMsSUFDTCxNQUFNLENBQ1YsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFhO1FBQ3JCOztHQUVEO0tBQ0EsQ0FBQztJQUVGLE1BQU0sZUFBZSxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxrQkFBa0IsQ0FBQyxDQUFDO0lBQzdELE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBZSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDM0MsSUFBSSxDQUFDLElBQUksQ0FBQyxHQUFHLEdBQUcsS0FBSyxlQUFlLENBQUMsR0FBRyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ2hELENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUEzQkQsNEJBMkJDIn0=