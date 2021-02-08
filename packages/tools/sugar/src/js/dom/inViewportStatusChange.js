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
    return inViewportStatusChange;
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5WaWV3cG9ydFN0YXR1c0NoYW5nZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImluVmlld3BvcnRTdGF0dXNDaGFuZ2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsY0FBYzs7Ozs7Ozs7Ozs7Ozs7SUFFZCxpRUFBNkM7SUFDN0MsZ0VBQTRDO0lBQzVDLG9FQUFnRDtJQUNoRCwwRUFBc0Q7SUFFdEQ7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7T0F5Qkc7SUFDSCxTQUFTLHNCQUFzQixDQUFDLElBQUk7UUFDbEMsSUFBSSxVQUFVLEdBQUcsS0FBSyxDQUFDO1FBRXZCLE9BQU8sSUFBSSxrQkFBVSxDQUNuQixVQUFDLEVBQVE7Z0JBQU4sSUFBSSxVQUFBO1lBQ0wsU0FBUyxPQUFPO2dCQUNkLHdCQUFnQixDQUFDLElBQUksQ0FBQyxDQUFDLElBQUksQ0FBQztvQkFDMUIsSUFBSSxVQUFVO3dCQUFFLE9BQU87b0JBQ3ZCLElBQUksQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLENBQUM7b0JBQ3BCLFFBQVEsRUFBRSxDQUFDO2dCQUNiLENBQUMsQ0FBQyxDQUFDO1lBQ0wsQ0FBQztZQUNELFNBQVMsUUFBUTtnQkFDZiwyQkFBbUIsQ0FBQyxJQUFJLENBQUMsQ0FBQyxJQUFJLENBQUM7b0JBQzdCLElBQUksVUFBVTt3QkFBRSxPQUFPO29CQUN2QixJQUFJLENBQUMsTUFBTSxFQUFFLElBQUksQ0FBQyxDQUFDO29CQUNuQixPQUFPLEVBQUUsQ0FBQztnQkFDWixDQUFDLENBQUMsQ0FBQztZQUNMLENBQUM7WUFFRCw4QkFBOEI7WUFDOUIsSUFBSSxDQUFDLHNCQUFjLENBQUMsSUFBSSxDQUFDLEVBQUU7Z0JBQ3pCLFFBQVEsRUFBRSxDQUFDO2FBQ1o7aUJBQU07Z0JBQ0wsT0FBTyxFQUFFLENBQUM7YUFDWDtRQUNILENBQUMsRUFDRDtZQUNFLEVBQUUsRUFBRSx3QkFBd0I7U0FDN0IsQ0FDRixDQUFDLEVBQUUsQ0FBQyxTQUFTLEVBQUU7WUFDZCxVQUFVLEdBQUcsSUFBSSxDQUFDO1FBQ3BCLENBQUMsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztJQUNELE9BQVMsc0JBQXNCLENBQUMifQ==