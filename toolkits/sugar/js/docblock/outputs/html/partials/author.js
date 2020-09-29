"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n{{#if author}}{{#author}}\n<div class=\"s-db-author\">\n  <h3 class=\"s-h3 s-m-t s-m-b-small\">\n    Author\n  </h3>\n  <span class=\"s-db-name\">{{name}}</span>\n  {{#if email}}\n    <a class=\"s-db-email\" href=\"mailto:{{email}}\">\n      {{email}}\n    </a>\n  {{/if}}\n  {{#if url}}\n    <a class=\"s-db-url\" href=\"{{url}}\" target=\"_blank\">\n      {{url}}\n    </a>\n  {{/if}}\n</div>\n{{/author}}{{/if}}\n";
exports.default = _default;
module.exports = exports.default;