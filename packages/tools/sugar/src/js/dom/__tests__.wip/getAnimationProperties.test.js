var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../getAnimationProperties"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getAnimationProperties_1 = __importDefault(require("../getAnimationProperties"));
    describe('sugar.js.dom.getAnimationProperties', function () {
        document.body.innerHTML = "\n  <style>\n    @keyframes coco {\n      from {\n        opacity: 0;\n      }\n      to {\n        opacity: 1;\n      }\n    }\n    #testing {\n      animation: coco 2s ease-in-out;\n      animation-name: coco;\n    }\n  </style>\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        var props = getAnimationProperties_1.default($elm);
        it('Should find the "testing" element that is up in the dom tree', function () {
            //  expect($testing.id).toBe('testing');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0QW5pbWF0aW9uUHJvcGVydGllcy50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEscUZBQWlFO0lBRWpFLFFBQVEsQ0FBQyxxQ0FBcUMsRUFBRTtRQUU5QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxzUkFpQnpCLENBQUM7UUFDRixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhELElBQU0sS0FBSyxHQUFHLGdDQUF3QixDQUFDLElBQUksQ0FBQyxDQUFDO1FBRTdDLEVBQUUsQ0FBQyw4REFBOEQsRUFBRTtZQUNqRSx3Q0FBd0M7UUFDMUMsQ0FBQyxDQUFDLENBQUM7SUFFTCxDQUFDLENBQUMsQ0FBQyJ9