"use strict";
// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const minimatch_1 = __importDefault(require("minimatch"));
const flatten_1 = __importDefault(require("./flatten"));
const deepize_1 = __importDefault(require("./deepize"));
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
function getGlob(obj, glob, settings = {}) {
    settings = Object.assign({ deepize: true }, settings);
    const flat = flatten_1.default(obj);
    const resultObj = {};
    Object.keys(flat).forEach((path) => {
        if (minimatch_1.default(path, glob)) {
            resultObj[path] = flat[path];
        }
    });
    // if (glob === 'watch') {
    //   console.log('GLOB', resultObj);
    // }
    if (settings.deepize === true)
        return deepize_1.default(resultObj);
    return resultObj;
}
exports.default = getGlob;
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0R2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L2dldEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7QUFDZCxVQUFVOzs7OztBQUVWLDBEQUFvQztBQUNwQyx3REFBa0M7QUFDbEMsd0RBQWtDO0FBSWxDOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0EyQkc7QUFDSCxTQUF3QixPQUFPLENBQUMsR0FBRyxFQUFFLElBQUksRUFBRSxRQUFRLEdBQUcsRUFBRTtJQUN0RCxRQUFRLG1CQUNOLE9BQU8sRUFBRSxJQUFJLElBQ1YsUUFBUSxDQUNaLENBQUM7SUFFRixNQUFNLElBQUksR0FBRyxpQkFBUyxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBRTVCLE1BQU0sU0FBUyxHQUFHLEVBQUUsQ0FBQztJQUVyQixNQUFNLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDLE9BQU8sQ0FBQyxDQUFDLElBQUksRUFBRSxFQUFFO1FBQ2pDLElBQUksbUJBQVcsQ0FBQyxJQUFJLEVBQUUsSUFBSSxDQUFDLEVBQUU7WUFDM0IsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztTQUM5QjtJQUNILENBQUMsQ0FBQyxDQUFDO0lBRUgsMEJBQTBCO0lBQzFCLG9DQUFvQztJQUNwQyxJQUFJO0lBRUosSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUk7UUFBRSxPQUFPLGlCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7SUFDM0QsT0FBTyxTQUFTLENBQUM7QUFDbkIsQ0FBQztBQXRCRCwwQkFzQkM7QUFFRCxlQUFlO0FBQ2YsYUFBYTtBQUNiLFFBQVE7QUFDUixvQkFBb0I7QUFDcEIsd0JBQXdCO0FBQ3hCLFdBQVc7QUFDWCxrQ0FBa0M7QUFDbEMsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7QUFDNUIsWUFBWTtBQUNaLFVBQVU7QUFDVixTQUFTO0FBQ1QsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTixLQUFLIn0=