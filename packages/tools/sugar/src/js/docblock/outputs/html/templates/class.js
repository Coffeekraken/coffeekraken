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
    return "\n<div class=\"s-db-output s-db-output--html\">\n  {{include \"class\"}}\n\n  <h2 class=\"s-db-h2\">\n    Methods\n  </h2>\n\n  {{include \"function\"}}\n\n  <h2 class=\"s-db-h2\">\n    Variables\n  </h2>\n\n  {{include \"...\"}}\n</div>\n";
});
