<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


<!-- body -->

<!--
/**
* @name            01. Installation
* @namespace       doc
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation           /doc/installation
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Installation

Out stylekit works on top of [PostCSS](https://postcss.org/). So you will need to install it first as well as the stylekit itself like so:

```bash

npm i postcss @coffeekraken/s-sugarcss-plugin -D

```

Then, all you need to do is to create a `postcss.config.js` file at the root of your project like so:

```js
module.exports = {
  plugins: [require('@coffeekraken/s-sugarcss-plugin')],
  // all the other plugins you want here...
};

```

You will be able now to use the stylekit in your projet.

> For informations on how to install PostCSS into your project, please refer to the [PostCSS documentation](https://postcss.org/).

