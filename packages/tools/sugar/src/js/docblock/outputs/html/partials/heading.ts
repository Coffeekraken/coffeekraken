export default `
{{#if namespace}}<!-- @namespace    {{namespace}} -->{{/if}}
  {{#if name}}<!-- @name    {{name}} -->{{/if}}

{{#if name}}
<h1 class="s-h1 s-m-b">
  {{#if static}}
    <span class="s-db-static">Static</span>span>
  {{/if}}
  {{#if get}}
    <span class="s-db-get">get</span>
  {{/if}}
  {{#if set}}
    <span class="s-db-set">set</span>
  {{/if}}
  <span class="s-db-name">
    {{name}}
  </span>
</h1>
{{/if}}
{{#if since}}
<h2 class="s-h3 s-m-b-small">
  <span class="s-db-since">Since: {{since}}</span>
</h2>
{{/if}}

{{> sharings}}

{{#if description}}
<p class="s-p">{{description}}</p>
{{/if}}
`;
