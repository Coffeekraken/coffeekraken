{{#each config.readme.shields}}
[![{{ @key }}]({{ this.url }})]({{ this.href }})
{{/each}}

<!-- ![${shield}](https://shields.io/${shieldsConfig.urls[shield]}) -->