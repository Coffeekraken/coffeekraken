var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../nodeIndex"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var nodeIndex_1 = __importDefault(require("../nodeIndex"));
    describe('sugar.js.dom.nodeIndex', function () {
        document.body.innerHTML = "\n      \n      <div></div>\n      <div></div>\n      <div id=\"testing\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        it('Should return 2 as node index for the #testing node', function () {
            expect(nodeIndex_1.default($elm)).toBe(2);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibm9kZUluZGV4LnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJub2RlSW5kZXgudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDJEQUF1QztJQUV2QyxRQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFFakMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsOEZBTXpCLENBQUM7UUFDRixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhELEVBQUUsQ0FBQyxxREFBcUQsRUFBRTtZQUN4RCxNQUFNLENBQUMsbUJBQVcsQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUNwQyxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDIn0=