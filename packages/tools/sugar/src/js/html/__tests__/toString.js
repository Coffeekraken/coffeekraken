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
    module.exports = function (__toString) {
        describe('sugar.js.html.toString', function () {
            var html = "\n  <div>\n    <bold>Hello world</bold>\n    <h1>\n      How are you?\n    </h1>\n  </div>\n";
            document.body.innerHTML = html;
            var $elm = document.querySelector('bold');
            var res = __toString($elm);
            it('Should have transform the dom element to a string correctly', function () {
                expect(res).toBe('<bold>Hello world</bold>');
            });
        });
    };
});
//# sourceMappingURL=module.js.map