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
    module.exports = function (__replaceTokens) {
        describe('sugar.js.string.replaceTokens', function () {
            it('Should replace tokens correctly', function (done) {
                var string = __replaceTokens('hello [world] how [are] you?', {
                    world: 'coco',
                    are: 'plop'
                });
                expect(string).toBe('hello coco how plop you?');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map