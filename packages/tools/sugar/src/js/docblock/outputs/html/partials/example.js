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
    return "\n{{#if example}}{{#example}}\n<div class=\"s-db-example\">\n  <h2 class=\"s-h2 s-m-t s-m-b-small\">\n    Example <span class=\"s-db-language\">{{language}}</span>\n  </h2>\n\n  <pre class=\"s-pre s-pre--{{language}}\">\n    <code class=\"s-code\">\n      {{code}}\n    </code>\n  </pre>\n</div>\n{{/example}}{{/if}}\n";
});
//# sourceMappingURL=module.js.map