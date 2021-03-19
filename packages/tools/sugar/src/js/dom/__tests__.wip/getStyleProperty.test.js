var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../getStyleProperty"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var getStyleProperty_1 = __importDefault(require("../getStyleProperty"));
    describe('sugar.js.dom.getStyleProperty', function () {
        document.body.innerHTML = "\n      <style>\n          #testing {\n            content: 'hello world';\n            animation: coco 2s ease-in-out 3s;\n          }\n      </style>\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        it('Should get the "content" css property correctly', function () {
            expect(getStyleProperty_1.default($elm, 'content')).toBe('hello world');
        });
        it('Should get the "animation" css property correctly', function () {
            expect(getStyleProperty_1.default($elm, 'animation')).toBe('coco 2s ease-in-out 3s');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0U3R5bGVQcm9wZXJ0eS50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiZ2V0U3R5bGVQcm9wZXJ0eS50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEseUVBQXFEO0lBRXJELFFBQVEsQ0FBQywrQkFBK0IsRUFBRTtRQUV4QyxRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyx1TUFTekIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsVUFBVSxDQUFDLENBQUM7UUFJaEQsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1lBQ3BELE1BQU0sQ0FBQywwQkFBa0IsQ0FBQyxJQUFJLEVBQUUsU0FBUyxDQUFDLENBQUMsQ0FBQyxJQUFJLENBQUMsYUFBYSxDQUFDLENBQUM7UUFDbEUsQ0FBQyxDQUFDLENBQUM7UUFDSCxFQUFFLENBQUMsbURBQW1ELEVBQUU7WUFDdEQsTUFBTSxDQUFDLDBCQUFrQixDQUFDLElBQUksRUFBRSxXQUFXLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyx3QkFBd0IsQ0FBQyxDQUFDO1FBQy9FLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUMifQ==