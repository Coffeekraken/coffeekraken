import { __parseKeyframeKey, __removeVendorPrefix, } from '@coffeekraken/sugar/css';
import { __getDefinedStyles } from '@coffeekraken/sugar/dom';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sRUFDSCxrQkFBa0IsRUFDbEIsb0JBQW9CLEdBQ3ZCLE1BQU0seUJBQXlCLENBQUM7QUFDakMsT0FBTyxFQUFFLGtCQUFrQixFQUFFLE1BQU0seUJBQXlCLENBQUM7QUFDN0QsT0FBTyxXQUFXLE1BQU0sa0NBQWtDLENBQUM7QUFtQzNELFNBQVMscUJBQXFCLENBQUMsWUFBWTtJQUN2QyxPQUFPLFdBQVcsQ0FBQyxvQkFBb0IsQ0FBQyxZQUFZLENBQUMsQ0FBQyxDQUFDO0FBQzNELENBQUM7QUFFRCxNQUFNLENBQUMsT0FBTyxVQUFVLDRCQUE0QixDQUNoRCxZQUFZO0lBRVosc0VBQXNFO0lBQ3RFLE1BQU0sV0FBVyxHQUFHLGtCQUFrQixDQUFDLFlBQVksQ0FBQyxPQUFPLENBQUMsQ0FBQztJQUM3RCxNQUFNLEtBQUssR0FBRyxrQkFBa0IsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLENBQUM7SUFFckQsaUNBQWlDO0lBQ2pDLE1BQU0sZ0JBQWdCLEdBQUcsTUFBTSxDQUFDLElBQUksQ0FBQyxLQUFLLENBQUMsQ0FBQyxNQUFNLENBQzlDLENBQUMsTUFBTSxFQUFFLFlBQVksRUFBRSxFQUFFO1FBQ3JCLE1BQU0sSUFBSSxHQUFHLHFCQUFxQixDQUFDLFlBQVksQ0FBQyxDQUFDO1FBQ2pELE1BQU0sQ0FBQyxJQUFJLENBQUMsR0FBRyxLQUFLLENBQUMsWUFBWSxDQUFDLENBQUM7UUFDbkMsT0FBTyxNQUFNLENBQUM7SUFDbEIsQ0FBQyxFQUNELEVBQUUsQ0FDTCxDQUFDO0lBRUYsT0FBTyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsVUFBVSxFQUFFLEVBQUU7UUFDbEMsT0FBTztZQUNILFVBQVU7WUFDViw4REFBOEQ7WUFDOUQsTUFBTSxFQUFFLFVBQVUsR0FBRyxHQUFHO1lBQ3hCLHdDQUF3QztZQUN4QyxLQUFLLEVBQUUsZ0JBQWdCO1NBQzFCLENBQUM7SUFDTixDQUFDLENBQUMsQ0FBQztBQUNQLENBQUMifQ==