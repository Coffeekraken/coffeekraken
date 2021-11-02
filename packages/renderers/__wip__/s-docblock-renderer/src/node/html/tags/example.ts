export default {
  id: 'example',
  template: `
  {{#if example}}{{#example}}
<div class="{{ classname 'db-example' }}">
  <h3 class="{{ classname 'h3 db-example__title' }}">
    Example <span class="{{ classname 'db-example__language' }}" language="{{ language }}">{{language}}</span>
  </h3>

  <s-highlight-js>
    {{code}}
  </s-highloght-js>

  <pre class="{{ classname 'db-example__pre pre' }}" language="{{ language }}">
    <code class="{{ classname 'db-example__code' }}" language="{{ language }}">
      {{code}}
    </code>
  </pre>
</div>
{{/example}}{{/if}}
 
  `
};
