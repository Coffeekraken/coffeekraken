(function (factory) {
    if (typeof module === "object" && typeof module.exports === "object") {
        var v = factory(require, exports);
        if (v !== undefined) module.exports = v;
    }
    else if (typeof define === "function" && define.amd) {
        define(["require", "exports"], factory);
    }
})(function (require, exports) {
    "use strict";
    module.exports = function (__getTagNameFromHtmlClass) {
        describe('sugar.js.string.getTagNameFromHtmlClass', function () {
            it('Should get back the correct tagname from passed classes', function (done) {
                expect(__getTagNameFromHtmlClass(HTMLAnchorElement)).toBe('a');
                expect(__getTagNameFromHtmlClass(HTMLLinkElement)).toBe('link');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map