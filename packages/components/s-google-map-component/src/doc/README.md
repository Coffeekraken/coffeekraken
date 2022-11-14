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

## SGoogleMapComponent

This package expose a simple to use `s-google-map` webcomponent that support (custom) marker(s),

## Features

-   Framework agnostic. Simply webcomponent.
-   Support of (custom) marker(s)
-   Declarative markers using simple `s-gogle-map-marker` tag
-   Theming your map as usual using the [Google cloud maps styles](https://console.cloud.google.com/google/maps-apis/studio/styles)
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define } from '@coffeekraken/s-google-map-component';
define();
```

Make use of it in your pages:

```html
<s-google-map map-id="7bfb2f702a07e548" lat="46.618038" lng="7.057280">
    <s-google-map-marker lat="46.118038" lng="7.157280">
        <div class="my-map-marker">
            <!-- put anything you want here for your marker -->
        </div>
    </s-google-map-marker>
    <s-google-map-marker lat="46.148038" lng="7.257280">
        <!-- here we are using the provided s-google-map-marker style
        available by calling the @sugar.ui.googleMapMarker.classes(); mixin
        in your postcss -->
        <div class="s-google-map-marker">
            <div class="s-google-map-marker__icon">
                <i class="fa-solid fa-location-dot"></i>
            </div>
            <div class="s-google-map-marker__content">
                <!-- put anything you want here for your marker -->
            </div>
        </div>
    </s-google-map-marker>
</s-google-map>
```

## Look and feel

You can import the base classes for your maps using this [postcss sugar plugin mixin](/package/@coffeekraken/s-postcss-sugar-plugin/doc/readme):

```css
/* Google map */
@sugar.googleMap.classes();
/* Google map marker */
@sugar.googleMapMarker.classes();
```

## Attributes

{{> interface namespace='@coffeekraken.s-google-map-component.js.interface.SGoogleMapComponentInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-google-map-component.js.SGoogleMapComponent)

{{/ layout-readme }}
