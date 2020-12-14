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
    module.exports = function (__extension) {
        describe('sugar.js.file.extension', function () {
            it('Should fine the url extension correctly', function (done) {
                expect(__extension('hello/world/coco.png')).toBe('png');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map