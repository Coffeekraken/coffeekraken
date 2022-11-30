
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
* @name            Override configs
* @namespace       doc.config
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Configuration           /doc/config/override
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Overriding existing configuration

**To override some configs in your project, the process is simple and straight forward.**

To illustrate this, we will take as example of overriding the javascript sources path directory. Note that the same process applies for any other configs as well...

### Project (package) level overriding

-   Create the file `.sugar/storage.config.js`
-   Fill it like so

```js
export default (env, config) => {
return {
src: {
jsDir: 'your new absolute directory path',
},
};
};
```

### User level overriding

-   Create the file `.local/.sugar/storage.config.js`
-   Fill it like so

```js
export default (env, config) => {
return {
src: {
jsDir: 'your new absolute directory path',
},
};
};
```

> You'll see that the process is the same. The only difference is where are stored files. Note that the `.local` folder MUST be added in your **.gitignore file** if you're not using our development toolchain.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
