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
* @name            Scopes
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/scopes
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Scopes

In the toolkit, most of the UI elements style (and some other things) can be applied through mixins like `@sugar.ui.button();` for example. These mixins can takes some arguments and one of them is `scope`.

This `scope` argument tells the mixin which "part" of the element css you want to generate.
Here's some values that this argument can take that will make things a lot more simple to understand:

-   `bare`: This correspond to the structural css like paddings, sizes and functional css for something like `dropdown` that need some css just to work properly.
-   `lnf`: This means "look and feel" and correspond to all the css that make an element visually pleasing like colors, border-radius, etc...

These two `scopes` are the main ones that are usually available with every mixins that print out some styling css for "components" or "UI".

Some mixins can have more `scopes` available. Let's take for example the `@sugar.ui.avatar` mixin.

This mixins offer some additional "behaviors" like:

-   `shape`: An avatar can be "circle", "rounded" or "square"
-   `interactive`: An avatar can have an "hover" state to let the user know that it can interact with

These are some small features that need to tweak a little bit the css. It would be not optimal to generate these "tweaks" classes like so:

```css
.my-avatar {
  /* this would print the all avatar css and that's ok */
  @sugar.ui.avatar;
}
.my-avatar--square {
  /* this would print again the all avatar css and we don't want that... */
  @sugar.ui.avatar (square);
}

```

Instead we can write this like so:

```css
.my-avatar {
  /* this would print the all avatar css and that's ok */
  @sugar.ui.avatar;
}
.my-avatar--square {
  /* this will print only the css for the "shape" scope */
  @sugar.ui.avatar (square, $scope: shape);
}

```

> Each mixins API are documented either through the [styleguide](/styleguide) for more visual exploration, or through the [API](/api) for more technical specifications.


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
