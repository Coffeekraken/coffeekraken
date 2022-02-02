/**
 * @name            configFileNameFromDocmapPath
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to get the .config file name from a passed docmap path
 *
 * @param       {String}        path            The dotpath to the config you want to get the filename from
 * @return      {String}                    The .config.js filename
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function configFileNameFromDocmapPath(namespace) {
    if (!namespace.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
        throw new Error(`Sorry but the passed config path "${namespace}" is not a valid one and does not exists in the docmap`);
    }
    return `${namespace.split('.').pop()}.config.js`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnRmlsZU5hbWVGcm9tRG9jbWFwUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZ0ZpbGVOYW1lRnJvbURvY21hcFBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSw0QkFBNEIsQ0FBQyxTQUFpQjtJQUNsRSxJQUFJLENBQUMsU0FBUyxDQUFDLEtBQUssQ0FBQywrQ0FBK0MsQ0FBQyxFQUFFO1FBQ25FLE1BQU0sSUFBSSxLQUFLLENBQ1gscUNBQXFDLFNBQVMsd0RBQXdELENBQ3pHLENBQUM7S0FDTDtJQUNELE9BQU8sR0FBRyxTQUFTLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEdBQUcsRUFBRSxZQUFZLENBQUM7QUFDckQsQ0FBQyJ9