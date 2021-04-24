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
     * @name                      delete
     * @namespace            js.object
     * @type                      Function
     * @stable
     *
     * Delete an object property using a dotPath like "something.else"
     *
     * @param         {Object}          object            The object on which you want to delete the property
     * @param         {String}          dotPath           The dotpath to the property you want to delete
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
        const parentDotPath = dotPath.split('.').slice(0, -1).join('.');
        if (!dotPath || dotPath === '' || dotPath === '.')
            return object;
        dotPath = dotPath.replace(/\[(\w+)\]/g, '.$1');
        dotPath = dotPath.replace(/^\./, '');
        const a = dotPath.split('.');
        let o = object;
        while (a.length) {
            const n = a.shift();
            if (a.length < 1) {
                if (Array.isArray(o)) {
                    const valueToDelete = o[n];
                    o = o.filter((v) => {
                        return v !== valueToDelete;
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
        }
        return object;
    }
    exports.default = del;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVsZXRlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZGVsZXRlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLGNBQWM7Ozs7Ozs7Ozs7Ozs7OztJQUVkLGdEQUEwQjtJQUUxQjs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXlCRztJQUNILFNBQVMsR0FBRyxDQUFDLE1BQU0sRUFBRSxPQUFPO1FBQzFCLE1BQU0sYUFBYSxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUMsS0FBSyxDQUFDLENBQUMsRUFBRSxDQUFDLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLENBQUMsQ0FBQztRQUVoRSxJQUFJLENBQUMsT0FBTyxJQUFJLE9BQU8sS0FBSyxFQUFFLElBQUksT0FBTyxLQUFLLEdBQUc7WUFBRSxPQUFPLE1BQU0sQ0FBQztRQUNqRSxPQUFPLEdBQUcsT0FBTyxDQUFDLE9BQU8sQ0FBQyxZQUFZLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDL0MsT0FBTyxHQUFHLE9BQU8sQ0FBQyxPQUFPLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ3JDLE1BQU0sQ0FBQyxHQUFHLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxDQUFDLENBQUM7UUFDN0IsSUFBSSxDQUFDLEdBQUcsTUFBTSxDQUFDO1FBQ2YsT0FBTyxDQUFDLENBQUMsTUFBTSxFQUFFO1lBQ2YsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLEtBQUssRUFBRSxDQUFDO1lBQ3BCLElBQUksQ0FBQyxDQUFDLE1BQU0sR0FBRyxDQUFDLEVBQUU7Z0JBQ2hCLElBQUksS0FBSyxDQUFDLE9BQU8sQ0FBQyxDQUFDLENBQUMsRUFBRTtvQkFDcEIsTUFBTSxhQUFhLEdBQUcsQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO29CQUMzQixDQUFDLEdBQUcsQ0FBQyxDQUFDLE1BQU0sQ0FBQyxDQUFDLENBQUMsRUFBRSxFQUFFO3dCQUNqQixPQUFPLENBQUMsS0FBSyxhQUFhLENBQUM7b0JBQzdCLENBQUMsQ0FBQyxDQUFDO2lCQUNKO3FCQUFNO29CQUNMLE9BQU8sQ0FBQyxDQUFDLENBQUMsQ0FBQyxDQUFDO2lCQUNiO2dCQUNELGFBQUssQ0FBQyxNQUFNLEVBQUUsYUFBYSxFQUFFLENBQUMsQ0FBQyxDQUFDO2FBQ2pDO2lCQUFNO2dCQUNMLENBQUMsR0FBRyxDQUFDLENBQUMsQ0FBQyxDQUFDLENBQUM7YUFDVjtTQUNGO1FBQ0QsT0FBTyxNQUFNLENBQUM7SUFDaEIsQ0FBQztJQUNELGtCQUFlLEdBQUcsQ0FBQyJ9