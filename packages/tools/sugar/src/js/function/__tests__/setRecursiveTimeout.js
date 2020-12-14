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
    module.exports = function (__setRecursiveTimeout) {
        describe('sugar.js.function.setRecursiveTimeout', function () {
            var calledCount = 0;
            __setRecursiveTimeout(function () {
                calledCount++;
            }, 100, 1000);
            it('Sould have called the function 10 times in 1s', function (done) {
                setTimeout(function () {
                    expect(calledCount).toBe(10);
                    done();
                }, 1100);
            });
        });
    };
});
//# sourceMappingURL=module.js.map