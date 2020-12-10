"use strict";
// @ts-nocheck
// @shared
module.exports = `
{{#if example}}{{#example}}
<div class="s-db-example">
  <h2 class="s-h2 s-m-t s-m-b-small">
    Example <span class="s-db-language">{{language}}</span>
  </h2>

  <pre class="s-pre s-pre--{{language}}">
    <code class="s-code">
      {{code}}
    </code>
  </pre>
</div>
{{/example}}{{/if}}
`;
//# sourceMappingURL=module.js.map