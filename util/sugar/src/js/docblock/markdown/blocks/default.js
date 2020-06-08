export default `
## {{#if static}}Static {{/if}}{{#if get}}get {{/if}}{{#if set}}set {{/if}}\`\`\`js {{name}} \`\`\`
{{#if since}}### Since: {{since}}{{/if}}

{{#if description}}{{description}}{{/if}}

{{#if example}}{{#example}}
### Example ({{language}})

\`\`\`{{language}}
{{code}}
\`\`\`
{{/example}}{{/if}}

### Author
- {{#author}}**{{name}}** {{#if email}}<a href="mailto:{{email}}">{{email}}</a>{{/if}} {{#if url}}<a target="_blank" href="{{url}}">{{url}}</a>{{/if}}{{/author}}
`;
