<!-- This file has been generated using
     the "@coffeekraken/s-markdown-builder" package.
     !!! Do not edit it directly... -->


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

