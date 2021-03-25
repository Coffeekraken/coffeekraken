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
        define(["require", "exports", "./set"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const set_1 = __importDefault(require("./set"));
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
     * @param       {Object}        object        The object to convert
     * @return      {Object}                      The converted object
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
        const finalObject = {};
        for (const key in object) {
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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcGl6ZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRlZXBpemUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0RBQTBCO0lBQzFCOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0E4Qkc7SUFDSCxTQUFTLE9BQU8sQ0FBQyxNQUFNO1FBQ3JCLE1BQU0sV0FBVyxHQUFHLEVBQUUsQ0FBQztRQUN2QixLQUFLLE1BQU0sR0FBRyxJQUFJLE1BQU0sRUFBRTtZQUN4QixhQUFLLENBQUMsV0FBVyxFQUFFLEdBQUcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQztTQUN0QztRQUNELE9BQU8sV0FBVyxDQUFDO0lBQ3JCLENBQUM7SUFFRCxlQUFlO0lBQ2YsY0FBYztJQUNkLGdDQUFnQztJQUNoQyw4QkFBOEI7SUFDOUIsMEJBQTBCO0lBQzFCLDBDQUEwQztJQUMxQyxPQUFPO0lBQ1AsS0FBSztJQUVMLGtCQUFlLE9BQU8sQ0FBQyJ9