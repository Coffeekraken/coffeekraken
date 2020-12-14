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
    module.exports = function (__queryStringToObject) {
        describe('sugar.js.url.queryStringToObject', function () {
            it('Should correctly parse the passed query string', function () {
                expect(__queryStringToObject('?var1=value1&var2=value2')).toEqual({ var1: 'value1', var2: 'value2' });
            });
        });
    };
});
//# sourceMappingURL=module.js.map