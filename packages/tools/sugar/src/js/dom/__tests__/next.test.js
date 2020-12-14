var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports", "../next"], factory);
    }
})(function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var next_1 = __importDefault(require("../next"));
    describe('sugar.js.dom.next', function () {
        document.body.innerHTML = "\n      <div id=\"testing\"></div>\n      <div id=\"next1\"></div>\n      <div id=\"next2\"></div>\n  ";
        var $elm = document.querySelector('#testing');
        var $next2 = document.querySelector('#next2');
        var $finded = next_1.default($elm, '#next2');
        it('Should find the $next2 element from the $testing one', function () {
            expect($finded).toEqual($next2);
        });
    });
});
//# sourceMappingURL=module.js.map