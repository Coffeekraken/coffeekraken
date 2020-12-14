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
    module.exports = function (__throttle) {
        describe('sugar.js.function.throttle', function () {
            var calledCount = 0;
            var fn = __throttle(function () {
                calledCount++;
            }, 100);
            fn();
            fn();
            fn();
            fn();
            fn();
            fn();
            setTimeout(function () {
                fn();
                fn();
                fn();
            }, 150);
            it('Should have called the throttled function only 2 times', function (done) {
                setTimeout(function () {
                    expect(calledCount).toBe(2);
                    done();
                }, 200);
            });
        });
    };
});
//# sourceMappingURL=module.js.map