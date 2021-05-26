// @ts-nocheck
export function getText(node, options) {
    const leadingComments = node.leadingComments;
    return options.originalText.slice(options.locStart(
    // if there are comments before the node they are not included
    // in the `start` of the node itself
    (leadingComments && leadingComments[0]) || node), options.locEnd(node));
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0VGV4dC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFRleHQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUtkLE1BQU0sVUFBVSxPQUFPLENBQUMsSUFBVSxFQUFFLE9BQXNCO0lBQ3hELE1BQU0sZUFBZSxHQUFZLElBQVksQ0FBQyxlQUFlLENBQUM7SUFFOUQsT0FBTyxPQUFPLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FDL0IsT0FBTyxDQUFDLFFBQVE7SUFDZCw4REFBOEQ7SUFDOUQsb0NBQW9DO0lBQ3BDLENBQUMsZUFBZSxJQUFJLGVBQWUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLElBQUksQ0FDaEQsRUFDRCxPQUFPLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUNyQixDQUFDO0FBQ0osQ0FBQyJ9