// @ts-nocheck
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "minimatch", "./flatten", "./deepize"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const minimatch_1 = __importDefault(require("minimatch"));
    const flatten_1 = __importDefault(require("./flatten"));
    const deepize_1 = __importDefault(require("./deepize"));
    /**
     * @name                          getGlob
     * @namespace            js.object
     * @type                          Function
     * @stable
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
});
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0R2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImdldEdsb2IudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsMERBQW9DO0lBQ3BDLHdEQUFrQztJQUNsQyx3REFBa0M7SUFJbEM7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQTJCRztJQUNILFNBQXdCLE9BQU8sQ0FBQyxHQUFHLEVBQUUsSUFBSSxFQUFFLFFBQVEsR0FBRyxFQUFFO1FBQ3RELFFBQVEsbUJBQ04sT0FBTyxFQUFFLElBQUksSUFDVixRQUFRLENBQ1osQ0FBQztRQUVGLE1BQU0sSUFBSSxHQUFHLGlCQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUIsTUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLENBQUMsSUFBSSxFQUFFLEVBQUU7WUFDakMsSUFBSSxtQkFBVyxDQUFDLElBQUksRUFBRSxJQUFJLENBQUMsRUFBRTtnQkFDM0IsU0FBUyxDQUFDLElBQUksQ0FBQyxHQUFHLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQzthQUM5QjtRQUNILENBQUMsQ0FBQyxDQUFDO1FBRUgsMEJBQTBCO1FBQzFCLG9DQUFvQztRQUNwQyxJQUFJO1FBRUosSUFBSSxRQUFRLENBQUMsT0FBTyxLQUFLLElBQUk7WUFBRSxPQUFPLGlCQUFTLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDM0QsT0FBTyxTQUFTLENBQUM7SUFDbkIsQ0FBQztJQXRCRCwwQkFzQkM7O0FBRUQsZUFBZTtBQUNmLGFBQWE7QUFDYixRQUFRO0FBQ1Isb0JBQW9CO0FBQ3BCLHdCQUF3QjtBQUN4QixXQUFXO0FBQ1gsa0NBQWtDO0FBQ2xDLGlCQUFpQjtBQUNqQix5QkFBeUI7QUFDekIsNEJBQTRCO0FBQzVCLFlBQVk7QUFDWixVQUFVO0FBQ1YsU0FBUztBQUNULGdCQUFnQjtBQUNoQixNQUFNO0FBQ04sS0FBSyJ9