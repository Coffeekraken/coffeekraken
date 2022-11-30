
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
* @namespace       doc.js
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / JS - Node           /doc/js/build
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# JS build process

The build process is handled by the AMAZING [ViteJS](https://vitejs.dev) package through our `@coffeekraken/s-vite` package.

It has some defaults config that you can check out bellow and you can as well override everything you want using one of the solution described bellow.

## Default configs

Here's basically the default [ViteJS](https://vitejs.dev) configurations setted by Coffeekraken:

```js
{&quot;root&quot;:&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/@websites\/coffeekraken-io&quot;,&quot;base&quot;:&quot;\/&quot;,&quot;logLevel&quot;:&quot;error&quot;,&quot;mode&quot;:&quot;development&quot;,&quot;resolve&quot;:{&quot;dedupe&quot;:[&quot;react&quot;,&quot;react-dom&quot;],&quot;alias&quot;:[]},&quot;plugins&quot;:[&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/vite\/s-vite\/dist\/pkg\/esm\/node\/plugins\/sugarPlugin&quot;,&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/vite\/s-vite\/dist\/pkg\/esm\/node\/plugins\/postcssPlugin&quot;,&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/vite\/s-vite\/dist\/pkg\/esm\/node\/plugins\/plainTextPlugin&quot;],&quot;publicDir&quot;:&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/@websites\/coffeekraken-io\/src\/public&quot;,&quot;cacheDir&quot;:&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/@websites\/coffeekraken-io\/.local\/cache\/vite&quot;,&quot;clearScreen&quot;:false,&quot;optimizeDeps&quot;:{&quot;entries&quot;:[&quot;index.html&quot;],&quot;esbuildOptions&quot;:{&quot;resolveExtensions&quot;:[&quot;.js&quot;,&quot;.ts&quot;]}},&quot;build&quot;:{&quot;outDir&quot;:&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/@websites\/coffeekraken-io\/dist\/js&quot;,&quot;assetsDir&quot;:&quot;&quot;},&quot;server&quot;:{&quot;host&quot;:&quot;0.0.0.0&quot;,&quot;port&quot;:3000,&quot;hostname&quot;:&quot;http:\/\/0.0.0.0:3000&quot;,&quot;proxy&quot;:{&quot;^\\\/dist\\\/css\\\/partials\\\/.*\\.css$&quot;:{&quot;target&quot;:&quot;http:\/\/127.0.0.1:8080&quot;,&quot;changeOrigin&quot;:true},&quot;^\\\/dist\\\/.*(\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs)$&quot;:{&quot;target&quot;:&quot;http:\/\/localhost:3000&quot;,&quot;changeOrigin&quot;:true},&quot;^.*\\.(js(?!on)|css)(?!.map)(?!\\?)(.+){1,99999}$&quot;:{&quot;target&quot;:&quot;http:\/\/127.0.0.1:8080&quot;,&quot;changeOrigin&quot;:true},&quot;^\\\/dist\\\/(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs).)*$&quot;:{&quot;target&quot;:&quot;http:\/\/127.0.0.1:8080&quot;,&quot;changeOrigin&quot;:true},&quot;^(?:(?!\\.css|\\.ts|\\.js(?!on)|\\.tsx|\\.jsx|\\.mjs|@vite|\\.local|\\@fs|\\@id|__vite_ping|index.html).)*$&quot;:{&quot;target&quot;:&quot;http:\/\/127.0.0.1:8080&quot;,&quot;changeOrigin&quot;:true}}},&quot;rewrites&quot;:[&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/vite\/s-vite\/dist\/pkg\/esm\/node\/rewrites\/handlebars&quot;],&quot;test&quot;:{&quot;dir&quot;:&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/@websites\/coffeekraken-io\/src&quot;,&quot;include&quot;:[&quot;**\/*.test.{js,mjs,cjs,ts,mts,cts,jsx,tsx}&quot;],&quot;setupFiles&quot;:[&quot;\/Users\/olivierbossel\/data\/web\/coffeekraken\/coffeekraken\/packages\/vite\/s-vite\/dist\/pkg\/esm\/node\/test\/globalSetup&quot;],&quot;watchExclude&quot;:[&quot;**\/node_modules\/**&quot;,&quot;**\/dist\/**&quot;,&quot;**\/node_modules\/**&quot;,&quot;**\/dist\/**&quot;,&quot;**\/__tests__.wip\/**&quot;,&quot;**\/__wip__\/**&quot;],&quot;exclude&quot;:[&quot;**\/node_modules\/**&quot;,&quot;**\/dist\/**&quot;,&quot;**\/cypress\/**&quot;,&quot;**\/.{idea,git,cache,output,temp}\/**&quot;,&quot;**\/node_modules\/**&quot;,&quot;**\/dist\/**&quot;,&quot;**\/__tests__.wip\/**&quot;,&quot;**\/__wip__\/**&quot;],&quot;deps&quot;:{&quot;inline&quot;:true}}}
```

## Overriding config

To override the default config, you have two choices:

1. Create a `vite.config.js` at your project root
2. Or create a `.sugar/vite.config.js` file

> The second solution make part of the `@coffeekraken/s-sugar-config` configuration system that check and loads the `vite.config.js` file at your project root. The choice is yours.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
