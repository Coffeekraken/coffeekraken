"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n{{#if param}}\n    <div class=\"s-db-parameters\">\n      <h2 class=\"s-h2 s-m-t s-m-b-small\">\n        Parameters\n      </h2>\n      <ol class=\"s-ul\">\n        {{#each param}}\n        <li class=\"s-m-b-small\">\n          <p class=\"s-p s-f-bold\">{{name}}</p>\n          {{#if default}}\n            <span class=\"s-db-default\">{{default}}</span>\n          {{/if}}\n          {{#if type}}\n            <span class=\"s-db-type\">\n            {{{type}}}\n            </span>\n          {{/if}}\n          {{#if description}}\n            <p class=\"s-p\">\n              {{description}}\n            </p>\n          {{/if}}\n          {{#if content}}\n            <div class=\"s-db-content\">\n              {{{content}}}\n            </div>\n          {{/if}}\n        </li>\n        {{/each}}\n      </ol>\n    </div>\n  {{/if}}\n";
exports.default = _default;
module.exports = exports.default;