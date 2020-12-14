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
    var __SLog = require('../SLog');
    var __SLogConsoleAdapter = require('../adapters/SLogConsoleAdapter');
    require('./SLogConsoleAdapter')(__SLog, __SLogConsoleAdapter);
});
//# sourceMappingURL=module.js.map