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
    module.exports = function (__debounce) {
        describe('sugar.js.function.debounce', function () {
            var calledCount = 0;
            var myCoolFn = __debounce(function (param1) {
                calledCount++;
            }, 100);
            myCoolFn();
            myCoolFn();
            myCoolFn();
            myCoolFn();
            myCoolFn();
            setTimeout(function () {
                myCoolFn();
            }, 120);
            it('Sould have called the function only 1 time', function (done) {
                setTimeout(function () {
                    expect(calledCount).toBe(1);
                    done();
                }, 130);
            });
        });
    };
});
//# sourceMappingURL=module.js.map