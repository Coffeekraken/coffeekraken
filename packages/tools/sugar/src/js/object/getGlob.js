// @ts-nocheck
// @shared
import __minimatch from 'minimatch';
import __flatten from './flatten';
import __deepize from './deepize';
/**
 * @name                          getGlob
 * @namespace           sugar.js.object
 * @type                          Function
 * @stable
 *
 * Retreive an object value using a dotted path like "myObject.myProperty.myValue".
 * It support glob patterns like "something.*.id" and returns you a new object containing
 * all values with the path that matches the passed glob pattern.
 *
 * @param               {Object}                 obj                The object in which to set the value
 * @param               {String}                path                The dotted object path to get
 * @param               {Object}            [settings={}]           A settings object to configure your glob get process
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
 * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0R2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7QUFFVixPQUFPLFdBQVcsTUFBTSxXQUFXLENBQUM7QUFDcEMsT0FBTyxTQUFTLE1BQU0sV0FBVyxDQUFDO0FBQ2xDLE9BQU8sU0FBUyxNQUFNLFdBQVcsQ0FBQztBQUlsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0dBMkJHO0FBQ0gsTUFBTSxDQUFDLE9BQU8sVUFBVSxPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN0RCxRQUFRLG1CQUNOLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxTQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFNUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDakMsSUFBSSxXQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO1lBQzNCLFNBQVMsQ0FBQyxJQUFJLENBQUMsR0FBRyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7U0FDOUI7SUFDSCxDQUFDLENBQUMsQ0FBQztJQUVILDBCQUEwQjtJQUMxQixvQ0FBb0M7SUFDcEMsSUFBSTtJQUVKLElBQUksUUFBUSxDQUFDLE9BQU8sS0FBSyxJQUFJO1FBQUUsT0FBTyxTQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQUVELGVBQWU7QUFDZixhQUFhO0FBQ2IsUUFBUTtBQUNSLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsV0FBVztBQUNYLGtDQUFrQztBQUNsQyxpQkFBaUI7QUFDakIseUJBQXlCO0FBQ3pCLDRCQUE0QjtBQUM1QixZQUFZO0FBQ1osVUFBVTtBQUNWLFNBQVM7QUFDVCxnQkFBZ0I7QUFDaEIsTUFBTTtBQUNOLEtBQUsifQ==