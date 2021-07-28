<!-- image -->
{{#if config.markdownBuilder.layouts.license.data.headerImageUrl }}
![{{ config.packageJson.name }}]({{ config.markdownBuilder.layouts.license.data.headerImageUrl }})
{{/if}}

{{#> license }}{{/license}}