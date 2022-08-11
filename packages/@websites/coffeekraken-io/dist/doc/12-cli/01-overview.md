<!--
/**
 * @name            Overview
 * @namespace       doc.cli
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / CLI           /doc/cli/overview
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-doc }}

# CLI overview

The `sugar` CLI is mainly **the best entry point to the Coffeekraken ecosystem**.

## What is it offering?

Through the CLI you will have access to all the primary features that Coffeekraken has to offer. This mean:

1. Full **development environment**
2. Full **production ready build** stack for:
   - `js/ts`
   - `css` through [PostCSS](https://postcss.org) and our `@coffeekraken/s-postcss-sugar-plugin`
   - **Images optimization** and different resolutions generation
   - and more...
3. Nice tooling like:
   - **Sitemap** generation
   - **Static website generation** for non-headless websites
   - **Project scaffolding** for different things like website templates, lit element, etc...
   - Utils like launching a command in multiple directories at once
   - Killing processes by id or by port
   - and more...

## How to start using it?

The main thing is to install it like so:

```shell
npm i @coffeekraken/cli -g
```

Then you will have access to the `sugar` command that you can use first like so:

1. `sugar`: Will launch a **simple interactive process** to guide you
2. `sugar --help`: Display the complete sugar CLI commands list
3. `sugar {stack}.{action} --help`: Display a **particular stack/action help** with detailed arguments list, etc...

These are the main entry points with the ones you can discover and try our features

## Available commands

Here's a list of the available commands:

{{#each availableCli.endpoints}}

- `sugar {{@key}} [arguments]`
  - {{this.description}}

{{/each}}

> For more information about these commands, simply use the `sugar -h` command, or the `sugar docmap.build -h` to have more insights about a particular one...

{{/layout-doc }}
