export default {
    id: 'param',
    template: `
  {{#if param}}
  <div class="{{ classname 'db-params' }}">
    <ol class="{{ classname 'ul' }}">
      {{#each param}}
      <li class="{{ classname '' }}">
        <p class="{{ classname 'p' }}">{{name}}</p>
        {{#if default}}
          <span class="{{ classname 'db-params__default' }}">{{default}}</span>
        {{/if}}
        {{#if type}}
          <span class="{{ classname 'db-params__type' }}">
          \{{{type}}\}
          </span>
        {{/if}}
        {{#if description}}
          <p class="{{ classname 'db-params__p p' }}">
            {{description}}
          </p>
        {{/if}}
        {{#if content}}
          <div class="{{ classname 'db-params__content' }}">
            {{{content}}}
          </div>
        {{/if}}
      </li>
      {{/each}}
    </ol>
  </div>
{{/if}}
  `
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW0uanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJwYXJhbS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBQSxlQUFlO0lBQ2IsRUFBRSxFQUFFLE9BQU87SUFDWCxRQUFRLEVBQUU7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztHQThCVDtDQUNGLENBQUMifQ==