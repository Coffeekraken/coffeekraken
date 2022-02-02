
{{#if docMenu.tree.length}}
{{#*inline "myPartial"}}
{{#if this.slug}}
- [{{ this.name }}]({{ this.slug }})
{{else}}
{{#if this.name}}
- {{ this.name }}
{{/if}}
{{#if this.tree}}
{{> myPartial this.tree}}
{{else}}
{{#each this}}
    {{> myPartial this}}
{{/each}}
{{/if}}
{{/if}}
{{/inline}}

{{#each docMenu.tree}}
{{> myPartial }}
{{/each}}
{{/if}}