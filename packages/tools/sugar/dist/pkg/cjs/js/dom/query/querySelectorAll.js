"use strict";
// @ts-nocheck
Object.defineProperty(exports, "__esModule", { value: true });
const dom_1 = require("@coffeekraken/sugar/dom");
function __querySelectorAll(selector, settings = {}) {
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
            if ((0, dom_1.__isVisible)(elm) || (0, dom_1.__closestNotVisible)(elm))
                return;
        }
        else if (settings.visible === true) {
            if (!(0, dom_1.__isVisible)(elm) || !(0, dom_1.__closestNotVisible)(elm))
                return;
        }
        if (settings.inViewport === false) {
            if ((0, dom_1.__isInViewport)(elm))
                return;
        }
        else if (settings.inViewport === true) {
            if (!(0, dom_1.__isInViewport)(elm))
                return;
        }
        // add the element to the result array
        results.push(elm);
    });
    // return the elements
    return results;
}
exports.default = __querySelectorAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOztBQUVkLGlEQUlpQztBQStDakMsU0FBd0Isa0JBQWtCLENBQ3RDLFFBQWdCLEVBQ2hCLFdBQStDLEVBQUU7SUFFakQsa0JBQWtCO0lBQ2xCLFFBQVEsbUJBQ0osT0FBTyxFQUFFLElBQUksRUFDYixVQUFVLEVBQUUsSUFBSSxFQUNoQixRQUFRLEVBQUUsUUFBUSxDQUFDLElBQUksSUFDcEIsUUFBUSxDQUNkLENBQUM7SUFFRixnQkFBZ0I7SUFDaEIsTUFBTSxPQUFPLEdBQUcsRUFBRSxDQUFDO0lBRW5CLGdDQUFnQztJQUNoQyxNQUFNLElBQUksR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGdCQUFnQixDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBRTFELDZCQUE2QjtJQUM3QixFQUFFLENBQUMsT0FBTyxDQUFDLElBQUksQ0FBQyxJQUFJLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUMxQixpQkFBaUI7UUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtZQUM1QixJQUFJLElBQUEsaUJBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxJQUFBLHlCQUFtQixFQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQzVEO2FBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtZQUNsQyxJQUFJLENBQUMsSUFBQSxpQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBQSx5QkFBbUIsRUFBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztTQUM5RDtRQUNELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7WUFDL0IsSUFBSSxJQUFBLG9CQUFjLEVBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDbkM7YUFBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1lBQ3JDLElBQUksQ0FBQyxJQUFBLG9CQUFjLEVBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDcEM7UUFFRCxzQ0FBc0M7UUFDdEMsT0FBTyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUN0QixDQUFDLENBQUMsQ0FBQztJQUVILHNCQUFzQjtJQUN0QixPQUFPLE9BQU8sQ0FBQztBQUNuQixDQUFDO0FBdENELHFDQXNDQyJ9