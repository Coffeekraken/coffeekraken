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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3NoYXJlZC9vYmplY3QvZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7QUFDZCxVQUFVOzs7Ozs7Ozs7Ozs7Ozs7SUFFViw4Q0FBMEI7SUFFMUI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLEdBQUcsQ0FBQyxNQUFNLEVBQUUsT0FBTztRQUMxQixJQUFNLGFBQWEsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssQ0FBQyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFaEUsSUFBSSxDQUFDLE9BQU8sSUFBSSxPQUFPLEtBQUssRUFBRSxJQUFJLE9BQU8sS0FBSyxHQUFHO1lBQUUsT0FBTyxNQUFNLENBQUM7UUFDakUsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsWUFBWSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQy9DLE9BQU8sR0FBRyxPQUFPLENBQUMsT0FBTyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNyQyxJQUFNLENBQUMsR0FBRyxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsQ0FBQyxDQUFDO1FBQzdCLElBQUksQ0FBQyxHQUFHLE1BQU0sQ0FBQzs7WUFFYixJQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxFQUFFLENBQUM7WUFDcEIsSUFBSSxDQUFDLENBQUMsTUFBTSxHQUFHLENBQUMsRUFBRTtnQkFDaEIsSUFBSSxLQUFLLENBQUMsT0FBTyxDQUFDLENBQUMsQ0FBQyxFQUFFO29CQUNwQixJQUFNLGVBQWEsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7b0JBQzNCLENBQUMsR0FBRyxDQUFDLENBQUMsTUFBTSxDQUFDLFVBQUMsQ0FBQzt3QkFDYixPQUFPLENBQUMsS0FBSyxlQUFhLENBQUM7b0JBQzdCLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiO2dCQUNELGFBQUssQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDVjs7UUFkSCxPQUFPLENBQUMsQ0FBQyxNQUFNOztTQWVkO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLEdBQUcsQ0FBQyJ9