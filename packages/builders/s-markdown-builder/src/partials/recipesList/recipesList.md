{{#each config.frontstack.recipes}}
###### {{ this.title }}

{{ this.description }}

[More on this recipe](./built-in/{{ @key }})

{{/each}}