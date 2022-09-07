// @ts-nocheck
import { __isInViewport, __isVisible, __closestNotVisible, } from '@coffeekraken/sugar/dom';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLEVBQ0gsY0FBYyxFQUNkLFdBQVcsRUFDWCxtQkFBbUIsR0FDdEIsTUFBTSx5QkFBeUIsQ0FBQztBQStDakMsTUFBTSxDQUFDLE9BQU8sVUFBVSxrQkFBa0IsQ0FDdEMsUUFBZ0IsRUFDaEIsV0FBK0MsRUFBRTtJQUVqRCxrQkFBa0I7SUFDbEIsUUFBUSxtQkFDSixPQUFPLEVBQUUsSUFBSSxFQUNiLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUNwQixRQUFRLENBQ2QsQ0FBQztJQUVGLGdCQUFnQjtJQUNoQixNQUFNLE9BQU8sR0FBRyxFQUFFLENBQUM7SUFFbkIsZ0NBQWdDO0lBQ2hDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsZ0JBQWdCLENBQUMsUUFBUSxDQUFDLENBQUM7SUFFMUQsNkJBQTZCO0lBQzdCLEVBQUUsQ0FBQyxPQUFPLENBQUMsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDLEdBQUcsRUFBRSxFQUFFO1FBQzFCLGlCQUFpQjtRQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1lBQzVCLElBQUksV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLG1CQUFtQixDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQzVEO2FBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsV0FBVyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsbUJBQW1CLENBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDOUQ7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQy9CLElBQUksY0FBYyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQ25DO2FBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtZQUNyQyxJQUFJLENBQUMsY0FBYyxDQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQ3BDO1FBRUQsc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxzQkFBc0I7SUFDdEIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9