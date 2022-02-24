// @ts-nocheck
import __minimatch from 'minimatch';
import __flatten from './flatten';
import __deepize from './deepize';
/**
 * @name                          getGlob
 * @namespace            js.object
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
 * @example             js
 * import get from '@coffeekraken/sugar/js/object/get';
 * get('myObject.cool.value'); // => 'Hello world'
 *
 * @since     2.0.0
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = __flatten(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (__minimatch(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    // if (glob === 'watch') {
    //   console.log('GLOB', resultObj);
    // }
    if (settings.deepize === true)
        return __deepize(resultObj);
    return resultObj;
}
// console.log(
//   getGlob(
//     {
//       someting: {
//         cool: 'hello'
//       },
//       coco: ['hello', 'world'],
//       world: {
//         'coco.plop': {
//           yep: 'dsojiofj'
//         }
//       }
//     },
//     'world.*'
//   )
// );
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0R2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUVkLE9BQU8sV0FBVyxNQUFNLFdBQVcsQ0FBQztBQUNwQyxPQUFPLFNBQVMsTUFBTSxXQUFXLENBQUM7QUFDbEMsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBSWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTZCRztBQUNILE1BQU0sQ0FBQyxPQUFPLFVBQVUsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBUSxHQUFHLEVBQUU7SUFDcEQsUUFBUSxtQkFDSixPQUFPLEVBQUUsSUFBSSxJQUNWLFFBQVEsQ0FDZCxDQUFDO0lBRUYsTUFBTSxJQUFJLEdBQUcsU0FBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTVCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQy9CLElBQUksV0FBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUN6QixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQ2hDO0lBQ0wsQ0FBQyxDQUFDLENBQUM7SUFFSCwwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLElBQUk7SUFFSixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSTtRQUFFLE9BQU8sU0FBUyxDQUFDLFNBQVMsQ0FBQyxDQUFDO0lBQzNELE9BQU8sU0FBUyxDQUFDO0FBQ3JCLENBQUM7QUFFRCxlQUFlO0FBQ2YsYUFBYTtBQUNiLFFBQVE7QUFDUixvQkFBb0I7QUFDcEIsd0JBQXdCO0FBQ3hCLFdBQVc7QUFDWCxrQ0FBa0M7QUFDbEMsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7QUFDNUIsWUFBWTtBQUNaLFVBQVU7QUFDVixTQUFTO0FBQ1QsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTixLQUFLIn0=