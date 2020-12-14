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
    module.exports = function (__toQueryString) {
        describe('sugar.js.object.toQueryString', function () {
            it('Should transformt the object into a correctly formatted query string', function (done) {
                var obj = {
                    param1: 'hello',
                    param2: 'world coco'
                };
                expect(__toQueryString(obj)).toBe('?param1=hello&param2=world%20coco');
                done();
            });
        });
    };
});
//# sourceMappingURL=module.js.map