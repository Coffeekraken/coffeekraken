<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/cli

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/cli?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/cli)
[![downloads](https://shields.io/npm/dm/@coffeekraken/cli?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/cli)
[![license](https://shields.io/npm/l/@coffeekraken/cli?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Main Coffeekraken toolchain entry point that expose the sugar CLI and let you release the Kraken!

<!-- install -->
### Install

```shell
npm i @coffeekraken/cli

```

<!-- body -->

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

The main thing is to install it like so:

```shell
npm i @coffeekraken/cli -g

```

Then you will have access to the `sugar` command that you can use first like so:

1. `sugar` or `sugar --help`: Display the complete sugar CLI commands list
2. `sugar {stack} --help`: Display the list of **available actions in the passed stack**
3. `sugar {stack}.{action} --help`: Display a **particular stack/action help** with detailed arguments list, etc...

These are the main entry points with the ones you can discover and try our features

## Available commands

Here's a list of the available commands:


-   `sugar sugarJson.list [arguments]` - Search and list for sugar.json files
    
-   `sugar new.project [arguments]` - Init a new project
    
-   `sugar dev.start [arguments]` - Start the development stack
    
-   `sugar prod.start [arguments]` - Start the production testing stack
    
-   `sugar build.prod [arguments]` - Build for production
    
-   `sugar fs.copy [arguments]` - Copy a file/directory to a specified destination
    
-   `sugar process.kill [arguments]` - Kill a process by it&#039;s pid, port and more
    
-   `sugar nvm.autoSwitch [arguments]` - Add the necessary (zsh, bash) script to make your NVM automatically change the node version when detecting a .nvmrc file in your project
    
-   `sugar carpenter.start [arguments]` - Start a carpenter environment and display easily your components
    
-   `sugar formatter.format [arguments]` - Format your code using the SCodeFormatter class
    
-   `sugar docmap.build [arguments]` - Build the docmap.json file by searching for source files with a @namespace defined
    
-   `sugar docmap.search [arguments]` - Search the document for a specific item.
    
-   `sugar docmap.read [arguments]` - Get a special docmap entry
    
-   `sugar favicon.build [arguments]` - Build your favicon with all the sizes, etc...
    
-   `sugar frontendServer.start [arguments]` - Start a new frontend server process
    
-   `sugar frontendServer.corsProxy [arguments]` - Start a cors proxy server
    
-   `sugar frontspec.build [arguments]` - Build the frontspec.json file from configs specified in the config.frontspec.build.fromConfigs stack
    
-   `sugar googleMap.styles [arguments]` - Generate a google map json style depending on your theme colors
    
-   `sugar images.build [arguments]` - Compress your images and generate different resolutions as well as webp version of them
    
-   `sugar kitchen.new [arguments]` - Create a new project from a recipe (template) like the default one or for example the litElement one, etc...
    
-   `sugar kitchen.action [arguments]` - Exec an action of the kitchen application into the current working directory
    
-   `sugar kitchen.recipe [arguments]` - Exec a recipe of the kitchen application into the current working directory
    
-   `sugar kitchen.list [arguments]` - List either all the recipes available or particular recipe actions stack
    
-   `sugar kitchen.add [arguments]` - Add some ingredient(s) to your project like &quot;frontspec&quot;, &quot;favicon&quot;, etc...
    
-   `sugar markdown.build [arguments]` - Build your markdown using marked and some internal extensions like s-code-example and others
    
-   `sugar mono.exec [arguments]` - Exec a command in all the packages of the monorepo
    
-   `sugar mono.list [arguments]` - List all the repositories that compose the current mono repo
    
-   `sugar mono.publish [arguments]` - Publish all the repositories that compose the current mono repo
    
-   `sugar mono.dev [arguments]` - Launch the monorepo dev stack. Principally transpiling the packages typescript files
    
-   `sugar mono.upgrade [arguments]` - Upgrade the repositories informations depending on the mono repo ones
    
-   `sugar package.rename [arguments]` - Rename a package (folder, package.json, etc...
    
-   `sugar package.install [arguments]` - Install package dependencies like npm and composer
    
-   `sugar package.checkDependencies [arguments]` - Check package for unused, missing dependencies in the package.json file
    
-   `sugar package.exports [arguments]` - Generate automatically the &#039;exports&#039; properties in the package.json file depending on the found &#039;exports.js&#039; files
    
-   `sugar postcss.build [arguments]` - Build your css using postcss and some built-in tools like the sugar plugin.
    
-   `sugar sitemap.build [arguments]` - Build your sitemap depending ton configuration file &#039;sitemap.config.js&#039;
    
-   `sugar static.build [arguments]` - Build your static website version
    
-   `sugar config.cache [arguments]` - Put the configuration in the cache to speed up subsequent calls
    
-   `sugar typescript.build [arguments]` - Build the ts and js files found in the repository
    
-   `sugar vite.start [arguments]` - Start the vite server and compilators development stack
    
-   `sugar vite.build [arguments]` - Build your assets like js, and css using vite
    
-   `sugar vite.test [arguments]` - Launch the tests using vitest
    
-   `sugar command.run [arguments]` - Run a line command either in current directory or in a(some) specific packages
    

<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
