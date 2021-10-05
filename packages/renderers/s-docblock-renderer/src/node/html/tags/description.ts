export default {
    id: 'description',
    template: `
    {{#if description}}
<p class="{{ classname 's-typo:lead' }}">{{description}}</p>
{{/if}}   
    `,
};
