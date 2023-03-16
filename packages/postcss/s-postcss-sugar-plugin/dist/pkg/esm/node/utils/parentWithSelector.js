export default function parentWithSelector(fromNode) {
    var _a;
    let currentNode = fromNode, parentWithSelector;
    while (true) {
        if (((_a = currentNode.parent) === null || _a === void 0 ? void 0 : _a.type) === 'root') {
            break;
        }
        if (currentNode.parent.selector) {
            parentWithSelector = currentNode.parent;
        }
        currentNode = currentNode.parent;
    }
    return parentWithSelector;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sQ0FBQyxPQUFPLFVBQVUsa0JBQWtCLENBQUMsUUFBUTs7SUFDL0MsSUFBSSxXQUFXLEdBQUcsUUFBUSxFQUN0QixrQkFBa0IsQ0FBQztJQUN2QixPQUFPLElBQUksRUFBRTtRQUNULElBQUksQ0FBQSxNQUFBLFdBQVcsQ0FBQyxNQUFNLDBDQUFFLElBQUksTUFBSyxNQUFNLEVBQUU7WUFDckMsTUFBTTtTQUNUO1FBQ0QsSUFBSSxXQUFXLENBQUMsTUFBTSxDQUFDLFFBQVEsRUFBRTtZQUM3QixrQkFBa0IsR0FBRyxXQUFXLENBQUMsTUFBTSxDQUFDO1NBQzNDO1FBQ0QsV0FBVyxHQUFHLFdBQVcsQ0FBQyxNQUFNLENBQUM7S0FDcEM7SUFDRCxPQUFPLGtCQUFrQixDQUFDO0FBQzlCLENBQUMifQ==