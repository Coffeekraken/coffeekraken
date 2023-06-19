// @ts-nocheck
import __isInViewport from '../is/isInViewport';
import __isVisible from '../is/isVisible';
import __closestNotVisible from './closestNotVisible';
export default function __querySelectorAll(selector, settings = {}) {
    // extend settings
    settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // results array
    const results = [];
    // grab the element into the dom
    const elms = settings.rootNode.querySelectorAll(selector);
    // loop on the found elements
    [].forEach.call(elms, (elm) => {
        // check settings
        if (settings.visible === false) {
            if (__isVisible(elm) || __closestNotVisible(elm))
                return;
        }
        else if (settings.visible === true) {
            if (!__isVisible(elm) || !__closestNotVisible(elm))
                return;
        }
        if (settings.inViewport === false) {
            if (__isInViewport(elm))
                return;
        }
        else if (settings.inViewport === true) {
            if (!__isInViewport(elm))
                return;
        }
        // add the element to the result array
        results.push(elm);
    });
    // return the elements
    return results;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLGNBQWMsTUFBTSxvQkFBb0IsQ0FBQztBQUNoRCxPQUFPLFdBQVcsTUFBTSxpQkFBaUIsQ0FBQztBQUMxQyxPQUFPLG1CQUFtQixNQUFNLHFCQUFxQixDQUFDO0FBaUR0RCxNQUFNLENBQUMsT0FBTyxVQUFVLGtCQUFrQixDQUN0QyxRQUFnQixFQUNoQixXQUErQyxFQUFFO0lBRWpELGtCQUFrQjtJQUNsQixRQUFRLG1CQUNKLE9BQU8sRUFBRSxJQUFJLEVBQ2IsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQ3BCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsZ0JBQWdCO0lBQ2hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUVuQixnQ0FBZ0M7SUFDaEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUxRCw2QkFBNkI7SUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDMUIsaUJBQWlCO1FBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsSUFBSSxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksbUJBQW1CLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDNUQ7YUFBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1lBQ2xDLElBQUksQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztTQUM5RDtRQUNELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxjQUFjLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDbkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxjQUFjLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDcEM7UUFFRCxzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILHNCQUFzQjtJQUN0QixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDIn0=