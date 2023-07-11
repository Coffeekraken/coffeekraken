"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const higherRule_js_1 = __importDefault(require("./higherRule.js"));
function cloneTree(fromNode, settings) {
    const finalSettings = Object.assign({ empty: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // let parentNode = fromNode;
    // const parentNodes = [];
    // while (parentNode.parent.type !== 'root') {
    //     parentNodes.push(parentNode);
    //     parentNode = parentNode.parent;
    // }
    const higherRule = (0, higherRule_js_1.default)(fromNode);
    const newTree = higherRule.clone();
    if (finalSettings.empty) {
        newTree.cleanRaws();
    }
    // let node = newTree;
    // while (node.nodes?.length) {
    //     node.nodes.forEach((n) => {
    //         // remove all nodes that are not part of the fromNode tree
    //         if (n.nodes && !parentNodes.includes(n)) {
    //             n.remove();
    //             return;
    //         }
    //         // remove all declarations if the settings.empty if true
    //         if (finalSettings.empty && n.prop) {
    //             n.remove();
    //         }
    //     });
    // }
    return newTree;
}
exports.default = cloneTree;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsb0VBQTJDO0FBTTNDLFNBQXdCLFNBQVMsQ0FDN0IsUUFBUSxFQUNSLFFBQXNDO0lBRXRDLE1BQU0sYUFBYSxtQkFDZixLQUFLLEVBQUUsS0FBSyxJQUNULENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRiw2QkFBNkI7SUFDN0IsMEJBQTBCO0lBQzFCLDhDQUE4QztJQUM5QyxvQ0FBb0M7SUFDcEMsc0NBQXNDO0lBQ3RDLElBQUk7SUFFSixNQUFNLFVBQVUsR0FBRyxJQUFBLHVCQUFZLEVBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRW5DLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRTtRQUNyQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDdkI7SUFFRCxzQkFBc0I7SUFDdEIsK0JBQStCO0lBQy9CLGtDQUFrQztJQUNsQyxxRUFBcUU7SUFDckUscURBQXFEO0lBQ3JELDBCQUEwQjtJQUMxQixzQkFBc0I7SUFDdEIsWUFBWTtJQUVaLG1FQUFtRTtJQUNuRSwrQ0FBK0M7SUFDL0MsMEJBQTBCO0lBQzFCLFlBQVk7SUFDWixVQUFVO0lBQ1YsSUFBSTtJQUVKLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUM7QUF4Q0QsNEJBd0NDIn0=