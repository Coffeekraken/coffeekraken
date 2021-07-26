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

{{#isSectionWanted 'license'}}
{{#> section-license}}{{/section-license}}
{{/isSectionWanted}}

{{#isSectionWanted 'contact'}}
{{#> section-contact}}{{/section-contact}}
{{/isSectionWanted}}