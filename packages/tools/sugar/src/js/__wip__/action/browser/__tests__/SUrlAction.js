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
    module.exports = function (__SUrlAction) {
        describe('sugar.js.action.SUrlAction', function () {
            it('Should return the correct JSON object', function () {
                var action = new __SUrlAction({
                    target: '_blank',
                    url: 'https://google.com'
                });
                expect(action.toJson()).toEqual({
                    type: 'browser.url',
                    descriptorObj: { target: '_blank', url: 'https://google.com' },
                    settings: {}
                });
            });
        });
    };
});
//# sourceMappingURL=module.js.map