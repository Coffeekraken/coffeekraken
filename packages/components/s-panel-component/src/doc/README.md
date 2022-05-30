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

## SPanelComponent

This package expose a simple `SPanelComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Fully customizable
-   Support sides `top`, `right`, `bottom` and `left` as well as `modal`
-   Responsive props [see more](/doc/components/responsive)
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-panel-component';
define();
```

Make use of it in your pages:

```html
<s-panel position="top" id="simple-top-panel-open" backdrop>
    <div class="s-p:50">
        <h1 class="s-typo:h1 s-mbe:30">Hello world</h1>
        <p class="s-typo:p s-mbe:30">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc sit
            amet lectus magna. Ut vehicula eros a sapien egestas, sed ultricies
            orci lacinia. In hac habitasse platea dictumst. Nulla metus elit,
            mollis at ante id, varius faucibus nulla. Praesent aliquam justo vel
            justo accumsan, non dictum lorem porta. Donec varius magna id semper
            pulvinar. Nunc ultrices pellentesque mollis. Mauris vestibulum justo
            in facilisis tempor. Nunc gravida dictum ex ut condimentum. Aenean
            sagittis dignissim semper.
        </p>
        <button
            class="s-btn s-color:accent s-mie:10"
            s-panel-close="simple-top-panel-open"
        >
            Close panel
        </button>
        or click outside or use the escape key...
    </div>
</s-panel>
<button
    class="s-btn s-color:complementary"
    s-panel-open="simple-top-panel-open"
>
    Open top panel
</button>
```

## Attributes

{{> interface namespace='@coffeekraken.s-panel-component.js.interface.SPanelComponentInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-panel-component.js.SPanelComponent)

{{/ layout-readme }}
