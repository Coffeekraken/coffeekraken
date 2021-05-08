"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    id: 'author',
    template: `
  {{#if author}}{{#author}}
<div class="{{ classname 'db-author' }}">
  <h3 class="{{ classname 'h3' }}">
    Author
  </h3>
  <span class="{{ classname 'db-author__avatar' }}">
    <img class="{{ classname 'db-author__avatar-img' }}" src="{{ gravatar email }}" />
  </span>
  <span class="{{ classname 'db-author__name' }}">{{name}}</span>
  {{#if email}}
    <a class="{{ classname 'db-author__email' }}" href="mailto:{{email}}">
      {{email}}
    </a>
  {{/if}}
  {{#if url}}
    <a class="{{ classname 'db-author__url' }}" href="{{url}}" target="_blank">
      {{url}}
    </a>
  {{/if}}
</div>
{{/author}}{{/if}}

  `
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXV0aG9yLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXV0aG9yLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBQUEsa0JBQWU7SUFDYixFQUFFLEVBQUUsUUFBUTtJQUNaLFFBQVEsRUFBRTs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7R0F1QlQ7Q0FDRixDQUFDIn0=