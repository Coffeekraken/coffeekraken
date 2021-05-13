export default {
    id: 'heading',
    template: `{{#if namespace}}<!-- @namespace    {{namespace}} -->{{/if}}
  {{#if name}}<!-- @name    {{name}} -->{{/if}}

{{#if name}}
<h1 class="{{ classname 'h1' }}">
  {{#if static}}
    <span class="{{ classname 'db-static' }}">Static</span>
  {{/if}}
  {{#if get}}
    <span class="{{ classname 'db-get' }}">get</span>
  {{/if}}
  {{#if set}}
    <span class="{{ classname 'db-set' }}">set</span>
  {{/if}}
  <span class="{{ classname 'db-name' }}">
    {{name}}
  </span>
</h1>
{{/if}}

{{ tag 'since' }}

{{ tag 'description' }}

{{> sharings}}`
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGluZy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImhlYWRpbmcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUEsZUFBZTtJQUNiLEVBQUUsRUFBRSxTQUFTO0lBQ2IsUUFBUSxFQUFFOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7ZUF3Qkc7Q0FDZCxDQUFDIn0=