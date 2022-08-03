"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const camelCase_1 = __importDefault(require("../../../shared/string/camelCase"));
const getDefinedStyles_1 = __importDefault(require("./getDefinedStyles"));
const parseKeyframeKey_1 = __importDefault(require("./parseKeyframeKey"));
const removeVendorPrefix_1 = __importDefault(require("./removeVendorPrefix"));
function normalizePropertyName(propertyName) {
    return (0, camelCase_1.default)((0, removeVendorPrefix_1.default)(propertyName));
}
function transformKeyframeDeclaration(keyFrameRule) {
    // Convert keyFrame.keyText to integers holding percentage of keyframe
    const percentages = (0, parseKeyframeKey_1.default)(keyFrameRule.keyText);
    const style = (0, getDefinedStyles_1.default)(keyFrameRule.style);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsaUZBQTJEO0FBQzNELDBFQUFvRDtBQUNwRCwwRUFBb0Q7QUFDcEQsOEVBQXdEO0FBaUN4RCxTQUFTLHFCQUFxQixDQUFDLFlBQVk7SUFDdkMsT0FBTyxJQUFBLG1CQUFXLEVBQUMsSUFBQSw0QkFBb0IsRUFBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxTQUF3Qiw0QkFBNEIsQ0FDaEQsWUFBWTtJQUVaLHNFQUFzRTtJQUN0RSxNQUFNLFdBQVcsR0FBRyxJQUFBLDBCQUFrQixFQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxNQUFNLEtBQUssR0FBRyxJQUFBLDBCQUFrQixFQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsQ0FBQztJQUVyRCxpQ0FBaUM7SUFDakMsTUFBTSxnQkFBZ0IsR0FBRyxNQUFNLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDLE1BQU0sQ0FDOUMsQ0FBQyxNQUFNLEVBQUUsWUFBWSxFQUFFLEVBQUU7UUFDckIsTUFBTSxJQUFJLEdBQUcscUJBQXFCLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDakQsTUFBTSxDQUFDLElBQUksQ0FBQyxHQUFHLEtBQUssQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNuQyxPQUFPLE1BQU0sQ0FBQztJQUNsQixDQUFDLEVBQ0QsRUFBRSxDQUNMLENBQUM7SUFFRixPQUFPLFdBQVcsQ0FBQyxHQUFHLENBQUMsQ0FBQyxVQUFVLEVBQUUsRUFBRTtRQUNsQyxPQUFPO1lBQ0gsVUFBVTtZQUNWLDhEQUE4RDtZQUM5RCxNQUFNLEVBQUUsVUFBVSxHQUFHLEdBQUc7WUFDeEIsd0NBQXdDO1lBQ3hDLEtBQUssRUFBRSxnQkFBZ0I7U0FDMUIsQ0FBQztJQUNOLENBQUMsQ0FBQyxDQUFDO0FBQ1AsQ0FBQztBQTFCRCwrQ0EwQkMifQ==