{{#each config.readme.shields}}
[![{{ @key }}]({{ this.url }})]({{ this.href }})
{{/each}}