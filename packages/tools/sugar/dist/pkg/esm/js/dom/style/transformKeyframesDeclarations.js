import __parseKeyframeKey from '../../../shared/css/parse/parseKeyframeKey';
import __removeVendorPrefix from '../../../shared/css/rule/removeVendorPrefix';
import __getDefinedStyles from './getDefinedStyles';
import __camelCase from '../../../shared/string/camelCase';
function normalizePropertyName(propertyName) {
    return __camelCase(__removeVendorPrefix(propertyName));
}
export default function transformKeyframeDeclaration(keyFrameRule) {
    // Convert keyFrame.keyText to integers holding percentage of keyframe
    const percentages = __parseKeyframeKey(keyFrameRule.keyText);
    const style = __getDefinedStyles(keyFrameRule.style);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sa0JBQWtCLE1BQU0sNENBQTRDLENBQUM7QUFDNUUsT0FBTyxvQkFBb0IsTUFBTSw2Q0FBNkMsQ0FBQztBQUMvRSxPQUFPLGtCQUFrQixNQUFNLG9CQUFvQixDQUFDO0FBRXBELE9BQU8sV0FBVyxNQUFNLGtDQUFrQyxDQUFDO0FBbUMzRCxTQUFTLHFCQUFxQixDQUFDLFlBQVk7SUFDdkMsT0FBTyxXQUFXLENBQUMsb0JBQW9CLENBQUMsWUFBWSxDQUFDLENBQUMsQ0FBQztBQUMzRCxDQUFDO0FBRUQsTUFBTSxDQUFDLE9BQU8sVUFBVSw0QkFBNEIsQ0FDaEQsWUFBWTtJQUVaLHNFQUFzRTtJQUN0RSxNQUFNLFdBQVcsR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsT0FBTyxDQUFDLENBQUM7SUFDN0QsTUFBTSxLQUFLLEdBQUcsa0JBQWtCLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxDQUFDO0lBRXJELGlDQUFpQztJQUNqQyxNQUFNLGdCQUFnQixHQUFHLE1BQU0sQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLENBQUMsTUFBTSxDQUM5QyxDQUFDLE1BQU0sRUFBRSxZQUFZLEVBQUUsRUFBRTtRQUNyQixNQUFNLElBQUksR0FBRyxxQkFBcUIsQ0FBQyxZQUFZLENBQUMsQ0FBQztRQUNqRCxNQUFNLENBQUMsSUFBSSxDQUFDLEdBQUcsS0FBSyxDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ25DLE9BQU8sTUFBTSxDQUFDO0lBQ2xCLENBQUMsRUFDRCxFQUFFLENBQ0wsQ0FBQztJQUVGLE9BQU8sV0FBVyxDQUFDLEdBQUcsQ0FBQyxDQUFDLFVBQVUsRUFBRSxFQUFFO1FBQ2xDLE9BQU87WUFDSCxVQUFVO1lBQ1YsOERBQThEO1lBQzlELE1BQU0sRUFBRSxVQUFVLEdBQUcsR0FBRztZQUN4Qix3Q0FBd0M7WUFDeEMsS0FBSyxFQUFFLGdCQUFnQjtTQUMxQixDQUFDO0lBQ04sQ0FBQyxDQUFDLENBQUM7QUFDUCxDQUFDIn0=