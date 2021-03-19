var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../emptyNode"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var emptyNode_1 = __importDefault(require("../emptyNode"));
    describe('sugar.js.dom.emptyNode', function () {
        document.body.innerHTML = "\n      <div id=\"testing\">\n        <div class=\"coco\">\n        </div>\n        <div id=\"source\"></div>\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        emptyNode_1.default($elm);
        it('Should have empty the node correctly', function () {
            expect($elm.childNodes.length).toBe(0);
        });
    });
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZW1wdHlOb2RlLnRlc3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJlbXB0eU5vZGUudGVzdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztJQUFBLDJEQUF1QztJQUV2QyxRQUFRLENBQUMsd0JBQXdCLEVBQUU7UUFFakMsUUFBUSxDQUFDLElBQUksQ0FBQyxTQUFTLEdBQUcsaUlBTXpCLENBQUM7UUFDRixJQUFNLElBQUksR0FBRyxRQUFRLENBQUMsYUFBYSxDQUFDLFVBQVUsQ0FBQyxDQUFDO1FBRWhELG1CQUFXLENBQUMsSUFBSSxDQUFDLENBQUM7UUFFbEIsRUFBRSxDQUFDLHNDQUFzQyxFQUFFO1lBQ3pDLE1BQU0sQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLE1BQU0sQ0FBQyxDQUFDLElBQUksQ0FBQyxDQUFDLENBQUMsQ0FBQztRQUN6QyxDQUFDLENBQUMsQ0FBQztJQUVMLENBQUMsQ0FBQyxDQUFDIn0=