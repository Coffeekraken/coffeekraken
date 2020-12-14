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
    module.exports = function (__getHtmlClassFromTagName) {
        describe('sugar.js.string.getHtmlClassFromTagName', function () {
            it('Should get back the correct HTMLElement class from passed tags', function (done) {
                expect(__getHtmlClassFromTagName('a')).toBe(HTMLAnchorElement);
                expect(__getHtmlClassFromTagName('link')).toBe(HTMLLinkElement);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map