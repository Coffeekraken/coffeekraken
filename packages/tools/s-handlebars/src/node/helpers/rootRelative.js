import __packageRoot from '@coffeekraken/sugar/node/path/packageRoot';
/**
 * @name            rootRelative
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        ts
 * @platform        node
 * @status          beta
 *
 * This helper allows you to remove in a path the absolute part and get only the relative part of it
 *
 * @param       {String}        path            The path you want to process
 * @return      {String}                    The processed path
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function rootRelative(path) {
    return path.replace(`${__packageRoot()}/`, '');
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicm9vdFJlbGF0aXZlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicm9vdFJlbGF0aXZlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sYUFBYSxNQUFNLDJDQUEyQyxDQUFDO0FBRXRFOzs7Ozs7Ozs7Ozs7Ozs7O0dBZ0JHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxZQUFZLENBQUMsSUFBWTtJQUM3QyxPQUFPLElBQUksQ0FBQyxPQUFPLENBQUMsR0FBRyxhQUFhLEVBQUUsR0FBRyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0FBQ25ELENBQUMifQ==