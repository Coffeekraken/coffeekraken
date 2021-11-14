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
export default function configFileNameFromDocmapPath(path) {
    if (!path.match(/^[a-zA-Z0-9_\-\.@]+\.config\.[a-zA-Z0-9_\-]+$/)) {
        throw new Error(`Sorry but the passed config path "${path}" is not a valid one and does not exists in the docmap`);
    }
    return `${path.split('.').pop()}.config.js`;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlnRmlsZU5hbWVGcm9tRG9jbWFwUGF0aC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImNvbmZpZ0ZpbGVOYW1lRnJvbURvY21hcFBhdGgudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7Ozs7Ozs7Ozs7Ozs7OztHQWVHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSw0QkFBNEIsQ0FBQyxJQUFZO0lBQzdELElBQUksQ0FBQyxJQUFJLENBQUMsS0FBSyxDQUFDLCtDQUErQyxDQUFDLEVBQUU7UUFDOUQsTUFBTSxJQUFJLEtBQUssQ0FDWCxxQ0FBcUMsSUFBSSx3REFBd0QsQ0FDcEcsQ0FBQztLQUNMO0lBQ0QsT0FBTyxHQUFHLElBQUksQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsR0FBRyxFQUFFLFlBQVksQ0FBQztBQUNoRCxDQUFDIn0=