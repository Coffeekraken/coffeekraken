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
     * @name                      delete
     * @namespace           sugar.js.object
     * @type                      Function
     * @stable
     *
     * Delete an object property using a dotPath like "something.else"
     *
     * @param         {Object}          object            The object on which you want to delete the property
     * @param         {String}          dotPath           The dotpath to the property you want to delete
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example         js
     * import delete from '@coffeekraken/sugar/js/object/delete';
     * const myObject = {
     *    hello: 'world',
     *    plop: 'yop'
     * };
     * delete(myObject, 'plop');
     *
     * @since     2.0.0
     * @author  Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function del(object, dotPath) {
        var parentDotPath = dotPath.split('.').slice(0, -1).join('.');
        if (!dotPath || dotPath === '' || dotPath === '.')
            return object;
        dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
        dotPath = dotPath.replace(/^\./, '');
        var a = dotPath.split('.');
        var o = object;
        var _loop_1 = function () {
            var n = a.shift();
            if (a.length < 1) {
                if (Array.isArray(o)) {
                    var valueToDelete_1 = o[n];
                    o = o.filter(function (v) {
                        return v !== valueToDelete_1;
                    });
                }
                else {
                    delete o[n];
                }
                set_1.default(object, parentDotPath, o);
            }
            else {
                o = o[n];
            }
        };
        while (a.length) {
            _loop_1();
        }
        return object;
    }
    exports.default = del;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc2hhcmVkL29iamVjdC9kZWxldGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYztBQUNkLFVBQVU7Ozs7Ozs7Ozs7Ozs7OztJQUVWLDhDQUEwQjtJQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPO1FBQzFCLElBQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxFQUFFLElBQUksT0FBTyxLQUFLLEdBQUc7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNqRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLElBQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDOztZQUViLElBQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxLQUFLLEVBQUUsQ0FBQztZQUNwQixJQUFJLENBQUMsQ0FBQyxNQUFNLEdBQUcsQ0FBQyxFQUFFO2dCQUNoQixJQUFJLEtBQUssQ0FBQyxPQUFPLENBQUMsQ0FBQyxDQUFDLEVBQUU7b0JBQ3BCLElBQU0sZUFBYSxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQztvQkFDM0IsQ0FBQyxHQUFHLENBQUMsQ0FBQyxNQUFNLENBQUMsVUFBQyxDQUFDO3dCQUNiLE9BQU8sQ0FBQyxLQUFLLGVBQWEsQ0FBQztvQkFDN0IsQ0FBQyxDQUFDLENBQUM7aUJBQ0o7cUJBQU07b0JBQ0wsT0FBTyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7aUJBQ2I7Z0JBQ0QsYUFBSyxDQUFDLE1BQU0sRUFBRSxhQUFhLEVBQUUsQ0FBQyxDQUFDLENBQUM7YUFDakM7aUJBQU07Z0JBQ0wsQ0FBQyxHQUFHLENBQUMsQ0FBQyxDQUFDLENBQUMsQ0FBQzthQUNWOztRQWRILE9BQU8sQ0FBQyxDQUFDLE1BQU07O1NBZWQ7UUFDRCxPQUFPLE1BQU0sQ0FBQztJQUNoQixDQUFDO0lBQ0Qsa0JBQWUsR0FBRyxDQUFDIn0=