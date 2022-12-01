<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- header -->
# @coffeekraken/s-kitchen

###### [MIT](./license) 2.0.0-alpha.20 - [Git repository]()

<!-- shields -->
[![size](https://shields.io/bundlephobia/min/@coffeekraken/s-kitchen?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-kitchen)
[![downloads](https://shields.io/npm/dm/@coffeekraken/s-kitchen?style=for-the-badge)](https://www.npmjs.com/package/@coffeekraken/s-kitchen)
[![license](https://shields.io/npm/l/@coffeekraken/s-kitchen?style=for-the-badge)](./LICENSE)
[![discord](https://img.shields.io/discord/940362961682333767?color=5100FF&amp;label=Join%20us%20on%20Discord&amp;style=for-the-badge)](https://discord.gg/HzycksDJ)

<!-- description -->
Central coffeekraken piece that handle project creation, development stack launch, and more.

<!-- install -->
### Install

```shell
npm i @coffeekraken/s-kitchen

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

## What is this?

Our `SKitchen` class allows you to create and execute some **recipes** of **stacks** of **actions** with ease.

-   **Recipes**
    -   kind of "templates" for some kind of project like "React", "Next", "Nuxt", etc...
-   **Stacks**
    -   like "pipelines" for your project like "dev", "build", etc...
-   **Actions**
    -   like "processes" that are executed in your **stacks** either in parallels or one after the others...

## Usage

The usage of this package is mainly through the `kitchen.config.js` file and the `sugar` CLI like described bellow:

```shell
# Create a new project
sugar kitchen.new
# Run the "dev" recipe
sugar kitchen.recipe dev
# etc...

```

> Note that no recipe is specified in these commands. The "recipe" is usually defined in the `sugar.json` file at the root of your project.

## List the available "recipes"

To list the available recipes, simply execute this command:

```shell
sugar kitchen.list

```

## Create your recipe

To create a new recipe, simply follow [this documentation](/doc/recipes/create-your-recipe)

## Understand and create an action

To understand and create your own action, simply follow [this documentation](/doc/recipes/create-your-recipe4)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
