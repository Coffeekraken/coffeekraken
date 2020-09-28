"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n{{#if namespace}}<!-- @namespace    {{namespace}} -->{{/if}}\n{{#if name}}<!-- @name    {{name}} -->{{/if}}\n\n{{#if name}}\n  <h1 class=\"s-h1\">\n    {{#if static}}\n      <span class=\"s-db-static\">Static</span>span>\n    {{/if}}\n    {{#if get}}\n      <span class=\"s-db-get\">get</span>\n    {{/if}}\n    {{#if set}}\n      <span class=\"s-db-set\">set</span>\n    {{/if}}\n    <span class=\"s-db-name\">\n      {{name}}\n    </span>\n  </h1>\n{{/if}}\n{{#if since}}\n  <h2 class=\"s-h3\">\n    <span class=\"s-db-since\">Since: {{since}}</span>\n  </h2>\n{{/if}}\n\n{{#if description}}\n  <p class=\"s-p\">{{description}}</p>\n{{/if}}\n\n{{#if example}}{{#example}}\n  <div class=\"s-db-example\">\n    <h2 class=\"s-h2\">\n      Example <span class=\"s-db-language\">{{language}}</span>\n    </h2>\n\n    <pre class=\"s-pre s-pre--{{language}}\">\n      <code class=\"s-code\">\n        {{code}}\n      </code>\n    </pre>\n  </div>\n{{/example}}{{/if}}\n\n{{#if author}}{{#author}}\n  <div class=\"s-db-author\">\n    <h3 class=\"s-h3\">\n      Author\n    </h3>\n    <span class=\"s-db-name\">{{name}}</span>\n    {{#if email}}\n      <a class=\"s-db-email\" href=\"mailto:{{email}}\">\n        {{email}}\n      </a>\n    {{/if}}\n    {{#if url}}\n      <a class=\"s-db-url\" href=\"{{url}}\" target=\"_blank\">\n        {{url}}\n      </a>\n    {{/if}}\n  </div>\n{{/author}}{{/if}}\n";
exports.default = _default;
module.exports = exports.default;