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
    module.exports = function (__extractSame) {
        describe('sugar.js.string.extractSame', function () {
            it('Should process the passed string correctly', function (done) {
                var res = __extractSame("Hello world how are you?", "Hello world it's me", false);
                expect(res).toBe('Hello world ');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map