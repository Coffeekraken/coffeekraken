import __higherRule from './higherRule';
export default function cloneTree(fromNode, settings) {
    const finalSettings = Object.assign({ empty: false }, (settings !== null && settings !== void 0 ? settings : {}));
    // let parentNode = fromNode;
    // const parentNodes = [];
    // while (parentNode.parent.type !== 'root') {
    //     parentNodes.push(parentNode);
    //     parentNode = parentNode.parent;
    // }
    const higherRule = __higherRule(fromNode);
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGNBQWMsQ0FBQztBQU14QyxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FDN0IsUUFBUSxFQUNSLFFBQXNDO0lBRXRDLE1BQU0sYUFBYSxtQkFDZixLQUFLLEVBQUUsS0FBSyxJQUNULENBQUMsUUFBUSxhQUFSLFFBQVEsY0FBUixRQUFRLEdBQUksRUFBRSxDQUFDLENBQ3RCLENBQUM7SUFFRiw2QkFBNkI7SUFDN0IsMEJBQTBCO0lBQzFCLDhDQUE4QztJQUM5QyxvQ0FBb0M7SUFDcEMsc0NBQXNDO0lBQ3RDLElBQUk7SUFFSixNQUFNLFVBQVUsR0FBRyxZQUFZLENBQUMsUUFBUSxDQUFDLENBQUM7SUFDMUMsTUFBTSxPQUFPLEdBQUcsVUFBVSxDQUFDLEtBQUssRUFBRSxDQUFDO0lBRW5DLElBQUksYUFBYSxDQUFDLEtBQUssRUFBRTtRQUNyQixPQUFPLENBQUMsU0FBUyxFQUFFLENBQUM7S0FDdkI7SUFFRCxzQkFBc0I7SUFDdEIsK0JBQStCO0lBQy9CLGtDQUFrQztJQUNsQyxxRUFBcUU7SUFDckUscURBQXFEO0lBQ3JELDBCQUEwQjtJQUMxQixzQkFBc0I7SUFDdEIsWUFBWTtJQUVaLG1FQUFtRTtJQUNuRSwrQ0FBK0M7SUFDL0MsMEJBQTBCO0lBQzFCLFlBQVk7SUFDWixVQUFVO0lBQ1YsSUFBSTtJQUVKLE9BQU8sT0FBTyxDQUFDO0FBQ25CLENBQUMifQ==