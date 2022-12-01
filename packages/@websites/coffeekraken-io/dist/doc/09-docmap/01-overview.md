<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


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
* @namespace       doc.docmap
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Docmap           /doc/docmap/overview
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# What is a docmap?

A docmap is nothing more that a **json file that lists all of the documentation you can have** inside your project.

When we say "**documentation**", it means meanly "**docblocks**" that you may have written in your source files.

## What is a docblock?

A docblock is a simple block written using the [Docblock syntax](https://en.wikipedia.org/wiki/Docblock).

It may look like this:

```js
/**
 * @name            unique
 * @namespace       js.array
 * @type            Function
 * @platform        js
 * @status          stable
 *
 * This function will return a filtered array without any duplicated
 *
 * @param       {any[]}           ar                The array you want to filter
 * @return      {any[]}                             The filtered array
 *
 * @since       2.0.0
 * @author      Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
export default function (ar: any[]): any[] {
  // ...
}

```

## What a `docmap.json` file looks like?

A `docmap.json` file will look like something like this:

```js
export default {
  map: {},
  extends: [],
  generated: {
    extends: [
      '@coffeekraken/cli',
      '@coffeekraken/sugar',
      // etc...
    ],
    map: {
      'js.array.unique': {
        name: 'unique',
        type: 'Function',
        platform: [
          {
            name: 'js',
            description: '',
          },
        ],
        namespace: 'js.array',
        status: 'stable',
        since: '2.0.0',
        author: {
          name: 'Olivier Bossel',
          email: 'olivier.bossel@gmail.com',
          url: 'https://coffeekraken.io',
        },
        filename: '01-whatAreRecipes.md',
        extension: 'js',
        relPath: 'src/js/array/unique.js',
        children: {},
      },
      // etc...
    },
  },
};

```

You can see that we have a lot of informations about our documentation.

## What is the purpose of a docmap

A docmap can be useful for many things like **indexing where to find the documentation** for a particular function, class, etc...

It can be used to generate a documentation website **as we are doing for the whole Coffeekraken ecosystem**.

The only thing that limit what you can do with that is your imagination. As the docmap is just a "**directory**" of your documentation, you can build everything you want on top of that.

> Make sure to take a look at the others documentation about docmap to learn how to build your own, how to write your docblocks for the best results as well as how to access your docmap through his simple API...

## How to generate a docmap.json file

To build a `docmap.json` file, you can use either our [@coffeekraken/s-docmap](/package/@coffeekraken/s-docmap/doc/readme) package, or through our CLI like so:

```shell
sugar docmap.build

```

This will search for files in your `src` folder as well as in your generated `dist/css/index.css` file for docblock that have a `@namespace` tag AND a `@name` one.
All docblocks finded will be part of your `docmap.json` file.

The build process will also reference all the dependencies packages that have a `docmap.json` file at their root folder. This in order to list also your dependencies documentation.

> Note that you must have the [@coffeekraken/cli](/package/@coffeekraken/cli/doc/readme) package installed.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
