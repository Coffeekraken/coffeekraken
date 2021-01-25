"use strict";
// @ts-nocheck
// @shared
module.exports = `
{{#if param}}
    <div class="s-db-parameters">
      <h2 class="s-h2 s-m-t s-m-b-small">
        Parameters
      </h2>
      <ol class="s-ul">
        {{#each param}}
        <li class="s-m-b-small">
          <p class="s-p s-f-bold">{{name}}</p>
          {{#if default}}
            <span class="s-db-default">{{default}}</span>
          {{/if}}
          {{#if type}}
            <span class="s-db-type">
            \{{{type}}\}
            </span>
          {{/if}}
          {{#if description}}
            <p class="s-p">
              {{description}}
            </p>
          {{/if}}
          {{#if content}}
            <div class="s-db-content">
              {{{content}}}
            </div>
          {{/if}}
        </li>
        {{/each}}
      </ol>
    </div>
  {{/if}}
`;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicGFyYW1zLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsicGFyYW1zLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFBQSxjQUFjO0FBQ2QsVUFBVTtBQU9WLGlCQUFTOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Q0FpQ1IsQ0FBQyJ9