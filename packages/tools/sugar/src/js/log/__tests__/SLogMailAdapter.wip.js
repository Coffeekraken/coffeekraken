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
    var __SLogMailAdapter = require('../adapters/SLogMailAdapter');
    require('./SLogMailAdapter')(__SLog, __SLogMailAdapter);
});
//# sourceMappingURL=module.js.map