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
    module.exports = function (__splitEvery) {
        describe('sugar.js.string.splitEvery', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__splitEvery('aaaaaaaaaaaaaaaaaaaaa', 3, true)).toEqual([
                    'aaa',
                    'aaa',
                    'aaa',
                    'aaa',
                    'aaa',
                    'aaa',
                    'aaa',
                ]);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map