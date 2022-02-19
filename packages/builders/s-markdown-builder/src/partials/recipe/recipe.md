# {{title}} recipe

{{ description }}

- Default stack: `{{defaultStack}}`

{{#if stacks.new}}
## Init new project

```bash
sugar new {{id}}
```
{{/if}}

{{#each stacks}}

## `{{@key}}` stack

{{ this.description }}

### Actions

{{#each this.actions}}

##### **{{@key}}**: {{this.title}}

{{this.description}}

{{#if this.extends}}
> Extends the `{{this.extends}}` action.
{{/if}}

{{/each}}

{{/each}}