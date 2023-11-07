export default function cloneNodes(nodes) {
    const newNodes = [];
    nodes.forEach((node) => {
        newNodes.push(node.clone());
    });
    return newNodes;
}
