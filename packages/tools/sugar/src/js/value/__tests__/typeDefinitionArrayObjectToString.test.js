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
    var __typeDefinitionArrayObjectToString = require('../typeDefinitionArrayObjectToString');
    require('./typeDefinitionArrayObjectToString')(__typeDefinitionArrayObjectToString);
});
//# sourceMappingURL=module.js.map