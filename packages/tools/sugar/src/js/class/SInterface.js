// @ts-nocheck
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
    var _a;
    return (_a = /** @class */ (function () {
            function SInterface() {
            }
            return SInterface;
        }()),
        /**
         * @name              settings
         * @type              Object
         * @static
         *
         * Store the default settings that will be passed to the ```apply``` function
         *
         * @since       2.0.0
         * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
         */
        _a.settings = {
            throw: true,
            return: 'String'
        },
        _a);
});
//# sourceMappingURL=module.js.map