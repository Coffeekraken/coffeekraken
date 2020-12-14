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
    module.exports = function (__decodeHtmlEntities) {
        describe('sugar.js.string.decodeHtmlEntities', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__decodeHtmlEntities('&#111;&#108;&#105;&#118;&#105;&#101;&#114;&#046;&#098;&#111;&#115;&#115;&#101;&#108;&#064;&#103;&#109;&#097;&#105;&#108;&#046;&#099;&#111;&#109;')).toBe('olivier.bossel@gmail.com');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map