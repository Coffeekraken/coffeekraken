// @ts-nocheck
// @shared
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
    return "\n<div class=\"s-db-sharings s-m-b\">\n  <a href=\"https://olivierbossel.com\" class=\"s-btn s-btn--small\">\n    Share this page\n  </a>\n</div>\n";
});
