// @ts-nocheck
import __minimatch from 'minimatch';
import __deepize from './deepize';
import __flatten from './flatten';
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kdWxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsibW9kdWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFFZCxPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUVsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0E2Qkc7QUFDSCxNQUFNLENBQUMsT0FBTyxVQUFVLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3BELFFBQVEsbUJBQ0osT0FBTyxFQUFFLElBQUksSUFDVixRQUFRLENBQ2QsQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLFNBQVMsQ0FBQyxHQUFHLENBQUMsQ0FBQztJQUU1QixNQUFNLFNBQVMsR0FBRyxFQUFFLENBQUM7SUFFckIsTUFBTSxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQyxPQUFPLENBQUMsQ0FBQyxJQUFJLEVBQUUsRUFBRTtRQUMvQixJQUFJLFdBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDekIsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUNoQztJQUNMLENBQUMsQ0FBQyxDQUFDO0lBRUgsMEJBQTBCO0lBQzFCLG9DQUFvQztJQUNwQyxJQUFJO0lBRUosSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUk7UUFBRSxPQUFPLFNBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxPQUFPLFNBQVMsQ0FBQztBQUNyQixDQUFDO0FBRUQsZUFBZTtBQUNmLGFBQWE7QUFDYixRQUFRO0FBQ1Isb0JBQW9CO0FBQ3BCLHdCQUF3QjtBQUN4QixXQUFXO0FBQ1gsa0NBQWtDO0FBQ2xDLGlCQUFpQjtBQUNqQix5QkFBeUI7QUFDekIsNEJBQTRCO0FBQzVCLFlBQVk7QUFDWixVQUFVO0FBQ1YsU0FBUztBQUNULGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sS0FBSyJ9