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
    module.exports = function (__parseAuthorString) {
        describe('sugar.js.npm.parseAuthorString', function () {
            it('Should parse the passed author string correctly', function (done) {
                expect(__parseAuthorString('Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) ')).toEqual({
                    name: 'Olivier Bossel',
                    email: 'olivier.bossel@gmail.com',
                    url: 'https://olivierbossel.com'
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map