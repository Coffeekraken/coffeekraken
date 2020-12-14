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
    var __SStaticValidation = require('../SStaticValidation');
    require('./SStaticValidation')(__SStaticValidation);
});
//# sourceMappingURL=module.js.map