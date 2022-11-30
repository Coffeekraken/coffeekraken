
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
* @name            Viewspec
* @namespace       doc.specFiles
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Spec files           /doc/specfiles/viewspec
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Views specs

> Spec version **1.0.0-alpha.0**

## Why?

His goal is to describe a particular view like `hello.blade.php`.
By describing the data that this view depends on, you can use that and build your backend automatically. Pretty usefull for medium/large projects.

## Filename

A specification file has to be named with `.spec.json` at his end. Usually this mean that if you have a view named `card.twig.php`, the files will be something like this:

```
| src
| views
| components
| card
| card.twig
| card.spec.json
```

## Structure

Here's an example of the card.spec.json file and how it can be written:

```js
{
"type": "Component",
"title": "Card",
"description": "Display a nice card with some infos like \"image\", \"title\", \"intro\", \"description\" and \"cta\"",
"props": {
"title": {
"type": "Text",
"title": "Title",
"description": "The card title"
},
"intro": {
"type": "Text",
"title": "Intro",
"description": "The card intro"
},
"text": {
"type": "Text",
"title": "Text",
"description": "The card text"
},
"image": {
"type": "Image",
"title": "Image",
"description": "A simple image with title and alt properties",
"props": {
"url": {
"type": "Text",
"title": "Url",
"description": "The image url",
"required": true
},
"title": {
"type": "Text",
"title": "Title",
"description": "The image title",
"required": true
},
"alt": {
"type": "Text",
"title": "Alternative text",
"description": "The image alternative text",
"required": true
}
},
},
"cta": "@sugar.views.components.cta"
}
}
```

> Note that the "cta" property is set to `@sugar.views.components.cta`. This is a link to another existing spec file that is available from the [@coffeekraken/sugar](/package/@coffeekraken/sugar/doc/readme) package. To read a spec file, make use of the [@coffeekraken/s-specs](/package/@coffeekraken/s-specs/doc/readme) package that will resolve these links for you.

## Data types

Here's the main data types that we think cover a lot of situations. Note that this is more to take as example that final types. You can specify your own types as well depending on your needs:

- `String`: Simple string data
- `Date`: Simple [ISO](https://en.wikipedia.org/wiki/ISO_8601) date string
- `DateTime`: Simple [ISO](https://en.wikipedia.org/wiki/ISO_8601) datetime string
- `Time`: Simple [ISO](https://en.wikipedia.org/wiki/ISO_8601) time string
- `Number`: Simple number
- `Integer`: Simple integer number
- `Image`: Simple image data
- `src`: The source of the image
- `alt`: The alternative text
- `title`: The image title
- `Object`: An object described by his own `props`

## Repeatable types `array`

To define a prop as **repeatable**, simply suffix his `type` with `[]`.

Here's a simple example

```js
{
"props": {
"images": {
"type": "Image[]",
"label": "Images"
}
}
}
```

## Resulting data

If we take the overview example above, the resulting data that has to be injected into the view at his render phase could be something like this:

```php
return [
'title' => 'Hello world',
'author' => [
'name' => 'Olivier Bossel',
'email' => 'something@gmail.com',
],
'images' => [
[
'src' => 'https://picsum.photos/200/300',
'title' => 'Hello',
'alt' => 'world',
],
[
'src' => 'https://picsum.photos/200/300',
'title' => 'Hello',
'alt' => 'world',
],
],
];
```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
