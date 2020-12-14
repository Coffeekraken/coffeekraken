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
    var __SUrlAction = require('./browser/SUrlAction');
    /**
     * @name            typeMap
     * @namespace       sugar.js.action
     * @type            Object
     *
     * Object that map a string "type" like "url", "login", etc... to his proper SAction class
     *
     * @since         2.0.0
     * @author         Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
     */
    module.exports = {
        browser: {
            url: __SUrlAction
        }
    };
});
//# sourceMappingURL=module.js.map