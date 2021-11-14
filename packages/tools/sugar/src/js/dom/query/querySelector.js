// @ts-nocheck
import __isVisible from './isVisible';
import __isInViewport from './isInViewport';
import __closestNotVisible from './closestNotVisible';
function querySelector(selector, settings = {}) {
    // extend settings
    settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // grab the element into the dom
    const elm = settings.rootNode.querySelector(selector);
    // if no element, stop here
    if (!elm)
        return null;
    // check settings
    if (settings.visible === false) {
        if (__isVisible(elm) || __closestNotVisible(elm))
            return null;
    }
    else if (settings.visible === true) {
        if (!__isVisible(elm) || !__closestNotVisible(elm))
            return null;
    }
    if (settings.inViewport === false) {
        if (__isInViewport(elm))
            return null;
    }
    else if (settings.inViewport === true) {
        if (!__isInViewport(elm))
            return null;
    }
    // return the element
    return elm;
}
export default querySelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3Rvci5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLG1CQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBK0N0RCxTQUFTLGFBQWEsQ0FDbEIsUUFBcUIsRUFDckIsV0FBNEMsRUFBRTtJQUU5QyxrQkFBa0I7SUFDbEIsUUFBUSxtQkFDSixPQUFPLEVBQUUsSUFBSSxFQUNiLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUNwQixRQUFRLENBQ2QsQ0FBQztJQUVGLGdDQUFnQztJQUNoQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCwyQkFBMkI7SUFDM0IsSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPLElBQUksQ0FBQztJQUV0QixpQkFBaUI7SUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtRQUM1QixJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUNqRTtTQUFNLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7UUFDbEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQ25FO0lBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtRQUMvQixJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7UUFDckMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUN6QztJQUVELHFCQUFxQjtJQUNyQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUFDRCxlQUFlLGFBQWEsQ0FBQyJ9