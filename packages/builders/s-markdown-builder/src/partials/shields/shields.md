{{#each config.readme.shields}}
[![{{ @key }}]({{ replace this.url '%packageName' ../packageJson.name }})]({{ replace this.href '%packageName' ../packageJson.name }})
{{/each}}
