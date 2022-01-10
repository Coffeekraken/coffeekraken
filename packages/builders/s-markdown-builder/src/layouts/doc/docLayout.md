<!-- image -->
{{#if settings.layouts.doc.data.headerImageUrl }}
![{{ packageJson.name }}]({{ settings.layouts.doc.data.headerImageUrl }})
{{/if}}

<!-- header -->
{{#isSectionWanted 'doc-header'}}
{{#> section-doc-header }}{{/ section-doc-header}}
{{/isSectionWanted}}

{{> @partial-block }}