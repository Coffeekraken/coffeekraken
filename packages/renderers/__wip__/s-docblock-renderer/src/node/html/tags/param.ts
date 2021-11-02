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
