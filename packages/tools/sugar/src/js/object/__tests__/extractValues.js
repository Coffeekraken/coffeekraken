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
    module.exports = function (__extractValues) {
        describe('sugar.js.object.extractValues', function () {
            it('Should extract correctly the values from an array ob objects', function (done) {
                var array = [
                    {
                        hello: 'world',
                        plop: 'wijwoeijfewf'
                    },
                    {
                        hello: 'something',
                        plop: 'wijfjjfjfjf'
                    },
                    {
                        plop: 'something else'
                    }
                ];
                expect(__extractValues(array, 'hello')).toEqual(['world', 'something']);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map