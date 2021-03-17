// @ts-nocheck
// @shared
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "./set"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var set_1 = __importDefault(require("./set"));
    /**
     * @name          deepize
     * @namespace     sugar.js.object
     * @type          Function
     * @stable
     *
     * This function simply take an object like this one:
     * {
     *    'something.cool': 'hello'
     * }
     * and convert it to something like this:
     * {
     *    something: {
     *      cool: 'hello'
     *    }
     * }
     *
     * @param       {Object}        object        The object to convert
     * @return      {Object}                      The converted object
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example       js
     * import deepize from '@coffeekraken/sugar/js/object/deepize';
     * deepize({ 'something.cool': 'hello' }); // => { something: { cool: 'hello' } }
     *
     * @since       2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function deepize(object) {
        var finalObject = {};
        for (var key in object) {
            set_1.default(finalObject, key, object[key]);
        }
        return finalObject;
    }
    // console.log(
    //   deepize({
    //     'someting.cool': 'hello',
    //     'you.coco[0]': 'hello',
    //     'coco[1]': 'world',
    //     'world."coco.plop".yep': 'dsojiofj'
    //   })
    // );
    exports.default = deepize;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zaGFyZWQvb2JqZWN0L2RlZXBpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDhDQUEwQjtJQUMxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BOEJHO0lBQ0gsU0FBUyxPQUFPLENBQUMsTUFBTTtRQUNyQixJQUFNLFdBQVcsR0FBRyxFQUFFLENBQUM7UUFDdkIsS0FBSyxJQUFNLEdBQUcsSUFBSSxNQUFNLEVBQUU7WUFDeEIsYUFBSyxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUUsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLENBQUM7U0FDdEM7UUFDRCxPQUFPLFdBQVcsQ0FBQztJQUNyQixDQUFDO0lBRUQsZUFBZTtJQUNmLGNBQWM7SUFDZCxnQ0FBZ0M7SUFDaEMsOEJBQThCO0lBQzlCLDBCQUEwQjtJQUMxQiwwQ0FBMEM7SUFDMUMsT0FBTztJQUNQLEtBQUs7SUFFTCxrQkFBZSxPQUFPLENBQUMifQ==