"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
function getRoot(node) {
    if (node.parent && node.parent.type !== 'root')
        return getRoot(node.parent);
    else if (node.parent && node.parent.type === 'root')
        return node.parent;
    return node;
}
exports.default = getRoot;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsU0FBd0IsT0FBTyxDQUFDLElBQUk7SUFDaEMsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU07UUFBRSxPQUFPLE9BQU8sQ0FBQyxJQUFJLENBQUMsTUFBTSxDQUFDLENBQUM7U0FDdkUsSUFBSSxJQUFJLENBQUMsTUFBTSxJQUFJLElBQUksQ0FBQyxNQUFNLENBQUMsSUFBSSxLQUFLLE1BQU07UUFBRSxPQUFPLElBQUksQ0FBQyxNQUFNLENBQUM7SUFDeEUsT0FBTyxJQUFJLENBQUM7QUFDaEIsQ0FBQztBQUpELDBCQUlDIn0=