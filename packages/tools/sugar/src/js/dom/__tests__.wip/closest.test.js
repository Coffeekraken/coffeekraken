var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../closest"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var closest_1 = __importDefault(require("../closest"));
    describe('sugar.js.dom.closest', function () {
        document.body.innerHTML = "\n      <div id=\"testing\">\n        <div class=\"coco\">\n          <div id=\"source\"></div>\n        </div>\n      </div>\n  ";
        var $elm = document.querySelector('#source');
        it('Should find the "testing" element that is up in the dom tree', function () {
            var $testing = closest_1.default($elm, '#testing');
            expect($testing.id).toBe('testing');
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xvc2VzdC50ZXN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY2xvc2VzdC50ZXN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0lBQUEsdURBQW1DO0lBRW5DLFFBQVEsQ0FBQyxzQkFBc0IsRUFBRTtRQUUvQixRQUFRLENBQUMsSUFBSSxDQUFDLFNBQVMsR0FBRyxtSUFNekIsQ0FBQztRQUNGLElBQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0MsRUFBRSxDQUFDLDhEQUE4RCxFQUFFO1lBQ2pFLElBQU0sUUFBUSxHQUFHLGlCQUFTLENBQUMsSUFBSSxFQUFFLFVBQVUsQ0FBQyxDQUFDO1lBQzdDLE1BQU0sQ0FBQyxRQUFRLENBQUMsRUFBRSxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3RDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUMifQ==