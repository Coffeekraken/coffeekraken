{{#if settings.layouts.readme.data.headerImageUrl }}

<!-- image -->

![{{ packageJson.name }}]({{ settings.layouts.readme.data.headerImageUrl }})
{{/if}}

{{#isSectionWanted 'readme-header'}}

<!-- header -->

{{#> section-readme-header }}{{/ section-readme-header}}
{{/isSectionWanted}}

{{#isSectionWanted 'description'}}

<!-- description -->

{{#> section-description }}{{/ section-description}}
{{/isSectionWanted}}

{{#isSectionWanted 'install'}}

<!-- install -->

{{#> section-install}}{{/ section-install}}
{{/isSectionWanted}}

{{> @partial-block }}

{{#isSectionWanted 'doc-menu'}}

<!-- doc-menu -->

{{#> section-doc-menu}}{{/ section-doc-menu}}
{{/isSectionWanted}}

{{#isSectionWanted 'license'}}

<!-- License -->

{{#> section-license}}{{/section-license}}
{{/isSectionWanted}}

{{#isSectionWanted 'contact'}}

<!-- Contact -->

{{#> section-contact}}{{/section-contact}}
{{/isSectionWanted}}
