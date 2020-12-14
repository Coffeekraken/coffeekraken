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
    module.exports = function (__autoCast) {
        describe('sugar.js.string.autoCast', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__autoCast('10')).toBe(10);
                expect(__autoCast('{hello:"world"}')).toEqual({
                    hello: 'world'
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map