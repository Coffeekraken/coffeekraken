<!-- image -->
{{#if settings.layouts.license.data.headerImageUrl }}
![{{ packageJson.name }}]({{ settings.layouts.license.data.headerImageUrl }})
{{/if}}

{{#> license }}{{/license}}