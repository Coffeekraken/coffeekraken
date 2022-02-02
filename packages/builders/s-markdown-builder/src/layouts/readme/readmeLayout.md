<!-- image -->

<!-- {{#if settings.layouts.readme.data.headerImageUrl }}
![{{ packageJson.name }}]({{ settings.layouts.readme.data.headerImageUrl }})
{{/if}} -->

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

<!-- License -->

{{#isSectionWanted 'license'}}
{{#> section-license}}{{/section-license}}
{{/isSectionWanted}}

<!-- Contact -->

{{#isSectionWanted 'contact'}}
{{#> section-contact}}{{/section-contact}}
{{/isSectionWanted}}
