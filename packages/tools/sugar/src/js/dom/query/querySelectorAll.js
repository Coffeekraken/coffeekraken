// @ts-nocheck
import __isVisible from './isVisible';
import __isInViewport from './isInViewport';
import __closestNotVisible from './query/closestNotVisible';
;
function querySelectorAll(selector, settings = {}) {
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
export default querySelectorAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVlcnlTZWxlY3RvckFsbC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInF1ZXJ5U2VsZWN0b3JBbGwudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLGFBQWEsQ0FBQztBQUN0QyxPQUFPLGNBQWMsTUFBTSxnQkFBZ0IsQ0FBQztBQUM1QyxPQUFPLG1CQUFtQixNQUFNLDJCQUEyQixDQUFDO0FBOEMzRCxDQUFDO0FBRUYsU0FBUyxnQkFBZ0IsQ0FBQyxRQUFnQixFQUFFLFdBQStDLEVBQUU7SUFDM0Ysa0JBQWtCO0lBQ2xCLFFBQVEsbUJBQ04sT0FBTyxFQUFFLElBQUksRUFDYixVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksSUFDcEIsUUFBUSxDQUNaLENBQUM7SUFFRixnQkFBZ0I7SUFDaEIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBRW5CLGdDQUFnQztJQUNoQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTFELDZCQUE2QjtJQUM3QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUM1QixpQkFBaUI7UUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM5QixJQUFJLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxtQkFBbUIsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztTQUMxRDthQUFNLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDcEMsSUFBSSxDQUFDLFdBQVcsQ0FBQyxHQUFHLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQzVEO1FBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtZQUNqQyxJQUFJLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztTQUNqQzthQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7WUFDdkMsSUFBSSxDQUFDLGNBQWMsQ0FBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztTQUNsQztRQUVELHNDQUFzQztRQUN0QyxPQUFPLENBQUMsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBRUgsc0JBQXNCO0lBQ3RCLE9BQU8sT0FBTyxDQUFDO0FBQ2pCLENBQUM7QUFDRCxlQUFlLGdCQUFnQixDQUFDIn0=