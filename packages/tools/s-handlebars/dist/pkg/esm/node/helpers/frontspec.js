import __SFrontspec from '@coffeekraken/s-frontspec';
import { __get } from '@coffeekraken/sugar/object';
/**
 * @name            frontspec
 * @namespace       node.helpers
 * @type            Function
 * @platform        js
 * @platform        node
 * @status          beta
 *
 * This helper allows you to access a sugar frontspecuration
 *
 * @param       {String}        dotPath            The frontspec dotpath
 * @return      {Any}                           The sanitized value
 *
 * @since           2.0.0
 * @author 		Olivier Bossel<olivier.bossel@gmail.com>
 */
export default function frontspec(dotPath = '') {
    const frontspec = new __SFrontspec();
    const frontspecJson = frontspec.read();
    if (dotPath) {
        return __get(frontspecJson, dotPath);
    }
    return frontspecJson;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE9BQU8sWUFBWSxNQUFNLDJCQUEyQixDQUFDO0FBQ3JELE9BQU8sRUFBRSxLQUFLLEVBQUUsTUFBTSw0QkFBNEIsQ0FBQztBQUVuRDs7Ozs7Ozs7Ozs7Ozs7O0dBZUc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxVQUFrQixFQUFFO0lBQ2xELE1BQU0sU0FBUyxHQUFHLElBQUksWUFBWSxFQUFFLENBQUM7SUFDckMsTUFBTSxhQUFhLEdBQUcsU0FBUyxDQUFDLElBQUksRUFBRSxDQUFDO0lBQ3ZDLElBQUksT0FBTyxFQUFFO1FBQ1QsT0FBTyxLQUFLLENBQUMsYUFBYSxFQUFFLE9BQU8sQ0FBQyxDQUFDO0tBQ3hDO0lBQ0QsT0FBTyxhQUFhLENBQUM7QUFDekIsQ0FBQyJ9