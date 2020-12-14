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
//# sourceMappingURL=module.js.map