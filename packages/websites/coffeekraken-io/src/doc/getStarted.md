<!-- 
 * @name            Get started
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/get-started
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://olivierbossel.com)
-->

{{#> layout-doc }}

# Get Started

To start using Coffeekraken tools, the easier way is to install the **@coffeekraken/cli** package like so:

```shell
npm install @coffeekraken/cli -g
```

This will give you access to the **sugar** CLI and will give you the ability to generate new projects
that directly integrate all access to your toolchain power like:

- Development environment build on top of **[vitejs](https://vitejs.dev/)**
- Built-in support for **[PostCss](https://postcss.org/)** as well as the **[PostCss sugar plugin](https://coffeekraken.io/doc/@coffeekraken/s-postcss-sugar-plugin/README)**
- Production ready build process
- Instant access to the actual packages documentation
  - Check out our [VSCode extension](https://coffeekraken.io/doc/@coffeekraken/s-vscode-extension/README)

## Start using the CLI

To start using and discover what the CLI can do for your, the easiest way it to simple call it like so:

```shell
sugar
```


> calling sugar this way will start a simple interactive process that will let you discover his features

You can as well access to the help by taping:

```shell
sugar --help
```


## Create a new project

To create a new project, simply enter this command:

```shell
sugar new
```


This will launch a quick and easy step by step creation process that will ask you for the project name, the [recipe](#recipes) to use, etc...

> **[Recipe](#recipes)** is the term used in the coffeekraken environment for **"project template"** 

Once this process is done, you can start working on your project. If you choose to **not launch the development process** at the end of the step by step creation process, simply enter this command:

```shell
sugar dev
```


## Start developing

In order to start developing your newly created project, you just need to enter this simple command:

```shell
sugar dev
```

That will launch some processes like:

###### **frontendServer**

This server is the main one to access your project. It runs by default on port __8888__ and handle thinks like views compilation (bladePHP, twig, and others to come depending on needs...).

More on this server in  the [@coffeekraken/s-frontend-server](https://www.npmjs.com/package/@coffeekraken/s-sfrontend-server) package documentation

###### **vitejs**

This server is powered by the AWESOME [vitejs](https://vitejs.dev/) project and is responsible to compile and serve on the fly your assets like javascript and typescript files, css through [PostCSS](https://postcss.org/), and more...

We use this package under the hood to add built-in support for things ike [PostCSS](https://postcss.org/), [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [Svelte](https://svelte.dev/) and more...


## Build for production

Each recipes comes with full production ready build stack. To build your project, simply launch thie simply command:

```shell
sugar build
```


## Recipes

As say above, "recipes" are simply refering to **"project templates"**.
These recipes allows you to choose one that fit the most with your project and let it scaffold for you your environment like the folder structure, the package.json file creation, the dependencies installation, etc...

This does not mean that you MUST keep with the defaults settings setted by the recipe like folder structure, etc... The Coffeekraken environment is entirely builded on a centralized and overridable [configuration system](https://coffeekraken.io/doc/@coffeekraken/s-sugar-config/README) in which you can change and personalized almost EVERY aspect of your environment...

Here's the list of the current available recipes:

{{#each config.frontstack.recipes}}
- **{{ @key }}**: {{ this.description }}
{{/each}}

{{/ layout-doc }}