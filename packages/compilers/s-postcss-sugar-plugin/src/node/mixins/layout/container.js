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
function default_1(params = {}, atRule, processNested) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGFpbmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29udGFpbmVyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUNyRCw4REFBd0M7QUFFeEMsTUFBTSwwQ0FBMkMsU0FBUSxxQkFBWTs7QUFRZCwrREFBUztBQVB2RCxxREFBVSxHQUFHLEVBQUUsQ0FBQztBQVN6QixtQkFDRSxTQUE0RCxFQUFFLEVBQzlELE1BQU0sRUFDTixhQUFhO0lBRWIsTUFBTSxXQUFXLG1CQUNmLEtBQUssRUFBRSxDQUFDLElBQ0wsTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYTtRQUNyQjs7R0FFRDtLQUNBLENBQUM7SUFFRixNQUFNLGVBQWUsR0FBRyxlQUFPLEVBQUUsQ0FBQyxNQUFNLENBQUMsa0JBQWtCLENBQUMsQ0FBQztJQUM3RCxNQUFNLENBQUMsSUFBSSxDQUFDLGVBQWUsQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzNDLElBQUksQ0FBQyxJQUFJLENBQUMsR0FBRyxHQUFHLEtBQUssZUFBZSxDQUFDLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUNoRCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBdkJELDRCQXVCQyJ9