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

## SRangeComponent

This package expose a simple `SRangeComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Fully customizable
-   Support for tooltip
-   Support steps
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-range-component';
define();
```

Make use of it in your pages:

```html
<!-- simple -->
<s-range
    name="myCoolRange"
    value="90"
    class="s-color:accent s-mbe:30"
></s-range>
<!-- with tooltip -->
<s-range name="myOtherRanfe" class="s-mbe:30" tooltip></s-range>
<!-- colored -->
<s-range name="myOtherRanfe" class="s-mbe:30 s-color:accent"></s-range>
<!-- steps -->
<s-range
    name="myRangeWithSteps"
    value="70"
    class="s-color:complementary s-mbe:30"
    step="5"
></s-range>
<!-- disabled -->
<s-range
    name="myRangeWithSteps"
    disabled
    value="70"
    class="s-color:complementary s-mbe:30"
    step="5"
></s-range>
<!-- external target input -->
<div class="s-flex:align-center s-mbe:30">
    <s-range
        name="myRangeWithTarget"
        value="30"
        target="#my-range-with-target-target"
    ></s-range>
    <span class="s-pis:20" id="my-range-with-target-target"></span>
</div>
```

#### Attributes

{{> interface namespace='@coffeekraken.s-range-component.js.interface.SRangeComponentInterface' }}

#### API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-range-component.js.SRangeComponent)

{{/ layout-readme }}
