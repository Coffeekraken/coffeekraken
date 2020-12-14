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
    module.exports = function (__toString) {
        describe('sugar.js.string.toString', function () {
            it('Should process the passed string correctly', function (done) {
                var date = new Date();
                var dateString = date.toString();
                expect(__toString(true)).toBe('true');
                expect(__toString(false)).toBe('false');
                expect(__toString({
                    hello: 'world'
                })).toBe('{"hello":"world"}');
                expect(__toString(function helloWorld() { })).toBe('function helloWorld() {}');
                expect(__toString(date)).toBe(dateString);
                expect(__toString([
                    'hello', 'world'
                ])).toBe('["hello","world"]');
                expect(__toString(/(.*)/gm)).toBe('/(.*)/gm');
                expect(__toString(10)).toBe('10');
                expect(__toString(null)).toBe('null');
                expect(__toString(undefined)).toBe('undefined');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map