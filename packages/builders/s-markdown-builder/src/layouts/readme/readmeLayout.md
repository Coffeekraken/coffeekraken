<!-- image -->

{{#if config.markdownBuilder.layouts.readme.data.headerImageUrl }}
![{{ config.packageJson.name }}]({{ config.markdownBuilder.layouts.readme.data.headerImageUrl }})
{{/if}}

<!-- header -->

{{#isSectionWanted 'readme-header'}}
{{#> section-readme-header }}{{/ section-readme-header}}
{{/isSectionWanted}}

<!-- description -->

{{#isSectionWanted 'description'}}
{{#> section-description }}{{/ section-description}}
{{/isSectionWanted}}

<!-- install -->

{{#isSectionWanted 'install'}}
{{#> section-install}}{{/ section-install}}
{{/isSectionWanted}}

{{> @partial-block }}

<!-- doc-menu -->

{{#isSectionWanted 'doc-menu'}}
{{#> section-doc-menu}}{{/ section-doc-menu}}
{{/isSectionWanted}}

{{#isSectionWanted 'license'}}
{{#> section-license}}{{/section-license}}
{{/isSectionWanted}}

{{#isSectionWanted 'contact'}}
{{#> section-contact}}{{/section-contact}}
{{/isSectionWanted}}
