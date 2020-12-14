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
    module.exports = function (__extractGlob) {
        describe('sugar.js.glob.extractGlob', function () {
            it('Should extract none glob part correctly', function () {
                expect(__extractGlob('/Users/olivierbossel/data/web/coffeekraken/coffeekraken/toolkits/sugar/src/js/**/*.js')).toBe('**/*.js');
            });
        });
    };
});
//# sourceMappingURL=module.js.map