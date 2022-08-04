"use strict";
// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const isVisible_1 = __importDefault(require("./isVisible"));
const isInViewport_1 = __importDefault(require("./isInViewport"));
const closestNotVisible_1 = __importDefault(require("./query/closestNotVisible"));
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
            if ((0, isVisible_1.default)(elm) || (0, closestNotVisible_1.default)(elm))
                return;
        }
        else if (settings.visible === true) {
            if (!(0, isVisible_1.default)(elm) || !(0, closestNotVisible_1.default)(elm))
                return;
        }
        if (settings.inViewport === false) {
            if ((0, isInViewport_1.default)(elm))
                return;
        }
        else if (settings.inViewport === true) {
            if (!(0, isInViewport_1.default)(elm))
                return;
        }
        // add the element to the result array
        results.push(elm);
    });
    // return the elements
    return results;
}
exports.default = querySelectorAll;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjOzs7OztBQUVkLDREQUFzQztBQUN0QyxrRUFBNEM7QUFDNUMsa0ZBQTREO0FBK0M1RCxTQUFTLGdCQUFnQixDQUNyQixRQUFnQixFQUNoQixXQUErQyxFQUFFO0lBRWpELGtCQUFrQjtJQUNsQixRQUFRLG1CQUNKLE9BQU8sRUFBRSxJQUFJLEVBQ2IsVUFBVSxFQUFFLElBQUksRUFDaEIsUUFBUSxFQUFFLFFBQVEsQ0FBQyxJQUFJLElBQ3BCLFFBQVEsQ0FDZCxDQUFDO0lBRUYsZ0JBQWdCO0lBQ2hCLE1BQU0sT0FBTyxHQUFHLEVBQUUsQ0FBQztJQUVuQixnQ0FBZ0M7SUFDaEMsTUFBTSxJQUFJLEdBQUcsUUFBUSxDQUFDLFFBQVEsQ0FBQyxnQkFBZ0IsQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUUxRCw2QkFBNkI7SUFDN0IsRUFBRSxDQUFDLE9BQU8sQ0FBQyxJQUFJLENBQUMsSUFBSSxFQUFFLENBQUMsR0FBRyxFQUFFLEVBQUU7UUFDMUIsaUJBQWlCO1FBQ2pCLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxLQUFLLEVBQUU7WUFDNUIsSUFBSSxJQUFBLG1CQUFXLEVBQUMsR0FBRyxDQUFDLElBQUksSUFBQSwyQkFBbUIsRUFBQyxHQUFHLENBQUM7Z0JBQUUsT0FBTztTQUM1RDthQUFNLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJLEVBQUU7WUFDbEMsSUFBSSxDQUFDLElBQUEsbUJBQVcsRUFBQyxHQUFHLENBQUMsSUFBSSxDQUFDLElBQUEsMkJBQW1CLEVBQUMsR0FBRyxDQUFDO2dCQUFFLE9BQU87U0FDOUQ7UUFDRCxJQUFJLFFBQVEsQ0FBQyxVQUFVLEtBQUssS0FBSyxFQUFFO1lBQy9CLElBQUksSUFBQSxzQkFBYyxFQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQ25DO2FBQU0sSUFBSSxRQUFRLENBQUMsVUFBVSxLQUFLLElBQUksRUFBRTtZQUNyQyxJQUFJLENBQUMsSUFBQSxzQkFBYyxFQUFDLEdBQUcsQ0FBQztnQkFBRSxPQUFPO1NBQ3BDO1FBRUQsc0NBQXNDO1FBQ3RDLE9BQU8sQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDdEIsQ0FBQyxDQUFDLENBQUM7SUFFSCxzQkFBc0I7SUFDdEIsT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQztBQUNELGtCQUFlLGdCQUFnQixDQUFDIn0=