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
        define(["require", "exports", "@coffeekraken/s-promise", "./isInViewport", "./whenInViewport", "./whenOutOfViewport"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    const s_promise_1 = __importDefault(require("@coffeekraken/s-promise"));
    const isInViewport_1 = __importDefault(require("./isInViewport"));
    const whenInViewport_1 = __importDefault(require("./whenInViewport"));
    const whenOutOfViewport_1 = __importDefault(require("./whenOutOfViewport"));
    /**
     * @name      inViewportStatusChange
     * @namespace            js.dom
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
        let isFinished = false;
        return new s_promise_1.default(({ emit }) => {
            function _whenIn() {
                whenInViewport_1.default($elm).then(() => {
                    if (isFinished)
                        return;
                    emit('enter', $elm);
                    _whenOut();
                });
            }
            function _whenOut() {
                whenOutOfViewport_1.default($elm).then(() => {
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
        }).on('finally', () => {
            isFinished = true;
        });
    }
    exports.default = inViewportStatusChange;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnRTdGF0dXNDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7O0lBRWQsd0VBQWlEO0lBQ2pELGtFQUE0QztJQUM1QyxzRUFBZ0Q7SUFDaEQsNEVBQXNEO0lBRXREOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O09BeUJHO0lBQ0gsU0FBUyxzQkFBc0IsQ0FBQyxJQUFJO1FBQ2xDLElBQUksVUFBVSxHQUFHLEtBQUssQ0FBQztRQUV2QixPQUFPLElBQUksbUJBQVUsQ0FDbkIsQ0FBQyxFQUFFLElBQUksRUFBRSxFQUFFLEVBQUU7WUFDWCxTQUFTLE9BQU87Z0JBQ2Qsd0JBQWdCLENBQUMsSUFBSSxDQUFDLENBQUMsSUFBSSxDQUFDLEdBQUcsRUFBRTtvQkFDL0IsSUFBSSxVQUFVO3dCQUFFLE9BQU87b0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLFFBQVEsRUFBRSxDQUFDO2dCQUNiLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELFNBQVMsUUFBUTtnQkFDZiwyQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUNsQyxJQUFJLFVBQVU7d0JBQUUsT0FBTztvQkFDdkIsSUFBSSxDQUFDLE1BQU0sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDbkIsT0FBTyxFQUFFLENBQUM7Z0JBQ1osQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBRUQsOEJBQThCO1lBQzlCLElBQUksQ0FBQyxzQkFBYyxDQUFDLElBQUksQ0FBQyxFQUFFO2dCQUN6QixRQUFRLEVBQUUsQ0FBQzthQUNaO2lCQUFNO2dCQUNMLE9BQU8sRUFBRSxDQUFDO2FBQ1g7UUFDSCxDQUFDLEVBQ0Q7WUFDRSxFQUFFLEVBQUUsd0JBQXdCO1NBQzdCLENBQ0YsQ0FBQyxFQUFFLENBQUMsU0FBUyxFQUFFLEdBQUcsRUFBRTtZQUNuQixVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELGtCQUFlLHNCQUFzQixDQUFDIn0=