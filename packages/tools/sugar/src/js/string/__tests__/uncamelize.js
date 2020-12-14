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
    module.exports = function (__uncamelize) {
        describe('sugar.js.string.uncamelize', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__uncamelize('helloWorldAndUniverse')).toBe('hello-world-and-universe');
                expect(__uncamelize('helloWorldAndUniverse', '.')).toBe('hello.world.and.universe');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map