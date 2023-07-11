import __higherRule from './higherRule.js';

export interface ICloneTreeSettings {
    empty: boolean;
}

export default function cloneTree(
    fromNode,
    settings?: Partial<ICloneTreeSettings>,
) {
    const finalSettings: ICloneTreeSettings = {
        empty: false,
        ...(settings ?? {}),
    };

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
