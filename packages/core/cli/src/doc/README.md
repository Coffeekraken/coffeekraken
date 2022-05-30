<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## CLI

This package gaves you access to the `sugar` CLI.

This CLI is the main entry point in the Coffeekraken ecosystem.

## Features

-   Init new projects with ease `sugar new`
-   Launch your development environment with ease `sugar dev`
-   Build your project for production `sugar build`
-   Execute commands provided by other packages like:
    -   Build your favicon `sugar favicon.build`
    -   Build and compress your images `sugar images.build`
    -   Build your docmap `sugar docmap.build`
    -   And more...
-   Monorepo:
    -   Execute commands directly in all your repositories `sugar monorepo.run "ls -la"`
    -   List all your packages in your monorepo `sugar monorepo.list`
    -   Transpile automatically your `.ts` files for all your repositories `sugar monorepo.dev`
    -   And more...
-   Tools
    -   Kill a process with ease `sugar process.kill -p 3333`
    -   And more...
-   Package
    -   Check that your dependencies are well listed in your package.json `sugar.package.checkDependencies`
-   And more...

## Usage

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

-   `sugar {{@key}} [arguments]`
    -   {{this.description}}

{{/each}}

{{/ layout-readme }}
