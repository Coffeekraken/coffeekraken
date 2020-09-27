"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;
var _default = "\n{{#if namespace}}<!-- @namespace    {{namespace}} -->{{/if}}\n{{#if name}}<!-- @name    {{name}} -->{{/if}}\n\n# {{#if static}}Static {{/if}}{{#if get}}get {{/if}}{{#if set}}set {{/if}}```js {{name}} ```\n{{#if since}}### Since: {{since}}{{/if}}\n\n{{#if description}}{{description}}{{/if}}\n\n{{#if param}}\n## Parameters\n\n{{#each param}}\n- **{{name}}** {{#if default}}({{default}}){{/if}} {{{type}}}: {{description}}\n{{#if content}}{{content}}{{/if}}\n{{/each}}\n{{/if}}\n\n{{#if example}}{{#example}}\n## Example ({{language}})\n\n```{{language}}\n{{code}}\n```\n{{/example}}{{/if}}\n\n### Author\n- {{#author}}**{{name}}** {{#if email}}<a href=\"mailto:{{email}}\">{{email}}</a>{{/if}} {{#if url}}<a target=\"_blank\" href=\"{{url}}\">{{url}}</a>{{/if}}{{/author}}\n";
exports.default = _default;
module.exports = exports.default;