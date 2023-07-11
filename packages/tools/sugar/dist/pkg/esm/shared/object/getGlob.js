// @ts-nocheck
import __minimatch from 'minimatch';
import __deepize from './deepize.js';
import __flatten from './flatten.js';
/**
 * @name                          getGlob
 * @namespace            shared.object
 * @type                          Function
 * @platform          js
 * @platform          node
 * @status        beta
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue".
 * It support glob patterns like "something.*.id" and returns you a new object containing
 * all values with the path that matches the passed glob pattern.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @param               {Object}            [settings={}]           A settings object to configure your glob get process
 * @return              {Mixed}                                     The getted value or "undefined" if nothing found...
 *
 * @setting         {Boolean}               [deepize=true]          Specify if you want the result object to be deepized using the ```deepize``` sugar function
 *
 * @todo      interface
 * @todo      doc
 * @todo      tests
 *
 * @snippet         __getGlob($1, $2)
 *
 * @example             js
 * import { __getGlob } from '@coffeekraken/sugar/object';
 * __getGlob({
 *  hello: {
 *     world: true,
 *     plop: false
 * }, 'hello.*');
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function __getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = __flatten(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (__minimatch(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    if (settings.deepize === true)
        return __deepize(resultObj);
    return resultObj;
}
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sY0FBYyxDQUFDO0FBQ3JDLE9BQU8sU0FBUyxNQUFNLGNBQWMsQ0FBQztBQUVyQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0FtQ0c7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLFNBQVMsQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3RELFFBQVEsbUJBQ0osT0FBTyxFQUFFLElBQUksSUFDVixRQUFRLENBQ2QsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU1QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDekIsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUk7UUFBRSxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDIn0=