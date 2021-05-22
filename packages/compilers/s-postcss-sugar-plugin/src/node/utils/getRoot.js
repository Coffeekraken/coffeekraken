export default function getRoot(node) {
    if (node.parent && node.parent.type !== 'root')
        return getRoot(node.parent);
    else if (node.parent && node.parent.type === 'root')
        return node.parent;
    return node;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0Um9vdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldFJvb3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQUMsSUFBSTtJQUNsQyxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTTtRQUFFLE9BQU8sT0FBTyxDQUFDLElBQUksQ0FBQyxNQUFNLENBQUMsQ0FBQztTQUN2RSxJQUFJLElBQUksQ0FBQyxNQUFNLElBQUksSUFBSSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEtBQUssTUFBTTtRQUFFLE9BQU8sSUFBSSxDQUFDLE1BQU0sQ0FBQztJQUN4RSxPQUFPLElBQUksQ0FBQztBQUNkLENBQUMifQ==