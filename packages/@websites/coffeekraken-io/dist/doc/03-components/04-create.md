
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
* @name            Create your own
* @namespace       doc.components
* @type            Markdown
* @platform        md
* @status          stable
* @menu            Documentation / Components           /doc/components/create-your-own
*
* @since           2.0.0
* @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
*/
-->

# Create your own component

## Stack

For our official components, we make use of the [LitElement](https://lit.dev/) stack that provides some nice features like:

1. Efficient template engine
2. Properties (attributes) management
3. And more.

On top of that, we make use of our own `SLitComponent` class that extends the `LitElement` one and gives you access to some sugars like:

1. Support for `SInterface` interfaces through the `SLitComponent.properties` static method
2. Access to a `componentUtils` property that store a `SComponentUtils` instance and gives you access to methods like:
- `className`: Get classname linked to the component name
- Adopting root style when has a shadowRoot
- `SComponentDefaultInterface` exposed
- System to delaying the `firstUpdated` method execution when the component enter in viewport, etc...
- Utils method like `isMounted`, `isInViewport`, etc...
3. And more.

## Creating your component project

To create a new component project, simply launch this command:

```shell
sugar new litElement
```

> You need to have the `sugar` CLI installed using `npm i @coffeekraken/cli -g`

You will have to answers some questions around your project like his name, etc...

Once that is finished, simple cd into your project directory and launch

```shell
sugar dev
```

This will start the **development environment** in which you can implement and test your component. Once your component is ready, launch this command to build it for production

```shell
sugar build
```


<!-- license -->
### License

Distributed under the **MIT** License. See **[LICENSE](./license)** for more information.

<!-- contact -->
### Contact

Here's all the ways you can contact us listed:

[![discord](https://img.shields.io/badge/Join%20us%20on%20discord-Join-blueviolet?style=[config.shieldsio.style]&amp;logo=discord)](https://discord.gg/HzycksDJ)
[![email](https://img.shields.io/badge/Email%20us-Go-green?style=[config.shieldsio.style]&amp;logo=Mail.Ru)](mailto:olivier.bossel@gmail.com)
