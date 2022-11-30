
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
* @name            Layout
* @namespace       doc.css
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / CSS           /doc/css/layout
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Layout

Layouts, grid, or however you want to call them are a central piece in web development.
Some layout system can be used these days including `old floats`, `flexbox` as well as `grids`.

We are not here to say which is the best one for you or your use cases, but our toolkit provides you a simple way to generate and apply simple and complex layouts through either classes or inline css mixin.

> This technique is using the AMAZING `css-grid` specification under the hood.

## Concept

Our concept is based on a simple syntax that looks like this:

`1 2 _ 3 4`

This defines a two columns layout with `4` areas. Area `1` and `2` are on the first row, area `3` and `4` are in the second row. The `_` character means `new row`.

Here's the layout that will be provided:

```
|---------|---------|
| area 1  | area 2  |
|---------|---------|
| area 3  | area 4  |
|---------|---------|
```

A slightly more complex:

`1 2 4 _ 3 3 4`

This defines a 3 columns layout with `4` areas and will provide this layout:

```
|---------|---------|---------|
| area 1  | area 2  | area 4  |
|---------|---------|         |
| area 3            |         |
|---------|---------|---------|
```

This technique allows you to make really crazy layouts using a simple and kind of "visual" syntax.

## Mixin

First possibility to apply layouts using this technique is to use the `@sugar.layout` mixin. Here's how:

```css
.my-layout {
@sugar.layout ('1 2 _ 3 4');
}
```

```html
<div class="my-layout">
<div>Area 1</div>
<div>Area 2</div>
<div>Area 3</div>
<div>Area 4</div>
</div>
```

> Note that the order of `div` areas in your html is just linked to area "id" like `1`, `2`, etc... This mean that you can have the first area in the html that is displayed at the end, etc...

## Classes

Second possibility is to use auto-generated layout classes. These layouts are defined in your theme configuration like so:

Here's the built-in layout classes:


-   **s-layout:1**

-   **s-layout:12**

-   **s-layout:21**

-   **s-layout:112**

-   **s-layout:122**

-   **s-layout:123**

-   **s-layout:211**

-   **s-layout:221**

-   **s-layout:321**

-   **s-layout:1112**

-   **s-layout:1222**

-   **s-layout:1234**

-   **s-layout:2221**

-   **s-layout:11112**

-   **s-layout:12222**

-   **s-layout:12345**

-   **s-layout:22221**

-   **s-layout:111112**

-   **s-layout:122222**

-   **s-layout:123456**

-   **s-layout:1_2**

-   **s-layout:2_1**

-   **s-layout:12_33**

-   **s-layout:1_23**

-   **s-layout:1_2_3**

-   **s-layout:32_1**

-   **s-layout:3_21**

-   **s-layout:12_34**

-   **s-layout:123_4**

-   **s-layout:1_234**

-   **s-layout:1_2_3_4**

-   **s-layout:123_45**

-   **s-layout:12_345**

-   **s-layout:1_2345**

-   **s-layout:1234_5**

-   **s-layout:1_2_3_4_5**

These classes are generated depending on your `theme.layout.layout` configuration.

```js
{
layout: {
layout: {
12: '1 2',
123: '1 2 3',
112: '1 1 2',
// etc...
}
}
}
```

> Note that the `themeLayout.config.ts` configuration file provide already some generic layouts. To check more on that, take a look at our [configuration explorer](/doc/config/explorer)


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
