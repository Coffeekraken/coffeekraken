var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../isVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var isVisible_1 = __importDefault(require("../isVisible"));
    describe('sugar.js.dom.isVisible', function () {
        document.body.innerHTML = "\n      <style>\n        #testing {\n          display: none;\n        }\n      </style>\n      <div id=\"testing\">\n      </div>\n      <div id=\"testing1\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var $elm1 = document.querySelector('#testing1');
        it('Should detect that the div #testing is not visible', function () {
            expect(isVisible_1.default($elm)).toBe(false);
        });
        it('Should detect that the div #testing1 is visible', function () {
            expect(isVisible_1.default($elm1)).toBe(true);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNWaXNpYmxlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJpc1Zpc2libGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDJEQUF1QztJQUV2QyxRQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFFakMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsMktBU3pCLENBQUM7UUFDRixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBQ2hELElBQU0sS0FBSyxHQUFHLFFBQVEsQ0FBQyxhQUFhLENBQUMsV0FBVyxDQUFDLENBQUM7UUFFbEQsRUFBRSxDQUFDLG9EQUFvRCxFQUFFO1lBQ3ZELE1BQU0sQ0FBQyxtQkFBVyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLEtBQUssQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO1FBQ0gsRUFBRSxDQUFDLGlEQUFpRCxFQUFFO1lBQ3BELE1BQU0sQ0FBQyxtQkFBVyxDQUFDLEtBQUssQ0FBQyxDQUFDLENBQUMsSUFBSSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLENBQUMsQ0FBQyxDQUFDO0lBRUwsQ0FBQyxDQUFDLENBQUMifQ==