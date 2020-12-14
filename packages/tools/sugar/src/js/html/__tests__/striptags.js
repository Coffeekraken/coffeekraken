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
    module.exports = function (__striptags) {
        describe('sugar.js.html.striptags', function () {
            var html = "<div><bold>Hello world</bold><h1>How are you?</h1></div>";
            var res = __striptags(html, '<bold>');
            it('Should have replace the tags correctly', function () {
                expect(res).toBe('<bold>Hello world</bold>How are you?');
            });
        });
    };
});
//# sourceMappingURL=module.js.map