var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../matches"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var matches_1 = __importDefault(require("../matches"));
    describe('sugar.js.dom.matches', function () {
        document.body.innerHTML = "\n      <div id=\"testing\" class=\"hello-world coco\">\n      </div>\n  ";
        var $elm = document.querySelector('#testing');
        it('Should return true on the match testing', function () {
            expect(matches_1.default($elm, '.hello-world, .coco')).toBe(true);
        });
        it('Should return false on the match testing', function () {
            expect(matches_1.default($elm, '.hello-wold, .coco')).toBe(true);
        });
    });
});
//# sourceMappingURL=matches.test.js.map