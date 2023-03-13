export default function parentWithSelector(fromNode) {
    let currentNode = fromNode,
        parentWithSelector;
    while (true) {
        if (currentNode.parent?.type === 'root') {
            break;
        }
        if (currentNode.parent.selector) {
            parentWithSelector = currentNode.parent;
        }
        currentNode = currentNode.parent;
    }
    return parentWithSelector;
}
