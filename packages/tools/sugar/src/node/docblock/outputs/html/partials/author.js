"use strict";
// @ts-nocheck
// @shared
module.exports = `
{{#if author}}{{#author}}
<div class="s-db-author">
  <h3 class="s-h3 s-m-t s-m-b-small">
    Author
  </h3>
  <span class="s-db-name">{{name}}</span>
  {{#if email}}
    <a class="s-db-email" href="mailto:{{email}}">
      {{email}}
    </a>
  {{/if}}
  {{#if url}}
    <a class="s-db-url" href="{{url}}" target="_blank">
      {{url}}
    </a>
  {{/if}}
</div>
{{/author}}{{/if}}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQU9WLGlCQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0NBbUJSLENBQUMifQ==