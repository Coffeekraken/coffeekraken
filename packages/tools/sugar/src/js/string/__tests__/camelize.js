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
    module.exports = function (__camelize) {
        describe('sugar.js.string.camelize', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__camelize('hello world')).toBe('helloWorld');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map