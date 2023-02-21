"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// @ts-nocheck
const dom_1 = require("@coffeekraken/sugar/dom");
function __querySelector(selector, settings = {}) {
    // extend settings
    settings = Object.assign({ visible: null, inViewport: null, rootNode: document.body }, settings);
    // grab the element into the dom
    const elm = settings.rootNode.querySelector(selector);
    // if no element, stop here
    if (!elm)
        return null;
    // check settings
    if (settings.visible === false) {
        if ((0, dom_1.__isVisible)(elm) || (0, dom_1.__closestNotVisible)(elm))
            return null;
    }
    else if (settings.visible === true) {
        if (!(0, dom_1.__isVisible)(elm) || !(0, dom_1.__closestNotVisible)(elm))
            return null;
    }
    if (settings.inViewport === false) {
        if ((0, dom_1.__isInViewport)(elm))
            return null;
    }
    else if (settings.inViewport === true) {
        if (!(0, dom_1.__isInViewport)(elm))
            return null;
    }
    // return the element
    return elm;
}
exports.default = __querySelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsY0FBYztBQUNkLGlEQUlpQztBQStDakMsU0FBd0IsZUFBZSxDQUNuQyxRQUFxQixFQUNyQixXQUE0QyxFQUFFO0lBRTlDLGtCQUFrQjtJQUNsQixRQUFRLG1CQUNKLE9BQU8sRUFBRSxJQUFJLEVBQ2IsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQ3BCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsZ0NBQWdDO0lBQ2hDLE1BQU0sR0FBRyxHQUFHLFFBQVEsQ0FBQyxRQUFRLENBQUMsYUFBYSxDQUFDLFFBQVEsQ0FBQyxDQUFDO0lBQ3RELDJCQUEyQjtJQUMzQixJQUFJLENBQUMsR0FBRztRQUFFLE9BQU8sSUFBSSxDQUFDO0lBRXRCLGlCQUFpQjtJQUNqQixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssS0FBSyxFQUFFO1FBQzVCLElBQUksSUFBQSxpQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUEseUJBQW1CLEVBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDakU7U0FBTSxJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSSxFQUFFO1FBQ2xDLElBQUksQ0FBQyxJQUFBLGlCQUFXLEVBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxJQUFBLHlCQUFtQixFQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQ25FO0lBQ0QsSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLEtBQUssRUFBRTtRQUMvQixJQUFJLElBQUEsb0JBQWMsRUFBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUN4QztTQUFNLElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxJQUFJLEVBQUU7UUFDckMsSUFBSSxDQUFDLElBQUEsb0JBQWMsRUFBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUN6QztJQUVELHFCQUFxQjtJQUNyQixPQUFPLEdBQUcsQ0FBQztBQUNmLENBQUM7QUEvQkQsa0NBK0JDIn0=