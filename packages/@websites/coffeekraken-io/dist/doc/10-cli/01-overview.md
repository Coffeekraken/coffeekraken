
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


- `sugar sugarJson.list [arguments]`
- Search and list for sugar.json files


- `sugar new.project [arguments]`
- Init a new project


- `sugar dev.start [arguments]`
- Start the development stack


- `sugar prod.start [arguments]`
- Start the production testing stack


- `sugar build.prod [arguments]`
- Build for production


- `sugar fs.copy [arguments]`
- Copy a file/directory to a specified destination


- `sugar process.kill [arguments]`
- Kill a process by it&#039;s pid, port and more


- `sugar nvm.autoSwitch [arguments]`
- Add the necessary (zsh, bash) script to make your NVM automatically change the node version when detecting a .nvmrc file in your project


- `sugar carpenter.start [arguments]`
- Start a carpenter environment and display easily your components


- `sugar formatter.format [arguments]`
- Format your code using the SCodeFormatter class


- `sugar docmap.build [arguments]`
- Build the docmap.json file by searching for source files with a @namespace defined


- `sugar docmap.search [arguments]`
- Search the document for a specific item.


- `sugar docmap.read [arguments]`
- Get a special docmap entry


- `sugar favicon.build [arguments]`
- Build your favicon with all the sizes, etc...


- `sugar frontendServer.start [arguments]`
- Start a new frontend server process


- `sugar frontendServer.corsProxy [arguments]`
- Start a cors proxy server


- `sugar frontspec.build [arguments]`
- Build the frontspec.json file from configs specified in the config.frontspec.build.fromConfigs stack


- `sugar googleMap.styles [arguments]`
- Generate a google map json style depending on your theme colors


- `sugar images.build [arguments]`
- Compress your images and generate different resolutions as well as webp version of them


- `sugar kitchen.new [arguments]`
- Create a new project from a recipe (template) like the default one or for example the litElement one, etc...


- `sugar kitchen.action [arguments]`
- Exec an action of the kitchen application into the current working directory


- `sugar kitchen.recipe [arguments]`
- Exec a recipe of the kitchen application into the current working directory


- `sugar kitchen.list [arguments]`
- List either all the recipes available or particular recipe actions stack


- `sugar kitchen.add [arguments]`
- Add some ingredient(s) to your project like &quot;frontspec&quot;, &quot;favicon&quot;, etc...


- `sugar markdown.build [arguments]`
- Build your markdown using marked and some internal extensions like s-code-example and others


- `sugar mitosis.start [arguments]`
- Start a mitosis environment and build with ease multi-frameworks compatible components.


- `sugar mitosis.build [arguments]`
- Build the your mitosis components using the mitosis.config.js file at the root of your package. Add the ability to watch for files changes and rebuild automatically your components.


- `sugar mono.exec [arguments]`
- Exec a command in all the packages of the monorepo


- `sugar mono.list [arguments]`
- List all the repositories that compose the current mono repo


- `sugar mono.publish [arguments]`
- Publish all the repositories that compose the current mono repo


- `sugar mono.dev [arguments]`
- Launch the monorepo dev stack. Principally transpiling the packages typescript files


- `sugar mono.upgrade [arguments]`
- Upgrade the repositories informations depending on the mono repo ones


- `sugar package.rename [arguments]`
- Rename a package (folder, package.json, etc...


- `sugar package.install [arguments]`
- Install package dependencies like npm and composer


- `sugar package.checkDependencies [arguments]`
- Check package for unused, missing dependencies in the package.json file


- `sugar package.exports [arguments]`
- Generate automatically the &#039;exports&#039; properties in the package.json file depending on the found &#039;exports.js&#039; files


- `sugar postcss.build [arguments]`
- Build your css using postcss and some built-in tools like the sugar plugin.


- `sugar sitemap.build [arguments]`
- Build your sitemap depending ton configuration file &#039;sitemap.config.js&#039;


- `sugar static.build [arguments]`
- Build your static website version


- `sugar config.cache [arguments]`
- Put the configuration in the cache to speed up subsequent calls


- `sugar typescript.build [arguments]`
- Build the ts and js files found in the repository


- `sugar vite.start [arguments]`
- Start the vite server and compilators development stack


- `sugar vite.build [arguments]`
- Build your assets like js, and css using vite


- `sugar vite.test [arguments]`
- Launch the tests using vitest


- `sugar command.run [arguments]`
- Run a line command either in current directory or in a(some) specific packages


> For more information about these commands, simply use the `sugar -h` command, or the `sugar docmap.build -h` to have more insights about a particular one...


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
