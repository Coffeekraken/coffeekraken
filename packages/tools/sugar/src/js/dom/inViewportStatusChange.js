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
        define(["require", "exports", "../promise/SPromise", "./isInViewport", "./whenInViewport", "./whenOutOfViewport"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var SPromise_1 = __importDefault(require("../promise/SPromise"));
    var isInViewport_1 = __importDefault(require("./isInViewport"));
    var whenInViewport_1 = __importDefault(require("./whenInViewport"));
    var whenOutOfViewport_1 = __importDefault(require("./whenOutOfViewport"));
    /**
     * @name      inViewportStatusChange
     * @namespace           sugar.js.dom
     * @type      Function
     * @stable
     *
     * Monitor when the passed element enter or exit the viewport
     *
     * @param 		{HTMLElement} 						elm  		The element to monitor
     * @return 		{SPromise} 		                    The SPromise on wich you can register your callbacks. Available callbacks registration function are "enter" and "exit"
     *
     * @todo      interface
     * @todo      doc
     * @todo      tests
     *
     * @example  	js
     * import inViewportStatusChange from '@coffeekraken/sugar/js/dom/inViewportStatusChange';
     * inViewportStatusChange(myElm).enter($elm => {
     *    // do something...
     * }).exit($elm => {
     *    // do something...
     * });
     *
     * @since         1.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    function inViewportStatusChange($elm) {
        var isFinished = false;
        return new SPromise_1.default(function (_a) {
            var emit = _a.emit;
            function _whenIn() {
                whenInViewport_1.default($elm).then(function () {
                    if (isFinished)
                        return;
                    emit('enter', $elm);
                    _whenOut();
                });
            }
            function _whenOut() {
                whenOutOfViewport_1.default($elm).then(function () {
                    if (isFinished)
                        return;
                    emit('exit', $elm);
                    _whenIn();
                });
            }
            // if not in viewport at start
            if (!isInViewport_1.default($elm)) {
                _whenOut();
            }
            else {
                _whenIn();
            }
        }, {
            id: 'inViewportStatisChange'
        }).on('finally', function () {
            isFinished = true;
        });
    }
    exports.default = inViewportStatusChange;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnRTdGF0dXNDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsaUVBQTZDO0lBQzdDLGdFQUE0QztJQUM1QyxvRUFBZ0Q7SUFDaEQsMEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxJQUFJO1FBQ2xDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV2QixPQUFPLElBQUksa0JBQVUsQ0FDbkIsVUFBQyxFQUFRO2dCQUFOLElBQUksVUFBQTtZQUNMLFNBQVMsT0FBTztnQkFDZCx3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzFCLElBQUksVUFBVTt3QkFBRSxPQUFPO29CQUN2QixJQUFJLENBQUMsT0FBTyxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNwQixRQUFRLEVBQUUsQ0FBQztnQkFDYixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFDRCxTQUFTLFFBQVE7Z0JBQ2YsMkJBQW1CLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDO29CQUM3QixJQUFJLFVBQVU7d0JBQUUsT0FBTztvQkFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxzQkFBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QixRQUFRLEVBQUUsQ0FBQzthQUNaO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsd0JBQXdCO1NBQzdCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFO1lBQ2QsVUFBVSxHQUFHLElBQUksQ0FBQztRQUNwQixDQUFDLENBQUMsQ0FBQztJQUNMLENBQUM7SUFDRCxrQkFBZSxzQkFBc0IsQ0FBQyJ9