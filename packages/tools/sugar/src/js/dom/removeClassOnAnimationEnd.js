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
        define(["require", "exports", "./addEventListenerOnce", "@coffeekraken/s-promise"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var addEventListenerOnce_1 = __importDefault(require("./addEventListenerOnce"));
    var s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    /**
     * @name      removeClassOnAnimationEnd
     * @namespace            js.dom
     * @type      Function
     * @stable
     *
     * Remove some class on animation end
     *
     * @param    {HTMLElement}    elm    The element to take care of
     * @param    {String|Array}    class    The class or classes (Array) to remove
     * @return   {Promise}                  A promise that will be resolved once the class has been removed and the animation finished
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example    js
     * import removeClassOnAnimationEnd from '@coffeekraken/sugar/js/dom/removeClassOnAnimationEnd'
     * removeClassOnAnimationEnd(myCoolElm, 'my-class');
     *
     * @since       1.0.0
     * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function removeClassOnAnimationEnd($elm, cls) {
        return new s_promise_1.default(function (_a) {
            var resolve = _a.resolve;
            // listen for animation end on the element just once
            addEventListenerOnce_1.default($elm, 'animationend', function (e) {
                if (!Array.isArray(cls))
                    cls = [cls];
                // remove the cls
                cls.forEach(function (_cls) {
                    $elm.classList.remove(_cls);
                });
                // resolve the process
                resolve(e);
            });
        }, {
            id: 'removeClassOnAnimationEnd'
        });
    }
    exports.default = removeClassOnAnimationEnd;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVtb3ZlQ2xhc3NPbkFuaW1hdGlvbkVuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInJlbW92ZUNsYXNzT25BbmltYXRpb25FbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsZ0ZBQTREO0lBQzVELHNFQUFpRDtJQUVqRDs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztPQXNCRztJQUNILFNBQVMseUJBQXlCLENBQUMsSUFBSSxFQUFFLEdBQUc7UUFDMUMsT0FBTyxJQUFJLG1CQUFVLENBQ25CLFVBQUMsRUFBVztnQkFBVCxPQUFPLGFBQUE7WUFDUixvREFBb0Q7WUFDcEQsOEJBQXNCLENBQUMsSUFBSSxFQUFFLGNBQWMsRUFBRSxVQUFDLENBQUM7Z0JBQzdDLElBQUksQ0FBQyxLQUFLLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQztvQkFBRSxHQUFHLEdBQUcsQ0FBQyxHQUFHLENBQUMsQ0FBQztnQkFDckMsaUJBQWlCO2dCQUNqQixHQUFHLENBQUMsT0FBTyxDQUFDLFVBQUMsSUFBSTtvQkFDZixJQUFJLENBQUMsU0FBUyxDQUFDLE1BQU0sQ0FBQyxJQUFJLENBQUMsQ0FBQztnQkFDOUIsQ0FBQyxDQUFDLENBQUM7Z0JBQ0gsc0JBQXNCO2dCQUN0QixPQUFPLENBQUMsQ0FBQyxDQUFDLENBQUM7WUFDYixDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSwyQkFBMkI7U0FDaEMsQ0FDRixDQUFDO0lBQ0osQ0FBQztJQUNELGtCQUFlLHlCQUF5QixDQUFDIn0=