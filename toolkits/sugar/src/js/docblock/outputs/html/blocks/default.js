export default `
{{#if namespace}}<!-- @namespace    {{namespace}} -->{{/if}}
{{#if name}}<!-- @name    {{name}} -->{{/if}}

{{#if name}}
  <h1 class="s-db-h1">
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
  <h2 class="s-db-h3">
    <span class="s-db-since">Since: {{since}}</span>
  </h2>
{{/if}}

{{#if description}}
  <p class="s-db-description">{{description}}</p>
{{/if}}

{{#if example}}{{#example}}
  <div class="s-db-example">
    <h2 class="s-db-h2">
      Example <span class="s-db-language">{{language}}</span>
    </h2>

    <pre class="s-db-pre s-db-pre--{{language}}">
      <code class="s-db-code">
        {{code}}
      </code>
    </pre>
  </div>
{{/example}}{{/if}}

{{#if author}}{{#author}}
  <div class="s-db-author">
    <h3 class="s-db-h3">
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
