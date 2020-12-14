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
    var __getExtendsStack = require('../getExtendsStack');
    require('./getExtendsStack')(__getExtendsStack);
});
//# sourceMappingURL=module.js.map