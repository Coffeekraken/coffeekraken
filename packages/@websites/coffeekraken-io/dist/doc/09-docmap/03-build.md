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
* @name            Build
* @namespace       doc.docmap
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Docmap           /doc/docmap/build
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Building your docmap

To build your docmap, the easiest wait is to use the `sugar` CLI like so:

```shell
sugar docmap.build

```

> Make sure to launch this command in your project root directory.

## Sources

The docmap builder will search for all your project dependencies that have themselves a `docmap.json` file at their root, and it will search inside your project for files that have 1 or more docblock(s) with a `@namespace ...` tag.
This `@namespace` tag is required as the builder uses it to store the item under the good namespace.

As you may doubt, the builder will not take a look inside the `node_modules` directory to search for files with the `@namespace` tag. This would be way to slow and not requested. In fact, the builder will take a look in your files using these glob patterns:


- `*`
  
- `src/!(css)/*{0,4}/*.+(txt|htm|html|md|json|csv|rss|xhtml|asp|c|cgi|cfm|pl|class|cpp|cs|h|java|php|py|sh|swift|vb|js|jsp|jsx|css|ts|tsx|rs|dart|twig)`
  
- `dist/+(css)/*`
  
Here's are the excluded folders:


- `**/__tests__/**/*`
  
- `**/__tests__.wip/**/*`
  
- `**/__wip__/**/*`
  
If you need to update or add some globs to search in, simply create a file under `.sugar/docmap.config.ts` and fill it like so:

```js
export default function (env, config) {
  if (env.platform !== 'node') return {};
  return {
    build: {
      globs: [...(config.docmap.build.globs ?? []), 'something/**/*'],
    },
  };
}

```

## Output

By default, the build command will generate a `docmap.json` file in your project root folder. We recommend you to keep this like that but if you want to update the output location, you can do so by updating the `config.docmap.build.outPath` configuration.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
