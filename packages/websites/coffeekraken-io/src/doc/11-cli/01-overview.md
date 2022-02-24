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

## Main commands

To start quickly and code as soon as possible, here's some commands that you can use:

1. `sugar new`: Create a new project based on a template that you can choose interactively
2. `cd myProject`: Change directory to your newly created project
3. `sugar dev`: Launch the development environment and start coding
4. `sugar build`: Build your files (JS/TS, CSS, images, etc...) for production

That's all you need to start working as soon as possible. These commands are totally independent of the chosen template so you don't need to think again and again how to build, start developing, etc...

{{/layout-doc }}
