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
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uLy4uL3BhY2thZ2VzL3Rvb2xzL3N1Z2FyL3NyYy9qcy9kb20vaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxjQUFjOzs7Ozs7Ozs7Ozs7Ozs7SUFFZCx3RUFBaUQ7SUFDakQsa0VBQTRDO0lBQzVDLHNFQUFnRDtJQUNoRCw0RUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLHNCQUFzQixDQUFDLElBQUk7UUFDbEMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXZCLE9BQU8sSUFBSSxtQkFBVSxDQUNuQixDQUFDLEVBQUUsSUFBSSxFQUFFLEVBQUUsRUFBRTtZQUNYLFNBQVMsT0FBTztnQkFDZCx3QkFBZ0IsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUMsR0FBRyxFQUFFO29CQUMvQixJQUFJLFVBQVU7d0JBQUUsT0FBTztvQkFDdkIsSUFBSSxDQUFDLE9BQU8sRUFBRSxJQUFJLENBQUMsQ0FBQztvQkFDcEIsUUFBUSxFQUFFLENBQUM7Z0JBQ2IsQ0FBQyxDQUFDLENBQUM7WUFDTCxDQUFDO1lBQ0QsU0FBUyxRQUFRO2dCQUNmLDJCQUFtQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQyxHQUFHLEVBQUU7b0JBQ2xDLElBQUksVUFBVTt3QkFBRSxPQUFPO29CQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuQixPQUFPLEVBQUUsQ0FBQztnQkFDWixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLHNCQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDO2FBQ1o7aUJBQU07Z0JBQ0wsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSx3QkFBd0I7U0FDN0IsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUUsR0FBRyxFQUFFO1lBQ25CLFVBQVUsR0FBRyxJQUFJLENBQUM7UUFDcEIsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDO0lBQ0Qsa0JBQWUsc0JBQXNCLENBQUMifQ==