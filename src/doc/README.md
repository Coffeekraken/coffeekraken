{{#> layout-readme sections="readme-header,description,license,contact" }}

## Start using our tools

To start discovering our tools, development stack and so one, the easiest way is to go on [our website under the get started documentation](/doc/get-started/get-started).

## Contribute to our effort

To contribute to our project, make sure to follow [these instructions](/doc/contribute/get-started).

## Promote our community and work

If you would like to promote our community efforts, don't hesitate to share our [website](https://coffeekraken.io), [repository](https://github.com/coffeekraken/coffeekraken), etc... using some tags like "**#coffeekraken #webdev #frontend**". We thank you already for that!

## Open source

This project is fully open source and will stay like that until the end of times.
This also means that we need your support/contribution. Don't hesitate to join us on our communication channels:

- [Discord](https://discord.gg/ERsX54UE)
- [Twitter](https://twitter.com/coffeekrakenio)
- [Patreon](https://www.patreon.com/coffeekraken)
- [Github](https://github.com/Coffeekraken/coffeekraken/issues)

## Our packages

Here's a list of all our packages:

{{#each packages}}
#### {{ this.name }}
{{#if this.description}}
{{ this.description}}
{{/if}}

[Access {{this.name}} documentation](/package/{{this.name}}/doc/readme)

{{/each}}

{{/ layout-readme }}
