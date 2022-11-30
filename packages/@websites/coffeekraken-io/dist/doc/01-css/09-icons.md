
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
* @name            Icons
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/icons
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Icons

Icons are very important these days in web design/development. The bad part of this is that icons are often coming from different sources like [Font Awesome](https://fontawesome.com/), [Google icons](https://fonts.google.com/icons), some others or even plain SVG files.

This make the treatment and usage of these icons a pain in the ass to say at least...

Our solution to this is the `@sugar.icon.classes` mixin that let you register all of your icons from different sources and use them down the line with a single class syntax the looks like `.s-icon:user`.

> Your final icons will be generated in a font-icon format so you can apply them colors, and all features a text can have.

## Register some icons

To register some icons, simply call the `@sugar.icon.classes` mixin with the list of icons you want in your website like so:

```css
@sugar.icon.classes (
fab:vuejs
fa:tasks
fa:hammer:todo
fs:src/icons/read-direction.svg:support-rtl
fs:src/icons/ *.svg
);
```

Each line define an icon using this syntax:

`{protocol}:{name-or-path}:{internal-name-you-want}`

-   `protocol`: This define the source of the icon. See bellow the list of supported ones
-   `name-or-path`: This define the name or path where to find your icon
-   `internal-name-you-want`: This is optional and let you change the name to use which one you want internally

## Protocols

For now, we support 2 protocols that are:

-   `fa|fab|fas|fad|fal`: These are [Font awesome](https://fontawesome.com) icons
-   `fs`: This is `filesystem` plain SVG icons
-   Support glob paths like `src/icons/*.svg`

> These are the supported protocols that we have for now. We can as well add some depending on your needs and requests through our different communication channels.

## Usage

To use your registered icons, simply reference them inside your html like so:

```html
<i class="s-icon s-icon--vuejs"></i>
<i class="s-icon s-icon--support-rtl"></i>
<!-- etc... -->
```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
