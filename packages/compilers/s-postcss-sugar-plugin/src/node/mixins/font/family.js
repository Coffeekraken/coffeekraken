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
function default_1({ params, atRule, processNested }) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmFtaWx5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZmFtaWx5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLDRFQUFxRDtBQUVyRCw4REFBd0M7QUFFeEMsTUFBTSxxQ0FBc0MsU0FBUSxxQkFBWTs7QUFjZCwwREFBUztBQWJsRCxnREFBVSxHQUFHO0lBQ2xCLElBQUksRUFBRTtRQUNKLElBQUksRUFBRSxRQUFRO1FBQ2QsTUFBTSxFQUFFLE1BQU0sQ0FBQyxJQUFJLENBQUMsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGFBQWEsQ0FBQyxDQUFDO1FBQ3BELFFBQVEsRUFBRSxJQUFJO0tBQ2Y7Q0FDRixDQUFDO0FBU0osbUJBQXlCLEVBQ3ZCLE1BQU0sRUFDTixNQUFNLEVBQ04sYUFBYSxFQUtkO0lBQ0MsTUFBTSxXQUFXLG1CQUNmLElBQUksRUFBRSxTQUFTLElBQ1osTUFBTSxDQUNWLENBQUM7SUFFRixNQUFNLElBQUksR0FBYSxFQUFFLENBQUM7SUFFMUIsTUFBTSxhQUFhLEdBQUcsZUFBTyxFQUFFLENBQUMsTUFBTSxDQUFDLGVBQWUsV0FBVyxDQUFDLElBQUksRUFBRSxDQUFDLENBQUM7SUFFMUUsTUFBTSxDQUFDLElBQUksQ0FBQyxhQUFhLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMxQyxRQUFRLElBQUksRUFBRTtZQUNaLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssYUFBYSxDQUFDO1lBQ25CLEtBQUssWUFBWTtnQkFDZixJQUFJLENBQUMsSUFBSSxDQUNQLEdBQUcsSUFBSSwrQkFBK0IsV0FBVyxDQUFDLElBQUksSUFBSSxJQUFJLEtBQUssYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQzNGLENBQUM7Z0JBQ0YsTUFBTTtZQUNSO2dCQUNFLE1BQU07U0FDVDtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsTUFBTSxHQUFHLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQztJQUMzQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0FBQzFCLENBQUM7QUFsQ0QsNEJBa0NDIn0=