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
    module.exports = function (__sprintf) {
        describe('sugar.js.string.sprintf', function () {
            it('Should process the passed string correctly', function (done) {
                var res1 = __sprintf('Hello %s', 'world'); // => Hello world
                var res2 = __sprintf('Hello %s, I\'m %s', 'world', 'John Doe'); // Hello world, I'm John Doe
                var res4 = __sprintf('Hello %(first)s, I\'m %(name)s', { first: 'world', name: 'John Doe' }); // Hello world, I'm John Doe
                expect(res1).toBe('Hello world');
                expect(res2).toBe("Hello world, I'm John Doe");
                expect(res4).toBe("Hello world, I'm John Doe");
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map