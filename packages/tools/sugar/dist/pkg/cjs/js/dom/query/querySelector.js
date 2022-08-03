"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isVisible_1 = __importDefault(require("./isVisible"));
const isInViewport_1 = __importDefault(require("./isInViewport"));
const closestNotVisible_1 = __importDefault(require("./closestNotVisible"));
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
        if ((0, isVisible_1.default)(elm) || (0, closestNotVisible_1.default)(elm))
            return null;
    }
    else if (settings.visible === true) {
        if (!(0, isVisible_1.default)(elm) || !(0, closestNotVisible_1.default)(elm))
            return null;
    }
    if (settings.inViewport === false) {
        if ((0, isInViewport_1.default)(elm))
            return null;
    }
    else if (settings.inViewport === true) {
        if (!(0, isInViewport_1.default)(elm))
            return null;
    }
    // return the element
    return elm;
}
exports.default = querySelector;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0QyxrRUFBNEM7QUFDNUMsNEVBQXNEO0FBK0N0RCxTQUFTLGFBQWEsQ0FDbEIsUUFBcUIsRUFDckIsV0FBNEMsRUFBRTtJQUU5QyxrQkFBa0I7SUFDbEIsUUFBUSxtQkFDSixPQUFPLEVBQUUsSUFBSSxFQUNiLFVBQVUsRUFBRSxJQUFJLEVBQ2hCLFFBQVEsRUFBRSxRQUFRLENBQUMsSUFBSSxJQUNwQixRQUFRLENBQ2QsQ0FBQztJQUVGLGdDQUFnQztJQUNoQyxNQUFNLEdBQUcsR0FBRyxRQUFRLENBQUMsUUFBUSxDQUFDLGFBQWEsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUN0RCwyQkFBMkI7SUFDM0IsSUFBSSxDQUFDLEdBQUc7UUFBRSxPQUFPLElBQUksQ0FBQztJQUV0QixpQkFBaUI7SUFDakIsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLEtBQUssRUFBRTtRQUM1QixJQUFJLElBQUEsbUJBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxJQUFBLDJCQUFtQixFQUFDLEdBQUcsQ0FBQztZQUFFLE9BQU8sSUFBSSxDQUFDO0tBQ2pFO1NBQU0sSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUksRUFBRTtRQUNsQyxJQUFJLENBQUMsSUFBQSxtQkFBVyxFQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsSUFBQSwyQkFBbUIsRUFBQyxHQUFHLENBQUM7WUFBRSxPQUFPLElBQUksQ0FBQztLQUNuRTtJQUNELElBQUksUUFBUSxDQUFDLFVBQVUsS0FBSyxLQUFLLEVBQUU7UUFDL0IsSUFBSSxJQUFBLHNCQUFjLEVBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDeEM7U0FBTSxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssSUFBSSxFQUFFO1FBQ3JDLElBQUksQ0FBQyxJQUFBLHNCQUFjLEVBQUMsR0FBRyxDQUFDO1lBQUUsT0FBTyxJQUFJLENBQUM7S0FDekM7SUFFRCxxQkFBcUI7SUFDckIsT0FBTyxHQUFHLENBQUM7QUFDZixDQUFDO0FBQ0Qsa0JBQWUsYUFBYSxDQUFDIn0=