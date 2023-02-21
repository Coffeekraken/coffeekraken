"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const css_1 = require("@coffeekraken/sugar/css");
const dom_1 = require("@coffeekraken/sugar/dom");
const camelCase_1 = __importDefault(require("../../../shared/string/camelCase"));
function normalizePropertyName(propertyName) {
    return (0, camelCase_1.default)((0, css_1.__removeVendorPrefix)(propertyName));
}
function transformKeyframeDeclaration(keyFrameRule) {
    // Convert keyFrame.keyText to integers holding percentage of keyframe
    const percentages = (0, css_1.__parseKeyframeKey)(keyFrameRule.keyText);
    const style = (0, dom_1.__getDefinedStyles)(keyFrameRule.style);
    // Normalize to unprefixed styles
    const normalizedStyles = Object.keys(style).reduce((result, propertyName) => {
        const name = normalizePropertyName(propertyName);
        result[name] = style[propertyName];
        return result;
    }, {});
    return percentages.map((percentage) => {
        return {
            percentage,
            // Convert percentage to fraction of 1 for webanimation compat
            offset: percentage / 100,
            // Mixin with extracted keyframe styling
            rules: normalizedStyles,
        };
    });
}
exports.default = transformKeyframeDeclaration;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaURBR2lDO0FBQ2pDLGlEQUE2RDtBQUM3RCxpRkFBMkQ7QUFpQzNELFNBQVMscUJBQXFCLENBQUMsWUFBWTtJQUN2QyxPQUFPLElBQUEsbUJBQVcsRUFBQyxJQUFBLDBCQUFvQixFQUFDLFlBQVksQ0FBQyxDQUFDLENBQUM7QUFDM0QsQ0FBQztBQUVELFNBQXdCLDRCQUE0QixDQUNoRCxZQUFZO0lBRVosc0VBQXNFO0lBQ3RFLE1BQU0sV0FBVyxHQUFHLElBQUEsd0JBQWtCLEVBQUMsWUFBWSxDQUFDLE9BQU8sQ0FBQyxDQUFDO0lBQzdELE1BQU0sS0FBSyxHQUFHLElBQUEsd0JBQWtCLEVBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJELGlDQUFpQztJQUNqQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUM5QyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRTtRQUNyQixNQUFNLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUMsRUFDRCxFQUFFLENBQ0wsQ0FBQztJQUVGLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ2xDLE9BQU87WUFDSCxVQUFVO1lBQ1YsOERBQThEO1lBQzlELE1BQU0sRUFBRSxVQUFVLEdBQUcsR0FBRztZQUN4Qix3Q0FBd0M7WUFDeEMsS0FBSyxFQUFFLGdCQUFnQjtTQUMxQixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDO0FBMUJELCtDQTBCQyJ9