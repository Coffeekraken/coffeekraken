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
    module.exports = function (__deepMap) {
        describe('sugar.js.object.deepMap', function () {
            it('Should map the passed objects correctly', function (done) {
                var obj1 = {
                    hello: {
                        world: 'hello world'
                    },
                    plop: {
                        world: 'Yop'
                    }
                };
                var res = __deepMap(obj1, function (value, prop, fullPath) {
                    return "~ " + value;
                });
                expect(res).toEqual({
                    hello: {
                        world: '~ hello world'
                    },
                    plop: {
                        world: '~ Yop'
                    }
                });
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map