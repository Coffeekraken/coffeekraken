<!--
/**
 * @name            README
 * @namespace       doc
 * @type            Markdown
 * @platform        md
 * @status          wip
 * @menu            Documentation           /doc/readme
 *
 * @since           2.0.0
 * @author    Olivier Bossel <olivier.bossel@gmail.com> (https://coffeekraken.io)
 */
-->

{{#> layout-readme }}

## SFormValidateFeature

This package expose a simple `SFormValidateFeature` class that allows you to validate your forms before sending them to your backend.

## Features

-
-   And more...

## Usage

Here's how to import and make use of this feature:

```js
import { define } from '@coffeekraken/s-activate-feature';
define({
    // some default props...
});
```

#### Simple tabs

```html
<nav>
    <a s-activate href="#tab-1" group="my-tabs">Activate tab 1</a>
    <a s-activate href="#tab-2" group="my-tabs">Activate tab 2</a>
    <a s-activate href="#tab-3" group="my-tabs">Activate tab 3</a>
</nav>
<div id="tab-1">Hello</div>
<div id="tab-2">World</div>
<div id="tab-3">Plop</div>
```

#### Simple toggle button

<a href="#my-content" toggle>Toggle content display</a>

<div id="my-content">Hello world</div>

## Properties

{{> interface namespace='@coffeekraken.s-activate-feature.js.interface.SFormValidateFeatureInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-activate-feature.js.SFormValidateFeature)

{{/ layout-readme }}
