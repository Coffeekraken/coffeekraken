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
    module.exports = function (__includes) {
        describe('sugar.js.string.includes', function () {
            it('Should process the passed string correctly', function (done) {
                expect(__includes("something wfijweoifjw fwoj foijwef hello ifwjefoiw world wifjweoif", 'something,world,coco')).toEqual([
                    'something',
                    'world'
                ]);
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map