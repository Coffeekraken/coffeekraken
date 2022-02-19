<!--
/**
 * @name            Get Started
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation / Get Started           /doc/get-started/get-started
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
 */
-->

{{#> layout-doc }}

# Get Started

To start using Coffeekraken tools, the easier way is to install the **@coffeekraken/cli** package like so:

```shell
npm install @coffeekraken/cli -g
```

This will give you access to the **sugar** CLI and will give you the ability to generate new projects
that directly integrate all access to your toolchain power like:

-   Development environment build on top of **[vitejs](https://vitejs.dev/)**
-   Built-in support for **[PostCss](https://postcss.org/)** as well as the **[PostCss sugar plugin](https://coffeekraken.io/doc/@coffeekraken/s-postcss-sugar-plugin/README)**
-   Production ready build process
-   Instant access to the actual packages documentation
    -   Check out our [VSCode extension](https://coffeekraken.io/doc/@coffeekraken/s-vscode-extension/README)

## Start using the CLI

To start using and discover what the CLI can do for your, the easiest way it to simple call it like so:

```bash
sugar 
```

> calling sugar this way will start a simple interactive process that will let you discover his features

You can as well access to the help by taping:

```bash
sugar --help
```

{{/layout-doc }}
