<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          stable
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## SScrollComponent

This package expose a simple `SScrollComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Fully customizable
-   Support `top`, `bottom` and css selector to scroll to any element in the page
-   Responsive props [see more](/doc/components/responsive)
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-scroll-component';
define();
```

Make use of it in your pages:

```html
<s-scroll class="s-bg:accent s-p:30 s-radius s-tc:accent-foreground" to="top">
    <i class="s-icon:angle-up"></i>
</s-scroll>
```

## Attributes

{{> interface namespace='@coffeekraken.s-scroll-component.js.interface.SScrollComponentInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-scroll-component.js.SScrollComponent)

{{/ layout-readme }}
