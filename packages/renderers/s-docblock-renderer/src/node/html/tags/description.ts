export default {
  id: 'description',
  template: `
    {{#if description}}
<p class="{{ classname 'p-lead' }}">{{description}}</p>
{{/if}}   
    `
};
