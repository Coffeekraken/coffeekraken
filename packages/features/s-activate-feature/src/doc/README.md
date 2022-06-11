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

## SActivateFeature

This package expose a simple `SActivateFeature` class that allows you activate/unactivate elements as well as saving his state, etc...

## Features

-   Activate/unactivate elements (HTMLElement)
-   Add/remove a simple `active` class on triggerer and target(s)
-   Take the `href` attribute as target
-   Allows to `group` some element for tabs behavior, etc...
-   Support the `toggle` mode
-   Support the `history` mode
-   Allows you to `save state` to `restore them` on page load
-   Available trigger: `click`, `mouseover`, `mouseout`, `anchor`, `event:...` and more to come
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

{{> interface namespace='@coffeekraken.s-activate-feature.js.interface.SActivateFeatureInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-activate-feature.js.SActivateFeature)

{{/ layout-readme }}
