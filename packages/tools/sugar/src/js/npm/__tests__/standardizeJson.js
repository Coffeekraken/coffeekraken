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
    module.exports = function (__standardizeJson) {
        describe('sugar.js.nav.SNav', function () {
            it('Should standardize the passed json', function (done) {
                expect(__standardizeJson({
                    contributors: [
                        {
                            name: 'Olivier Bossel',
                            email: 'olivier.bossel@gmail.com',
                            url: 'https://olivierbossel.com'
                        },
                        'Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)'
                    ],
                    author: 'Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com) '
                })).toEqual({
                    contributors: [
                        {
                            name: 'Olivier Bossel',
                            email: 'olivier.bossel@gmail.com',
                            url: 'https://olivierbossel.com'
                        },
                        {
                            name: 'Olivier Bossel',
                            email: 'olivier.bossel@gmail.com',
                            url: 'https://olivierbossel.com'
                        }
                    ],
                    author: {
                        name: 'Olivier Bossel',
                        email: 'olivier.bossel@gmail.com',
                        url: 'https://olivierbossel.com'
                    }
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map