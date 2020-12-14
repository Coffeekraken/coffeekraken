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
    module.exports = function (__filter) {
        describe('sugar.js.object.filter', function () {
            it('Should filter the object correctly', function (done) {
                var obj1 = __filter({
                    hello: {
                        world: 'hello world'
                    },
                    plop: {
                        array: [0, 1, 2]
                    }
                }, function (item, name) {
                    return name === 'hello';
                });
                expect(obj1).toEqual({
                    hello: {
                        world: 'hello world'
                    }
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map