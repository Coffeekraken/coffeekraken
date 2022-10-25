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

## SSliderComponent

This package expose a simple `SSliderComponent` custom element that you can define and use in your pages easily.

## Features

-   Framework agnostic. Simply webcomponent.
-   Fully customizable
-   Support for "slidable" behavior out of the box
-   Support for custom "behaviors"
-   Support for timer between slides
-   Vertical and horizontal direction
-   Controls (previous, next arrows)
-   Navigation (dots or whatever)
-   Default styles (tight, contained)
-   Responsive props [see more](/doc/components/responsive)
-   And more...

## Usage

First, simply import and define the component in your js/ts file:

```js
import { define, SSliderSlideableBehavior } from '@coffeekraken/s-slider-component';
define({
    behaviors: {
        slideable: {
            class: SSliderSlideableBehavior
            settings: {}
        }
    }
});
```

Make use of it in your pages:

```html
<!-- simple slider -->
<s-slider controls nav>
    <div s-slider-slide class="s-bg--accent">
        <h1 class="s-typo:h1">Slide #1</h1>
        <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw</p>
    </div>
    <div s-slider-slide class="s-bg:complementary">
        <h1 class="s-typo:h1">Slide #2</h1>
        <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw</p>
    </div>
    <div s-slider-slide class="s-bg:info">
        <h1 class="s-typo:h1">Slide #3</h1>
        <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw</p>
    </div>
    <div s-slider-slide class="s-bg:error">
        <h1 class="s-typo:h1">Slide #4</h1>
        <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw</p>
    </div>
</s-slider>

<!-- slideable slider -->
<s-slider behavior="slideable" controls nav>
    <div s-slider-slide class="s-bg--accent">
        <h1 class="s-typo:h1">Slide #1</h1>
        <p class="s-typo:lead">Click and drag</p>
    </div>
    <div s-slider-slide class="s-bg:complementary">
        <h1 class="s-typo:h1">Slide #2</h1>
        <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw</p>
    </div>
    <div s-slider-slide class="s-bg:info">
        <h1 class="s-typo:h1">Slide #3</h1>
        <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw</p>
    </div>
    <div s-slider-slide class="s-bg:error">
        <h1 class="s-typo:h1">Slide #4</h1>
        <p class="s-typo:p">iowfj woijf iowj foiwj fiowjofijw oiefjw</p>
    </div>
</s-slider>
```

## Attributes

{{> interface namespace='@coffeekraken.s-slider-component.js.interface.SSliderComponentInterface' }}

## API

For more information about the API, please check out [the API documentation](/api/@coffeekraken.s-slider-component.js.SSliderComponent)

{{/ layout-readme }}
