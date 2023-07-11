// @ts-nocheck
import __isInViewport from '../is/isInViewport.js';
export default function __elementsInViewport(settings = {}) {
    var _a, _b;
    // extend settings
    settings = Object.assign({ rootNode: document.body, threshold: 10 }, settings);
    const $elementsInViewport = [];
    // get all elements
    const $elms = Array.from((_b = (_a = settings.rootNode) === null || _a === void 0 ? void 0 : _a.querySelectorAll('*:not(html,body,head,script,style,template)')) !== null && _b !== void 0 ? _b : []);
    // loop on each elements until some are not in the viewport, then stop
    let currentThreshold = 0;
    for (let [i, $elm] of $elms.entries()) {
        if (currentThreshold >= settings.threshold) {
            break;
        }
        if (!__isInViewport($elm)) {
            currentThreshold++;
            continue;
        }
        $elementsInViewport.push($elm);
    }
    // return the elements
    return $elementsInViewport;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxPQUFPLGNBQWMsTUFBTSx1QkFBdUIsQ0FBQztBQW1DbkQsTUFBTSxDQUFDLE9BQU8sVUFBVSxvQkFBb0IsQ0FDeEMsV0FBaUQsRUFBRTs7SUFFbkQsa0JBQWtCO0lBQ2xCLFFBQVEsbUJBQ0osUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLEVBQ3ZCLFNBQVMsRUFBRSxFQUFFLElBQ1YsUUFBUSxDQUNkLENBQUM7SUFFRixNQUFNLG1CQUFtQixHQUFnQixFQUFFLENBQUM7SUFFNUMsbUJBQW1CO0lBQ25CLE1BQU0sS0FBSyxHQUFHLEtBQUssQ0FBQyxJQUFJLENBQ3BCLE1BQUEsTUFBQSxRQUFRLENBQUMsUUFBUSwwQ0FBRSxnQkFBZ0IsQ0FDL0IsNkNBQTZDLENBQ2hELG1DQUFJLEVBQUUsQ0FDVixDQUFDO0lBRUYsc0VBQXNFO0lBQ3RFLElBQUksZ0JBQWdCLEdBQUcsQ0FBQyxDQUFDO0lBQ3pCLEtBQUssSUFBSSxDQUFDLENBQUMsRUFBRSxJQUFJLENBQUMsSUFBSSxLQUFLLENBQUMsT0FBTyxFQUFFLEVBQUU7UUFDbkMsSUFBSSxnQkFBZ0IsSUFBSSxRQUFRLENBQUMsU0FBUyxFQUFFO1lBQ3hDLE1BQU07U0FDVDtRQUNELElBQUksQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7WUFDdkIsZ0JBQWdCLEVBQUUsQ0FBQztZQUNuQixTQUFTO1NBQ1o7UUFDRCxtQkFBbUIsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7S0FDbEM7SUFFRCxzQkFBc0I7SUFDdEIsT0FBTyxtQkFBbUIsQ0FBQztBQUMvQixDQUFDIn0=