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
    module.exports = function (__crop) {
        describe('sugar.js.string.crop', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
                    splitWords: true
                })).toBe('<span>Lorem Ipsum is</span> simply dum...');
                expect(__crop("<span>Lorem Ipsum is</span> simply dummy text of the printing and typesetting industry.", 28, {
                    splitWords: false,
                    chars: '_-_'
                })).toBe('<span>Lorem Ipsum is</span> simply_-_');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map