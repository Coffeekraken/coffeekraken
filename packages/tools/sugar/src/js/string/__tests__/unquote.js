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
    module.exports = function (__unquote) {
        describe('sugar.js.string.unquote', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__unquote('"Hello world"')).toBe('Hello world');
                expect(__unquote("'Hello world'")).toBe('Hello world');
                expect(__unquote("”Hello world”")).toBe('Hello world');
                expect(__unquote("`Hello world`")).toBe('Hello world');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map