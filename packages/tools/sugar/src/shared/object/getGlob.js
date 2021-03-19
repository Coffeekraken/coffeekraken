"use strict";
// @ts-nocheck
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0R2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLGNBQWM7Ozs7O0FBRWQsMERBQW9DO0FBQ3BDLHdEQUFrQztBQUNsQyx3REFBa0M7QUFJbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQTJCRztBQUNILFNBQXdCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO0lBQ3RELFFBQVEsbUJBQ04sT0FBTyxFQUFFLElBQUksSUFDVixRQUFRLENBQ1osQ0FBQztJQUVGLE1BQU0sSUFBSSxHQUFHLGlCQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7SUFFNUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO0lBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7UUFDakMsSUFBSSxtQkFBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtZQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1NBQzlCO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFFSCwwQkFBMEI7SUFDMUIsb0NBQW9DO0lBQ3BDLElBQUk7SUFFSixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSTtRQUFFLE9BQU8saUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztJQUMzRCxPQUFPLFNBQVMsQ0FBQztBQUNuQixDQUFDO0FBdEJELDBCQXNCQztBQUVELGVBQWU7QUFDZixhQUFhO0FBQ2IsUUFBUTtBQUNSLG9CQUFvQjtBQUNwQix3QkFBd0I7QUFDeEIsV0FBVztBQUNYLGtDQUFrQztBQUNsQyxpQkFBaUI7QUFDakIseUJBQXlCO0FBQ3pCLDRCQUE0QjtBQUM1QixZQUFZO0FBQ1osVUFBVTtBQUNWLFNBQVM7QUFDVCxnQkFBZ0I7QUFDaEIsTUFBTTtBQUNOLEtBQUsifQ==