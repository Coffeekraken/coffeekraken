import __higherRule from './higherRule.js';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLGlCQUFpQixDQUFDO0FBTTNDLE1BQU0sQ0FBQyxPQUFPLFVBQVUsU0FBUyxDQUM3QixRQUFRLEVBQ1IsUUFBc0M7SUFFdEMsTUFBTSxhQUFhLG1CQUNmLEtBQUssRUFBRSxLQUFLLElBQ1QsQ0FBQyxRQUFRLGFBQVIsUUFBUSxjQUFSLFFBQVEsR0FBSSxFQUFFLENBQUMsQ0FDdEIsQ0FBQztJQUVGLDZCQUE2QjtJQUM3QiwwQkFBMEI7SUFDMUIsOENBQThDO0lBQzlDLG9DQUFvQztJQUNwQyxzQ0FBc0M7SUFDdEMsSUFBSTtJQUVKLE1BQU0sVUFBVSxHQUFHLFlBQVksQ0FBQyxRQUFRLENBQUMsQ0FBQztJQUMxQyxNQUFNLE9BQU8sR0FBRyxVQUFVLENBQUMsS0FBSyxFQUFFLENBQUM7SUFFbkMsSUFBSSxhQUFhLENBQUMsS0FBSyxFQUFFO1FBQ3JCLE9BQU8sQ0FBQyxTQUFTLEVBQUUsQ0FBQztLQUN2QjtJQUVELHNCQUFzQjtJQUN0QiwrQkFBK0I7SUFDL0Isa0NBQWtDO0lBQ2xDLHFFQUFxRTtJQUNyRSxxREFBcUQ7SUFDckQsMEJBQTBCO0lBQzFCLHNCQUFzQjtJQUN0QixZQUFZO0lBRVosbUVBQW1FO0lBQ25FLCtDQUErQztJQUMvQywwQkFBMEI7SUFDMUIsWUFBWTtJQUNaLFVBQVU7SUFDVixJQUFJO0lBRUosT0FBTyxPQUFPLENBQUM7QUFDbkIsQ0FBQyJ9