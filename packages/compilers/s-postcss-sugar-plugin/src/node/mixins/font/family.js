"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.interface = void 0;
const s_interface_1 = __importDefault(require("@coffeekraken/s-interface"));
const theme_1 = __importDefault(require("../../utils/theme"));
class postcssSugarPluginFontFamilyInterface extends s_interface_1.default {
}
exports.interface = postcssSugarPluginFontFamilyInterface;
postcssSugarPluginFontFamilyInterface.definition = {
    font: {
        type: 'String',
        values: Object.keys(theme_1.default().config('font.family')),
        required: true
    }
};
function default_1(params = {}, atRule, processNested) {
    const finalParams = Object.assign({ font: 'default' }, params);
    const vars = [];
    const fontFamilyObj = theme_1.default().config(`font.family.${finalParams.font}`);
    Object.keys(fontFamilyObj).forEach((prop) => {
        switch (prop) {
            case 'font-family':
            case 'font-weight':
            case 'font-style':
                vars.push(`${prop}: var(--s-theme-font-family-${finalParams.font}-${prop}, ${fontFamilyObj[prop]});`);
                break;
            default:
                break;
        }
    });
    const AST = processNested(vars.join('\n'));
    atRule.replaceWith(AST);
}
exports.default = default_1;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFtaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCw4REFBd0M7QUFFeEMsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTs7QUFjZCwwREFBUztBQWJsRCxnREFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBU0osbUJBQ0UsU0FBdUQsRUFBRSxFQUN6RCxNQUFNLEVBQ04sYUFBYTtJQUViLE1BQU0sV0FBVyxtQkFDZixJQUFJLEVBQUUsU0FBUyxJQUNaLE1BQU0sQ0FDVixDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQWEsRUFBRSxDQUFDO0lBRTFCLE1BQU0sYUFBYSxHQUFHLGVBQU8sRUFBRSxDQUFDLE1BQU0sQ0FBQyxlQUFlLFdBQVcsQ0FBQyxJQUFJLEVBQUUsQ0FBQyxDQUFDO0lBRTFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDMUMsUUFBUSxJQUFJLEVBQUU7WUFDWixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLGFBQWEsQ0FBQztZQUNuQixLQUFLLFlBQVk7Z0JBQ2YsSUFBSSxDQUFDLElBQUksQ0FDUCxHQUFHLElBQUksK0JBQStCLFdBQVcsQ0FBQyxJQUFJLElBQUksSUFBSSxLQUFLLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUMzRixDQUFDO2dCQUNGLE1BQU07WUFDUjtnQkFDRSxNQUFNO1NBQ1Q7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILE1BQU0sR0FBRyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUM7SUFDM0MsTUFBTSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQztBQUMxQixDQUFDO0FBOUJELDRCQThCQyJ9