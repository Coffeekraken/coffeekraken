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

## SClipboardCopyComponent

This package expose a simple `SClipboardCopyComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Set a "from" target that will be copied in the clipboard on click
-   Default icons for "copy", "copied", and "error"
-   Responsive props [see more](/doc/components/responsive)
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-clipboard-copy-component';
define();
```

Make use of it in your pages:

```html
<input type="text" value="Hello world" id="my-input" />
<s-clipboard-copy from="my-input"></s-clipboard-copy>
```

## Attributes

{{> interface namespace='@coffeekraken.s-clipboard-copy-component.js.interface.SClipboardCopyComponentInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-clipboard-copy-component.js.SClipboardCopyComponent)

{{/ layout-readme }}
