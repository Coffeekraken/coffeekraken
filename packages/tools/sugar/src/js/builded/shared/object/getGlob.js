// @ts-nocheck
// @shared
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
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
    var minimatch_1 = __importDefault(require("minimatch"));
    var flatten_1 = __importDefault(require("./flatten"));
    var deepize_1 = __importDefault(require("./deepize"));
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
    function getGlob(obj, glob, settings) {
        if (settings === void 0) { settings = {}; }
        settings = __assign({ deepize: true }, settings);
        var flat = flatten_1.default(obj);
        var resultObj = {};
        Object.keys(flat).forEach(function (path) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0R2xvYi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NoYXJlZC9vYmplY3QvZ2V0R2xvYi50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjO0FBQ2QsVUFBVTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7SUFFVix3REFBb0M7SUFDcEMsc0RBQWtDO0lBQ2xDLHNEQUFrQztJQUlsQzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BMkJHO0lBQ0gsU0FBd0IsT0FBTyxDQUFDLEdBQUcsRUFBRSxJQUFJLEVBQUUsUUFBYTtRQUFiLHlCQUFBLEVBQUEsYUFBYTtRQUN0RCxRQUFRLGNBQ04sT0FBTyxFQUFFLElBQUksSUFDVixRQUFRLENBQ1osQ0FBQztRQUVGLElBQU0sSUFBSSxHQUFHLGlCQUFTLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFNUIsSUFBTSxTQUFTLEdBQUcsRUFBRSxDQUFDO1FBRXJCLE1BQU0sQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtZQUM3QixJQUFJLG1CQUFXLENBQUMsSUFBSSxFQUFFLElBQUksQ0FBQyxFQUFFO2dCQUMzQixTQUFTLENBQUMsSUFBSSxDQUFDLEdBQUcsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO2FBQzlCO1FBQ0gsQ0FBQyxDQUFDLENBQUM7UUFFSCwwQkFBMEI7UUFDMUIsb0NBQW9DO1FBQ3BDLElBQUk7UUFFSixJQUFJLFFBQVEsQ0FBQyxPQUFPLEtBQUssSUFBSTtZQUFFLE9BQU8saUJBQVMsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUMzRCxPQUFPLFNBQVMsQ0FBQztJQUNuQixDQUFDO0lBdEJELDBCQXNCQzs7QUFFRCxlQUFlO0FBQ2YsYUFBYTtBQUNiLFFBQVE7QUFDUixvQkFBb0I7QUFDcEIsd0JBQXdCO0FBQ3hCLFdBQVc7QUFDWCxrQ0FBa0M7QUFDbEMsaUJBQWlCO0FBQ2pCLHlCQUF5QjtBQUN6Qiw0QkFBNEI7QUFDNUIsWUFBWTtBQUNaLFVBQVU7QUFDVixTQUFTO0FBQ1QsZ0JBQWdCO0FBQ2hCLE1BQU07QUFDTixLQUFLIn0=