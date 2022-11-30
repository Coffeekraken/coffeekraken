
<!-- header -->
# @website/coffeekraken-io

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![downloads](https://shields.io/npm/dm/@website/coffeekraken-io?style=for-the-badge)](https://www.npmjs.com/package/@website/coffeekraken-io)
[![license](https://shields.io/npm/l/@website/coffeekraken-io?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
The frontend toolkit that works for everyone. Experts, professionals and new-comers

<!-- install -->
### Install

```shell
npm i @website/coffeekraken-io
```

<!-- body -->

<!--
/**
* @name            First project
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Get Started           /doc/get-started/first-project
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# First project creation

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

This server is the main one to access your project. It runs by default on port **8888** and handle thinks like views compilation (bladePHP, twig, and others to come depending on needs...).

More on this server in the [@coffeekraken/s-frontend-server](https://www.npmjs.com/package/@coffeekraken/s-sfrontend-server) package documentation

###### **vitejs**

This server is powered by the AWESOME [vitejs](https://vitejs.dev/) project and is responsible to compile and serve on the fly your assets like javascript and typescript files, css through [PostCSS](https://postcss.org/), and more...

We use this package under the hood to add built-in support for things ike [PostCSS](https://postcss.org/), [Typescript](https://www.typescriptlang.org/), [React](https://reactjs.org/), [Svelte](https://svelte.dev/) and more...

## Build for production

Each recipes comes with full production ready build stack. To build your project, simply launch thie simply command:

```shell
sugar build
```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
