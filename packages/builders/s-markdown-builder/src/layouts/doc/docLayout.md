<!-- image -->
{{#if config.markdownBuilder.layouts.doc.data.headerImageUrl }}
![{{ config.packageJson.name }}]({{ config.markdownBuilder.layouts.doc.data.headerImageUrl }})
{{/if}}

<!-- header -->
{{#isSectionWanted 'doc-header'}}
{{#> section-doc-header }}{{/ section-doc-header}}
{{/isSectionWanted}}

{{> @partial-block }}