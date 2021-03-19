var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../detectInOutDirection", "../dispatchEvent"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var detectInOutDirection_1 = __importDefault(require("../detectInOutDirection"));
    var dispatchEvent_1 = __importDefault(require("../dispatchEvent"));
    describe('sugar.js.dom.detectInOutDirection', function () {
        document.body.innerHTML = "\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        var isInTriggered = false, isOutTriggered = false, isThenTriggered = false;
        detectInOutDirection_1.default($elm)
            .on('in', function (direction) {
            isInTriggered = true;
        })
            .on('out', function (direction) {
            isOutTriggered = true;
        })
            .then(function (value) {
            isThenTriggered = true;
        });
        dispatchEvent_1.default($elm, 'mouseenter');
        dispatchEvent_1.default($elm, 'mouseleave');
        it('Should have trigger the "in" stack correctly', function () {
            setTimeout(function () {
                expect(isInTriggered).toBe(true);
            });
        });
        it('Should have trigger the "out" stack correctly', function () {
            setTimeout(function () {
                expect(isOutTriggered).toBe(true);
            });
        });
        it('Should have trigger the "then" stack correctly', function () {
            setTimeout(function () {
                expect(isThenTriggered).toBe(true);
            });
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGV0ZWN0SW5PdXREaXJlY3Rpb24udGVzdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImRldGVjdEluT3V0RGlyZWN0aW9uLnRlc3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7SUFBQSxpRkFBNkQ7SUFDN0QsbUVBQStDO0lBRS9DLFFBQVEsQ0FBQyxtQ0FBbUMsRUFBRTtRQUM1QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxnREFHekIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFFaEQsSUFBSSxhQUFhLEdBQUcsS0FBSyxFQUN2QixjQUFjLEdBQUcsS0FBSyxFQUN0QixlQUFlLEdBQUcsS0FBSyxDQUFDO1FBRTFCLDhCQUFzQixDQUFDLElBQUksQ0FBQzthQUN6QixFQUFFLENBQUMsSUFBSSxFQUFFLFVBQUMsU0FBUztZQUNsQixhQUFhLEdBQUcsSUFBSSxDQUFDO1FBQ3ZCLENBQUMsQ0FBQzthQUNELEVBQUUsQ0FBQyxLQUFLLEVBQUUsVUFBQyxTQUFTO1lBQ25CLGNBQWMsR0FBRyxJQUFJLENBQUM7UUFDeEIsQ0FBQyxDQUFDO2FBQ0QsSUFBSSxDQUFDLFVBQUMsS0FBSztZQUNWLGVBQWUsR0FBRyxJQUFJLENBQUM7UUFDekIsQ0FBQyxDQUFDLENBQUM7UUFFTCx1QkFBZSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUNwQyx1QkFBZSxDQUFDLElBQUksRUFBRSxZQUFZLENBQUMsQ0FBQztRQUVwQyxFQUFFLENBQUMsOENBQThDLEVBQUU7WUFDakQsVUFBVSxDQUFDO2dCQUNULE1BQU0sQ0FBQyxhQUFhLENBQUMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQUM7WUFDbkMsQ0FBQyxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUMsQ0FBQztRQUNILEVBQUUsQ0FBQywrQ0FBK0MsRUFBRTtZQUNsRCxVQUFVLENBQUM7Z0JBQ1QsTUFBTSxDQUFDLGNBQWMsQ0FBQyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNwQyxDQUFDLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGdEQUFnRCxFQUFFO1lBQ25ELFVBQVUsQ0FBQztnQkFDVCxNQUFNLENBQUMsZUFBZSxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ3JDLENBQUMsQ0FBQyxDQUFDO1FBQ0wsQ0FBQyxDQUFDLENBQUM7SUFDTCxDQUFDLENBQUMsQ0FBQyJ9