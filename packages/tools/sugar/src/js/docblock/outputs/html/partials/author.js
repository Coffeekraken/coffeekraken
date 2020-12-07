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
    return "\n{{#if author}}{{#author}}\n<div class=\"s-db-author\">\n  <h3 class=\"s-h3 s-m-t s-m-b-small\">\n    Author\n  </h3>\n  <span class=\"s-db-name\">{{name}}</span>\n  {{#if email}}\n    <a class=\"s-db-email\" href=\"mailto:{{email}}\">\n      {{email}}\n    </a>\n  {{/if}}\n  {{#if url}}\n    <a class=\"s-db-url\" href=\"{{url}}\" target=\"_blank\">\n      {{url}}\n    </a>\n  {{/if}}\n</div>\n{{/author}}{{/if}}\n";
});
//# sourceMappingURL=author.js.map