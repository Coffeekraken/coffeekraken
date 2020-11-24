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
    return "\n{{#if param}}\n    <div class=\"s-db-parameters\">\n      <h2 class=\"s-h2 s-m-t s-m-b-small\">\n        Parameters\n      </h2>\n      <ol class=\"s-ul\">\n        {{#each param}}\n        <li class=\"s-m-b-small\">\n          <p class=\"s-p s-f-bold\">{{name}}</p>\n          {{#if default}}\n            <span class=\"s-db-default\">{{default}}</span>\n          {{/if}}\n          {{#if type}}\n            <span class=\"s-db-type\">\n            {{{type}}}\n            </span>\n          {{/if}}\n          {{#if description}}\n            <p class=\"s-p\">\n              {{description}}\n            </p>\n          {{/if}}\n          {{#if content}}\n            <div class=\"s-db-content\">\n              {{{content}}}\n            </div>\n          {{/if}}\n        </li>\n        {{/each}}\n      </ol>\n    </div>\n  {{/if}}\n";
});
