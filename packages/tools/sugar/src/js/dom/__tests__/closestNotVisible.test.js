var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../closestNotVisible"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var closestNotVisible_1 = __importDefault(require("../closestNotVisible"));
    describe('sugar.js.dom.closestNotVisible', function () {
        document.body.innerHTML = "\n  <style>\n    #testing {\n      display: none;\n    }\n  </style>\n      <div id=\"testing\">\n        <div class=\"coco testing\">\n          <div id=\"source\"></div>\n        </div>\n      </div>\n  ";
        var $elm = document.querySelector('#source');
        it('Should find the "testing" element that is up in the dom tree', function () {
            var $testing = closestNotVisible_1.default($elm, '.testing');
            expect($testing.id).toBe('testing');
        });
    });
});
//# sourceMappingURL=module.js.map